/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.bk@anz.com
 * @create date 2018-09-21 13:08:57
 * @modify date 2018-09-21 13:08:57
 * @desc Client side ocde for connecting Customers to Ethereum backend!
 */

import React, {
    Component
} from React;
import {
    customerContract,
    web3
} from "./EthereumSetup";

class CustomersClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerContract_blockchainRecordedPurchaseOrderIds: []
        };

        /* event listeners */
        this.customerContract_orderRaisedEvents = customerContract.OrderRaised({}, {
            fromBlock: 0,
            toBlock: 'latest'
        });

        /* Getters */
        this.customerContract_getOrderDetails = this.customerContract_getOrderDetails.bind(this);
        this.customerContract_getNumberOfItemsPurchased = this.customerContract_getNumberOfItemsPurchased.bind(this);
        this.customerContract_getNumberOfItemsReceived = this.customerContract_getNumberOfItemsReceived.bind(this);

        /* transactions */
        this.customerContract_purchaseItem = this.customerContract_purchaseItem.bind(this);
        this.customerContract_recieveItem = this.customerContract_recieveItem.bind(this);

        this.triggerCustomerContractEventListeners = this.triggerCustomerContractEventListeners.bind(this);
    }

    triggerCustomerContractEventListeners() {
        this.customerContract_orderRaisedEvents.watch((err, eventLogs) => {
            if (err) {
                console.error('[Event Listener Error]', err);
            } else {
                console.log('[Event Logs]', eventLogs);
                this.setState({
                    customerContract_blockchainRecordedPurchaseOrderIds: [...this.state.customerContract_blockchainRecordedPurchaseOrderIds,
                        parseInt(eventLogs.args.idOrder.toString())
                    ]
                });
            }
        })
    }

    customerContract_getOrderDetails(idOrder) {
        return customerContract.getOrderDetails.call(idOrder);
    }
    customerContract_getNumberOfItemsPurchased() {
        return customerContract.getNumberOfItemsPurchased.call();
    }
    customerContract_getNumberOfItemsReceived() {
        return customerContract.getNumberOfItemsReceived.call();
    }

    customerContract_purchaseItem(itemName, quantity) {
        customerContract.purchaseItem(itemName, quantity, {
            from: web3.eth.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Customer Contract] Error during purchasing an item', err);
            } else {
                console.log('[Customer Contract] - item purchased', results.toString());
            }
        });
    }

    customerContract_recieveItem(idOrder) {
        customerContract.recieveItem(idOrder, {
            from: web3.eth.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Customer Contract] Error during recieving ordered item', err);
            } else {
                console.log('[Customer Contract] - item recieved successfully!', results.toString());
            }
        });
    }

    render(){
        return (
            <div>
                CUSTOMER SECTION UNDER CONSTRUCTION
            </div>
        );
    }

}

export default CustomersClient;