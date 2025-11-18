# Governance Modes

SubDAOs can operate under different governance modes. Choose based on your team size and decentralization needs.

---

## Which Mode Should I Choose?

| If you have... | Choose | Why |
|----------------|--------|-----|
| **Small team (2-10 people)** | Operator | Fast execution, trusted signers |
| **Growing community (50+)** | Token | Decentralized voting, transparent |

Most SubDAOs start with **Operator mode** and transition to **Token mode** as they grow.

---

## Operator Mode

Best for small teams that need fast execution.

**How it works:**
- A trusted multisig (e.g., Gnosis Safe) controls the SubDAO
- Actions execute after a short timelock delay (1-2 days)
- All actions are transparent and auditable

**Example:** A 5-person team uses a 3-of-5 Safe. Any 3 members can approve library updates, which execute after 24 hours.

```bash
sage subdao create --wizard --mode operator
```

---

## Token Mode

Best for communities that want decentralized governance.

**How it works:**
- Voting power is proportional to token holdings
- Proposals require minimum quorum to pass
- Longer voting periods (3-7 days) + timelock delays

**Example:** A SubDAO with 500 token holders. Members propose and vote on library updates. Proposals need 4% quorum and pass after a 5-day vote + 2-day timelock.

```bash
sage subdao create --wizard --mode token
```

---

## Transitioning Between Modes

SubDAOs can upgrade from Operator to Token mode as they grow:

```bash
# Current operators propose the transition
sage governance propose-mode-change \
  --subdao 0xMySubDAO \
  --to token \
  --token 0xNewGovernanceToken
```

After the proposal passes and executes, the SubDAO switches to token-weighted voting.

---

## Key Parameters

All parameters are configurable via proposals. Here are the most important:

| Parameter | Operator | Token | Description |
|-----------|----------|-------|-------------|
| Timelock delay | 1-2 days | 2-7 days | Wait time after approval before execution |
| Voting period | N/A | 3-7 days | How long voting stays open |
| Quorum | N/A | 4% | Minimum participation to pass |
| Proposal threshold | N/A | 10,000 tokens | Tokens needed to create proposal |

---

## CLI Quick Reference

```bash
# View SubDAO governance info
sage governance info --subdao 0xMySubDAO

# Vote on a proposal
sage governance vote --proposal-id 42 --support for

# Queue passed proposal
sage governance queue --proposal-id 42

# Execute after timelock
sage governance execute --proposal-id 42
```

---

## Best Practices

**Operator Mode:**
- Use multisig (not single EOA) for security
- Keep timelock delays reasonable (1-3 days)
- Publish actions to community channels

**Token Mode:**
- Enable delegation for passive holders
- Monitor quorum—too high kills governance
- Set proposal threshold to prevent spam but allow participation
