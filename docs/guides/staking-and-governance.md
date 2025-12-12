# Staking and Governance

Staking SXXX tokens is the primary way to participate in governance on Sage Protocol. This guide covers staking, voting power, delegation, and NFT voting multipliers.

---

## Understanding Governance Steps

Sage governance is designed to scale from solo creators to large communities. The steps you take depend on what kind of DAO you're participating in.

### Personal DAOs (Solo Creators)
You control everything. No staking, delegation, or voting required—just propose and execute.

### Team DAOs (Small Groups)
A trusted group shares control via multisig. Members sign off on changes together, but there's no token voting.

### Community DAOs (Token Governance)
Open participation requires a few setup steps:

| Step | What It Does |
|------|--------------|
| **Stake** | Join the DAO by depositing tokens. This gives you a voice in that specific community. |
| **Delegate** | Activate your voting power. You can vote yourself or let someone you trust vote on your behalf. |
| **Approve** | Grant permission for contracts to move your tokens when you stake or deposit. A one-time safety step. |

These steps ensure you explicitly choose where to participate and who represents your interests. The CLI guides you through each one.

---

## Why Stake?

Staking serves multiple purposes:

- **Voting power** - Stake tokens to vote on proposals
- **Proposal creation** - Meet thresholds to create proposals
- **Access** - Some DAOs require staking for library access
- **Commitment signal** - Staked tokens show long-term alignment

---

## Staking in a DAO

When you stake SXXX tokens into a DAO, you receive the DAO's stake token in return. This stake token represents your voting power within that specific DAO.

### Check Your Balance First

```bash
# Check SXXX balance
sage sxxx balance

# Check DAO membership status
sage dao members status --dao 0xYourDAO
```

### Stake SXXX

```bash
sage dao stake 0xYourDAO 1000
```

Or with explicit flags:

```bash
sage dao stake --dao 0xYourDAO --amount 1000 -y
```

This:
1. Transfers SXXX from your wallet to the DAO
2. Mints equivalent stake tokens to your address
3. Enables your voting power in that DAO

### Unstake

To withdraw your stake:

```bash
sage dao unstake 0xYourDAO 500
```

Note: Some DAOs may have unstaking delays or lock periods.

---

## Delegation

In Sage governance, you must delegate your voting power before it becomes active. The simplest approach is self-delegation.

### Delegate to Yourself

For SXXX (global voting power):

```bash
sage sxxx delegate-self
```

For a specific DAO's stake token:

```bash
sage governance delegate-stake --subdao 0xYourDAO
```

### Check Delegation Status

```bash
# Check SXXX delegation
sage governance delegation-status

# Check your voting power at a DAO
sage governance voting-power 0xYourAddress --subdao 0xYourDAO
```

---

## Proposal Thresholds

To create proposals, you must **hold sufficient SXXX tokens** in your wallet. This is different from voting power.

### Threshold vs Voting Power

| What You Need | For | Checked Against |
|---------------|-----|-----------------|
| **SXXX balance** | Creating proposals | `proposalThreshold` |
| **Voting power** | Voting on proposals | Delegated stake + multipliers |

**Key distinction**: Proposal threshold checks your raw SXXX wallet balance, not your voting power. This means:

- Delegated votes don't help you propose (they help you vote)
- NFT multipliers don't help you propose (they boost voting)
- Staked tokens don't count toward threshold (they give voting power)

### Check Your Status

```bash
# See threshold and your balance
sage governance threshold-status --subdao 0xYourDAO

# Full readiness check
sage governance proposer-ready --subdao 0xYourDAO
```

### Meeting the Threshold

If you don't meet the threshold, you can:

1. **Hold more SXXX** - Keep sufficient SXXX in your wallet (don't stake it all)
2. **Ask someone else to propose** - If you've staked heavily, delegate proposal creation

Note: Delegation and multipliers boost your *voting* power but don't affect proposal eligibility. See [Proposal Threshold](../concepts/proposal-threshold.md) for details.

---

## NFT Voting Multipliers

Some DAOs use NFT-based voting multipliers to reward contributors with increased governance influence.

### How Multipliers Work

```
Base Votes (from stake)  ×  Multiplier NFT  =  Effective Votes

Example:
1,000 stake tokens × 2x Founder NFT = 2,000 effective votes
```

### Check if Your DAO Uses Multipliers

```bash
sage multiplier status --dao 0xYourDAO
```

### View Your Voting Power Breakdown

```bash
sage multiplier calculate --dao 0xYourDAO
```

This shows:
- Base votes (from staked tokens)
- Multiplier NFTs you hold
- Effective voting power

### Multiplier Tiers

DAOs typically have tiers with different multipliers:

| Tier | Typical Multiplier | How to Get |
|------|-------------------|------------|
| Founder | 2-3x | Early contributor airdrop |
| Contributor | 1.5-2x | Bounty completion, governance participation |
| Supporter | 1.25-1.5x | Public mint or auction |

### Viewing Tier Details

```bash
sage multiplier info --dao 0xYourDAO
```

### NFT Auctions

Some DAOs run continuous auctions for multiplier NFTs:

```bash
# Check current auction
sage multiplier auction status --dao 0xYourDAO

# Place a bid
sage multiplier auction bid 0.5 --dao 0xYourDAO

# Settle ended auction (anyone can call)
sage multiplier auction settle --dao 0xYourDAO
```

---

## Governance Diagnostics

Run a full diagnostic on your governance setup:

```bash
sage governance doctor --subdao 0xYourDAO
```

This checks:
- Governance mode (Council vs Community)
- Quorum requirements
- Your voting power
- Proposal deposit requirements
- Cooldown periods
- Role assignments

### Proposer Readiness

Before creating a proposal, verify you're ready:

```bash
sage governance proposer-ready --subdao 0xYourDAO
```

This validates:
- Sufficient voting power for threshold
- Cooldown period elapsed
- SXXX allowance for deposit (if required)
- Proper delegation setup

---

## Viewing Governance Configuration

### Quorum

```bash
sage governance quorum --subdao 0xYourDAO
```

Shows the percentage of total voting power required for proposals to pass.

### Stake Requirements

```bash
sage governance stake-config --subdao 0xYourDAO
```

Shows:
- Proposal stake requirement (SXXX deposit)
- Cooldown between proposals

---

## Governance Modes

Different DAOs use different governance models:

| Mode | Description | Typical Use |
|------|-------------|-------------|
| **Personal** | Single owner control | Solo creators |
| **Council** | Board/multisig approval | Small teams |
| **Community** | Token-weighted voting | Large communities |

Check a DAO's mode:

```bash
sage dao mode show --subdao 0xYourDAO
```

---

## Quick Reference

```bash
# Staking
sage dao stake 0xDAO 1000           # Stake 1000 SXXX
sage dao unstake 0xDAO 500          # Unstake 500 SXXX

# Delegation
sage sxxx delegate-self             # Self-delegate SXXX
sage governance delegate-stake --subdao 0xDAO

# Check status
sage dao members status --dao 0xDAO
sage governance voting-power 0xYou --subdao 0xDAO
sage governance threshold --subdao 0xDAO

# Multipliers
sage multiplier status --dao 0xDAO
sage multiplier calculate --dao 0xDAO

# Diagnostics
sage governance doctor --subdao 0xDAO
sage governance proposer-ready --subdao 0xDAO
```

---

## Related

- [Voting on Proposals](./voting-on-proposals.md) - How to vote
- [Voting Multipliers](../concepts/voting-multipliers.md) - Multiplier deep dive
- [Governance Models](../concepts/governance-models.md) - Governance types explained
