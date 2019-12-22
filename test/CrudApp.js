const CrudApp = artifacts.require('CrudApp');

contract('CrudApp', function() {

  it('should insert new user', async () => {

    const crudApp = CrudApp.deployed();
    await crudApp.doInsert('USA1', 'Trumpq', 30000000);

  });

});
