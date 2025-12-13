# Delegation and Governance

Sage token-governed DAOs use **ERC20Votes delegation**: you hold `SXXX`, delegate voting power, then vote on proposals. There is **no stake-to-vote** flow.

---

## Governance Shapes

Your participation steps depend on the DAO’s governance profile:

- **Operator / Council DAOs**: no token voting; a council Safe or operator EOA proposes/executes.
- **Token-governed DAOs**: token holders propose and vote; execution is either council-only or permissionless after timelock.

Run profile detection:

```bash
sage governance diag --subdao 0xYourDAO
```

---

## Delegation (Required)

With ERC20Votes, tokens have **0 voting power until delegated**.

Self-delegate:

```bash
sage sxxx delegate-self
```

Check delegation:

```bash
sage sxxx delegation
```

---

## Voting Requirements (`minVotesToVote`)

Token-governed DAOs enforce a low-friction vote gate:

- **You can vote iff** your effective votes at the proposal snapshot are **≥ `minVotesToVote`** (default: **1 SXXX**).
- This prevents 0-weight vote spam and makes per-voter incentive farming via wallet-splitting more costly.

Check readiness:

```bash
sage governance preflight --subdao 0xYourDAO --action vote
```

---

## Proposing Requirements (`proposalThreshold`)

Proposing is gated separately from voting:

- **You can propose iff** your effective votes at the proposal snapshot are **≥ `proposalThreshold`** (typically much higher than 1 SXXX).

Check readiness:

```bash
sage governance preflight --subdao 0xYourDAO --action propose
sage governance threshold-status --subdao 0xYourDAO
```

---

## NFT Voting Multipliers (Optional)

Some DAOs use NFT-based voting multipliers to reward contributors with increased governance influence.

```
Base Votes (from SXXX delegation) × Multiplier NFT = Effective Votes
```

Check multiplier status:

```bash
sage multiplier status --dao 0xYourDAO
```

---

## Quick Reference

```bash
# Diagnose profile + gates
sage governance diag --subdao 0xDAO
sage governance preflight --subdao 0xDAO

# Activate voting power
sage sxxx delegate-self

# Vote
sage proposals inbox --dao 0xDAO
sage proposals vote <id> for --dao 0xDAO

# Queue/execute (if applicable)
sage proposals queue <id> --dao 0xDAO
sage proposals execute <id> --dao 0xDAO
```

---

## Related

- [Voting on Proposals](./voting-on-proposals.md) - How to vote
- [Voting Multipliers](../concepts/voting-multipliers.md) - Multiplier deep dive
- [Governance Models](../concepts/governance-models.md) - Governance types explained

