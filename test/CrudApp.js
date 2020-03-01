const CrudApp = artifacts.require('CrudApp');

contract('CrudApp', function() {

  it('should insert new user', async () => {
    const crudApp = await CrudApp.deployed();
    await crudApp.doInsert('USA1', 'Trumpq', 30000000);
    await crudApp.doInsert('USA2', '11', 30000000);
    await crudApp.doInsert('USA3', '22', 30000000);
    await crudApp.doInsert('USA4', '33', 30000000);
    const count = await crudApp.getTotalCountries();
    assert(count.toNumber()  ===  4);
  });

  it('should insert new user2', async () => {
    const crudApp = await CrudApp.deployed();
    const info = await crudApp.getOneByCountryName("USA1");
    console.log(info)
  });

});
