/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface CircuitBreakerLibInterface extends utils.Interface {
  functions: {
    "calcAdjustedBound(uint256,uint256,bool)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "calcAdjustedBound"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calcAdjustedBound",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "calcAdjustedBound",
    data: BytesLike
  ): Result;

  events: {};
}

export interface CircuitBreakerLib extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CircuitBreakerLibInterface;

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
    calcAdjustedBound(
      bound: PromiseOrValue<BigNumberish>,
      weight: PromiseOrValue<BigNumberish>,
      isLowerBound: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { boundRatio: BigNumber }>;
  };

  calcAdjustedBound(
    bound: PromiseOrValue<BigNumberish>,
    weight: PromiseOrValue<BigNumberish>,
    isLowerBound: PromiseOrValue<boolean>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    calcAdjustedBound(
      bound: PromiseOrValue<BigNumberish>,
      weight: PromiseOrValue<BigNumberish>,
      isLowerBound: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    calcAdjustedBound(
      bound: PromiseOrValue<BigNumberish>,
      weight: PromiseOrValue<BigNumberish>,
      isLowerBound: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calcAdjustedBound(
      bound: PromiseOrValue<BigNumberish>,
      weight: PromiseOrValue<BigNumberish>,
      isLowerBound: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
