# Get Started with the CLI

The Sage CLI is your command-line interface for creating DAOs, publishing prompts, and managing governance. This guide covers installation and the most common workflows.

## Installation

```bash
npm i -g @sage-protocol/cli
# or run on demand
npx @sage-protocol/cli --help
```

The binary is published as `sage`. Update notifications appear once per day unless you set `SAGE_NO_UPDATE_CHECK=1`.

## 1. Connect Your Wallet

```bash
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
