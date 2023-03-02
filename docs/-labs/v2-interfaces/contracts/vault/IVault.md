# IVault







*Full external interface for the Vault core contract - no external or public methods exist in the contract that don&#39;t override one of these declarations.*

## Methods

### WETH

```solidity
function WETH() external view returns (contract IWETH)
```



*Returns the Vault&#39;s WETH instance.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IWETH | undefined |

### batchSwap

```solidity
function batchSwap(enum IVault.SwapKind kind, IVault.BatchSwapStep[] swaps, contract IAsset[] assets, IVault.FundManagement funds, int256[] limits, uint256 deadline) external payable returns (int256[])
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| kind | enum IVault.SwapKind | undefined |
| swaps | IVault.BatchSwapStep[] | undefined |
| assets | contract IAsset[] | undefined |
| funds | IVault.FundManagement | undefined |
| limits | int256[] | undefined |
| deadline | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | int256[] | undefined |

### deregisterTokens

```solidity
function deregisterTokens(bytes32 poolId, contract IERC20[] tokens) external nonpayable
```



*Deregisters `tokens` for the `poolId` Pool. Must be called by the Pool&#39;s contract. Only registered tokens (via `registerTokens`) can be deregistered. Additionally, they must have zero total balance. For Pools with the Two Token specialization, `tokens` must have a length of two, that is, both tokens must be deregistered in the same `deregisterTokens` call. A deregistered token can be re-registered later on, possibly with a different Asset Manager. Emits a `TokensDeregistered` event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| tokens | contract IERC20[] | undefined |

### exitPool

```solidity
function exitPool(bytes32 poolId, address sender, address payable recipient, IVault.ExitPoolRequest request) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| sender | address | undefined |
| recipient | address payable | undefined |
| request | IVault.ExitPoolRequest | undefined |

### flashLoan

```solidity
function flashLoan(contract IFlashLoanRecipient recipient, contract IERC20[] tokens, uint256[] amounts, bytes userData) external nonpayable
```



*Performs a &#39;flash loan&#39;, sending tokens to `recipient`, executing the `receiveFlashLoan` hook on it, and then reverting unless the tokens plus a proportional protocol fee have been returned. The `tokens` and `amounts` arrays must have the same length, and each entry in these indicates the loan amount for each token contract. `tokens` must be sorted in ascending order. The &#39;userData&#39; field is ignored by the Vault, and forwarded as-is to `recipient` as part of the `receiveFlashLoan` call. Emits `FlashLoan` events.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| recipient | contract IFlashLoanRecipient | undefined |
| tokens | contract IERC20[] | undefined |
| amounts | uint256[] | undefined |
| userData | bytes | undefined |

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



*Returns the Vault&#39;s Authorizer.*


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

### getInternalBalance

```solidity
function getInternalBalance(address user, contract IERC20[] tokens) external view returns (uint256[])
```



*Returns `user`&#39;s Internal Balance for a set of tokens.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |
| tokens | contract IERC20[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | undefined |

### getNextNonce

```solidity
function getNextNonce(address user) external view returns (uint256)
```



*Returns the next nonce used by an address to sign messages.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

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

### getPool

```solidity
function getPool(bytes32 poolId) external view returns (address, enum IVault.PoolSpecialization)
```



*Returns a Pool&#39;s contract address and specialization setting.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | enum IVault.PoolSpecialization | undefined |

### getPoolTokenInfo

```solidity
function getPoolTokenInfo(bytes32 poolId, contract IERC20 token) external view returns (uint256 cash, uint256 managed, uint256 lastChangeBlock, address assetManager)
```



*Returns detailed information for a Pool&#39;s registered token. `cash` is the number of tokens the Vault currently holds for the Pool. `managed` is the number of tokens withdrawn and held outside the Vault by the Pool&#39;s token Asset Manager. The Pool&#39;s total balance for `token` equals the sum of `cash` and `managed`. Internally, `cash` and `managed` are stored using 112 bits. No action can ever cause a Pool&#39;s token `cash`, `managed` or `total` balance to be greater than 2^112 - 1. `lastChangeBlock` is the number of the block in which `token`&#39;s total balance was last modified (via either a join, exit, swap, or Asset Manager update). This value is useful to avoid so-called &#39;sandwich attacks&#39;, for example when developing price oracles. A change of zero (e.g. caused by a swap with amount zero) is considered a change for this purpose, and will update `lastChangeBlock`. `assetManager` is the Pool&#39;s token Asset Manager.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| token | contract IERC20 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| cash | uint256 | undefined |
| managed | uint256 | undefined |
| lastChangeBlock | uint256 | undefined |
| assetManager | address | undefined |

### getPoolTokens

```solidity
function getPoolTokens(bytes32 poolId) external view returns (contract IERC20[] tokens, uint256[] balances, uint256 lastChangeBlock)
```



*Returns a Pool&#39;s registered tokens, the total balance for each, and the latest block when *any* of the tokens&#39; `balances` changed. The order of the `tokens` array is the same order that will be used in `joinPool`, `exitPool`, as well as in all Pool hooks (where applicable). Calls to `registerTokens` and `deregisterTokens` may change this order. If a Pool only registers tokens once, and these are sorted in ascending order, they will be stored in the same order as passed to `registerTokens`. Total balances include both tokens held by the Vault and those withdrawn by the Pool&#39;s Asset Managers. These are the amounts used by joins, exits and swaps. For a detailed breakdown of token balances, use `getPoolTokenInfo` instead.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| tokens | contract IERC20[] | undefined |
| balances | uint256[] | undefined |
| lastChangeBlock | uint256 | undefined |

### getProtocolFeesCollector

```solidity
function getProtocolFeesCollector() external view returns (contract IProtocolFeesCollector)
```



*Returns the current protocol fee module.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IProtocolFeesCollector | undefined |

### hasApprovedRelayer

```solidity
function hasApprovedRelayer(address user, address relayer) external view returns (bool)
```



*Returns true if `user` has approved `relayer` to act as a relayer for them.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user | address | undefined |
| relayer | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### joinPool

```solidity
function joinPool(bytes32 poolId, address sender, address recipient, IVault.JoinPoolRequest request) external payable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| sender | address | undefined |
| recipient | address | undefined |
| request | IVault.JoinPoolRequest | undefined |

### managePoolBalance

```solidity
function managePoolBalance(IVault.PoolBalanceOp[] ops) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| ops | IVault.PoolBalanceOp[] | undefined |

### manageUserBalance

```solidity
function manageUserBalance(IVault.UserBalanceOp[] ops) external payable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| ops | IVault.UserBalanceOp[] | undefined |

### queryBatchSwap

```solidity
function queryBatchSwap(enum IVault.SwapKind kind, IVault.BatchSwapStep[] swaps, contract IAsset[] assets, IVault.FundManagement funds) external nonpayable returns (int256[] assetDeltas)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| kind | enum IVault.SwapKind | undefined |
| swaps | IVault.BatchSwapStep[] | undefined |
| assets | contract IAsset[] | undefined |
| funds | IVault.FundManagement | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| assetDeltas | int256[] | undefined |

### registerPool

```solidity
function registerPool(enum IVault.PoolSpecialization specialization) external nonpayable returns (bytes32)
```



*Registers the caller account as a Pool with a given specialization setting. Returns the Pool&#39;s ID, which is used in all Pool-related functions. Pools cannot be deregistered, nor can the Pool&#39;s specialization be changed. The caller is expected to be a smart contract that implements either `IGeneralPool` or `IMinimalSwapInfoPool`, depending on the chosen specialization setting. This contract is known as the Pool&#39;s contract. Note that the same contract may register itself as multiple Pools with unique Pool IDs, or in other words, multiple Pools may share the same contract. Emits a `PoolRegistered` event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| specialization | enum IVault.PoolSpecialization | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### registerTokens

```solidity
function registerTokens(bytes32 poolId, contract IERC20[] tokens, address[] assetManagers) external nonpayable
```



*Registers `tokens` for the `poolId` Pool. Must be called by the Pool&#39;s contract. Pools can only interact with tokens they have registered. Users join a Pool by transferring registered tokens, exit by receiving registered tokens, and can only swap registered tokens. Each token can only be registered once. For Pools with the Two Token specialization, `tokens` must have a length of two, that is, both tokens must be registered in the same `registerTokens` call, and they must be sorted in ascending order. The `tokens` and `assetManagers` arrays must have the same length, and each entry in these indicates the Asset Manager for the corresponding token. Asset Managers can manage a Pool&#39;s tokens via `managePoolBalance`, depositing and withdrawing them directly, and can even set their balance to arbitrary amounts. They are therefore expected to be highly secured smart contracts with sound design principles, and the decision to register an Asset Manager should not be made lightly. Pools can choose not to assign an Asset Manager to a given token by passing in the zero address. Once an Asset Manager is set, it cannot be changed except by deregistering the associated token and registering again with a different Asset Manager. Emits a `TokensRegistered` event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | bytes32 | undefined |
| tokens | contract IERC20[] | undefined |
| assetManagers | address[] | undefined |

### setAuthorizer

```solidity
function setAuthorizer(contract IAuthorizer newAuthorizer) external nonpayable
```



*Sets a new Authorizer for the Vault. The caller must be allowed by the current Authorizer to do this. Emits an `AuthorizerChanged` event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newAuthorizer | contract IAuthorizer | undefined |

### setPaused

```solidity
function setPaused(bool paused) external nonpayable
```



*Safety mechanism to pause most Vault operations in the event of an emergency - typically detection of an error in some part of the system. The Vault can only be paused during an initial time period, after which pausing is forever disabled. While the contract is paused, the following features are disabled: - depositing and transferring internal balance - transferring external balance (using the Vault&#39;s allowance) - swaps - joining Pools - Asset Manager interactions Internal Balance can still be withdrawn, and Pools exited.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| paused | bool | undefined |

### setRelayerApproval

```solidity
function setRelayerApproval(address sender, address relayer, bool approved) external nonpayable
```



*Allows `relayer` to act as a relayer for `sender` if `approved` is true, and disallows it otherwise. Emits a `RelayerApprovalChanged` event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| sender | address | undefined |
| relayer | address | undefined |
| approved | bool | undefined |

### swap

```solidity
function swap(IVault.SingleSwap singleSwap, IVault.FundManagement funds, uint256 limit, uint256 deadline) external payable returns (uint256)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| singleSwap | IVault.SingleSwap | undefined |
| funds | IVault.FundManagement | undefined |
| limit | uint256 | undefined |
| deadline | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |



## Events

### AuthorizerChanged

```solidity
event AuthorizerChanged(contract IAuthorizer indexed newAuthorizer)
```



*Emitted when a new authorizer is set by `setAuthorizer`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newAuthorizer `indexed` | contract IAuthorizer | undefined |

### ExternalBalanceTransfer

```solidity
event ExternalBalanceTransfer(contract IERC20 indexed token, address indexed sender, address recipient, uint256 amount)
```



*Emitted when a user&#39;s Vault ERC20 allowance is used by the Vault to transfer tokens to an external account.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| token `indexed` | contract IERC20 | undefined |
| sender `indexed` | address | undefined |
| recipient  | address | undefined |
| amount  | uint256 | undefined |

### FlashLoan

```solidity
event FlashLoan(contract IFlashLoanRecipient indexed recipient, contract IERC20 indexed token, uint256 amount, uint256 feeAmount)
```



*Emitted for each individual flash loan performed by `flashLoan`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| recipient `indexed` | contract IFlashLoanRecipient | undefined |
| token `indexed` | contract IERC20 | undefined |
| amount  | uint256 | undefined |
| feeAmount  | uint256 | undefined |

### InternalBalanceChanged

```solidity
event InternalBalanceChanged(address indexed user, contract IERC20 indexed token, int256 delta)
```



*Emitted when a user&#39;s Internal Balance changes, either from calls to `manageUserBalance`, or through interacting with Pools using Internal Balance. Because Internal Balance works exclusively with ERC20 tokens, ETH deposits and withdrawals will use the WETH address.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| user `indexed` | address | undefined |
| token `indexed` | contract IERC20 | undefined |
| delta  | int256 | undefined |

### PausedStateChanged

```solidity
event PausedStateChanged(bool paused)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| paused  | bool | undefined |

### PoolBalanceChanged

```solidity
event PoolBalanceChanged(bytes32 indexed poolId, address indexed liquidityProvider, contract IERC20[] tokens, int256[] deltas, uint256[] protocolFeeAmounts)
```



*Emitted when a user joins or exits a Pool by calling `joinPool` or `exitPool`, respectively.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId `indexed` | bytes32 | undefined |
| liquidityProvider `indexed` | address | undefined |
| tokens  | contract IERC20[] | undefined |
| deltas  | int256[] | undefined |
| protocolFeeAmounts  | uint256[] | undefined |

### PoolBalanceManaged

```solidity
event PoolBalanceManaged(bytes32 indexed poolId, address indexed assetManager, contract IERC20 indexed token, int256 cashDelta, int256 managedDelta)
```



*Emitted when a Pool&#39;s token Asset Manager alters its balance via `managePoolBalance`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId `indexed` | bytes32 | undefined |
| assetManager `indexed` | address | undefined |
| token `indexed` | contract IERC20 | undefined |
| cashDelta  | int256 | undefined |
| managedDelta  | int256 | undefined |

### PoolRegistered

```solidity
event PoolRegistered(bytes32 indexed poolId, address indexed poolAddress, enum IVault.PoolSpecialization specialization)
```



*Emitted when a Pool is registered by calling `registerPool`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId `indexed` | bytes32 | undefined |
| poolAddress `indexed` | address | undefined |
| specialization  | enum IVault.PoolSpecialization | undefined |

### RelayerApprovalChanged

```solidity
event RelayerApprovalChanged(address indexed relayer, address indexed sender, bool approved)
```



*Emitted every time a relayer is approved or disapproved by `setRelayerApproval`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| relayer `indexed` | address | undefined |
| sender `indexed` | address | undefined |
| approved  | bool | undefined |

### Swap

```solidity
event Swap(bytes32 indexed poolId, contract IERC20 indexed tokenIn, contract IERC20 indexed tokenOut, uint256 amountIn, uint256 amountOut)
```



*Emitted for each individual swap performed by `swap` or `batchSwap`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId `indexed` | bytes32 | undefined |
| tokenIn `indexed` | contract IERC20 | undefined |
| tokenOut `indexed` | contract IERC20 | undefined |
| amountIn  | uint256 | undefined |
| amountOut  | uint256 | undefined |

### TokensDeregistered

```solidity
event TokensDeregistered(bytes32 indexed poolId, contract IERC20[] tokens)
```



*Emitted when a Pool deregisters tokens by calling `deregisterTokens`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId `indexed` | bytes32 | undefined |
| tokens  | contract IERC20[] | undefined |

### TokensRegistered

```solidity
event TokensRegistered(bytes32 indexed poolId, contract IERC20[] tokens, address[] assetManagers)
```



*Emitted when a Pool registers tokens by calling `registerTokens`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId `indexed` | bytes32 | undefined |
| tokens  | contract IERC20[] | undefined |
| assetManagers  | address[] | undefined |



