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

## Publishing a Library

```bash
# Initialize workspace
sage prompts init

# Add .md files to prompts/ directory, then publish
sage prompts publish --dest personal   # Personal library (IPFS only)
sage prompts publish --subdao 0x...    # SubDAO library (with governance)

# Or import existing prompts first
sage prompts init --preset cursor       # From Cursor
sage prompts import-skill pdf           # From OpenSkills
sage prompts publish
```

## Running the MCP Server for Agents

```bash
node cli/mcp-server-stdio.js
# or start HTTP and set NEXT_PUBLIC_MCP_HTTP_URL
```

Tools include: `search_onchain_prompts`, `get_prompt_content`, `list_subdaos`, `get_library_manifests`.
