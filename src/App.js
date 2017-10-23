import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api-com';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseLayers  : null,
      mixins      : null,
      seasonings  : null,
      condiments  : null,
      shells      : null
    }
  }

  componentWillMount() {
    Promise.all(api).then(values => {
      var obj = values.reduce((acc, curr) => {
        acc[curr.id] = curr.arr
        return acc
      }, {})

      this.setState({
        baseLayers  : obj.baseLayers,
        mixins      : obj.mixins,
        seasonings  : obj.seasonings,
        condiments  : obj.condiments,
        shells      : obj.shells
      })
    })
  }
  render() {
    console.log(this.state)
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