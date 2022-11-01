## Prerequisites

In order to run the Truffle box, you will need [Node.js](https://nodejs.org). Version 10.x.y works best and 
I've found it helpful to install nvm (https://github.com/nvm-sh/nvm). In order install these dependencies, you will also need [Python](https://www.python.org) (version 2.7.x) and
[git](https://git-scm.com/downloads). You will also need the [MetaMask](https://metamask.io/) plugin for Chrome.

## Building

1. Install truffle and an Ethereum client. If you don't have a test environment, I recommend ganache-cli
  ```bash
  npm install -g truffle
  npm install -g ganache-cli
  ```
2. Run your Ethereum client. For Ganache CLI:
  ```bash
  ganache-cli
  ```
  Note the mnemonic 12-word phrase printed on startup, you will need it later.

3. Make sure `truffle-config.js` is configured to use your test environment.

4. This box is configured to automatically compile and migrate, but you may need to run the command again or
 `truffle migrate --reset` if there were any snags in the unboxing process.
```
truffle compile && truffle migrate
```


## Configuration
1. In order to connect with the Ethereum network, you will need to configure MetaMask
2. Log into the `ganache-cli` test accounts in MetaMask, using the 12-word phrase printed earlier. 
A detailed explaination of how to do this can be found [here](https://truffleframework.com/docs/truffle/getting-started/truffle-with-metamask)
3. Point MetaMask to `ganache-cli` by connecting to the network `localhost:8545` 


## Running

1. Dependencies are automatically installed with Yarn. Run the app using Yarn:
```bash
yarn start
```
The app is now served on localhost:3000

2. Making sure you have configured MetaMask, visit http://localhost:3000 in your browser.
