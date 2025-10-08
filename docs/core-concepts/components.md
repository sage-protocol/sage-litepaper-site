# Core Components

- **On-chain Governance & LaunchGate**  
  Governance modules route auction creation through TreasuryWrapper + LaunchGate. The CLI emits Safe payloads that TreasuryWrapper verifies (selector, spend limits, DAO role) before LaunchGate forwards to Doppler, keeping the process multisig-supervised yet DAO-executable.

- **Persistent Shared Memory with Credits**  
  **IPFS** stays the canonical store for library payloads, enforced by a managed worker that mediates uploads, pinning, and warming. A 402-based credit ledger (Phase A) lets contributors prepay for storage, while Phase B introduces an on-chain `CreditToken` + `PaymentRouter` path that burns credits as pins land, keeping incentives aligned with Treasury flows.

- **Tooling for Distributed Intelligence**  
  The **CLI**, discovery app, and **MCP** endpoints share a unified SDK adapter. New commands such as `sage ipfs credits`, `sage ipfs buy-credits`, and `sage doppler create --prepare-only` connect operators, creators, and agents to the same governed knowledge base without exposing direct write access.

---
