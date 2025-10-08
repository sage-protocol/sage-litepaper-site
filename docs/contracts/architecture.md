# Protocol Architecture

This document outlines the high-level architecture of the Sage Protocol smart contracts. The protocol is designed to be a modular and extensible system for community-owned agent instructions.

## Core Components

The protocol is built around a few core components:

-   **SubDAO Factory (`SubDAOFactoryOptimized.sol`)**: This is the main entry point for creating new SubDAOs. It uses EIP-1167 minimal proxies (clones) to deploy new SubDAO instances gas-efficiently. The factory is responsible for setting up the initial configuration of a SubDAO, including its governance model, access control, and prompt registry.

-   **SubDAO (`SubDAO.sol`)**: A SubDAO is a self-governed entity that manages a collection of prompt libraries. Each SubDAO has its own treasury, governance contract (`PromptGovernor`), and prompt registry (`PromptRegistry`).

-   **Prompt Registry (`PromptRegistry.sol`)**: This contract is responsible for storing and managing prompts. It supports versioning, forking, and attribution, allowing communities to curate and evolve their prompt libraries over time.

-   **Prompt Governor (`PromptGovernor.sol`)**: This is the governance contract for a SubDAO. It allows members to create and vote on proposals related to the SubDAO's prompt libraries and treasury. The governor uses the `SXXX` token for voting and staking.

-   **SXXX Token (`SXXX.sol`, `SXXXProper.sol`)**: The `SXXX` token is the native governance token of the Sage Protocol. It is used for staking, voting, and participating in the protocol's incentive mechanisms.

## Key Mechanisms

### LaunchGate for Doppler LBPs

The `LaunchGate.sol` contract introduces a secure and governed mechanism for launching Liquidity Bootstrapping Pools (LBPs) on Doppler. It acts as a wrapper around the Doppler factory, ensuring that all auction creation and migration actions are executed through a Gnosis Safe owned by the Treasury. This provides a single point of authority and control over the protocol's liquidity events.

### On-chain Credits for Pay-to-Pin

The `CreditToken.sol` and `PaymentRouter.sol` contracts implement an on-chain credit system for pay-to-pin services. Users can purchase credits with USDC and spend them to pin content on IPFS. The revenue from these services is then split between the SubDAO treasury and the protocol treasury, creating a sustainable economic model for the protocol.

## Architecture Diagram

```
+-------------------------+
|   SubDAOFactory         |
+-------------------------+
| - createSubDAO()        |
| - createForkedSubDAO()  |
+-------------------------+
      |
      | creates
      v
+-------------------------+
|   SubDAO                |
+-------------------------+
| - governor              |
| - promptRegistry        |
| - treasury              |
+-------------------------+
      |           |
      | owns      | owns
      v           v
+------------------+  +------------------+
|  PromptGovernor  |  |  PromptRegistry  |
+------------------+  +------------------+
| - propose()      |  | - addPrompt()    |
| - vote()         |  | - addFork()      |
+------------------+  +------------------+
```