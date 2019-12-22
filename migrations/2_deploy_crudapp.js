const CrudApp = artifacts.require('CrudApp');

module.exports = function(deployer) {
  deployer.deploy(CrudApp);
};
