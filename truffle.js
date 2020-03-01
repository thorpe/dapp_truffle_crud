const HDWalletProvider = require('truffle-hdwallet-provider');
const MNEMONIC = "betray rare learn across tuition empower fit avocado ritual father swallow merry";

//ropsten
//betray rare learn across tuition empower fit avocado ritual father swallow merry
//748A50AB52125CE24F812F3DF3D10BB2D2FA1A13E1A840A34AD9A7C6C2C984D8
//0xe628B49f7C48d9E38DC65B73B4A3236015ba163a


module.exports = {


  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },


    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/7fe781e239744fd8b5b73760a3573e40`),
      network_id: 3,       // Ropsten's id
      gas: 4500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.4.24",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
}
