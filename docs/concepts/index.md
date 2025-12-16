# Protocol Deep Dive

This section covers the technical details of Sage Protocol's core systems. For a high-level overview, see the [home page](../index.md).

If you’re looking for “why this matters” rather than internals:
- [Economic Thesis](./economic-thesis.md)
- [Tooling & Surfaces](./tooling-and-surfaces.md)

---

## How It Works

Sage coordinates library updates through a standard governance flow:

```
┌──────────────────────────────────────────────────────────────────┐
│  1. CONTENT PREPARATION                                          │
│                                                                  │
│  Author creates/updates prompts locally                          │
│  CLI builds manifest.json with prompt metadata                   │
│  Content pinned to IPFS → returns CID                            │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  2. PROPOSAL CREATION                                            │
│                                                                  │
│  CLI encodes updateLibrary(dao, cid, version) calldata           │
│  Proposal submitted to Governor contract                         │
│  ProposalCreated event emitted with targets/calldatas            │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  3. VOTING PERIOD                                                │
│                                                                  │
│  Token holders cast votes (for/against/abstain)                  │
│  Voting power = SXXX balance × multiplier (if applicable)        │
│  Optional vote gate: require ≥ 1 SXXX effective votes to vote    │
│  Proposal passes if quorum met and majority support              │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  4. TIMELOCK QUEUE                                               │
│                                                                  │
│  Passed proposals queued in TimelockController                   │
│  Minimum delay (e.g., 24h) before execution                      │
│  Community can react to malicious proposals                      │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  5. EXECUTION                                                    │
│                                                                  │
│  After delay, anyone can execute (or council only)               │
│  Timelock calls LibraryRegistry.updateLibrary(...)               │
│  LibraryUpdated event emitted, subgraph indexes                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Protocol Components

| Component | Contract | Purpose |
|-----------|----------|---------|
| **Registry** | `LibraryRegistry` | Stores current manifest CID per DAO |
| **Governor** | `PromptGovernorCloneable` | Manages proposals and voting |
| **Timelock** | `TimelockController` | Enforces execution delay |
| **Factory** | `SubDAOFactory` | Deploys new DAOs with wiring |
| **Multipliers** | `VotingMultiplierNFT` | Boosts voting power |
| **Bounties** | `SimpleBountySystem` | Escrow for contributor rewards |
| **Premium** | `PremiumPrompts` | Gated content licensing |

