# IPFS & Storage Commands

Sage uses IPFS as the canonical store for manifests and prompt payloads. This page explains how the CLI interacts with IPFS today, and how credit‑based pinning fits into the roadmap.

---

## 1. Current Model: Pinning Providers & Gateways

Today, the Sage CLI works with a configured IPFS pinning provider (such as Pinata) and one or more gateways.

### Uploading Content

- Prompts and manifests are typically uploaded as part of higher‑level workflows:
  - `sage prompts publish` – builds a manifest from your `prompts/` directory and uploads it.
  - `sage project push` – uploads an existing `manifest.json` and its prompts.
- In both cases, the CLI:
  - Sends content to the configured pinning provider.
  - Receives a CID for the uploaded JSON or file(s).
  - Uses that CID in on‑chain proposals or registry updates.

You can also work with IPFS more directly:

```bash
sage ipfs upload ./path/to/file
sage ipfs fetch <cid> --output ./out.json
```

Exact subcommands may evolve, but the pattern is:
- **Upload** content via the configured provider.
- **Fetch** content via a gateway.

### Fetching Content

When fetching from IPFS, the CLI:
- Uses a default gateway (e.g., `ipfs.dev.sageprotocol.io`) or a provider‑specific gateway.
- Allows you to override the gateway with flags such as `--gateway https://gateway.pinata.cloud/ipfs/`.

If a gateway returns 404 (e.g., due to propagation lag), you can:
- Retry with a different gateway using `--gateway`.
- Confirm the CID exists in your pinning provider’s dashboard.

On‑chain registries and the subgraph reference CIDs, so agents and users can always find the DAO‑approved manifest even if multiple gateways are involved.

---

## 2. Credit‑Based Pinning (Experimental & Roadmap)

The repository includes an experimental **402 worker** and credit ledger for pinning, but it is not required for current CLI usage.

### 402 Worker (In Repo)

The 402 worker is a small service that:
- Exposes HTTP endpoints that respond with 402 Payment Required when credits are insufficient.
- Maintains a per‑user credit balance in a durable store.
- Debits credits when a pin is created or renewed.

This allows you to:
- Gate pinning behind a simple “buy credits → spend credits” flow.
- Integrate payments (e.g., USDC or SAGE) off‑chain while still using IPFS under the hood.

### On‑Chain Credits (Future)

Longer term, credits can be moved on‑chain:
- A `CreditToken` (ERC) represents pinning credits.
- A `PaymentRouter` contract accepts token payments, mints/burns credits, and optionally routes a portion of value to DAOs or the protocol treasury.

The CLI can then:
- Show balances of credits for a given address.
- Use credits to gate IPFS uploads while keeping CIDs and gateways unchanged.

These credit and worker systems are **roadmap items**. The key point for users today is:
- You only need a working pinning provider and gateway configuration.
- CIDs referenced by DAOs and registries remain stable regardless of how storage is funded.

