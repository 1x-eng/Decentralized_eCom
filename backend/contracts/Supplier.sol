/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @create date 2018-09-20 16:50:12
 * @modify date 2018-09-20 16:50:12
 * @desc Supplier in our E-Com platform.
*/
pragma solidity ^0.4.17;
// We have to specify what version of compiler this code will compile with

contract Supplier {

  /* Events */
  event ItemAdded(uint idItem);
  event ProcessAnOrder(uint idOfCustomer, uint idOrder, bool status);

  struct Item {
    uint idItem;
    bytes32 itemName;
    uint price;
  }

  struct Orderlog {
    uint idOfCustomer;
    uint idOrder; 
    bool status;
  }

  // STATE Variables.
  uint numberOfItemsAvailableForSale;
  uint numberOfOrdersProcessed;

  // Mappings 
  mapping (uint => Item) items;
  mapping (uint => Orderlog) orderLogs;


  /* TRANSACTIONS */
  function addItem(bytes32 itemName, uint price) public {
    uint idItem = numberOfItemsAvailableForSale++;
    items[idItem] = Item(idItem, itemName, price);
    emit ItemAdded(idItem);
  }

  function processOrder(uint idOrder, uint idCustomer) public {
    orderLogs[idOrder] = Orderlog(idCustomer, idOrder, true);
    numberOfOrdersProcessed ++;
    emit ProcessAnOrder(idCustomer, idOrder, true);
  }

  /* GETTERS */
  function getItem(uint idItem) view public returns (bytes32, uint){
    /*returns itemName and its price*/
    return (items[idItem].itemName, items[idItem].price);
  }

  function getStatus(uint idOrder) view public returns (bool) {
    /*returns completion status*/
    return (orderLogs[idOrder].status);
  }

  function getTotalNumberOfAvailableItems() view public returns (uint) {
    return numberOfItemsAvailableForSale;
  }

  function getTotalNumberOfOrdersProcessed() view public returns (uint){
    return numberOfOrdersProcessed;
  }

}