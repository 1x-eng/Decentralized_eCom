# Decentralized E-Commerce using ETHEReact!

![alt text](https://github.com/PruthviKumarBK/Decentralized_eCom/blob/master/ETHEReact.png)

# Description
ETHEReact is a full-stack DApp, showcasing e-commerce capabilities without relying on any traditional database for the backend. Instead, it utilizes the Ethereum Virtual Machine (EVM) as its backbone. While not a product in itself, it serves as an idea for aspiring blockchain enthusiasts to explore the full potential of decentralized applications, from end to end.

- This app utilizes Truffle-powered testrpc (also known as ganache) for local development. 
- Web3 serves as the bridge between Ethereum and ReactJS

# Setup
- Install the latest version of [NodeJS](https://nodejs.org/en/)
- Install `truffle` globally using `npm install -g truffle` 
- Install Ethereum RPC globally using `npm install -g ethereumjs-testrpc` 
- Clone this Repo using `git clone https://github.com/PruthviKumarBK/Decentralized_eCom.git` 
- `cd Decentralized_eCom` 
- Below is the command sequence to be executed in the terminal or command prompt:
  ```
  cd backend
  testrpc -l 9000000000 -p 8484
  ```
  This will navigate to the 'backend' directory and instantiate a testrpc server with the specified gas limit and port. Make sure to leave the server running for Ethereum to be operational on your local development machine.

*  Change directory to 'backend' and compile the Solidity contracts, then migrate them to your Ethereum server. Depending on your setup, you might use Truffle commands like truffle compile and truffle migrate to achieve this."
    * `truffle compile` (On Windows 10, `truffle.cmd compile`)
    * `truffle migrate` (On Windows 10, `truffle.cmd migrate`)
    * `truffle console` (On Windows 10, `truffle.cmd console`)
        * In console, retrieve SHA256 addresses for `Supplier.sol` and `Customer.sol` contracts.
        * We can get that using `Supplier.address`
            * Copy this SHA256 string. We will need this later. [TAG - Supplier SHA256]
        * Get Customer contract address using `Customer.address` 
            * Copy this SHA256, We will need this later. [TAG - Customer SHA256]

* Now, let's get the front end functional.
* Open the file named 'EthereumSetup.js' (`Decentralized_eCom/frontend/src/EthereumSetup.js`)
    * Copy `SupplierAddress` from [TAG - Supplier SHA256] step to line number 13. (`let supplierAddress = '<YOUR SHA256 Address for Supplier Contract>'`)
    * Copy `CustomerAddress` from [TAG - Customer SHA256] step to line number 14. (`let customerAddress = '<YOUR SHA256 Address for Customer Contract>').
    * Save file `EthereumSetup.js`
* Open a new terminal/cmd, navigate to the current working directory, and then change directory to 'frontend' using the command: `cd frontend`.
* `npm install`
* `npm start`

Welcome to decentralized e-commerce! While the UI may appear basic, it showcases the entire process: Supplier adding a product to the marketplace -> Customer making a purchase -> Supplier shipping the order -> Customer acknowledging delivery. And all of this happens on the blockchain! Exciting stuff!

# LICENCE
MIT License

Copyright (c) 2018 Pruthvi Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
