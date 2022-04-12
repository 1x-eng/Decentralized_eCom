# Decentralized E-Commerce using ETHEReact!

![alt text](https://github.com/PruthviKumarBK/Decentralized_eCom/blob/master/ETHEReact.png)

# Description
ETHEReact is a full stack DApp; demonstrating e-commerce capabilities without any database powering the backend but the EVM standing tall! This is not a product in iteself but an idea for aspiring blockchain enthusiasts to uncover the potential; end-to-end!

- This app is comprised of Truffle powered `testrpc` (which is also called `ganache`) facilitating local development.
- Web3 bridges Ethereum to ReactJS!

# Setup
- Install latest version of [NodeJS](https://nodejs.org/en/)
- Install `truffle` globally using `npm install -g truffle` 
- Install Ethereum RPC globally using `npm install -g ethereumjs-testrpc` 
- Clone this Repo using `git clone https://github.com/PruthviKumarBK/Decentralized_eCom.git` 
- `cd Decentralized_eCom` 
- Open a terminal/cmd and navigate to current working directory and cd into 'backend'. `cd backend`, instantiate testrpc server using `testrpc -l 9000000000 -p 8484`. ('-l' indicates available gas limit for the network. In test networks, this is at developer's discretion. '-p' indicate the port). You should now have Ethereum running on your local development machine. Leave that running!
*  Open another terminal/cmd and navigate to current working directory and again, cd into 'backend'. `cd backend`. You will now need to compile solidity contracts, migrate them to your Ethereum Server before front end is started.
    * `truffle compile` (On Windows 10, `truffle.cmd compile`)
    * `truffle migrate` (On Windows 10, `truffle.cmd migrate`)
    * `truffle console` (On Windows 10, `truffle.cmd console`)
        * Within console, we need the address (SHA256) address of 'Supplier.sol' & 'Customer.Sol' solidity contracts.
        * We can get that using `Supplier.address`
            * Copy the SHA256 string safely. We will need this later. [TAG - Supplier SHA256]
        * Get Customer contract address using `Customer.address` 
            * Copy the SHA256 safely, We will need this later. [TAG - Customer SHA256]

* Now, lets get the front end functional!
* Open the file named 'EthereumSetup.js' (`Decentralized_eCom/frontend/src/EthereumSetup.js`)
    * Copy `SupplierAddress` from [TAG - Supplier SHA256] step to line number 13. (`let supplierAddress = '<YOUR SHA256 Address for Supplier Contract>'`)
    * Copy `CustomerAddress` from [TAG - Customer SHA256] step to line number 14. (`let customerAddress = '<YOUR SHA256 Address for Customer Contract>').
    * Save file `EthereumSetup.js`
* Open a new terminal/cmd and navigate to current working directory and cd into 'frontend'. `cd frontend` 
* `npm install`
* `npm start` to bring the front end to life!

Welcome to e-commerce on a decentralized platform! The UI is pretty bare bone. But, nonetheless, it demonstrates a full swing of capabilities from Supplier adding a product to market place -> Customer making a purchase -> Supplier Shipping the order -> Customer acknowledging the delivery! All of this on a BLOCKCHAIN! Pretty exciting! 

I would love to learn what you build from here with this little foundation in place. 

# LICENCE
MIT License

Copyright (c) 2018 Pruthvi Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
