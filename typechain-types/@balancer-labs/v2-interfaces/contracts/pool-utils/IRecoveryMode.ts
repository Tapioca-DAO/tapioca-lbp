/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface IRecoveryModeInterface extends utils.Interface {
  functions: {
    "disableRecoveryMode()": FunctionFragment;
    "enableRecoveryMode()": FunctionFragment;
    "inRecoveryMode()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "disableRecoveryMode"
      | "enableRecoveryMode"
      | "inRecoveryMode"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "disableRecoveryMode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "enableRecoveryMode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "inRecoveryMode",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "disableRecoveryMode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enableRecoveryMode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "inRecoveryMode",
    data: BytesLike
  ): Result;

  events: {
    "RecoveryModeStateChanged(bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RecoveryModeStateChanged"): EventFragment;
}

export interface RecoveryModeStateChangedEventObject {
  enabled: boolean;
}
export type RecoveryModeStateChangedEvent = TypedEvent<
  [boolean],
  RecoveryModeStateChangedEventObject
>;

export type RecoveryModeStateChangedEventFilter =
  TypedEventFilter<RecoveryModeStateChangedEvent>;

export interface IRecoveryMode extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRecoveryModeInterface;

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
    disableRecoveryMode(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    enableRecoveryMode(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    inRecoveryMode(overrides?: CallOverrides): Promise<[boolean]>;
  };

  disableRecoveryMode(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  enableRecoveryMode(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  inRecoveryMode(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    disableRecoveryMode(overrides?: CallOverrides): Promise<void>;

    enableRecoveryMode(overrides?: CallOverrides): Promise<void>;

    inRecoveryMode(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "RecoveryModeStateChanged(bool)"(
      enabled?: null
    ): RecoveryModeStateChangedEventFilter;
    RecoveryModeStateChanged(
      enabled?: null
    ): RecoveryModeStateChangedEventFilter;
  };

  estimateGas: {
    disableRecoveryMode(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    enableRecoveryMode(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    inRecoveryMode(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    disableRecoveryMode(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    enableRecoveryMode(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    inRecoveryMode(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}