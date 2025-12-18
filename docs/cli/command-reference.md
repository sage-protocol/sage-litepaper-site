# CLI Command Reference

Complete reference for all Sage CLI commands, organized by category.

---

## Command Aliases

Common commands have short aliases for convenience:

| Full Command | Aliases |
|--------------|---------|
| `sage library` | `lib`, `l` |
| `sage governance` | `gov`, `g` |
| `sage subdao` | `sd`, `sub` |
| `sage treasury` | `treas`, `t` |
| `sage timelock` | `tl` |
| `sage sxxx` | `sx`, `token` |
| `sage wallet` | `w` |
| `sage config` | `cfg` |
| `sage context` | `ctx` |

---

## Library Commands

The `library` command is the recommended entry point for creating DAOs with prompts.

### `sage library quickstart`

Create a new library with prompts in one command: scan directory, upload to IPFS, create DAO, register manifest.

```bash
sage library quickstart --name "My Library" --from-dir ./prompts
sage library quickstart --name "My Library" --from-dir ./prompts --governance team
sage library quickstart --name "My Library" --from-dir ./prompts --governance community
```

**Options:**
<<<<<<< Updated upstream
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
  --initial-supply 1000000 \
  --profile-cid QmYourProfileCID
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
- `--profile-cid <cid>` - IPFS CID for DAO profile metadata (avatar, description, socials)

**Note:** For most use cases, `dao create-playbook` is recommended over this command.

---

### `sage dao list`
List DAOs from the registry.

```bash
sage dao list
=======
- `-n, --name <name>` - Library/DAO name (required)
- `-d, --description <desc>` - Library description
- `--from-dir <path>` - Directory to scan for prompts (default: `./prompts`)
- `--governance <type>` - Governance type: `personal`, `team`, or `community` (default: `personal`)
- `--alias <name>` - Override auto-generated alias
- `--dry-run` - Show what would happen without executing
- `--yes` - Skip confirmations
- `--json` - Output JSON

---

### `sage library info`

Show library info for a DAO.

```bash
sage library info --subdao 0xYourSubDAO
sage library info --subdao my-alias --verbose
```

**Options:**
- `--subdao <address>` - SubDAO address (default: from context)
- `--json` - Output JSON
- `-v, --verbose` - Show detailed output including manifest content

---

### `sage library fork`

Fork a library to a new DAO.

```bash
sage library fork 0xSourceDAO --name "My Fork"
```

---

## DAO Commands

Manage SubDAOs, governance settings, and context.

### `sage dao create-playbook`

Create a new DAO using a governance playbook.

```bash
# Personal (solo creator)
sage dao create-playbook --playbook personal --name "My Library" --yes

# Council (team with Safe multisig)
sage dao create-playbook --playbook council-closed --name "Team" \
  --owners "0xAlice,0xBob,0xCarol" --threshold 2 --yes

# Community (token voting)
sage dao create-playbook --playbook community --name "Community DAO" --yes
```

**Playbooks:**
- `personal` - Solo creator with EOA control (OPERATOR mode)
- `council-closed` - Team Safe multisig, no token voting (OPERATOR mode)
- `council-drafts` - Community proposes, council executes (TOKEN + COUNCIL_ONLY)
- `community` - Full token democracy (TOKEN + ANYONE)
- `community-long` - 7-day voting, lower quorum

**Options:**
- `--playbook <id>` - Playbook ID (required)
- `--name <name>` - DAO name (required)
- `--description <desc>` - DAO description
- `--owners <addresses>` - Safe owners for council (comma-separated)
- `--threshold <n>` - Safe threshold for council
- `--voting-period <duration>` - Voting period (e.g., "3 days")
- `--quorum-votes <amount>` - Quorum in SXXX tokens
- `--proposal-threshold <amount>` - Tokens required to propose
- `--manifest <pathOrCID>` - Initial manifest file or IPFS CID
- `--yes` - Skip confirmations
- `--dry-run` - Generate plan only

---

### `sage dao use`

Set the working DAO for your current profile.

```bash
sage dao use 0xSubDAOAddress
sage dao use my-alias
```

---

### `sage dao save`

Save a DAO address with an alias for quick selection.

```bash
sage dao save 0xSubDAOAddress --alias my-dao
```

---

### `sage dao list`

List saved DAOs and recent selections.

```bash
sage dao list
sage dao list --json
```

---

### `sage dao info`

Show DAO info (governor, timelock, governance mode).

```bash
sage dao info 0xSubDAOAddress
sage dao info my-alias --json
```

---

### `sage dao doctor`

Diagnose DAO wiring: governor/timelock roles, delays, registry connections.

```bash
sage dao doctor --subdao 0xSubDAO
```

---

### `sage dao fork`

Fork an existing SubDAO to create a new one.

```bash
sage dao fork 0xSourceDAO --name "My Fork" --yes
```

---

## Prompts Commands

Manage prompt workspaces and publishing.

### `sage prompts init`

Initialize a prompts workspace in the current directory.

```bash
sage prompts init
sage prompts init --import-from ./existing-prompts
```

---

### `sage prompts new`

Create a new prompt file.

```bash
sage prompts new --name "my-prompt"
sage prompts new --type skill --name "my-skill"
```

---

### `sage prompts publish`

Build manifest, upload to IPFS, and create governance proposal.

```bash
sage prompts publish --yes
sage prompts publish --yes --exec  # Auto-execute after timelock
```

**Options:**
- `--yes` - Skip confirmations
- `--exec` - Auto-execute proposal after timelock delay
- `--pin` - Pin content to IPFS

---

### `sage prompts pull`

Pull a prompt from the DAO's library.

```bash
sage prompts pull <key>
sage prompts pull <key> --from 0xDAO
>>>>>>> Stashed changes
```

---

<<<<<<< Updated upstream
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

### `sage dao profile get`
Get the profile metadata for a DAO.

```bash
sage dao profile get 0xDAOAddress
sage dao profile get 0xDAOAddress --json
```

**Returns:**
- Profile CID and gateway URL
- DAO name, description, avatar
- Social links

---

### `sage dao profile set`
Update DAO profile metadata (requires GOVERNANCE_ROLE).

```bash
sage dao profile set 0xDAOAddress --cid QmNewProfileCID
```

**Note:** This creates a governance proposal to update the profileCID on-chain.

---

### `sage dao profile upload`
Upload DAO profile JSON to IPFS.

```bash
sage dao profile upload 0xDAOAddress --file dao-profile.json
sage dao profile upload 0xDAOAddress --name "My DAO" --description "DAO description" --avatar ipfs://...
```

**Options:**
- `-f, --file <path>` - Path to profile JSON file
- `--name <name>` - DAO name
- `--description <desc>` - DAO description
- `--avatar <url>` - Avatar URL or IPFS CID
- `--website <url>` - Website URL
- `--twitter <handle>` - Twitter handle
- `--discord <url>` - Discord invite URL
- `--apply` - Also submit governance proposal to set the CID

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

## Profile Commands

The `sage profile` command group manages personal wallet profiles (off-chain, signature-verified).

### `sage profile get`
Get profile for a wallet address.

```bash
sage profile get [address]
sage profile get --json
```

**Options:**
- `[address]` - Wallet address (defaults to your connected wallet)
- `--json` - Output as JSON

---

### `sage profile set`
Set your wallet profile.

```bash
sage profile set --name "Alice" --bio "Web3 developer" --avatar ipfs://...
sage profile set --twitter aliceweb3 --github alice
```

**Options:**
- `--name <name>` - Display name (max 50 chars)
- `--bio <bio>` - Bio/description (max 160 chars)
- `--avatar <url>` - Avatar URL or IPFS CID
- `--twitter <handle>` - Twitter handle (without @)
- `--github <handle>` - GitHub username
- `--farcaster <handle>` - Farcaster handle
- `--website <url>` - Website URL
- `--clear` - Clear all profile fields

---

### `sage profile upload`
Upload a profile JSON file to IPFS.

```bash
sage profile upload --file profile.json
sage profile upload --name "My DAO" --bio "Description" --type dao
```

**Options:**
- `-f, --file <path>` - Path to profile JSON file
- `--name <name>` - Display name (used if no file provided)
- `--bio <bio>` - Bio/description
- `--avatar <url>` - Avatar URL or CID
- `--type <type>` - Profile type: `personal` or `dao` (default: personal)

**Returns:**
- IPFS CID for use with DAO creation or profile updates

---

### `sage profile interactive`
Interactive profile setup wizard.

```bash
sage profile interactive
sage profile wizard  # alias
```

Guides you through setting up your profile with prompts for name, bio, avatar, and social links.

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
=======
### `sage prompts sync`

Synchronize local workspace with on-chain state.

```bash
sage prompts sync
sage prompts sync --pull  # Pull all prompts
```

---

### `sage prompts status`

Check what would change (local vs on-chain).

```bash
sage prompts status
```

---

### `sage prompts diff`

Show detailed diff between local and on-chain.

```bash
sage prompts diff
```

---

## Governance Commands

Manage proposals, voting, and execution.

### `sage governance info`

Get detailed information about a proposal.

```bash
sage governance info <proposal-id> --subdao 0xSubDAO
```

---

### `sage governance vote`

Cast a vote on a proposal.

```bash
sage governance vote <proposal-id> 1  # 1=For, 0=Against, 2=Abstain
```

---

### `sage governance vote-with-reason`

Cast a vote with an on-chain reason.

```bash
sage governance vote-with-reason <proposal-id> 1 "Supporting this change"
```

---

### `sage governance queue`

Queue a passed proposal for execution.

```bash
sage governance queue <proposal-id> --subdao 0xSubDAO
```

---

### `sage governance execute`

Execute a queued proposal after timelock delay.

```bash
sage governance execute <proposal-id> --subdao 0xSubDAO
```

---

### `sage governance watch`

Watch a proposal until it succeeds, then auto-queue and execute.

```bash
sage governance watch <proposal-id>
```

---

### `sage governance preflight`

Check readiness to propose (voting power, delegation, thresholds).

```bash
sage governance preflight --subdao 0xSubDAO
```

---

### `sage governance diag`

One-shot governance diagnostics: mode, quorum, voting power, profile.

```bash
sage governance diag --subdao 0xSubDAO
```

---

### `sage governance propose-custom`

Create a custom governance proposal.

```bash
sage governance propose-custom \
  --description "Update configuration" \
  --target 0xContract \
  --calldata 0x...
```

---

## Proposals Commands

Navigate and manage proposals (alias: `gov`).

### `sage proposals inbox`

List active proposals for a DAO.

```bash
sage proposals inbox --subdao 0xSubDAO
>>>>>>> Stashed changes
```

---

<<<<<<< Updated upstream
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
=======
## Treasury Commands

Manage DAO treasury operations.

### `sage treasury info`

Display reserves, POL, and pending withdrawals.

```bash
sage treasury info
sage treasury info --subdao 0xSubDAO
>>>>>>> Stashed changes
```

---

<<<<<<< Updated upstream
### `sage personal unlist`
Unlist a premium prompt, preventing new purchases.

```bash
sage personal unlist --id <prompt-id>
=======
### `sage treasury balance`

Alias for `treasury info`.

```bash
sage treasury balance --subdao 0xSubDAO
```

---

### `sage treasury deposit`

Deposit assets into the treasury.

```bash
sage treasury deposit ETH 0.1 --subdao 0xSubDAO
sage treasury deposit USDC 100 --subdao 0xSubDAO
```

---

## Token Commands (SXXX)

Manage SXXX governance tokens.

### `sage sxxx balance`

Check your SXXX token balance.

```bash
sage sxxx balance
```

---

### `sage sxxx delegate-self`

Delegate voting power to yourself (required for token governance).

```bash
sage sxxx delegate-self
```

---

### `sage sxxx delegation`

Check delegation status and voting power.

```bash
sage sxxx delegation
```

---

### `sage sxxx faucet`

Get testnet SXXX tokens.

```bash
sage sxxx faucet
```

---

### `sage sxxx transfer`

Transfer SXXX tokens.

```bash
sage sxxx transfer 0xRecipient 100
```

---

## Bounty Commands

Manage bounties for contributions.

### `sage bounty create`

Create a new bounty.

```bash
sage bounty create \
  --title "Fix authentication bug" \
  --description "Users cannot log in with OAuth" \
  --reward 100 \
  --deadline 30 \
  --subdao 0xSubDAO \
  -y
```

---

### `sage bounty list`

List bounties for a DAO.

```bash
sage bounty list --subdao 0xSubDAO
```

---

### `sage bounty claim`

Claim a bounty to work on it.

```bash
sage bounty claim --id <bounty-id>
```

---

### `sage bounty submit`

Submit work for a claimed bounty.

```bash
sage bounty submit --id <bounty-id> --deliverable <cid>
```

---

### `sage bounty doctor`

Diagnose bounty system configuration.

```bash
sage bounty doctor --subdao 0xSubDAO
```

---

## Wallet Commands

Manage wallet connections and diagnostics.

### `sage wallet connect`

Connect a wallet for signing transactions.

```bash
sage wallet connect
```

---

### `sage wallet doctor`

Verify wallet configuration and connectivity.

```bash
sage wallet doctor
```

---

### `sage wallet balance`

Check wallet balances (ETH, SXXX).

```bash
sage wallet balance
>>>>>>> Stashed changes
```

---

## IPFS Commands

Interact with the Sage IPFS worker.

### `sage ipfs upload`

Upload a file to IPFS.

```bash
sage ipfs upload ./my-prompt.md
```

---

### `sage ipfs download`

Download content from IPFS.

```bash
sage ipfs download <cid>
sage ipfs download <cid> --output ./file.md
```

---

### `sage ipfs pin`

Pin content to IPFS.

```bash
sage ipfs pin <cid>
```

---

### `sage ipfs credits`

Check your IPFS worker credit balance.

```bash
sage ipfs credits
```

---

### `sage ipfs setup`

Configure IPFS gateway/worker.

```bash
<<<<<<< Updated upstream
sage ipfs fetch <cid>
sage ipfs fetch <cid> --output file.json
```

**Options:**
- `--output <path>` - Save to file instead of stdout
- `--timeout <seconds>` - Request timeout (default: 30)

---

## NFT Commands (Voting Multipliers)

The `sage nft` command group is the **admin/operator surface** for the VotingMultiplierNFT system. It manages contract configuration, tier definitions, minting, and roles for NFT‑based voting multipliers.

### `sage nft doctor`
Check NFT contract configuration and your permissions.

```bash
sage nft doctor
```

**Returns:**
- Contract status and address
- Your roles (ADMIN, MINTER)
- Total tiers configured

---

### `sage nft list-tiers`
List all NFT tiers for a specific DAO.

```bash
sage nft list-tiers --dao 0xYourDAO
```

**Returns:**
- Tier ID, name, multiplier
- Supply (minted/max)
- Price (ETH for public mint, or admin-only)

---

### `sage nft my-multiplier`
Check your voting multiplier for a DAO.

```bash
sage nft my-multiplier --dao 0xYourDAO
sage nft my-multiplier --dao 0xYourDAO --account 0xOtherAddress
```

**Returns:**
- Your current voting multiplier (e.g., 1.5x)
- Effective voting power calculation

---

### `sage nft tier create`
Create a new NFT tier (requires ADMIN role).

```bash
sage nft tier create \
  --dao 0xYourDAO \
  --name "Founding Member" \
  --multiplier 200 \
  --max-supply 100 \
  --price 0.1
```

**Options:**
- `--dao <address>` - DAO this tier belongs to
- `--name <name>` - Tier name
- `--multiplier <number>` - Voting multiplier (100=1x, 150=1.5x, 200=2x)
- `--max-supply <number>` - Maximum supply (0 = unlimited)
- `--price <eth>` - Price in ETH for public mint (0 = admin-only)

---

### `sage nft mint`
Mint an NFT to an address (requires MINTER role).

```bash
sage nft mint --tier 0 --to 0xRecipient --uri ipfs://...
```

---

### `sage nft public-mint`
Public mint an NFT (requires tier to have price > 0).

```bash
sage nft public-mint --tier 1 --uri ipfs://...
```

---

### `sage nft grant-role`
Grant MINTER role to an address (requires ADMIN).

```bash
sage nft grant-role --to 0xAddress --role MINTER
```

---

## Multiplier Commands (End‑User Voting Multipliers)

The `sage multiplier` command group is the **end‑user and DAO maintainer interface** for multiplier‑aware voting. It works on top of `MultipliedVotes` wrappers and the shared VotingMultiplierNFT contract.

### `sage multiplier status`
Check whether a DAO uses NFT voting multipliers and how its voting tokens are wired.

```bash
sage multiplier status --dao 0xYourDAO
```

**Returns:**
- Whether multipliers are enabled.  
- Governor voting token and base token addresses.  
- Associated VotingMultiplierNFT contract and basic tier summary.

---

### `sage multiplier calculate`
Show voting power breakdown for an account in a multiplier‑enabled DAO.

```bash
sage multiplier calculate 0xYourAddress --dao 0xYourDAO
```

**Returns:**
- Base votes from the underlying ERC20Votes token.  
- Effective multiplier for this DAO.  
- Effective voting power after applying multipliers.  
- Per‑NFT tier information where applicable.

---

### `sage multiplier describe`
Show detailed multiplier configuration, tiers, and (optionally) auction information.

```bash
sage multiplier describe --dao 0xYourDAO --nft 0xVotingMultiplierNFT
```

**Returns:**
- Global VotingMultiplierNFT configuration (max multiplier, total tiers).  
- Tiers scoped to the selected DAO (name, multiplier, supply, price, DAO).  
- Optional auction configuration if a SageAuctionHouse address is provided.

---

### `sage multiplier propose-tier`
Create a governance payload to add a new multiplier tier for a DAO via `createTierViaGovernance`.

```bash
sage multiplier propose-tier \
  --name "Founding Member" \
  --multiplier 150 \
  --max-supply 100 \
  --price 0.1 \
  --nft 0xVotingMultiplierNFT \
  --dao 0xYourDAO
```

This command encodes a call to:

```solidity
createTierViaGovernance(subdao, name, multiplier, maxSupply, price)
```

and prints the calldata and `sage gov propose` invocation so DAOs can add tiers permissionlessly via timelock‑executed governance.

---

### `sage multiplier auction ...` (Multiplier‑Focused Auction UX)

The `sage multiplier auction` subcommands provide a multiplier‑focused view over the global Sage Auction House:

- `sage multiplier auction status` – Show current multiplier NFT auction status and tier details.  
- `sage multiplier auction bid <amount>` – Place a bid on the current multiplier NFT.  
- `sage multiplier auction settle` – Settle the current auction and start the next one.

These commands share the same underlying `SageAuctionHouse` and VotingMultiplierNFT contracts documented in the Auction Commands section below, but present them in the context of voting multipliers for DAOs.

---

## Auction Commands

The `sage auction` command group interacts with the global `SageAuctionHouse` contract for NFT auctions.
Where voting multipliers are enabled, these auctions typically mint new multiplier NFTs from the shared VotingMultiplierNFT contract. For multiplier‑specific UX, see the `sage multiplier auction` commands above, which wrap the same auction house in a DAO‑centric view.

### `sage auction status`
View current auction status.

```bash
sage auction status
```

**Returns:**
- Current auction state (Active, Paused, Needs Settlement)
- Current NFT ID and bid amount
- Configuration (reserve price, duration, min increment)

---

### `sage auction bid`
Place a bid on the current auction.

```bash
sage auction bid 0.5
```

---

### `sage auction settle`
Settle the current auction and start a new one.

```bash
sage auction settle
```

---

## Boost Commands (Vote Incentives)

The `sage boost` command group manages USDC governance boosts to incentivize voting.

### `sage boost create`
Create a boost with USDC rewards for voters.

```bash
sage boost create \
  --proposal-id 123 \
  --governor 0xGovernor \
  --per-voter 5_000000 \
  --max-voters 100 \
  --kind direct
```

**Options:**
- `--proposal-id <id>` - Proposal ID to boost
- `--governor <address>` - Governor address
- `--per-voter <usdc>` - USDC per voter (6 decimals, e.g., 5_000000 = 5 USDC)
- `--max-voters <count>` - Maximum eligible voters
- `--kind <kind>` - Eligibility: `direct`, `merkle`, or `custom`
- `--policy <address>` - Eligibility policy contract (for merkle/custom)
- `--min-votes <amount>` - Minimum voting power required
- `--payout-mode <mode>` - `fixed` or `variable`
- `--support <support>` - `any` or `for` (only For voters eligible)
- `--start-at <unix>` - Start timestamp
- `--expires-at <unix>` - Expiry timestamp

---

### `sage boost status`
Show boost status for a proposal.

```bash
sage boost status --proposal-id 123
```

---

### `sage boost claim`
Claim a boost rebate with Merkle proof.

```bash
sage boost claim \
  --proposal-id 123 \
  --amount 5_000000 \
  --proof '[\"0x...\", \"0x...\"]'
```

---

### `sage boost set-root`
Set Merkle root for airdrop eligibility.

```bash
sage boost set-root --proposal-id 123 --root 0x... --policy 0xPolicyAddress
```

---

### `sage boost fund`
Fund a Merkle boost pool.

```bash
sage boost fund --proposal-id 123 --amount 1000_000000
```

---

### `sage boost finalize`
Finalize a boost and refund unclaimed to creator.

```bash
sage boost finalize --proposal-id 123
```

---

## Bounty Commands

The `sage bounty` command group manages the enhanced bounty system for incentivizing contributions.

### `sage bounty doctor`
Check bounty system configuration.

```bash
sage bounty doctor
```

---

### `sage bounty create`
Create a new bounty.

```bash
sage bounty create \
  --title "Fix bug in parser" \
  --description "The markdown parser fails on..." \
  --reward 100
```

**Options:**
- `--title <title>` - Bounty title
- `--description <desc>` - Detailed description
- `--reward <amount>` - Reward amount (in SXXX or specified token)
- `--token <address>` - Reward token (default: SXXX)
- `--deadline <unix>` - Submission deadline
- `--subdao <address>` - DAO context for governance bounties

---

### `sage bounty list`
List all bounties.

```bash
sage bounty list
sage bounty list --status open
```

---

### `sage bounty claim`
Claim a bounty to start working on it.

```bash
sage bounty claim --id <bounty-id>
```

---

### `sage bounty submit`
Submit work for a bounty.

```bash
sage bounty submit --id <bounty-id> --proof <cid-or-url>
```

---

### `sage bounty approve`
Approve a bounty submission (operator/board).

```bash
sage bounty approve --id <bounty-id> --submission <submission-id>
```

---

### `sage bounty wizard`
Interactive bounty creation wizard.

```bash
sage bounty wizard
```

---

### `sage bounty set-mode`
Configure bounty winner selection mode.

```bash
sage bounty set-mode \
  --subdao 0xDAO \
  --mode auto \
  --governance-config 0x... \
  --bounty-system 0x...
```

**Modes:**
- `auto` - Automatic approval based on fast-track limits
- `board` - Board/operator approval required
- `token` - Token holder voting

---

### `sage bounty fund`
Fund a bounty via governance proposal.

```bash
sage bounty fund \
  --subdao 0xDAO \
  --bounty-system 0x... \
  --bounty-id 123 \
  --token 0xSXXX \
  --amount 1000000000000000000
```

---

### `sage bounty payout-eth`
Payout bounty reward in ETH.

```bash
sage bounty payout-eth --bounty-id 123 --winner 0xWinner --amount 0.1
```

---

### `sage bounty payout-erc20`
Payout bounty reward in ERC20 token.

```bash
sage bounty payout-erc20 --bounty-id 123 --winner 0xWinner --token 0x... --amount 100
```

---

## SBT Commands (Soulbound Badges)

The `sage sbt` command group manages soulbound badges for reputation and achievements.

### `sage sbt doctor`
Check SBT contract configuration.

```bash
sage sbt doctor
```

---

### `sage sbt mint`
Mint a soulbound badge to an address.

```bash
sage sbt mint --to 0xRecipient --reason contributor --uri ipfs://...
```

---

### `sage sbt revoke`
Revoke a soulbound badge.

```bash
sage sbt revoke --token-id 123
```

---

### `sage sbt propose-mint`
Create governance proposal to mint a badge.

```bash
sage sbt propose-mint --to 0xRecipient --reason contributor --subdao 0xDAO
```

---

### `sage sbt list-reasons`
List valid badge reasons.

```bash
sage sbt list-reasons
```

---

## Council Commands

The `sage council` command group manages the approver council for fast-track governance.

### `sage council doctor`
Check council configuration.

```bash
sage council doctor
```

---

### `sage council set-config`
Configure council parameters.

```bash
sage council set-config --threshold 3 --members 5
```

---

### `sage council allow`
Add an address to the council allowlist.

```bash
sage council allow --address 0xMember
```

---

### `sage council show`
Show current council configuration.

```bash
sage council show
```

---

### `sage council exec`
Execute an action as council.

```bash
sage council exec --target 0x... --data 0x...
```

---

## Safe Commands (Multisig)

The `sage safe` command group manages Gnosis Safe multisig operations.

### `sage safe propose`
Create a Safe transaction proposal.

```bash
sage safe propose \
  --safe 0xSafeAddress \
  --to 0xTarget \
  --data 0x... \
  --value 0
```

---

### `sage safe status`
Check Safe transaction status.

```bash
sage safe status --safe 0xSafeAddress
```

---

### `sage safe doctor`
Check Safe configuration.

```bash
sage safe doctor --safe 0xSafeAddress
```

---

### `sage safe propose-bounty`
Create a bounty payout proposal via Safe.

```bash
sage safe propose-bounty \
  --safe 0xSafeAddress \
  --bounty-id 123 \
  --winner 0xWinner
```

---

## Timelock Commands

The `sage timelock` command group manages governance timelock operations.

### `sage timelock doctor`
Check timelock configuration and pending operations.

```bash
sage timelock doctor --subdao 0xDAO
```

---

### `sage timelock schedule`
Schedule an operation in the timelock.

```bash
sage timelock schedule \
  --subdao 0xDAO \
  --target 0xTarget \
  --data 0x... \
  --delay 86400
```

---

### `sage timelock execute`
Execute a ready timelock operation.

```bash
sage timelock execute \
  --subdao 0xDAO \
  --operation-id 0x...
```

---

### `sage timelock list`
List pending timelock operations.

```bash
sage timelock list --subdao 0xDAO
```

---

### `sage timelock cancel`
Cancel a pending timelock operation.

```bash
sage timelock cancel \
  --subdao 0xDAO \
  --operation-id 0x...
```

---

### `sage timelock fix-roles`
Fix missing timelock roles.

```bash
sage timelock fix-roles --subdao 0xDAO
```

---

### `sage timelock execute-batch`
Execute multiple timelock operations in batch.

```bash
sage timelock execute-batch \
  --subdao 0xDAO \
  --operations operations.json
```

---

## SXXX Token Commands

The `sage sxxx` command group manages SXXX governance token operations.

### `sage sxxx balance`
Check SXXX balance.

```bash
sage sxxx balance
sage sxxx balance --account 0xAddress
```

---

### `sage sxxx delegate`
Delegate voting power.

```bash
sage sxxx delegate --to 0xDelegate
sage sxxx delegate --self
```

---

### `sage sxxx approve`
Approve SXXX spending.

```bash
sage sxxx approve --spender 0xAddress --amount 1000
```

---

### `sage sxxx transfer`
Transfer SXXX tokens.

```bash
sage sxxx transfer --to 0xRecipient --amount 100
```

---

## Governance Status Commands

Use these commands to verify delegation and governance gates.

```bash
sage governance preflight --subdao 0xDAO
sage governance diag --subdao 0xDAO
```

**Covers:**
- Delegation status (ERC20Votes)
- Vote gate (`minVotesToVote`)
- Proposal gate (`proposalThreshold`)
- Execution mode hints (timelock vs council/operator)

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
=======
sage ipfs setup
sage ipfs setup --use-pinata
>>>>>>> Stashed changes
```

---

## Config Commands

Manage CLI configuration.

### `sage config show`

Display current configuration.

```bash
sage config show
```

---

### `sage config set`

Update configuration values.

```bash
sage config set rpc.url https://base-sepolia.publicnode.com
```

---

### `sage context show`

Show current working context (DAO, governor, timelock).

```bash
sage context show
```

---

## Utility Commands

### `sage wizard`

Interactive setup wizard.

```bash
sage wizard
```

---

### `sage doctor`

Run diagnostic checks on your setup.

```bash
<<<<<<< Updated upstream
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
=======
sage doctor
```

---

### `sage help workflow`

Interactive workflow guide.

```bash
sage help workflow
sage help workflow dao-launch
sage help workflow prompts
>>>>>>> Stashed changes
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RPC_URL` | Blockchain RPC endpoint |
| `PRIVATE_KEY` | Wallet private key (not recommended) |
| `WALLET_TYPE` | Wallet type: `privy`, `cast`, `local` |
| `IPFS_WORKER_URL` | IPFS worker API endpoint |
| `IPFS_API_KEY` | IPFS worker authentication |
| `SUBDAO` | Default SubDAO address |
| `SAGE_YES` | Auto-confirm prompts (`1` to enable) |
| `SAGE_FORCE` | Skip confirmations (`1` to enable) |
| `SAGE_NO_UPDATE_CHECK` | Disable update notifications |

---

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General error |
| `2` | Configuration error |
| `3` | Network error |
| `4` | Validation error |
| `5` | Permission denied |

---

## Getting Help

```bash
sage --help
sage <command> --help
sage help workflow
```

- **Documentation**: [https://docs.sageprotocol.io](https://docs.sageprotocol.io)
- **Twitter**: [@VelinusSage](https://x.com/VelinusSage)
- **GitHub**: [https://github.com/sage-protocol](https://github.com/sage-protocol)
