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

### `sage library scaffold-manifest`
Generate a template manifest.json for a new prompt library.

```bash
sage library scaffold-manifest
sage library scaffold-manifest --output my-library-manifest.json
```

**Options:**
- `--output <path>` - Output file path (default: manifest.json)
- `--template <type>` - Template type (default, mcp, agent)

---

### `sage library lint`
Validate a manifest file against the Sage schema.

```bash
sage library lint manifest.json
```

**What it validates:**
- JSON schema compliance
- Required fields presence
- Prompt path references
- Metadata format
- Version string format

---

### `sage library push`
Upload a library to IPFS and optionally pin it.

```bash
sage library push manifest.json
sage library push manifest.json --pin
sage library push manifest.json --pin --subdao 0xYourSubDAO
```

**Options:**
- `--pin` - Pin the uploaded content on IPFS
- `--subdao <address>` - Associate with a SubDAO
- `--dry-run` - Simulate upload without executing

**Returns:**
- Manifest CID (bafybei...)
- Content CID references
- Upload receipt

---

### `sage library propose`
Create a governance proposal for a library update.

```bash
sage library propose manifest.json --subdao 0xYourSubDAO
```

**Options:**
- `--subdao <address>` - SubDAO address (required)
- `--description <text>` - Proposal description
- `--execution-delay <seconds>` - Delay before execution (after queue)

**What it does:**
- Validates manifest and SubDAO permissions
- Creates on-chain proposal via Governor contract
- Returns proposal ID for tracking

---

### `sage library info`
Fetch information about a library from the registry.

```bash
sage library info <cid>
sage library info <cid> --subdao 0xSubDAO
```

**Options:**
- `--subdao <address>` - Filter by SubDAO
- `--format <type>` - Output format (json, table, yaml)

---

## SubDAO Commands

### `sage subdao create`
Deploy a new SubDAO with governance contracts.

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

## Doppler (Auction) Commands

### `sage doppler create`
Create a Doppler auction for token distribution.

```bash
sage doppler create \
  --variant dynamic \
  --prepare-only \
  --output safe-payload.json
```

**Options:**
- `--variant <type>` - Auction variant (dynamic, stable, linear)
- `--prepare-only` - Generate Safe multisig payload without executing
- `--output <path>` - Save transaction payload to file
- `--start-time <timestamp>` - Auction start time
- `--duration <seconds>` - Auction duration
- `--min-price <amount>` - Minimum price per token
- `--max-supply <amount>` - Maximum tokens to sell

**What it does:**
- Validates treasury permissions
- Generates TreasuryWrapper + LaunchGate transaction
- Optionally creates Safe multisig payload for approval

---

### `sage doppler list`
List all Doppler auctions.

```bash
sage doppler list
sage doppler list --subdao 0xSubDAO --status active
```

**Options:**
- `--subdao <address>` - Filter by SubDAO
- `--status <state>` - Filter by status (active, ended, upcoming)
- `--format <type>` - Output format (json, table)

---

### `sage doppler info`
Get detailed information about a specific auction.

```bash
sage doppler info <auction-id>
```

**Returns:**
- Auction parameters
- Current price
- Tokens sold
- Participants count
- Time remaining

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
# 1. Create manifest template
sage library scaffold-manifest --output my-lib.json

# 2. Edit manifest (add prompts, metadata)
# ... edit my-lib.json ...

# 3. Validate manifest
sage library lint my-lib.json

# 4. Upload and pin to IPFS
sage library push my-lib.json --pin --subdao 0xYourSubDAO

# 5. Create governance proposal
sage library propose my-lib.json --subdao 0xYourSubDAO \
  --description "Add DeFi analysis prompts v1.0"
```

### Setting Up a SubDAO + Auction

```bash
# 1. Deploy SubDAO
sage subdao create \
  --name "Research DAO" \
  --symbol "RSRCH" \
  --token-type fork \
  --initial-supply 10000000

# 2. Create Doppler auction (prepare Safe payload)
sage doppler create \
  --variant dynamic \
  --prepare-only \
  --output auction-payload.json \
  --subdao <newly-created-subdao-address>

# 3. Execute via Safe multisig
# (Use Safe UI to execute the payload)
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
