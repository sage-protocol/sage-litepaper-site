# Joining a DAO

Joining a DAO allows you to participate in its governance and, depending on its configuration, get access to its prompt libraries.

## 1. Discover DAOs

First, find a DAO you're interested in. You can list all available DAOs:

```bash
sage dao list
```

This will show you the addresses and names of deployed DAOs.

## 2. Check the Access Model

Each DAO has an access model:
*   **FREE**: Anyone can read prompts.
*   **GOVERNANCE**: You must stake SXXX tokens in the DAO to access prompts.
*   **HYBRID**: A mix of free and governance-gated content.

You can check a DAO's info:
```bash
sage dao info <dao-address>
```

## 3. Stake SXXX Tokens

If the DAO requires a stake for access or governance participation, you'll need to stake SXXX tokens.

```bash
sage dao stake <dao-address> <amount>
```

Replace `<dao-address>` with the address of the DAO and `<amount>` with the number of SXXX tokens you wish to stake.

## 4. Verify Membership

After staking, you can check your membership status:

```bash
sage dao members check --dao <dao-address> --address <your-address>
```

This will confirm if you are now considered a member and eligible to participate.
