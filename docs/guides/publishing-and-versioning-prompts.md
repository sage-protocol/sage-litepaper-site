# Publishing and Versioning Prompts

This guide explains how to publish prompt libraries and manage versions on-chain. Sage provides two complementary workflows depending on your needs.

## Two Publishing Workflows

### Prompts Workflow (Workspace-Based)

**Use when:** You have a local workspace and want the CLI to handle manifest creation automatically.

```bash
# Initialize workspace
sage prompts init

# Create and edit prompts
sage prompts new --name my-prompt --content "You are a helpful assistant..."
sage prompts list

# Publish (builds manifest automatically)
sage prompts publish --dest personal --dao 0xYourDAO
```

### Project Workflow (Manifest-Based)

**Use when:** You want fine-grained control over manifest structure or are composing prompts programmatically.

```bash
# Generate manifest template
sage project template basic --out ./manifest.json

# Add prompts to manifest
sage project add-prompt \
  --manifest ./manifest.json \
  --file ./prompts/hello.md \
  --key examples/hello \
  --name "Hello World" \
  --upload

# Preview before publishing
sage project preview ./manifest.json

# Push to IPFS and create proposal
sage project push ./manifest.json --dao 0xYourDAO --pin
```

**Both workflows** result in a versioned library update registered on-chain.

---

## Prompts Workflow Details

### 1. Initialize Workspace

Create a Sage workspace in your project:

```bash
sage prompts init
```

This creates:
- `.sage/workspace.json` - Workspace configuration
- `prompts/` - Directory for your prompt files

Optionally bind to a DAO:

```bash
sage prompts init --subdao 0xYourDAO
```

### 2. Create and Edit Prompts

Create a new prompt:

```bash
sage prompts new --name code-review --content "Review this code for bugs and improvements..."
```

Or create files directly in `prompts/`:

```bash
cat > prompts/code-review.md << 'EOF'
---
title: Code Review
description: Review code for bugs and improvements
tags: [code, review, quality]
---

You are an expert code reviewer. Analyze the provided code for:
- Bugs and potential issues
- Performance improvements
- Code style and readability
EOF
```

### 3. Check Status

See what's changed:

```bash
sage prompts status
```

View differences from last sync:

```bash
sage prompts diff
```

### 4. Test Locally

Preview a prompt before publishing:

```bash
sage prompts try code-review --input "function add(a,b) { return a + b }"
```

### 5. Publish

One command builds manifest, uploads to IPFS, and creates a proposal:

```bash
sage prompts publish --dest personal --dao 0xYourDAO --pin
```

**Destination options:**
- `personal` - Your personal library (direct update)
- `team` - Team DAO (Safe multisig approval)
- `community` - Community DAO (token voting)

### 6. Follow Governance

After publishing to a team or community DAO:

```bash
sage proposals inbox --dao 0xYourDAO
sage proposals vote <id> for --dao 0xYourDAO
sage proposals execute <id> --dao 0xYourDAO
```

---

## Project Workflow Details

### 1. Generate Template

```bash
# Basic template
sage project template basic --out ./manifest.json

# Advanced template with more fields
sage project template advanced --out ./manifest.json
```

### 2. Add Prompts

Add prompts to your manifest one at a time:

```bash
sage project add-prompt \
  --manifest ./manifest.json \
  --file ./prompts/sql-helper.md \
  --key tools/sql-helper \
  --name "SQL Helper" \
  --description "Generate and explain SQL queries" \
  --upload
```

The `--upload` flag automatically uploads the file to IPFS and sets the CID.

### 3. Generate From Directory

Auto-generate a manifest from a directory of prompts:

```bash
sage project generate ./prompts --out ./manifest.json --upload
```

### 4. Preview

Before publishing, preview your manifest:

```bash
sage project preview ./manifest.json
```

### 5. Validate

Check for issues:

```bash
sage project validate ./manifest.json
```

### 6. Push

Upload to IPFS and create a proposal:

```bash
# Team mode (Safe multisig)
sage project push ./manifest.json --dao 0xTeamDAO --pin --exec

# Community mode (token voting)
sage project push ./manifest.json --dao 0xCommunityDAO --pin
```

**Options:**
- `--pin` - Pin manifest to IPFS providers
- `--wait` - Wait for pin confirmation
- `--warm` - Warm public gateways
- `--exec` - Auto-execute if delay permits (team mode)

---

## How Versioning Works

Sage uses IPFS for content-addressed versioning:

1. **Each publish creates a new CID** - A unique identifier for that exact content
2. **Registry stores the pointer** - On-chain registry points to the current approved CID
3. **All versions persist** - Previous versions remain on IPFS forever
4. **Governance controls updates** - Only approved proposals update the pointer

```
Version 1: QmABC... (approved)
Version 2: QmDEF... (proposed) → Vote → (approved) → QmDEF... is now current
Version 3: QmGHI... (proposed)
```

### View Version History

```bash
sage project log --dao 0xYourDAO
```

### Rollback to Previous Version

```bash
sage project rollback QmPreviousCID --dao 0xYourDAO
```

---

## Manifest Structure

A library manifest looks like:

```json
{
  "name": "My Prompt Library",
  "description": "Collection of useful prompts",
  "version": "1.0.0",
  "previous": "QmPreviousManifestCID",
  "prompts": [
    {
      "key": "tools/sql-helper",
      "name": "SQL Helper",
      "description": "Generate and explain SQL queries",
      "cid": "QmPromptContentCID",
      "tags": ["sql", "database", "query"]
    }
  ]
}
```

---

## Working with Skills

Skills are Claude Code compatible prompt packages. Publish them with:

```bash
sage prompts publish-skill ./my-skill \
  --key skills/my-skill \
  --pin \
  --register
```

Create a variant of an existing skill:

```bash
sage prompts variant my-skill v2
```

---

## Pinning and IPFS

### Manual Pinning

```bash
sage ipfs pin QmYourCID
```

### Check Pin Status

```bash
sage ipfs pin-status QmYourCID
```

### Provider Options

```bash
sage prompts publish --provider pinata --dao 0xYourDAO
```

Providers: `auto`, `worker`, `pinata`, `w3s`

---

## Quick Reference

```bash
# Prompts workflow
sage prompts init
sage prompts new --name my-prompt
sage prompts status
sage prompts publish --dest personal --dao 0xDAO --pin

# Project workflow
sage project template basic --out ./manifest.json
sage project add-prompt --manifest ./manifest.json --file ./prompt.md --upload
sage project preview ./manifest.json
sage project push ./manifest.json --dao 0xDAO --pin

# Versioning
sage project log --dao 0xDAO
sage project status --dao 0xDAO
sage project rollback QmOldCID --dao 0xDAO
```

---

## Related

- [Creating Your First Prompt Library](./creating-your-first-prompt-library.md) - Getting started
- [Agent Prompt Workflows](./agent-prompt-workflows.md) - Agent integration
- [IPFS & Pinning](../cli/ipfs.md) - IPFS details
