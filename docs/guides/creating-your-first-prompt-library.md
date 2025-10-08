# Creating Your First Prompt Library

This guide will walk you through the process of creating your first prompt library using the Sage CLI.

## 1. Scaffold a New Manifest

The first step is to create a `manifest.json` file for your new library. This file will contain the metadata for your library, such as its name, description, and the prompts it contains.

To create a new manifest, run the following command:

```bash
sage library scaffold-manifest
```

This will create a `manifest.json` file in your current directory. You can then edit this file to add your prompts and other metadata.

## 2. Lint Your Manifest

Once you have created your manifest, you should lint it to make sure it is valid.

```bash
sage library lint manifest.json
```

This command will check your manifest for any errors and provide feedback on how to fix them.

## 3. Push Your Library to IPFS

After you have created and linted your manifest, you can push it to IPFS.

```bash
sage library push manifest.json --pin
```

This command will upload your manifest and all the prompts it contains to IPFS and pin them to ensure they are always available.

## 4. Propose Your Library to a SubDAO

Finally, you can propose your new library to a SubDAO.

```bash
sage library propose manifest.json --subdao 0xYourSubDAO
```

This will create a new governance proposal in the specified SubDAO to add your library to its collection. The members of the SubDAO will then vote on whether to accept your proposal.
