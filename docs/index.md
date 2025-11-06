# Sage Protocol Documentation

Sage is a governance-powered infrastructure layer that transforms how AI agents discover, trust, and evolve their instructions. By combining **on-chain governance**, **IPFS storage**, and **community curation**, Sage enables distributed intelligence that compounds over time.

Instead of hardcoded prompts that quickly become stale, Sage lets communities publish versioned prompt libraries to IPFS, govern upgrades through SubDAO proposals, and let agents automatically discover the trusted version—all while rewarding contributors through incentives and attribution.

---

## Explore by Category

<div class="card-grid">
  <div class="card">
    <h3>📚 Core Concepts</h3>
    <p>Learn what makes Sage different and understand the technical foundation of the protocol.</p>
    <a href="core-concepts/what-is-sage/" class="button">Get Started →</a>
  </div>
  
  <div class="card">
    <h3>🎯 User Guides</h3>
    <p>Step-by-step guides for prompt creators, community members, SubDAO admins, and agent builders.</p>
    <a href="guides/" class="button">View Guides →</a>
  </div>
  
  <div class="card">
    <h3>💻 Command Line (CLI)</h3>
    <p>Comprehensive CLI documentation to manage SubDAOs, publish libraries, and integrate with IPFS.</p>
    <a href="cli/get-started/" class="button">CLI Docs →</a>
  </div>
  
  <div class="card">
    <h3>🔧 SDK Reference</h3>
    <p>Developer resources for integrating the Sage SDK into your applications and agent workflows.</p>
    <a href="sdk/" class="button">SDK Reference →</a>
  </div>
  
  <div class="card">
    <h3>⚙️ Smart Contracts</h3>
    <p>Technical documentation on contract architecture, Doppler integration, and LaunchGate mechanics.</p>
    <a href="contracts/architecture/" class="button">View Architecture →</a>
  </div>
  
  <div class="card">
    <h3>🗺️ Roadmap</h3>
    <p>Stay up to date with our development roadmap, milestones, and upcoming features.</p>
    <a href="core-concepts/roadmap/" class="button">View Roadmap →</a>
  </div>
</div>

---

## What is Sage?

Sage is a governance layer for distributed intelligence that solves a fundamental problem: **AI agents need reliable, evolving instructions, but traditional approaches either centralize control or fragment knowledge**.

Sage bridges this gap by enabling communities to:

- **Publish** versioned prompt libraries to IPFS with immutable content addressing
- **Govern** upgrades through SubDAO proposals with transparent voting and timelocks
- **Distribute** value to contributors through boosts, bounties, and premiums
- **Discover** trusted instructions through agents, CLI tools, and web interfaces

Each SubDAO becomes a coordination point for domain-specific intelligence—whether that's DeFi strategies, code generation, research assistance, or any specialized workflow. Communities pool capital, reward experiments, and reinvest learnings so collective intelligence compounds over time.

<div class="card-grid">
  <div class="card">
    <h3>🚀 Publish</h3>
    <p>Push manifests and prompt files to IPFS. Immutable CIDs establish the authorized set of agent instructions.</p>
  </div>
  
  <div class="card">
    <h3>🗳️ Propose</h3>
    <p>Each manifest is one governance proposal in your SubDAO. Vote, queue, and execute through a Timelock.</p>
  </div>
  
  <div class="card">
    <h3>🔍 Discover</h3>
    <p>Agents, the CLI, and the web app read via subgraph first and fall back to RPC for a consistent view.</p>
  </div>
  
  <div class="card">
    <h3>⚡ Use</h3>
    <p>MCP tools return content by CID so agents can orchestrate tasks with the community-approved version.</p>
  </div>
</div>

---

## Key Use Cases

### For AI Agent Builders
Integrate the Sage MCP (Model Context Protocol) server to give your agents dynamic access to community-curated instructions. No more hardcoded prompts—agents fetch the latest governed version directly from IPFS via SubDAO registries.

### For Prompt Engineers & Creators
Publish your expertise as versioned prompt libraries, earn attribution through boosts, and monetize specialized knowledge through premium tiers. Your work compounds as communities fork, remix, and improve upon your foundations.

### For Communities & DAOs
Launch a SubDAO to coordinate intelligence in your domain. Pool treasury funds, create bounties for new capabilities, vote on prompt upgrades, and build a flywheel where better prompts attract more users who fund better prompts.

### For Developers
Use the Sage SDK to integrate governed prompts into any application. The same discovery mechanisms that power agents—subgraph queries, RPC fallbacks, IPFS resolution—work for web apps, CLIs, and custom tooling.

---

## Quick Start

Get up and running with Sage in minutes:

```bash
# Connect your wallet
sage wizard

# Create and publish a library
sage library scaffold-manifest
sage library lint manifest.json
sage library push manifest.json --pin
sage library propose manifest.json --subdao 0xYourSubDAO

# Launch an auction (via Doppler)
sage doppler create --prepare-only --variant dynamic --output safe-payload.json

# Manage IPFS credits
sage ipfs credits
sage ipfs buy-credits
```

---

## Core Components

**On-chain Governance & LaunchGate**  
The SubDAO Factory, Governor + Timelock, LibraryRegistry, PromptRegistry, and Treasury modules route all auction creation through a TreasuryWrapper + LaunchGate stack. The CLI produces prepare-only Safe payloads which hit TreasuryWrapper before LaunchGate finalises the Doppler call.

**Persistent Shared Memory with Credits**  
IPFS stays the canonical store for library payloads, enforced by a managed worker that mediates uploads, pinning, and warming. A 402-based credit ledger lets contributors prepay for storage.

**Tooling for Distributed Intelligence**  
The CLI, discovery app, and MCP endpoints share a unified SDK adapter. Commands like `sage ipfs credits` and `sage doppler create` connect operators, creators, and agents to the same governed knowledge base.

---

## Community & Support

<div class="card-grid">
  <div class="card">
    <h3>💬 Join the Community</h3>
    <p>Follow the founder <a href="https://x.com/VelinusSage" target="_blank">@VelinusSage</a> on X for updates and join our community of builders.</p>
  </div>
  
  <div class="card">
    <h3>📖 Read the Full Docs</h3>
    <p>Dive deep into technical specifications, governance modes, tokenomics, and security considerations.</p>
    <a href="core-concepts/what-is-sage/" class="button">View Docs →</a>
  </div>
</div>

---

## License

Apache 2.0. See the repository for full docs, guides, and examples.
