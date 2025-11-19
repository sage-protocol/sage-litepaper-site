# Publishing and Versioning Prompts

This guide explains how to publish new versions of your prompt library and manage them on-chain.

## Two Publishing Workflows

Sage provides two complementary workflows for publishing:

### Skills Workflow (Workspace-Based)

**Use when:** You have a workspace (`prompts/skills/`) and want the CLI to handle manifest creation.

```bash
# Initialize workspace
sage skills init

# Create and edit skills
sage skills list
sage skills variant my-skill v2

# Publish (builds manifest automatically)
sage skills publish my-skill --dest personal
```

### Library Workflow (Manifest-Based)

**Use when:** You want fine-grained control over manifest structure or are composing prompts programmatically.

```bash
# Create manifest template
sage library template --type basic --out ./manifest.json

# Add prompts to manifest
sage library add-prompt \
  --manifest ./manifest.json \
  --file ./prompts/hello.md \
  --key examples/hello \
  --name "Hello World" \
  --upload

# Preview before publishing
sage library preview ./manifest.json

# Publish
sage library push ./manifest.json --subdao 0xYourSubDAO --pin
```

**Both workflows** end at the same place: a versioned library update in the registry.

---

## Skills Workflow Details

### 1. Make Your Changes

Edit skill files in your workspace's `prompts/skills/` directory. Add, modify, or remove markdown files as needed.

### 2. Check Status

See what has changed:

```bash
sage skills list
```

### 3. Publish Updates

The `publish` command builds a manifest, uploads to IPFS, and creates a governance proposal:

```bash
sage skills publish my-skill --dest personal --pin
```

This generates a new CID and proposes it to your SubDAO in one step.

### Preview First

See what will be published without executing:

```bash
sage skills try my-skill --as cursor
```

---

## Library Workflow Details

### 1. Check Library Status

See the current state of your library:

```bash
sage library status --subdao 0xYourSubDAO
```

### 2. Preview Changes

Before publishing, preview your manifest:

```bash
sage library preview ./manifest.json
```

### 3. Publish

Push your manifest to IPFS and create a proposal:

```bash
# For team (Safe multisig)
sage library push ./manifest.json --subdao 0xTeamSubDAO --pin --exec

# For community (token voting)
sage library push ./manifest.json --subdao 0xCommunitySubDAO --pin
```

## How Versioning Works

Sage uses IPFS for content-addressed versioning. Each time you `push` your manifest, you get a new, unique CID that represents that specific version of your library.

The on-chain `PromptRegistry` contract in each SubDAO stores a pointer to the **latest approved** manifest CID for each library. Governance proposals are used to update this pointer.

This means:
*   **All previous versions** of your library remain permanently available on IPFS.
*   **The SubDAO's members** have control over which version is considered the "official" one.
*   **Agents and users** can choose to consume the latest approved version or pin a specific older version by its CID.
