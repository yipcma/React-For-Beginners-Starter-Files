/*
  App
*/

import React from 'react';
import Catalyst from 'react-catalyst';
import autobind from 'autobind-decorator';
import reactMixin from 'react-mixin';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

// firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://sizzling-heat-7867.firebaseio.com/')

@autobind
class App extends React.Component {
  // set the state as App first runs
  constructor(){
    super();

    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentDidMount() {
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    })
    var localStorageRef = localStorage.getItem('order-'+ this.props.params.storeId)
    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('order-'+ this.props.params.storeId, JSON.stringify(nextState.order));
  }

  loadSamples() {
  this.setState({fishes: require('../sample-fishes')})
  }

  addFish(fish) {
    var timestamp = (new Date()).getTime();
    //update state object
    this.state.fishes['fish-' + timestamp] = fish;
    //set state
    this.setState({fishes: this.state.fishes});
  }

  addToOrder(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order: this.state.order});
  }

  removeFish(key) {
    if (confirm('Are you sure to remove this fish?')) {
      this.state.fishes[key] = null;
      this.setState({fishes: this.state.fishes});
    }
  }

  removeFromOrder(key) {
    delete this.state.order[key];
    this.setState({order: this.state.order});
  }

  renderFish(key) {
    return (
      <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
    )
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish}/>
      </div>
    );
  }
};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
