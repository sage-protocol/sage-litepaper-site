# Token and Treasury Economics

The Sage economy is designed to reward contributors, fund development, and coordinate community‑governed prompt libraries, while keeping the on-chain surface as simple and robust as possible.

This section reflects what is implemented today and what is planned for mainnet.

---

## Core Economic Principles

- **Fixed Supply (Design)**  
  SAGE is designed as a fixed‑supply token (1 billion at genesis) with deflationary mechanisms tied primarily to DAO creation and library forking. Final parameters and burn mechanics are intended for mainnet and may be simplified on testnets.

- **DAO‑First Governance**  
  DAOs control library upgrades, treasuries, and economic parameters via Governor + Timelock. The Sage CLI and MCP server route all impactful actions through those governance paths.

- **Coordination Over Fees**  
  Tokens are intended to coordinate long‑horizon work (governance, bounties, attribution) rather than extract value from every prompt invocation.

---

## Token Allocation (Design)

The initial SAGE token distribution is structured to balance protocol development, community incentives, and long‑term sustainability:

| Allocation            | Amount      | Percentage | Vesting         | Purpose                                                        |
|-----------------------|------------:|-----------:|-----------------|----------------------------------------------------------------|
| Public Sale           | 200M SAGE   | 20%        | None            | Price discovery and initial liquidity                          |
| Treasury              | 300M SAGE   | 30%        | None            | Grants, bounties, and protocol operations                      |
| Team & Advisors       | 200M SAGE   | 20%        | 2‑year linear   | Core contributors and early advisors                           |
| Community Incentives  | 200M SAGE   | 20%        | 4‑year linear   | Staking rewards, creator programs, and ecosystem grants        |
| Liquidity & Incentive | 100M SAGE   | 10%        | 2‑year linear   | Liquidity mining and incentive programs                        |

Exact schedules and mechanics may be tuned as part of mainnet launch governance.

---

## Token Utility

SAGE is intended to support several core functions:

1. **Governance**  
   Stake SAGE (or the SXXX/stake token in deployed networks) to participate in DAO governance: library updates, treasury spending, and parameter changes.

2. **Staking & Treasury Alignment**  
   DAOs may distribute rewards or bounties to stakers and contributors, aligning long‑term holders with protocol growth.

3. **Bounty Rewards**  
   Bounty contracts and DAO treasuries can pay SAGE/SXXX to contributors for completing tasks (new prompts, fixes, integrations).

4. **DAO Creation & Forking (Design)**  
   The design calls for burns when creating new DAOs or forking libraries, tying network expansion to a deflationary sink. On testnets these mechanics may be disabled or simulated.

5. **Premium Access (Personal‑First)**  
   For paid prompts, the current beta focuses on **personal premium** (via `PersonalMarketplace` and SXXX). SubDAO‑level revenue sharing and endorsement are roadmap features (see below).

---

## Payment Rails & Premium Prompts

### Free‑to‑Use Default

Most prompts are intended to be free to read and governed at the DAO level. DAOs decide which manifest CID is “official”; agents and users fetch the same content via registries and the subgraph.

### Personal Premium (Implemented Today)

The first implementation of paid content uses a **personal marketplace**:

- Creators publish encrypted prompts using Lit v7 + ERC1155 receipts.
- Pricing is denominated in SXXX on Base Sepolia.
- The `PersonalMarketplace` contract:
  - Stores a price per `(creator, key)`.
  - Mints an ERC1155 license receipt to buyers.
- The Sage CLI:
  - Encrypts content client‑side.
  - Uploads encrypted payloads to IPFS.
  - Interacts with `PersonalMarketplace` to set prices and purchase licenses.

This model is **creator‑first** and does not require DAO governance to list or sell a premium prompt.

### DAO Endorsement & Revenue Splits (Roadmap)

For mainnet, DAOs will be able to curate and endorse personal premium prompts without taking custody of the content or encryption keys:

- DAOs endorse `(creator, key)` pairs on‑chain via governance.
- Endorsed prompts can surface in DAO‑specific views and discovery feeds.
- Optional revenue splits (e.g., creator / DAO treasury / protocol) are handled by dedicated payment splitter contracts or marketplace extensions.

This endorsement model is specified in more detail in `docs/specs/premium-endorsement-model.md` and is intentionally **future‑facing**; the CLI does not assume it exists today.

---

## Storage, IPFS & Credits

### Today: Pinning Providers + Gateways

Right now, storage works as follows:

- The Sage CLI uploads manifests and prompt payloads to a configured IPFS pinning provider (e.g., Pinata) using an API key or JWT.
- On‑chain registries store CIDs (or are indexed by a subgraph) so agents can resolve the **same approved manifest** for a given DAO.
- Clients fetch content through one or more gateways:
  - Defaults (e.g., `ipfs.dev.sageprotocol.io`) and/or
  - Provider‑specific gateways (e.g., Pinata’s gateway), overrideable via CLI flags such as `--gateway`.

There is **no on‑chain credit token** required to use Sage today; you only need a working pinning configuration and enough ETH/SXXX to pay transaction fees where relevant.

### Roadmap: 402 Worker & On‑Chain Credits

The repository includes an experimental **402 worker** that implements a credit‑based pinning API:

- A Cloudflare Worker (or similar) mediates uploads and pinning.
- Uploads are gated by a per‑user credit ledger (off‑chain).
- Users buy credits (e.g., with USDC or SAGE) and the worker debits those credits when pins are created or renewed.

Future iterations may introduce:

- An on‑chain `CreditToken` (ERC20 or ERC1155) to represent storage credits.
- A `PaymentRouter` contract that:
  - Accepts token payments for credits.
  - Burns or redirects a portion to protocol/DAO treasuries per pin.

These credit and worker systems are **roadmap items**. They are not required for current testnet usage, but the architecture is designed so they can be layered in without changing how DAOs or agents reason about CIDs.

---

## Deflationary Mechanisms (Design)

Several protocol actions are designed to burn or lock SAGE over time:

1. **DAO Creation**  
   Burning a fixed amount of SAGE to create a new DAO (or to bootstrap a new governance domain) makes expansion a scarce operation.

2. **Library Forking**  
   Burning SAGE to fork a library to a new DAO discourages low‑quality forks and encourages meaningful divergence.

3. **Premium & Credits (Future)**  
   A portion of protocol fees from premium prompts or storage credits may be burned by governance, creating further long‑term scarcity.

Exact parameters for these mechanisms are subject to DAO governance, especially at mainnet launch.

---

## Treasury Management & Sustainability

The main protocol treasury is intended to be managed by a **multisig Safe** plus on‑chain wrappers that enforce spending limits:

- Governance contracts control:
  - Grant programs and bounty budgets.
  - Liquidity provisioning and buyback programs.
  - Long‑term incentive programs.
- Safe + wrapper contracts enforce:
  - Role‑based execution with timelocks where appropriate.
  - Per‑function spending caps (e.g., maximum per‑grant or per‑proposal limits).

By combining treasury controls with the tokenomics above, Sage aims to create a **self‑sustaining** loop:

- Treasuries fund experimentation and prompt development.
- Successful prompts and libraries attract users and, eventually, premium flows.
- Value captured can be recycled into new grants and bounties, compounding the ecosystem’s collective intelligence.

