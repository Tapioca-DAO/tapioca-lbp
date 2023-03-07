# BaseSplitCodeFactory







*Base factory for contracts whose creation code is so large that the factory cannot hold it. This happens when the contract&#39;s creation code grows close to 24kB. Note that this factory cannot help with contracts that have a *runtime* (deployed) bytecode larger than 24kB.*

## Methods

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




