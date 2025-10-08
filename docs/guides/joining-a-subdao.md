# Joining a SubDAO

Joining a SubDAO allows you to participate in its governance and, depending on its configuration, get access to its prompt libraries.

## 1. Discover SubDAOs

First, find a SubDAO you're interested in. You can list all available SubDAOs:

```bash
sage subdao list
```

This will show you the addresses and names of deployed SubDAOs.

## 2. Check the Access Model

Each SubDAO has an access model:
*   **FREE**: Anyone can read prompts.
*   **GOVERNANCE**: You must stake SXXX tokens in the SubDAO to access prompts.
*   **HYBRID**: A mix of free and governance-gated content.

You can check a SubDAO's info:
```bash
sage subdao info <subdao-address>
```

## 3. Stake SXXX Tokens

If the SubDAO requires a stake for access or governance participation, you'll need to stake SXXX tokens.

```bash
sage subdao stake <subdao-address> <amount>
```

Replace `<subdao-address>` with the address of the SubDAO and `<amount>` with the number of SXXX tokens you wish to stake.

## 4. Verify Membership

After staking, you can check your membership status:

```bash
sage members check --subdao <subdao-address> --address <your-address>
```

This will confirm if you are now considered a member and eligible to participate.
