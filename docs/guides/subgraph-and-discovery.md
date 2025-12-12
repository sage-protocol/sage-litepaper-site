# Subgraph and Discovery API

Sage Protocol uses The Graph for indexing on-chain data and a Discovery API for full-text search. This guide covers how to query DAOs, proposals, prompts, bounties, and more.

## Why These APIs?

**The Subgraph** indexes blockchain events in real-time, making it fast to query:
- Proposals and votes across all DAOs
- Library manifests and prompts
- Bounties and contributor activity
- NFT multipliers and auctions

**The Discovery API** provides:
- Full-text search across prompt content
- Trending prompts and categories
- Tag-based filtering
- Library exploration

Together they power the CLI, MCP server, and web app without expensive RPC block scans.

---

## Subgraph Endpoints

| Network | URL |
|---------|-----|
| Base Sepolia | `https://api.goldsky.com/api/public/project_cm.../subgraphs/sage-base-sepolia/1.0.0/gn` |
| Base Mainnet | (Coming soon) |

Check the current endpoint:

```bash
sage config show | grep SUBGRAPH
```

---

## Core Entities

### SubDAO

DAOs with governance configuration:

```graphql
type SubDAO {
  id: ID!                    # DAO address
  name: String
  description: String
  profileCID: String
  governor: Bytes!
  timelock: Bytes!
  stakeToken: Bytes!
  minStake: BigInt!
  memberCount: BigInt!
  # Governance profile (3-axis model)
  governanceKind: Int        # 0=OPERATOR, 1=TOKEN
  proposalAccess: Int        # 0=COUNCIL_ONLY, 1=COMMUNITY_THRESHOLD
  executionAccess: Int       # 0=COUNCIL_ONLY, 1=ANYONE
  playbook: String           # 'council-closed', 'council-drafts', 'community'
}
```

### Proposal

Governance proposals with vote counts:

```graphql
type Proposal {
  id: ID!                    # governor-proposalId
  governor: Bytes!
  title: String
  description: String
  proposer: Bytes!
  state: String!             # PENDING, ACTIVE, SUCCEEDED, QUEUED, EXECUTED
  forVotes: BigInt!
  againstVotes: BigInt!
  abstainVotes: BigInt!
  startBlock: BigInt!
  endBlock: BigInt!
  eta: BigInt                # Execution timestamp (when queued)
  votes: [Vote!]!
}
```

### LibraryPrompt

Prompts discovered from library manifests:

```graphql
type LibraryPrompt {
  id: ID!                    # subdaoHex-key
  subdao: Bytes!
  key: String!
  cid: String!
  name: String
  description: String
  manifestCID: String!
  updatedAt: BigInt!
}
```

### Bounty

Bounties from SimpleBountySystem:

```graphql
type Bounty {
  id: ID!                    # contract-bountyId
  title: String!
  description: String
  reward: BigInt!
  mode: Int!                 # 0=OPEN, 1=DIRECT, 2=COMPETITIVE
  status: Int!               # 0=ACTIVE, 1=COMPLETED, etc.
  winner: Bytes
  deadline: BigInt
}
```

### MultiplierTier

NFT voting multiplier tiers:

```graphql
type MultiplierTier {
  id: ID!
  dao: Bytes!
  name: String!
  multiplier: Int!           # 150 = 1.5x
  maxSupply: BigInt!
  minted: BigInt!
  price: BigInt!
}
```

---

## Common Query Patterns

### List DAOs

```graphql
query ListDAOs($first: Int!) {
  subDAOs(first: $first, orderBy: createdAt, orderDirection: desc) {
    id
    name
    description
    governor
    memberCount
    playbook
  }
}
```

### Get Proposals for a DAO

```graphql
query GetProposals($governor: Bytes!, $first: Int!) {
  proposals(
    where: { governor: $governor }
    first: $first
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    title
    description
    proposer
    state
    forVotes
    againstVotes
    abstainVotes
  }
}
```

### Active Proposals

```graphql
query ActiveProposals($governor: Bytes!) {
  proposals(
    where: { governor: $governor, state: "ACTIVE" }
    orderBy: endBlock
    orderDirection: asc
  ) {
    id
    title
    endBlock
    forVotes
    againstVotes
  }
}
```

### Library Prompts for a DAO

```graphql
query LibraryPrompts($subdao: Bytes!, $first: Int!) {
  libraryPrompts(
    where: { subdao: $subdao }
    first: $first
    orderBy: updatedAt
    orderDirection: desc
  ) {
    key
    name
    description
    cid
    manifestCID
  }
}
```

### Open Bounties

```graphql
query OpenBounties($first: Int!) {
  bounties(
    where: { status: 0 }
    first: $first
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    title
    reward
    mode
    deadline
    creator
  }
}
```

### Multiplier NFTs for Account

```graphql
query AccountMultipliers($dao: Bytes!, $account: Bytes!) {
  multiplierAccount(id: $dao-$account) {
    currentMultiplierBps
    tokenCount
  }
  multiplierNFTs(where: { dao: $dao, owner: $account }) {
    id
    multiplier
    tier {
      name
    }
  }
}
```

---

## Using the Subgraph in Code

### CLI (JavaScript)

```javascript
const { querySubgraph } = require('./utils/subgraph-client');

const proposals = await querySubgraph(`
  query($governor: Bytes!) {
    proposals(where: { governor: $governor }, first: 10) {
      id
      title
      state
    }
  }
`, { governor: '0x...' });
```

### SDK (Browser)

```javascript
import { subgraph } from '@sage-protocol/sdk/browser';

const proposals = await subgraph.listProposals({
  url: 'https://api.goldsky.com/...',
  governor: '0x...',
  first: 20
});
```

### Direct fetch

```bash
curl -X POST https://api.goldsky.com/api/public/project_.../gn \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ subDAOs(first: 5) { id name memberCount } }"
  }'
```

---

## Discovery API

The Discovery API provides full-text search and trending data. It's powered by an IPFS worker that indexes manifest content.

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `/discover/search?q=...` | Full-text search across prompts |
| `/discover/trending` | Trending prompts by activity |
| `/discover/tags` | Popular tags with counts |
| `/discover/categories` | Category statistics |
| `/discover/skills?q=...` | Search Claude Code skills |
| `/discover/library/:subdao` | Prompts in a specific library |
| `/discover/by-tag/:tag` | Prompts with a specific tag |
| `/discover/stats` | Index statistics |

### Search Prompts

```bash
curl "https://api.sageprotocol.io/discover/search?q=sql&limit=10"
```

Response:
```json
{
  "results": [
    {
      "key": "tools/sql-helper",
      "name": "SQL Helper",
      "description": "Generate and explain SQL queries",
      "cid": "QmABC...",
      "subdao": "0x...",
      "score": 0.95
    }
  ],
  "total": 42
}
```

### Trending Prompts

```bash
curl "https://api.sageprotocol.io/discover/trending?limit=5"
```

### Popular Tags

```bash
curl "https://api.sageprotocol.io/discover/tags?limit=20"
```

Response:
```json
{
  "tags": [
    { "tag": "code", "count": 156 },
    { "tag": "writing", "count": 89 },
    { "tag": "sql", "count": 45 }
  ]
}
```

### Library Details

```bash
curl "https://api.sageprotocol.io/discover/library/0xSubDAOAddress"
```

---

## CLI Integration

The CLI uses both APIs internally:

```bash
# Uses subgraph for governance data
sage proposals inbox --dao 0x...
sage governance doctor --subdao 0x...

# Uses discovery API for search
sage prompts search "code review"
sage project search "sql" --dao 0x...
```

### Check Subgraph Status

```bash
sage governance subgraph-status
```

Shows:
- Current indexed block
- Lag behind chain head
- Indexing errors

---

## MCP Server Integration

The MCP server exposes discovery tools to agents:

```typescript
// Agent calls MCP tool
sage_search_prompts({ query: "database migration", limit: 5 })

// MCP server queries discovery API internally
// Returns structured results for agent use
```

Agents never query the subgraph directly - they use MCP tools which handle the API calls and format responses appropriately.

---

## Entity Relationships

```
SubDAO
  │
  ├── Governor ──────── Proposals ──────── Votes
  │                         │
  ├── LibraryRegistry ── LibraryProject ── LibraryPrompts
  │
  ├── SimpleBountySystem ── Bounties ──── Submissions
  │                                            │
  ├── VotingMultiplierNFT ── MultiplierTiers   └── BountyVotes
  │                              │
  └── Members                    └── MultiplierNFTs ── MultiplierAccounts
```

---

## Indexing Behavior

### Event-Driven Updates

The subgraph listens for contract events:

| Contract | Events |
|----------|--------|
| Governor | ProposalCreated, VoteCast, ProposalQueued, ProposalExecuted |
| LibraryRegistry | LibraryUpdated |
| SimpleBountySystem | BountyCreated, SubmissionReceived, BountyApproved |
| VotingMultiplierNFT | TierCreated, Transfer |

### Manifest Parsing

When a `LibraryUpdated` event fires, the subgraph:
1. Fetches the manifest JSON from IPFS
2. Parses prompt entries
3. Creates/updates `LibraryPrompt` entities

This means there's a slight delay (~30-60s) between manifest update and searchable prompts.

### Block Lag

The subgraph typically lags 1-10 blocks behind the chain head. For time-sensitive queries (e.g., "has my vote been recorded?"), use RPC calls instead.

---

## Advanced Queries

### Prompt Contribution History

Track who contributed prompts via governance:

```graphql
query ContributionHistory($dao: Bytes!) {
  promptContributions(
    where: { dao: $dao }
    orderBy: createdAt
    orderDirection: desc
  ) {
    promptKey
    contributor
    cid
    proposalId
    forVotes
    againstVotes
    fromBounty
    bountyId
  }
}
```

### Auction History

```graphql
query AuctionHistory($auctionHouse: Bytes!) {
  multiplierAuctionBids(
    where: { auctionHouse: $auctionHouse }
    orderBy: blockTimestamp
    orderDirection: desc
    first: 50
  ) {
    nftId
    bidder
    amount
    extended
    blockTimestamp
  }
}
```

### Member Stake Events

```graphql
query StakeHistory($subdao: Bytes!, $account: Bytes!) {
  stakeEvents(
    where: { subdao: $subdao, account: $account }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    amount
    direction
    blockTimestamp
  }
}
```

---

## Quick Reference

```bash
# Subgraph status
sage governance subgraph-status

# Discovery search
sage prompts search "query"
sage project search "query" --dao 0x...

# Direct GraphQL (for debugging)
curl -X POST $SAGE_SUBGRAPH_URL \
  -H "Content-Type: application/json" \
  -d '{"query": "{ _meta { block { number } } }"}'
```

---

## Related

- [Agent Prompt Workflows](./agent-prompt-workflows.md) - How agents use MCP
- [Governance Models](../concepts/governance-models.md) - DAO types
- [SDK Introduction](../sdk/index.md) - SDK subgraph module
