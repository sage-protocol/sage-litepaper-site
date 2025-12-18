# Core Components

Sage Protocol is built on three foundational pillars that work together to enable governed, distributed intelligence.

---

## On-chain Governance

Every Sage DAO consists of interconnected smart contracts that manage proposals, voting, and execution:

- **SubDAO Factory** - Deploys new DAOs with pre-configured governance playbooks
- **Governor** - Manages proposal lifecycle (create, vote, queue, execute)
- **Timelock** - Enforces delays between approval and execution for security
- **LibraryRegistry** - Tracks which manifest CID is the "current" version for each DAO
- **Treasury** - Holds DAO funds, controlled by governance

The CLI abstracts these contracts into simple commands:

```bash
# Create a DAO (deploys Governor + Timelock + registers in factory)
sage dao create-playbook --playbook community --name "My DAO"

# Publish prompts (creates proposal → LibraryRegistry update)
sage prompts publish --yes

# Full proposal lifecycle
sage governance vote <id> 1
sage governance queue <id>
sage governance execute <id>
```

---

## Persistent Storage (IPFS)

IPFS provides immutable, content-addressed storage for prompt libraries:

- **Manifests** - JSON files listing all prompts in a library with their CIDs
- **Prompts** - Individual markdown files containing prompt content
- **Skills** - Directories with SKILL.md and supporting files

The Sage IPFS Worker handles uploads, pinning, and retrieval:

```bash
# Upload and pin content
sage ipfs upload ./my-prompt.md

# Check pin status
sage ipfs status <cid>

# Download content
sage ipfs download <cid>
```

Content addressing means the same content always produces the same CID - this enables verification that what's on-chain matches what agents receive.

---

## Discovery & Tooling

Multiple interfaces connect users and agents to governed knowledge:

### CLI

The primary interface for creators and operators:

```bash
sage library quickstart --name "My Library" --from-dir ./prompts
sage prompts publish --yes
sage governance watch <id>
```

### Web App

Browser-based interface for:
- Discovering and browsing libraries
- Voting on proposals
- Managing DAOs
- Connecting wallets via Privy

### MCP Server

Model Context Protocol endpoints for AI agents:

```bash
# Start MCP server for agent integration
sage mcp
```

Agents can:
- Search libraries by keywords
- Fetch prompt content by CID
- List DAOs and their libraries
- Get the latest governed version

### Subgraph

GraphQL API for efficient querying:
- Indexed proposal history
- Library update events
- DAO metadata
- Voting records

The CLI and web app use the subgraph for fast reads, falling back to RPC when needed.

---

## How Components Connect

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Creator   │────▶│     CLI     │────▶│    IPFS     │
│             │     │             │     │   Worker    │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                          │                    │
                          ▼                    ▼
                   ┌─────────────┐     ┌─────────────┐
                   │  Governor   │     │  Manifest   │
                   │  Timelock   │◀───▶│    CID      │
                   └──────┬──────┘     └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │  Library    │
                   │  Registry   │
                   └──────┬──────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
     ┌──────────┐  ┌──────────┐  ┌──────────┐
     │  Agent   │  │  Web App │  │ Subgraph │
     │  (MCP)   │  │          │  │          │
     └──────────┘  └──────────┘  └──────────┘
```

1. **Creator** uses CLI to upload prompts to IPFS
2. **CLI** creates governance proposal with manifest CID
3. **Governor** manages voting; **Timelock** enforces delay
4. **LibraryRegistry** stores approved manifest CID on-chain
5. **Agents/Apps** query registry and fetch content from IPFS

---

## Key Design Principles

### Content Addressing

Every piece of content has a unique CID derived from its contents. This means:
- Same content = same CID (deduplication)
- CID change = content change (tamper detection)
- Agents can verify they received the governed version

### Governance-First

All changes to libraries go through governance:
- Personal DAOs: fast approval, still auditable
- Community DAOs: full voting process
- Every change recorded on-chain

### Separation of Concerns

- **On-chain**: Governance, ownership, version pointers
- **Off-chain**: Content storage (IPFS), indexing (subgraph)
- **Tooling**: CLI, web app, MCP server

This separation keeps gas costs low while maintaining security and verifiability.
