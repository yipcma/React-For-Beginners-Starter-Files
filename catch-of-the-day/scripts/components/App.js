/*
  App
*/

import React from 'react';
import Catalyst from 'react-catalyst';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

// firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://sizzling-heat-7867.firebaseio.com/')


var App = React.createClass({
  // make mixins with catylst
  mixins: [Catalyst.LinkedStateMixin],

  // set the state as App first runs
  getInitialState: function() {
  return {
    fishes: {},
    order: {}
    }
  },

  componentDidMount: function() {
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    })
    var localStorageRef = localStorage.getItem('order-'+ this.props.params.storeId)
    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)});
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    localStorage.setItem('order-'+ this.props.params.storeId, JSON.stringify(nextState.order));
  },

  loadSamples: function() {
  this.setState({fishes: require('../sample-fishes')})
  },

  addFish: function(fish) {
    var timestamp = (new Date()).getTime();
    //update state object
    this.state.fishes['fish-' + timestamp] = fish;
    //set state
    this.setState({fishes: this.state.fishes});
  },

  addToOrder: function(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order: this.state.order});
  },

  removeFish: function(key) {
    if (confirm('Are you sure to remove this fish?')) {
      this.state.fishes[key] = null;
      this.setState({fishes: this.state.fishes});
    }
  },

  removeFromOrder: function(key) {
    delete this.state.order[key];
    this.setState({order: this.state.order});
  },

  renderFish: function(key) {
    return (
      <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
    )
  },

  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState} removeFish={this.removeFish}/>
      </div>
    );
  }
});

export default App;
