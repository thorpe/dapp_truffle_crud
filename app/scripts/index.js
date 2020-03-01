import '../styles/app.css';

import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract';

import crudAppArtifact from '../../build/contracts/CrudApp.json';

const CrudApp = contract(crudAppArtifact);

let accounts;
let account;

const App = {
    start: function () {
        const self = this;
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

    doInsert: function () {
        const self = this;
        const countryName = document.getElementById('countryName').value;
        const leader = document.getElementById('leader').value;
        const population = parseInt(document.getElementById('population').value);

        CrudApp.deployed().then(function (instance) {
            instance.doInsert(countryName, leader, population, {from: account});
            self.setStatus('Transaction complete!');
        }).then(function () {
            self.setStatus('Transaction complete!');
        }).catch(function (e) {
            console.log(e);
            self.setStatus('Error sending coin; see log.');
        })
    },

    getOneByCountryName: function () {
        const self = this;
        const countryName = document.getElementById('countryName').value;
        CrudApp.deployed().then(function (instance) {
            instance.getOneByCountryName(countryName, {from: account, gas: 9000000})
                .then(function (data) {
                    console.log(data);
                    $("#myTable tbody:last").append("<tr id='row_" + data[0] + "'><td>" + data[0] + "</td><td>" + data[1] + "</td><td>" + data[2].toNumber() + "</td><td><button class=\"btn btn-danger btn-sm\" id=\"getOneByCountryName\" onclick=\"App.doDeleteOneByCountryName('" + data[0] + "')\">-</button></td></tr>'");
                })
        }).then(function () {
            self.setStatus('Transaction complete!');
        }).catch(function (e) {
            console.log(e);
            self.setStatus('Error sending coin; see log.');
        })
    },

    getTotalCountry: function () {
        CrudApp.deployed().then(function (instance) {
            instance.getTotalCountries({from: account}).then(function (data) {
                alert("등록된 나라는 총 : " + data.toNumber() + "개 입니다.");
            });
            console.log(a);
        }).then(function () {
            this.setStatus('Transaction complete!');
        }).catch(function (e) {
            console.log(e);
            this.setStatus('Error sending coin; see log.');
        })
    },

    doUpdateOneByCountryName: function () {
        const self = this;
        const countryName = document.getElementById('countryName').value;
        const leader = document.getElementById('leader').value;

        CrudApp.deployed().then(function (instance) {
            instance.doUpdateLeader(countryName, leader, {from: account});
        }).then(function () {
            self.setStatus('Transaction complete!');
        }).catch(function (e) {
            console.log(e);
            self.setStatus('Error sending coin; see log.');
        })
    },

    doDeleteOneByCountryName: function (countryName) {
        const self = this;
        CrudApp.deployed().then(function (instance) {
            instance.doDeleteCountry(countryName, {from: account});
            $("#row_" + countryName).hide();
        }).then(function () {
            self.setStatus('Transaction complete!');
        }).catch(function (e) {
            console.log(e);
            self.setStatus('Error sending coin; see log.');
        })
    },
    getMany: function () {
        const self = this;
        CrudApp.deployed().then(function (instance) {
            instance.getMany({from: account})
                .then(function (item) {
                    item.forEach(function (element) {
                        instance.getOneById(element, {from: account})
                            .then(function (data) {
                                $("#myTable tbody:last").append("<tr id='row_" + data[0] + "'><td>" + data[0] + "</td><td>" + data[1] + "</td><td>" + data[2].toNumber() + "</td><td><button class=\"btn btn-danger btn-sm\" id=\"getOneByCountryName\" onclick=\"App.doDeleteOneByCountryName('" + data[0] + "')\">-</button></td></tr>'");
                            })
                    });
                })
        }).then(function () {
            self.setStatus('Transaction complete!');
        }).catch(function (e) {
            console.log(e);
            self.setStatus('Error sending coin; see log.');
        })
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
