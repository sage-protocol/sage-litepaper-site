# Bounties & Incentives

Bounties are how Sage Protocol incentivizes contributions. They create a permissionless marketplace for prompt improvements.

## Why Bounties?

Good prompts don't appear fully formed. They need iteration:
- Edge cases discovered through real use
- New use cases that weren't anticipated
- Better examples and constraints
- Integration with new tools

Bounties let anyone signal "this needs work" and put money behind it.

## How Bounties Work

```
┌─────────────────────────────────────────────────────────────┐
│  1. CREATE                                                   │
│  DAO or individual creates bounty with reward               │
│  Funds escrowed in SimpleBountySystem contract              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2. CLAIM                                                    │
│  Contributors claim bounty to signal they're working        │
│  (Optional - some bounties allow direct submission)         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3. SUBMIT                                                   │
│  Contributor submits deliverable (usually IPFS CID)         │
│  Multiple submissions allowed until approved                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  4. APPROVE                                                  │
│  DAO/operator approves submission                           │
│  Funds automatically transfer to winner                     │
└─────────────────────────────────────────────────────────────┘
```

## Creating Bounties

```bash
sage bounty create \
  --title "Improve SQL prompt edge case handling" \
  --description "Add handling for CTEs, window functions, and subqueries" \
  --reward 100 \
  --deadline 30 \
  --subdao 0x... \
  -y
```

**Parameters:**
- `--title` - Brief description of what's needed
- `--description` - Detailed requirements
- `--reward` - Amount in SXXX tokens
- `--deadline` - Days until bounty expires
- `--subdao` - DAO context for governance bounties

## Claiming and Submitting

```bash
# Browse open bounties
sage bounty list --subdao 0x...

# Claim a bounty (signals you're working on it)
sage bounty claim --bounty-id 42 -y

# Submit your work
sage bounty submit \
  --bounty-id 42 \
  --deliverable "ipfs://Qm..." \
  -y
```

## Approval Modes

Different DAOs use different approval methods:

### Operator Approval

Single operator or Safe multisig approves submissions directly.

```bash
sage bounty approve --bounty-id 42 --submission 0 --winner 0x... -y
```

**Best for:** Small teams, clear acceptance criteria.

### Board Approval

Council or board reviews and votes on submissions.

```bash
# Board members vote
sage bounty vote --bounty-id 42 --submission 0 --support for
```

**Best for:** Mid-size DAOs, subjective quality.

### Token Voting

Community votes on submissions through governance.

**Best for:** Large communities, controversial decisions.

### Auto-Approval

Submissions auto-approve if they meet predefined criteria (e.g., tests pass).

**Best for:** Technical bounties with objective acceptance criteria.

## Winner Selection Modes

```bash
# Set bounty selection mode
sage bounty set-mode \
  --subdao 0x... \
  --mode auto \
  --governance-config 0x... \
  --bounty-system 0x...
```

| Mode | How It Works |
|------|--------------|
| `auto` | First valid submission wins |
| `board` | Board/operator selects winner |
| `token` | Token holders vote |
| `competitive` | Multiple submissions, best wins |

## Bounty Types

### Prompt Improvement

Most common - improve an existing prompt:

```bash
sage bounty create \
  --title "Add error handling to code-review prompt" \
  --description "Current prompt fails on malformed input. Add graceful error handling and helpful messages." \
  --reward 50 \
  --subdao 0x...
```

### New Prompt

Create something that doesn't exist:

```bash
sage bounty create \
  --title "Create database migration prompt" \
  --description "Need a prompt for safe database migrations. Should handle rollbacks, zero-downtime, index management." \
  --reward 200 \
  --subdao 0x...
```

### Bug Fix

Fix a specific issue:

```bash
sage bounty create \
  --title "Fix SQL injection vulnerability in query prompt" \
  --description "The query-builder prompt doesn't properly escape user input. Reproduce: ..." \
  --reward 100 \
  --subdao 0x...
```

### Documentation

Improve docs or examples:

```bash
sage bounty create \
  --title "Add examples to trading-analysis prompt" \
  --description "Need 5+ real-world examples showing different market conditions" \
  --reward 30 \
  --subdao 0x...
```

## Funding Bounties

Bounties can be funded from:

### Direct Funding

Creator funds bounty at creation:

```bash
sage bounty create --reward 100 ...
# SXXX transferred from your wallet to escrow
```

### Treasury Funding

DAO treasury funds bounty via governance:

```bash
sage bounty fund \
  --subdao 0x... \
  --bounty-id 42 \
  --token 0xSXXX \
  --amount 1000000000000000000
```

### ETH Payouts

Some bounties pay in ETH instead of SXXX:

```bash
sage bounty payout-eth --bounty-id 42 --winner 0x... --amount 0.1
```

## Agent Bounties

Agents can participate in the bounty system:

```bash
# Agent discovers open bounties
sage bounty list --subdao 0x...

# Agent claims bounty
sage bounty claim --bounty-id 42 -y

# Agent generates improved prompt
# ... (agent work happens here) ...

# Agent submits result
sage bounty submit --bounty-id 42 --deliverable "ipfs://Qm..." -y
```

This creates a marketplace where agents compete to improve prompts.

## Soulbound Badges

When a bounty is approved, the winner can receive a **soulbound badge** - a non-transferable NFT proving their contribution:

```bash
# Mint badge to bounty winner
sage sbt mint \
  --to 0xWinner \
  --reason contributor \
  --uri "ipfs://Qm..."
```

Badges are used for:
- On-chain reputation
- Access gating (e.g., council membership)
- Social proof

## Boosts (Voting Incentives)

Boosts are like bounties for governance participation:

```bash
# Create boost for a proposal
sage boost create \
  --proposal-id 123 \
  --governor 0x... \
  --per-voter 5_000000 \
  --max-voters 100 \
  --kind direct
```

Voters who participate receive USDC rewards. This increases participation on important proposals.

## Related

- [Creating Bounties](../guides/creating-bounties.md) - Step-by-step guide
- [Agent Prompt Workflows](../guides/agent-prompt-workflows.md) - Agent participation
- [Governance Models](./governance-models.md) - How DAOs work
