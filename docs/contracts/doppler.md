# Doppler & LaunchGate

The `LaunchGate` contract is a core component of the Sage Protocol's integration with Doppler for Liquidity Bootstrapping Pool (LBP) launches. It acts as a secure wrapper, ensuring that all auction creation and migration actions are executed through a Gnosis Safe owned by the Treasury.

## Key Features

-   **Treasury-Owned**: The `LaunchGate` is owned and controlled by the Treasury Safe, providing a single point of authority for all auction-related activities.
-   **Prepare-Only CLI Flow**: The `sage-cli` prepares Safe transaction payloads for auction creation, which are then executed by the Treasury multisig. This prevents direct write access from local wallets, enhancing security.
-   **Centralized Configuration**: The `LaunchGate` centralizes the configuration of key parameters like the Doppler factory address, fee recipients, and fee structures.
-   **Manifest Gating**: The contract can enforce that all launch requests reference a pre-approved manifest hash, preventing unauthorized or replayed transactions.
-   **Executor Roles**: While the Treasury Safe is the default executor, the contract allows for the delegation of executor privileges to other addresses or automation modules.
-   **Auditable Events**: The `LaunchGate` emits detailed events for all launch executions, providing a clear audit trail for subgraphs and other off-chain services.

## How It Works

1.  **Preparation**: A user or developer uses the `sage doppler create --prepare-only` command to generate a Safe transaction payload.
2.  **Proposal**: The payload is submitted to the Treasury Safe for review and approval.
3.  **Execution**: The Treasury multisig executes the transaction, which calls the appropriate launch function on the `LaunchGate` contract.
4.  **Forwarding**: The `LaunchGate` injects the necessary Treasury fee configurations and other parameters into the call data and forwards the request to the Doppler factory.
5.  **Event Emission**: Upon successful execution, the `LaunchGate` emits a `LaunchGateExecuted` event with all the relevant details of the launch.
