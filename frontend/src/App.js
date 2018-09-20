import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col, Jumbotron, Accordion, Panel, Tabs, Tab, FormGroup, InputGroup, Button, FormControl, Well, ControlLabel,  Media, Checkbox, Label } from 'react-bootstrap';
import { supplierContract, customerContract, web3 } from "./EthereumSetup";

class App extends Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
