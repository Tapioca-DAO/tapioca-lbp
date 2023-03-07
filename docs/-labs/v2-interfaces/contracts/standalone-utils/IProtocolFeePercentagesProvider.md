# IProtocolFeePercentagesProvider







*Source of truth for all Protocol Fee percentages, that is, how much the protocol charges certain actions. Some of these values may also be retrievable from other places (such as the swap fee percentage), but this is the preferred source nonetheless.*

## Methods

### getFeeTypeMaximumPercentage

```solidity
function getFeeTypeMaximumPercentage(uint256 feeType) external view returns (uint256)
```



*Returns `feeType`&#39;s maximum value.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getFeeTypeName

```solidity
function getFeeTypeName(uint256 feeType) external view returns (string)
```



*Returns `feeType`&#39;s name.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### getFeeTypePercentage

```solidity
function getFeeTypePercentage(uint256 feeType) external view returns (uint256)
```



*Returns the current percentage value for `feeType`. This is the preferred mechanism for querying these - whenever possible, use this fucntion instead of e.g. querying the ProtocolFeesCollector.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### isValidFeeType

```solidity
function isValidFeeType(uint256 feeType) external view returns (bool)
```



*Returns true if `feeType` has been registered and can be queried.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### isValidFeeTypePercentage

```solidity
function isValidFeeTypePercentage(uint256 feeType, uint256 value) external view returns (bool)
```



*Returns true if `value` is a valid percentage value for `feeType`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |
| value | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### registerFeeType

```solidity
function registerFeeType(uint256 feeType, string name, uint256 maximumValue, uint256 initialValue) external nonpayable
```



*Registers a new fee type in the system, making it queryable via `getFeeTypePercentage` and `getFeeTypeName`, as well as configurable via `setFeeTypePercentage`. `feeType` can be any arbitrary value (that is not in use). It is not possible to de-register fee types, nor change their name or maximum value.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |
| name | string | undefined |
| maximumValue | uint256 | undefined |
| initialValue | uint256 | undefined |

### setFeeTypePercentage

```solidity
function setFeeTypePercentage(uint256 feeType, uint256 newValue) external nonpayable
```



*Sets the percentage value for `feeType` to `newValue`. IMPORTANT: it is possible for a third party to modify the SWAP and FLASH_LOAN fee type values directly in the ProtocolFeesCollector, without invoking this function. This will result in the `ProtocolFeePercentageChanged` event not being emitted despite their value changing. Such usage of the ProtocolFeesCollector is however discouraged: only this contract should be granted permission to call `setSwapFeePercentage` and `setFlashLoanFeePercentage`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |
| newValue | uint256 | undefined |



## Events

### ProtocolFeePercentageChanged

```solidity
event ProtocolFeePercentageChanged(uint256 indexed feeType, uint256 percentage)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType `indexed` | uint256 | undefined |
| percentage  | uint256 | undefined |

### ProtocolFeeTypeRegistered

```solidity
event ProtocolFeeTypeRegistered(uint256 indexed feeType, string name, uint256 maximumPercentage)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType `indexed` | uint256 | undefined |
| name  | string | undefined |
| maximumPercentage  | uint256 | undefined |



