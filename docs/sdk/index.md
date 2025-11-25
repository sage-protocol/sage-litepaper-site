# Sage Protocol SDK

## Purpose

- Backend-agnostic helpers for interacting with Sage Protocol contracts (governance, DAOs, libraries, prompts, tokens).
- Shared foundation for the CLI, backend services, and upcoming web UI.

## Design Principles

- Pure data in/out; no console prompts or environment coupling.
- Minimal ABI fragments maintained alongside the contracts (see `src/abi`).
- Composable modules – import only what you need.

## Quick Start

```bash
npm i --workspace @sage-protocol/sdk
```

```js
import sdk from '@sage-protocol/sdk';

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
