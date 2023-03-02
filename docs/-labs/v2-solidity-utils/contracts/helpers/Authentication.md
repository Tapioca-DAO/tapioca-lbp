# Authentication







*Building block for performing access control on external functions. This contract is used via the `authenticate` modifier (or the `_authenticateCaller` function), which can be applied to external functions to only make them callable by authorized accounts. Derived contracts must implement the `_canPerform` function, which holds the actual access control logic.*

## Methods

### getActionId

```solidity
function getActionId(bytes4 selector) external view returns (bytes32)
```



*Returns the action identifier associated with the external function described by `selector`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| selector | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |




