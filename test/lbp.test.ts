import {ethers} from 'hardhat';
import {expect} from 'chai';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import {BigNumber, fp} from '../helpers/numbers';
import {MINUTE, currentTimestamp, HOUR, DAY} from '../helpers/time';
import {deploy} from '../helpers/contract';
import TokensDeployer from '../helpers/models/tokens/TokensDeployer';
import {advanceTime} from '../helpers/time';
import TokenList from '../helpers/models/tokens/TokenList';

import {WeightedPoolEncoder} from '@balancer-labs/balancer-js';
import {MAX_UINT256} from '../helpers/constants';

describe.only('LBP', function () {
    let owner: SignerWithAddress, other: SignerWithAddress;

    before('setup signers', async () => {
        [, owner, other] = await ethers.getSigners();
    });

    describe.only('lbp flows', function () {
        it('should test a full weight change flow', async () => {
            const mockAuthorizer = await deploy('Authorizer', {
                args: [owner.address],
                from: owner,
            });

            const lbpTokens = await TokenList.create(2, {sorted: true});

            const weth = await TokensDeployer.deployWeth(owner);
            const vaultArgs = [mockAuthorizer.address, weth.address, 0, 0];
            const vault = await deploy('Vault', {
                args: vaultArgs,
                from: owner,
            });

            expect(weth.address).to.not.equal(ethers.constants.ZERO_ADDRESS);
            expect(vault.address).to.not.equal(ethers.constants.ZERO_ADDRESS);

            const lbpSwapFee = fp(0.01);
            const lbpWeights = [fp(0.2), fp(0.8)];
            const lbp = await deploy('LiquidityBootstrappingPool', {
                args: [
                    vault.address,
                    'TEST',
                    'TST',
                    lbpTokens.addresses,
                    lbpWeights,
                    lbpSwapFee,
                    0,
                    0,
                    owner.address,
                    true,
                ],
                from: owner,
            });

            expect(lbp.address).to.not.equal(ethers.constants.ZERO_ADDRESS);

            expect(await lbp.getSwapEnabled()).to.be.true;

            const vaultSaved = await lbp.getVault();
            expect(vaultSaved.toLowerCase()).to.eq(vault.address.toLowerCase());

            const firstToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[0],
            );

            const secondToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[1],
            );
            firstToken.approve(lbp.address, ethers.constants.MAX_UINT256);
            secondToken.approve(lbp.address, ethers.constants.MAX_UINT256);

            let ownerFirstTokenBalance = await firstToken.balanceOf(
                owner.address,
            );
            let ownerSecondTokenBalance = await firstToken.balanceOf(
                owner.address,
            );
            expect(ownerFirstTokenBalance.eq(0)).to.be.true;
            expect(ownerSecondTokenBalance.eq(0)).to.be.true;

            await firstToken.mint(owner.address, fp(100));
            await secondToken.mint(owner.address, fp(100));

            ownerFirstTokenBalance = await firstToken.balanceOf(owner.address);
            ownerSecondTokenBalance = await firstToken.balanceOf(owner.address);
            expect(ownerFirstTokenBalance.eq(fp(100))).to.be.true;
            expect(ownerSecondTokenBalance.eq(fp(100))).to.be.true;

            const START_DELAY = MINUTE * 10;
            const UPDATE_DURATION = DAY * 7;
            const now = await currentTimestamp();
            const startTime = now.add(START_DELAY);
            const endTime = startTime.add(UPDATE_DURATION);
            await lbp.updateWeightsGradually(startTime, endTime, [
                fp(0.5),
                fp(0.5),
            ]);

            let normalizedWeights = await lbp.getNormalizedWeights();
            let prevWeight0 = normalizedWeights[0];
            let prevWeight1 = normalizedWeights[1];

            await advanceTime(DAY);
            normalizedWeights = await lbp.getNormalizedWeights();
            expect(prevWeight0.lt(normalizedWeights[0])).to.be.true;
            expect(prevWeight1.gt(normalizedWeights[1])).to.be.true;
            prevWeight0 = normalizedWeights[0];
            prevWeight1 = normalizedWeights[1];

            await advanceTime(DAY);
            normalizedWeights = await lbp.getNormalizedWeights();
            expect(prevWeight0.lt(normalizedWeights[0])).to.be.true;
            expect(prevWeight1.gt(normalizedWeights[1])).to.be.true;
            prevWeight0 = normalizedWeights[0];
            prevWeight1 = normalizedWeights[1];

            await advanceTime(DAY * 7);
            normalizedWeights = await lbp.getNormalizedWeights();
            expect(prevWeight0.lt(normalizedWeights[0])).to.be.true;
            expect(prevWeight1.gt(normalizedWeights[1])).to.be.true;
            prevWeight0 = normalizedWeights[0];
            prevWeight1 = normalizedWeights[1];
            expect(prevWeight0.eq(prevWeight1)).to.be.true;
        });

        it('should test swaps with gradual weights', async () => {
            const mockAuthorizer = await deploy('Authorizer', {
                args: [owner.address],
                from: owner,
            });

            const lbpTokens = await TokenList.create(2, {sorted: true});

            const weth = await TokensDeployer.deployWeth(owner);
            const vaultArgs = [mockAuthorizer.address, weth.address, 0, 0];
            const lbpVault = await deploy('Vault', {
                args: vaultArgs,
                from: owner,
            });

            const lbpSwapFee = fp(0.01);
            const lbpWeights = [fp(0.2), fp(0.8)];
            const lbp = await deploy('LiquidityBootstrappingPool', {
                args: [
                    lbpVault.address,
                    'TEST',
                    'TST',
                    lbpTokens.addresses,
                    lbpWeights,
                    lbpSwapFee,
                    0,
                    0,
                    owner.address,
                    true,
                ],
                from: owner,
            });

            expect(lbp.address).to.not.equal(ethers.constants.ZERO_ADDRESS);

            const firstToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[0],
            );
            const secondToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[1],
            );
            firstToken.connect(owner).approve(lbp.address, fp(100));
            secondToken.connect(owner).approve(lbp.address, fp(100));
            firstToken.connect(owner).approve(lbpVault.address, fp(100));
            secondToken.connect(owner).approve(lbpVault.address, fp(100));

            await firstToken.mint(owner.address, fp(100));
            await secondToken.mint(owner.address, fp(100));

            const UPDATE_DURATION = DAY * 7;
            const now = await currentTimestamp();
            const endTime = now.add(UPDATE_DURATION);
            await lbp.updateWeightsGradually(now, endTime, [fp(0.8), fp(0.2)]);

            const startBalances = [fp(1), fp(50)];
            await lbpVault
                .connect(owner)
                .joinPool(await lbp.getPoolId(), owner.address, owner.address, {
                    assets: lbpTokens.addresses,
                    maxAmountsIn: startBalances,
                    fromInternalBalance: false,
                    userData: WeightedPoolEncoder.joinInit(startBalances),
                });

            let vaultFirstTokenBalance = await firstToken.balanceOf(
                lbpVault.address,
            );
            let vaultSecondTokenBalance = await secondToken.balanceOf(
                lbpVault.address,
            );
            let firstTokenPrevVaultBalance = vaultFirstTokenBalance;
            let secondTokenPrevVaultBalance = vaultSecondTokenBalance;
            expect(vaultFirstTokenBalance.eq(fp(1))).to.be.true;
            expect(vaultSecondTokenBalance.eq(fp(50))).to.be.true;

            await firstToken.connect(other).mint(other.address, fp(100));
            await firstToken.connect(other).approve(lbpVault.address, fp(100));

            const buy = async (_amount: BigNumber) => {
                const singleSwapData = {
                    poolId: await lbp.getPoolId(),
                    kind: 0, //GIVEN IN
                    assetIn: firstToken.address,
                    assetOut: secondToken.address,
                    amount: _amount,
                    userData: '0x',
                };
                const fundManagementData = {
                    sender: other.address,
                    recipient: other.address,
                    fromInternalBalance: false,
                    toInternalBalance: false,
                };
                await lbpVault
                    .connect(other)
                    .swap(
                        singleSwapData,
                        fundManagementData,
                        singleSwapData.kind == 0 ? 0 : MAX_UINT256,
                        MAX_UINT256,
                    );
            };

            const sell = async (_amount: BigNumber) => {
                const singleSwapData = {
                    poolId: await lbp.getPoolId(),
                    kind: 0, //GIVEN IN
                    assetIn: secondToken.address,
                    assetOut: firstToken.address,
                    amount: _amount,
                    userData: '0x',
                };
                const fundManagementData = {
                    sender: other.address,
                    recipient: other.address,
                    fromInternalBalance: false,
                    toInternalBalance: false,
                };
                await lbpVault
                    .connect(other)
                    .swap(
                        singleSwapData,
                        fundManagementData,
                        singleSwapData.kind == 0 ? 0 : MAX_UINT256,
                        MAX_UINT256,
                    );
            };
            await buy(fp(0.1));

            vaultFirstTokenBalance = await firstToken.balanceOf(
                lbpVault.address,
            );
            expect(
                vaultFirstTokenBalance.eq(
                    firstTokenPrevVaultBalance.add(fp(0.1)),
                ),
            ).to.be.true;

            vaultSecondTokenBalance = await secondToken.balanceOf(
                lbpVault.address,
            );
            expect(vaultSecondTokenBalance.lt(secondTokenPrevVaultBalance)).to
                .be.true;

            let otherSecondTokenBalance = await secondToken.balanceOf(
                other.address,
            );
            let otherPrevSecondTokenBalance = otherSecondTokenBalance;
            let otherPrevObtained = otherSecondTokenBalance;

            await buy(fp(0.1));
            otherSecondTokenBalance = await secondToken.balanceOf(
                other.address,
            );
            let obtained = otherSecondTokenBalance.sub(
                otherPrevSecondTokenBalance,
            );
            expect(obtained.lt(otherPrevObtained));

            otherPrevSecondTokenBalance = otherSecondTokenBalance;
            otherPrevObtained = obtained;

            await buy(fp(0.1));

            otherSecondTokenBalance = await secondToken.balanceOf(
                other.address,
            );
            obtained = otherSecondTokenBalance.sub(otherPrevSecondTokenBalance);

            expect(obtained.lt(otherPrevObtained));

            otherPrevSecondTokenBalance = otherSecondTokenBalance;
            otherPrevObtained = obtained;

            await buy(fp(0.1));

            otherSecondTokenBalance = await secondToken.balanceOf(
                other.address,
            );
            obtained = otherSecondTokenBalance.sub(otherPrevSecondTokenBalance);

            expect(obtained.lt(otherPrevObtained));
            otherPrevObtained = obtained;

            await secondToken.connect(other).approve(lbpVault.address, fp(100));
            await sell(otherSecondTokenBalance);

            await secondToken.connect(other).mint(other.address, fp(10));
            await sell(fp(10));

            otherSecondTokenBalance = await secondToken.balanceOf(
                other.address,
            );
            expect(otherSecondTokenBalance.eq(0)).to.be.true;

            await buy(fp(0.1));
            otherSecondTokenBalance = await secondToken.balanceOf(
                other.address,
            );

            expect(otherSecondTokenBalance.gt(otherPrevObtained)).to.be.true;
        });

        it('should be able to extract liquidity', async () => {
            const mockAuthorizer = await deploy('Authorizer', {
                args: [owner.address],
                from: owner,
            });

            const lbpTokens = await TokenList.create(2, {sorted: true});

            const weth = await TokensDeployer.deployWeth(owner);
            const vaultArgs = [mockAuthorizer.address, weth.address, 0, 0];
            const lbpVault = await deploy('Vault', {
                args: vaultArgs,
                from: owner,
            });

            const lbpSwapFee = fp(0.0001);
            const lbpWeights = [fp(0.2), fp(0.8)];
            const lbp = await deploy('LiquidityBootstrappingPool', {
                args: [
                    lbpVault.address,
                    'TEST',
                    'TST',
                    lbpTokens.addresses,
                    lbpWeights,
                    lbpSwapFee,
                    0,
                    0,
                    owner.address,
                    true,
                ],
                from: owner,
            });

            expect(lbp.address).to.not.equal(ethers.constants.ZERO_ADDRESS);

            const firstToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[0],
            );
            const secondToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[1],
            );
            firstToken.connect(owner).approve(lbp.address, fp(100));
            secondToken.connect(owner).approve(lbp.address, fp(100));
            firstToken.connect(owner).approve(lbpVault.address, fp(100));
            secondToken.connect(owner).approve(lbpVault.address, fp(100));

            await firstToken.mint(owner.address, fp(100));
            await secondToken.mint(owner.address, fp(100));

            const UPDATE_DURATION = DAY * 7;
            const now = await currentTimestamp();
            const endTime = now.add(UPDATE_DURATION);
            await lbp.updateWeightsGradually(now, endTime, [fp(0.8), fp(0.2)]);

            const startBalances = [fp(1), fp(50)];
            await lbpVault
                .connect(owner)
                .joinPool(await lbp.getPoolId(), owner.address, owner.address, {
                    assets: lbpTokens.addresses,
                    maxAmountsIn: startBalances,
                    fromInternalBalance: false,
                    userData: WeightedPoolEncoder.joinInit(startBalances),
                });

            let vaultFirstTokenBalance = await firstToken.balanceOf(
                lbpVault.address,
            );
            let vaultSecondTokenBalance = await secondToken.balanceOf(
                lbpVault.address,
            );
            expect(vaultFirstTokenBalance.eq(fp(1))).to.be.true;
            expect(vaultSecondTokenBalance.eq(fp(50))).to.be.true;

            await firstToken.connect(other).mint(other.address, fp(100));
            await firstToken.connect(other).approve(lbpVault.address, fp(100));

            const buy = async (_amount: BigNumber) => {
                const singleSwapData = {
                    poolId: await lbp.getPoolId(),
                    kind: 0, //GIVEN IN
                    assetIn: firstToken.address,
                    assetOut: secondToken.address,
                    amount: _amount,
                    userData: '0x',
                };
                const fundManagementData = {
                    sender: other.address,
                    recipient: other.address,
                    fromInternalBalance: false,
                    toInternalBalance: false,
                };
                await lbpVault
                    .connect(other)
                    .swap(
                        singleSwapData,
                        fundManagementData,
                        singleSwapData.kind == 0 ? 0 : MAX_UINT256,
                        MAX_UINT256,
                    );
            };

            let ownerPoolBalance = await lbp.balanceOf(owner.address);

            await buy(fp(0.1));
            await buy(fp(0.1));
            await buy(fp(0.1));

            await advanceTime(8 * DAY);
            ownerPoolBalance = await lbp.balanceOf(owner.address);

            vaultFirstTokenBalance = await firstToken.balanceOf(
                lbpVault.address,
            );
            vaultSecondTokenBalance = await secondToken.balanceOf(
                lbpVault.address,
            );

            let ownerFirstTokenBalance = await firstToken.balanceOf(
                owner.address,
            );
            let ownerSecondTokenBalance = await secondToken.balanceOf(
                owner.address,
            );

            console.log('-----------------------------------------');
            await lbp.connect(owner).approve(lbpVault.address, MAX_UINT256);
            await lbpVault
                .connect(owner)
                .exitPool(await lbp.getPoolId(), owner.address, owner.address, {
                    assets: [firstToken.address, secondToken.address],
                    minAmountsOut: [
                        vaultFirstTokenBalance.sub(1e5),
                        vaultSecondTokenBalance.sub(1e5),
                    ],
                    toInternalBalance: false,
                    userData: WeightedPoolEncoder.exitBPTInForExactTokensOut(
                        [
                            vaultFirstTokenBalance.sub(1e5),
                            vaultSecondTokenBalance.sub(1e5),
                        ],
                        ownerPoolBalance,
                    ),
                });
            ownerFirstTokenBalance = await firstToken.balanceOf(owner.address);
            ownerSecondTokenBalance = await secondToken.balanceOf(
                owner.address,
            );
            console.log('\n');
            console.log('\n');

            console.log(
                `       ownerFirstTokenBalance  ${ethers.utils.formatEther(
                    ownerFirstTokenBalance,
                )}`,
            );
            console.log(
                `       ownerSecondTokenBalance ${ethers.utils.formatEther(
                    ownerSecondTokenBalance,
                )}`,
            );

            console.log('           vs');
            console.log(`       initialFirstTokenBalance   100`);
            console.log(`       initialSecondTokenBalance  100`);

            console.log('\n');
            console.log('\n');

            console.log('-----------------------------------------');
            vaultFirstTokenBalance = await firstToken.balanceOf(
                lbpVault.address,
            );
            vaultSecondTokenBalance = await secondToken.balanceOf(
                lbpVault.address,
            );
        });

        it('should block joining pool by users', async () => {
            const mockAuthorizer = await deploy('Authorizer', {
                args: [owner.address],
                from: owner,
            });

            const lbpTokens = await TokenList.create(2, {sorted: true});

            const weth = await TokensDeployer.deployWeth(owner);
            const vaultArgs = [mockAuthorizer.address, weth.address, 0, 0];
            const lbpVault = await deploy('Vault', {
                args: vaultArgs,
                from: owner,
            });

            const lbpSwapFee = fp(0.01);
            const lbpWeights = [fp(0.2), fp(0.8)];
            const lbp = await deploy('LiquidityBootstrappingPool', {
                args: [
                    lbpVault.address,
                    'TEST',
                    'TST',
                    lbpTokens.addresses,
                    lbpWeights,
                    lbpSwapFee,
                    0,
                    0,
                    owner.address,
                    true,
                ],
                from: owner,
            });

            expect(lbp.address).to.not.equal(ethers.constants.ZERO_ADDRESS);

            const firstToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[0],
            );
            const secondToken = await ethers.getContractAt(
                'TestToken',
                lbpTokens.addresses[1],
            );
            firstToken.connect(owner).approve(lbp.address, fp(100));
            secondToken.connect(owner).approve(lbp.address, fp(100));
            firstToken.connect(owner).approve(lbpVault.address, fp(100));
            secondToken.connect(owner).approve(lbpVault.address, fp(100));

            await firstToken.mint(owner.address, fp(1000));
            await secondToken.mint(owner.address, fp(1000));

            const UPDATE_DURATION = DAY * 7;
            const now = await currentTimestamp();
            const endTime = now.add(UPDATE_DURATION);
            await lbp.updateWeightsGradually(now, endTime, [fp(0.8), fp(0.2)]);

            const startBalances = [fp(1), fp(50)];
            await lbpVault
                .connect(owner)
                .joinPool(await lbp.getPoolId(), owner.address, owner.address, {
                    assets: lbpTokens.addresses,
                    maxAmountsIn: startBalances,
                    fromInternalBalance: false,
                    userData: WeightedPoolEncoder.joinInit(startBalances),
                });

            // should not allow re-initialization
            await expect(
                lbpVault
                    .connect(owner)
                    .joinPool(
                        await lbp.getPoolId(),
                        owner.address,
                        owner.address,
                        {
                            assets: lbpTokens.addresses,
                            maxAmountsIn: startBalances,
                            fromInternalBalance: false,
                            userData:
                                WeightedPoolEncoder.joinInit(startBalances),
                        },
                    ),
            ).to.be.reverted;

            await firstToken.connect(other).mint(other.address, fp(1000));
            await secondToken.connect(other).mint(other.address, fp(1000));

            await expect(
                lbpVault
                    .connect(other)
                    .joinPool(
                        await lbp.getPoolId(),
                        other.address,
                        other.address,
                        {
                            assets: lbpTokens.addresses,
                            maxAmountsIn: [fp(10), fp(50)],
                            fromInternalBalance: false,
                            userData:
                                WeightedPoolEncoder.joinExactTokensInForBPTOut(
                                    [fp(10), fp(50)],
                                    0,
                                ),
                        },
                    ),
            ).to.be.reverted;

            await expect(
                lbpVault
                    .connect(owner)
                    .joinPool(
                        await lbp.getPoolId(),
                        owner.address,
                        owner.address,
                        {
                            assets: lbpTokens.addresses,
                            maxAmountsIn: [fp(1), fp(5)],
                            fromInternalBalance: false,
                            userData:
                                WeightedPoolEncoder.joinExactTokensInForBPTOut(
                                    [fp(1), fp(5)],
                                    0,
                                ),
                        },
                    ),
            ).to.not.be.reverted;
        });

        it.only('should check the real values', async () => {
            // ------
            //Create Authorizer
            // ------
            const authorizer = await deploy('Authorizer', {
                args: [owner.address],
                from: owner,
            });

            // ------
            //Create Vault
            // ------
            const weth = await TokensDeployer.deployWeth(owner);
            const lbpVault = await deploy('Vault', {
                args: [authorizer.address, weth.address, 0, 0],
                from: owner,
            });

            // ------
            //Create LBP
            // ------
            const sortedTokens = await TokenList.create(2, {sorted: true});
            const lbpInitialWeights = [
                fp(0.98), //TAP
                fp(0.02), //USDC
            ];

            const lbp = await deploy('LiquidityBootstrappingPool', {
                args: [
                    lbpVault.address,
                    'Tapioca LBP',
                    'tLBP',
                    sortedTokens.addresses,
                    lbpInitialWeights,
                    1e12, //swap fee
                    0,
                    0,
                    owner.address,
                    false,
                ],
                from: owner,
            });
            const tap = await ethers.getContractAt(
                'TestToken',
                sortedTokens.addresses[0],
            );
            const usdc = await ethers.getContractAt(
                'TestToken',
                sortedTokens.addresses[1],
            );

            const startBalances = [fp(5000000), fp(359000)]; //5M TAP, 359k USDC
            await tap.connect(owner).mint(owner.address, startBalances[0]);
            await usdc.connect(owner).mint(owner.address, startBalances[1]);

            // ------
            //Add initial liquidity
            // ------
            await tap
                .connect(owner)
                .approve(lbpVault.address, startBalances[0]);
            await usdc
                .connect(owner)
                .approve(lbpVault.address, startBalances[1]);
            await lbpVault
                .connect(owner)
                .joinPool(await lbp.getPoolId(), owner.address, owner.address, {
                    assets: sortedTokens.addresses,
                    maxAmountsIn: startBalances,
                    fromInternalBalance: false,
                    userData: WeightedPoolEncoder.joinInit(startBalances),
                });
            expect((await tap.balanceOf(lbpVault.address)).eq(startBalances[0]))
                .to.be.true;
            expect(
                (await usdc.balanceOf(lbpVault.address)).eq(startBalances[1]),
            ).to.be.true;

            // ------
            //Set swaps enabled
            // ------
            expect(await lbp.getSwapEnabled()).to.be.false;
            await lbp.connect(owner).setSwapEnabled(true);
            expect(await lbp.getSwapEnabled()).to.be.true;

            // ------
            //Set end weights
            // ------
            const lbpEndWeights = [fp(0.2), fp(0.8)];
            const lbpDuration = 3 * DAY;
            const now = await currentTimestamp();
            const endTime = now.add(lbpDuration);
            await lbp
                .connect(owner)
                .updateWeightsGradually(now, endTime, lbpEndWeights);

            const buy = async (_amount: BigNumber) => {
                const singleSwapData = {
                    poolId: await lbp.getPoolId(),
                    kind: 0, //GIVEN IN
                    assetIn: usdc.address,
                    assetOut: tap.address,
                    amount: _amount,
                    userData: '0x',
                };
                const fundManagementData = {
                    sender: other.address,
                    recipient: other.address,
                    fromInternalBalance: false,
                    toInternalBalance: false,
                };
                await usdc.connect(other).mint(other.address, _amount);
                await usdc.connect(other).approve(lbpVault.address, _amount);
                await lbpVault
                    .connect(other)
                    .swap(
                        singleSwapData,
                        fundManagementData,
                        singleSwapData.kind == 0 ? 0 : MAX_UINT256,
                        MAX_UINT256,
                    );

                const balanceAfter = await usdc.balanceOf(other.address);
                expect(balanceAfter.eq(0)).to.be.true;
            };

            const queryGivenOut = async (_amount: BigNumber) => {
                const singleSwapData = {
                    poolId: await lbp.getPoolId(),
                    kind: 1, //GIVEN OUT
                    assetIn: tap.address,
                    assetOut: usdc.address,
                    amount: _amount,
                    userData: '0x',
                };
                const fundManagementData = {
                    sender: other.address,
                    recipient: other.address,
                    fromInternalBalance: false,
                    toInternalBalance: false,
                };

                await usdc.approve(lbpVault.address, MAX_UINT256);
                const amountOut = await lbpVault
                    .connect(other)
                    .callStatic.swap(
                        singleSwapData,
                        fundManagementData,
                        singleSwapData.kind == 0 ? 0 : MAX_UINT256,
                        MAX_UINT256,
                    );

                return amountOut;
            };

            const queryUsdcAmount = async () => {
                const desiredTapAmount = 26767;

                const balance1 = await tap.balanceOf(lbpVault.address);
                const balance2 = await usdc.balanceOf(lbpVault.address);

                const normalizedWeights = await lbp.getNormalizedWeights();
                const weight1 = normalizedWeights[0];
                const weight2 = normalizedWeights[1];

                const price1 = balance1 / weight1;
                const price2 = balance2 / weight2;

                const price = price2 / price1;

                const amount = desiredTapAmount * price;
                return fp(parseInt(amount.toString()));
            };

            for (var i = 0; i < 72; i++) {
                const endNow = await currentTimestamp();
                if (endNow >= endTime) continue;
                for (var j = 0; j < 2; j++) {
                    let buyAmount = await queryUsdcAmount();
                    await buy(buyAmount);
                }
                await advanceTime(HOUR);
            }

            await lbp.connect(owner).setSwapEnabled(false);

            let tapVaultBalance = await tap.balanceOf(lbpVault.address);
            let usdcVaultBalance = await usdc.balanceOf(lbpVault.address);
            const tapOtherBalance = await tap.balanceOf(other.address);

            console.log(
                `vault TAP balance at the end of the LBP  ${ethers.utils.formatEther(
                    tapVaultBalance,
                )}`,
            );
            console.log(
                `vault USDC balance at the end of the LBP ${ethers.utils.formatEther(
                    usdcVaultBalance,
                )}`,
            );
            console.log(
                `user TAP balance at the end of the LBP   ${ethers.utils.formatEther(
                    tapOtherBalance,
                )}`,
            );

            expect(usdcVaultBalance.gt(fp(11000000))).to.be.true;
            expect(tapVaultBalance.lt(fp(1500000))).to.be.true;
            expect(tapOtherBalance.gt(fp(3000000))).to.be.true;

            const eoa1 = new ethers.Wallet(
                ethers.Wallet.createRandom().privateKey,
                ethers.provider,
            );

            let usdcOwnerBalancer = await usdc.balanceOf(owner.address);
            let tapOwnerBalancer = await tap.balanceOf(owner.address);
            if (usdcOwnerBalancer.gt(0))
                await usdc.transfer(eoa1.address, usdcOwnerBalancer);
            if (tapOtherBalance.gt(0))
                await tap.transfer(eoa1.address, tapOwnerBalancer);

            usdcOwnerBalancer = await usdc.balanceOf(owner.address);
            tapOwnerBalancer = await tap.balanceOf(owner.address);
            expect(usdcOwnerBalancer.eq(0)).to.be.true;
            expect(tapOwnerBalancer.eq(0)).to.be.true;

            let ownerPoolBalance = await lbp.balanceOf(owner.address);
            console.log(
                `ownerPoolBalance ${ethers.utils.formatEther(
                    ownerPoolBalance,
                )}`,
            );
            await lbp.connect(owner).approve(lbpVault.address, MAX_UINT256);
            await lbpVault
                .connect(owner)
                .exitPool(await lbp.getPoolId(), owner.address, owner.address, {
                    assets: [tap.address, usdc.address],
                    minAmountsOut: [
                        tapVaultBalance.sub(1e8),
                        usdcVaultBalance.sub(1e8),
                    ],
                    toInternalBalance: false,
                    userData: WeightedPoolEncoder.exitBPTInForExactTokensOut(
                        [tapVaultBalance.sub(1e8), usdcVaultBalance.sub(1e8)],
                        ownerPoolBalance,
                    ),
                });

            tapOwnerBalancer = await tap.balanceOf(owner.address);
            usdcOwnerBalancer = await usdc.balanceOf(owner.address);

            tapVaultBalance = await tap.balanceOf(lbpVault.address);
            usdcVaultBalance = await usdc.balanceOf(lbpVault.address);

            console.log(
                `tapOwnerBalancer  ${ethers.utils.formatEther(
                    tapOwnerBalancer,
                )}`,
            );
            console.log(
                `usdcOwnerBalancer ${ethers.utils.formatEther(
                    usdcOwnerBalancer,
                )}`,
            );

            console.log(
                `tapVaultBalance  ${ethers.utils.formatEther(tapVaultBalance)}`,
            );
            console.log(
                `usdcVaultBalance ${ethers.utils.formatEther(
                    usdcVaultBalance,
                )}`,
            );
        });
    });
});
