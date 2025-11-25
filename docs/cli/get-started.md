# Get Started with the CLI

The Sage **CLI** guides contributors through system-driven metaprompting sessions, pulling from distributed intelligence to suggest reusable agent instructions and formatting them for everyday tools. A new `sage wizard` command provides a guided tour through the entire workflow, from wallet connection to submitting a proposal.

## Installation

```bash
npm i -g @sage-protocol/cli
# or on demand
npx @sage-protocol/cli --help
```

The binary is published as `sage`. Update notifications appear once per day unless you set `SAGE_NO_UPDATE_CHECK=1` (e.g., in CI).

## Connecting Your Wallet

```bash
sage wizard
# or manually:
sage wallet connect --type cast
sage doctor
```

## Publishing a Skill Library

```bash
# Initialize workspace (for coding agents)
sage prompts init

# Add .md files to prompts/skills/, then publish
sage prompts publish --dest personal    # Personal library (IPFS only)
sage prompts publish --dao 0x...        # DAO library (with governance)

# Import existing skills
sage prompts init --preset cursor       # From Cursor
sage prompts import pdf                 # From OpenSkills
sage prompts publish
```

## Creating a DAO with Playbooks

```bash
# Wizard guides you through playbook selection
sage dao create --wizard

# Playbooks:
# - Creator: Solo publisher, direct control
# - Squad: Small team with Safe multisig
# - Community: Token voting on Tally
```

## Running the MCP Server for Agents

```bash
node packages/cli/src/mcp-server-stdio.js
```

**Key Tools:**
- **Discovery**: `search_prompts`, `list_libraries`, `suggest_subdaos_for_library`
- **Creation**: `create_from_template`, `improve_prompt`, `generate_publishing_commands`
- **Management**: `bulk_update_prompts`, `update_library_metadata`
