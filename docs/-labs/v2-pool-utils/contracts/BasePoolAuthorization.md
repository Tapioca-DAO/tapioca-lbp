# BasePoolAuthorization







*Base authorization layer implementation for Pools. The owner account can call some of the permissioned functions - access control of the rest is delegated to the Authorizer. Note that this owner is immutable: more sophisticated permission schemes, such as multiple ownership, granular roles, etc., could be built on top of this by making the owner a smart contract. Access control of all other permissioned functions is delegated to an Authorizer. It is also possible to delegate control of *all* permissioned functions to the Authorizer by setting the owner address to `_DELEGATE_OWNER`.*

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




