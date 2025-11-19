# Voting on Proposals

Once you are a member of a SubDAO and have delegated voting power (typically by delegating to yourself), you can vote on active governance proposals.

## 1. Check Proposal Inbox

View all pending and active proposals for your SubDAO:

```bash
sage proposals inbox --subdao 0xYourSubDAO
```

This will show you:
- Proposal IDs
- Current status (Pending, Active, Succeeded, Queued, Executed)
- Voting deadlines
- Current vote counts

## 2. Preview a Proposal

Before voting, inspect the details of a specific proposal:

```bash
sage proposals preview <proposal-id> --subdao 0xYourSubDAO
```

This command shows:
- Proposal description
- Calldata breakdown (which contracts/functions will be called)
- Current voting status
- Time remaining
- Required quorum

Example:
```bash
sage proposals preview 42 --subdao 0xYourSubDAO
```

## 3. Cast Your Vote

To vote, use the `proposals vote` command:

```bash
sage proposals vote <proposal-id> <support> --subdao 0xYourSubDAO
```

*   `<proposal-id>`: The ID of the proposal you are voting on
*   `<support>`: Your vote. Can be `for`, `against`, or `abstain`

Examples:
```bash
sage proposals vote 42 for --subdao 0xYourSubDAO
sage proposals vote 42 against --subdao 0xYourSubDAO
sage proposals vote 42 abstain --subdao 0xYourSubDAO
```

Your vote is weighted by your stake token balance at the proposal's snapshot block.

## 4. Execute Successful Proposals

After the voting period ends, a successful proposal must be **executed** after the Timelock delay passes.

```bash
sage proposals execute <proposal-id> --subdao 0xYourSubDAO
```

Anyone can call this function to execute a proposal once:
- Quorum is reached
- Voting period has ended
- Timelock delay has passed

## Check Next Steps

Use `proposals status` to see what action is needed next:

```bash
sage proposals status --subdao 0xYourSubDAO
```

This will show recommended next actions:
- "Vote on proposal #X" (if active)
- "Queue proposal #X" (if succeeded)
- "Execute proposal #X" (if queued and delay passed)

## Full Proposal Lifecycle

1. **Created** - Proposal submitted to Governor
2. **Active** - Voting period is open → **Vote here**
3. **Succeeded** - Quorum reached, majority voted for
4. **Queued** - Waiting for Timelock delay
5. **Executed** - Proposal actions completed → **Library updated**
