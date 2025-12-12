# Workflows

Step-by-step guides for common Sage Protocol operations. Each workflow covers the CLI commands, SDK calls, and contract interactions involved.

---

## Publishing

Get content from your local workspace to an on-chain governed library.

| Guide | Description |
|-------|-------------|
| [First Library](./creating-your-first-prompt-library.md) | Wallet setup, workspace init, first publish |
| [Publishing & Versioning](./publishing-and-versioning-prompts.md) | IPFS pinning, governance proposals, version management |
| [Premium Prompts](./creating-and-selling-premium-prompts.md) | Pricing, Lit Protocol access, SXXX payments |

**Quick path:**
```bash
sage prompts init                              # Create workspace
# Add prompts to prompts/
sage project push                              # Pin to IPFS
sage project propose manifest.json --dao 0x...  # Create proposal
```

---

## DAO Setup

Deploy and configure a DAO for your team or community.

| Guide | Description |
|-------|-------------|
| [Creating a DAO](./creating-a-subdao.md) | Playbook selection, deployment, initial config |
| [Managing Members](./managing-subdao-members.md) | Roles, permissions, Safe multisig |
| [Creating Bounties](./creating-bounties.md) | Posting rewards, reviewing submissions |

**Quick path:**
```bash
sage dao create-playbook --playbook council-closed \
  --name "Team Library" \
  --owners "0xAlice,0xBob,0xCarol" \
  --threshold 2

sage dao doctor --subdao 0x...   # Verify wiring
```

---

## Governance

Participate in DAO decision-making.

| Guide | Description |
|-------|-------------|
| [Joining a DAO](./joining-a-subdao.md) | Discovery, membership, staking |
| [Staking & Voting Power](./staking-and-governance.md) | SXXX delegation, multipliers |
| [Voting on Proposals](./voting-on-proposals.md) | Casting votes, queue/execute |

**Quick path:**
```bash
sage sxxx delegate-self                    # Enable voting power
sage governance vote <proposal> --support for
sage governance queue <proposal>           # After vote passes
sage governance execute <proposal>         # After timelock delay
```

---

## Agent Integration

Build AI agents that discover and use governed content.

| Guide | Description |
|-------|-------------|
| [Agent Workflows](./agent-prompt-workflows.md) | End-to-end agent patterns, sage-skill |
| [MCP Server](./using-the-mcp-server.md) | Starting server, available endpoints |
| [Subgraph & Discovery](./subgraph-and-discovery.md) | GraphQL queries, indexing events |
| [SDK Integration](./integrating-the-sage-sdk.md) | Node.js and browser SDK usage |

**Quick path:**
```bash
sage mcp start                             # Start MCP server

# Agent queries
GET /libraries/{dao}                       # Current manifest CID
GET /prompts/{key}                         # Fetch prompt content
POST /propose                              # Generate CLI command
```

---

## Workflow Comparison

| Task | CLI Command | SDK Method |
|------|-------------|------------|
| Get library info | `sage project status` | `sdk.library.getLibrary(dao)` |
| Push to IPFS | `sage project push` | `sdk.ipfs.pin(manifest)` |
| Create proposal | `sage project propose` | `sdk.governance.propose(...)` |
| Vote | `sage governance vote` | `sdk.governance.vote(...)` |
| Execute | `sage governance execute` | `sdk.governance.execute(...)` |

---

## Prerequisites

All workflows assume:

1. **CLI installed**: `npm install -g @sage-protocol/cli`
2. **Wallet connected**: `sage wallet init`
3. **Test SXXX**: `sage sxxx faucet` (Base Sepolia)
4. **DAO selected**: `sage dao use 0x...` or `--dao` flag

See [CLI Quick Start](../cli/get-started.md) for setup details.
