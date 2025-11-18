# Creating Your First Prompt Library

This guide shows how to create and publish a prompt library using the Sage CLI.

---

## Two Workflows

Sage provides two command groups for different use cases:

| Workflow | Best For | Commands |
|----------|----------|----------|
| **`sage skills`** | Coding agents (Claude Code, Cursor, Codex) | `sage skills init`, `sage skills publish` |
| **`sage prompts`** | Browser testing with Echo | `sage prompts init`, `sage prompts publish` |

Most users should start with **`sage skills`** since coding agents are the primary use case.

---

## Quick Start (Skills)

Get a skill library on IPFS in three commands:

```bash
sage skills init                     # Initialize workspace
# Add .md files to prompts/skills/ directory
sage skills publish --dest personal  # Publish to IPFS
```

Your library is now discoverable by agents via its CID.

---

## Ways to Create Skills

### Option 1: Write from Scratch

Create a workspace and add skill files:

```bash
sage skills init
```

This creates a `prompts/skills/` directory. Add markdown files with optional frontmatter:

```markdown
---
title: Code Review Assistant
summary: Reviews code for bugs and best practices
tags: ["code", "review"]
targets: ["claude", "cursor"]
---

# Code Review

Review this code for bugs, security issues, and style...
```

### Option 2: Import from OpenSkills

Import skills from the [OpenSkills](https://github.com/numman-ali/openskills) ecosystem:

```bash
# Install skills externally
openskills install anthropics/skills

# Import into your workspace
sage skills import pdf
sage skills import xlsx
```

### Option 3: Import from IDE

Import from Claude Code, Cursor, or other directories:

```bash
sage skills init --preset claude      # Import from ~/.claude/skills
sage skills init --preset cursor      # Import from .cursor/prompts
```

### Option 4: Create Variants

Clone an existing skill to experiment:

```bash
sage skills variant code-review v2
# Creates prompts/skills/code-review.v2.md
```

---

## Publish Your Library

The `publish` command builds a manifest, uploads to IPFS, and creates a governance proposal based on your SubDAO's playbook:

```bash
# Personal library (IPFS only, no governance)
sage skills publish --dest personal

# To a SubDAO (uses playbook-aware flow)
sage skills publish --subdao 0xYourSubDAO

# Preview without executing
sage skills publish --dry-run
```

### What Happens

1. **Build** - Creates manifest from workspace skills
2. **Upload** - Pushes files to IPFS
3. **Propose** - Creates Safe transaction or Tally proposal (based on playbook)

---

## Export for Different Agents

Export a skill formatted for specific targets:

```bash
sage skills export code-review --as claude
sage skills export code-review --as cursor
sage skills export code-review --as browser
```

---

## Adding Governance with Playbooks

When creating a SubDAO, choose a playbook that matches your collaboration style:

```bash
sage subdao create --wizard
```

**Playbooks:**
- **Creator** - Solo publisher, direct control
- **Squad** - Small team with Safe multisig
- **Community** - Token voting on Tally

The playbook determines how `sage skills publish` behaves (direct update, Safe transaction, or Tally proposal).

---

## Alternative: Browser Testing with `sage prompts`

For testing prompts interactively in the browser with Echo:

```bash
sage prompts init
sage prompts try code-review
sage prompts publish
```

The `prompts` workflow is less structured but good for quick experimentation.

---

## What's Next?

- [Publishing and Versioning Prompts](./publishing-and-versioning-prompts.md) - Managing library updates
- [Using the MCP Server](./using-the-mcp-server.md) - Discovering prompts in agents
- [Voting on Proposals](./voting-on-proposals.md) - Participating in governance
