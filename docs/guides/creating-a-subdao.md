# Creating and Configuring a DAO

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
```

---

## Playbook Details

### Personal Playbook

**Best for:** Solo operators who want direct control over their library.

```bash
sage dao create-playbook \
  --playbook personal \
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

```bash
sage dao create-playbook \
  --playbook community \
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
- `--min-stake <amount>` - Minimum stake for membership
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
```

---

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

```bash
# Change stake requirements via governance
sage governance propose-params \
  --stake 100 \
  --cooldown 3600 \
  --subdao 0xYourDAO
```

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
```

---

## Next Steps

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
- [Staking and Governance](./staking-and-governance.md) - Participating in governance
- [Publishing and Versioning Prompts](./publishing-and-versioning-prompts.md) - Publishing to your DAO
