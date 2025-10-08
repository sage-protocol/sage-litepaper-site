# Protocol Architecture

This document outlines the high-level architecture of the Sage Protocol smart contracts. The protocol is designed to be a modular and extensible system for community-owned agent instructions.

## Core Components

The protocol is built around a few core components:

-   **SubDAO Factory (`SubDAOFactoryOptimized.sol`)**: This is the main entry point for creating new SubDAOs. It uses EIP-1167 minimal proxies (clones) to deploy new SubDAO instances gas-efficiently. The factory is responsible for setting up the initial configuration of a SubDAO, including its governance model, access control, and prompt registry.

-   **SubDAO (`SubDAO.sol`)**: A SubDAO is a self-governed entity that manages a collection of prompt libraries. Each SubDAO has its own treasury, governance contract (`PromptGovernor`), and prompt registry (`PromptRegistry`).

-   **Prompt Registry (`PromptRegistry.sol`)**: This contract is responsible for storing and managing prompts. It supports versioning, forking, and attribution, allowing communities to curate and evolve their prompt libraries over time.

-   **Prompt Governor (`PromptGovernor.sol`)**: This is the governance contract for a SubDAO. It allows members to create and vote on proposals related to the SubDAO's prompt libraries and treasury. The governor uses the `SXXX` token for voting and staking.

-   **SXXX Token (`SXXX.sol`, `SXXXProper.sol`)**: The `SXXX` token is the native governance token of the Sage Protocol. It is used for staking, voting, and participating in the protocol's incentive mechanisms.

- **Library Registry (`LibraryRegistry.sol`)**: Serves as a global, append-only directory of all library manifests, solving the critical problem of library discovery across the protocol.

- **IPFS Worker**: A Cloudflare Worker that handles IPFS uploads, pinning, and authentication. It also manages the credits ledger for paid pinning and the prompt commerce ledger for selling prompts.

- **MCP Server**: The Model Context Protocol server, which provides a stdio-safe wrapper around the CLI's MCP server. It's the main interface for agents to interact with the Sage Protocol, enabling semantic search and IDE integrations.

## Production Architecture: LaunchGate & Multisig Treasury

The production architecture for launching Liquidity Bootstrapping Pools (LBPs) on Doppler is centered around the `LaunchGate.sol` contract and a multisig-managed treasury (e.g., a Gnosis Safe). This setup ensures that all auction creation and migration actions are executed securely and with the approval of multiple stakeholders.

### Key Features

-   **Multisig-Managed Treasury**: The treasury is a Gnosis Safe controlled by a set of trusted individuals (the multisig). This provides a high level of security for managing the protocol's funds.

-   **Treasury-Owned LaunchGate**: The `LaunchGate` contract is owned and controlled by the multisig treasury. This makes the treasury the single point of authority for all auction-related activities.

-   **Prepare-Only CLI Flow**: The `sage-cli` prepares Safe transaction payloads for auction creation, which are then executed by the multisig. This prevents direct write access from local wallets, enhancing security.

-   **Centralized Configuration**: The `LaunchGate` centralizes the configuration of key parameters like the Doppler factory address, fee recipients, and fee structures.

-   **Auditable Events**: The `LaunchGate` emits detailed events for all launch executions, providing a clear audit trail for subgraphs and other off-chain services.

### Architecture Diagram

```
+-----------------+      +------------------+
| Multisig Safe   |----->|   LaunchGate     |
| (Treasury)      | owns +------------------+
+-----------------+      | - launchDynamic()|
        ^                | - launchStatic() |
        | executes       +------------------+
        |                      |
+-----------------+            | calls
| safe-payload.json|            v
+-----------------+      +------------------+
        ^                |  Doppler Factory |
        | generates      +------------------+
        |                      | creates
+-----------------+            v
|      CLI        |      +------------------+
+-----------------+      |     Auction      |
                         +------------------+
```