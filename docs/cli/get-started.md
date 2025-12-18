# Get Started with the CLI

<<<<<<< Updated upstream
The Sage **CLI** guides contributors through system-driven metaprompting sessions, pulling from distributed intelligence to suggest reusable agent instructions and formatting them for everyday tools. The `sage wizard` command provides a guided tour through the entire workflow, from wallet connection to submitting a proposal.
=======
The Sage CLI is your command-line interface for creating DAOs, publishing prompts, and managing governance. This guide covers installation and the most common workflows.
>>>>>>> Stashed changes

## Installation

```bash
npm i -g @sage-protocol/cli
# or run on demand
npx @sage-protocol/cli --help
```

The binary is published as `sage`. Update notifications appear once per day unless you set `SAGE_NO_UPDATE_CHECK=1`.

## 1. Connect Your Wallet

```bash
<<<<<<< Updated upstream
sage wizard                    # Interactive guided setup
# or manually:
sage wallet connect --type cast
sage doctor                    # Verify configuration
```

## 2. Start MCP Server for AI Agents

```bash
# HTTP server (for local agents and web tooling)
sage mcp start --port 3000

# Stdio server (for Claude Desktop)
node packages/cli/src/mcp-server-stdio.js
```

**Key MCP Tools:**
- **Quick Workflow**: `quick_create_prompt`, `quick_iterate_prompt`, `help`
- **Discovery**: `search_prompts`, `list_libraries`, `trending_prompts`
- **Publishing**: `suggest_subdaos_for_library`, `generate_publishing_commands`

## 3. Import Existing Skills

```bash
# Import from local .agent/skills/ or .claude/skills/
sage prompts import-skill my-skill
sage prompts import-skill pdf --from-dir ./skills/pdf

# Pull from on-chain registry
sage prompts pull my-skill
sage prompts import-onchain my-skill --from 0xDAO
```

## 4. Create and Publish Skills

```bash
# Initialize workspace
sage prompts init

# Add .md files to prompts/skills/, then publish
sage prompts publish --dest personal   # Personal library (IPFS)
sage prompts publish --dao 0xDAO       # DAO library (governance; --subdao is a legacy alias)

# Preview changes first
sage prompts status
sage prompts diff
sage prompts publish --dry-run
```


## 5. Monetize Your Skills (Optional)

You can sell premium prompts directly to other users without DAO approval.

```bash
# Encrypt and list a prompt for sale (e.g. 5 USDC)
sage personal sell --file ./prompts/alpha.md --price 5.0

# Check your listed items
sage personal list --creator $(sage wallet address)
```

## 6. Create a DAO (Optional)

```bash
# Wizard guides you through playbook selection and safe defaults
sage dao create-playbook --wizard

# Playbooks:
# - Creator: Solo publisher, direct control
# - Squad: Small team with Safe multisig
# - Community: Token voting on Tally
```

## 7. Project-Based Workflow (Advanced)

For fine-grained control over manifests:

```bash
# Create manifest from directory
sage project scaffold ./my-prompts

# Validate and push
sage project validate manifest.json
sage project push manifest.json --dao 0xDAO    # (--subdao remains a legacy alias)
```
=======
# Interactive setup wizard
sage wizard

# Or connect manually
sage wallet connect
sage wallet doctor
```

The CLI supports multiple wallet types:
- **Privy** (default): Browser-based login via web app relay
- **Cast**: Foundry's cast wallet integration
- **Private key**: Direct key in `.env` (not recommended for production)

## Quick Start: Create a Library

The fastest way to get started is `library quickstart` - it creates a DAO, uploads your prompts to IPFS, and registers everything in one command:

```bash
# Create a directory with your prompts
mkdir prompts
echo "# My First Prompt\n\nYour prompt content here" > prompts/my-prompt.md

# One command to create DAO + publish prompts
sage library quickstart --name "My Library" --from-dir ./prompts
```

This will:
1. Scan your `prompts/` directory for `.md` files
2. Upload each prompt to IPFS
3. Create a DAO with personal governance
4. Register the manifest on-chain
5. Save an alias and set your context

## Publishing Updates

After your library exists, publish updates with:

```bash
# Add or edit prompts in your workspace
sage prompts new --name "another-prompt"
# Edit prompts/another-prompt.md

# Publish changes
sage prompts publish --yes
```

## Governance Types

Choose a governance playbook based on your needs:

```bash
# Personal (solo creator, fastest)
sage dao create-playbook --playbook personal --name "My Library"

# Council (team with Safe multisig)
sage dao create-playbook --playbook council-closed --name "Team Library" \
  --owners "0xAlice,0xBob,0xCarol" --threshold 2

# Community (token voting, full democracy)
sage dao create-playbook --playbook community --name "Community DAO"
```

See [Governance Modes](../core-concepts/governance-modes.md) for details on each playbook.

## Running the MCP Server

For AI agent integration via Model Context Protocol:

```bash
# Start MCP server
sage mcp

# Or run in stdio mode for Claude Desktop
node packages/cli/src/mcp-server-stdio.js
```

Configure Claude Desktop in `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "sage": {
      "command": "npx",
      "args": ["@sage-protocol/cli", "mcp"]
    }
  }
}
```

## Common Commands

| Task | Command |
|------|---------|
| Create library + DAO | `sage library quickstart --name "..." --from-dir ./prompts` |
| Show DAO info | `sage dao info <address>` |
| Set working DAO | `sage dao use <address-or-alias>` |
| Publish prompts | `sage prompts publish --yes` |
| Vote on proposal | `sage governance vote <id> 1` |
| Check wallet | `sage wallet doctor` |
| Get testnet tokens | `sage sxxx faucet` |

## Next Steps

- [Creating a SubDAO](../guides/creating-a-subdao.md) - Detailed DAO creation guide
- [Publishing Prompts](../guides/publishing-and-versioning-prompts.md) - Prompt management workflows
- [Governance Modes](../core-concepts/governance-modes.md) - Understanding playbooks
- [CLI Command Reference](./command-reference.md) - Full command documentation
>>>>>>> Stashed changes
