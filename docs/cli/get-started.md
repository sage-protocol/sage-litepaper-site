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
sage library scaffold-manifest
sage library lint manifest.json
sage library push manifest.json --pin
sage library propose manifest.json --subdao 0xYourSubDAO
```

## Running the MCP Server for Agents

```bash
node cli/mcp-server-stdio.js
# or start HTTP and set NEXT_PUBLIC_MCP_HTTP_URL
```

Tools include: `search_onchain_prompts`, `get_prompt_content`, `list_subdaos`, `get_library_manifests`.
