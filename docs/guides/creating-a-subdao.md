# Creating and Configuring a DAO

<<<<<<< Updated upstream
This guide walks through creating and configuring your own DAO using governance playbooks.

## Choose a Playbook

Sage provides versioned playbooks that set sensible governance defaults:

| Playbook | Use Case | Governance | Members |
|----------|----------|------------|---------|
| **personal** | Solo publisher | Operator (direct control) | 1 |
| **council** | Small team | Safe multisig | 3-10 |
| **community** | Token holders | Governor + Timelock | 50+ |
| **community-long** | Large communities | Extended voting periods | 100+ |

---

## Create with Playbook (Recommended)

### 1. Preview the Plan

First, see what will be deployed:

```bash
sage dao create-playbook \
  --playbook community \
  --name "My Community DAO" \
  --dry-run
```

This generates a plan file (`dao-plan-*.json`) showing:
- Contracts to deploy
- Roles to grant
- Parameters to set
- External actions required (e.g., Safe transactions)

### 2. Review the Plan

Open the generated `dao-plan-*.json` and review:
- Governance parameters (voting period, quorum, threshold)
- Role assignments (PROPOSER, EXECUTOR, LIBRARY_ADMIN)
- Timelock delays

### 3. Apply the Plan

Execute the deployment:

```bash
sage dao create-playbook --apply dao-plan-*.json
```

The CLI:
1. Deploys all contracts
2. Grants necessary roles
3. Configures governance parameters
4. Returns your DAO address

### 4. Verify Configuration

Check that everything is set up correctly:

```bash
sage dao doctor --subdao 0xYourNewDAO
=======
This guide walks you through creating your own SubDAO (Sage DAO) step by step.

---

## Prerequisites

Before creating a DAO, ensure you have:

1. **CLI installed**: `npm i -g @sage-protocol/cli`
2. **Wallet connected**: Run `sage wizard` or `sage wallet connect`
3. **Testnet ETH**: Get Base Sepolia ETH from a [faucet](https://www.alchemy.com/faucets/base-sepolia)
4. **SXXX tokens**: Run `sage sxxx faucet` on testnet

Verify your setup:

```bash
sage wallet doctor
sage sxxx balance
>>>>>>> Stashed changes
```

---

<<<<<<< Updated upstream
## Playbook Details

### Personal Playbook

**Best for:** Solo operators who want direct control over their library.
=======
## Quick Start: Library Quickstart

The fastest way to create a DAO with prompts:

```bash
# Create prompts directory with your content
mkdir prompts
echo "# Code Review Prompt\n\nReview this code for bugs and improvements." > prompts/code-review.md

# One command creates DAO + uploads prompts + registers library
sage library quickstart --name "My Coding Library" --from-dir ./prompts
```

This creates a **personal** DAO (single-owner) with your prompts already published.

---

## Choose Your Governance Model

Sage offers five governance playbooks. Choose based on your needs:

| Playbook | Best For | Who Proposes | Who Executes |
|----------|----------|--------------|--------------|
| `personal` | Solo creators | You | You |
| `council-closed` | Teams (2-9 people) | Team members | Team members |
| `council-drafts` | Team + community input | Anyone (with tokens) | Team only |
| `community` | Full decentralization | Anyone (with tokens) | Anyone |
| `community-long` | High-stakes decisions | Anyone (with tokens) | Anyone |

---

## Creating a Personal DAO

For solo creators who want fast iteration:
>>>>>>> Stashed changes

```bash
sage dao create-playbook \
  --playbook personal \
<<<<<<< Updated upstream
  --name "Personal Skills Library"
```

**Features:**
- No voting required
- Instant updates via operator
- Direct control over library
- Timelock still provides safety delay

### Council Playbook

**Best for:** Small trusted teams (3-10 members) who coordinate via multisig.

```bash
sage dao create-playbook \
  --playbook council \
  --name "Team Skills"
```

**Features:**
- Safe multisig for proposals
- Fast execution (short timelock)
- Requires threshold approval
- Board-based decision making

### Community Playbook

**Best for:** Decentralized communities with token-weighted voting.
=======
  --name "My Personal Library" \
  --description "Prompts for code generation" \
  --yes
```

**What happens:**
1. SubDAO contract deployed
2. Governor + Timelock created (you're the sole voter)
3. Alias auto-saved (e.g., `my-personal-library`)
4. Context auto-set to new DAO

**Next steps:**
```bash
# Initialize prompts workspace
sage prompts init

# Add a prompt
sage prompts new --name "my-first-prompt"
# Edit prompts/my-first-prompt.md

# Publish to your DAO
sage prompts publish --yes
```

---

## Creating a Council DAO

For teams that want shared ownership via Safe multisig:

```bash
sage dao create-playbook \
  --playbook council-closed \
  --name "Team Library" \
  --owners "0xAlice,0xBob,0xCarol" \
  --threshold 2 \
  --yes
```

**Options:**
- `--owners` - Comma-separated list of Safe owner addresses
- `--threshold` - Number of signatures required (e.g., 2-of-3)

**What happens:**
1. Safe multisig deployed with your owners
2. SubDAO controlled by the Safe
3. Any owner can propose; threshold signatures approve

**Team workflow:**
```bash
# Any team member can publish
sage prompts publish --yes

# Proposal created - needs Safe signatures to execute
# Team approves via Safe UI or CLI
```

---

## Creating a Community DAO

For fully decentralized governance with token voting:
>>>>>>> Stashed changes

```bash
sage dao create-playbook \
  --playbook community \
<<<<<<< Updated upstream
  --name "Community Intelligence DAO"
```

**Features:**
- Token-weighted voting
- Standard voting periods (3-7 days)
- Quorum requirements (typically 4%)
- Proposal threshold for spam prevention

### Community-Long Playbook

**Best for:** Large communities wanting extended deliberation.

```bash
sage dao create-playbook \
  --playbook community-long \
  --name "Large Community DAO"
```

**Features:**
- Extended voting periods
- Higher quorum requirements
- Longer timelock delays
- Maximum decentralization

---

## Interactive Wizard

For guided creation:

```bash
sage dao wizard
```

This walks you through:
1. Choosing governance type
2. Setting parameters
3. Configuring roles
4. Deploying contracts

---

## Advanced: Direct Creation

For full control, use `sage dao create` directly:

```bash
sage dao create \
  --name "Custom DAO" \
  --description "A custom governance setup" \
  --type community \
  --voting-period "3 days" \
  --quorum-bps 200 \
  --proposal-threshold 10000
```

**Options:**
- `--type <kind>` - Governance type: `personal`, `council`, `community`
- `--voting-period <duration>` - E.g., "3 days", "36 hours", "720 minutes"
- `--quorum-bps <bps>` - Quorum in basis points (200 = 2%)
- `--proposal-threshold <amount>` - Tokens needed to propose
- `--manifest <pathOrCID>` - Initial library manifest

---

## Adding a DAO Profile

Set up a profile with avatar, description, and metadata.

### At Creation Time

```bash
# Create profile and upload to IPFS
sage dao profile upload 0xYourDAO \
  --name "My DAO" \
  --description "A community for prompt engineering"

# Create DAO with profile
sage dao create-playbook \
  --playbook council \
  --name "My DAO" \
  --profile-cid QmYourProfileCID
```

### After Creation

```bash
# Upload profile
sage dao profile upload 0xYourDAO \
  --name "My DAO" \
  --description "Updated description" \
  --avatar "ipfs://QmAvatarCID"

# Set profile via governance proposal
sage dao profile set 0xYourDAO --cid QmNewProfileCID
=======
  --name "Open Source Prompts" \
  --voting-period "3 days" \
  --quorum-votes 100 \
  --yes
```

**Options:**
- `--voting-period` - How long voting lasts (e.g., "3 days", "7 days")
- `--quorum-votes` - Minimum SXXX votes needed (e.g., 100 = 100 SXXX)
- `--proposal-threshold` - SXXX needed to create proposals

**Important:** Token governance requires delegation!

```bash
# REQUIRED: Delegate voting power to yourself
sage sxxx delegate-self

# Verify you can propose
sage governance preflight --subdao <your-dao>
```

**Community workflow:**
```bash
# Anyone with enough tokens can propose
sage prompts publish --yes

# Community votes during voting period
sage proposals inbox --subdao <your-dao>
sage governance vote <id> 1  # Vote FOR

# After voting + timelock, anyone executes
sage governance execute <id>
>>>>>>> Stashed changes
```

---

<<<<<<< Updated upstream
## Configuration After Creation

### Set Governance Mode

```bash
sage dao mode set community --subdao 0xYourDAO --exec
```

### Configure Membership

```bash
# Set membership policy
sage dao members policy admin --subdao 0xYourDAO --exec

# Add members (council mode)
sage dao members add 0xMember --subdao 0xYourDAO --exec

# Batch add members
sage dao members batch-add 0xA,0xB,0xC --subdao 0xYourDAO --exec
```

### Adjust Parameters

Governance parameters are updated via governance proposals targeting the Governor.

Common examples include `proposalThreshold`, `minVotesToVote`, quorum, and proposer cooldown.

---

## Diagnostics

### Check DAO Health

```bash
sage dao doctor --subdao 0xYourDAO
```

This verifies:
- Governor/Timelock roles
- LibraryRegistry wiring
- Prompt registry permissions
- Role assignments

### Check Roles

```bash
sage dao roles --subdao 0xYourDAO
```

Shows your role assignments (PROPOSER, EXECUTOR, ADMIN).

---

## Quick Reference

```bash
# Create with playbook
sage dao create-playbook --playbook <type> --name "Name" --dry-run
sage dao create-playbook --apply dao-plan-*.json

# Interactive
sage dao wizard

# Direct create
sage dao create --name "Name" --type community

# Configuration
sage dao doctor --subdao 0xDAO
sage dao mode show --subdao 0xDAO
sage dao roles --subdao 0xDAO

# Profile
sage dao profile upload 0xDAO --name "Name"
sage dao profile set 0xDAO --cid QmCID
=======
## DAO Creation Options

Full list of `create-playbook` options:

| Option | Description |
|--------|-------------|
| `--playbook <id>` | Governance playbook (required) |
| `--name <name>` | DAO name (required) |
| `--description <desc>` | DAO description |
| `--owners <addrs>` | Safe owners (council playbooks) |
| `--threshold <n>` | Safe signature threshold |
| `--voting-period <time>` | Voting duration (e.g., "3 days") |
| `--quorum-votes <amount>` | Quorum in SXXX tokens |
| `--proposal-threshold <amount>` | Tokens to propose |
| `--manifest <path>` | Initial manifest file |
| `--yes` | Skip confirmations |
| `--dry-run` | Preview without executing |

---

## After Creation

### Save and Use Your DAO

DAO creation auto-saves an alias and sets context:

```bash
# Verify context
sage context show

# Or manually set context
sage dao use my-personal-library

# Check DAO info
sage dao info my-personal-library
```

### Initialize Prompts Workspace

```bash
# Create workspace structure
sage prompts init

# Add prompts
sage prompts new --name "prompt-1"
sage prompts new --type skill --name "my-skill"
```

### Publish Your First Library Update

```bash
# Check what will be published
sage prompts status

# Publish (creates governance proposal)
sage prompts publish --yes

# For personal DAOs, watch and auto-execute
sage governance watch <proposal-id>
```

---

## Diagnostic Commands

Check your DAO's health:

```bash
# Full DAO diagnostics
sage dao doctor --subdao <your-dao>

# Governance configuration
sage governance diag --subdao <your-dao>

# Check if you can propose
sage governance preflight --subdao <your-dao>
```

---

## Forking an Existing DAO

Start from an existing library:

```bash
# Check the source DAO
sage library info --subdao 0xSourceDAO

# Fork it (creates new DAO with same library)
sage dao fork 0xSourceDAO --name "My Fork" --yes
```

Forking:
- Creates a new DAO you control
- Copies the library manifest
- You can then modify and evolve independently

---

## Common Issues

### "insufficient proposer votes"

For community DAOs, you need delegated tokens:

```bash
sage sxxx delegate-self
sage sxxx balance  # Verify you have enough
sage governance preflight --subdao <your-dao>
```

### "No active context"

Set your working DAO:

```bash
sage dao use <address-or-alias>
sage context show
```

### "Governor not resolved"

Add `--subdao` flag to commands:

```bash
sage governance info <id> --subdao 0xYourDAO
>>>>>>> Stashed changes
```

---

## Next Steps

<<<<<<< Updated upstream
After creating your DAO:

1. **Publish your first prompt**
   ```bash
   sage prompts publish --dest team --dao 0xYourDAO
   ```

2. **Invite members** (for council/community)
   ```bash
   sage dao members add 0xMember --subdao 0xYourDAO
   ```

3. **Monitor proposals**
   ```bash
   sage proposals inbox --dao 0xYourDAO
   ```

---

## Related

- [Governance Models](../concepts/governance-models.md) - Governance types explained
- [Delegation and Governance](./delegation-and-governance.md) - Participating in governance
- [Publishing and Versioning Prompts](./publishing-and-versioning-prompts.md) - Publishing to your DAO
=======
- [Publishing Prompts](./publishing-and-versioning-prompts.md) - Manage your library
- [Governance Modes](../core-concepts/governance-modes.md) - Understand playbooks in depth
- [Voting on Proposals](./voting-on-proposals.md) - Participate in governance
- [Creating Bounties](./creating-bounties.md) - Incentivize contributions
>>>>>>> Stashed changes
