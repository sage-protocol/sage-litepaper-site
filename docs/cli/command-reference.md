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

**Use `sage prompts` commands** when:
- You have a workspace (`prompts/skills/`) and want the CLI to build + pin a manifest for you
- You're iterating on skills locally and want integrated publishing

**Use `sage project` commands** when:
- You already have a `manifest.json` or want to compose one manually
- You need fine-grained control over the manifest structure

**Both paths** end at the same place: a proposal or scheduled update against the LibraryRegistry.

---

### `sage project template`
Generate a template manifest.json for a new prompt library.

```bash
sage project template --type basic --out ./manifest.json
```

**Options:**
- `--type <type>` - Template type (basic, mcp, agent)
- `--out <path>` - Output file path (default: manifest.json)

---

### `sage project add-prompt`
Add a prompt to an existing manifest.

```bash
sage project add-prompt \
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

### `sage project preview`
Preview a manifest file before publishing.

```bash
sage project preview ./manifest.json
```

**What it shows:**
- Prompt count and structure
- IPFS references
- Validation warnings
- Estimated upload size

---

### `sage project status`
Check the current status of a library in a DAO.

```bash
sage project status --dao 0xYourDAO
```

**Returns:**
- Current library CID
- Pending proposals
- Role permissions (LIBRARY_ADMIN, PROPOSER, EXECUTOR)
- DAO governance configuration

---

### `sage project push`
Upload a library to IPFS and create governance proposal or execute directly.

```bash
# Team (Safe) - generates Safe transaction
sage project push ./manifest.json --dao 0xTeamDAO --pin --wait --warm --exec

# Community (Governor) - creates governance proposal
sage project push ./manifest.json --dao 0xCommunityDAO --pin --wait --warm
```

**Options:**
- `--dao <address>` - DAO address (preferred; `--subdao` is a legacy alias)
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

---

## Skills Management Commands

The `sage prompts` command group is the recommended workflow for managing AI skills and prompts locally before publishing.

### `sage prompts init`
Initialize a new skills workspace.

```bash
sage prompts init
```

### `sage prompts list`
List skills in the current workspace.

```bash
sage prompts list
```

### `sage prompts variant`
Create a variant of an existing skill.

```bash
sage prompts variant <key> [suffix]
```

### `sage prompts agents-sync`
Sync local skills to `AGENTS.md` for Claude/OpenSkills compatibility.

```bash
sage prompts agents-sync
```

### `sage prompts import`
Import skills from external sources.

```bash
sage prompts import ./path/to/skill
sage prompts import owner/repo
```

### `sage prompts export`
Export a skill to a specific target format.

```bash
sage prompts export <key> --as cursor --write
```

### `sage prompts publish`
Publish skills to the on-chain library with governance checks.

```bash
sage prompts publish [key] --dao 0xYourDAO
```

### `sage prompts doctor`
Validate skill frontmatter and DAO governance readiness.

```bash
sage prompts doctor [key] --dao 0xYourDAO
```

---

## DAO Commands

### `sage dao create-playbook`
Deploy a new DAO using a versioned playbook (Creator/Squad/Community).

```bash
# Dry-run to generate plan
sage dao create-playbook \
  --playbook community-long \
  --name "Community UX Test" \
  --dry-run

# Apply the generated plan
sage dao create-playbook --apply dao-plan-*.json
```

**Playbook Options:**
- `creator` - Solo operator (direct control, no voting)
- `squad` - Small team (Safe multisig, 3-10 members)
- `community-long` - Token voting (long delays, high quorum)
- `community` - Token voting (standard parameters)

**Options:**
- `--playbook <type>` - Playbook type (required)
- `--name <string>` - DAO name
- `--dry-run` - Generate plan without executing
- `--apply <path>` - Apply a previously generated plan

**What it does:**
- Generates deployment plan (contracts, roles, parameters)
- Validates playbook configuration
- Executes deployment (if not dry-run)
- Returns DAO address and governance details

---

### `sage dao create`
Deploy a new DAO with custom governance parameters (advanced).

```bash
sage dao create \
  --name "DeFi Intelligence" \
  --symbol "DEFI" \
  --token-type fork \
  --initial-supply 1000000
```

**Options:**
- `--name <string>` - DAO name
- `--symbol <string>` - Governance token symbol
- `--token-type <type>` - Token type (fork, stable)
- `--initial-supply <number>` - Initial token supply
- `--voting-delay <blocks>` - Blocks before voting starts
- `--voting-period <blocks>` - Blocks for voting duration
- `--proposal-threshold <tokens>` - Tokens required to propose
- `--quorum <percentage>` - Quorum percentage required

**Note:** For most use cases, `dao create-playbook` is recommended over this command.

---

### `sage dao list`
List DAOs from the registry.

```bash
sage dao list
```

**Options:**
- `--filter <status>` - Filter by status (all, active, inactive)
- `--creator <address>` - Filter by creator address
- `--format <type>` - Output format (json, table)

---

### `sage dao info`
Get detailed information about a DAO.

```bash
sage dao info 0xDAOAddress
```

**Returns:**
- DAO metadata
- Governance parameters
- Token information
- Treasury balance
- Active proposals count
- Library count

---

## Proposals & Governance Commands

### `sage proposals inbox`
List pending and active proposals for a DAO.

```bash
sage proposals inbox --dao 0xCommunityDAO
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
sage proposals preview <id> --dao 0xCommunityDAO
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
sage proposals vote <id> for --dao 0xCommunityDAO
sage proposals vote <id> against --dao 0xCommunityDAO
sage proposals vote <id> abstain --dao 0xCommunityDAO
```

**Options:**
- `<id>` - Proposal ID (required)
- Vote type: `for`, `against`, or `abstain`
- `--dao <address>` - DAO address (preferred; `--subdao` is a legacy alias)

**Requirements:**
- Must have voting power (delegated tokens)
- Proposal must be in Active state
- Can only vote once per proposal

---

### `sage proposals execute`
Execute a successful proposal after timelock delay.

```bash
sage proposals execute <id> --dao 0xCommunityDAO
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
sage proposals status --dao 0xCommunityDAO
```

**Returns:**
- Latest proposals with current state
- Recommended next action:
  - "Vote on proposal #X" (if active)
  - "Queue proposal #X" (if succeeded)
  - "Execute proposal #X" (if queued and delay passed)

---

## Personal Premium Commands

The `sage personal` command group allows creators to monetize their prompts directly using the Personal Premium model.

### `sage personal sell`
Publish a premium prompt with an encrypted component.

```bash
sage personal sell --file ./prompts/exclusive.md --price 5.0
```

**Options:**
- `--file <path>` - Path to the prompt file (required)
- `--price <amount>` - Price in USDC (required)
- `--name <string>` - Name of the prompt (optional, defaults to filename)
- `--description <string>` - Description (optional)
- `--preview <path>` - Path to a preview file (optional)
- `--subdao <address>` - SubDAO to endorse this prompt (optional)

---

### `sage personal buy`
Purchase access to a premium prompt.

```bash
sage personal buy --id <prompt-id>
```

**Options:**
- `--id <number>` - The ID of the premium prompt (required)
- `--amount <number>` - Amount of USDC to pay (optional, defaults to current price)

---

### `sage personal access`
Decrypt and view a purchased premium prompt.

```bash
sage personal access --id <prompt-id>
```

**Options:**
- `--id <number>` - The ID of the premium prompt (required)
- `--out <path>` - Output file path (optional, prints to stdout otherwise)

---

### `sage personal my-licenses`
List all premium licenses you own.

```bash
sage personal my-licenses
```

---

### `sage personal list`
List premium prompts available for sale.

```bash
sage personal list
```

**Options:**
- `--creator <address>` - Filter by creator address
- `--subdao <address>` - Filter by endorsing SubDAO

---

### `sage personal price`
Update the price of your premium prompt.

```bash
sage personal price --id <prompt-id> --new-price 10.0
```

---

### `sage personal unlist`
Unlist a premium prompt, preventing new purchases.

```bash
sage personal unlist --id <prompt-id>
```

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

**Available Tools:**

*Quick Workflow:*
- `quick_create_prompt` / `quick_iterate_prompt` / `quick_test_prompt`: Create, iterate, and test prompts
- `improve_prompt` / `rename_prompt` / `help`: Prompt improvement and help

*Discovery & Search:*
- `search_prompts`: Unified search across local and on-chain sources
- `search_onchain_prompts`: Search from `LibraryRegistry` and per-DAO registries
- `trending_prompts` / `list_prompts` / `get_prompt`: Browse and retrieve prompts
- `list_libraries` / `list_subdaos` / `get_library_manifests`: DAO and library discovery

*Publishing & Governance:*
- `suggest_subdaos_for_library`: Recommend DAOs for publishing
- `generate_publishing_commands`: Generate CLI commands to publish
- `publish_manifest_flow`: Validate → Push → Build governance payload (no signing)
- `list_proposals`: List active proposals

*Templates & Bulk Operations:*
- `list_templates` / `get_template` / `create_from_template`: Template workflows
- `bulk_update_prompts` / `analyze_dependencies` / `update_library_metadata`: Library management

For the complete tool list, see the MCP configuration guide.

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
sage prompts init

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
sage prompts publish --dao 0xYourDAO --pin

# Preview first with --dry-run
sage prompts publish --dry-run
```

### Setting Up a DAO

```bash
# Deploy DAO with governance parameters
sage dao create \
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
