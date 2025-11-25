# Using the MCP Server

The Sage MCP (Model Context Protocol) server gives agents a first-class API to discover, inspect, and publish governed prompt libraries without shelling out to the CLI.

This guide explains how to run the server and how each tool maps to Sage’s on-chain and workspace features.

---

## 1. Running the MCP Server

### HTTP mode (for local agents and web tooling)

```bash
sage mcp start --port 3000
```

- Default host: `localhost`
- Default port: `3000`

Endpoints (JSON over HTTP):
- `POST /mcp/search` – wrapper around `search_prompts` and `search_onchain_prompts`
- `POST /mcp/fetch` – wrapper around `get_prompt` and manifest fetch helpers
- `POST /mcp/validate` – basic manifest / prompt validation

### Stdio mode (for Claude Desktop and other MCP-native runtimes)

```bash
node packages/cli/src/mcp-server-stdio.js
```

In Claude Desktop, configure:

```json
{
  "mcpServers": {
    "sage": {
      "command": "node",
      "args": ["/path/to/sage/packages/cli/src/mcp-server-stdio.js"]
    }
  }
}
```

---

## 2. Discovery & Search Tools

These tools help agents find libraries and prompts without knowing addresses or CIDs in advance.

- `search_prompts`
  - **What it does**: Full-text search across prompt titles, bodies, and tags from local workspaces and pinned libraries.
  - **Typical inputs**:
    - `query` (string): e.g. `"code review"`, `"lit encryption"`.
    - `limit` (number, optional).

- `search_onchain_prompts`
  - **What it does**: Searches prompts and libraries directly from `LibraryRegistry` and per-DAO registries via the subgraph/RPC.
  - **Typical inputs**:
    - `query` (string).
    - `dao` (string, optional): filter by a specific DAO address (parameter name may still be `subdao` in the underlying tool).
    - `limit` (number, optional).

- `list_libraries`
  - **What it does**: Lists known libraries (local manifest files, pinned manifests, and on-chain libraries when available).
  - **Typical inputs**:
    - `source` (enum): `"local"`, `"onchain"`, or `"all"`.

- `list_subdaos`
  - **What it does**: Lists DAOs known to the registry/subgraph, including basic metadata (address, name, factory).
  - **Typical inputs**:
    - `limit` (number, optional): max DAOs to return.

- `list_subdao_libraries`
  - **What it does**: Lists libraries registered by a specific DAO.
  - **Typical inputs**:
    - `subdao` (string): DAO address (parameter name preserved for compatibility).

---

## 3. Prompt & Template Tools

These tools let agents inspect and reuse prompts and templates programmatically.

- `get_prompt`
  - **What it does**: Fetches a single prompt by key (from workspace, pinned manifest, or on-chain library).
  - **Typical inputs**:
    - `key` (string): e.g. `"code-review"`, `"examples/e2e-test"`.
    - `source` (optional): `"local"` or `"onchain"`.

- `list_templates`
  - **What it does**: Lists available prompt templates (e.g. code review, debugging, reflection).

- `get_template`
  - **What it does**: Returns the full specification for a template, including variables and recommended usage.
  - **Typical inputs**:
    - `key` (string): template ID.

---

## 4. Library Authoring & Publishing Tools

These tools map directly to the CLI’s `project` + `prompts` workflows, but are agent-facing.

- `create_from_template`
  - **What it does**: Creates a new prompt from a template, filling in variables supplied by the agent/user.
  - **Typical usage**:
    - An agent calls `create_from_template` to scaffold a draft prompt, then surfaces it to the user for editing before publishing.

- `improve_prompt`
  - **What it does**: Analyzes a prompt and suggests improvements (clarity, edge cases, variable usage).
  - **Typical usage**:
    - Run on workspace prompts before `sage prompts publish` or `sage project push`.

- `bulk_update_prompts`
  - **What it does**: Applies multiple small edits to prompts in a manifest in one operation.
  - **Typical usage**:
    - Agents that perform large-scale refactors (rename variables, update instructions) across a library.

- `analyze_dependencies`
  - **What it does**: Analyzes variable and content dependencies between prompts in a library.
  - **Typical usage**:
    - Helps agents understand which prompts call or assume others, so changes don’t break downstream flows.

- `update_library_metadata`
  - **What it does**: Updates library-level metadata (name, description, tags) and can propagate tags to prompts.

- `generate_publishing_commands`
  - **What it does**: Generates ready-to-run CLI commands (`sage project push`, `sage project propose`, etc.) to publish or update a library to a DAO.
  - **Typical usage**:
    - Agent returns a “next steps” block to the user with exact shell commands instead of executing governance flows directly.

---

## 5. Governance-Aware Tools

These tools connect authoring flows to governance, without bypassing timelocks or Safe/DAO controls.

- `suggest_subdaos_for_library`
  - **What it does**: Recommends DAOs where a given library would be a good fit, based on existing tags, domains, and registry data.
  - **Typical usage**:
    - Agent proposes: “Publish this evaluation library to DAO X or DAO Y” with rationale.

- `search_onchain_prompts` (revisited)
  - **How it fits**: Gives agents a way to surface **governed** prompts first, so they can prefer DAO-curated content over arbitrary IPFS CIDs.

Agents should not call governance contracts directly; instead, they:
1. Use MCP to propose changes (new prompts, updated manifests).
2. Generate CLI commands via `generate_publishing_commands`.
3. Let humans (or higher-level governance agents) run proposals through `sage project push`, `sage project propose`, and `sage proposals` flows.

---

## 6. Recommended Patterns for Agents

- **Read-only by default**  
  Use `search_prompts`, `search_onchain_prompts`, `list_libraries`, and `get_prompt` to ground responses in governed content before generating anything new.

- **Draft locally, then publish via humans**  
  Use `create_from_template` + `improve_prompt` + `bulk_update_prompts` to prepare drafts. Return `generate_publishing_commands` output to the user instead of executing on-chain actions automatically.

- **Respect DAO context**  
  When using `search_onchain_prompts`, `list_subdao_libraries`, or `suggest_subdaos_for_library`, always surface which DAO a prompt or library is governed by so users know the source of authority.

This framing keeps the MCP server powerful for agents while still respecting the governance model described in the rest of the litepaper.

