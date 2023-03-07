# IBasePoolFactory









## Methods

### disable

```solidity
function disable() external nonpayable
```



*Disable the factory, preventing the creation of more pools. Already existing pools are unaffected. Once a factory is disabled, it cannot be re-enabled.*


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

### isDisabled

```solidity
function isDisabled() external view returns (bool)
```



*Check whether the derived factory has been disabled.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### isPoolFromFactory

```solidity
function isPoolFromFactory(address pool) external view returns (bool)
```



*Returns true if `pool` was created by this factory.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| pool | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |




