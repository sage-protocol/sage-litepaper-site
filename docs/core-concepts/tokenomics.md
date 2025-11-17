# Token and Treasury Economics

The Sage economy is designed to create a self-sustaining ecosystem that rewards contributors, funds development, and coordinates community-governed agent instructions. The protocol uses a fixed-supply token model with deflationary mechanisms and multiple value capture streams.

## Core Economic Principles

-   **Fixed Supply**: SAGE has a fixed 1 billion token supply at genesis with deflationary burns tied to SubDAO creation and forking. No inflation.
-   **Treasury Bootstrapping**: A public LBP (Liquidity Bootstrapping Pool) plus optional bond sales seed protocol-owned liquidity and long-term reserves.
-   **Creator Rewards**: SubDAOs receive grants from the main treasury and use those funds to post bounties, creating a direct work-to-earn loop.
-   **Community Governance**: SAGE token holders stake their tokens in SubDAOs to vote on content curation and community decisions.
-   **Coordination over Fees**: Tokens primarily coordinate long-horizon work (governance, reputation, commitment burns) rather than charging per-prompt usage.

---

## Token Allocation (1 Billion Total Supply)

The initial SAGE token distribution is structured to balance protocol development, community incentives, and long-term sustainability:

| Allocation | Amount | Percentage | Vesting | Purpose |
|------------|--------|------------|---------|---------|
| **Public Sale** | 200M SAGE | 20% | None | Public token sale for price discovery and liquidity bootstrapping |
| **Treasury** | 300M SAGE | 30% | None | Protocol-owned liquidity, grants, bounties, and operational expenses |
| **Team & Advisors** | 200M SAGE | 20% | 2-year linear | Core team, advisors, and early contributors |
| **Community Incentives** | 200M SAGE | 20% | 4-year linear | Staking rewards, creator bounties, and ecosystem grants |
| **Liquidity Mining** | 100M SAGE | 10% | 2-year linear | Incentives for liquidity providers and protocol participants |

### Token Utility

SAGE serves multiple functions within the protocol:

1. **Governance**: Stake SAGE to vote on SubDAO proposals (library updates, treasury spending, parameter changes)
2. **Staking**: Lock SAGE to earn governance power and share of SubDAO treasury rewards
3. **Bounty Rewards**: Contributors earn SAGE for completing community-posted bounties
4. **SubDAO Creation**: Burn SAGE to create new SubDAOs (deflationary mechanism)
5. **Premium Access**: Optional SAGE staking requirements for premium SubDAO features

---

## Treasury Bootstrapping

The protocol treasury is the primary mechanism for long-term sustainability, funded through two main channels:

### 1. Public Token Sale

The initial token distribution uses a fair launch mechanism on Base:

**Sale Parameters:**

- **Sale Amount**: 200M SAGE (20% of supply)
- **Target Raise**: 4-10M USDC
- **Duration**: 72 hours
- **Distribution**: Fully permissionless, no whitelists or KYC

**Benefits:**

- **Fair Price Discovery**: Transparent pricing mechanism discourages front-running and bots
- **Wide Distribution**: Open to all participants
- **Immediate Liquidity**: Raised funds partially seed protocol-owned liquidity (POL)
- **No Lockups**: Tokens available immediately, no cliff or vesting

### 2. Additional Token Sales

The protocol may conduct additional token sales from treasury reserves to grow liquidity and fund operations:

**Benefits:**

- Increases protocol-owned liquidity for long-term stability
- Provides sustainable funding for grants, bounties, and development
- Reduces dependency on external capital sources

---

## Payment Rails Architecture

Sage supports multiple payment flows to monetize agent context and reward creators:

### Free-to-Use Default

Most prompts are **free to use** and governed by the SubDAO. The protocol prioritizes **coordination** over **extraction**—tokens fund long-term development, not per-prompt fees.

### Premium Prompts (Optional)

SubDAOs or individual creators can offer **premium prompts** with gated access:

**Implementation:**

1. Creator marks prompt as "premium" in manifest with price (e.g., 10 SAGE or 1 USDC)
2. PromptRegistry stores payment splitter contract address
3. Agent queries MCP server, which checks if user has paid
4. If not paid, MCP returns 402 Payment Required with payment address
5. User pays via smart contract (splits revenue between creator, SubDAO treasury, protocol)
6. MCP server grants access to CID

**Payment Splits (Configurable by SubDAO):**

- **Creator**: 70% (address that registered the prompt)
- **SubDAO Treasury**: 20% (for bounties and grants)
- **Protocol Fee**: 10% (main SAGE treasury)

**Example Premium Prompt Flow:**

```
Agent requests prompt "advanced-trading-strategies"
MCP Server: "402 Payment Required: 10 SAGE"
User approves transaction to PaymentSplitter contract
PaymentSplitter distributes:
  - 7 SAGE to creator (0xAlice)
  - 2 SAGE to SubDAO treasury
  - 1 SAGE to protocol treasury
MCP Server grants access to CID bafyXXX...
Agent downloads and uses prompt
```

### IPFS Pinning Credits

Storage has real costs. The protocol uses a two-phase credit system:

**Phase A (Current)**: Off-chain credits managed by Cloudflare Worker

- Users purchase credits via 402 flow (USDC or SAGE)
- Credits stored in Durable Object ledger
- Worker debits credits per pin (cost: ~$0.01-0.10 per GB/month)

**Phase B (Roadmap)**: On-chain `CreditToken` + `PaymentRouter`

- ERC-20 credit token (`CREDIT`) minted via bonding curve
- Smart contracts enforce burns per pin operation
- Transparent on-chain accounting of storage costs
- CLI command: `sage ipfs buy-credits --amount 100 --currency SAGE`

---

## Value Capture & Flywheel

The token economics create a compounding flywheel that rewards quality contributions:

```
┌─────────────────────────────────────────────┐
│                                             │
│  1. Treasury raises funds (LBP + Bonds)    │
│                  ▼                          │
│  2. SubDAOs receive grants                 │
│                  ▼                          │
│  3. SubDAOs post bounties for improvements │
│                  ▼                          │
│  4. Creators deliver quality prompts       │
│                  ▼                          │
│  5. Agents use prompts (usage stats up)    │
│                  ▼                          │
│  6. More users = more premium sales        │
│                  ▼                          │
│  7. Revenue splits to creators + treasuries│
│                  ▼                          │
│  8. Treasuries post bigger bounties        │
│                  │                          │
│                  └──────────[cycle]─────────┘
```

### Deflationary Mechanisms

Several protocol actions burn SAGE, creating long-term scarcity:

1. **SubDAO Creation**: Burn 1,000 SAGE to create a new SubDAO
2. **Library Forking**: Burn 100 SAGE to fork a library to a new SubDAO
3. **Premium Content**: Protocol fee from premium prompts can be partially burned (governance-controlled)
4. **Credit Purchases**: Optional burn mechanism when buying pinning credits with SAGE

These burns reduce supply over time, creating deflationary pressure as the protocol scales.

---

## Treasury Management

The main SAGE treasury is managed by a **multisig Safe** with on-chain spending limits enforced by `TreasuryWrapper`:

**Governance Structure:**

- **Safe Signers**: 5-of-9 multisig (core team, advisors, community members)
- **DAO Timelock**: Can trigger pre-approved actions via `DAO_EXECUTOR_ROLE`
- **Spending Limits**: `TreasuryWrapper` enforces per-function spending caps (e.g., max 10,000 USDC per `createAuction` call)

**Treasury Operations:**

- Grant distributions to SubDAOs
- Bond sales to raise additional funds
- Liquidity management (e.g., adding POL to DEX pools)
- Operational expenses (infrastructure, audits, marketing)

**Example Grant Flow:**

```bash
# Proposal submitted to DAO Governor
sage governance propose --action grantSubDAO \
  --subdao 0xArtistsDAO \
  --amount 50000 \
  --description "Q1 2025 Artist Collective Grant"

# Community votes
# If approved, queued in Timelock
# After delay, executed via TreasuryWrapper
# 50,000 SAGE transferred to ArtistsDAO treasury
```

---

## Long-Term Sustainability

The economic model prioritizes **sustainable coordination** over short-term extraction:

✅ **Treasury-funded grants** enable community experimentation without upfront capital
✅ **Bounty system** rewards quality contributions with clear attribution
✅ **Optional premium prompts** allow monetization without gating basic access
✅ **Deflationary burns** create long-term scarcity as usage grows
✅ **Protocol-owned liquidity** reduces dependency on mercenary capital

By aligning incentives across creators, users, and the protocol, Sage creates a self-sustaining economy where the best agent context is rewarded and compounded.

---
