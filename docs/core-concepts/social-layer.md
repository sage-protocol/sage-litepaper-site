# Social Layer & Discovery

Sage Protocol isn't just about smart contracts and IPFS storage; it's about the people and communities that curate intelligence. The Social Layer provides the tools for creators to build reputation and for users to discover trusted prompts.

## Wallet Profiles

Your wallet address is your identity on Sage. The protocol enhances this with a rich profile system:

- **Profile Pages (`/u/[ens_name]`)**: A public page showcasing your contributions.
- **ENS Integration**: Automatically resolves and displays your ENS name and avatar.
- **Activity Feed**: Tracks your governance votes, proposals, and published skills.
- **Skill Portfolio**: Displays the libraries and skills you have authored or contributed to.
- **Custom Metadata**: Add a bio, display name, and social links (Twitter, GitHub, Farcaster) stored securely on Cloudflare KV and verified via SIWE.

## Farcaster Frames

Sage is deeply integrated with the Farcaster ecosystem, bringing governance and discovery directly to your social feed.

### Library Frames
Share a prompt library in a Cast, and users can browse its contents, view prompt descriptions, and even "try" prompts without leaving Farcaster.

### Proposal Frames
Governance happens where the conversation happens. Proposal frames allow community members to:
- View proposal details and diffs.
- See the current vote tally.
- **Vote directly** from the frame (requires a connected wallet).

### Prompt Frames
Individual prompts can be shared as frames, allowing users to preview the prompt and copy it or open it in the Sage web app.

## Governance Hub

The Governance Hub is the command center for SubDAOs. It goes beyond simple voting interfaces to provide deep insight into the changes being proposed.

### Diff Viewer
When a proposal updates a prompt library, the Governance Hub shows a visual **Diff View**. This allows voters to see exactly what changed line-by-line in the prompt text or manifest, ensuring transparency and preventing malicious updates.

### Capabilities Matrix
The Hub displays the "Capabilities" of the SubDAO based on its stamped Playbook (e.g., "Community v1.0"). It clearly shows:
- Who can propose changes?
- Who can execute them?
- What are the delay periods?

This transparency helps users understand the security and governance model of the library they are using.
