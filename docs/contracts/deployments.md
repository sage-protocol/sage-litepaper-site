# Deployment Addresses

This page lists all deployed smart contract addresses for the Sage Protocol across different networks.

---

## Base Sepolia Testnet

The following contracts are deployed on Base Sepolia testnet for testing and development:

| Component | Address | Type | Purpose |
|-----------|---------|------|---------|
| **SXXX Token** | `0x852F8eeb8AF2ec89A1007581aA6C24C7269c37Cc` | ERC20Votes | Governance token for delegation and voting |
| **SubDAO Factory** | `0x8C529DB96728409dD79A115c03e9f8F69629f86f` | Diamond | Creates new SubDAOs using minimal proxies |
| **Library Registry** | `0xD74Ea9f551c713F47B016fC9D0E9AfDfEFFe9474` | Registry | Global directory for library manifests |
| **Prompt Registry** | `0x9450550c66b2714B460a4756089b89b681d04e86` | Implementation | Stores prompts with versioning and attribution |
| **Governor** | `0xeC8361BF0B0519D28C5c91EF8bA106484d93304c` | Implementation | Governance contract template |
| **Timelock** | `0x8d7fA1cC9d26Dc5Af474833575052E84b531c524` | Implementation | Time-delayed execution for proposals |
| **Boost Manager (Merkle)** | `0x51F67373e9F25C5d8e9AE26C32C71394BC2daf0C` | Incentives | Merkle-based reward distribution |
| **Boost Manager (Direct)** | `0xadd36832742d410C68c7Dbb5a6bdCd5ABc73c015` | Incentives | Direct reward distribution |
| **Premium Prompts** | `0x074AA7b4A5c9C38938C4b1bb151c94211bf28839` | Marketplace | Paid prompt access and revenue splits |
| **Safe Master Copy** | `0xc7a937dcdD098c4275547eFf5dB14Fafd513E723` | Treasury | Gnosis Safe template for treasuries |
| **Template Module** | `0x8F14fc0ce3801E0ae39dd718C2f58eb7463a8F3f` | Configuration | DAO configuration templates |
| **VotingMultiplierNFT** | `0x60802046dc625B8Ea0Be82b25023F713C48d4fdE` | NFT | Voting power multiplier NFTs |
| **SageAuctionHouse** | `0xafBd5cd0C537fdC62F9B193F4f760281e8E879A3` | Auction | Nouns-style NFT auctions |
| **SimpleContributorSystem** | `0x9d185eB3386737eAE360E101e52D5cEcAc92e76C` | Reputation | Contributor staking and reputation tracking |
| **SimpleBountySystem** | `0xa78967558C82b5393b42cCb60DF50376Ae387DD4` | Bounties | Task bounties with escrow and submissions |

### Network Information

- **Network Name**: Base Sepolia
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Block Explorer**: https://sepolia.basescan.org
- **Subgraph Endpoint**: (To be deployed)

---

## Base Mainnet (Coming Soon)

Mainnet deployment addresses will be published here after the public LBP launch.

**Expected Launch**: Q1 2025

**Pre-Launch Checklist**:
- ✅ Security audits completed (Cyfrin, OpenZeppelin)
- ✅ Testnet deployment live and tested
- ⏳ LBP parameters finalized
- ⏳ Subgraph deployed and indexed
- ⏳ MCP server production-ready
- ⏳ Treasury multisig configured

---

## Verifying Contract Addresses

You can verify these addresses and view contract source code on [Basescan](https://basescan.org):

```bash
# Using the Sage CLI
sage contract verify --network base-sepolia --address <CONTRACT_ADDRESS>

# Or manually on Basescan
# 1. Navigate to https://sepolia.basescan.org/address/<ADDRESS>
# 2. Click "Contract" tab
# 3. View verified source code and ABI
```

---

## Subgraph Endpoints

The Sage subgraph indexes all on-chain events for fast querying:

### Base Sepolia

```
GraphQL Endpoint: (To be deployed)
Queries/day: Unlimited (development)
```

Example query:

```graphql
query LatestLibraries {
  libraries(
    first: 10
    orderBy: updatedAt
    orderDirection: desc
  ) {
    id
    name
    manifestCid
    subdao {
      name
      governor
    }
    updatedAt
  }
}
```

### Base Mainnet

```
GraphQL Endpoint: (Coming after mainnet launch)
```

---

## IPFS Infrastructure

### Public Gateways

Primary gateway for content retrieval:

- **Gateway URL**: https://gateway.sageprotocol.io
- **Managed Worker**: https://ipfs-worker.sageprotocol.io
- **Fallback Gateway**: https://w3s.link/ipfs/

### Pinning Services

Sage uses a managed Cloudflare Worker for pinning with credit-based payment:

- **Worker Endpoint**: https://ipfs-worker.sageprotocol.io
- **Credit Purchase**: Via CLI (`sage ipfs buy-credits`)
- **Pricing**: ~$0.01-0.10 per GB/month

---

## CLI Configuration

To configure the Sage CLI to use these addresses:

```bash
# Connect to Base Sepolia testnet
sage config set --network base-sepolia

# Verify connection
sage config show

# Output:
# Network: base-sepolia
# RPC: https://sepolia.base.org
# Factory: 0x8C529DB96728409dD79A115c03e9f8F69629f86f
# Library Registry: 0xD74Ea9f551c713F47B016fC9D0E9AfDfEFFe9474
# SXXX Token: 0x852F8eeb8AF2ec89A1007581aA6C24C7269c37Cc
```

---

## Treasury Addresses

### Main Protocol Treasury

- **Safe Address**: (To be deployed on mainnet)
- **Signers**: 5-of-9 multisig (core team, advisors, community)
- **Holdings**: SAGE, USDC, ETH
- **LaunchGate**: (To be deployed)
- **TreasuryWrapper**: (To be deployed)

### Example DAO Treasuries

DAOs create their own treasuries during deployment. View all DAOs:

```bash
sage dao list --network base-sepolia
```

---

## Contract ABIs

All contract ABIs are available in the monorepo:

```bash
# Clone the repo
git clone https://github.com/velinusplatform/sage-protocol
cd sage-protocol

# ABIs are in packages/contracts/artifacts
ls packages/contracts/artifacts/contracts/
```

Or fetch via CLI:

```bash
sage contract abi --name SubDAOFactory --output factory-abi.json
```

---

## Security & Audits

All contracts have undergone professional security audits:

- **Cyfrin**: [View Report](https://github.com/sageprotocol/audits/cyfrin-2024.pdf)
- **OpenZeppelin**: [View Report](https://github.com/sageprotocol/audits/oz-2024.pdf)

**Bug Bounty Program**: Up to $50,000 USDC for critical vulnerabilities. See [bug bounty details](https://github.com/sageprotocol/security).

---

## Latest Addresses

Deployment addresses are automatically updated after each deployment. For the absolute latest addresses, check:

```bash
# Via CLI
sage contract list --network base-sepolia --latest

# Or view in docs
cat docs/appendix/addresses.latest.md
```

**Note**: Always verify contract addresses through multiple sources before interacting with them. Never trust addresses from unofficial sources.

---

## Contract Upgrades

Sage uses a combination of upgradeable and immutable contracts:

### Immutable Contracts

- SXXX Token (ERC20Votes)
- Library Registry
- Timelock implementations

### Upgradeable Contracts (via Governance)

- SubDAO Factory (Diamond proxy pattern)
- Governor implementations (via Timelock)
- Treasury system (LaunchGate, TreasuryWrapper)

All upgrades require:
1. Governance proposal
2. Community vote
3. Timelock delay (≥24 hours on mainnet)
4. Multi-signature approval (for critical contracts)

---

## Developer Resources

### Quick Links

- **GitHub**: https://github.com/velinusplatform/sage-protocol
- **Documentation**: https://docs.sageprotocol.io
- **Discord**: (Coming soon)
- **Twitter**: https://x.com/VelinusSage

### Example Integration

```typescript
import { SageSDK } from '@sage-protocol/sdk'

// Initialize SDK
const sdk = new SageSDK({
  network: 'base-sepolia',
  rpcUrl: 'https://sepolia.base.org',
  contracts: {
    factory: '0x8C529DB96728409dD79A115c03e9f8F69629f86f',
    libraryRegistry: '0xD74Ea9f551c713F47B016fC9D0E9AfDfEFFe9474',
  }
})

// Fetch latest library
const library = await sdk.getLibrary('my-prompts')
console.log(library.manifestCid)
```

---

For questions about deployments or integration support, follow [@VelinusSage](https://x.com/VelinusSage) on X or open an issue on [GitHub](https://github.com/velinusplatform/sage-protocol/issues).
