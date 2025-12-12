# What is Sage?

Sage helps you build and share prompt libraries with others. Whether you're working alone, with a team, or building a community—Sage handles versioning, collaboration, and distribution so you can focus on writing great prompts.

---

## What You Can Do

### Publish Your Work

Stop losing prompts in chat histories. Publish them to a library where you (and others) can find, use, and improve them.

```bash
sage prompts init           # Create a workspace
# Write prompts in prompts/
sage project push           # Publish to your library
```

Your prompts get versioned automatically. Every change is tracked. You can always roll back.

### Iterate With Others

The best prompts come from iteration. Sage makes it easy to collaborate:

- **Get feedback**: Share your library. Others can try your prompts and suggest improvements.
- **Accept contributions**: When someone submits a better version, review and merge it.
- **Track attribution**: Every contributor gets credit. The history shows who improved what.

### Build a Community

As your library grows, you might want others to help maintain it:

**Start with a team**: Invite 2-3 collaborators. Changes require approval from multiple people before going live.

**Open it up**: Let anyone propose improvements. Your community votes on which changes get adopted.

**Incentivize contributions**: Post bounties for specific improvements. "Make the SQL prompt handle edge cases better" → someone fixes it → they get paid.

---

## The Journey

Most creators follow this path:

### 1. Personal Library

You publish prompts under your own control. Every update is instant. Great for getting started and iterating quickly.

```bash
sage dao create-playbook --playbook personal --name "My Prompts"
```

### 2. Team Collaboration

You invite collaborators. Changes require approval (e.g., 2 of 3 team members). Prevents accidents, builds consensus.

```bash
sage dao create-playbook --playbook council-closed \
  --name "Team Prompts" \
  --owners "alice.eth,bob.eth,carol.eth" \
  --threshold 2
```

### 3. Community Governance

You open governance to a wider group. Anyone with stake can propose changes. The community votes. Passed proposals go live after a review period.

```bash
sage dao create-playbook --playbook community --name "Community Prompts"
```

Each step up adds more collaboration. You decide when (or if) to grow.

---

## Why This Matters

**Prompts are production assets — and they decay.** Models change, tooling changes, and edge cases accumulate. A prompt that “worked last month” can silently stop working.

Sage is built around a simple economic claim: **the highest-value work is keeping prompts aligned over time** (not writing them once). To do that, you need:

- **A canonical acceptance function** (governance decides what becomes “the” version)
- **Incentives for maintainers** (bounties, premium sales, voter boosts)
- **Discoverability and provenance** (so agents and apps can prefer governed content)

Read more:
- [Economic Thesis](concepts/economic-thesis.md)
- [Tooling & Surfaces](concepts/tooling-and-surfaces.md)

---

## Common Workflows

### Publishing Updates

```bash
# Make changes to prompts/
sage project push              # Upload new version
sage project propose           # Submit for approval (if governed)
# After approval, changes go live
```

### Reviewing Contributions

```bash
sage governance list           # See pending proposals
sage governance show <id>      # Review the changes
sage governance vote <id> for  # Approve
```

### Posting Bounties

```bash
sage bounty post "Improve code review prompt" --reward 500
# Contributors submit improvements
sage bounty pick-winner <id> <submission>
```

### Monetizing Premium Content

```bash
sage premium publish expert-prompt --price 25
# Buyers pay SXXX to access
```

---

## For Agent Builders

Agents can discover and use governed prompts through the MCP server:

```bash
sage mcp start
```

Agents can:
- Browse libraries and fetch prompts
- Propose improvements (humans approve)
- Complete bounties

[Agent Integration Guide →](guides/agent-prompt-workflows.md)

---

## Get Started

| What you want | Where to go |
|---------------|-------------|
| Publish your first library | [First Library Guide](guides/creating-your-first-prompt-library.md) |
| Set up a team | [Creating a DAO](guides/creating-a-subdao.md) |
| Understand governance options | [Governance Models](concepts/governance-models.md) |
| Incentivize contributors | [Bounties](concepts/bounties.md) |
| Sell premium prompts | [Premium Prompts](concepts/premium-prompts.md) |

---

## Reference

For technical details on contracts, deployments, and CLI commands:

- [CLI Reference](cli/command-reference.md)
- [SDK Guide](sdk/index.md)
- [Contract Architecture](contracts/architecture.md)
- [Deployments](contracts/deployments.md)
