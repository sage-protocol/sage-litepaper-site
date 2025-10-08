# Technical Overview

At a high level, Sage combines three familiar building blocks and layers a pay-to-pin monetisation loop on top:

- LaunchGate/TreasuryWrapper-governed upgrades (Governor + Timelock + Safe-admin) provide trusted execution: DAO roles act via TreasuryWrapper while on-chain limits guard every LaunchGate call.
- IPFS handles content and manifests, with a managed worker that enforces credit checks, validates metadata, and warms gateways.
- An index layer (subgraph + MCP) keeps agents and humans in sync on the latest approvals.

Updates are “manifest-first”: one proposal approves a new manifest CID and atomically updates the entire library. The CLI prepares Safe payloads that TreasuryWrapper verifies (selector/limit/role) before LaunchGate executes, keeping governance multisig-supervised yet DAO-driven. Agents read the subgraph first and fall back to RPC, ensuring they always see the latest approved manifest.

For storage economics, Phase A introduces an off-chain credits Durable Object backing the worker’s 402 flow, while Phase B migrates to an on-chain `CreditToken` + `PaymentRouter` that burns credits per pin. Both phases surface telemetry to the worker and CLI so editors can audit spend before content ships.

For faster iteration, authors can still use **IPNS** and **ENS** to create mutable pointers to their latest work, then graduate those changes through the credit-gated worker into governed manifests.

---
