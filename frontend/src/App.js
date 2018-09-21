import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { supplierContract, customerContract, web3 } from "./EthereumSetup";
import CustomersClient from './Customers';
import SuppliersClient from './Suppliers';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Decentralized E-Commerce!</h1>
          <p>Powered by Ethereum!</p>
        </Jumbotron>
        {/* STEPS:
          1. Add items for sale by supplier.
          2. Display them in customer section.
          3. Purchase an Item from customer section.
          4. Display purchaseOrder in Supplier section.
          5. Complete order in Supplier section.
          6. Show order completed in Customer section.
        */}
        <Grid>
            <Row className="show-grid">
                <Col xs={12} md={6}>
                  <CustomersClient />>
                </Col>
                <Col xs={12} md={6}>
                  <SuppliersClient />>
                </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
