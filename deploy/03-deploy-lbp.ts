import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {TContract} from 'tapioca-sdk/dist/shared';
import {verify, constants, updateDeployments} from './utils';
import {BigNumberish} from 'ethers';
import fs from 'fs';

//npx hardhat verify --constructor-args deploy/__lbp-arguments.js 0x9DF9757Cc2848FacB3bEB9656053a106D04D97E4 --network arbitrum_goerli

const compareAddresses = function (tokenA: string, tokenB: string): number {
    return tokenA.toLowerCase() > tokenB.toLowerCase() ? 1 : -1;
};
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await hre.getChainId();
    const contracts: TContract[] = [];

    console.log('\n Deploying LiquidityBootstrappingPool...');
    const lbpInfo = constants[chainId].lbp;
    const vault = await deployments.get('Vault');
    const sortedToken = lbpInfo.tokens.sort((a: string, b: string) =>
        compareAddresses(a, b),
    );

    const args = [
        vault.address,
        lbpInfo.name,
        lbpInfo.symbol,
        sortedToken,
        lbpInfo.weights.map((a: BigNumberish) => a.toString()),
        lbpInfo.swapFee.toString(),
        '0',
        '0',
        deployer,
        false,
    ];
    await deploy('LiquidityBootstrappingPool', {
        args,
        from: deployer,
    });
    await verify(hre, 'LiquidityBootstrappingPool', args);

    const fileContent = `module.exports=${JSON.stringify(args)}`;
    fs.writeFileSync('./deploy/__lbp-arguments.js', fileContent, {flag: 'w'});

    const deployedLbp = await deployments.get('LiquidityBootstrappingPool');
    contracts.push({
        name: 'LiquidityBootstrappingPool',
        address: deployedLbp.address,
        meta: {constructorArguments: args},
    });

    await updateDeployments(contracts, chainId);
    console.log(
        `Deployed LiquidityBootstrappingPool on ${deployedLbp.address} with args [${args}]`,
    );
};

export default func;
func.tags = ['LBP'];
