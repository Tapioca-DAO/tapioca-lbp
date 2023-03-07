# IProtocolFeesCollector









## Methods

### getAuthorizer

```solidity
function getAuthorizer() external view returns (contract IAuthorizer)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IAuthorizer | undefined |

### getCollectedFeeAmounts

```solidity
function getCollectedFeeAmounts(contract IERC20[] tokens) external view returns (uint256[] feeAmounts)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens | contract IERC20[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| feeAmounts | uint256[] | undefined |

### getFlashLoanFeePercentage

```solidity
function getFlashLoanFeePercentage() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getSwapFeePercentage

```solidity
function getSwapFeePercentage() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### setFlashLoanFeePercentage

```solidity
function setFlashLoanFeePercentage(uint256 newFlashLoanFeePercentage) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| newFlashLoanFeePercentage | uint256 | undefined |

### setSwapFeePercentage

```solidity
function setSwapFeePercentage(uint256 newSwapFeePercentage) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| newSwapFeePercentage | uint256 | undefined |

### vault

```solidity
function vault() external view returns (contract IVault)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IVault | undefined |

### withdrawCollectedFees

```solidity
function withdrawCollectedFees(contract IERC20[] tokens, uint256[] amounts, address recipient) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens | contract IERC20[] | undefined |
| amounts | uint256[] | undefined |
| recipient | address | undefined |



## Events

### FlashLoanFeePercentageChanged

```solidity
event FlashLoanFeePercentageChanged(uint256 newFlashLoanFeePercentage)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| newFlashLoanFeePercentage  | uint256 | undefined |

### SwapFeePercentageChanged

```solidity
event SwapFeePercentageChanged(uint256 newSwapFeePercentage)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| newSwapFeePercentage  | uint256 | undefined |



