# Crud Example With Truffle
This is Example code of Smart contract on ERC20.


## Installation

1. Install Truffle and Ganache globally.
 ```javascript
npm install -g truffle
npm install -g ganache-cli
ganache-cli
 ```

2. Download and Install Application.
 ```javascript
git clone https://github.com/thorpe/dapp_truffle_crud.git
cd dapp_truffle_crud
npm install
 ```

3. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
```javascript
truffle compile
truffle migrate
```
4. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated. you have to accept this port in firwall rules
 ```javascript
// Serves the front-end on http://YOURIPADDRESS:8080
npm run dev
 ```

5. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
```javascript
truffle test
```

6. go to webpage
```javascript
http://localhost:8080/
```
