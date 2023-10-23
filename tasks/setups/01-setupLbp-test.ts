import {HardhatRuntimeEnvironment} from 'hardhat/types';
import _ from 'lodash';
import {constants} from '../../deploy/utils';
import {WeightedPoolEncoder} from '@balancer-labs/balancer-js';
import {BigNumber, fp} from '../../helpers/numbers';

//TEST setup
export const fillLbptest__task = async (
    data: {lbp: string; vault: string; owner: string},
    hre: HardhatRuntimeEnvironment,
) => {
    const chainId = await hre.getChainId();
    console.log(`Setting up on chain ${chainId}`);

    const lbpContract = await hre.ethers.getContractAt(
        'LiquidityBootstrappingPool',
        data.lbp,
    );
    console.log(`Retrieved LBP contract ${data.lbp}`);

    const vaultContract = await hre.ethers.getContractAt('Vault', data.vault);
    console.log(`Retrieved Vault contract ${data.vault}`);

    const firstTokenAddress = constants[chainId].lbp.tokens[0];
    const secondTokenAddress = constants[chainId].lbp.tokens[1];

    const firstToken = await hre.ethers.getContractAt(
        '@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20',
        firstTokenAddress,
    );
    console.log(`Retrieved first token contract ${firstTokenAddress}`);

    const secondToken = await hre.ethers.getContractAt(
        '@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20',
        secondTokenAddress,
    );
    console.log(`Retrieved second token contract ${secondTokenAddress}`);

    const startBalances = [fp(250), fp(4000000)];

    await firstToken.approve(vaultContract.address, startBalances[0]);
    console.log(`First token approved`);
    await secondToken.approve(vaultContract.address, startBalances[1]);
    console.log(`Second token approved`);

    await vaultContract.joinPool(
        await lbpContract.getPoolId(),
        data.owner,
        data.owner,
        {
            assets: constants[chainId].lbp.tokens,
            maxAmountsIn: startBalances,
            fromInternalBalance: false,
            userData: WeightedPoolEncoder.joinInit(startBalances),
        },
    );
    console.log(`Added funds`);

    await lbpContract.setSwapEnabled(true);
    console.log(`Swaps enabled`);

    const now = Math.floor(Date.now() / 1000);
    const endTime = now + constants[chainId].lbp.duration;
    await lbpContract.updateWeightsGradually(
        now,
        endTime,
        constants[chainId].lbp.endWeights,
    );
    console.log(
        `Started gradually weights update; start time ${now}; end time ${endTime}`,
    );

    console.log(`Done`);
};
