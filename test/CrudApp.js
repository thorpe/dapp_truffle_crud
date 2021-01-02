const CrudApp = artifacts.require('CrudApp');

contract('CrudApp', function() {

  it('=====================', async () => {
    const crudApp = await CrudApp.deployed();
    await crudApp.doInsert('USA1', 'aaaa', 1);
    await crudApp.doInsert('USA2', 'bbbb', 4);
    await crudApp.doInsert('USA3', 'cccc', 5);
    await crudApp.doInsert('USA4', 'dddd', 6);

    console.log("aaaa--------------------------")
    console.log(await crudApp.getOneByCountryName('USA1'))
    console.log("aaaa--------------------------")
    console.log(await crudApp.getOneByCountryName('USA4'))
    //
    // console.log("aaaa--------------------------")
    // console.log(await crudApp.getData())
    //
    // console.log("bbbb--------------------------")
    // console.log(await crudApp.getDynamicData())
    //
    // console.log("cccc--------------------------")
    // console.log(await crudApp.getList())
    //
    // console.log("dddd--------------------------")
    // console.log(await crudApp.getMany())
    //
    // console.log("eeee--------------------------")
    // console.log(await crudApp.getOneById(5))
  });
  //
  //
  // it('getStrings', async () => {
  //   const crudApp = await CrudApp.deployed();
  //   await crudApp.addString('USA1');
  //   await crudApp.addString('USA2');
  //   await crudApp.addString('USA3');
  //
  //   console.log("dddd--------------------------")
  //   console.log(await crudApp.getStrings())
  //
  // });
  //
  //
  // it('compareStrings', async () => {
  //   const crudApp = await CrudApp.deployed();
  //   console.log("dddd--------------------------")
  //   console.log(await crudApp.compareStrings('USA1','USA1'))
  //
  // });

});
