import '../styles/app.css';

import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

import crudAppArtifact from '../../build/contracts/CrudApp.json';

const CrudApp = contract(crudAppArtifact);

let accounts;
let account;

const App = {
  start: function () {
    CrudApp.setProvider(web3.currentProvider);
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }
      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }
      console.log(accs.length)

      accounts = accs;
      account = accounts[0];
    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status');
    status.innerHTML = message;
  },

  doInsert: async function () {
    const self = this;
    self.setStatus('');
    const countryName = document.getElementById('countryName').value;
    const leader = document.getElementById('leader').value;
    const population = parseInt(document.getElementById('population').value);

    const instance = await CrudApp.deployed();
    await instance.doInsert(countryName, leader, population, { from: account });

    self.setStatus('Insert complete!');
  },

  getOneByCountryName: async function () {
    const countryName = document.getElementById('countryName').value;
    $("#myTable tbody").empty();
    const instance = await CrudApp.deployed();
    const data = await instance.getOneByCountryName(countryName)

    console.log(data)

    $("#myTable tbody:last").append("<tr id='row_" + data[0] + "'><td>" + data[0] + "</td><td>" + data[1] + "</td><td>" + data[2].toNumber() + "</td><td><button class=\"btn btn-danger btn-sm\" id=\"getOneByCountryName\" onclick=\"App.doDeleteOneByCountryName('" + data[0] + "')\">-</button></td></tr>'");
  },

  getTotalCountry: async function () {
    $("#myTable tbody:last").empty();
    const instance = await CrudApp.deployed();
    const data = await instance.getTotalCountries(countryName, { from: account, gas: 9000000 })
    console.log(data.toNumber());
    alert("등록된 나라는 총 : " + data.toNumber() + "개 입니다.");
  },

  doUpdateOneByCountryName: async function () {
    const countryName = document.getElementById('countryName').value;
    const leader = document.getElementById('leader').value;
    $("#myTable tbody:last").empty();
    const instance = await CrudApp.deployed();
    const data = await instance.doUpdateLeader(countryName, leader, { from: account });
    console.log(data)
  },

  doDeleteOneByCountryName: async function (countryName) {
    const self = this;
    const instance = await CrudApp.deployed();
    await instance.doDeleteCountry(countryName, { from: account });

    $("#row_" + countryName).hide();
    self.setStatus('Transaction complete!');
  },
  getList: async function () {
    const self = this;

    const instance = await CrudApp.deployed();
    const item = await instance.getList();
    self.setStatus('Transaction complete!');
    console.log(item)

    // CrudApp.deployed().then(function (instance) {
    //   instance.getList({ from: account })
    //     .then(function (item) {
    //       item.forEach(function (element) {
    //         instance.getOneById(element, { from: account })
    //           .then(function (data) {
    //             $("#myTable tbody:last").append("<tr id='row_" + data[0] + "'><td>" + data[0] + "</td><td>" + data[1] + "</td><td>" + data[2].toNumber() + "</td><td><button class=\"btn btn-danger btn-sm\" id=\"getOneByCountryName\" onclick=\"App.doDeleteOneByCountryName('" + data[0] + "')\">-</button></td></tr>'");
    //           })
    //       });
    //     })
    // }).then(function () {
    //   self.setStatus('Transaction complete!');
    // }).catch(function (e) {
    //   console.log(e);
    //   self.setStatus('Error sending coin; see log.');
    // })
  },
  getMany: async function () {
    $("#myTable tbody").empty();
    const instance = await CrudApp.deployed();
    const item = await instance.getMany({ from: account });
    item.forEach(async function (element) {
      const data = await instance.getOneById(element, { from: account })
      console.log(data)
      $("#myTable tbody:last").append("<tr id='row_" + data[0] + "'><td>" + data[0] + "</td><td>" + data[1] + "</td><td>" + data[2].toNumber() + "</td><td><button class=\"btn btn-danger btn-sm\" id=\"getOneByCountryName\" onclick=\"App.doDeleteOneByCountryName('" + data[0] + "')\">-</button></td></tr>'");
    });

  },
  getTest1: async function () {
    alert('111')
    const instance = await CrudApp.deployed();
    await instance.addString('USA1', { from: account });
  },
  getTest2: async function () {
    alert('111')
    const instance = await CrudApp.deployed();
    const dddd = await instance.getStrings();
    console.log("dddd--------------------------")
    console.log(dddd)
  }
}

window.App = App;

window.addEventListener('load', async function () {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  App.start();
})
