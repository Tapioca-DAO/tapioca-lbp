# WeightedPoolFactory









## Methods

### create

```solidity
function create(string name, string symbol, contract IERC20[] tokens, uint256[] normalizedWeights, contract IRateProvider[] rateProviders, uint256 swapFeePercentage, address owner) external nonpayable returns (address)
```



*Deploys a new `WeightedPool`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| name | string | undefined |
| symbol | string | undefined |
| tokens | contract IERC20[] | undefined |
| normalizedWeights | uint256[] | undefined |
| rateProviders | contract IRateProvider[] | undefined |
| swapFeePercentage | uint256 | undefined |
| owner | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

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

### getAuthorizer

```solidity
function getAuthorizer() external view returns (contract IAuthorizer)
```

Returns the Authorizer




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IAuthorizer | undefined |

### getCreationCode

```solidity
function getCreationCode() external view returns (bytes)
```



*Returns the creation code of the contract this factory creates.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes | undefined |

### getCreationCodeContracts

```solidity
function getCreationCodeContracts() external view returns (address contractA, address contractB)
```



*Returns the two addresses where the creation code of the contract crated by this factory is stored.*


#### Returns

| Name | Type | Description |
|---|---|---|
| contractA | address | undefined |
| contractB | address | undefined |

### getPauseConfiguration

```solidity
function getPauseConfiguration() external view returns (uint256 pauseWindowDuration, uint256 bufferPeriodDuration)
```



*Returns the current `TemporarilyPausable` configuration that will be applied to Pools created by this factory. `pauseWindowDuration` will decrease over time until it reaches zero, at which point both it and `bufferPeriodDuration` will be zero forever, meaning deployed Pools will not be pausable.*


#### Returns

| Name | Type | Description |
|---|---|---|
| pauseWindowDuration | uint256 | undefined |
| bufferPeriodDuration | uint256 | undefined |

### getProtocolFeePercentagesProvider

```solidity
function getProtocolFeePercentagesProvider() external view returns (contract IProtocolFeePercentagesProvider)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IProtocolFeePercentagesProvider | undefined |

### getVault

```solidity
function getVault() external view returns (contract IVault)
```

Returns the Balancer Vault




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IVault | undefined |

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



## Events

### FactoryDisabled

```solidity
event FactoryDisabled()
```






### PoolCreated

```solidity
event PoolCreated(address indexed pool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| pool `indexed` | address | undefined |



