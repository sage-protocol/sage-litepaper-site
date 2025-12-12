# Voting on Proposals

This guide covers how to participate in governance by voting on proposals. You'll learn to find active proposals, understand what they do, cast your vote, and execute successful proposals.

## Prerequisites

Before voting, ensure you have:

1. **Staked tokens** - SXXX staked in the DAO
2. **Delegated voting power** - Self-delegation enabled

Check your status:

```bash
sage governance doctor --subdao 0xYourDAO
```

---

## 1. Find Active Proposals

### View Proposal Inbox

```bash
sage proposals inbox --dao 0xYourDAO
```

This shows:
- Proposal IDs
- Current state (Pending, Active, Succeeded, Queued, Executed)
- Voting deadlines
- Current vote counts

### Check Recommended Actions

```bash
sage proposals status --dao 0xYourDAO
```

This tells you what to do next:
- "Vote on proposal #X" - Proposal is active, needs votes
- "Queue proposal #X" - Succeeded, ready for queue
- "Execute proposal #X" - Queued and delay passed

---

## 2. Understand What a Proposal Does

Before voting, understand the proposal's effects.

### Quick Preview

```bash
sage proposals preview <proposal-id> --dao 0xYourDAO
```

Shows:
- Proposal description
- Target contracts and functions
- Current voting status
- Time remaining
- Quorum progress

### Detailed Decode

For deeper analysis:

```bash
sage governance decode <proposal-id> --subdao 0xYourDAO
```

This decodes the calldata to show exactly what will happen if the proposal passes (e.g., library updates, parameter changes).

### Proposal Summary

```bash
sage governance summary <proposal-id> --subdao 0xYourDAO
```

Shows before/after effects of the proposal.

---

## 3. Cast Your Vote

```bash
sage proposals vote <proposal-id> <support> --dao 0xYourDAO
```

**Support options:**
- `for` - Vote in favor
- `against` - Vote against
- `abstain` - Abstain (counts toward quorum but not outcome)

**Examples:**

```bash
# Vote for proposal 42
sage proposals vote 42 for --dao 0xYourDAO

# Vote against
sage proposals vote 42 against --dao 0xYourDAO

# Abstain
sage proposals vote 42 abstain --dao 0xYourDAO
```

### Vote with Reason

Provide on-chain reasoning for your vote:

```bash
sage governance vote <proposal-id> for \
  --reason "This improves error handling in the SQL prompt" \
  --dao 0xYourDAO
```

### Non-Interactive Voting

For automation:

```bash
sage proposals vote 42 for --dao 0xYourDAO -y
```

---

## 4. After Voting Ends

### Queue Successful Proposals

Proposals that pass must be queued for the timelock delay:

```bash
sage governance queue <proposal-id> --subdao 0xYourDAO
```

### Execute After Delay

Once the timelock delay passes:

```bash
sage proposals execute <proposal-id> --dao 0xYourDAO
```

Or through governance command:

```bash
sage governance execute <proposal-id> --subdao 0xYourDAO
```

### Wait for Execution

Watch a proposal through its lifecycle:

```bash
sage governance watch <proposal-id> --subdao 0xYourDAO
```

This polls until the proposal reaches Executed state, automatically queueing and executing when possible.

---

## Proposal Lifecycle

```
1. CREATED
   └─▶ Proposal submitted to Governor

2. PENDING  (optional delay)
   └─▶ Voting hasn't started yet

3. ACTIVE
   └─▶ Voting period open → VOTE HERE

4. SUCCEEDED
   └─▶ Quorum reached, majority voted for → Queue it

5. QUEUED
   └─▶ Waiting for Timelock delay → Wait

6. EXECUTED
   └─▶ Proposal actions completed → Done!
```

### Check Proposal State

```bash
sage governance state <proposal-id> --subdao 0xYourDAO
```

---

## Understanding Voting Power

Your vote is weighted by your stake token balance at the proposal's **snapshot block** (when the proposal was created).

### Check Your Voting Power

```bash
sage governance voting-power 0xYourAddress --subdao 0xYourDAO
```

### With Multipliers

If the DAO uses NFT multipliers:

```bash
sage multiplier calculate --dao 0xYourDAO
```

---

## Governance Information

### View Quorum

```bash
sage governance quorum --subdao 0xYourDAO
```

### View Threshold

```bash
sage governance threshold --subdao 0xYourDAO
```

### Full Proposal Details

```bash
sage governance get <proposal-id> --subdao 0xYourDAO
```

---

## Quick Reference

```bash
# Discovery
sage proposals inbox --dao 0xDAO
sage proposals status --dao 0xDAO
sage proposals preview <id> --dao 0xDAO

# Voting
sage proposals vote <id> for --dao 0xDAO
sage proposals vote <id> against --dao 0xDAO
sage proposals vote <id> abstain --dao 0xDAO

# Execution
sage governance queue <id> --subdao 0xDAO
sage proposals execute <id> --dao 0xDAO

# Analysis
sage governance decode <id> --subdao 0xDAO
sage governance summary <id> --subdao 0xDAO
sage governance state <id> --subdao 0xDAO
```

---

## Related

- [Staking and Governance](./staking-and-governance.md) - Getting voting power
- [Governance Models](../concepts/governance-models.md) - How different DAOs work
- [Creating a DAO](./creating-a-subdao.md) - Setting up governance
