# Creating and Selling Premium Prompts

This guide covers how to create encrypted, paid prompts using Lit Protocol for access control.

## 1. Author Your Premium Content

Create your high-quality prompt content in a local file. This is the content that will be encrypted.

## 2. Generate a Lit AuthSig

To encrypt content with Lit Protocol, you need an `AuthSig`. This is a signature from your wallet that proves you own the address that will be creating the premium prompt.

```bash
sage premium-pre authsig --out ./authSig.creator.json
```

This command will prompt you to sign a message with your wallet and will save the resulting signature to `authSig.creator.json`.

## 3. Publish the Premium Prompt

The `premium-pre publish` command handles encryption, uploading to IPFS, and creating the on-chain proposal to register your prompt for sale.

```bash
sage premium-pre publish \
  --in ./path/to/your/prompt.md \
  --name "My Premium Prompt" \
  --description "A high-quality prompt for professional use." \
  --subdao 0xYourSubDAO \
  --price 10.00 \
  --auth-sig ./authSig.creator.json
```

This command will:
1.  Generate a symmetric key to encrypt your prompt file.
2.  Encrypt the symmetric key with Lit Protocol, gated by ownership of an ERC1155 receipt token.
3.  Upload the encrypted prompt and the Lit metadata to IPFS.
4.  Create a governance proposal in your SubDAO to register the prompt in the `PremiumPrompts` contract with the specified price.

## How it Works for Buyers

1.  A buyer calls the `purchaseAccess` function on the `PremiumPrompts` contract.
2.  They pay the specified USDC price.
3.  The contract mints an ERC1155 receipt token to their address.
4.  The buyer can now use their ownership of this token to ask the Lit Protocol nodes to decrypt the symmetric key.
5.  With the decrypted key, they can decrypt and access the premium prompt content.

```