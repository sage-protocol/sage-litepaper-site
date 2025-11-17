# Technical Overview

Sage Protocol is built on a three-layer architecture that combines on-chain governance, content-addressed storage, and agent-native discovery into a unified stack for community-governed agent instructions.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Discovery Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ MCP Server   │  │  Subgraph    │  │  Web App     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │ Query
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Smart Contract Layer                    │
│  ┌────────────┐  ┌───────────┐  ┌──────────────────┐   │
│  │  SubDAO    │  │ Governor  │  │ PromptRegistry   │   │
│  │  Factory   │  │ Timelock  │  │ LibraryRegistry  │   │
│  └────────────┘  └───────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │ Reference
                         ▼
┌─────────────────────────────────────────────────────────┐
│                     Storage Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │     IPFS     │  │ Managed      │  │  Credit      │  │
│  │   Gateway    │  │ Worker       │  │  System      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Layer 1: Smart Contract Layer

The smart contract layer provides **tamper-proof governance** and **economic coordination** for prompt libraries. All state transitions—library registrations, governance votes, treasury operations—happen on-chain with full transparency and auditability.

### Core Components

**SubDAO Factory (`SubDAOFactoryOptimized.sol`)**
The main entry point for creating new SubDAOs using gas-efficient EIP-1167 minimal proxies. It sets up the initial configuration of a SubDAO, including its governance model, access control, and prompt registry.

**Governor + Timelock**
Each SubDAO has its own OpenZeppelin Governor contract with a Timelock for proposal execution. This provides:

- Transparent proposal creation and voting
- Configurable voting delays, periods, and quorum thresholds
- Time-delayed execution for security
- Multi-signature admin controls for emergency actions

**PromptRegistry (`PromptRegistry.sol`)**
Stores and manages prompts with support for versioning, forking, and attribution. Each prompt entry includes:

- IPFS CID pointing to content
- Creator address for attribution
- Version history and parent references
- Metadata (tags, descriptions, usage stats)

**LibraryRegistry (`LibraryRegistry.sol`)**
A global, append-only directory for discovering library manifests across the protocol. This enables:

- Cross-SubDAO library discovery
- Namespace management
- Version tracking and resolution

**Treasury System**
Sage uses a secure treasury architecture centered around multisig-managed treasuries (e.g., Gnosis Safe) with on-chain governance controls:

- **On-chain Spend Limits**: Treasury contracts use ARBAC roles and selector allowlists to enforce spending limits
- **DAO Executor Role**: The DAO timelock can trigger treasury actions directly, while the Safe retains admin powers
- **Transparent Operations**: All treasury spending is on-chain and auditable
- **Prepare-Only CLI Flow**: The `sage` CLI produces transaction payloads for the Safe to review and approve
- **Registry-driven Configuration**: Treasury operations read configuration from the protocol registry
- **Auditable Events**: All treasury contracts emit detailed events for full audit trails

### Governance Flow

1. **Propose**: A community member creates a governance proposal to register a new library manifest
2. **Vote**: Token holders vote on the proposal during the voting period
3. **Queue**: If the proposal passes, it's queued in the Timelock with a delay
4. **Execute**: After the delay, anyone can execute the proposal to update the PromptRegistry

This "manifest-first" approach means one proposal approves a new manifest CID and atomically updates the entire library.

## Layer 2: Storage Layer

The storage layer provides **content-addressed persistence** and **economic incentives** for hosting agent context. IPFS ensures content is immutable and verifiable, while a managed worker enforces access control and payment.

### Components

**IPFS Gateway**
Prompts and manifests are stored on IPFS, providing:

- Content addressing: CIDs cryptographically verify content integrity
- Decentralized hosting: Multiple pinning nodes ensure availability
- Permanent URLs: Content remains accessible even if original uploader goes offline

**Managed Worker (Cloudflare Worker)**
A serverless worker mediates uploads, pinning, and gateway warming:

- **Credit checks**: Enforces payment before pinning content
- **Metadata validation**: Ensures manifests conform to schema
- **Gateway warming**: Pre-caches content on multiple IPFS gateways for low-latency access
- **Telemetry**: Tracks usage stats (downloads, bandwidth) for analytics

**Credit System**
Storage has real costs. Sage uses a two-phase credit system:

**Phase A (Current)**: Off-chain credits via Cloudflare Durable Objects

- Users purchase credits through the worker's 402 payment flow
- Credits are tracked in a persistent ledger
- Worker debits credits per pin operation

**Phase B (Roadmap)**: On-chain `CreditToken` + `PaymentRouter`

- ERC-20 credit token minted through bonding curve
- Smart contract enforces burns per pin
- On-chain telemetry for transparent usage tracking

### Fast Iteration with IPNS + ENS

For rapid development, authors can use **IPNS** (InterPlanetary Name System) and **ENS** (Ethereum Name Service) to create mutable pointers:

1. Publish working drafts to IPFS and update IPNS record
2. Point ENS name (e.g., `myprompts.eth`) to IPNS key
3. When ready, submit governed proposal to freeze version in PromptRegistry

This allows experimentation without governance overhead, then "graduation" to canonical, governed versions.

## Layer 3: Discovery Layer

The discovery layer provides **agent-native APIs** and **fast indexing** so agents and humans can find and consume governed context without custom integration work.

### Components

**Subgraph (The Graph Protocol)**
A GraphQL API that indexes all on-chain events:

- Library registrations
- Governance proposals and votes
- Treasury operations
- Attribution and version history

Agents query the subgraph first for the latest approved manifests, providing near-instant discovery without full RPC calls.

**MCP Server (Model Context Protocol)**
A standardized interface for agents to interact with Sage:

- `list_libraries`: Discover all available prompt libraries
- `get_library`: Fetch a specific library manifest by CID or name
- `search_prompts`: Full-text search across prompts
- `get_prompt`: Retrieve prompt content by CID

MCP integrations exist for Claude Desktop, LangChain, and other agent frameworks, enabling plug-and-play usage.

**Web App**
A user-friendly interface for:

- Browsing libraries and prompts
- Creating and voting on proposals
- Managing SubDAO membership and staking
- Viewing analytics and telemetry

### Data Flow

1. **Index**: Subgraph indexes PromptRegistry events from Base blockchain
2. **Query**: Agents/users query subgraph for latest approved manifest CID
3. **Fetch**: Agent calls MCP server to retrieve content from IPFS by CID
4. **Verify**: Agent verifies CID matches content hash, ensuring tamper-evidence
5. **Execute**: Agent uses prompts to orchestrate tasks

This architecture ensures agents always see the latest approved manifest with cryptographic guarantees about content integrity.

## Economic Loop

The three layers work together to create a sustainable economic loop:

1. **Treasury Bootstrapping**: SubDAOs receive grants from main SAGE treasury (funded via LBP + bond sales)
2. **Bounty Posting**: SubDAOs post bounties for prompt improvements
3. **Creator Rewards**: Contributors earn SAGE for quality work (voted by community)
4. **Storage Fees**: Pinning costs are covered by treasury or creator credits
5. **Premium Content**: Optional paid prompts enable monetization via payment splitters
6. **Value Capture**: As libraries are used, usage stats flow to subgraph, informing next round of bounties

This creates a flywheel where high-quality context attracts more users, generates more revenue, funds better bounties, and compounds the collective intelligence.

---
