# Proposal Threshold

Proposal threshold is Sage Protocol's anti-spam mechanism for governance. It ensures proposers have meaningful skin‑in‑the‑game (voting power) before creating proposals.

## How It Works

To create a proposal, you must have sufficient **effective votes** at the proposal snapshot (ERC20Votes; delegation required):

```
Your Effective Votes at Snapshot >= Proposal Threshold
```

Tokens stay in your wallet—no approve, no escrow, no claim. Just delegate voting power and propose.

### Example

```
DAO Proposal Threshold: 50 SXXX
Your Effective Votes: 150 SXXX
Status: Can propose
```

## Key Concepts

| Term | Definition |
|------|------------|
| **Proposal Threshold** | Minimum effective votes required to create a proposal |
| **Snapshot Requirement** | Proposers must meet the threshold at the proposal snapshot |
| **Cancel-if-Below** | Anyone can cancel if proposer's votes drop below the snapshotted threshold (Pending/Active) |
| **Cooldown** | Optional rate limit between proposals (per-proposer) |

## Voting Power vs Raw Balance

Proposal threshold checks your **effective votes** (ERC20Votes), not just your raw token balance.

| What Counts | What Doesn't |
|-------------|--------------|
| Delegated votes to you (including self-delegation) | Undelegated SXXX balance |
| DAO-scoped NFT multipliers (when enabled) | Tokens you delegated away |

This means:
- **Delegation matters** - you must delegate (often to self) to have any voting power
- **Multipliers matter (when enabled)** - your effective votes (and proposal eligibility) reflect NFT multipliers at the snapshot
- **Holding without delegation is 0 votes** - raw balance alone does not grant proposal rights

### Why Voting Power?

Votes-based threshold aligns proposing with the same “effective power” used for voting:
- Matches how token governance is actually measured (`getVotes(...)` at a snapshot)
- Avoids confusing “I hold tokens but can’t propose” cases (because delegation is explicit)
- Supports DAO-scoped voting multipliers when enabled

## Minimum Voting Power to Vote (`minVotesToVote`)

Proposal threshold is about **who can propose**. Separately, token-governed DAOs enforce a minimum effective voting power to **cast a vote**:

```
Your Effective Votes at Snapshot >= minVotesToVote
```

Key details:
- **Default**: 1 SXXX effective vote (low-friction, blocks 0-weight vote spam)
- **Effective votes** include NFT multipliers when enabled
- **Why it matters**: makes it more expensive to split voting power across many wallets for “per-voter” incentives

## Cancellation Rules

If your effective votes drop below the threshold while your proposal is active, **anyone can cancel it**.

### Cancel Window

| Proposal State | Can Be Canceled for Low Votes? |
|----------------|----------------------------------|
| Pending | Yes |
| Active (voting) | Yes |
| Succeeded | No (safe point) |
| Queued | No |
| Executed | No |
| Defeated | N/A (already ended) |
| Canceled | N/A (already ended) |

### The "Safe Point"

Once your proposal reaches **Succeeded** state (voting ended, passed), your votes no longer affect it. This is intentional:

- Prevents post-vote manipulation (bribing proposer to dump tokens)
- Provides certainty once community has voted
- Anti-spam protection only needed during proposal lifecycle, not execution

### Who Can Cancel

| Scenario | Who Can Cancel |
|----------|---------------|
| Proposer wants to cancel | Proposer (while Pending) |
| Proposer below threshold | Anyone (while Pending/Active) |

### Threshold Snapshot

The threshold is **snapshotted** when you create the proposal:

```
You propose at Threshold = 50 SXXX
DAO later raises Threshold to 100 SXXX
Your proposal still only requires 50 SXXX (original snapshot)
```

This prevents mid-flight threshold changes from invalidating existing proposals.

## Cooldown

Proposal threshold works alongside an optional **cooldown** period:

```
Check 1: Do you have enough effective votes? (proposalThreshold)
Check 2: Has enough time passed since your last proposal? (cooldown)
```

Both must pass to create a proposal.

### Why Cooldown?

Even with threshold requirements, a well-funded attacker could spam proposals. Cooldown adds rate limiting:

- Default: 5 minutes between proposals per address
- DAO configurable via governance
- Council-only DAOs may disable cooldown

## Governance Profile Interactions

Threshold requirements depend on your DAO's governance profile:

| Profile | Threshold Required? |
|---------|-------------------|
| COUNCIL_ONLY proposals | No (council members bypass) |
| OPERATOR governance | No |
| TOKEN + COMMUNITY_THRESHOLD | Yes |

### Council Bypass

In COUNCIL_ONLY DAOs, council members can propose without meeting the threshold. They're already trusted.

### Operator Mode

OPERATOR governance (personal/team DAOs) doesn't enforce threshold because the controller is already authorized.

## CLI Examples

### Check Your Readiness

```bash
# Full governance diagnostic
sage governance doctor --subdao 0xYourDAO

# Quick proposer readiness check
sage governance proposer-ready --subdao 0xYourDAO
```

### View Threshold

```bash
# See current threshold
sage governance threshold-status --subdao 0xYourDAO
```

Example output:
```
Proposal Threshold Status
-------------------------
Threshold:        50 SXXX
Your Effective Votes: 150 SXXX
Status:           Ready to propose
Cooldown:         None active
```

### Create a Proposal

```bash
sage governance propose \
  --subdao 0xYourDAO \
  --title "Update library settings" \
  --description "Adjust parameters for better UX"
```

The CLI will:
1. Check your effective votes vs threshold (delegation required)
2. Check cooldown status
3. Warn if you're close to threshold
4. Submit proposal if all checks pass

### Cancel a Proposal

```bash
# Cancel your own proposal (while Pending)
sage governance cancel <proposal-id> --subdao 0xYourDAO

# Cancel below-threshold proposal (anyone can call)
sage governance cancel <proposal-id> --subdao 0xYourDAO
```

## Configuration for DAO Owners

### Recommended Defaults

| Parameter | Default | Notes |
|-----------|---------|-------|
| `proposalThreshold` | 50 SXXX | Meaningful but accessible |
| `proposalCooldown` | 300 seconds (5 min) | Rate limiting |
| `minVotesToVote` | 1 SXXX | Minimum effective votes to cast a vote |
| `votingDelay` | 1 block | Allow immediate voting |
| `votingPeriod` | 50,400 blocks (~7 days) | Standard voting window |
| `quorum` | 4% | Standard OZ default |

### Tuning for Your Community

**Higher threshold (100-1000 SXXX):**
- Fewer proposals, higher quality
- Filters low-effort submissions
- May exclude smaller holders

**Lower threshold (10-50 SXXX):**
- More accessible governance
- Broader participation
- May need longer cooldown for spam control

**Longer cooldown (1 hour+):**
- Stronger rate limiting
- Good for DAOs expecting high activity
- Trade-off: slower iteration

### Changing Parameters

Threshold and cooldown are governance-controlled:

```bash
# Propose threshold change
sage governance propose \
  --subdao 0xYourDAO \
  --target <governor-address> \
  --function "setProposalThreshold(uint256)" \
  --args 100000000000000000000  # 100 SXXX in wei
```

## Relationship to Other Parameters

### Threshold vs Quorum

| Parameter | Purpose | When It Matters |
|-----------|---------|-----------------|
| **Threshold** | Who can propose | Proposal creation |
| **Quorum** | Minimum participation | Vote validity |

Threshold filters *proposers*. Quorum ensures *voter participation*.

### Threshold vs Voting Delay

Voting delay gives voters time to review proposals before voting starts. Threshold ensures proposers have enough voting power. They work together:

```
Propose → [Voting Delay] → Voting Starts → [Voting Period] → Result
   ↑                            ↑
Threshold check            Quorum check
```

## Migration from Escrow Model

If your DAO previously used the escrow/deposit model:

**Old flow (removed):**
1. Approve SXXX spend
2. Propose (tokens escrowed)
3. Claim refund after execution

**New flow:**
1. Propose (tokens stay in wallet)

No migration needed—just delegate voting power. The old `claimDeposit()` function is deprecated.

## Related

- [Governance Models](./governance-models.md) - Overview of governance types
- [Delegation & Voting Power](../guides/delegation-and-governance.md) - Getting voting power
- [Voting on Proposals](../guides/voting-on-proposals.md) - How to vote
