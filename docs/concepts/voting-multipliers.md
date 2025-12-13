# Voting Multipliers

Voting multipliers let DAOs recognize and reward their most valuable contributors with increased governance influence.

## Why Multipliers?

Token-weighted voting has a problem: **capital ≠ contribution**. Someone who bought tokens yesterday has the same vote as someone who's been building for a year.

Multipliers solve this by letting DAOs boost the voting power of:
- Founding members who took early risk
- Bounty winners who improved prompts
- Long-term supporters who stayed through tough times
- Active contributors recognized by the community

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  Base Votes (from delegated SXXX)                           │
│  User has 1,000 tokens delegated to self                    │
└─────────────────────────────────────────────────────────────┘
                              ×
┌─────────────────────────────────────────────────────────────┐
│  Multiplier NFT (from VotingMultiplierNFT)                  │
│  User owns "Founder" tier (2x multiplier)                   │
└─────────────────────────────────────────────────────────────┘
                              =
┌─────────────────────────────────────────────────────────────┐
│  Effective Votes: 2,000                                     │
│  User's vote counts 2x in governance                        │
└─────────────────────────────────────────────────────────────┘
```

**Multiple multipliers stack:**
```
Base: 1,000 tokens
Founder NFT: 2x
Contributor NFT: 1.5x

Effective: 1,000 × 2 × 1.5 = 3,000 votes
```

## Key Properties

### DAO-Scoped

Each multiplier NFT belongs to a specific DAO. A "Founder" NFT from DAO A has no effect on voting in DAO B.

This prevents whales from buying multipliers and dominating multiple communities.

### Transferable

Unlike soulbound badges, multiplier NFTs can be sold or transferred. The multiplier follows the NFT, not the person.

This creates a market signal: if multipliers are valuable, people will pay for them.

### Checkpointed

Multipliers are recorded at every transfer to prevent gaming:
- You can't buy an NFT after a proposal is created and vote with it
- Historical snapshots use the multiplier you had at proposal creation
- No flash-loan attacks on governance

### Capped

Maximum 5x multiplier per account, maximum 20 NFTs per account. This prevents extreme concentration.

## Multiplier Format

Multipliers use basis points where `100 = 1x`:

| Value | Multiplier | Meaning |
|-------|------------|---------|
| 100 | 1x | No bonus (baseline) |
| 125 | 1.25x | 25% boost |
| 150 | 1.5x | 50% boost |
| 200 | 2x | Double voting power |
| 300 | 3x | Triple voting power |
| 500 | 5x | Maximum allowed |

## Tier System

DAOs organize multipliers into **tiers** - categories of NFTs with different multipliers, supplies, and distribution methods.

| Tier Type | Typical Multiplier | Distribution |
|-----------|-------------------|--------------|
| Founding Member | 2-3x | Airdrop to early supporters |
| Contributor | 1.5-2x | Bounty completion, governance votes |
| Supporter | 1.25-1.5x | Public mint, auction |
| Auction | Variable | Daily Nouns-style auctions |

### Creating Tiers

Tiers are created through governance proposals:

```bash
# Create a governance proposal for a new tier
sage nft tier create \
  --dao 0x... \
  --name "Founding Member" \
  --multiplier 200 \
  --max-supply 50 \
  --price 0
```

**Options:**
- `--name` - Tier name (visible in UI)
- `--multiplier` - Basis points (200 = 2x)
- `--max-supply` - Maximum NFTs in this tier (0 = unlimited)
- `--price` - Price for public mint (0 = admin-only)

## Auctions

For ongoing treasury funding, DAOs can use **Nouns-style continuous auctions**:

```
Day 1: Auction NFT #1 → Winner gets multiplier, treasury gets ETH
Day 2: Auction NFT #2 → Winner gets multiplier, treasury gets ETH
...
```

```bash
# Check current auction
sage auction status

# Place a bid
sage auction bid 0.5

# Settle ended auction (anyone can call)
sage auction settle
```

Auctions automatically mint the next NFT and start a new auction when settled.

## Checking Your Multiplier

```bash
# Check if a DAO uses multipliers
sage multiplier status --dao 0x...

# See your voting power breakdown
sage multiplier calculate --dao 0x...

# Output:
# Base votes: 1,000 SXXX
# Multiplier: 2x (Founding Member tier)
# Effective votes: 2,000
```

## When to Use Multipliers

**Use multipliers when:**
- Recognizing founders who took early risk
- Contributors earn lasting influence, not just token payments
- Ongoing treasury funding via auctions
- Reputation matters more than capital alone

**Skip multipliers when:**
- Pure token democracy is the goal
- Simplicity is paramount
- DAO is very small (< 10 members)
- You want to avoid any "privileged" voters

## Contract Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  VotingMultiplierNFT                                        │
│  - ERC721 with multiplier values per token                  │
│  - Tiers: Founder (2x), Contributor (1.5x), etc.           │
│  - Checkpointed for historical queries                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  MultipliedVotes (per-DAO wrapper)                          │
│  - IVotes interface (Governor uses this)                    │
│  - effectiveVotes = baseVotes × multiplier / 10000         │
│  - Delegation happens on base token, not here               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  SXXX (ERC20Votes)                                          │
│  - Base governance token (delegated voting power)           │
│  - Delegate here to enable voting                           │
└─────────────────────────────────────────────────────────────┘
```

## Related

- [Governance Models](./governance-models.md) - How governance works
- [Delegation & Voting Power](../guides/delegation-and-governance.md) - Getting voting power
- [Creating a DAO](../guides/creating-a-subdao.md) - Setting up multipliers at creation
