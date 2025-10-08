# Doppler & LaunchGate

Sage Protocol uses Doppler for Liquidity Bootstrapping Pool (LBP) launches. Production launches flow through `TreasuryWrapper` (Safe-owned) which applies on-chain spend limits before delegating to `LaunchGate`.

## Prepare-Only Auctions

The CLI does not broadcast auction creation transactions directly. Instead, it prepares a Safe transaction payload that can be reviewed and executed by the Treasury multisig.

To create a new auction, use the `doppler create` command with the `--prepare-only` flag:

```bash
sage doppler create --prepare-only --variant dynamic --output safe-payload.json
```

This command will generate a `safe-payload.json` file. This file can then be uploaded to the Gnosis Safe UI for execution by the treasury owners.

### TreasuryWrapper & LaunchGate Authority

- TreasuryWrapper (owned by the Safe) holds auction funds and enforces selector/quota limits; it then calls LaunchGate.
- DAO timelock can execute via `DAO_EXECUTOR_ROLE`, while the Safe retains admin rights to update limits and configuration.
- CLI never broadcasts auction-changing transactions directly from EOAs; Safe payloads are reviewed, signed, and routed through TreasuryWrapper.

This prepare-only workflow keeps execution multisig-supervised while enabling DAO-driven launches with on-chain guardrails.
