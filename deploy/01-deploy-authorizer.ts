import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {verify, updateDeployments} from './utils';
import {TContract} from 'tapioca-sdk/dist/shared';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await hre.getChainId();
    const contracts: TContract[] = [];

    console.log('\n Deploying Authorizer...');
    await deploy('Authorizer', {
        from: deployer,
        log: true,
        args: [deployer],
    });
    await verify(hre, 'Authorizer', [deployer.toString()]);
    const deployedAuthorizer = await deployments.get('Authorizer');

    contracts.push({
        name: 'Authorizer',
        address: deployedAuthorizer.address,
        meta: {constructorArguments: [deployer]},
    });

    await updateDeployments(contracts, chainId);
    console.log(
        `Deployed Authorizer on ${deployedAuthorizer.address} with args [${deployer}]`,
    );
};

export default func;
func.tags = ['Authorizer'];
