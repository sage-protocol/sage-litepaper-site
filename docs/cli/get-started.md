# Get Started with the CLI

The Sage **CLI** guides contributors through system-driven metaprompting sessions, pulling from distributed intelligence to suggest reusable agent instructions and formatting them for everyday tools. The `sage wizard` command provides a guided tour through the entire workflow, from wallet connection to submitting a proposal.

## Installation

```bash
npm i -g @sage-protocol/cli
# or on demand
npx @sage-protocol/cli --help
```

The binary is published as `sage`. Update notifications appear once per day unless you set `SAGE_NO_UPDATE_CHECK=1` (e.g., in CI).

## 1. Connect Your Wallet

```bash
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
sage prompts publish --subdao 0xDAO    # DAO library (governance)

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
# Wizard guides you through playbook selection
sage dao create --wizard

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
sage project push manifest.json --subdao 0xDAO
```
