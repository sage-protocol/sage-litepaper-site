# Tooling & Surfaces (What Exists Today)

Sage is best understood as a **protocol + toolchain**:

- The protocol defines the trust boundaries (what is canonical, who can change it, and how).
- The toolchain makes the protocol usable for humans and agents (publish, discover, improve, govern).

This page is intentionally light on internals and heavy on “why this exists.”

---

## The Core Surfaces

| Surface | What it is | Why it matters |
|--------|------------|----------------|
| **Contracts** | On-chain DAOs, registries, governance, incentives | The shared “acceptance function” and provenance anchor |
| **IPFS storage** | Content-addressed manifests and prompt payloads | Durable, portable content without platform lock-in |
| **IPFS worker** | A pinning + auth + optional payment front door | Reliability, cache warming, and a practical bridge to paid storage |
| **Subgraph** | Indexed events exposed via GraphQL | Fast discovery and analytics without RPC scanning |
| **Discovery API** | Search/trending endpoints (where enabled) | Makes “find the best governed prompt” feasible for agents |
| **SDK** | Integration library used by apps/services | One place for shared protocol logic (less drift across surfaces) |
| **CLI** | Operator-grade tool for publishing and governance | The most complete workflow surface; scripts well |
| **MCP server** | Agent-native API layered on CLI/SDK | Lets agents operate safely without inventing their own protocol glue |
| **Web app** | Human UI for browsing, governance, and publishing | Lowers friction for non-CLI users |
| **Agent skill** | Packaged workflow knowledge for agents | Turns generic agents into effective contributors quickly |

---

## How They Work Together (End-to-End)

At a high level, Sage’s “content upgrade” loop looks like:

1. **Authoring**: prompts are created/edited locally (humans or agents).
2. **Packaging**: a manifest describes a versioned library.
3. **Storage**: content is pinned to IPFS (direct provider or worker).
4. **Governance**: proposals decide which manifest becomes canonical.
5. **Indexing**: subgraph + discovery surfaces make the canonical version easy to find.
6. **Consumption**: agents and apps pull governed prompts by DAO/library context.

The important framing: **off-chain tooling accelerates iteration; on-chain governance preserves legitimacy**.

---

## Why This Matters for the Economic Thesis

If Sage’s bet is “prompts can compound when maintained,” then the tooling must make three things cheap:

- **Making changes** (iteration speed)
- **Approving changes** (legitimacy)
- **Finding the best version** (distribution)

The packages exist to make that loop viable for a new class of labor (prompt maintainers and agents).

---

## Architectural Tradeoffs (Honest Critique)

Sage makes a few pragmatic choices that are worth stating explicitly:

- **Dependence on off-chain indexing**  
  The subgraph is not a trust anchor, but it is a UX dependency. That’s a reasonable trade when the alternative is RPC scanning, but it raises availability and consistency concerns for production apps.

- **An IPFS “front door” is partially centralized**  
  A worker improves reliability (pinning, cache warming, and optional paid storage), but it also concentrates operational risk. Content addressing limits the blast radius (the CID is still the truth), yet availability becomes partly an ops problem.

- **Manifest updates are atomic but coarse**  
  Treating the manifest as the library’s unit of change makes upgrades clean and auditable, but it also means “small edits” still republish a manifest, and concurrent updates can clobber each other without a compare-and-set style guard.

- **Multiple governance models reduce friction but increase complexity**  
  The operator→council→community gradient is a feature (it matches how communities evolve), but it creates more surface area for tooling and more ways for users to misunderstand authority.

These tradeoffs aren’t fatal — they are the cost of shipping a usable, agent-first protocol. The key is to keep pushing complexity down into shared libraries (SDK/CLI/MCP) while keeping the on-chain trust anchor small and legible.

