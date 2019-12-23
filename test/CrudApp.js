const CrudApp = artifacts.require('CrudApp');

contract('CrudApp', function() {

  it('should insert new user', async () => {

    const crudApp = await CrudApp.deployed();
    await  crudApp.doInsert('USA1', 'Trumpq', 30000000);
    const count = await crudApp.getTotalCountries();

    assert(count.toNumber()  ===  1);
  });

});
