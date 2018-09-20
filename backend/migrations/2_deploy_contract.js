/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @create date 2018-09-20 17:27:07
 * @modify date 2018-09-20 17:27:07
 * @desc Deployment desscription for all available solidity contracts.
*/

var Supplier = artifacts.require("./Supplier.sol");
var Customer = artifacts.require("./Customer.sol");

module.exports = function(deployer) {

    /* IN TEST NETWORK, AMOUNT OF GAS IS AT DEVELOPER'S DISCRETION */
    deployer.deploy(Supplier, {gas: 1000000}).then(function(){
      console.log('********* Supplier is deployed! *********');
      /* PS: YOU COULD ALSO CREATE CONTRACT DEPENDENCIES HERE */
      return deployer.deploy(Customer, {gas: 1000000}).then(function(){
        console.log('********* Customer is deployed! *********');
      });
    });
  };
  