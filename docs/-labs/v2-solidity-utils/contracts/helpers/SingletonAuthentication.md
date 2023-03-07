# SingletonAuthentication









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

### getAuthorizer

```solidity
function getAuthorizer() external view returns (contract IAuthorizer)
```

Returns the Authorizer




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IAuthorizer | undefined |

### getVault

```solidity
function getVault() external view returns (contract IVault)
```

Returns the Balancer Vault




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IVault | undefined |




