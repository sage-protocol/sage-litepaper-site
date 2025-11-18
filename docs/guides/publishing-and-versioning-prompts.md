# Publishing and Versioning Prompts

This guide explains how to publish new versions of your prompt library and manage them on-chain.

## 1. Make Your Changes

Edit prompt files in your workspace's `prompts/` directory. Add, modify, or remove markdown files as needed.

## 2. Check Status

See what has changed since your last publish:

```bash
sage prompts status
```

## 3. Publish Updates

The `publish` command builds a manifest, uploads to IPFS, and creates a governance proposal:

```bash
sage prompts publish --pin
```

This generates a new CID and proposes it to your SubDAO in one step.

### Preview First

See what will be published without executing:

```bash
sage prompts publish --dry-run
```

## How Versioning Works

Sage uses IPFS for content-addressed versioning. Each time you `push` your manifest, you get a new, unique CID that represents that specific version of your library.

The on-chain `PromptRegistry` contract in each SubDAO stores a pointer to the **latest approved** manifest CID for each library. Governance proposals are used to update this pointer.

This means:
*   **All previous versions** of your library remain permanently available on IPFS.
*   **The SubDAO's members** have control over which version is considered the "official" one.
*   **Agents and users** can choose to consume the latest approved version or pin a specific older version by its CID.
