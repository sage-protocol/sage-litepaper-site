# Governance Modes

DAOs operate under different governance modes. The `sage dao create --wizard` guides you through choosing a **playbook** that maps to the right mode.

---

## Playbooks (Recommended)

When creating a DAO, choose a playbook that matches your collaboration style:

| Playbook | Use Case | Governance Mode |
|----------|----------|-----------------|
| **Creator** | Solo publisher | Operator (direct control) |
| **Squad** | Small team (3-10) | Operator (Safe multisig) |
| **Community** | Token holders (50+) | Token (Tally voting) |

```bash
sage dao create --wizard
# Choose: Creator / Squad / Community
```

Playbooks set sensible defaults for governance parameters and determine how `sage prompts publish` behaves.

---

## Underlying Modes

Playbooks map to two underlying governance modes:

| If you have... | Playbook | Mode | Why |
|----------------|----------|------|-----|
| **Just you** | Creator | Operator | Direct control, no voting |
| **Small team (2-10)** | Squad | Operator | Safe multisig approval |
| **Growing community (50+)** | Community | Token | Decentralized voting |

---

## Operator Mode

Best for small teams that need fast execution.

**How it works:**
- A trusted multisig (e.g., Gnosis Safe) controls the DAO
- Actions execute after a short timelock delay (1-2 days)
- All actions are transparent and auditable

**Example:** A 5-person team uses a 3-of-5 Safe. Any 3 members can approve library updates, which execute after 24 hours.

```bash
sage dao create --wizard --mode operator
```

---

## Token Mode

Best for communities that want decentralized governance.

**How it works:**
- Voting power is proportional to token holdings
- Proposals require minimum quorum to pass
- Longer voting periods (3-7 days) + timelock delays

**Example:** A DAO with 500 token holders. Members propose and vote on library updates. Proposals need 4% quorum and pass after a 5-day vote + 2-day timelock.

```bash
sage dao create --wizard --mode token
```

---

## Transitioning Between Modes

DAOs can upgrade from Operator to Token mode as they grow:

```bash
# Current operators propose the transition
sage governance propose-mode-change \
  --dao 0xMyDAO \
  --to token \
  --token 0xNewGovernanceToken
```

After the proposal passes and executes, the DAO switches to token-weighted voting.

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
# View DAO governance info
sage governance info --dao 0xMyDAO

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
