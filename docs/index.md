# 📜 Sage Litepaper

> ### The first permissionless protocol for incentivized agent context sharing.

Sage is a governance-powered protocol for community-owned agent instructions. Publish once to **IPFS**, let your **SubDAO** steward upgrades, and let agents automatically discover the trusted version. As the network's distributed intelligence improves, rewards route back to the people training it. Follow the founder [@VelinusSage](https://x.com/VelinusSage) for updates.

---

## What Sage Is

Sage is a governance layer for distributed intelligence, turning community prompt libraries into coordinated agent instructions. Publish once to **IPFS**, register the library on-chain, and let your **SubDAO** steer how agents pull, trust, and evolve that context. A manifest defines the full collection of prompts, and a single proposal upgrades the whole set. Discovery runs through a subgraph and an **MCP** server so agents can search and synchronize without manual glue code. Interfaces include a **CLI**, a web app, and Model Context Protocol (**MCP**) endpoints for agent tooling like Claude Desktop.

- **Publish**: Push manifests and prompt files to **IPFS**. Immutable CIDs establish the authorized set of agent instructions.
- **Propose**: Each manifest is one governance proposal in your **SubDAO**. Vote, queue, and execute through a Timelock.
- **Discover**: Agents, the **CLI**, and the web app read via subgraph first and fall back to RPC for a consistent view.
- **Use**: **MCP** tools return content by CID so agents can orchestrate tasks with the community-approved version.

This approach turns simple prompt libraries into governed, self-improving agent instructions for communities of AI artists, prompt engineers, and research collectives so they can coordinate agent behavior with clear ownership.

---

## Core Components

- **On-chain Governance & LaunchGate**  
  The **SubDAO** Factory, Governor + Timelock, LibraryRegistry, PromptRegistry, and Treasury modules now route all auction creation through a TreasuryWrapper + LaunchGate stack. The CLI produces prepare-only Safe payloads which hit TreasuryWrapper (holding auction funds and enforcing on-chain limits) before LaunchGate finalises the Doppler call. This keeps execution multisig-supervised while letting DAO roles act directly on-chain.

- **Persistent Shared Memory with Credits**  
  **IPFS** stays the canonical store for library payloads, enforced by a managed worker that mediates uploads, pinning, and warming. A 402-based credit ledger (Phase A) lets contributors prepay for storage, while Phase B introduces an on-chain `CreditToken` + `PaymentRouter` path that burns credits as pins land, keeping incentives aligned with Treasury flows.

- **Tooling for Distributed Intelligence**  
  The **CLI**, discovery app, and **MCP** endpoints share a unified SDK adapter. New commands such as `sage ipfs credits`, `sage ipfs buy-credits`, and `sage doppler create --prepare-only` connect operators, creators, and agents to the same governed knowledge base without exposing direct write access.

---

## Get Started

**Connect**

```bash
sage wizard
# or manually:
sage wallet connect --type cast
sage doctor
```

**Publish a library**

```bash
sage library scaffold-manifest
sage library lint manifest.json
sage library push manifest.json --pin
sage library propose manifest.json --subdao 0xYourSubDAO
```

**Launch an Auction (via Doppler)**

```bash
sage doppler create --prepare-only --variant dynamic --output safe-payload.json
```

**Manage IPFS Credits**

```bash
sage ipfs credits
sage ipfs buy-credits
```

---

## Roadmap

- **Completed**
  SubDAO factory, Library and Prompt registries, governance flows, **Boosts**, **Premiums**, **SBTs**, **MCP**, **CLI**, and discovery app are live on Base Sepolia.

- **Shipping (Phase A)**
  - **Pay-to-Pin Credits**: Cloudflare Worker with Durable Object ledger, checkout webhooks, and CLI UX (`sage ipfs credits`, `buy-credits`).
  - **Prompt Commerce**: Off-chain entitlements that reuse the Personal License + Lit flow while creators fund storage through credits.
  - **LaunchGate Prepare-Only**: Safe payloads target TreasuryWrapper, which enforces selector/limit checks before invoking LaunchGate.

- **Next (Phase B)**
  - **On-chain Credits**: `CreditToken` (ERC‑1155) + `PaymentRouter` on Base with Permit2 and burn-per-pin semantics.
  - **Unified Doppler SDK**: Viem-based adapter gated by `SAGE_DOPPLER_ALPHA`, plus pricing shim for USDC pools and governance payload tooling.
  - **Personal Library Pointers**: Finalising IPNS + ENS integration for stable, author-controlled library pointers.

- **Mainnet**
  Execute the launch sequence, wire canonical liquidity (including **Doppler LBP**), and transition ownership entirely to DAO contracts with TreasuryWrapper/Safe supervision.

- **Growth**
  First community libraries in creative AI, research, and agent ops, plus grants and **bounties** focused on subjective domains where human curation matters most.

---

## License

Apache 2.0. See the repository for full docs, guides, and examples.
