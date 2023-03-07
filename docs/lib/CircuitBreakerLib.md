# CircuitBreakerLib



> Circuit Breaker Library

Library for logic and functions related to circuit breakers.



## Methods

### calcAdjustedBound

```solidity
function calcAdjustedBound(uint256 bound, uint256 weight, bool isLowerBound) external pure returns (uint256 boundRatio)
```

Convert a bound to a BPT price ratio



#### Parameters

| Name | Type | Description |
|---|---|---|
| bound | uint256 | - The bound percentage. |
| weight | uint256 | - The current normalized token weight. |
| isLowerBound | bool | - A flag indicating whether this is for a lower bound. |

#### Returns

| Name | Type | Description |
|---|---|---|
| boundRatio | uint256 | undefined |




