# Discovering and Using DAOs

This guide covers how to find DAOs, explore their libraries, and participate in governance.

## Discover DAOs

### List Available DAOs

```bash
sage dao discover
```

This shows deployed DAOs with:
- DAO address
- Name and description
- Governor and registry addresses

### Search by Name

```bash
sage dao search "prompt"
```

### View DAO Details

```bash
sage dao info 0xDAOAddress
```

Shows:
- Governance mode (Personal, Council, Community)
- Current library CID
- Governor and Timelock addresses
- Membership configuration

---

## Explore Libraries

### View a DAO's Library

```bash
sage project view-current --dao 0xDAOAddress
```

This fetches the current approved manifest and lists all prompts.

### Search for Prompts

```bash
sage project search "sql" --dao 0xDAOAddress
```

Or search across all pinned libraries:

```bash
sage prompts search "code review"
```

### Pin a Library Locally

For faster access, pin a library:

```bash
sage project pin QmManifestCID
```

---

## Participate in Governance

To vote on proposals and contribute to a DAO, you need voting power.

### 1. Hold SXXX

Token‑governed DAOs use **delegation (ERC20Votes)**. There is **no stake‑to‑vote** flow.

### 2. Enable Voting Power (Delegate)

```bash
sage sxxx delegate-self
```

### 3. Check Readiness

```bash
sage governance preflight --subdao 0xDAOAddress
```

Now you can:
- Vote on proposals
- Create proposals (if you meet the threshold)
- Claim bounties and contribute

For full details, see [Delegation and Governance](./delegation-and-governance.md).

---

## Governance Participation Summary

| Action | Command |
|--------|---------|
| Self-delegate | `sage sxxx delegate-self` |
| Check readiness | `sage governance preflight --subdao 0xDAO` |
| View proposals | `sage proposals inbox --dao 0xDAO` |
| Vote | `sage proposals vote <id> for --dao 0xDAO` |
| Execute | `sage proposals execute <id> --dao 0xDAO` |

---

## Related

- [Delegation and Governance](./delegation-and-governance.md) - Voting power setup and gates
- [Voting on Proposals](./voting-on-proposals.md) - Voting workflow
- [Governance Models](../concepts/governance-models.md) - How DAOs work
