# Creating and Selling Premium Prompts

Premium prompts let creators monetize their expertise. The content is encrypted using Lit Protocol - buyers purchase a license to decrypt and use it.

## Why Premium?

Not all prompts should be free:

- Expert knowledge took years to develop
- Specialized prompts serve niche audiences
- Creators deserve compensation for valuable work
- Premium content funds continued development

---

## How It Works

```
Creator → Publish → Encrypt → IPFS
                      │
                      ▼
Buyer → Purchase → License Receipt (ERC1155)
                      │
                      ▼
Buyer → Decrypt → Full Prompt Content
```

1. **Publish** - Creator encrypts and uploads content
2. **Purchase** - Buyer pays SXXX and receives a license NFT
3. **Access** - License holder decrypts content via Lit Protocol

---

## Publishing Premium Content

### Prepare Your Content

Create a high-quality prompt in a local file:

```bash
cat > ./trading-strategy.md << 'EOF'
---
title: Advanced Trading Strategy Prompt
description: Professional trading analysis with risk management
---

You are an expert trading analyst. When analyzing a position:

1. Evaluate market structure and trend
2. Identify key support and resistance levels
3. Calculate risk/reward ratios
4. Suggest position sizing based on account risk
5. Define entry, stop loss, and take profit levels

Always emphasize risk management and capital preservation.
EOF
```

### Publish with Price

```bash
sage personal premium publish trading-strategy \
  --file ./trading-strategy.md \
  --price 25 \
  --name "Advanced Trading Strategy" \
  --description "Professional trading analysis with risk management"
```

This command:
1. Encrypts your prompt with a symmetric key
2. Uses Lit Protocol to gate the key (only license holders can decrypt)
3. Uploads encrypted content to IPFS
4. Registers the listing in PersonalMarketplace contract

### Publishing Options

```bash
sage personal premium publish my-prompt \
  --file ./prompt.md \
  --price 50 \
  --name "My Premium Prompt" \
  --description "A detailed description" \
  --metadata ./metadata.json \
  --policy 0 \
  --lit-network datil-test
```

**Options:**
- `--price <sxxx>` - Price in SXXX tokens (required)
- `--file <path>` - Path to your prompt content (required)
- `--name <name>` - Display name
- `--description <text>` - Description for marketplace
- `--metadata <file>` - Additional JSON metadata
- `--policy <n>` - Fork policy (0=open, 1=gov_only, 2=disabled)
- `--lit-network <name>` - Lit network (`datil-test` or `datil-dev`)

---

## Pricing Your Content

Prices are set in SXXX tokens:

| Price Range | Typical Use |
|-------------|-------------|
| 5-25 SXXX | Simple prompts, templates |
| 25-100 SXXX | Domain expertise, workflows |
| 100-500 SXXX | Premium strategies, systems |
| 500+ SXXX | Enterprise, consulting-grade |

**Protocol fee:** 10% goes to the protocol treasury.

---

## Buying Premium Content

### Check Price

```bash
sage personal premium price 0xCreatorAddress trading-strategy
```

Output shows:
- Base price
- Protocol fee (10%)
- Total cost

### Purchase

```bash
sage personal premium buy 0xCreatorAddress trading-strategy \
  --max-price 30 \
  --auto-approve
```

**Options:**
- `--max-price <sxxx>` - Maximum you're willing to pay
- `--auto-approve` - Automatically approve SXXX allowance
- `--unlimited` - When auto-approving, approve unlimited allowance
- `--deadline <seconds>` - Transaction deadline (default: 600)

### What Happens on Purchase

1. SXXX transfers from your wallet to creator (minus protocol fee)
2. You receive an ERC1155 license receipt token
3. The token proves ownership and enables decryption

---

## Accessing Purchased Content

### Decrypt and View

```bash
sage personal premium access 0xCreatorAddress trading-strategy
```

This:
1. Checks your license receipt ownership
2. Contacts Lit Protocol nodes to verify
3. Decrypts the symmetric key
4. Fetches and decrypts the content

### Save to File

```bash
sage personal premium access 0xCreatorAddress trading-strategy \
  --out ./my-trading-strategy.md
```

### Access Options

```bash
sage personal premium access 0xCreator key \
  --holder 0xAltAddress \
  --gateway https://ipfs.io \
  --session ./lit-session.json \
  --lit-network datil-test
```

---

## Managing Your Listings

### View Your Listings

```bash
sage personal list --mine
```

### View Specific Creator

```bash
sage personal list --creator 0xCreatorAddress
```

### Update Price

Create a new listing with updated price (original licenses still work):

```bash
sage personal premium publish trading-strategy-v2 \
  --file ./updated-strategy.md \
  --price 30
```

### Remove Listing

```bash
sage personal premium unlist trading-strategy
```

This sets the price to 0, preventing new purchases. Existing licenses still work.

---

## Viewing Your Licenses

See what premium content you've purchased:

```bash
sage personal my-licenses
```

Options:
```bash
sage personal my-licenses \
  --holder 0xAddress \
  --limit 50 \
  --json
```

---

## License Receipts (ERC1155)

License receipts are semi-fungible tokens with special properties:

- **Transferable** - Can sell or gift your license
- **Provable** - On-chain proof of purchase
- **Composable** - Other contracts can check ownership
- **Perpetual** - Access doesn't expire

Check ownership:
```solidity
PersonalLicenseReceipt.balanceOf(buyer, promptId) > 0
```

---

## Encryption Details

Sage uses Lit Protocol for decentralized encryption:

1. **Encryption** - Content encrypted with symmetric key
2. **Key gating** - Lit Protocol gates the key with access conditions
3. **Access condition** - Must own the ERC1155 license receipt
4. **Decryption** - Lit nodes verify ownership, provide decryption key

This means:
- Content is encrypted at rest on IPFS
- No central server holds decryption keys
- Creator doesn't need to be online for buyers to decrypt
- License ownership is on-chain and verifiable

---

## Free vs Premium Strategy

Many creators use a hybrid approach:

| Tier | Content | Price |
|------|---------|-------|
| Free | Basic prompts, templates | 0 |
| Free | Community contributions | 0 |
| Premium | Expert workflows | 25-100 SXXX |
| Premium | Domain-specific systems | 100-500 SXXX |

Free content builds audience; premium content monetizes expertise.

---

## Quick Reference

```bash
# Publishing
sage personal premium publish <key> --file <path> --price <amount>

# Buying
sage personal premium price <creator> <key>
sage personal premium buy <creator> <key> --auto-approve

# Accessing
sage personal premium access <creator> <key>
sage personal premium access <creator> <key> --out ./output.md

# Managing
sage personal list --mine
sage personal my-licenses
sage personal premium unlist <key>
```

---

## Related

- [Premium Prompts](../concepts/premium-prompts.md) - Conceptual overview
- [Publishing and Versioning Prompts](./publishing-and-versioning-prompts.md) - Free publishing
- [Creating Your First Prompt Library](./creating-your-first-prompt-library.md) - Getting started
