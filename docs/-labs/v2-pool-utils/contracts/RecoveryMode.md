# RecoveryMode





Handle storage and state changes for pools that support &quot;Recovery Mode&quot;.

*This is intended to provide a safe way to exit any pool during some kind of emergency, to avoid locking funds in the event the pool enters a non-functional state (i.e., some code that normally runs during exits is causing them to revert). Recovery Mode is *not* the same as pausing the pool. The pause function is only available during a short window after factory deployment. Pausing can only be intentionally reversed during a buffer period, and the contract will permanently unpause itself thereafter. Paused pools are completely disabled, in a kind of suspended animation, until they are voluntarily or involuntarily unpaused. By contrast, a privileged account - typically a governance multisig - can place a pool in Recovery Mode at any time, and it is always reversible. The pool is *not* disabled while in this mode: though of course whatever condition prompted the transition to Recovery Mode has likely effectively disabled some functions. Rather, a special &quot;clean&quot; exit is enabled, which runs the absolute minimum code necessary to exit proportionally. In particular, stable pools do not attempt to compute the invariant (which is a complex, iterative calculation that can fail in extreme circumstances), and no protocol fees are collected. It is critical to ensure that turning on Recovery Mode would do no harm, if activated maliciously or in error.*

## Methods

### disableRecoveryMode

```solidity
function disableRecoveryMode() external nonpayable
```

Disable recovery mode, which disables the special safe exit path for LPs.

*Protocol fees are not paid while in Recovery Mode, so it should only remain active for as long as strictly necessary.*


### enableRecoveryMode

```solidity
function enableRecoveryMode() external nonpayable
```

Enable recovery mode, which enables a special safe exit path for LPs.

*Does not otherwise affect pool operations (beyond deferring payment of protocol fees), though some pools may perform certain operations in a &quot;safer&quot; manner that is less likely to fail, in an attempt to keep the pool running, even in a pathological state. Unlike the Pause operation, which is only available during a short window after factory deployment, Recovery Mode can always be enabled.*


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

### inRecoveryMode

```solidity
function inRecoveryMode() external view returns (bool)
```

Override to check storage and return whether the pool is in Recovery Mode




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |



## Events

### RecoveryModeStateChanged

```solidity
event RecoveryModeStateChanged(bool enabled)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| enabled  | bool | undefined |



