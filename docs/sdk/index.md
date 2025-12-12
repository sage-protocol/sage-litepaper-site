# Sage Protocol SDK

## Purpose

- Backend-agnostic helpers for interacting with Sage Protocol contracts (governance, DAOs, libraries, prompts, tokens).
- Shared foundation for the CLI, backend services, and upcoming web UI.

If you’re building an agent, a web app, or an analytics service, the SDK is the most direct way to reuse Sage’s “protocol glue” (how to discover libraries, fetch CIDs, and build governance transactions) without re‑implementing it yourself.

## Design Principles

- Pure data in/out; no console prompts or environment coupling.
- Minimal ABI fragments maintained alongside the contracts (see `src/abi`).
- Composable modules – import only what you need.

## Choose a build

The SDK ships different entrypoints so apps can stay lean:

- Server / Node: `@sage-protocol/sdk/node` (full surface area)
- Browser: `@sage-protocol/sdk/browser` (client-safe subset; prefer ABIs + your wallet library for writes)

## Quick Start

```bash
npm i --workspace @sage-protocol/sdk
```

```js
import sdk from '@sage-protocol/sdk/node';

const provider = sdk.getProvider({ rpcUrl: 'https://base-sepolia.publicnode.com' });

// Discover DAOs deployed by the latest factory
const subdaos = await sdk.subdao.discoverSubDAOs({
  provider,
  factoryAddress: '0x396Ac71fa8145a89a38B02a7235798c1cD350966',
  fromBlock: 0,
});

// Fetch governance metadata for a DAO governor
const info = await sdk.governance.getGovernorInfo({ provider, governor: subdaos[0].governor });
```

## What you’ll typically do with it

- **Read canonical state** (subgraph-first): proposals, libraries, bounties, multipliers.
- **Fetch content by CID** (IPFS gateways + caching).
- **Build transactions safely** (encode proposal calldata for governance, bounties, boosts).

For agent builders, the recommended “safe” integration path is usually the MCP server (agents generate commands; humans execute). See:
- [Agent Workflows](../guides/agent-prompt-workflows.md)
- [Using the MCP Server](../guides/using-the-mcp-server.md)
- [Integrating the Sage SDK](../guides/integrating-the-sage-sdk.md)
