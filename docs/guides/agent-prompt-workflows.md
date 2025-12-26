# Agent Workflows for Prompt Discovery and Improvement

Sage Protocol is designed for **agent-first interaction**. This isn't just a feature - it's the core thesis: **the best prompts emerge from iteration, not isolation**.

A single author can't match what a community of contributors could build. Sage provides the infrastructure for prompts to evolve through permissionless collaboration - where both humans and agents can contribute improvements.

## Why Agents?

Traditional prompt management has a fundamental problem: prompts are trapped in chat histories, scattered across tools, and can't evolve through collective intelligence.

Sage solves this by making prompts:

- **Discoverable** - Agents can crawl the protocol and find prompts via MCP
- **Improvable** - Anyone (human or agent) can propose changes
- **Governed** - Communities vote on which changes get adopted
- **Incentivized** - Bounties reward trying new approaches
- **Attributed** - On-chain provenance tracks who contributed what

**The vision**: Agents actively crawl prompt libraries, identify improvement opportunities, submit proposals, and earn rewards for making prompts better. Prompts become living documents that improve continuously.

---

## The Agent Loop

The core agent workflow follows this pattern:

```
┌─────────────────────────────────────────────────────────────────┐
│  1. DISCOVER                                                     │
│     Agent searches for prompts via MCP                           │
│     → search_prompts, search_onchain_prompts, list_libraries    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. ANALYZE                                                      │
│     Agent evaluates prompt quality                               │
│     → improve_prompt, analyze_dependencies                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. ITERATE                                                      │
│     Agent suggests improvements                                  │
│     → create_from_template, bulk_update_prompts                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. PUBLISH (Human Approval)                                     │
│     Agent generates CLI commands for human execution             │
│     → generate_publishing_commands                               │
└─────────────────────────────────────────────────────────────────┘
```

**Why this separation?** Agents should never call governance contracts directly. This isn't a limitation - it's a feature:

1. **Human oversight** - Governance proposals cost gas and affect on-chain state. Humans should approve these actions.
2. **Auditability** - CLI commands create a clear audit trail. The user can review exactly what will happen.
3. **Safety** - No accidental proposals, no surprise token burns, no unintended state changes.

Agents prepare proposals and generate CLI commands. Humans review and execute.

---

## Setting Up the MCP Server

The MCP (Model Context Protocol) server gives agents a first-class API to interact with Sage without shelling out to the CLI. It's the recommended integration path for AI agents.

### For Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "sage": {
      "command": "node",
      "args": ["/path/to/sage-protocol/packages/cli/src/mcp-server-stdio.js"]
    }
  }
}
```

### For HTTP Mode (Other Agents)

```bash
sage mcp start --port 3000
```

Agents can then call endpoints:
- `POST /mcp/search` - Search prompts
- `POST /mcp/fetch` - Fetch by CID/key
- `POST /mcp/validate` - Validate manifests

---

## Discovery Tools

### Searching Prompts

**`search_prompts`** - Full-text search across local and pinned libraries:

```json
{
  "query": "code review security",
  "limit": 10
}
```

Returns prompts matching the query with titles, descriptions, and source information.

**`search_onchain_prompts`** - Search from governed registries:

```json
{
  "query": "governance",
  "dao": "0x1234...",
  "limit": 20
}
```

Returns only DAO-approved prompts from the subgraph.

### Listing Resources

**`list_libraries`** - Discover available libraries:

```json
{
  "source": "all"  // "local", "onchain", or "all"
}
```

**`list_subdaos`** - List known DAOs:

```json
{
  "limit": 50
}
```

**`list_subdao_libraries`** - Libraries for a specific DAO:

```json
{
  "subdao": "0x1234..."
}
```

### Fetching Content

**`get_prompt`** - Retrieve a single prompt:

```json
{
  "key": "code-review-checklist",
  "source": "onchain"
}
```

---

## Iteration Tools

### Analyzing Prompts

**`improve_prompt`** - Get improvement suggestions:

```json
{
  "prompt_content": "Review this code for bugs..."
}
```

Returns suggestions for:
- Clarity improvements
- Missing edge cases
- Better variable usage
- Constraint additions

**`analyze_dependencies`** - Understand prompt relationships:

```json
{
  "manifest_path": "./manifest.json"
}
```

Shows which prompts reference or depend on others.

### Creating and Modifying

**`create_from_template`** - Scaffold new prompts:

```json
{
  "template": "code-review",
  "variables": {
    "focus_area": "security",
    "output_format": "checklist"
  }
}
```

**`bulk_update_prompts`** - Apply changes across a library:

```json
{
  "manifest_path": "./manifest.json",
  "updates": [
    {"key": "prompt-1", "changes": {"tags": ["security", "review"]}},
    {"key": "prompt-2", "changes": {"description": "Updated description"}}
  ]
}
```

---

## Publishing Workflow

Agents should **never execute governance transactions**. Instead, they generate CLI commands for human review.

### Generating Publishing Commands

**`generate_publishing_commands`** - Create ready-to-run CLI commands:

```json
{
  "manifest_path": "./manifest.json",
  "target_dao": "0x1234...",
  "options": {
    "pin": true,
    "wait": true
  }
}
```

Returns:

```bash
# Preview changes
sage project preview ./manifest.json

# Publish to DAO (creates governance proposal)
sage project push ./manifest.json --dao 0x1234... --pin --wait
```

### Suggesting DAOs

**`suggest_subdaos_for_library`** - Recommend target DAOs:

```json
{
  "manifest_path": "./manifest.json"
}
```

Returns DAOs with matching domains, tags, or complementary libraries.

---

## The Sage Skill for Claude Code

The **sage-skill** (`packages/sage-skill/`) is a Claude Code skill that gives Claude deep knowledge of Sage Protocol workflows.

### Why a Skill?

Skills are specialized knowledge packages that transform Claude from a general-purpose agent into a domain expert. The sage-skill provides:

1. **Procedural knowledge** - Step-by-step workflows Claude wouldn't otherwise know
2. **Domain expertise** - Protocol-specific patterns, error handling, and best practices
3. **Tool integrations** - How to work with the CLI, MCP, and governance contracts
4. **Quality constraints** - When to suggest collaboration, when to check state first

Without the skill, Claude would need to learn Sage Protocol from scratch each session. With the skill, Claude can immediately help with DAO creation, prompt publishing, bounty management, and governance.

### What the Skill Provides

1. **Workflow documentation** - Complete guides for all operations (10 workflow files)
2. **Command reference** - Every CLI command with options and examples
3. **Agent guidance** - When to suggest collaboration opportunities
4. **Error recovery** - Common errors and fixes
5. **Governance modes** - Understanding of operator vs token vs council governance

### Key Agent Behaviors

The skill teaches Claude to:

**Be proactive, not passive:**
```
Don't ask: "Do you have a DAO?"
Do: Run `sage dao list` and check
```

**Check state first:**
```bash
sage context show           # Current DAO context
sage wallet doctor          # Wallet and balances
sage sxxx balance           # SXXX tokens
```

**Suggest collaboration opportunities:**

| User Pattern | Opportunity | Suggestion |
|--------------|-------------|------------|
| Uses prompt repeatedly | Publishing enables improvement | Personal/vault library |
| Frustrated with prompt | Incentivize fixes | Create bounty |
| Has improvement ideas | Contribute to ecosystem | Governance proposal |
| Building with team | Coordinate changes | Council playbook |

### Example Agent Journey

**User asks:** "Help me improve my code review prompt"

**Agent workflow:**

```bash
# 1. Check local workspace
ls prompts/

# 2. Search for similar prompts on-chain
sage prompts search "code review"

# 3. Analyze the user's prompt
# (Use improve_prompt MCP tool)

# 4. Suggest improvements
# - Add security checklist section
# - Include performance bottleneck detection
# - Add example good/bad reviews

# 5. Create variant for testing
sage prompts variant code-review "-v2"

# 6. After user approves changes, generate publish command
sage prompts publish --dry-run  # Show what would happen
sage prompts publish --yes      # Execute with user approval
```

---

## Complete Example: Agent-Assisted Prompt Improvement

### Scenario

An agent discovers a prompt that could be improved and helps the user contribute the fix.

### Step 1: Discovery

Agent searches for prompts in a domain:

```bash
# Via MCP
search_onchain_prompts(query="database migration", limit=10)

# Via CLI (for verification)
sage prompts search "database migration"
```

### Step 2: Analysis

Agent evaluates prompt quality:

```bash
# Via MCP
improve_prompt(prompt_content="...")
```

Identifies issues:
- Missing rollback procedures
- No transaction safety guidance
- Lacks index management

### Step 3: Check for Bounties

Agent checks if improvements are incentivized:

```bash
sage bounty list --subdao 0x...
```

Finds: "Bounty #42: Improve database migration prompt - 100 SXXX"

### Step 4: Propose Improvement

Agent helps user claim and submit:

```bash
# Claim the bounty
sage bounty claim --bounty-id 42 -y

# Create improved version
sage prompts variant database-migration "-improved"
# ... edit prompts/database-migration-improved.md ...

# Submit improvement
sage bounty submit --bounty-id 42 --deliverable "ipfs://Qm..." -y
```

### Step 5: Governance (if no bounty)

For direct contributions without bounties:

```bash
# Check governance requirements
sage governance preflight --subdao 0x...

# Publish creates a proposal
sage prompts publish --yes

# Track the proposal
sage proposals inbox --subdao 0x...
```

---

## Best Practices for Agents

### 1. Always Ground in Governed Content

**Why**: Governed prompts have passed community review. Unverified prompts from IPFS could be anything.

Prefer `search_onchain_prompts` over `search_prompts` to prioritize DAO-approved content. When showing results, indicate governance status:

```
"Found 3 results:
✓ code-review (DeFi DAO - governed)
✓ security-audit (Security DAO - governed)
○ my-local-prompt (local workspace - not published)"
```

### 2. Draft Locally, Publish via Humans

**Why**: On-chain actions cost gas, affect state, and may require governance. Humans should review before executing.

```
Agent creates/modifies → User reviews → User executes CLI → Governance approves
```

Never skip the human review step. Even for "simple" changes, the user should see what's happening.

### 3. Respect DAO Context

**Why**: Different DAOs have different governance rules. A proposal to one DAO might need 4% quorum and 3 days voting; another might execute instantly with operator approval.

Always surface which DAO governs a prompt:

```
"This prompt is governed by DeFi Intelligence DAO (0x1234...).
Governance mode: TOKEN (community voting)
Changes require a governance proposal with 4% quorum."
```

### 4. Generate Complete Commands

**Why**: Missing flags cause confusing errors. A user shouldn't have to figure out what `--dao` to add.

Include all necessary flags:

```bash
# Good - explicit, complete, runnable
sage project push ./manifest.json --dao 0x1234... --pin --wait

# Bad - missing context, will fail or prompt interactively
sage project push ./manifest.json
```

### 5. Check Prerequisites Before Governance

**Why**: Governance proposals fail silently or with cryptic errors if prerequisites aren't met. Check first, fix first.

```bash
sage governance preflight --subdao 0x...
```

If not ready, help user fix each issue:

| Issue | Fix |
|-------|-----|
| No testnet ETH | Direct to [Base Sepolia faucet](https://www.alchemy.com/faucets/base-sepolia) |
| No SXXX | `sage sxxx faucet` (testnet only) |
| SXXX not delegated | `sage sxxx delegate-self` |
| Below `minVotesToVote` | Acquire + delegate at least 1 SXXX (default vote gate) |
| Below `proposalThreshold` | Acquire/delegate more votes (or use a delegate proposer) |

---

## MCP Tool Reference

| Tool | Purpose | Key Inputs |
|------|---------|------------|
| `search_prompts` | Full-text search | `query`, `limit` |
| `search_onchain_prompts` | Governed prompts only | `query`, `dao`, `limit` |
| `list_libraries` | Discover libraries | `source` |
| `list_subdaos` | List DAOs | `limit` |
| `get_prompt` | Fetch single prompt | `key`, `source` |
| `improve_prompt` | Suggest improvements | `prompt_content` |
| `create_from_template` | Scaffold prompts | `template`, `variables` |
| `bulk_update_prompts` | Batch modifications | `manifest_path`, `updates` |
| `analyze_dependencies` | Prompt relationships | `manifest_path` |
| `generate_publishing_commands` | CLI commands | `manifest_path`, `target_dao` |
| `suggest_subdaos_for_library` | Recommend DAOs | `manifest_path` |

---

## Related Guides

- [Using the MCP Server](./using-the-mcp-server.md) - Detailed MCP tool documentation
- [Publishing and Versioning Prompts](./publishing-and-versioning-prompts.md) - Manual publishing workflow
- [Creating Bounties](./creating-bounties.md) - Incentivizing contributions
- [Voting on Proposals](./voting-on-proposals.md) - Governance participation
