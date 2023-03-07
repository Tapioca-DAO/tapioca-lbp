# FactoryWidePauseWindow







*Utility to create Pool factories for Pools that use the `TemporarilyPausable` contract. By calling `TemporarilyPausable`&#39;s constructor with the result of `getPauseConfiguration`, all Pools created by this factory will share the same Pause Window end time, after which both old and new Pools will not be pausable.*

## Methods

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




