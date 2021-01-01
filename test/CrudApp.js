const CrudApp = artifacts.require('CrudApp');

contract('CrudApp', function() {

  it('=====================', async () => {
    const crudApp = await CrudApp.deployed();
    await crudApp.doInsert('USA1', 'aaaa', 1);
    await crudApp.doInsert('USA1', 'bbbb', 2);
    await crudApp.doInsert('USA1', 'cccc', 3);
    await crudApp.doInsert('USA2', '11', 4);
    await crudApp.doInsert('USA3', '22', 5);
    await crudApp.doInsert('USA4', '33', 6);


    const aaaa = await crudApp.getData();
    console.log("--------------------------")
    console.log(aaaa)

    const bbbb = await crudApp.getDynamicData();
    console.log("--------------------------")
    console.log(bbbb)

    const cccc = await crudApp.getList();
    console.log("--------------------------")
    console.log(cccc)
  });


  it('=====================', async () => {
    const crudApp = await CrudApp.deployed();
    await crudApp.addString('USA1');
    await crudApp.addString('USA2');
    await crudApp.addString('USA3');

    const aaaa = await crudApp.getStrings();
    console.log("--------------------------")
    console.log(aaaa)

  });


});
