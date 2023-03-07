# BasePool





Reference implementation for the base layer of a Pool contract.

*Reference implementation for the base layer of a Pool contract that manages a single Pool with optional Asset Managers, an admin-controlled swap fee percentage, and an emergency pause mechanism. This Pool pays protocol fees by minting BPT directly to the ProtocolFeeCollector instead of using the `dueProtocolFees` return value. This results in the underlying tokens continuing to provide liquidity for traders, while still keeping gas usage to a minimum since only a single token (the BPT) is transferred. Note that neither swap fees nor the pause mechanism are used by this contract. They are passed through so that derived contracts can use them via the `_addSwapFeeAmount` and `_subtractSwapFeeAmount` functions, and the `whenNotPaused` modifier. No admin permissions are checked here: instead, this contract delegates that to the Vault&#39;s own Authorizer. Because this contract doesn&#39;t implement the swap hooks, derived contracts should generally inherit from BaseGeneralPool or BaseMinimalSwapInfoPool. Otherwise, subclasses must inherit from the corresponding interfaces and implement the swap callbacks themselves.*

## Methods

### DOMAIN_SEPARATOR

```solidity
function DOMAIN_SEPARATOR() external view returns (bytes32)
```



*See {IERC20Permit-DOMAIN_SEPARATOR}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```



*Override to grant the Vault infinite allowance, causing for Pool Tokens to not require approval. This is sound as the Vault already provides authorization mechanisms when initiation token transfers, which this contract inherits.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| spender | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### approve

```solidity
function approve(address spender, uint256 amount) external nonpayable returns (bool)
```



*See {IERC20-approve}. Requirements: - `spender` cannot be the zero address.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```



*See {IERC20-balanceOf}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### decimals

```solidity
function decimals() external view returns (uint8)
```



*Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless {_setupDecimals} is called. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 amount) external nonpayable returns (bool)
```



*Override to allow decreasing allowance by more than the current amount (setting it to zero)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

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

### getDomainSeparator

```solidity
function getDomainSeparator() external view returns (bytes32)
```



*Returns the EIP712 domain separator.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### getNextNonce

```solidity
function getNextNonce(address account) external view returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getOwner

```solidity
function getOwner() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

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

### getPoolId

```solidity
function getPoolId() external view returns (bytes32)
```

Return the pool id.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### getProtocolFeesCollector

```solidity
function getProtocolFeesCollector() external view returns (contract IProtocolFeesCollector)
```

Return the ProtocolFeesCollector contract.

*This is immutable, and retrieved from the Vault on construction. (It is also immutable in the Vault.)*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IProtocolFeesCollector | undefined |

### getScalingFactors

```solidity
function getScalingFactors() external view returns (uint256[])
```



*Returns the scaling factors of each of the Pool&#39;s tokens. This is an implementation detail that is typically not relevant for outside parties, but which might be useful for some types of Pools.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | undefined |

### getSwapFeePercentage

```solidity
function getSwapFeePercentage() external view returns (uint256)
```

Return the current value of the swap fee percentage.

*This is stored in `_miscData`.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### getVault

```solidity
function getVault() external view returns (contract IVault)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IVault | undefined |

### inRecoveryMode

```solidity
function inRecoveryMode() external view returns (bool)
```

Returns whether the pool is in Recovery Mode.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) external nonpayable returns (bool)
```



*Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | undefined |
| addedValue | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### name

```solidity
function name() external view returns (string)
```



*Returns the name of the token.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### nonces

```solidity
function nonces(address owner) external view returns (uint256)
```



*See {IERC20Permit-nonces}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### onExitPool

```solidity
function onExitPool(bytes32 poolId, address sender, address recipient, uint256[] balances, uint256 lastChangeBlock, uint256 protocolSwapFeePercentage, bytes userData) external nonpayable returns (uint256[], uint256[])
```

Vault hook for removing liquidity from a pool.

*This function can only be called from the Vault, from `exitPool`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| sender | address | undefined |
| recipient | address | undefined |
| balances | uint256[] | undefined |
| lastChangeBlock | uint256 | undefined |
| protocolSwapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | undefined |
| _1 | uint256[] | undefined |

### onJoinPool

```solidity
function onJoinPool(bytes32 poolId, address sender, address recipient, uint256[] balances, uint256 lastChangeBlock, uint256 protocolSwapFeePercentage, bytes userData) external nonpayable returns (uint256[], uint256[])
```

Vault hook for adding liquidity to a pool (including the first time, &quot;initializing&quot; the pool).

*This function can only be called from the Vault, from `joinPool`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| sender | address | undefined |
| recipient | address | undefined |
| balances | uint256[] | undefined |
| lastChangeBlock | uint256 | undefined |
| protocolSwapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | undefined |
| _1 | uint256[] | undefined |

### pause

```solidity
function pause() external nonpayable
```

Pause the pool: an emergency action which disables all pool functions.

*This is a permissioned function that will only work during the Pause Window set during pool factory deployment (see `TemporarilyPausable`).*


### permit

```solidity
function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external nonpayable
```



*See {IERC20Permit-permit}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |
| spender | address | undefined |
| value | uint256 | undefined |
| deadline | uint256 | undefined |
| v | uint8 | undefined |
| r | bytes32 | undefined |
| s | bytes32 | undefined |

### queryExit

```solidity
function queryExit(bytes32 poolId, address sender, address recipient, uint256[] balances, uint256 lastChangeBlock, uint256 protocolSwapFeePercentage, bytes userData) external nonpayable returns (uint256 bptIn, uint256[] amountsOut)
```

&quot;Dry run&quot; `onExitPool`.

*Returns the amount of BPT that would be burned from `sender` if the `onExitPool` hook were called by the Vault with the same arguments, along with the number of tokens `recipient` would receive. This function is not meant to be called directly, but rather from a helper contract that fetches current Vault data, such as the protocol swap fee percentage and Pool balances. Like `IVault.queryBatchSwap`, this function is not view due to internal implementation details: the caller must explicitly use eth_call instead of eth_sendTransaction.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| sender | address | undefined |
| recipient | address | undefined |
| balances | uint256[] | undefined |
| lastChangeBlock | uint256 | undefined |
| protocolSwapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| bptIn | uint256 | undefined |
| amountsOut | uint256[] | undefined |

### queryJoin

```solidity
function queryJoin(bytes32 poolId, address sender, address recipient, uint256[] balances, uint256 lastChangeBlock, uint256 protocolSwapFeePercentage, bytes userData) external nonpayable returns (uint256 bptOut, uint256[] amountsIn)
```

&quot;Dry run&quot; `onJoinPool`.

*Returns the amount of BPT that would be granted to `recipient` if the `onJoinPool` hook were called by the Vault with the same arguments, along with the number of tokens `sender` would have to supply. This function is not meant to be called directly, but rather from a helper contract that fetches current Vault data, such as the protocol swap fee percentage and Pool balances. Like `IVault.queryBatchSwap`, this function is not view due to internal implementation details: the caller must explicitly use eth_call instead of eth_sendTransaction.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| sender | address | undefined |
| recipient | address | undefined |
| balances | uint256[] | undefined |
| lastChangeBlock | uint256 | undefined |
| protocolSwapFeePercentage | uint256 | undefined |
| userData | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| bptOut | uint256 | undefined |
| amountsIn | uint256[] | undefined |

### setSwapFeePercentage

```solidity
function setSwapFeePercentage(uint256 swapFeePercentage) external nonpayable
```

Set the swap fee percentage.

*This is a permissioned function, and disabled if the pool is paused. The swap fee must be within the bounds set by MIN_SWAP_FEE_PERCENTAGE/MAX_SWAP_FEE_PERCENTAGE. Emits the SwapFeePercentageChanged event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| swapFeePercentage | uint256 | undefined |

### symbol

```solidity
function symbol() external view returns (string)
```



*Returns the symbol of the token, usually a shorter version of the name.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```



*See {IERC20-totalSupply}. The total supply should only be read using this function Can be overridden by derived contracts to store the total supply in a different way (e.g. packed with other storage values).*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transfer

```solidity
function transfer(address recipient, uint256 amount) external nonpayable returns (bool)
```



*See {IERC20-transfer}. Requirements: - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| recipient | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferFrom

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external nonpayable returns (bool)
```



*Override to allow for &#39;infinite allowance&#39; and let the token owner use `transferFrom` with no self-allowance*

#### Parameters

| Name | Type | Description |
|---|---|---|
| sender | address | undefined |
| recipient | address | undefined |
| amount | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### unpause

```solidity
function unpause() external nonpayable
```

Reverse a `pause` operation, and restore a pool to normal functionality.

*This is a permissioned function that will only work on a paused pool within the Buffer Period set during pool factory deployment (see `TemporarilyPausable`). Note that any paused pools will automatically unpause after the Buffer Period expires.*




## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| spender `indexed` | address | undefined |
| value  | uint256 | undefined |

### PausedStateChanged

```solidity
event PausedStateChanged(bool paused)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| paused  | bool | undefined |

### RecoveryModeStateChanged

```solidity
event RecoveryModeStateChanged(bool enabled)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| enabled  | bool | undefined |

### SwapFeePercentageChanged

```solidity
event SwapFeePercentageChanged(uint256 swapFeePercentage)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| swapFeePercentage  | uint256 | undefined |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| value  | uint256 | undefined |



