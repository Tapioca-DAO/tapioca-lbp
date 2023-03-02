# ISignaturesValidator







*Interface for the SignatureValidator helper, used to support meta-transactions.*

## Methods

### getDomainSeparator

```solidity
function getDomainSeparator() external view returns (bytes32)
```



*Returns the EIP712 domain separator.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### getNextNonce

```solidity
function getNextNonce(address user) external view returns (uint256)
```



*Returns the next nonce used by an address to sign messages.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |




