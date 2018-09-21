/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.bk@anz.com
 * @create date 2018-09-21 13:08:57
 * @modify date 2018-09-21 13:08:57
 * @desc Client side ocde for connecting Customers to Ethereum backend!
 */

import React, { Component } from React;
import { supplierContract, customerContract, web3 } from "./EthereumSetup";
import { Grid, Row, Col, Panel, Tabs, Tab, FormGroup, InputGroup, Button, FormControl, Well, ControlLabel,  Media, Checkbox, Label } from 'react-bootstrap';

class CustomersClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supplierContract_blockchainRecordedItemIds: [],
            customerContract_blockchainRecordedPurchaseOrderIds: []
        };

        /* event listeners */
        this.supplierContract_itemAddedEvents = supplierContract.ItemAdded({}, {
            fromBlock: 0,
            toBlock: 'latest'
        });

        this.customerContract_orderRaisedEvents = customerContract.OrderRaised({}, {
            fromBlock: 0,
            toBlock: 'latest'
        });

        /* Getters */
        this.supplierContract_getItem = this.supplierContract_getItem.bind(this);
        this.supplierContract_getStatus = this.supplierContract_getStatus.bind(this);
        this.customerContract_getOrderDetails = this.customerContract_getOrderDetails.bind(this);
        this.customerContract_getNumberOfItemsPurchased = this.customerContract_getNumberOfItemsPurchased.bind(this);
        this.customerContract_getNumberOfItemsReceived = this.customerContract_getNumberOfItemsReceived.bind(this);

        /* transactions */
        this.customerContract_purchaseItem = this.customerContract_purchaseItem.bind(this);
        this.customerContract_recieveItem = this.customerContract_recieveItem.bind(this);

        this.triggerCustomerContractEventListeners = this.triggerCustomerContractEventListeners.bind(this);
    }

    triggerCustomerContractEventListeners() {

        this.supplierContract_itemAddedEvents.watch((err, eventLogs) => {
            if (err) {
                console.error('[Event Listener Error]', err);
            } else {
                console.log('[Event Logs]', eventLogs);
                this.setState({
                    supplierContract_blockchainRecordedItemIds: [...this.state.supplierContract_blockchainRecordedItemIds,
                        parseInt(eventLogs.args.idItem.toString())
                    ]
                });
            }
        });

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
        });
    }

    supplierContract_getItem(idItem) {
        return supplierContract.getItem.call(idItem);
    }
    supplierContract_getStatus(idOrder) {
        return supplierContract.getStatus.call(idOrder);
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
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                            <Panel>
                                <Panel.Heading>Customer Section</Panel.Heading>
                                <Panel.Body>
                                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                    <Tab eventKey={1} title="Market">
                                        {this.state.supplierContract_blockchainRecordedItemIds.map(itemId => {
                                            let itemDetails = this.supplierContract_getItem(itemId);
                                            return (
                                                <div>
                                                    <Panel onClick={() => this.purchaseThisItem({
                                                        'id': itemId,
                                                        'itemName': web3.toAscii(String(itemDetails).split(',')[0]),
                                                        'price': parseInt(String(itemDetails).split(',')[1]),
                                                        'quantity': 1
                                                    })}>
                                                        <Panel.Heading>HOT SALE! <small>Click to purchase!</small></Panel.Heading>
                                                        <Panel.Body>
                                                            {web3.toAscii(String(itemDetails).split(',')[0])} - ${parseInt(String(itemDetails).split(',')[1])}
                                                        </Panel.Body>
                                                    </Panel>
                                                </div>
                                            );
                                        })}
                                    </Tab>
                                    <Tab eventKey={2} title="Order(s)">
                                        <h4>Order details</h4>
                                        <Table striped bordered condensed hover>
                                            <thead>
                                                <tr>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                <th>Order Completed</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.customerContract_blockchainRecordedPurchaseOrderIds.map(orderId => {
                                                const orderDetails = this.customerContract_getOrderDetails(orderId);
                                                return (<tr onClick={this.supplierContract_processOrder}>
                                                    <td>
                                                    {orderId}
                                                    </td>
                                                    <td>
                                                    'John Snow'
                                                    </td>
                                                    <td>
                                                    {orderDetails.itemName}
                                                    </td>
                                                    <td>
                                                    {orderDetails.quantity}
                                                    </td>
                                                    <td>
                                                    {orderDetails.status}
                                                    </td>
                                                </tr>);
                                                }
                                            )}
                                            </tbody>
                                            </Table>
                                    </Tab>
                                    </Tabs>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default CustomersClient;