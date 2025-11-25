# Incentives and Ownership

Sage provides several on‑chain and off‑chain incentive rails that can be combined by DAOs and creators. This section reflects what exists today and what is planned.

---

## 1. Boosts (Governance Rewards)

Boosts are configurable reward programs tied to governance activity or contributor actions.

- **Direct Boosts**: Per‑voter payouts for participating in a specific proposal.
- **Merkle Boosts**: Funds are pooled; claimants prove eligibility with Merkle proofs.

Both paths are controlled via DAO governance and executed through the DAO’s Timelock or Safe. The CLI surfaces helper commands to:

- Create and fund boosts.
- Set roots for Merkle distributions.
- Check status and finalize programs.

Exact contract versions and parameters can evolve, but the pattern is “governance‑approved rewards with transparent on‑chain accounting”.

---

## 2. Bounties (Work‑for‑Reward)

Bounties let DAOs and creators announce tasks, select winners, and pay them on‑chain.

- A bounty defines:
  - Scope (e.g., “new evaluation prompts for X domain”).
  - Reward amount and token (SXXX, stablecoins, etc.).
  - Submission and review windows.
- Funding flows through:
  - DAO treasury → bounty contract, or
  - Direct transfers for smaller, low‑trust tasks.

In Sage:

- The CLI provides `bounty` commands to create, list, and manage bounty states.
- DAOs can use governance proposals to fund or top up bounty contracts from treasuries.

The emphasis is on **open attribution** (who did what) and **transparent payouts** rather than opaque off‑chain deals.

---

## 3. Premium Prompts & Pay‑to‑Pin

### 3.1 Personal Premium (Implemented)

The first iteration of paid content is **personal‑only premium**:

- Creators encrypt prompt content using Lit v7 and gate access via ERC1155 license receipts.
- The `PersonalMarketplace` contract:
  - Stores prices for `(creator, key)` pairs.
  - Mints a license receipt to buyers.
- Sage CLI:
  - Handles encryption, IPFS upload, and price setting via `sage personal sell`.
  - Provides commands to buy licenses (`sage personal buy`) and decrypt content locally (`sage personal access`).

This model is live in the CLI and testnet contracts and does **not** require DAO governance to list or sell prompts.

### 3.2 DAO Endorsement (Roadmap)

For mainnet, DAOs will be able to endorse and curate personal premium prompts:

- DAOs endorse specific `(creator, key)` pairs via governance proposals.
- Endorsed prompts show up in DAO‑scoped views and discovery tools.
- Optional revenue sharing (creator / DAO / protocol) can be layered via payment splitters.

This endorsement model is documented in `docs/specs/premium-endorsement-model.md` and intentionally deferred until after personal premium has been validated in practice.

### 3.3 Pay‑to‑Pin & Credits

Storage is a real cost, but the way it is paid for is evolving.

**Today:**

- The CLI uploads manifests and prompt payloads to a configured pinning provider (such as Pinata).
- Users are responsible for any costs associated with that provider.
- On‑chain registries and the subgraph point to CIDs so everyone can reference the same content.

**In the repo (experimental):**

- A 402‑style worker implements a credit ledger for pinning:
  - Users purchase credits via HTTP flows.
  - The worker debits credits when pins are created or renewed.

**Future:**

- Credits may be represented on‑chain via a `CreditToken` and managed by a `PaymentRouter`, allowing DAOs and the protocol to:
  - Fund storage in a transparent, auditable way.
  - Optionally burn a portion of credits per pin as a deflationary mechanism.

These credit and worker systems are **roadmap**, not prerequisites for using Sage today.

---

## 4. SBTs and Badge‑Gated Fast Tracks (Roadmap)

Non‑transferable badges and SBTs can represent contributor status, review expertise, or other off‑chain context.

Potential uses include:

- Gating Approver Council permissions for faster execution of low‑risk changes.
- Allow‑listing function selectors that badge‑holders can execute with shorter timelocks.

These mechanisms are intended to complement, not replace, DAO‑wide governance and will be introduced gradually if the community finds them valuable.

