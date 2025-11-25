# Roadmap

- **Completed**
  DAO factory, Library and Prompt registries, governance flows, **Boosts**, **Premiums**, **SBTs**, **MCP**, **CLI**, and discovery app are live on Base Sepolia.

- **Shipping (Phase A)**
  - **Pay-to-Pin Credits**: Cloudflare Worker with Durable Object ledger, checkout webhooks, and CLI UX (`sage ipfs credits`, `buy-credits`).
  - **Prompt Commerce**: Off-chain entitlements that reuse the Personal License + Lit flow while creators fund storage through credits.

- **Next (Phase B)**
  - **On-chain Credits**: `CreditToken` (ERC‑1155) + `PaymentRouter` on Base with Permit2 and burn-per-pin semantics.
  - **Personal Library Pointers**: Finalising IPNS + ENS integration for stable, author-controlled library pointers.
  - **DAO Endorsement of Personal Premiums**: Optional Prompt Endorsement contracts that let DAOs endorse personal premium prompts on-chain without taking custody of content or encryption keys (see `docs/specs/premium-endorsement-model.md`).

- **Mainnet**
  Execute the launch sequence, wire canonical liquidity, and transition ownership entirely to DAO contracts and the Treasury Safe.

- **Growth**
  First community libraries in creative AI, research, and agent ops, plus grants and **bounties** focused on subjective domains where human curation matters most.
  - **Social & Discovery Layer**: Wallet profiles (skills, libraries, governance activity at `/u/[ens_name]`), Farcaster frames for sharing libraries and proposals in social feeds, and a capabilities-aware Governance Hub UI for visualizing skill diffs and proposal lineage.

---
