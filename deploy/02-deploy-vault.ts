import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {TContract} from 'tapioca-sdk/dist/shared';
import {verify, constants, updateDeployments} from './utils';
import fs from 'fs';

//npx hardhat verify --constructor-args deploy/__vault-arguments.js 0x2D9e85088eCbb03FBA4f880274aD808663217092 --network arbitrum_goerli
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await hre.getChainId();
    const contracts: TContract[] = [];

    console.log('\n Deploying Vault...');
    const authorizer = await deployments.get('Authorizer');
    const vaultArgs = [
        authorizer.address,
        constants[chainId]?.wethAddress,
        '0',
        '0',
    ];
    await deploy('Vault', {
        args: vaultArgs,
        from: deployer,
    });

    const fileContent = `module.exports=${JSON.stringify(vaultArgs)}`;
    fs.writeFileSync('./deploy/__vault-arguments.js', fileContent, {flag: 'w'});

    await verify(hre, 'Vault', [vaultArgs]);
    const deployedVault = await deployments.get('Vault');

    contracts.push({
        name: 'Vault',
        address: deployedVault.address,
        meta: {constructorArguments: vaultArgs},
    });

    await updateDeployments(contracts, chainId);

    console.log(
        `Deployed Vault on ${deployedVault.address} with args [${vaultArgs}]`,
    );
};

export default func;
func.tags = ['Vault'];
