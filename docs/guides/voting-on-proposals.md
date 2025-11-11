# Voting on Proposals

Once you are a member of a SubDAO and have delegated voting power (typically by delegating to yourself), you can vote on active governance proposals.

## 1. Find Active Proposals

List the active proposals for your SubDAO:

```bash
sage governance list --subdao <subdao-address>
```

This will show you the proposal ID and description for each active proposal.

## 2. Review a Proposal

Before voting, inspect the details of the proposal to understand what it does.

```bash
sage governance inspect <proposal-id> --subdao <subdao-address>
```

This command will decode the proposal's actions, showing you which contracts will be called and with what data.

## 3. Cast Your Vote

To vote, use the `governance vote` command.

```bash
sage governance vote <proposal-id> <support> --subdao <subdao-address>
```

*   `<proposal-id>`: The ID of the proposal you are voting on.
*   `<support>`: Your vote. Can be `for`, `against`, or `abstain`.

Example:
```bash
sage governance vote 42 for --subdao 0xYourSubDAO
```

Your vote is weighted by your stake token balance at the proposal's snapshot block.

## Proposal Lifecycle

After the voting period ends, a successful proposal must be **queued** in the Timelock contract and then **executed**.

*   `sage governance queue <proposal-id>`
*   `sage governance execute <proposal-id>`

Anyone can call these functions to move a successful proposal forward.
