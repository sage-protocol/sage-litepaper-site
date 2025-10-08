# Using the MCP Server to Discover and Consume Prompts

The Sage Protocol provides a Model Context Protocol (MCP) server to allow AI agents to interact with the protocol, discover prompts, and access on-chain data. This guide explains how to use the MCP server for your agent.

## Running the MCP Server

The MCP server is designed to be run as a local process that your agent can communicate with. There are two ways to run it:

### 1. Standard I/O (stdio) for Agents

For direct integration with agents like Claude Desktop, you can run the stdio version of the server. This is the recommended approach for most agent development.

```bash
node packages/cli/src/mcp-server-stdio.js
```

The agent communicates with this process by sending and receiving JSON-RPC messages over `stdin` and `stdout`.

### 2. HTTP/WebSocket Server

Alternatively, you can run an HTTP and WebSocket server. This can be useful for web-based agents or for debugging.

To enable the HTTP server, set the `MCP_ALLOW_HTTP=1` environment variable.

```bash
MCP_ALLOW_HTTP=1 node packages/cli/src/mcp-server.js
```

The server will start on port 3333 by default. You can then configure your agent to connect to `http://localhost:3333`.

## Communication Protocol

The MCP server uses the JSON-RPC 2.0 protocol. When using the stdio server, your agent will send JSON-RPC request objects to the server's standard input and receive response objects from its standard output.

## Available Tools

The MCP server exposes a number of tools that your agent can call. Here is a list of the primary tools available.

### Prompt Discovery and Retrieval

*   **`search_prompts`**: Unified prompt search across local pinned libraries and on-chain registries.
    *   `query` (string): Free-text search.
    *   `source` (string): `local`, `onchain`, or `all`.
    *   `subdao` (string): Optional SubDAO address.
    *   `tags` (array): Optional tag filters.
    *   `includeContent` (boolean): Include full prompt content.

*   **`trending_prompts`**: List trending prompts based on recent on-chain activity.
    *   `limit` (number): Max prompts to return.

*   **`search_onchain_prompts`**: Search for prompts directly on-chain from `LibraryRegistry` and SubDAO registries.
    *   `query` (string): Search query.
    *   `subdao` (string): Filter by a specific SubDAO address.
    *   `tags` (array): Filter by tags.
    *   `includeContent` (boolean): Fetch full prompt content from IPFS.

*   **`get_prompt_content`**: Fetch full prompt content from IPFS by its CID.
    *   `cid` (string): The IPFS CID of the prompt.

### Library and Manifest Management

*   **`list_libraries`**: Page through libraries from local cache or on-chain.
    *   `source` (string): `local` or `onchain`.

*   **`get_library_manifests`**: Get all executed library manifests from the main `LibraryRegistry`.
    *   `limit` (number): Max manifests to return.

*   **`get_prompts_from_manifest`**: Download and parse a library manifest to list all its prompts.
    *   `manifestCid` (string): IPFS CID of the manifest.
    *   `includeContent` (boolean): Fetch full prompt content.

*   **`publish_manifest_flow`**: A helper tool to validate a manifest, push it to IPFS, and build the governance proposal payload.
    *   `manifest` (object): The manifest JSON object.
    *   `subdao` (string): Target SubDAO address.

### SubDAO and Governance

*   **`list_subdaos`**: List all available SubDAOs in the Sage Protocol.
    *   `limit` (number): Max SubDAOs to return.

*   **`list_subdao_libraries`**: List the prompt libraries registered within a specific SubDAO.
    *   `subdao` (string): The SubDAO address.

*   **`list_proposals`**: List governance proposals.
    *   `subdao` (string): Filter by SubDAO address.
    *   `state` (string): Filter by proposal state (e.g., `Active`, `Executed`).

### Local Metaprompt Management

*   **`list_metaprompts`**: List locally saved metaprompts.
*   **`save_metaprompt`**: Save a new metaprompt to your local workspace.
*   **`get_metaprompt`**: Load a local metaprompt by its slug.
