# Sage Protocol

**Governance infrastructure for AI prompts, skills, and knowledge.**

Sage lets communities collaboratively maintain prompt libraries through transparent on-chain governance. Authors publish prompts to IPFS, DAOs vote on which versions to adopt, and agents discover approved content through the MCP server.

---

## Key Concepts

### Prompts

The foundational unit. A prompt is a markdown file with YAML frontmatter that defines an AI instruction, persona, or workflow. Prompts are versioned, attributed, and discoverable.

```yaml
---
name: Code Review Assistant
key: dev/code-review
tags: [development, review]
---
You are a senior engineer reviewing code for clarity, correctness, and maintainability...
```

[Publishing & Versioning →](guides/publishing-and-versioning-prompts.md)

---

### Skills

Skills are Claude Code compatible prompt packages. They bundle multiple prompts, workflows, and documentation into a coherent capability that agents can adopt.

```bash
sage prompts import-skill pdf            # Import existing skill
sage prompts publish-skill ./my-skill    # Publish to DAO
```

Skills live in `prompts/skills/` and follow the [Claude Code skill format](guides/agent-prompt-workflows.md#the-sage-skill-for-claude-code).

---

### Prompt Libraries

A **library** is a governed collection of prompts maintained by a DAO. Each DAO has one canonical library stored on IPFS and referenced on-chain via the `LibraryRegistry`.

```
manifest.json → IPFS (CID) → LibraryRegistry → DAO Governance
```

Libraries are updated through governance proposals. The `updateLibrary(dao, manifestCID, version)` call records a new version only when the DAO approves.

[Creating Your First Library →](guides/creating-your-first-prompt-library.md)

---

### Playbooks

Playbooks are pre-configured governance templates that let you deploy a DAO with sensible defaults in one command.

| Playbook | Best For | Governance |
|----------|----------|------------|
| **personal** | Solo creators | Single wallet, instant updates |
| **council-closed** | Small teams (3-10) | Safe multisig, threshold signatures |
| **community** | Open communities (50+) | Token voting, timelock delays |
| **council-drafts** | Hybrid | Community votes, council executes |

```bash
sage dao create-playbook --playbook personal --name "My Library"
sage dao create-playbook --playbook council-closed --owners "0xAlice,0xBob" --threshold 2
```

[Governance Models →](concepts/governance-models.md)

---

### Governance Types

Three axes define how your DAO operates:

| Axis | Options | What It Controls |
|------|---------|------------------|
| **Governance Kind** | `OPERATOR` / `TOKEN` | Single controller or token-weighted voting |
| **Proposal Access** | `COUNCIL_ONLY` / `COMMUNITY_THRESHOLD` | Who can create proposals |
| **Execution Access** | `COUNCIL_ONLY` / `ANYONE` | Who can execute passed proposals |

**OPERATOR** mode gives a controller (wallet or Safe) direct authority. **TOKEN** mode requires SXXX-weighted voting with configurable quorum, voting period, and timelock delays.

[Full Governance Reference →](concepts/governance-models.md)

---

## For Creators

1. **Initialize** a workspace: `sage prompts init`
2. **Author** prompts in `prompts/` as markdown with frontmatter
3. **Test** locally: `sage prompts try my-prompt`
4. **Publish** through governance: `sage prompts publish --dao 0x...`

Premium prompts let you monetize expertise via SXXX payments and ERC1155 license receipts.

[Creating Premium Prompts →](guides/creating-and-selling-premium-prompts.md)

---

## For DAOs

1. **Deploy** with a playbook: `sage dao create-playbook --playbook council-closed`
2. **Diagnose** governance wiring: `sage dao doctor`, `sage timelock doctor`
3. **Propose** library updates: `sage project propose manifest.json`
4. **Incentivize** with bounties: `sage bounty post "Improve summarization prompts"`

[Creating a DAO →](guides/creating-a-subdao.md) · [Creating Bounties →](guides/creating-bounties.md)

---

## For Agents

Agents interact through the **MCP server**, not raw contracts:

- **Discover** libraries via subgraph queries
- **Fetch** prompts by key or CID
- **Propose** changes that humans execute through governance

```bash
# Start MCP server
sage mcp start

# Agents can now query
GET /libraries/{dao}
GET /prompts/{key}
POST /propose (generates CLI command)
```

The [sage-skill](guides/agent-prompt-workflows.md#the-sage-skill-for-claude-code) gives Claude Code deep knowledge of Sage workflows.

[Agent Workflows →](guides/agent-prompt-workflows.md) · [MCP Server →](guides/using-the-mcp-server.md)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  IPFS                                                           │
│  Manifests and prompts stored as content-addressed payloads     │
└──────────────────────────────┬──────────────────────────────────┘
                               │ CID
┌──────────────────────────────▼──────────────────────────────────┐
│  LibraryRegistry                                                │
│  Maps each DAO to its current manifest CID                      │
│  updateLibrary(dao, manifestCID, version)                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │ via Timelock
┌──────────────────────────────▼──────────────────────────────────┐
│  Governor + Timelock                                            │
│  Proposals → Voting → Delay → Execution                         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│  DAO Factory                                                    │
│  Deploys DAOs with playbook-defined governance parameters       │
└─────────────────────────────────────────────────────────────────┘
```

[Full Architecture →](contracts/architecture.md) · [Deployments →](contracts/deployments.md)

---

## Next Steps

| Goal | Start Here |
|------|------------|
| Publish my first prompt | [Creating Your First Library](guides/creating-your-first-prompt-library.md) |
| Launch a DAO | [Creating a DAO](guides/creating-a-subdao.md) |
| Build an agent integration | [Agent Workflows](guides/agent-prompt-workflows.md) |
| Understand governance options | [Governance Models](concepts/governance-models.md) |
| Monetize prompts | [Premium Prompts](concepts/premium-prompts.md) |
