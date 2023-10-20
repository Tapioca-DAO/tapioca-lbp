import fs from 'fs';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import SDK from 'tapioca-sdk';
import {getSupportedChains} from 'tapioca-sdk/dist/api/utils';
import {TContract} from 'tapioca-sdk/dist/shared';
import {BigNumber, fp} from '../helpers/numbers';

let supportedChains: {[key: string]: any} = SDK.API.utils
    .getSupportedChains()
    .reduce(
        (sdkChains, chain) => ({
            ...sdkChains,
            [chain.name]: {
                ...chain,
            },
        }),
        {},
    );

export const constants: {[key: string]: any} = {
    '421613': {
        ...supportedChains['arbitrum_goerli'],
        wethAddress: '0x00AAc35Ff4f40FfA2E623D3E341762E75D47927b',
        tapAddress: '0x97f3E88DA4d26a67cb8415690E07d082652d3841',
        lbp: {
            name: 'Tapioca LBP',
            symbol: 'tLBP',
            tokens: [
                `0x00AAc35Ff4f40FfA2E623D3E341762E75D47927b`, //weth
                `0x97f3E88DA4d26a67cb8415690E07d082652d3841`, //tap
            ],
            weights: [fp(0.2), fp(0.8)],
            endWeights: [fp(0.8), fp(0.2)],
            swapFee: fp(0.0001),
            duration: 100 * 86400, //TODO: update with the real value
        },
    },
};

export const getDeployments = async (
    hre: HardhatRuntimeEnvironment,
    local?: boolean,
): Promise<TContract[]> => {
    if (local) {
        return JSON.parse(
            fs.readFileSync(
                SDK.API.utils.PROJECT_RELATIVE_DEPLOYMENT_PATH,
                'utf8',
            ),
        )[await hre.getChainId()];
    }
    return SDK.API.utils.getDeployment('tapioca-lbp', await hre.getChainId());
};

export const getDeployment = async (
    hre: HardhatRuntimeEnvironment,
    name: string,
) => {
    let deployments: TContract[] = [];

    try {
        deployments = await getDeployments(hre, true);
    } catch (e) {
        deployments = await getDeployments(hre);
    }

    const deployment = _.find(deployments, {name: name});
    if (!deployment) {
        throw new Error('[-] Contract not found');
    }

    const contract = await hre.ethers.getContractAt(name, deployment.address);

    return contract;
};

export const updateDeployments = async (
    contracts: TContract[],
    chainId: string,
) => {
    await SDK.API.utils.saveDeploymentOnDisk({
        [chainId]: contracts,
    });
};

export const verify = async (
    hre: HardhatRuntimeEnvironment,
    artifact: string,
    args: any[],
) => {
    const {deployments} = hre;

    let deployed = await deployments.get(artifact);
    console.log(`[+] Verifying ${artifact}`);
    try {
        await hre.run('verify', {
            address: deployed.address,
            constructorArgsParams: args,
        });
        console.log('[+] Verified');
    } catch (err: any) {
        console.log(
            `[-] failed to verify ${artifact}; error: ${err.message}\n`,
        );
    }
};
