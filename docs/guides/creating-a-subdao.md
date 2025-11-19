# Creating and Configuring a SubDAO

This guide will walk you through creating and configuring your own SubDAO using playbooks.

## Choose a Playbook

Sage provides versioned playbooks that set sensible governance defaults:

| Playbook | Use Case | Governance | Members |
|----------|----------|------------|---------|
| **Creator** | Solo publisher | Operator (direct control) | 1 |
| **Squad** | Small team | Safe multisig | 3-10 |
| **Community** | Token holders | Governor + Timelock | 50+ |

## Create with Playbook (Recommended)

### 1. Generate a Plan

First, preview what will be deployed:

```bash
sage subdao create-playbook \
  --playbook community \
  --name "My Community DAO" \
  --dry-run
```

This generates a plan file (`subdao-plan-*.json`) showing:
- Contracts to deploy
- Roles to grant
- Parameters to set
- External actions required (e.g., Safe transactions)

### 2. Review the Plan

Open the generated `subdao-plan-*.json` file and review:
- Governance parameters (voting period, quorum, threshold)
- Role assignments (PROPOSER, EXECUTOR, LIBRARY_ADMIN)
- Timelock delays

### 3. Apply the Plan

Execute the deployment:

```bash
sage subdao create-playbook --apply subdao-plan-*.json
```

The CLI will:
1. Deploy all contracts
2. Grant necessary roles
3. Configure governance parameters
4. Return your SubDAO address

### 4. Verify Configuration

Check that everything is set up correctly:

```bash
sage library status --subdao 0xYourNewSubDAO
```

This shows:
- Current library CID
- Role permissions
- Governance configuration

---

## Playbook Details

### Creator Playbook

**Best for:** Solo operators who want direct control

```bash
sage subdao create-playbook \
  --playbook creator \
  --name "Personal Skills Library"
```

**Features:**
- No voting required
- Instant updates
- Direct control over library

### Squad Playbook

**Best for:** Small trusted teams (3-10 members)

```bash
sage subdao create-playbook \
  --playbook squad \
  --name "Team Skills"
```

**Features:**
- Safe multisig for proposals
- Fast execution (1-2 day timelock)
- Requires threshold approval

### Community Playbook

**Best for:** Decentralized communities (50+ members)

```bash
sage subdao create-playbook \
  --playbook community \
  --name "Community Intelligence DAO"
```

**Features:**
- Token-weighted voting
- Longer voting periods (3-7 days)
- Quorum requirements (typically 4%)
- Proposal threshold (e.g., 10,000 tokens to propose)

---

## Advanced: Custom Parameters

For full control, use `subdao create` directly:

```bash
sage subdao create \
  --name "Custom DAO" \
  --symbol "CUSTOM" \
  --token-type fork \
  --initial-supply 1000000 \
  --voting-delay 1 \
  --voting-period 5 \
  --proposal-threshold 10000 \
  --quorum 4
```

**Note:** Playbooks are recommended for most use cases to avoid configuration drift.

---

## Next Steps

After creating your SubDAO:

1. **Publish your first skill**
   ```bash
   sage skills publish my-skill --dest <subdao-address>
   ```

2. **Invite members** (for Squad/Community)
   - Share SubDAO address
   - Distribute governance tokens
   - Guide members through voting setup

3. **Monitor proposals**
   ```bash
   sage proposals inbox --subdao <subdao-address>
   ```
