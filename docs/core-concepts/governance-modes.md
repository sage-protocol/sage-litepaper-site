# Governance Modes

Sage Protocol uses a **playbook system** with a **3-axis governance model** that allows communities to configure governance based on their size, maturity, and coordination needs. Each playbook pre-configures these axes to match common use cases.

---

## The 3-Axis Model

Every Sage DAO is configured along three independent axes:

| Axis | Values | What It Controls |
|------|--------|------------------|
| **governanceKind** | `OPERATOR` / `TOKEN` | Who decides: trusted operator(s) vs token voting |
| **proposalAccess** | `COUNCIL_ONLY` / `COMMUNITY_THRESHOLD` | Who can create proposals |
| **executionAccess** | `COUNCIL_ONLY` / `ANYONE` | Who can execute passed proposals |

This orthogonal design means you can mix and match - for example, allowing community members to propose changes while restricting execution to a trusted council.

---

## Governance Playbooks

Playbooks are pre-configured combinations of the 3 axes optimized for common scenarios:

| Playbook | governanceKind | proposalAccess | executionAccess | Best For |
|----------|----------------|----------------|-----------------|----------|
| `personal` | OPERATOR | COUNCIL_ONLY | COUNCIL_ONLY | Solo creators |
| `council-closed` | OPERATOR | COUNCIL_ONLY | COUNCIL_ONLY | Teams with Safe multisig |
| `council-drafts` | TOKEN | COMMUNITY_THRESHOLD | COUNCIL_ONLY | Community proposes, council executes |
| `community` | TOKEN | COMMUNITY_THRESHOLD | ANYONE | Full token democracy |
| `community-long` | TOKEN | COMMUNITY_THRESHOLD | ANYONE | Extended voting (7 days) |

---

## Playbook Details

### Personal

**Best for:** Solo creators who want to publish and iterate quickly.

```bash
sage dao create-playbook --playbook personal --name "My Library" --yes
```

**Configuration:**
- Single EOA (your wallet) controls the DAO
- No token voting required
- Proposals execute through Timelock for transparency
- Fastest iteration speed

**How it works:**
1. You create proposals via the Governor
2. Proposals auto-succeed (you're the only voter)
3. After timelock delay, you execute
4. All changes are on-chain and auditable

---

### Council-Closed

**Best for:** Teams that want shared control via a Safe multisig.

```bash
sage dao create-playbook --playbook council-closed --name "Team Library" \
  --owners "0xAlice,0xBob,0xCarol" --threshold 2 --yes
```

**Configuration:**
- Safe multisig controls the DAO
- Only Safe signers can propose and execute
- No external token voting
- Good for small teams with high trust

**How it works:**
1. Any Safe signer proposes changes
2. Required signatures confirm approval
3. After timelock, any signer can execute
4. Full audit trail on-chain

---

### Council-Drafts

**Best for:** Communities that want input but maintain execution control.

```bash
sage dao create-playbook --playbook council-drafts --name "Hybrid DAO" \
  --owners "0xAlice,0xBob,0xCarol" --yes
```

**Configuration:**
- Community members can create proposals (if they meet token threshold)
- Token holders vote on proposals
- Only council can execute passed proposals
- Balance of community input with trusted execution

**How it works:**
1. Community member creates proposal (needs SXXX stake)
2. Token holders vote during voting period
3. If quorum + majority reached, proposal succeeds
4. Council Safe executes after timelock

---

### Community

**Best for:** Fully decentralized DAOs with token-weighted voting.

```bash
sage dao create-playbook --playbook community --name "Community DAO" --yes
```

**Configuration:**
- Anyone with enough tokens can propose
- All token holders can vote
- Anyone can execute passed proposals
- Full token democracy

**Default parameters:**
- Voting period: 3 days
- Quorum: 4% of token supply
- Proposal threshold: 10,000 SXXX
- Timelock delay: 2 days

**How it works:**
1. Holder with enough SXXX creates proposal
2. Community votes For/Against/Abstain
3. If quorum + majority reached, proposal queues
4. After timelock, anyone can execute

---

### Community-Long

**Best for:** High-stakes decisions requiring extended deliberation.

```bash
sage dao create-playbook --playbook community-long --name "Deliberative DAO" --yes
```

**Configuration:**
- Same as `community` but with extended voting
- 7-day voting period
- Lower quorum (2%) to account for longer period
- Good for major upgrades or treasury decisions

---

## Governance Parameters

All parameters can be customized during creation or updated via governance proposals:

### Voting Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `votingDelay` | 1 day | Time before voting starts after proposal |
| `votingPeriod` | 3-7 days | Duration of voting |
| `proposalThreshold` | 10,000 SXXX | Tokens required to create proposal |
| `quorumNumerator` | 2-4% | Minimum participation to pass |

### Timelock Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `minDelay` | 1-2 days | Minimum execution delay |
| `gracePeriod` | 7 days | Window to execute after delay |

---

## Token Delegation

For `TOKEN` governance (council-drafts, community, community-long), voting power comes from **delegated** SXXX tokens.

**Important:** You must delegate before participating:

```bash
# Delegate voting power to yourself
sage sxxx delegate-self

# Check your voting power
sage sxxx delegation

# Check if you can propose
sage governance preflight --subdao 0xYourDAO
```

Delegation is required because ERC20Votes tokens track voting power via checkpoints. Without delegation, your tokens don't count toward voting or proposal thresholds.

---

## Diagnosing Governance Mode

Check a DAO's governance configuration:

```bash
# Full diagnostics
sage governance diag --subdao 0xYourDAO

# Check readiness to propose
sage governance preflight --subdao 0xYourDAO
```

The `diag` command shows:
- Current governance profile (playbook)
- governanceKind, proposalAccess, executionAccess
- Quorum and thresholds
- Your voting power

---

## Transitioning Between Modes

DAOs can evolve their governance over time via proposals:

### Personal → Community

```bash
# 1. Create proposal to change governance profile
sage governance propose-custom \
  --description "Transition to community governance" \
  --target 0xSubDAO \
  --calldata <encoded-setProfile-call>

# 2. After approval and execution, governance mode changes
```

### Council → Community

Teams often start with council governance and transition to community as the project matures:

1. Deploy with `council-closed` or `council-drafts`
2. Build community and distribute tokens
3. Propose governance profile change
4. Council executes the transition

---

## CLI Commands for Governance

```bash
# Create DAO with specific playbook
sage dao create-playbook --playbook <id> --name "..." --yes

# Check governance configuration
sage governance diag --subdao 0x...

# Check proposal readiness
sage governance preflight --subdao 0x...

# View proposal details
sage governance info <proposal-id> --subdao 0x...

# Vote on proposal
sage governance vote-with-reason <id> 1 "Supporting this"

# Queue passed proposal
sage governance queue <id> --subdao 0x...

# Execute after timelock
sage governance execute <id> --subdao 0x...

# Watch and auto-execute
sage governance watch <id>
```

---

## Best Practices

### For Solo Creators (Personal)

- Start with `personal` for fastest iteration
- All changes still go through Timelock for auditability
- Consider transitioning to `community` as you build audience

### For Teams (Council)

- Use `council-closed` for internal tools and early development
- Use `council-drafts` when you want community input
- Keep Safe threshold at majority (e.g., 2-of-3, 3-of-5)
- Document Safe signer responsibilities

### For Communities

- Start with higher quorum and lower thresholds to encourage participation
- Enable delegation early so passive holders can participate
- Use `community-long` for major treasury or upgrade decisions
- Monitor quorum carefully - too high kills governance, too low enables attacks

---

## Summary

The playbook system makes it easy to start with the right governance model:

| Your Situation | Recommended Playbook |
|----------------|---------------------|
| Solo creator, want speed | `personal` |
| Small team, shared control | `council-closed` |
| Team + community input | `council-drafts` |
| Full decentralization | `community` |
| High-stakes decisions | `community-long` |

All playbooks can evolve over time - start simple and add complexity as your community grows.
