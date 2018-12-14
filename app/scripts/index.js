// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

import metaCoinArtifact from '../../build/contracts/MetaCoin.json'
import crudAppArtifact from '../../build/contracts/CrudApp.json'

const MetaCoin = contract(metaCoinArtifact)
const CrudApp = contract(crudAppArtifact)

let accounts
let account

const App = {
  start: function () {
    const self = this

    MetaCoin.setProvider(web3.currentProvider)
    CrudApp.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }

      accounts = accs
      account = accounts[0]

      self.refreshBalance()
    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  refreshBalance: function () {
    const self = this

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.getBalance.call(account, { from: account })
    }).then(function (value) {
      const balanceElement = document.getElementById('balance')
      balanceElement.innerHTML = value.valueOf()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting balance; see log.')
    })
  },

  sendCoin: function () {
    const self = this

    const amount = parseInt(document.getElementById('amount').value)
    const receiver = document.getElementById('receiver').value

    this.setStatus('Initiating transaction... (please wait)')

    let meta
    MetaCoin.deployed().then(function (instance) {
      meta = instance
      return meta.sendCoin(receiver, amount, { from: account })
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  doInsert: function () {
    const self = this
    const amount = parseInt(document.getElementById('amount').value)
    const receiver = document.getElementById('receiver').value
    const countryName = document.getElementById('countryName').value
    const leader = document.getElementById('leader').value
    const population = parseInt(document.getElementById('population').value)

    let crud
    this.setStatus('Initiating transaction... (please wait)')
    CrudApp.deployed().then(function (instance) {
      crud = instance
      crud.doInsert(countryName, leader, population, { from: account })
      return true
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  getOneByCountryName: function () {
    const self = this
    const countryName = document.getElementById('countryName').value

    let a
    let crud
    this.setStatus('Initiating transaction... (please wait)')
    CrudApp.deployed().then(function (instance2) {
      crud = instance2
      crud.getOneByCountryName(countryName, { from: account })
        .then(function (data) {
          a = data
          console.log(a)
        })
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  getTotalCountry: function () {
    const self = this

    let a
    let crud
    this.setStatus('getTotalCountry transaction... (please wait)')
    CrudApp.deployed().then(function (instance2) {
      crud = instance2
      a = crud.getTotalCountries({ from: account })
      console.log(a)
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },

  doUpdateOneByCountryName: function () {
    const self = this
    const countryName = document.getElementById('countryName').value
    const leader = document.getElementById('leader').value

    let a
    let crud
    this.setStatus('doUpdateOneByContryName transaction... (please wait)')
    CrudApp.deployed().then(function (instance2) {
      crud = instance2
      a = crud.doUpdateLeader(countryName, leader, { from: account })
      console.log(a)
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },
  doDeleteOneByCountryName: function () {
    const self = this
    const countryName = document.getElementById('countryName').value

    let a
    let crud
    this.setStatus('Initiating transaction... (please wait)')
    CrudApp.deployed().then(function (instance2) {
      crud = instance2
      a = crud.doDeleteCountry(countryName, { from: account })
      console.log(a)
    }).then(function () {
      self.setStatus('Transaction complete!')
      self.refreshBalance()
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error sending coin; see log.')
    })
  },
  getMany: function () {
  const self = this

  let a
  let crud
  this.setStatus('Initiating transaction... (please wait)')
  CrudApp.deployed().then(function (instance2) {
    crud = instance2
    crud.getMany({ from: account })
      .then(function (data) {
        a = data
        console.log(a)
      })
  }).then(function () {
    self.setStatus('Transaction complete!')
    self.refreshBalance()
  }).catch(function (e) {
    console.log(e)
    self.setStatus('Error sending coin; see log.')
  })
}
}

window.App = App

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider)
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
  }
  App.start()
})
