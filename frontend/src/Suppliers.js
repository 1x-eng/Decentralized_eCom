/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.bk@anz.com
 * @create date 2018-09-21 13:09:20
 * @modify date 2018-09-21 13:09:20
 * @desc Client side code for connecting Suppliers to Ethereum backend!
 */

import React, { Component } from 'react';
import { supplierContract, customerContract, web3 } from "./EthereumSetup";
import { Grid, Row, Col, Panel, Tabs, Tab, FormGroup, InputGroup, Button, FormControl, Table } from 'react-bootstrap';
import './App.css';


class SuppliersClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supplierContract_blockchainRecordedItemIds: [],
            supplierContract_blockchainRecordedPurchaseOrderServices: [],
            customerContract_blockchainRecordedPurchaseOrderIds: []
        }

        /* event listeners */
        this.supplierContract_itemAddedEvents = supplierContract.ItemAdded({}, {
            fromBlock: 0,
            toBlock: 'latest'
        });

        this.supplierContract_processAnOrderEvents = supplierContract.ProcessAnOrder({}, {
            fromBlock: 0,
            toBlock: 'latest'
        });

        this.customerContract_orderRaisedEvents = customerContract.OrderRaisedOrUpdated({}, {
            fromBlock: 0,
            toBlock: 'latest'
        });

        /* Getters */
        this.supplierContract_getTotalNumberOfAvailableItems = this.supplierContract_getTotalNumberOfAvailableItems.bind(this);
        this.supplierContract_getTotalNumberOfOrdersProcessed = this.supplierContract_getTotalNumberOfOrdersProcessed.bind(this);
        this.customerContract_getOrderDetails = this.customerContract_getOrderDetails.bind(this);

        /* transactions */
        this.supplierContract_addItem = this.supplierContract_addItem.bind(this);
        this.supplierContract_processOrder = this.supplierContract_processOrder.bind(this);
        this.customerContract_recieveItem = this.customerContract_recieveItem.bind(this);

        this.triggerSupplierContractEventListeners = this.triggerSupplierContractEventListeners.bind(this);
        this.addNewItemToMarketBySupplier = this.addNewItemToMarketBySupplier.bind(this);
    }

    componentDidMount(){
        this.triggerSupplierContractEventListeners();
    }

    triggerSupplierContractEventListeners() {
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
        })
        this.supplierContract_processAnOrderEvents.watch((err, eventLogs) => {
            if (err) {
                console.error('[Event Listener Error]', err);
            } else {
                console.log('[Event Logs]', eventLogs);
                this.setState({
                    supplierContract_blockchainRecordedPurchaseOrderServices: [...this.state.supplierContract_blockchainRecordedPurchaseOrderServices,
                        {
                            'idOfCustomer': parseInt(eventLogs.args.idOfCustomer.toString()),
                            'idOrder': parseInt(eventLogs.args.idOrder.toString()),
                            'status': eventLogs.args.status
                        }
                    ]
                });
            }
        })

        this.customerContract_orderRaisedEvents.watch((err, eventLogs) => {
            if (err) {
                console.error('[Event Listener Error]', err);
            } else {
                console.log('[Event Logs]', eventLogs);
                if (this.state.customerContract_blockchainRecordedPurchaseOrderIds.indexOf(parseInt(eventLogs.args.idOrder.toString()))  === -1){
                    this.setState({
                        customerContract_blockchainRecordedPurchaseOrderIds: [...this.state.customerContract_blockchainRecordedPurchaseOrderIds,
                            parseInt(eventLogs.args.idOrder.toString())
                        ]
                    });
                }
            }
        });
    }

    supplierContract_getTotalNumberOfAvailableItems() {
        return supplierContract.getTotalNumberOfAvailableItems.call();
    }
    supplierContract_getTotalNumberOfOrdersProcessed() {
        return supplierContract.getTotalNumberOfOrdersProcessed.call();
    }
    customerContract_getOrderDetails(idOrder) {
        return customerContract.getOrderDetails.call(idOrder);
    }

    supplierContract_addItem(itemName, price) {
        supplierContract.addItem(itemName, price, {
            from: web3.eth.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Supplier Contract] Error during adding new item to marketPlace', err);
            } else {
                console.log('[Supplier Contract] - New Item added to Marketplace', results.toString());
            }
        });
    }
    supplierContract_processOrder(idOrder, idCustomer) {
        supplierContract.processOrder(idOrder, idCustomer, {
            from: web3.eth.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Supplier Contract] Error during procesing an order', err);
            } else {
                console.log('[Supplier Contract] - order successfully processed by supplier', results.toString());
            }
        });
    }

    customerContract_recieveItem(idOrder) {
        customerContract.recieveItem(idOrder, {
            from: web3.eth.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Customer Contract] Error during recieving a processed item', err);
            } else {
                console.log('[Customer Contract] - Item successfully recieved by Customer', results.toString());
            }
        });
    }

    addNewItemToMarketBySupplier(e){
        e.preventDefault();
        const itemName = e.target.elements.itemName.value;
        const price = e.target.elements.price.value;
        this.supplierContract_addItem(itemName, price);
    }

    render(){
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                        <Panel>
                            <Panel.Heading>Supplier Section</Panel.Heading>
                            <Panel.Body>
                                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                    <Tab eventKey={1} title="Add Items to Market">
                                    <br/> <br/>
                                        <form onSubmit={this.addNewItemToMarketBySupplier}>
                                            <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Button>
                                                <Button>Item Name </Button>
                                                </InputGroup.Button>
                                                <FormControl ref="itemName" name="itemName" placeholder="eg. Toy / Shirt / CoffeeMug etc.," type="text"/>
                                            </InputGroup>

                                            <InputGroup>
                                                <InputGroup.Button>
                                                <Button>Price <small>(USD)</small></Button>
                                                </InputGroup.Button>
                                                <FormControl ref="price" name="price" placeholder="Price per unit in USD" type="number"/>
                                            </InputGroup>
                                            </FormGroup>

                                            <FormGroup>
                                            <Button bsStyle="primary" label="Login" id="loginButton" type="submit" active>Add to Market</Button>
                                            </FormGroup>
                                        </form>
                                    </Tab>
                                    <Tab eventKey={2} title="Process Order(s)">
                                        <h4>Order details</h4>
                                        <small>Click on Order to process/complete it!</small>
                                        <Table striped bordered condensed hover>
                                            <thead>
                                                <tr>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.customerContract_blockchainRecordedPurchaseOrderIds.map(orderId => {
                                                const orderDetails = this.customerContract_getOrderDetails(orderId);
                                                const orderedItemName = web3.toUtf8(String(orderDetails).split(',')[0]);
                                                const orderedItemQuantity = parseInt(String(orderDetails).split(',')[1]);

                                                return (<tr className="pointIt" onClick={() => this.supplierContract_processOrder(orderId, 1)}>
                                                    <td>
                                                    {orderId}
                                                    </td>
                                                    <td>
                                                    John Snow
                                                    </td>
                                                    <td>
                                                    {orderedItemName}
                                                    </td>
                                                    <td>
                                                    {orderedItemQuantity}
                                                    </td>
                                                </tr>);
                                                }
                                            )}
                                            </tbody>
                                            </Table>

                                            <h4>Pocessed Order(s)</h4>
                                            <Table striped bordered condensed hover>
                                                <thead>
                                                    <tr>
                                                    <th>Order ID</th>
                                                    <th>Customer Name</th>
                                                    <th>Order Completed</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.supplierContract_blockchainRecordedPurchaseOrderServices.map(po => {
                                                    return (<tr>
                                                        <td>
                                                        {po.idOrder}
                                                        </td>
                                                        <td>
                                                        John Snow
                                                        </td>
                                                        <td>
                                                        {po.status === true ? 'Completed' : 'InProgress'}
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
        )
    }

}

export default SuppliersClient;