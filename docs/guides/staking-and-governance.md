# Staking and Governance

Staking SXXX tokens is the primary way to participate in the governance of Sage Protocol and its SubDAOs.

## Staking in a SubDAO

When you stake SXXX tokens into a SubDAO, you receive a corresponding amount of the SubDAO's specific stake token. This stake token represents your voting power within that SubDAO.

To stake, use the `subdao stake` command:
```bash
sage subdao stake <subdao-address> <amount>
```

## Voting Power

Your voting power for a given proposal is determined by your stake token balance at the time the proposal was created (the "snapshot" block).

To participate in voting, you must hold sufficient voting power via staking (no delegation step is required in the current release).

```bash
// Delegation not required in current release
```

This is a one-time transaction per wallet that enables your voting power.

## Governance Proposals

Any member with enough voting power can create a proposal. Proposals can be for anything from updating a prompt library to changing SubDAO rules or spending treasury funds.

To see active proposals:
```bash
sage governance list --subdao <subdao-address>
```
