# Governance Models

Sage Protocol supports multiple governance models to fit different community sizes and trust requirements. Understanding these models helps you choose the right structure for your use case.

## Why Multiple Models?

One size doesn't fit all:

- A solo creator needs instant control, not voting delays
- A small team needs consensus, but can trust each other
- A large community needs formal voting with safeguards

Sage provides three governance axes that combine to create different patterns.

## The Three Axes

| Axis | Options | Question It Answers |
|------|---------|---------------------|
| **Governance Kind** | `OPERATOR` or `TOKEN` | Who decides - a controller or token holders? |
| **Proposal Access** | `COUNCIL_ONLY` or `COMMUNITY_THRESHOLD` | Who can create proposals? |
| **Execution Access** | `COUNCIL_ONLY` or `ANYONE` | Who can execute passed proposals? |

## Common Configurations

### Personal (Solo Creator)

**Config:** OPERATOR + COUNCIL_ONLY + COUNCIL_ONLY

```
You ──propose──▶ Governor ──execute──▶ Registry
      (instant)            (instant)
```

**Best for:** Individual prompt creators who want full control.

**Characteristics:**
- Single wallet controls everything
- No voting required
- Instant updates
- Can evolve to team/community later

**CLI:**
```bash
sage dao create-playbook --playbook personal --name "My Library" --yes
```

---

### Council (Small Team)

**Config:** OPERATOR + COUNCIL_ONLY + COUNCIL_ONLY (with Safe multisig)

```
Team Member ──propose──▶ Safe ──threshold──▶ Governor ──execute──▶ Registry
                        (2-of-3)
```

**Best for:** Teams of 3-10 who trust each other but want consensus.

**Characteristics:**
- Safe multisig controls proposals
- Requires threshold signatures (e.g., 2-of-3)
- Fast execution (hours, not days)
- No token voting required

**CLI:**
```bash
sage dao create-playbook --playbook council-closed \
  --name "Team Library" \
  --owners "0xAlice,0xBob,0xCarol" \
  --threshold 2 \
  --yes
```

---

### Community (Token Voting)

**Config:** TOKEN + COMMUNITY_THRESHOLD + ANYONE

```
Anyone ──propose──▶ Governor ──vote──▶ Timelock ──delay──▶ Registry
        (stake)            (3-7 days)         (24h)
```

**Best for:** Open communities with 50+ participants.

**Characteristics:**
- Anyone with enough stake can propose
- Token-weighted voting
- Time delays for review
- Permissionless execution after delay

**CLI:**
```bash
sage dao create-playbook --playbook community \
  --name "Community Library" \
  --min-stake 0 \
  --voting-period "3 days" \
  --quorum-bps 400 \
  --yes
```

---

### Council Drafts (Hybrid)

**Config:** TOKEN + COMMUNITY_THRESHOLD + COUNCIL_ONLY

```
Anyone ──propose──▶ Governor ──vote──▶ Council ──execute──▶ Registry
        (stake)            (voting)     (review)
```

**Best for:** Communities that want input but controlled execution.

**Characteristics:**
- Community proposes and votes
- Council reviews and executes
- Prevents malicious proposals from auto-executing
- Good transition from council → full community

**CLI:**
```bash
sage dao create-playbook --playbook council-drafts \
  --name "Hybrid DAO" \
  --owners "0xAlice,0xBob" \
  --min-stake 0 \
  --yes
```

---

## Choosing a Model

| If you... | Use | Why |
|-----------|-----|-----|
| Work alone | Personal | Full control, instant updates |
| Have a small trusted team | Council | Consensus without overhead |
| Have an open community | Community | Democratic, permissionless |
| Want community input + safety | Council Drafts | Community voice, controlled execution |

## Governance Parameters

### Voting Period

How long proposals are open for voting.

| Setting | Duration | Use Case |
|---------|----------|----------|
| Fast | 1-2 days | Small teams, urgent changes |
| Standard | 3-5 days | Most DAOs |
| Long | 7+ days | Major decisions, large communities |

### Quorum

Minimum participation required for a vote to be valid.

| Setting | Percentage | Use Case |
|---------|------------|----------|
| Low | 1-2% | Large token supply, active community |
| Standard | 4% | Most DAOs |
| High | 10%+ | Critical decisions |

### Proposal Threshold

Tokens required to create a proposal.

| Setting | Amount | Use Case |
|---------|--------|----------|
| Zero | 0 | Anyone can propose |
| Low | 100-1,000 | Filter spam, low barrier |
| High | 10,000+ | Serious proposals only |

### Timelock Delay

Time between proposal passing and execution.

| Setting | Duration | Use Case |
|---------|----------|----------|
| None | 0 | Personal/operator mode |
| Short | 1 day | Team DAOs |
| Standard | 2-3 days | Community DAOs |
| Long | 7+ days | Critical upgrades |

## Checking Your DAO's Governance

```bash
# Full governance diagnostics
sage governance diag --subdao 0x...

# Quick readiness check
sage governance preflight --subdao 0x...

# View current parameters
sage dao info 0x...
```

## Evolving Governance

DAOs can change their governance model over time:

1. **Personal → Council:** Add Safe multisig as executor
2. **Council → Community:** Enable token voting
3. **Community → Council Drafts:** Restrict execution to council

All governance changes go through the existing governance process - you can't bypass voting to change voting rules.

## Related

- [Creating a DAO](../guides/creating-a-subdao.md) - Step-by-step DAO creation
- [Voting on Proposals](../guides/voting-on-proposals.md) - How to participate
- [Staking & Governance](../guides/staking-and-governance.md) - Getting voting power
