# ITemporarilyPausable







*Interface for the TemporarilyPausable helper.*

## Methods

### getPausedState

```solidity
function getPausedState() external view returns (bool paused, uint256 pauseWindowEndTime, uint256 bufferPeriodEndTime)
```



*Returns the current paused state.*


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



*Emitted every time the pause state changes by `_setPaused`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| paused  | bool | undefined |



