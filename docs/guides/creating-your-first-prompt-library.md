# Creating Your First Prompt Library

This guide shows how to create and publish a prompt library using the Sage CLI.

---

## Quick Start

Get a library on IPFS in three commands:

```bash
sage prompts init                    # Initialize workspace
# Add .md files to prompts/ directory
sage prompts publish --dest personal # Publish to IPFS
```

Your library is now discoverable by agents via its CID.

---

## Ways to Create Prompts

### Option 1: Write from Scratch

Create a workspace and add prompt files manually:

```bash
sage prompts init
```

This creates a `prompts/` directory and `.sage/workspace.json`. Add markdown files:

```bash
echo "# Code Review\n\nReview this code for bugs..." > prompts/code-review.md
```

### Option 2: Import OpenSkills

Import skills from the [OpenSkills](https://github.com/numman-ali/openskills) ecosystem:

```bash
# Install skills externally
openskills install anthropics/skills

# Import into your workspace
sage prompts import-skill pdf
sage prompts import-skill xlsx
```

Skills are copied to `prompts/skills/` and included when you publish.

### Option 3: Import Existing Prompts

Import from Claude Code, Cursor, or other directories:

```bash
sage prompts init --preset claude      # Import from ~/.claude/skills
sage prompts init --preset cursor      # Import from .cursor/prompts
sage prompts init --import-from ./my-prompts
```

### Option 4: Pull from Registry

Pull prompts from an existing library to modify:

```bash
sage prompts init --subdao 0xLibrary...
sage prompts pull
# Edit local files
sage prompts publish
```

---

## Publish Your Library

The `publish` command builds a manifest, uploads to IPFS, and optionally creates a governance proposal:

```bash
# Personal library (IPFS only, no governance)
sage prompts publish --dest personal

# To a SubDAO (creates governance proposal)
sage prompts publish --subdao 0xYourSubDAO

# Preview without executing
sage prompts publish --dry-run
```

### What Happens

1. **Build** - Creates manifest from workspace changes
2. **Upload** - Pushes files to IPFS
3. **Propose** - Creates governance proposal (if SubDAO specified)

You'll receive a CID that uniquely identifies your library version.

---

## Optional: Test Before Publishing

Test a prompt locally before publishing:

```bash
sage prompts try code-review
```

---

## Adding Governance

Connect your library to a SubDAO for community voting on updates:

```bash
# Create a SubDAO
sage subdao create --wizard

# Bind workspace to SubDAO
sage prompts init --subdao 0xYourSubDAO

# Publish (creates proposal automatically)
sage prompts publish
```

SubDAO members vote on proposals, and approved changes update the on-chain registry.

---

## What's Next?

- [Publishing and Versioning Prompts](./publishing-and-versioning-prompts.md) - Managing library updates
- [Using the MCP Server](./using-the-mcp-server.md) - Discovering prompts in agents
- [Voting on Proposals](./voting-on-proposals.md) - Participating in governance
