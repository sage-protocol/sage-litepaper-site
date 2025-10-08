# Incentives and Ownership

Sage powers three on‑chain incentive rails that communities can combine.

### 1. Boosts

Parameterizable rewards for governance participation or contributor actions. Two manager contracts exist:

-   Direct manager for per‑voter payouts tied to a proposal.
-   Merkle manager for pooled funding and claim‑by‑proof.

Both paths are governed through the **SubDAO** Timelock. The **CLI** supports `create`, `fund`, `set-root`, `status`, `claim`, and `finalize`.

### 2. Bounties

Announce tasks, award winners, and pay out from the Timelock. This system is event-only by design. Fund the Timelock with ETH or an ERC‑20 before executing payout proposals.

### 3. Premium Prompts & Pay-to-Pin

-   **Premium Prompts**: Encrypt content client-side, pin to **IPFS**, and gate decryption with Lit v7 and ERC‑1155 receipts. Buyers pay in USDC, get a receipt NFT, and decrypt locally with session signatures. Pricing and treasury routing are on‑chain. No reveal server is needed.
-   **Pay-to-Pin Credits**: A 402-based credit system allows users to pay for pinning services directly through the CLI. Users can buy credits and spend them to pin CIDs via the managed worker, with revenue routed to SubDAO and protocol treasuries.

### SBTs and Badge‑Gated Fast Tracks

Non‑transferable **SBTs** recognize contributors and can gate Approver Council permissions to move quickly on scoped updates, with function selectors allow‑listed by governance.

---
