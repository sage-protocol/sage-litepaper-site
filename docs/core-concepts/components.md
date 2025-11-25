# Core Components

- **On-chain Governance**
  Governance modules coordinate library upgrades through DAO proposals. The CLI emits Safe payloads that verify permissions (selector, spend limits, DAO role) before execution, keeping the process multisig-supervised yet DAO-executable.

- **Persistent Shared Memory with Credits**  
  **IPFS** stays the canonical store for library payloads, enforced by a managed worker that mediates uploads, pinning, and warming. A 402-based credit ledger (Phase A) lets contributors prepay for storage, while Phase B introduces an on-chain `CreditToken` + `PaymentRouter` path that burns credits as pins land, keeping incentives aligned with Treasury flows.

- **Tooling for Distributed Intelligence**
  The **CLI**, discovery app, and **MCP** endpoints share a unified SDK adapter. Commands such as `sage ipfs credits`, `sage ipfs buy-credits`, and `sage project push` connect operators, creators, and agents to the same governed knowledge base without exposing direct write access.

---
