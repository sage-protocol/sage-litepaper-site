# Creating Your First Prompt Library

This guide walks through going from a fresh Sage CLI install to a governed prompt library that agents can use via the MCP server.

The steps are:
1. Set up your wallet and get test SXXX.
2. Initialize a local prompts workspace.
3. Author and test a prompt.
4. Publish through a DAO with governance.
5. Let agents access it via the MCP server.

---

## 1. Wallet Setup and Testnet Funds

Sage CLI defaults to a Privy-backed wallet on Base Sepolia in recent versions.

1. **Initialize your wallet and config**
   ```bash
   sage wallet init
   sage wallet doctor
   ```
   - `wallet init` walks you through connecting with Privy.
   - `wallet doctor` verifies RPC, chain ID, and wallet connectivity.

2. **Get SXXX for governance and publishing**
   On Base Sepolia, use the built-in SXXX faucet:
   ```bash
   sage sxxx faucet --check   # view limits and cooldown
   sage sxxx faucet           # request SXXX to your connected wallet
   ```

3. **Optional: delegate voting power**
   ```bash
   sage sxxx delegate-self
   ```
   This ensures your SXXX voting power counts for voting in DAOs that use SXXX‑weighted governance.

---

## 2. Initialize a Prompts Workspace

From your project directory, create a Sage workspace:

```bash
sage prompts init
```

This creates:
- `.sage/workspace.json` – workspace configuration.
- `prompts/` – folder where your prompt markdown files live.

You can check status at any time with:
```bash
sage prompts status
```

---

## 3. Author and Test a Prompt

Create a simple prompt file in the `prompts/` folder, for example:

```bash
cat > prompts/hello-world.md << 'EOF'
---
title: Hello World
description: Simple test prompt for Sage
---

You are a helpful assistant. Say hello to the user and ask one clarifying question about their goal.
EOF
```

Try it locally with:
```bash
sage prompts try hello-world
```

You can add more prompts over time; `sage prompts status` will show added and modified prompts in your workspace.

---

## 4. Publish Through a DAO

To make your library governed and discoverable, you’ll publish it through a DAO that controls a `LibraryRegistry`/`PromptRegistry` instance.

1. **Choose or create a DAO**
   - Use an existing DAO address (e.g. one created with `sage dao create-playbook`).
   - Or follow the “Creating and Configuring a DAO” guide first.

2. **Publish prompts to that DAO**
   From your workspace root:
   ```bash
   sage prompts publish --dao 0xYourDAOAddress
   ```

   The CLI will:
   - Build a manifest from your `prompts/` files.
   - Upload the manifest and content to IPFS.
   - Create a governance proposal or operator-mode execution, depending on the DAO’s playbook.

3. **Follow the governance lifecycle**
   After publishing, use the governance commands to drive the proposal through:
   ```bash
   sage proposals inbox  --dao 0xYourDAOAddress   # see pending/active proposals
   sage proposals vote   <id> for --dao 0xYourDAOAddress
   sage proposals status --dao 0xYourDAOAddress   # see next recommended action
   sage proposals execute <id> --dao 0xYourDAOAddress
   ```

Once the proposal executes, the DAO’s registry points to your new manifest CID, and that version becomes the “official” library for agents and users.

---

## 5. Using MCP With Your Library

After your DAO has approved a manifest, agents don’t need to know contract addresses or CIDs directly—they talk to the Sage MCP server instead.

1. **Run the MCP server**
   ```bash
   sage mcp start --port 3000
   ```
   or in stdio mode for tools like Claude Desktop:
   ```bash
   node packages/cli/src/mcp-server-stdio.js
   ```

2. **What agents can do via MCP**
   - **Discover**: Find your DAO and its libraries using on-chain metadata and subgraph indexing, instead of hardcoded addresses.
   - **Search**: Look up prompts in your approved manifest by keywords or tags, grounded in governed content rather than ad-hoc files.
   - **Fetch**: Retrieve the latest manifest and specific prompts for use inside agent workflows, always using the DAO-approved CID.
   - **Validate & Plan**: Check manifests and prompt structure, then generate publishing commands that humans can run to propose updates, instead of having agents call governance contracts directly.

In practice, this means you can:
- Use the CLI for authoring and governance (`sage prompts`, `sage project`, `sage proposals`, `sage dao`).
- Let agents use MCP to read from and suggest changes to your library, without bypassing timelocks, Safe approvals, or DAO voting.

With this flow in place, you have a complete path from local markdown prompts to governed, agent-ready libraries on Base Sepolia.
