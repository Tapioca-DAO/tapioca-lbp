/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IProtocolFeeCache,
  IProtocolFeeCacheInterface,
} from "../../../../../@balancer-labs/v2-interfaces/contracts/pool-utils/IProtocolFeeCache";

const _abi = [
  {
    inputs: [],
    name: "updateProtocolFeePercentageCache",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IProtocolFeeCache__factory {
  static readonly abi = _abi;
  static createInterface(): IProtocolFeeCacheInterface {
    return new utils.Interface(_abi) as IProtocolFeeCacheInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IProtocolFeeCache {
    return new Contract(address, _abi, signerOrProvider) as IProtocolFeeCache;
  }
}
