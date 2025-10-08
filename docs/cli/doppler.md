# Doppler & LaunchGate

Sage Protocol uses Doppler for Liquidity Bootstrapping Pool (LBP) launches. To ensure security and control, all Doppler auction launches are funneled through a `LaunchGate` contract. This contract is owned by the Treasury Safe and allows for safe, governed auction creation.

## Prepare-Only Auctions

The CLI does not broadcast auction creation transactions directly. Instead, it prepares a Safe transaction payload that can be reviewed and executed by the Treasury multisig.

To create a new auction, use the `doppler create` command with the `--prepare-only` flag:

```bash
sage doppler create --prepare-only --variant dynamic --output safe-payload.json
```

This command will generate a `safe-payload.json` file. This file can then be uploaded to the Gnosis Safe UI for execution by the treasury owners.

### LaunchGate Authority

- All auction creation and migration actions are permissioned and executed only by the Treasury multisig (Safe).
- The `LaunchGate` wrapper contract on Base is the sole entrypoint for new auctions.
- The CLI never sends auction-changing transactions directly from a local EOA.

This prepare-only workflow ensures that even as contributors and developers stage proposals, the Treasury Safe remains the single point of execution, maintaining security and control over the protocol's liquidity events.
