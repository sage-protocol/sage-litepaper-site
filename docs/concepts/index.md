# Protocol Deep Dive

This section covers the technical details of Sage Protocol's core systems. For a high-level overview, see the [home page](../index.md).

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

---

## Sections

### [Governance Models](./governance-models.md)

How the three governance axes (Kind, Proposal Access, Execution Access) combine to create different DAO configurations. Covers playbooks, parameter tuning, and governance evolution.

### [Voting Multipliers](./voting-multipliers.md)

How `VotingMultiplierNFT` and `MultipliedVotes` wrappers boost voting power for top contributors. Includes tier configuration and factory integration.

### [Bounties & Incentives](./bounties.md)

How `SimpleBountySystem` coordinates contributor rewards. Covers posting, submission, winner selection, and fund release.

### [Premium Prompts](./premium-prompts.md)

How `PremiumPrompts` and ERC1155 receipts enable gated content. Covers pricing, purchasing, and access verification with Lit Protocol.

---

## Key Patterns

### Content Addressing

All prompt content is stored on IPFS. The blockchain only stores CID references:

```solidity
struct LibraryInfo {
    string manifestCID;      // IPFS CID of manifest.json
    address lastUpdater;     // Who submitted the update
    uint256 lastUpdated;     // Block timestamp
    string version;          // Semantic version
    address forkedFromDAO;   // If forked, source DAO
    uint256 sxxxForkFee;     // Fork licensing fee
}

mapping(address dao => LibraryInfo) public libraryByDAO;
```

### Timelock Gating

Only the Timelock can call registry write functions:

```solidity
function updateLibrary(address dao, string calldata manifestCID, string calldata version)
    external
    onlyRole(EXECUTOR_ROLE)  // Granted only to Timelock
{
    // Update storage
}
```

### Proposal Encoding

CLI encodes governance proposals as target/value/calldata arrays:

```javascript
const calldata = iface.encodeFunctionData('updateLibrary', [
    daoAddress,
    manifestCID,
    version
]);

// Proposal targets LibraryRegistry
const targets = [LIBRARY_REGISTRY_ADDRESS];
const values = [0];
const calldatas = [calldata];
```

---

## Events for Indexing

Key events the subgraph indexes:

| Event | Contract | Data |
|-------|----------|------|
| `LibraryUpdated` | LibraryRegistry | dao, cid, version, updater |
| `ProposalCreated` | Governor | proposalId, proposer, targets, calldatas |
| `VoteCast` | Governor | voter, proposalId, support, weight |
| `CallExecuted` | Timelock | target, value, data |
| `BountyPosted` | SimpleBountySystem | id, poster, reward, description |

---

## Next Steps

- [Governance Models](./governance-models.md) — Understand the three axes
- [Contract Architecture](../contracts/architecture.md) — Full contract reference
- [Deployments](../contracts/deployments.md) — Live contract addresses
