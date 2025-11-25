# Security & Governance Model

Sage’s security model is built around a few simple ideas:

- All writes to shared state should flow through **DAO governance + Timelock**, not ad‑hoc admin keys.
- Upgrades and treasury actions should be **transparent, reviewable, and delayed**.
- The CLI and MCP server should **never bypass** those controls.

This section summarizes the intended design and what is implemented today.

---

## Governance & Timelock

- **DAO‑First Governance**  
  Each DAO is expected to be governed by an OpenZeppelin‑style Governor + Timelock pair. Library upgrades, registry changes, and most treasury actions should be executed:
  1. Via a governance proposal.
  2. After a voting period.
  3. After a timelock delay.

- **Timelock as Single Executor**  
  Contracts that mutate shared state (registries, treasuries, factories) should treat the DAO’s Timelock as the primary executor. Where direct EOAs or multisigs are still present (e.g., for bootstrap or emergency use), they are:
  - Scoped to narrowly defined roles and function selectors.
  - Intended to be removed or reduced via governance over time.

- **No Direct Shortcuts from CLI**  
  The Sage CLI and MCP server are designed to:
  - Prepare proposals and transaction payloads.
  - Surface diagnostics (e.g., `timelock doctor`, `timelock list`).
  - Never unilaterally grant roles or execute privileged operations outside of governance paths.

---

## Roles & Least Privilege

- **ARBAC & Selector Allowlists (Design)**  
  Treasury wrappers and council contracts are designed to use ARBAC‑style roles and function selector allowlists to constrain what an executor can do. Examples include:
  - Spending caps per function (e.g., “max X USDC per grant call”).
  - Separate roles for proposal creation vs. execution.

- **Timelock Role Management**  
  Instead of exposing generic “grant role” commands in the CLI, Sage prefers:
  - Introspective tools such as `timelock doctor` to report current role wiring.
  - Guided fixes via `timelock fix-roles` and governance proposals, rather than ad‑hoc calls.

- **Bootstrap vs. Steady State**  
  During early deployment (testnets, staged environments), some contracts may still be owned by deployer EOAs or multisigs. The intended path is:
  - Bootstrap via deployer/admin.
  - Migrate execution to DAO Timelocks and Safe‑wrapped treasuries as soon as feasible.

---

## Premium Flows & Access Control

- **Personal Premium (Implemented)**  
  Premium prompt access today is enforced via:
  - ERC1155 license receipts (`PersonalLicenseReceipt`).
  - Lit v7 access control conditions tied to those receipts.
  - The `PersonalMarketplace` contract, which only exposes pricing and purchase flows.
  DAO governance is **not** required to publish or access personal premium prompts.

- **DAO‑Level Premium & Endorsement (Roadmap)**  
  Any flows where DAOs:
  - Endorse premium prompts.
  - Share in revenue splits.
  - Grant special access or fast tracks to paid content.

  are intentionally treated as future features and are expected to be:
  - Implemented via explicit governance proposals.
  - Executed through the DAO’s Timelock.
  - Indexed in the subgraph for transparent auditing.

---
