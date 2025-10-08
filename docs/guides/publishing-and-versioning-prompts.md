# Publishing and Versioning Prompts

This guide explains how to publish new versions of your prompt library and manage them on-chain.

## 1. Update Your Local Manifest

First, make your changes to your local `manifest.json` and any associated prompt files. You can add, remove, or modify prompts.

## 2. Push the New Version to IPFS

Once you are happy with your changes, push the updated manifest to IPFS. This will generate a new CID for your library.

```bash
sage library push manifest.json --pin
```

The CLI will output the new manifest CID. This CID represents a snapshot of your library at this point in time.

## 3. Propose the Update to a SubDAO

To make the new version official, you need to propose it to the SubDAO that governs the library.

```bash
sage library propose manifest.json --subdao 0xYourSubDAO --cid <new-manifest-cid>
```

Replace `<new-manifest-cid>` with the CID you got from the `push` command. This creates a governance proposal to update the library's on-chain pointer to your new version.

## How Versioning Works

Sage uses IPFS for content-addressed versioning. Each time you `push` your manifest, you get a new, unique CID that represents that specific version of your library.

The on-chain `PromptRegistry` contract in each SubDAO stores a pointer to the **latest approved** manifest CID for each library. Governance proposals are used to update this pointer.

This means:
*   **All previous versions** of your library remain permanently available on IPFS.
*   **The SubDAO's members** have control over which version is considered the "official" one.
*   **Agents and users** can choose to consume the latest approved version or pin a specific older version by its CID.
