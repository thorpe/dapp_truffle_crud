// Allows us to use ES6 in our migrations and tests.
require('babel-register');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      gas: 6721975,
      network_id: "*"

    }
  }
};
