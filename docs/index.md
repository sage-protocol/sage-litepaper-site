# What is Sage?

Sage helps you build and share prompt libraries with others. Whether you're working alone, with a team, or building a community—Sage handles versioning, collaboration, and distribution so you can focus on writing great prompts.

---

## What You Can Do

<<<<<<< Updated upstream
### Publish Your Work
=======
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
    <p>Technical documentation on contract architecture, governance modules, and registry mechanics.</p>
    <a href="contracts/architecture/" class="button">View Architecture →</a>
  </div>
  
  <div class="card">
    <h3>🗺️ Roadmap</h3>
    <p>Stay up to date with our development roadmap, milestones, and upcoming features.</p>
    <a href="core-concepts/roadmap/" class="button">View Roadmap →</a>
  </div>
</div>
>>>>>>> Stashed changes

Stop losing prompts in chat histories. Publish them to a library where you (and others) can find, use, and improve them.

```bash
<<<<<<< Updated upstream
sage prompts init           # Create a workspace
# Write prompts in prompts/
sage project push           # Publish to your library
=======
# Install the CLI
npm i -g @sage-protocol/cli

# Connect your wallet
sage wizard

# Create a DAO with your prompts (one command!)
mkdir prompts
echo "# My First Prompt" > prompts/example.md
sage library quickstart --name "My Library" --from-dir ./prompts

# Or create a DAO first, then publish
sage dao create-playbook --playbook personal --name "My Library" --yes
sage prompts init
sage prompts new --name "my-prompt"
sage prompts publish --yes
>>>>>>> Stashed changes
```

Your prompts get versioned automatically. Every change is tracked. You can always roll back.

### Iterate With Others

<<<<<<< Updated upstream
The best prompts come from iteration. Sage makes it easy to collaborate:

- **Get feedback**: Share your library. Others can try your prompts and suggest improvements.
- **Accept contributions**: When someone submits a better version, review and merge it.
- **Track attribution**: Every contributor gets credit. The history shows who improved what.

### Build a Community
=======
**On-chain Governance**
Each DAO includes a Governor + Timelock for proposal management, plus a LibraryRegistry that tracks the current manifest CID. The SubDAO Factory deploys DAOs with pre-configured governance playbooks (personal, council, community).

**Persistent Storage (IPFS)**
IPFS provides immutable, content-addressed storage for prompts and manifests. The Sage IPFS Worker handles uploads, pinning, and retrieval with optional credit-based storage.

**Tooling for Distributed Intelligence**
The CLI, web app, and MCP server share a unified discovery layer. Commands like `sage library quickstart` and `sage prompts publish` connect creators and agents to governed knowledge.
>>>>>>> Stashed changes

As your library grows, you might want others to help maintain it:

**Start with a team**: Invite 2-3 collaborators. Changes require approval from multiple people before going live.

**Open it up**: Let anyone propose improvements. Your community votes on which changes get adopted.

**Incentivize contributions**: Post bounties for specific improvements. "Make the SQL prompt handle edge cases better" → someone fixes it → they get paid.
