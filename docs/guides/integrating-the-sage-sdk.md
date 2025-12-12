# Integrating the Sage SDK into Your Agent

This guide focuses on *framing* and safe integration patterns. The SDK is powerful — it can build governance transactions — so the default posture for agents should be **read-only + human-approved writes**.

---

## MCP vs SDK (recommended)

- **Use MCP** when your agent is operating “as a contributor” (discover → draft → propose). MCP is designed to keep agents from bypassing governance and encourages a human audit trail.
- **Use the SDK** when you are building a custom runtime (backend service, web app, analytics pipeline, or a specialized agent that needs direct access to subgraph/IPFS data).

If you’re starting from scratch, begin with:
- [Using the MCP Server](./using-the-mcp-server.md)
- [Agent Workflows](./agent-prompt-workflows.md)

---

## Minimal read-only integration (Node)

The most common pattern is:

1) query the subgraph for the canonical library pointer (manifest CID)  
2) fetch the manifest JSON by CID from IPFS  
3) fetch prompt payloads by CID as needed  

```js
import sdk from '@sage-protocol/sdk/node';

const subgraph = new sdk.services.SubgraphService({ url: process.env.SAGE_SUBGRAPH_URL });
const ipfs = new sdk.services.IPFSService({
  gateway: process.env.SAGE_IPFS_GATEWAY || 'https://ipfs.dev.sageprotocol.io/ipfs',
  workerBaseUrl: process.env.SAGE_WORKER_URL || 'https://api.sageprotocol.io',
});

// Example: list recent library pointers for a DAO (subgraph-first)
const pointers = await sdk.subgraph.getSubdaoLibraries({
  url: process.env.SAGE_SUBGRAPH_URL,
  subdao: process.env.SAGE_SUBDAO_ADDRESS,
  first: 5,
});

const latest = pointers[0];
const manifest = await ipfs.fetchByCID(latest.manifestCID);
```

---

## Writing safely (human-approved)

The safest default for agent writes:

1) agent drafts changes locally (new prompt text, manifest edits)  
2) agent outputs *commands* or *transactions* for a human to review  
3) a human executes via CLI (or a controlled backend)  

This is the same reason the MCP server focuses on generating publishing commands rather than sending on-chain transactions directly.

---

## Browser usage (UI agents and apps)

For browser contexts, use:

```js
import sdk from '@sage-protocol/sdk/browser';
```

Use subgraph + IPFS gateways for reads. For writes (votes, proposals), encode calldata using the exported ABIs and send via your wallet stack (viem/ethers/wagmi), or route writes through server-side handlers.

---

## Why the SDK matters (economic framing)

Sage’s economic thesis depends on keeping prompt maintenance cheap and governance legible. The SDK exists so:

- apps and agents can **prefer governed content** over random CIDs
- contributors can **build proposals consistently** (fewer mistakes; less drift across tooling)
- the protocol can support a new labor class (maintainers + agents) without every team re‑implementing core protocol logic

For the full picture of how SDK/CLI/MCP/subgraph/IPFS fit together, see:
- [Tooling & Surfaces](../concepts/tooling-and-surfaces.md)
