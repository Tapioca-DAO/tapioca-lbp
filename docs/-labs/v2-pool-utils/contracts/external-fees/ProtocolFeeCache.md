# ProtocolFeeCache







*The Vault does not provide the protocol swap fee percentage in swap hooks (as swaps don&#39;t typically need this value), so for swaps that need this value, we would have to to fetch it ourselves from the ProtocolFeePercentagesProvider. Additionally, other protocol fee types (such as Yield or AUM) can only be obtained by making said call. However, these values change so rarely that it doesn&#39;t make sense to perform the required calls to get the current values in every single user interaction. Instead, we keep a local copy that can be permissionlessly updated by anyone with the real value. We also pack these values together, performing a single storage read to get them all.*

## Methods

### disableRecoveryMode

```solidity
function disableRecoveryMode() external nonpayable
```

Disable recovery mode, which disables the special safe exit path for LPs.

*Protocol fees are not paid while in Recovery Mode, so it should only remain active for as long as strictly necessary.*


### enableRecoveryMode

```solidity
function enableRecoveryMode() external nonpayable
```

Enable recovery mode, which enables a special safe exit path for LPs.

*Does not otherwise affect pool operations (beyond deferring payment of protocol fees), though some pools may perform certain operations in a &quot;safer&quot; manner that is less likely to fail, in an attempt to keep the pool running, even in a pathological state. Unlike the Pause operation, which is only available during a short window after factory deployment, Recovery Mode can always be enabled.*


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

### getAuthorizer

```solidity
function getAuthorizer() external view returns (contract IAuthorizer)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IAuthorizer | undefined |

### getOwner

```solidity
function getOwner() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getProtocolFeePercentageCache

```solidity
function getProtocolFeePercentageCache(uint256 feeType) external view returns (uint256)
```

Returns the cached protocol fee percentage.



#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getProviderFeeId

```solidity
function getProviderFeeId(uint256 feeType) external view returns (uint256)
```

Returns the provider fee ID for the given fee type.



#### Parameters

| Name | Type | Description |
|---|---|---|
| feeType | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### inRecoveryMode

```solidity
function inRecoveryMode() external view returns (bool)
```

Override to check storage and return whether the pool is in Recovery Mode




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### updateProtocolFeePercentageCache

```solidity
function updateProtocolFeePercentageCache() external nonpayable
```

Updates the cache to the latest value set by governance.

*Can be called by anyone to update the cached fee percentages.*




## Events

### ProtocolFeePercentageCacheUpdated

```solidity
event ProtocolFeePercentageCacheUpdated(bytes32 feeCache)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| feeCache  | bytes32 | undefined |

### RecoveryModeStateChanged

```solidity
event RecoveryModeStateChanged(bool enabled)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| enabled  | bool | undefined |



