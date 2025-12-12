# What is Sage?

Sage is infrastructure for collaborative prompt development. It lets you:

1. **Publish** prompts to IPFS where anyone can discover them
2. **Govern** which versions get adopted through DAO voting
3. **Incentivize** improvements with bounties
4. **Monetize** expertise with premium content

The typical journey:

```
Solo creator → Personal library → Team DAO → Community governance
```

**Start simple**: Publish prompts under your own wallet. You control everything.

**Add collaboration**: Create a council DAO. Your team votes on changes together.

**Scale up**: Open governance to token holders. Anyone can propose improvements.

At each stage, the protocol handles versioning, attribution, and access control. You focus on the content.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│  Content Layer (IPFS)                                           │
│  manifest.json + prompt files pinned to IPFS                    │
│  Content-addressed: same CID = same content                     │
└──────────────────────────────┬──────────────────────────────────┘
                               │ CID reference
┌──────────────────────────────▼──────────────────────────────────┐
│  LibraryRegistry                                                │
│  mapping(address dao => LibraryInfo)                            │
│  updateLibrary(dao, manifestCID, version) — timelock-gated      │
└──────────────────────────────┬──────────────────────────────────┘
                               │ EXECUTOR_ROLE
┌──────────────────────────────▼──────────────────────────────────┐
│  Timelock Controller                                            │
│  Enforces delay between vote passing and execution              │
│  Gives community time to react to malicious proposals           │
└──────────────────────────────┬──────────────────────────────────┘
                               │ proposal queue
┌──────────────────────────────▼──────────────────────────────────┐
│  Governor (OpenZeppelin)                                        │
│  Proposals, voting, quorum, thresholds                          │
│  Token-weighted or operator-controlled                          │
└──────────────────────────────┬──────────────────────────────────┘
                               │ deployed by
┌──────────────────────────────▼──────────────────────────────────┐
│  DAO Factory                                                    │
│  Deploys Governor + Timelock + Registry wiring                  │
│  Playbooks define governance parameters                         │
└─────────────────────────────────────────────────────────────────┘
```

[Contract Architecture →](contracts/architecture.md) · [Deployments →](contracts/deployments.md)

---

## Governance Models

Three axes define how a DAO operates:

| Axis | Options | Controls |
|------|---------|----------|
| **Kind** | `OPERATOR` / `TOKEN` | Single controller vs token-weighted voting |
| **Proposal** | `COUNCIL_ONLY` / `COMMUNITY` | Who can create proposals |
| **Execution** | `COUNCIL_ONLY` / `ANYONE` | Who can execute passed proposals |

### Playbooks

Pre-configured governance templates:

| Playbook | Use Case | Flow |
|----------|----------|------|
| `personal` | Solo creator | Wallet → instant update |
| `council-closed` | Small team | Safe multisig → threshold → update |
| `community` | Open DAO | Proposal → vote → timelock → update |
| `council-drafts` | Hybrid | Community votes → council executes |

```bash
# Deploy a team DAO with 2-of-3 multisig
sage dao create-playbook --playbook council-closed \
  --name "Team Library" \
  --owners "0xAlice,0xBob,0xCarol" \
  --threshold 2
```

[Governance Models →](concepts/governance-models.md) · [Creating a DAO →](guides/creating-a-subdao.md)

---

## Core Workflows

### Publishing Content

```bash
# 1. Initialize workspace
sage prompts init

# 2. Add prompts to prompts/ directory
# 3. Build and propose
sage project push                           # Pin to IPFS
sage project propose manifest.json --dao 0x...  # Create proposal

# 4. Vote passes → Timelock delay → Execution
# 5. LibraryRegistry now points to new CID
```

[Publishing Guide →](guides/publishing-and-versioning-prompts.md)

### Agent Integration

Agents discover content through the **MCP server**, not raw contracts:

```bash
sage mcp start   # Exposes read/write planning surface
```

MCP endpoints:
- `GET /libraries/{dao}` — Current manifest CID
- `GET /prompts/{key}` — Fetch prompt by key
- `POST /propose` — Generate CLI command for human execution

Agents can propose changes but cannot execute governance actions directly. The human-in-the-loop ensures DAO controls are respected.

[MCP Server →](guides/using-the-mcp-server.md) · [Agent Workflows →](guides/agent-prompt-workflows.md)

### Incentivizing Contributors

**Bounties** let DAOs fund specific improvements:

```bash
sage bounty post "Improve code review prompts" --reward 1000
sage bounty submit <id> --cid <manifest>
sage bounty pick-winner <id> <submission>
```

**Premium Prompts** let creators monetize via SXXX payments:

```bash
sage premium list --author 0x...
sage premium purchase <cid> --price 100
```

[Bounties →](concepts/bounties.md) · [Premium Prompts →](concepts/premium-prompts.md)

---

## Key Contracts

| Contract | Purpose |
|----------|---------|
| `LibraryRegistry` | Maps DAOs to manifest CIDs, gated by timelock |
| `PromptGovernor` | OpenZeppelin Governor with Sage extensions |
| `SubDAOFactory` | Deploys DAOs with playbook parameters |
| `VotingMultiplierNFT` | Boosts voting power for top contributors |
| `SimpleBountySystem` | Escrow and winner selection for bounties |

[Full Contract Reference →](contracts/architecture.md)

---

## Quick Reference

### CLI Commands

```bash
# DAO Management
sage dao create-playbook --playbook <type>
sage dao doctor --subdao 0x...
sage dao info 0x...

# Publishing
sage prompts init
sage project push
sage project propose <manifest>
sage project status

# Governance
sage governance vote <proposal> --support for
sage governance queue <proposal>
sage governance execute <proposal>

# Diagnostics
sage timelock doctor --subdao 0x...
sage governance preflight --subdao 0x...
```

[Full CLI Reference →](cli/command-reference.md)

### SDK

```javascript
import { SageSDK } from '@sage-protocol/sdk';

const sdk = new SageSDK({ provider, signer });

// Read library
const info = await sdk.library.getLibrary(daoAddress);

// Build proposal
const tx = await sdk.governance.buildUpdateLibraryTx({
  dao: daoAddress,
  manifestCID: 'Qm...',
  version: '1.2.0'
});
```

[SDK Guide →](sdk/index.md)

---

## Getting Started

| Goal | Guide |
|------|-------|
| Deploy a DAO | [Creating a DAO](guides/creating-a-subdao.md) |
| Publish prompts | [Publishing & Versioning](guides/publishing-and-versioning-prompts.md) |
| Build agent integration | [Agent Workflows](guides/agent-prompt-workflows.md) |
| Run governance | [Voting on Proposals](guides/voting-on-proposals.md) |
| Set up incentives | [Creating Bounties](guides/creating-bounties.md) |
