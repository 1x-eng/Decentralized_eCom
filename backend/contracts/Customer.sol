/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @create date 2018-09-20 16:50:12
 * @modify date 2018-09-20 16:50:12
 * @desc Customer in our E-Com platform.
*/

contract Customer {

  /* Events */
  event OrderRaised(uint idOrder);

  struct Customer {
    uint idCustomer;
    bytes32 customerName;
  }

  struct Orderlog {
    uint idOrder;
    uint idCustomer;
    bytes32 itemName;
    uint quantity;
    bool status;
  }

  // STATE Variables.
  uint numberOfItemsPurchased;
  uint numberOfItemsReceived;

  // Mappings 
  mapping (uint => Customer) customers;
  mapping (uint => Orderlog) orderLogs;

  /* Constructor */
  function Customer() public {
      /* For the case of demo, adding a customer in constructor. You can take this idea and extend the contract to contain addCustomer section and hence maintain customerDB in the Blockchain! */
      customers[0] = Customer(1, "John Snow");
  }

  /* TRANSACTIONS */
  function purchaseItem(bytes32 itemName, uint quantity) public {
    uint idOrder = numberOfItemsPurchased++;
    orderLogs[idOrder] = Orderlog(idOrder, 0, itemName, quantity, false);
    emit OrderRaised(idOrder);
  }

  function recieveItem(uint idOrder) public {
      numberOfItemsRecieved++;
      orderLogs[idOrder].status = true;
  }

  /* GETTERS */
  function getOrderDetails(uint idOrder) view public returns (bytes32, uint, bool){
    /*returns itemName, quantity & completionStatus*/
    return (orderLogs[idOrder].itemName, orderLogs[idOrder].quantity, orderLogs[idOrder].status);
  }

  function getNumberOfItemsPurchased() view public returns (uint) {
    return numberOfItemsPurchased;
  }

  function getNumberOfItemsReceived() view public returns (uint) {
    return numberOfItemsReceived;
  }

}