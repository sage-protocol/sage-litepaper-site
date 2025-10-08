# Doppler & LaunchGate

The `LaunchGate` contract is a core component of Sage’s Doppler integration. In production it is invoked via `TreasuryWrapper`, a Safe-owned contract that enforces on-chain spend limits and role-based approvals before calls reach LaunchGate.

## Key Features

- **Treasury Wrapper Custody**: TreasuryWrapper holds USDC/ETH and owns LaunchGate configuration. The Safe funds the wrapper, but LaunchGate transactions spend wrapper-held balances.
- **Prepare-Only CLI Flow**: The `sage` CLI prepares Safe transaction payloads which target TreasuryWrapper. Operators review the payload before the Safe signs and LaunchGate is invoked.
- **Registry & Configuration**: TreasuryWrapper (via the registry) centralises Doppler factory addresses, fee recipients, and router/token pointers used by LaunchGate.
- **Manifest Gating**: The contract can enforce that all launch requests reference a pre-approved manifest hash, preventing unauthorized or replayed transactions.
- **Executor Roles**: While the Treasury Safe is the default executor, the contract allows for the delegation of executor privileges to other addresses or automation modules.
- **Auditable Events**: The `LaunchGate` emits detailed events for all launch executions, providing a clear audit trail for subgraphs and other off-chain services.

## How It Works

1.  **Preparation**: A user runs `sage doppler create --prepare-only`, producing a Safe transaction payload that targets TreasuryWrapper.
2.  **Review**: The payload is submitted to the Safe; operators verify selector/limit compliance and sign.
3.  **Execution**: The Safe executes the transaction. TreasuryWrapper checks spend limits and `DAO_EXECUTOR_ROLE` permissions, then calls the appropriate launch function on LaunchGate.
4.  **Forwarding**: LaunchGate injects fee recipients + registry configuration and forwards the request to the Doppler factory.
5.  **Events**: TreasuryWrapper emits `TreasuryAction` and LaunchGate emits `LaunchGateExecuted`, providing a full audit trail for subgraphs.
