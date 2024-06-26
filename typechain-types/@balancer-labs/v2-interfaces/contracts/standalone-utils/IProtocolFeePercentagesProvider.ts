/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface IProtocolFeePercentagesProviderInterface
  extends utils.Interface {
  functions: {
    "getFeeTypeMaximumPercentage(uint256)": FunctionFragment;
    "getFeeTypeName(uint256)": FunctionFragment;
    "getFeeTypePercentage(uint256)": FunctionFragment;
    "isValidFeeType(uint256)": FunctionFragment;
    "isValidFeeTypePercentage(uint256,uint256)": FunctionFragment;
    "registerFeeType(uint256,string,uint256,uint256)": FunctionFragment;
    "setFeeTypePercentage(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getFeeTypeMaximumPercentage"
      | "getFeeTypeName"
      | "getFeeTypePercentage"
      | "isValidFeeType"
      | "isValidFeeTypePercentage"
      | "registerFeeType"
      | "setFeeTypePercentage"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getFeeTypeMaximumPercentage",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeeTypeName",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeeTypePercentage",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidFeeType",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidFeeTypePercentage",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerFeeType",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeTypePercentage",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getFeeTypeMaximumPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeeTypeName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeeTypePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidFeeType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidFeeTypePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerFeeType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeTypePercentage",
    data: BytesLike
  ): Result;

  events: {
    "ProtocolFeePercentageChanged(uint256,uint256)": EventFragment;
    "ProtocolFeeTypeRegistered(uint256,string,uint256)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "ProtocolFeePercentageChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProtocolFeeTypeRegistered"): EventFragment;
}

export interface ProtocolFeePercentageChangedEventObject {
  feeType: BigNumber;
  percentage: BigNumber;
}
export type ProtocolFeePercentageChangedEvent = TypedEvent<
  [BigNumber, BigNumber],
  ProtocolFeePercentageChangedEventObject
>;

export type ProtocolFeePercentageChangedEventFilter =
  TypedEventFilter<ProtocolFeePercentageChangedEvent>;

export interface ProtocolFeeTypeRegisteredEventObject {
  feeType: BigNumber;
  name: string;
  maximumPercentage: BigNumber;
}
export type ProtocolFeeTypeRegisteredEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  ProtocolFeeTypeRegisteredEventObject
>;

export type ProtocolFeeTypeRegisteredEventFilter =
  TypedEventFilter<ProtocolFeeTypeRegisteredEvent>;

export interface IProtocolFeePercentagesProvider extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IProtocolFeePercentagesProviderInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getFeeTypeMaximumPercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getFeeTypeName(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isValidFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isValidFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      maximumValue: PromiseOrValue<BigNumberish>,
      initialValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getFeeTypeMaximumPercentage(
    feeType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getFeeTypeName(
    feeType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getFeeTypePercentage(
    feeType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isValidFeeType(
    feeType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isValidFeeTypePercentage(
    feeType: PromiseOrValue<BigNumberish>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerFeeType(
    feeType: PromiseOrValue<BigNumberish>,
    name: PromiseOrValue<string>,
    maximumValue: PromiseOrValue<BigNumberish>,
    initialValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFeeTypePercentage(
    feeType: PromiseOrValue<BigNumberish>,
    newValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getFeeTypeMaximumPercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeTypeName(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isValidFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      maximumValue: PromiseOrValue<BigNumberish>,
      initialValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ProtocolFeePercentageChanged(uint256,uint256)"(
      feeType?: PromiseOrValue<BigNumberish> | null,
      percentage?: null
    ): ProtocolFeePercentageChangedEventFilter;
    ProtocolFeePercentageChanged(
      feeType?: PromiseOrValue<BigNumberish> | null,
      percentage?: null
    ): ProtocolFeePercentageChangedEventFilter;

    "ProtocolFeeTypeRegistered(uint256,string,uint256)"(
      feeType?: PromiseOrValue<BigNumberish> | null,
      name?: null,
      maximumPercentage?: null
    ): ProtocolFeeTypeRegisteredEventFilter;
    ProtocolFeeTypeRegistered(
      feeType?: PromiseOrValue<BigNumberish> | null,
      name?: null,
      maximumPercentage?: null
    ): ProtocolFeeTypeRegisteredEventFilter;
  };

  estimateGas: {
    getFeeTypeMaximumPercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeTypeName(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      maximumValue: PromiseOrValue<BigNumberish>,
      initialValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getFeeTypeMaximumPercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeeTypeName(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerFeeType(
      feeType: PromiseOrValue<BigNumberish>,
      name: PromiseOrValue<string>,
      maximumValue: PromiseOrValue<BigNumberish>,
      initialValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFeeTypePercentage(
      feeType: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
