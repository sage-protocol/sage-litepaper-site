# CLI Command Reference

Complete reference for all Sage CLI commands, organized by category.

---

## Wallet & Setup Commands

### `sage wizard`
Interactive setup wizard to configure your Sage CLI environment.

```bash
sage wizard
```

**What it does:**
- Prompts for wallet configuration (private key, mnemonic, or Cast integration)
- Sets up RPC endpoints and network configuration
- Configures IPFS worker URLs and API keys
- Tests connectivity to all services

**Options:**
- `--network <name>` - Specify network (base-mainnet, base-sepolia)
- `--skip-tests` - Skip connectivity tests

---

### `sage wallet connect`
Connect a wallet for signing transactions.

```bash
sage wallet connect --type cast
sage wallet connect --type private-key
sage wallet connect --type mnemonic
```

**Options:**
- `--type <method>` - Wallet connection method (cast, private-key, mnemonic)
- `--path <derivation>` - HD derivation path (for mnemonic)
- `--index <number>` - Account index (for mnemonic)

---

### `sage doctor`
Verify your Sage CLI configuration and connectivity.

```bash
sage doctor
```

**What it checks:**
- Wallet configuration and connectivity
- RPC endpoint accessibility
- IPFS worker availability
- Contract deployment verification
- Subgraph sync status

---

## Library Management Commands

### When to Use Skills vs Library Commands

**Use `sage skills` commands** when:
- You have a workspace (`prompts/skills/`) and want the CLI to build + pin a manifest for you
- You're iterating on skills locally and want integrated publishing

**Use `sage library` commands** when:
- You already have a `manifest.json` or want to compose one manually
- You need fine-grained control over the manifest structure

**Both paths** end at the same place: a proposal or scheduled update against the LibraryRegistry.

---

### `sage library template`
Generate a template manifest.json for a new prompt library.

```bash
sage library template --type basic --out ./manifest.json
```

**Options:**
- `--type <type>` - Template type (basic, mcp, agent)
- `--out <path>` - Output file path (default: manifest.json)

---

### `sage library add-prompt`
Add a prompt to an existing manifest.

```bash
sage library add-prompt \
  --manifest ./manifest.json \
  --file ./prompts/hello.md \
  --key examples/hello \
  --name "Hello World" \
  --upload
```

**Options:**
- `--manifest <path>` - Manifest file to update
- `--file <path>` - Prompt markdown file
- `--key <string>` - Unique key for the prompt
- `--name <string>` - Human-readable prompt name
- `--upload` - Upload file to IPFS and add CID reference

---

### `sage library preview`
Preview a manifest file before publishing.

```bash
sage library preview ./manifest.json
```

**What it shows:**
- Prompt count and structure
- IPFS references
- Validation warnings
- Estimated upload size

---

### `sage library status`
Check the current status of a library in a SubDAO.

```bash
sage library status --subdao 0xYourSubDAO
```

**Returns:**
- Current library CID
- Pending proposals
- Role permissions (LIBRARY_ADMIN, PROPOSER, EXECUTOR)
- SubDAO governance configuration

---

### `sage library push`
Upload a library to IPFS and create governance proposal or execute directly.

```bash
# Team (Safe) - generates Safe transaction
sage library push ./manifest.json --subdao 0xTeamSubDAO --pin --wait --warm --exec

# Community (Tally) - creates governance proposal
sage library push ./manifest.json --subdao 0xCommunitySubDAO --pin --wait --warm
```

**Options:**
- `--subdao <address>` - SubDAO address (required)
- `--pin` - Pin the uploaded content on IPFS
- `--wait` - Wait for IPFS upload completion
- `--warm` - Warm IPFS caches for faster retrieval
- `--exec` - Execute directly (team/operator mode only)

**Returns:**
- Manifest CID
- Proposal ID (community mode)
- Safe transaction JSON path (team mode)
- Next steps instructions

---

## SubDAO Commands

### `sage subdao create-playbook`
Deploy a new SubDAO using a versioned playbook (Creator/Squad/Community).

```bash
# Dry-run to generate plan
sage subdao create-playbook \
  --playbook community-long \
  --name "Community UX Test" \
  --dry-run

# Apply the generated plan
sage subdao create-playbook --apply subdao-plan-*.json
```

**Playbook Options:**
- `creator` - Solo operator (direct control, no voting)
- `squad` - Small team (Safe multisig, 3-10 members)
- `community-long` - Token voting (long delays, high quorum)
- `community` - Token voting (standard parameters)

**Options:**
- `--playbook <type>` - Playbook type (required)
- `--name <string>` - SubDAO name
- `--dry-run` - Generate plan without executing
- `--apply <path>` - Apply a previously generated plan

**What it does:**
- Generates deployment plan (contracts, roles, parameters)
- Validates playbook configuration
- Executes deployment (if not dry-run)
- Returns SubDAO address and governance details

---

### `sage subdao create`
Deploy a new SubDAO with custom governance parameters (advanced).

```bash
sage subdao create \
  --name "DeFi Intelligence" \
  --symbol "DEFI" \
  --token-type fork \
  --initial-supply 1000000
```

**Options:**
- `--name <string>` - SubDAO name
- `--symbol <string>` - Governance token symbol
- `--token-type <type>` - Token type (fork, stable)
- `--initial-supply <number>` - Initial token supply
- `--voting-delay <blocks>` - Blocks before voting starts
- `--voting-period <blocks>` - Blocks for voting duration
- `--proposal-threshold <tokens>` - Tokens required to propose
- `--quorum <percentage>` - Quorum percentage required

**Note:** For most use cases, `subdao create-playbook` is recommended over this command.

---

### `sage subdao list`
List all SubDAOs from the registry.

```bash
sage subdao list
sage subdao list --filter active
```

**Options:**
- `--filter <status>` - Filter by status (all, active, inactive)
- `--creator <address>` - Filter by creator address
- `--format <type>` - Output format (json, table)

---

### `sage subdao info`
Get detailed information about a SubDAO.

```bash
sage subdao info 0xSubDAOAddress
```

**Returns:**
- SubDAO metadata
- Governance parameters
- Token information
- Treasury balance
- Active proposals count
- Library count

---

## Proposals & Governance Commands

### `sage proposals inbox`
List pending and active proposals for a SubDAO.

```bash
sage proposals inbox --subdao 0xCommunitySubDAO
```

**Returns:**
- Proposal IDs
- Proposal status (Pending, Active, Succeeded, Queued, Executed)
- Voting period deadlines
- Current vote counts

---

### `sage proposals preview`
Preview the details of a specific proposal.

```bash
sage proposals preview <id> --subdao 0xCommunitySubDAO
```

**What it shows:**
- Proposal description
- Calldata breakdown (which contracts/functions will be called)
- Current voting status
- Time remaining
- Required quorum

---

### `sage proposals vote`
Vote on an active proposal.

```bash
sage proposals vote <id> for --subdao 0xCommunitySubDAO
sage proposals vote <id> against --subdao 0xCommunitySubDAO
sage proposals vote <id> abstain --subdao 0xCommunitySubDAO
```

**Options:**
- `<id>` - Proposal ID (required)
- Vote type: `for`, `against`, or `abstain`
- `--subdao <address>` - SubDAO address (required)

**Requirements:**
- Must have voting power (delegated tokens)
- Proposal must be in Active state
- Can only vote once per proposal

---

### `sage proposals execute`
Execute a successful proposal after timelock delay.

```bash
sage proposals execute <id> --subdao 0xCommunitySubDAO
```

**Requirements:**
- Proposal must have succeeded (quorum + majority reached)
- Proposal must be queued in Timelock
- Timelock delay must have passed

**What it does:**
- Executes the proposal's on-chain actions
- Updates library registry (for library update proposals)
- Returns transaction hash

---

### `sage proposals status`
Check the status of proposals and show recommended next action.

```bash
sage proposals status --subdao 0xCommunitySubDAO
```

**Returns:**
- Latest proposals with current state
- Recommended next action:
  - "Vote on proposal #X" (if active)
  - "Queue proposal #X" (if succeeded)
  - "Execute proposal #X" (if queued and delay passed)

---

## IPFS Commands

### `sage ipfs credits`
Check your IPFS credit balance.

```bash
sage ipfs credits
```

**Returns:**
- Available credits (in bytes)
- Used credits
- Credit expiration dates
- Pinned content count

---

### `sage ipfs buy-credits`
Purchase IPFS storage credits.

```bash
sage ipfs buy-credits --amount 1000000000
```

**Options:**
- `--amount <bytes>` - Credit amount in bytes
- `--payment-token <address>` - ERC20 token for payment (default: ETH)

---

### `sage ipfs pin`
Pin content to IPFS.

```bash
sage ipfs pin <cid>
```

**Options:**
- `--name <string>` - Human-readable pin name
- `--metadata <json>` - Additional metadata

---

### `sage ipfs unpin`
Unpin content from IPFS.

```bash
sage ipfs unpin <cid>
```

---

### `sage ipfs fetch`
Fetch content from IPFS by CID.

```bash
sage ipfs fetch <cid>
sage ipfs fetch <cid> --output file.json
```

**Options:**
- `--output <path>` - Save to file instead of stdout
- `--timeout <seconds>` - Request timeout (default: 30)

---

## MCP Server Commands

### `sage mcp start`
Start the HTTP MCP server for AI agents.

```bash
sage mcp start
sage mcp start --port 3000
```

**Options:**
- `--port <number>` - Server port (default: 3000)
- `--host <address>` - Bind address (default: localhost)
- `--cors-origin <url>` - CORS origin for web clients

**What it provides:**
- `/mcp/search` - Search libraries by keywords
- `/mcp/fetch` - Fetch library by CID
- `/mcp/validate` - Validate manifest structure

---

### `sage mcp stdio`
Run MCP server in stdio mode for Claude Desktop.

```bash
node packages/cli/src/mcp-server-stdio.js
```

**Usage in Claude Desktop config:**
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

## Utility Commands

### `sage config show`
Display current configuration.

```bash
sage config show
```

---

### `sage config set`
Update configuration values.

```bash
sage config set rpc.url https://mainnet.base.org
sage config set ipfs.worker https://ipfs-worker.example.com
```

---

### `sage version`
Show CLI version information.

```bash
sage version
```

---

### `sage help`
Display help information.

```bash
sage help
sage help <command>
```

---

## Advanced Workflows

### Publishing a Complete Library

```bash
# 1. Initialize workspace
sage prompts init --subdao 0xYourSubDAO

# 2. Add prompts (multiple options)
# Write from scratch:
echo "# DeFi Analysis\n\nAnalyze this..." > prompts/defi-analyzer.md

# Or import existing skills:
sage prompts import-skill pdf
sage prompts init --preset cursor

# Or pull from registry to modify:
sage prompts pull

# 3. Check status
sage prompts status

# 4. Publish (builds manifest, uploads to IPFS, creates proposal)
sage prompts publish --pin

# Preview first with --dry-run
sage prompts publish --dry-run
```

### Setting Up a SubDAO

```bash
# Deploy SubDAO with governance parameters
sage subdao create \
  --name "Research DAO" \
  --symbol "RSRCH" \
  --token-type fork \
  --initial-supply 10000000
```

### Agent Integration via MCP

```bash
# 1. Start MCP server
sage mcp start --port 3000

# 2. In your agent code:
# - Query: POST http://localhost:3000/mcp/search
# - Fetch: POST http://localhost:3000/mcp/fetch
# - Validate: POST http://localhost:3000/mcp/validate
```

---

## Environment Variables

The Sage CLI respects the following environment variables:

- `SAGE_RPC_URL` - Blockchain RPC endpoint
- `SAGE_PRIVATE_KEY` - Wallet private key (not recommended for production)
- `SAGE_IPFS_WORKER_URL` - IPFS worker API endpoint
- `SAGE_IPFS_API_KEY` - IPFS worker authentication
- `SAGE_NETWORK` - Network name (base-mainnet, base-sepolia)
- `SAGE_SUBGRAPH_URL` - Custom subgraph endpoint

---

## Exit Codes

- `0` - Success
- `1` - General error
- `2` - Configuration error
- `3` - Network error
- `4` - Validation error
- `5` - Permission denied

---

## Getting Help

- **Documentation**: [https://docs.sageprotocol.io](https://docs.sageprotocol.io)
- **Discord**: [https://discord.gg/GWr73Z4qtT](https://discord.gg/GWr73Z4qtT)
- **Twitter**: [@VelinusSage](https://x.com/VelinusSage)
- **GitHub**: [https://github.com/sage-protocol](https://github.com/sage-protocol)
