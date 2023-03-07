# IExternalWeightedMath





Interface for ExternalWeightedMath, a contract-wrapper for Weighted Math, Joins and Exits.



## Methods

### calcAllTokensInGivenExactBptOut

```solidity
function calcAllTokensInGivenExactBptOut(uint256[] balances, uint256 bptAmountOut, uint256 totalBPT) external pure returns (uint256[])
```



*See `WeightedMath._calcAllTokensInGivenExactBptOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| bptAmountOut | uint256 | undefined |
| totalBPT | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | undefined |

### calcBptInGivenExactTokenOut

```solidity
function calcBptInGivenExactTokenOut(uint256 balance, uint256 normalizedWeight, uint256 amountOut, uint256 bptTotalSupply, uint256 swapFeePercentage) external pure returns (uint256)
```



*See `WeightedMath._calcBptInGivenExactTokenOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balance | uint256 | undefined |
| normalizedWeight | uint256 | undefined |
| amountOut | uint256 | undefined |
| bptTotalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcBptInGivenExactTokensOut

```solidity
function calcBptInGivenExactTokensOut(uint256[] balances, uint256[] normalizedWeights, uint256[] amountsOut, uint256 bptTotalSupply, uint256 swapFeePercentage) external pure returns (uint256)
```



*See `WeightedMath._calcBptInGivenExactTokensOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| normalizedWeights | uint256[] | undefined |
| amountsOut | uint256[] | undefined |
| bptTotalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcBptOutAddToken

```solidity
function calcBptOutAddToken(uint256 totalSupply, uint256 normalizedWeight) external pure returns (uint256)
```



*See `WeightedMath._calcBptOutAddToken`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| totalSupply | uint256 | undefined |
| normalizedWeight | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcBptOutGivenExactTokenIn

```solidity
function calcBptOutGivenExactTokenIn(uint256 balance, uint256 normalizedWeight, uint256 amountIn, uint256 bptTotalSupply, uint256 swapFeePercentage) external pure returns (uint256)
```



*See `WeightedMath._calcBptOutGivenExactTokenIn`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balance | uint256 | undefined |
| normalizedWeight | uint256 | undefined |
| amountIn | uint256 | undefined |
| bptTotalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcBptOutGivenExactTokensIn

```solidity
function calcBptOutGivenExactTokensIn(uint256[] balances, uint256[] normalizedWeights, uint256[] amountsIn, uint256 bptTotalSupply, uint256 swapFeePercentage) external pure returns (uint256)
```



*See `WeightedMath._calcBptOutGivenExactTokensIn`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| normalizedWeights | uint256[] | undefined |
| amountsIn | uint256[] | undefined |
| bptTotalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcInGivenOut

```solidity
function calcInGivenOut(uint256 balanceIn, uint256 weightIn, uint256 balanceOut, uint256 weightOut, uint256 amountOut) external pure returns (uint256)
```



*See `WeightedMath._calcInGivenOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balanceIn | uint256 | undefined |
| weightIn | uint256 | undefined |
| balanceOut | uint256 | undefined |
| weightOut | uint256 | undefined |
| amountOut | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcOutGivenIn

```solidity
function calcOutGivenIn(uint256 balanceIn, uint256 weightIn, uint256 balanceOut, uint256 weightOut, uint256 amountIn) external pure returns (uint256)
```



*See `WeightedMath._calcOutGivenIn`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balanceIn | uint256 | undefined |
| weightIn | uint256 | undefined |
| balanceOut | uint256 | undefined |
| weightOut | uint256 | undefined |
| amountIn | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcTokenInGivenExactBptOut

```solidity
function calcTokenInGivenExactBptOut(uint256 balance, uint256 normalizedWeight, uint256 bptAmountOut, uint256 bptTotalSupply, uint256 swapFeePercentage) external pure returns (uint256)
```



*See `WeightedMath._calcTokenInGivenExactBptOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balance | uint256 | undefined |
| normalizedWeight | uint256 | undefined |
| bptAmountOut | uint256 | undefined |
| bptTotalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcTokenOutGivenExactBptIn

```solidity
function calcTokenOutGivenExactBptIn(uint256 balance, uint256 normalizedWeight, uint256 bptAmountIn, uint256 bptTotalSupply, uint256 swapFeePercentage) external pure returns (uint256)
```



*See `WeightedMath._calcTokenOutGivenExactBptIn`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balance | uint256 | undefined |
| normalizedWeight | uint256 | undefined |
| bptAmountIn | uint256 | undefined |
| bptTotalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### calcTokensOutGivenExactBptIn

```solidity
function calcTokensOutGivenExactBptIn(uint256[] balances, uint256 bptAmountIn, uint256 totalBPT) external pure returns (uint256[])
```



*See `WeightedMath._calcTokensOutGivenExactBptIn`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| bptAmountIn | uint256 | undefined |
| totalBPT | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | undefined |

### calculateInvariant

```solidity
function calculateInvariant(uint256[] normalizedWeights, uint256[] balances) external pure returns (uint256)
```



*See `WeightedMath._calculateInvariant`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| normalizedWeights | uint256[] | undefined |
| balances | uint256[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### exitBPTInForExactTokensOut

```solidity
function exitBPTInForExactTokensOut(uint256[] balances, uint256[] normalizedWeights, uint256[] scalingFactors, uint256 totalSupply, uint256 swapFeePercentage, bytes userData) external pure returns (uint256, uint256[])
```



*See `WeightedExitsLib.exitBPTInForExactTokensOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| normalizedWeights | uint256[] | undefined |
| scalingFactors | uint256[] | undefined |
| totalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |
| _1 | uint256[] | undefined |

### exitExactBPTInForTokenOut

```solidity
function exitExactBPTInForTokenOut(uint256[] balances, uint256[] normalizedWeights, uint256 totalSupply, uint256 swapFeePercentage, bytes userData) external pure returns (uint256, uint256[])
```



*See `WeightedExitsLib.exitExactBPTInForTokenOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| normalizedWeights | uint256[] | undefined |
| totalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |
| _1 | uint256[] | undefined |

### exitExactBPTInForTokensOut

```solidity
function exitExactBPTInForTokensOut(uint256[] balances, uint256 totalSupply, bytes userData) external pure returns (uint256 bptAmountIn, uint256[] amountsOut)
```



*See `WeightedExitsLib.exitExactBPTInForTokensOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| totalSupply | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| bptAmountIn | uint256 | undefined |
| amountsOut | uint256[] | undefined |

### joinAllTokensInForExactBPTOut

```solidity
function joinAllTokensInForExactBPTOut(uint256[] balances, uint256 totalSupply, bytes userData) external pure returns (uint256 bptAmountOut, uint256[] amountsIn)
```



*See `WeightedJoinsLib.joinAllTokensInForExactBPTOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| totalSupply | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| bptAmountOut | uint256 | undefined |
| amountsIn | uint256[] | undefined |

### joinExactTokensInForBPTOut

```solidity
function joinExactTokensInForBPTOut(uint256[] balances, uint256[] normalizedWeights, uint256[] scalingFactors, uint256 totalSupply, uint256 swapFeePercentage, bytes userData) external pure returns (uint256, uint256[])
```



*See `WeightedJoinsLib.joinExactTokensInForBPTOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| normalizedWeights | uint256[] | undefined |
| scalingFactors | uint256[] | undefined |
| totalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |
| _1 | uint256[] | undefined |

### joinTokenInForExactBPTOut

```solidity
function joinTokenInForExactBPTOut(uint256[] balances, uint256[] normalizedWeights, uint256 totalSupply, uint256 swapFeePercentage, bytes userData) external pure returns (uint256, uint256[])
```



*See `WeightedJoinsLib.joinTokenInForExactBPTOut`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| balances | uint256[] | undefined |
| normalizedWeights | uint256[] | undefined |
| totalSupply | uint256 | undefined |
| swapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |
| _1 | uint256[] | undefined |




