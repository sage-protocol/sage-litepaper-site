# Creating Bounties for Your Community

Bounties are how Sage Protocol incentivizes contributions. They create a permissionless marketplace for prompt improvements, letting anyone signal "this needs work" and put money behind it.

## Why Bounties?

Good prompts don't appear fully formed. They need iteration:

- Edge cases discovered through real use
- New use cases that weren't anticipated
- Better examples and constraints
- Integration with new tools

Bounties let DAOs fund improvements without requiring full-time contributors.

---

## Understanding Bounty Modes

Before creating a bounty, choose your mode:

| Mode | Description | Best For |
|------|-------------|----------|
| `open` | Anyone can claim and submit | General improvements, community participation |
| `direct` | Pre-assigned to a specific contributor | Known contributor, contracted work |
| `competitive` | Multiple submissions, voting selects winner | Complex tasks, quality competition |

---

## Creating a Bounty

### Basic Bounty

```bash
sage bounty create \
  --title "Improve SQL prompt edge case handling" \
  --description "Add handling for CTEs, window functions, and subqueries" \
  --reward 100 \
  --deadline 30 \
  --dao 0xYourDAO
```

**Required flags:**

- `--title` - Brief description of what's needed
- `--description` - Detailed requirements and acceptance criteria
- `--reward` - Amount in SXXX tokens (escrowed on creation)
- `--deadline` - Days until bounty expires
- `--dao` or `--subdao` - DAO context for governance

### With IPFS Specifications

For complex bounties, store detailed specs on IPFS:

```bash
# Upload specifications first
sage ipfs upload ./bounty-spec.md

# Create bounty referencing the spec
sage bounty create \
  --title "Build data validation prompt system" \
  --ipfs QmYourSpecCID \
  --reward 500 \
  --deadline 60 \
  --dao 0xYourDAO
```

### Direct Assignment

Assign a bounty to a known contributor:

```bash
sage bounty create \
  --title "Fix SQL injection vulnerability" \
  --description "The query-builder prompt doesn't properly escape user input" \
  --reward 100 \
  --mode direct \
  --assignee 0xContributorAddress \
  --dao 0xYourDAO
```

### Competitive Bounty

Allow multiple submissions with voting:

```bash
sage bounty create \
  --title "Create best-in-class code review prompt" \
  --description "We'll vote on the best submission" \
  --reward 200 \
  --mode competitive \
  --voting-duration 7 \
  --dao 0xYourDAO
```

---

## Bounty Lifecycle

```
1. CREATE
   └─▶ Funds escrowed in SimpleBountySystem contract

2. CLAIM (open/competitive modes)
   └─▶ Contributor signals they're working

3. SUBMIT
   └─▶ Contributor submits deliverable (usually IPFS CID)

4. APPROVE/VOTE
   └─▶ DAO approves or votes on submissions

5. PAYOUT
   └─▶ Winner receives reward automatically
```

---

## Claiming and Submitting

### Find Open Bounties

```bash
# List bounties for a DAO
sage bounty list --dao 0xYourDAO

# Filter by status
sage bounty list --status active --claimable --dao 0xYourDAO
```

### Claim a Bounty

Claiming signals you're working on it (prevents duplicate effort):

```bash
sage bounty claim --bounty-id 42 --dao 0xYourDAO -y
```

### Submit Your Work

```bash
sage bounty submit \
  --bounty-id 42 \
  --deliverable "ipfs://QmYourDeliverable" \
  --dao 0xYourDAO
```

Or use the `complete` command which combines status update and deliverable:

```bash
sage bounty complete \
  --bounty-id 42 \
  --deliverable "ipfs://QmYourDeliverable" \
  --dao 0xYourDAO
```

---

## Approval Process

Different DAOs use different approval methods. Check your DAO's configuration with:

```bash
sage bounty doctor --dao 0xYourDAO
```

### Board/Operator Approval

For small teams where an operator or Safe multisig approves directly:

```bash
# As operator/admin
sage bounty approve \
  --bounty-id 42 \
  --submission 0 \
  --winner 0xContributor \
  --dao 0xYourDAO
```

### Token Voting Approval

For DAOs using token governance:

```bash
# Create approval proposal
sage bounty propose-approve \
  --bounty-id 42 \
  --submission 0 \
  --winner 0xContributor \
  --dao 0xYourDAO
```

### Competitive Bounty Voting

After deadline passes:

```bash
# Start voting period
sage bounty start-voting --bounty-id 42 --dao 0xYourDAO

# Vote for a submission
sage bounty vote --bounty-id 42 --submission 0 --dao 0xYourDAO

# After voting ends, finalize
sage bounty finalize --bounty-id 42 --dao 0xYourDAO
```

---

## Setting Bounty Mode

Configure how your DAO handles bounty approvals:

```bash
sage bounty set-mode \
  --mode auto \
  --fast-track-limit 100000000000000000000 \
  --dao 0xYourDAO
```

| Mode | Description |
|------|-------------|
| `auto` | First valid submission wins (up to fast-track limit) |
| `board` | Board/operator selects winner |
| `token` | Token holders vote |

---

## Submission Gates

Control who can submit with gates:

```bash
# Require minimum SXXX balance
sage bounty set-gates \
  --bounty-id 42 \
  --min-balance 100 \
  --dao 0xYourDAO

# Require a specific badge
sage bounty set-gates \
  --bounty-id 42 \
  --badge-id 1 \
  --dao 0xYourDAO
```

### Whitelist Specific Addresses

```bash
# Add to whitelist
sage bounty add-whitelist \
  --bounty-id 42 \
  --addresses 0xAddr1,0xAddr2 \
  --dao 0xYourDAO

# Check if you can submit
sage bounty can-submit --bounty-id 42 --dao 0xYourDAO
```

---

## Library Integration

Bounties can automatically add accepted prompts to a library:

```bash
sage bounty create \
  --title "Create documentation prompt" \
  --reward 50 \
  --library-action add-to-library \
  --library-key prompts/docs \
  --dao 0xYourDAO
```

**Library actions:**

- `payment-only` - Just pay the contributor (default)
- `add-to-library` - Add deliverable to library
- `payment-and-add` - Both payment and library addition

---

## Payouts

### ETH Payouts

Some bounties pay in ETH from treasury:

```bash
sage bounty payout-eth \
  --bounty-id 42 \
  --to 0xWinner \
  --amount 0.1 \
  --dao 0xYourDAO
```

### ERC20 Payouts

Pay in SXXX or other tokens:

```bash
sage bounty payout-erc20 \
  --bounty-id 42 \
  --to 0xWinner \
  --amount 100 \
  --token 0xSXXXAddress \
  --dao 0xYourDAO
```

---

## Bounty Templates

Use templates for common bounty types:

```bash
# List available templates
sage bounty templates

# Scaffold a template
sage bounty templates --scaffold evals --out ./my-bounty.json

# Upload to IPFS for use
sage bounty templates --scaffold doc-fix --pin
```

Available templates: `evals`, `doc-fix`, `bug`, and more.

---

## Interactive Wizard

For guided bounty creation:

```bash
sage bounty wizard --dao 0xYourDAO
```

This walks you through:
1. Announce the bounty
2. Optionally select a winner
3. Optionally process payout

---

## Checking Bounty Info

```bash
# Detailed info for a specific bounty
sage bounty info --bounty-id 42 --dao 0xYourDAO

# Get submission details
sage bounty get-submission --bounty-id 42 --submission 0 --dao 0xYourDAO

# Check leading submission (competitive)
sage bounty leading --bounty-id 42 --dao 0xYourDAO
```

---

## Agent Participation

Agents can participate in the bounty system. See [Agent Prompt Workflows](./agent-prompt-workflows.md) for how agents discover, claim, and submit to bounties.

---

## Related

- [Bounties & Incentives](../concepts/bounties.md) - Conceptual overview
- [Agent Prompt Workflows](./agent-prompt-workflows.md) - Agent participation
- [Governance Models](../concepts/governance-models.md) - How DAOs approve bounties
