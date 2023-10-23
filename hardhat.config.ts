import * as dotenv from 'dotenv';

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-ignore-warnings';
import 'hardhat-deploy';

import {hardhatBaseConfig} from './common';
import {name} from './package.json';

import {task} from 'hardhat/config';
import {TASK_COMPILE} from 'hardhat/builtin-tasks/task-names';
import overrideQueryFunctions from './helpers/plugins/overrideQueryFunctions';
import SDK from 'tapioca-sdk';

task(TASK_COMPILE).setAction(overrideQueryFunctions);
import {fillLbptest__task} from './tasks/setups/01-setupLbp-test';

dotenv.config();

let supportedChains: {[key: string]: HttpNetworkConfig} = SDK.API.utils
    .getSupportedChains()
    .reduce(
        (sdkChains, chain) => ({
            ...sdkChains,
            [chain.name]: <HttpNetworkConfig>{
                accounts:
                    process.env.PRIVATE_KEY !== undefined
                        ? [process.env.PRIVATE_KEY]
                        : [],
                live: true,
                url: chain.rpc.replace('<api_key>', process.env.ALCHEMY_KEY),
                gasMultiplier: chain.tags.includes('testnet') ? 2 : 1,
                chainId: Number(chain.chainId),
            },
        }),
        {},
    );

const compilers = hardhatBaseConfig.compilers;
compilers.push({
    version: '0.8.9',
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
});
export default {
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: false,
        },
        //testnets
        goerli: supportedChains['goerli'],
        bnb_testnet: supportedChains['bnb_testnet'],
        fuji_avalanche: supportedChains['fuji_avalanche'],
        mumbai: supportedChains['mumbai'],
        fantom_testnet: supportedChains['fantom_testnet'],
        arbitrum_goerli: supportedChains['arbitrum_goerli'],
        optimism_goerli: supportedChains['optimism_goerli'],
        harmony_testnet: supportedChains['harmony_testnet'],

        //mainnets
        ethereum: supportedChains['ethereum'],
        bnb: supportedChains['bnb'],
        avalanche: supportedChains['avalanche'],
        matic: supportedChains['polygon'],
        arbitrum: supportedChains['arbitrum'],
        optimism: supportedChains['optimism'],
        fantom: supportedChains['fantom'],
        harmony: supportedChains['harmony'],
    },
    solidity: {
        compilers: compilers,
        overrides: {...hardhatBaseConfig.overrides(name)},
    },
    warnings: hardhatBaseConfig.warnings,
    mocha: {
        timeout: 50000000,
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY,
    },
};

task('fillLbptest', 'setup mock lbp', fillLbptest__task)
    .addParam('lbp')
    .addParam('vault')
    .addParam('owner');
