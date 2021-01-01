const HDWalletProvider = require('truffle-hdwallet-provider');
const MNEMONIC = "warm actual put oxygen develop tiny wait matrix they shift tiger dentist";

//ropsten
//warm actual put oxygen develop tiny wait matrix they shift tiger dentist
//private : 8aca17608e60b2fec96ad653b49292a00ff29740a0c18fbfd153a90519c0060d
//address : 0xD807dD9aC8Bd18c353859A4652794aebC3A9a50b

//LOCAL
//contract address : 0x4e49Df439274EAF53955A438682f93C31fE74398


module.exports = {


  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/935b72666cbf45089be0326b2c2fc1c3`),
      network_id: 3,       // Ropsten's id
      gas: 4500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/935b72666cbf45089be0326b2c2fc1c3`),
      network_id: 1,       // Ropsten's id
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
