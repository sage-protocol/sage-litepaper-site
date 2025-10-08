# Protocol Architecture

This document outlines the high-level architecture of the Sage Protocol smart contracts. The protocol is designed to be a modular and extensible system for community-owned agent instructions.

## Core Components

The protocol is built around a few core components:

- **SubDAO Factory (`SubDAOFactoryOptimized.sol`)**: This is the main entry point for creating new SubDAOs. It uses EIP-1167 minimal proxies (clones) to deploy new SubDAO instances gas-efficiently. The factory is responsible for setting up the initial configuration of a SubDAO, including its governance model, access control, and prompt registry.

- **SubDAO (`SubDAO.sol`)**: A SubDAO is a self-governed entity that manages a collection of prompt libraries. Each SubDAO has its own treasury, governance contract (`PromptGovernor`), and prompt registry (`PromptRegistry`).

- **Prompt Registry (`PromptRegistry.sol`)**: This contract is responsible for storing and managing prompts. It supports versioning, forking, and attribution, allowing communities to curate and evolve their prompt libraries over time.

- **Prompt Governor (`PromptGovernor.sol`)**: This is the governance contract for a SubDAO. It allows members to create and vote on proposals related to the SubDAO's prompt libraries and treasury. The governor uses the `SXXX` token for voting and staking.

- **SXXX Token (`SXXX.sol`, `SXXXProper.sol`)**: The `SXXX` token is the native governance token of the Sage Protocol. It is used for staking, voting, and participating in the protocol's incentive mechanisms.

- **Library Registry (`LibraryRegistry.sol`)**: Serves as a global, append-only directory of all library manifests, solving the critical problem of library discovery across the protocol.

- **IPFS Worker**: A Cloudflare Worker that handles IPFS uploads, pinning, and authentication. It also manages the credits ledger for paid pinning and the prompt commerce ledger for selling prompts.

- **MCP Server**: The Model Context Protocol server, which provides a stdio-safe wrapper around the CLI's MCP server. It's the main interface for agents to interact with the Sage Protocol, enabling semantic search and IDE integrations.

## Production Architecture: LaunchGate & Multisig Treasury

The production architecture for launching Liquidity Bootstrapping Pools (LBPs) on Doppler is centered around the `LaunchGate.sol` contract and a multisig-managed treasury (e.g., a Gnosis Safe). This setup ensures that all auction creation and migration actions are executed securely and with the approval of multiple stakeholders.

### Key Features

- **On-chain Spend Limits**: TreasuryWrapper uses ARBAC roles and selector allowlists, meaning every LaunchGate call must match an approved function/limit. Policy enforcement lives on-chain instead of in an off-chain playbook.

- **DAO Executor Role**: The DAO timelock is granted `DAO_EXECUTOR_ROLE` and may trigger LaunchGate actions directly. The Safe retains admin powers (can revoke limits/roles) but does not have to co-sign each DAO transaction.

- **Custodial Wrapper**: TreasuryWrapper actually holds USDC/ETH required for launches. The Safe funds the wrapper, but LaunchGate executions spend wrapper-held balances, keeping treasury flows transparent on-chain.

- **Prepare-Only CLI Flow**: The `sage` CLI still produces Safe payloads so operators review and approve before the Safe signs. Those payloads target TreasuryWrapper, which then invokes LaunchGate.

- **Registry-driven Configuration**: LaunchGate reads factories, fee recipients, and router/token addresses from the protocol registry that TreasuryWrapper admins control.

- **Auditable Events**: TreasuryWrapper and LaunchGate emit detailed events for every execution, providing a layered audit trail for subgraphs and observability pipelines.

### Architecture Diagram

```
+-----------------+      +---------------------+
| Multisig Safe   |----->|   TreasuryWrapper   |
| (Protocol)      | owns +---------------------+
+-----------------+      | - on-chain limits   |
        ^                | - ARBAC roles       |
        | funds/config   +---------------------+
        |                      |
+-----------------+            | owns
| safe-payload.json|           v
+-----------------+      +------------------+
        ^                |   LaunchGate     |
        | generates      +------------------+
        |                      | calls
+-----------------+            v
|      CLI        |      +------------------+
+-----------------+      |  Doppler Factory |
                         +------------------+
                                 |
                                 v
                           +-----------+
                           |  Auction  |
                           +-----------+
```
