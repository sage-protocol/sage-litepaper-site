# Creating and Selling Premium Prompts

This guide covers how to create encrypted, paid prompts using Lit Protocol for access control via the personal marketplace.

## 1. Author Your Premium Content

Create your high-quality prompt content in a local file. This is the content that will be encrypted.

## 2. Publish a Personal Premium Prompt

Personal premium prompts are published through the personal marketplace, not via DAO governance.

```bash
sage personal premium publish "my-prompt" \
  --price 10 \
  --file ./path/to/your/prompt.md \
  --name "My Premium Prompt" \
  --description "A high-quality prompt for professional use."
```

This command will:
1.  Encrypt your prompt file with a symmetric key.
2.  Use Lit Protocol to encrypt the symmetric key, gated by ownership of a personal ERC1155 receipt.
3.  Upload the encrypted prompt and Lit metadata to IPFS.
4.  Register the listing in the `PersonalMarketplace` contract with the specified SXXX price.

## How it Works for Buyers

1.  A buyer calls the `purchase` function on the `PersonalMarketplace` contract.
2.  They pay the specified SXXX price.
3.  The contract mints an ERC1155 receipt token (personal license) to their address.
4.  The buyer can now use their ownership of this token to ask the Lit Protocol nodes to decrypt the symmetric key.
5.  With the decrypted key, they can decrypt and access the premium prompt content.

> Note: In future phases, DAOs will be able to **endorse** personal premium prompts on-chain (without taking custody of the content). This optional endorsement model is described in `docs/specs/premium-endorsement-model.md` and is tracked as a roadmap feature, not required for the current personal-only premium beta.
