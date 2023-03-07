# IRateProviderPool







*Interface for Pools that assign rate providers to their tokens.*

## Methods

### getRateProviders

```solidity
function getRateProviders() external view returns (contract IRateProvider[])
```



*Returns the rate provider for each of the Pool&#39;s tokens. A zero-address entry means there&#39;s no rate provider for that token.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IRateProvider[] | undefined |




