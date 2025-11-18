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
sage skills init

# Add .md files to prompts/skills/, then publish
sage skills publish --dest personal    # Personal library (IPFS only)
sage skills publish --subdao 0x...     # SubDAO library (with governance)

# Import existing skills
sage skills init --preset cursor       # From Cursor
sage skills import pdf                 # From OpenSkills
sage skills publish
```

## Creating a SubDAO with Playbooks

```bash
# Wizard guides you through playbook selection
sage subdao create --wizard

# Playbooks:
# - Creator: Solo publisher, direct control
# - Squad: Small team with Safe multisig
# - Community: Token voting on Tally
```

## Running the MCP Server for Agents

```bash
node cli/mcp-server-stdio.js
# or start HTTP and set NEXT_PUBLIC_MCP_HTTP_URL
```

Tools include: `search_onchain_prompts`, `get_prompt_content`, `list_subdaos`, `get_library_manifests`.
