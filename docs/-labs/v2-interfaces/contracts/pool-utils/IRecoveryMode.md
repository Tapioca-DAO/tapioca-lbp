# IRecoveryMode







*Interface for the RecoveryMode module.*

## Methods

### disableRecoveryMode

```solidity
function disableRecoveryMode() external nonpayable
```

Disables Recovery Mode in the Pool, restoring protocol fee collection and disallowing proportional exits.




### enableRecoveryMode

```solidity
function enableRecoveryMode() external nonpayable
```

Enables Recovery Mode in the Pool, disabling protocol fee collection and allowing for safe proportional exits with low computational complexity and no dependencies.




### inRecoveryMode

```solidity
function inRecoveryMode() external view returns (bool)
```

Returns true if the Pool is in Recovery Mode.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |



## Events

### RecoveryModeStateChanged

```solidity
event RecoveryModeStateChanged(bool enabled)
```



*Emitted when the Recovery Mode status changes.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| enabled  | bool | undefined |



