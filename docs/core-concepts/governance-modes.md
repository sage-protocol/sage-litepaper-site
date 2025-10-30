# Governance Modes

Sage Protocol supports three governance modes that communities can adopt based on their maturity, size, and coordination needs. Each mode balances **decentralization**, **execution speed**, and **spam prevention** differently, allowing SubDAOs to evolve their governance over time.

---

## Overview of Governance Modes

| Mode | Best For | Voting Power | Spam Prevention | Execution Speed |
|------|----------|--------------|-----------------|-----------------|
| **Bootstrap** | New communities | Member list (equal votes) | Proposal deposits + cooldowns | Moderate (depends on voting period) |
| **Token** | Mature communities | ERC20Votes (proportional to stake) | High quorum thresholds | Moderate (voting + timelock delay) |
| **Operator** | Fast-moving teams | Trusted multisig or owner | Admin controls | Fast (no voting required) |

---

## Mode 1: Bootstrap Governance

**Bootstrap mode** is designed for early-stage communities that want governance without requiring tokens or complex staking mechanisms.

### Key Features

- **Membership List**: Manually maintained list of authorized proposers and voters
- **Equal Voting Power**: Each member gets 1 vote, regardless of token holdings
- **Refundable Deposits**: Proposers must stake a small deposit (e.g., 0.1 ETH or 100 SAGE) to create proposals
- **Proposal Cooldowns**: Members must wait N blocks between proposals to prevent spam

### Parameters

| Parameter | Default Value | Description |
|-----------|---------------|-------------|
| `votingDelay` | 1 day (7,200 blocks) | Time before voting starts after proposal creation |
| `votingPeriod` | 3 days (21,600 blocks) | Duration of the voting period |
| `proposalThreshold` | 1 member | Minimum members required to create a proposal |
| `quorumNumerator` | 10% | Percentage of total members that must vote |
| `proposalDeposit` | 0.1 ETH | Refundable deposit to create a proposal |
| `proposalCooldown` | 3 days (21,600 blocks) | Minimum time between proposals from same member |

### Example Use Case

A new "AI Artists Collective" wants to start curating prompts without requiring upfront token purchases:

1. Admins add 50 trusted members to the membership list
2. Any member can propose a new prompt library update
3. Members vote equally (1 member = 1 vote)
4. If ≥5 members vote and majority approves, proposal passes
5. Proposal executes after timelock delay

**Transition Path**: As the community grows and tokenomics mature, they can migrate to **Token mode** by:

1. Deploying an ERC20Votes token (e.g., `sArtists` SubDAO token)
2. Distributing tokens to founding members
3. Submitting a proposal to change governance mode
4. Updating Governor contract to use token-weighted voting

---

## Mode 2: Token Governance

**Token mode** is the standard governance model for mature communities with staked tokens and proportional voting power.

### Key Features

- **ERC20Votes Tokens**: Voting power proportional to token holdings (e.g., SAGE or SubDAO-specific tokens)
- **Delegation**: Token holders can delegate voting power to representatives
- **High Quorum**: Requires significant participation to pass proposals
- **Proposer Threshold**: Minimum token balance required to create proposals

### Parameters

| Parameter | Default Value | Description |
|-----------|---------------|-------------|
| `votingDelay` | 1 day (7,200 blocks) | Time before voting starts after proposal creation |
| `votingPeriod` | 5 days (36,000 blocks) | Duration of the voting period |
| `proposalThreshold` | 10,000 SAGE | Minimum tokens required to create a proposal |
| `quorumNumerator` | 4% | Percentage of total supply that must vote |
| `lateQuorum` | 2 days (14,400 blocks) | Extension if quorum reached near deadline |
| `timelockDelay` | 2 days (14,400 blocks) | Execution delay after proposal passes |

### Example Use Case

A mature "DeFi Researchers SubDAO" with 500 members and a `sDeFi` token:

1. Member holds 50,000 sDeFi tokens (5% of supply)
2. Member creates proposal to update trading prompts library
3. Community votes over 5 days (voting power = token balance)
4. Proposal needs 4% quorum (40,000 tokens) to pass
5. If approved, queued in Timelock for 2-day security delay
6. After delay, anyone can execute to update PromptRegistry

**Benefits:**

- **Sybil Resistance**: Tokens are costly to acquire, preventing spam
- **Proportional Influence**: Active contributors can earn more tokens and voting power
- **Liquid Democracy**: Delegation enables representative governance

**Anti-Plutocracy Measures:**

- **Quadratic Voting** (optional): Vote cost scales quadratically with votes cast
- **Vote Decay** (optional): Voting power decays over time to encourage active participation
- **Caps on Individual Voting Power** (optional): No single holder can exceed X% of votes

---

## Mode 3: Operator Governance

**Operator mode** is designed for fast-moving teams that need rapid iteration without community votes. Useful during early development or for operational SubDAOs (e.g., infrastructure, core protocol).

### Key Features

- **Trusted Execution**: Designated operator (EOA or multisig) can execute actions directly
- **Timelock Protection**: Even operator actions go through Timelock for transparency
- **Admin Controls**: Owner can upgrade contracts or change parameters
- **Escape Hatch**: Community can revoke operator role via emergency governance

### Parameters

| Parameter | Default Value | Description |
|-----------|---------------|-------------|
| `operator` | Multisig address (e.g., 5-of-9 Safe) | Address authorized to execute proposals |
| `timelockDelay` | 1 day (7,200 blocks) | Minimum delay before operator can execute |
| `emergencyTimelock` | 6 hours (1,800 blocks) | Reduced delay for emergency actions |
| `operatorNonce` | Incremental | Prevents replay attacks on operator txs |

### Example Use Case

The "Core Infrastructure SubDAO" manages critical protocol components:

1. Operator multisig (5-of-9 Safe with core team members) proposes contract upgrade
2. After 1-day timelock, operator executes upgrade
3. All actions emit events for transparency
4. Community monitors operator actions via subgraph
5. If operator acts maliciously, main DAO can revoke role via emergency proposal

**Transition Path**: As the community matures, can migrate to **Token mode** by:

1. Deploying governance token and distributing to stakeholders
2. Operator proposes governance mode change
3. After timelock, mode switches to token-weighted voting
4. Operator role is revoked or limited to emergency-only

---

## Governance Parameter Reference

All governance parameters are configurable and can be updated via proposals. Below is a comprehensive reference table:

### Voting Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `votingDelay` | uint256 | 0 - 50,000 blocks | 7,200 blocks (~1 day) | Delay before voting starts |
| `votingPeriod` | uint256 | 7,200 - 100,000 blocks | 36,000 blocks (~5 days) | Duration of voting |
| `proposalThreshold` | uint256 | 0 - 10% of supply | 10,000 tokens | Min tokens to propose |
| `quorumNumerator` | uint256 | 0 - 100 (percentage) | 4 (4%) | Min participation to pass |
| `lateQuorumExtension` | uint256 | 0 - 20,000 blocks | 14,400 blocks (~2 days) | Extends vote if quorum reached late |

### Timelock Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `minDelay` | uint256 | 0 - 30 days | 2 days | Minimum execution delay |
| `maxDelay` | uint256 | minDelay - 365 days | 30 days | Maximum execution delay |
| `gracePeriod` | uint256 | 0 - 30 days | 7 days | Window to execute after delay |

### Economic Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `proposalDeposit` | uint256 | 0 - 1,000 tokens | 0.1 ETH or 100 SAGE | Refundable deposit for spam prevention |
| `proposalCooldown` | uint256 | 0 - 30 days | 3 days | Min time between proposals |
| `executionReward` | uint256 | 0 - 1,000 tokens | 0 (optional) | Reward for executing passed proposals |

---

## Changing Governance Modes

SubDAOs can transition between governance modes via standard proposals. The CLI provides helper commands to plan and execute mode changes safely.

### Example: Bootstrap → Token Transition

```bash
# Step 1: Deploy new governance token
sage subdao deploy-token \
  --name "MySubDAO Token" \
  --symbol "sMYDAO" \
  --supply 1000000 \
  --distribution bootstrap-members.json

# Step 2: Plan governance mode change proposal
sage governance plan-mode-change \
  --subdao 0xMySubDAO \
  --from bootstrap \
  --to token \
  --token 0xNewToken \
  --proposal-threshold 10000 \
  --quorum 4

# Step 3: Submit proposal (requires current governance approval)
sage governance propose \
  --subdao 0xMySubDAO \
  --action changeModeToToken \
  --params mode-change-payload.json \
  --description "Transition to token-weighted governance"

# Step 4: Vote and execute
# (Current bootstrap members vote, then execute after timelock)
```

### Example: Token → Operator Transition (Emergency)

```bash
# If community needs fast execution during crisis:
sage governance propose \
  --subdao 0xMySubDAO \
  --action changeModeToOperator \
  --operator 0xEmergencyMultisig \
  --timelock-delay 1day \
  --description "Temporary operator mode for critical infrastructure upgrade"
```

---

## Best Practices

### For Bootstrap Communities

✅ Start with small membership list (10-50 trusted members)
✅ Set low proposal thresholds to encourage participation
✅ Use refundable deposits to prevent spam
✅ Plan token distribution early for eventual transition

### For Token Communities

✅ Set proposal threshold high enough to prevent spam but low enough for meaningful participation
✅ Enable delegation to allow passive holders to participate
✅ Monitor quorum carefully—too high kills governance, too low enables attacks
✅ Use late quorum extension to prevent last-minute vote manipulation

### For Operator SubDAOs

✅ Use multisig (not EOA) as operator for security
✅ Keep timelock delays reasonable (1-3 days) for transparency
✅ Publish operator actions in community channels
✅ Plan transition to token mode once processes stabilize

---

## CLI Commands for Governance Management

```bash
# View current governance parameters
sage governance info --subdao 0xMySubDAO

# Propose parameter change
sage governance propose-param-change \
  --subdao 0xMySubDAO \
  --param votingPeriod \
  --value 50400 \
  --description "Increase voting period to 7 days"

# Check proposal status
sage governance status --proposal-id 42

# Vote on proposal
sage governance vote \
  --proposal-id 42 \
  --support for \
  --reason "Longer voting period increases participation"

# Queue proposal (after voting passes)
sage governance queue --proposal-id 42

# Execute proposal (after timelock delay)
sage governance execute --proposal-id 42
```

---

By choosing the right governance mode and parameters for your community's needs, SubDAOs can balance decentralization, speed, and security while retaining the flexibility to evolve over time.

---
