# Deployment Addresses

This page lists all deployed smart contract addresses for the Sage Protocol across different networks.

---

## Base Sepolia Testnet

The following contracts are deployed on Base Sepolia testnet for testing and development:

| Component | Address | Type | Purpose |
|-----------|---------|------|---------|
| **SXXX Token** | `0x49723ecfB28FcD2dDC21A2e9bded79cc8205932b` | ERC20Votes | Governance token for staking and voting |
| **SubDAO Factory** | `0x23EaCE10fdFe526E80301dD1E9535e4B14aECb34` | Diamond | Creates new SubDAOs using minimal proxies |
| **Library Registry** | `0x2d508622C9daE1BfFD984Ad92EE002e50819A241` | Registry | Global directory for library manifests |
| **Prompt Registry** | `0x894095819EFdf815113bfB1e39802fca1F4e4Eaa` | Implementation | Stores prompts with versioning and attribution |
| **Governor** | `0xD6921543F73CA73b4888eB14f671A378fbE2C442` | Implementation | Governance contract template |
| **Timelock** | `0x234522F35b34FB999cD925aa4B2499f1413C062B` | Implementation | Time-delayed execution for proposals |
| **Boost Manager (Merkle)** | `0xdda3a9a0ffCC8399B709Ef8f435C88cB8cd714B2` | Incentives | Merkle-based reward distribution |
| **Boost Manager (Direct)** | `0x55dB08a3241517B73bc4A63df2d5B11680beCAef` | Incentives | Direct reward distribution |
| **Premium Prompts** | `0xbECd6a4f2c267455052ad14D9463d988aA964675` | Marketplace | Paid prompt access and revenue splits |
| **Safe Master Copy** | `0xD83ad4A56900A4Aa65d20FC0746D58a939F8B352` | Treasury | Gnosis Safe template for treasuries |
| **Template Module** | `0x0732b8b4fB55BC2A16955a5932dbB61188a3d970` | Configuration | DAO configuration templates |

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
# Factory: 0x23EaCE10fdFe526E80301dD1E9535e4B14aECb34
# Library Registry: 0x2d508622C9daE1BfFD984Ad92EE002e50819A241
# SXXX Token: 0x49723ecfB28FcD2dDC21A2e9bded79cc8205932b
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
    factory: '0x23EaCE10fdFe526E80301dD1E9535e4B14aECb34',
    libraryRegistry: '0x2d508622C9daE1BfFD984Ad92EE002e50819A241',
  }
})

// Fetch latest library
const library = await sdk.getLibrary('my-prompts')
console.log(library.manifestCid)
```

---

For questions about deployments or integration support, follow [@VelinusSage](https://x.com/VelinusSage) on X or open an issue on [GitHub](https://github.com/velinusplatform/sage-protocol/issues).
