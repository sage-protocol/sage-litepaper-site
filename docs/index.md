# Sage Litepaper Overview

Sage is a governance layer for distributed intelligence. Communities publish prompt libraries to IPFS, register them on‑chain through DAOs, and let agents discover and use the approved versions via the MCP server and subgraph.

This litepaper summarizes the current architecture and the roadmap for mainnet.

---

## Core Components

- **On‑chain Governance**  
  Governance modules coordinate library upgrades through DAO proposals. The DAO Factory, Governor + Timelock, LibraryRegistry, PromptRegistry, and Treasury modules coordinate upgrades through transparent voting and timelock execution. The CLI produces Safe transaction payloads for multisig‑supervised operations, and the MCP server exposes a read/write planning surface for agents that still respects those same governance paths.

- **Voting Power & Multipliers**  
  DAOs derive voting power from SXXX or stake tokens, with optional per‑DAO voting multipliers. A shared `VotingMultiplierNFT` contract and per‑DAO `MultipliedVotes` wrappers let each DAO define capped multiplier tiers via governance. Factory and runtime glue ensure that `Governor.token()` is always either the base voting token or a valid `MultipliedVotes` wrapper, so governance wiring stays verifiable and safe.

- **Persistent Shared Memory**  
  IPFS stays the canonical store for manifests and prompt payloads. Today the CLI uploads to a configured pinning provider (such as Pinata) and resolves content via gateways, while on‑chain registries reference CIDs so agents always fetch the same approved version. Credit‑based storage and worker infrastructure (including the 402 worker and potential on‑chain credits) are on the roadmap, but are not required for current testnet usage.

- **Tooling for Distributed Intelligence**  
  The CLI, discovery app, and MCP endpoints share a unified SDK adapter. Commands such as `sage prompts publish`, `sage project push`, and IPFS helpers connect operators, creators, and agents to the same governed knowledge base without exposing direct write access.

---

## For Creators

- Author prompts locally in a `prompts/` workspace.
- Use `sage prompts init`, `sage prompts try`, and `sage prompts publish --dao <address>` to:
  - Build manifests.
  - Upload to IPFS.
  - Create governance proposals that upgrade DAO libraries.

Personal premium prompts are supported today via the personal marketplace, SXXX, Lit v7, and ERC1155 license receipts. DAO‑level endorsement and revenue sharing for premium prompts are documented in the endorsement spec and treated as roadmap features.

---

## For DAOs

- Use playbooks (`sage dao create-playbook`) to deploy DAOs with sensible governance defaults.
- Govern library updates, treasuries, and other parameters via proposals and Timelock execution.
- Diagnose governance wiring using `sage dao doctor`, `sage timelock doctor`, and `sage project status`.

Over time, DAOs will be able to endorse personal premium prompts, adopt credit‑based storage, and integrate additional council/role patterns as described in the roadmap.

---

## For Agents

- Integrate the Sage MCP server to:
  - Discover DAO‑approved libraries via subgraph and MCP queries.
  - Fetch manifests and prompts by key/CID.
  - Validate content and generate publishing commands that humans can run through the CLI.

Agents do not call governance contracts directly. Instead, they use MCP as a model‑native interface that always respects DAO and Timelock controls.
