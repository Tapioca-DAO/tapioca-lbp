# TemporarilyPausable







*Allows for a contract to be paused during an initial period after deployment, disabling functionality. Can be used as an emergency switch in case a security vulnerability or threat is identified. The contract can only be paused during the Pause Window, a period that starts at deployment. It can also be unpaused and repaused any number of times during this period. This is intended to serve as a safety measure: it lets system managers react quickly to potentially dangerous situations, knowing that this action is reversible if careful analysis later determines there was a false alarm. If the contract is paused when the Pause Window finishes, it will remain in the paused state through an additional Buffer Period, after which it will be automatically unpaused forever. This is to ensure there is always enough time to react to an emergency, even if the threat is discovered shortly before the Pause Window expires. Note that since the contract can only be paused within the Pause Window, unpausing during the Buffer Period is irreversible.*

## Methods

### getPausedState

```solidity
function getPausedState() external view returns (bool paused, uint256 pauseWindowEndTime, uint256 bufferPeriodEndTime)
```



*Returns the current contract pause status, as well as the end times of the Pause Window and Buffer Period.*


#### Returns

| Name | Type | Description |
|---|---|---|
| paused | bool | undefined |
| pauseWindowEndTime | uint256 | undefined |
| bufferPeriodEndTime | uint256 | undefined |



## Events

### PausedStateChanged

```solidity
event PausedStateChanged(bool paused)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| paused  | bool | undefined |



