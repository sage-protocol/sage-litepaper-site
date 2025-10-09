# IPFS & Pinning

Sage Protocol uses IPFS for storing and sharing prompt libraries. The CLI provides tools for uploading, pinning, and managing content on IPFS.

## Managed IPFS Worker

Uploading defaults to the Sage worker provider with the hosted gateway:

-   **Provider**: `worker`
-   **Gateway**: `https://ipfs.dev.sageprotocol.io/ipfs`
-   **Worker base**: `https://api.sageprotocol.io`

Pinata is now opt-in. Use `--use-pinata` (or set `SAGE_IPFS_PROVIDER=pinata`) when you want to supply Pinata credentials; otherwise the worker handles warming and pinning.

## Pay-to-Pin Credits

A 402-based credit system allows users to pay for pinning services directly through the CLI. Users can buy credits and spend them to pin CIDs via the managed worker, with revenue routed to SubDAO and protocol treasuries.

When Coinbase’s facilitator is enabled, insufficient-credit responses include the `Payment-Protocol: X402` header and an exact/evm payload that the CLI relays back to the user. Facilitator receipts are hashed server-side, so each `Payment-Receipt` header is single-use—replays return HTTP 409 and the CLI will prompt you to settle again.

### Off-chain credits (Phase A)

-   Enable `SAGE_PAY_TO_PIN: true` in your profile flags to surface credits UX.
-   Show credits: `sage ipfs credits --worker-url https://ipfs.dev.sageprotocol.io`
-   Buy credits: `sage ipfs buy-credits --worker-url …` (prints checkout URL)
-   Pin with credits: `sage ipfs pin <cid> --worker-url …` (prints 402 guidance when needed). You can always use your own provider with `sage ipfs upload --provider pinata` if you prefer BYO model.

### On-chain pin and credits (Phase B)

-   **Pin burn (prepare-only vs send)**:
    -   Prepare: `SAGE_PAY_TO_PIN=1 SAGE_PAY_TO_PIN_MODE=onchain sage ipfs pin <cid>`
    -   Send:    `… sage ipfs pin <cid> --send` (requires wallet configured)
-   **Buy credits on-chain**:
    -   Prepare (simple allowance): `sage ipfs buy-credits-onchain --token <USDC> --amount <baseUnits> --credits <n>`
    -   Prepare (Permit2): `sage ipfs buy-credits-onchain --permit2 <addr> --token <USDC> --amount <baseUnits> --credits <n>`
    -   Append `--send` to submit the transaction directly.
