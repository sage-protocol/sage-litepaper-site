# Contracts Architecture

This document summarizes the main contracts in Sage Protocol and how they fit together. It focuses on the pieces that are in use today and clearly separates design intent from future extensions.

---

## High‑Level Modules

- **DAO Factory (`SubDAOFactoryOptimized.sol`)**  
  Entry point for creating new DAO instances using gas‑efficient minimal proxies. It wires up:
  - Governance (Governor + Timelock).
  - Library and prompt registries.
  - Initial roles for executors and treasuries.

- **DAO (`SubDAO.sol`)**  
  The DAO contract represents a governance domain. It typically references:
  - A Governor + Timelock pair.
  - A library registry and prompt registry.
  - Treasury contracts or wrappers.

- **Prompt & Library Registries**  
  - `LibraryRegistry`: Tracks library manifests (CIDs) and registry‑level metadata.
  - `PromptRegistry`: Tracks prompts and their relationships (forks, updates, attribution) at a finer granularity.

- **Treasury & Wrappers**  
  Treasury contracts hold assets and are wrapped by helper contracts that:
  - Enforce ARBAC‑style roles and selector allowlists.
  - Coordinate with the DAO’s Timelock for execution.

Contract names such as `SubDAOFactoryOptimized` and `SubDAO` are retained for compatibility, but conceptually they represent DAOs and their factories.

---

## Voting Power & Multipliers

Sage separates the question “who can vote?” from “how much weight should each voter have?”:

- At the base layer, each DAO uses a standard votes‑enabled token (for example, SXXX or a stake token) to define total supply, quorum, and proposal thresholds.
- On top of that, DAOs can opt into **per‑DAO voting multipliers** that boost the voting weight of specific participants (such as early contributors or long‑term supporters) without changing the global token supply.
- Multipliers are implemented with transferable NFTs that are scoped to a single DAO, and a lightweight votes wrapper that combines base token votes with the appropriate multiplier for that DAO.
- Delegation still happens on the base token; the multiplier layer only affects how much voting power a delegated balance represents.

---

## Governance Flow

The typical governance flow for library updates and related actions is:

1. **Proposal Creation**  
   - A user or agent (via CLI/MCP) prepares a proposal to:
     - Update a DAO’s library manifest CID.
     - Trigger a treasury action.
     - Change configuration parameters.
   - The CLI helps construct proposal calldata and payloads, but does not execute them directly.

2. **Voting**  
   - DAO token or stake holders vote through the Governor.
   - Voting parameters (delay, period, quorum, threshold) are configured per DAO.

3. **Queue & Timelock**  
   - Passed proposals are queued in the Timelock.
   - A delay window allows for inspection and potential intervention via governance or multisig where appropriate.

4. **Execution**  
   - After the delay, the Timelock executes registry updates or treasury calls.
   - Off‑chain services (subgraph, MCP server, CLI) observe the new state and update discovery surfaces.

This pattern is intended to cover library updates, premium endorsement flows (future), and most treasury operations.

---

## Storage & Discovery

- **IPFS + CIDs**  
  - Manifests and prompt files are stored on IPFS.
  - Registries store CIDs, not raw content.
  - Clients fetch content from gateways using those CIDs.

- **Subgraph Indexing**  
  - A subgraph indexes DAO, registry, and marketplace events.
  - It provides a GraphQL API for:
    - Listing DAOs and their libraries.
    - Inspecting proposal history and registry changes.
    - Discovering personal marketplace listings and license receipts.

- **MCP Server**  
  - The Sage MCP server exposes a model‑native interface for:
    - Discovering libraries and prompts.
    - Fetching manifests and prompts by CID/key.
    - Validating content and generating publishing commands.
  - It does not bypass governance or timelock controls; it only helps agents reason about and operate within them.

---

## Premium & Marketplace Contracts

- **Personal Marketplace (`PersonalMarketplace.sol`)**  
  - Manages SXXX‑priced licenses for personal premium prompts.
  - Maps `(creator, key)` to prices.
  - Mints ERC1155 license receipts via `PersonalLicenseReceipt`.

- **Personal License Receipt (`PersonalLicenseReceipt.sol`)**  
  - ERC1155 token representing ownership of a personal premium license.
  - Used in Lit access conditions to gate decryption.

- **PremiumPrompts / DAO‑Level Premium (Legacy / Roadmap)**  
  - Earlier iterations included DAO‑scoped premium contracts (`PremiumPrompts`) that integrated directly with DAOs for revenue splits and governance‑gated publishing.
  - For the current beta, these flows are **not** the primary path; CLI support has been reduced in favor of personal premium.
  - Future DAO‑level premium and endorsement flows are expected to:
    - Use governance proposals to register and endorse content.
    - Rely on DAOs’ Timelocks for execution.
    - Be indexed for transparent auditing.

---

## Safety Considerations

- **Timelock as Gatekeeper**  
  - Registry and treasury contracts should only be mutable by the Timelock or tightly scoped admin roles.
  - Emergency or bootstrap roles should be time‑limited and clearly documented.

- **Role Configuration**  
  - Role and selector configuration should be inspected via CLI tools (e.g., `timelock doctor`) rather than edited manually from the CLI.
  - Any “fix” flows should route through governance when moving from testnet to mainnet.

- **Upgrade Path**  
  - Where upgradability (via diamonds or proxies) is in use, upgrade paths should:
    - Be controlled by the DAO’s Timelock or dedicated upgrade council.
    - Be visible in the subgraph for auditability.

This architecture aims to keep the on‑chain surface small, composable, and compatible with existing DeFi/NFT infrastructure, while letting Sage evolve its premium and credit systems over time without changing the core trust assumptions.
