var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

/*
  App
*/
var App = React.createClass({
// set the state as App first runs
getInitialState: function() {
  return {
    fishes: {},
    order: {}
  }
},

loadSamples: function() {
  this.setState({fishes: require('./sample-fishes')})
},

addFish: function(fish) {
    var timestamp = (new Date()).getTime();
    //update state object
    this.state.fishes['fish-' + timestamp] = fish;
    //set state
    this.setState({fishes: this.state.fishes});
},

  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
});

/*
  Header
*/
var Header = React.createClass({

  render: function() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
            </span>
          Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    );
  }
});

/*
  Order
*/
var Order = React.createClass({
  render: function() {
    return (
      <p>Order</p>
    );
  }
});

/*
  Inventory
*/
var Inventory = React.createClass({

  render: function() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Samples</button>;
      </div>
    );
  }
});

/*
  StorePicker
*/

var StorePicker = React.createClass({

  mixins: [History],

  goToStore : function(event) {
    event.preventDefault();
    //get data from input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
  },

  render: function() {
    var name = 'wes';

    return (
      <form className="store-selector" onSubmit={this.goToStore}>
      {/* jsx comment here */}
        <h2>Please enter a store, {name}</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    );
  }
});

/*
  Not-found
*/

var NotFound = React.createClass({

   render: function() {
     return (
       <h1>Not Found</h1>
     );
   }
});

/*
  AddFishForm
*/

var AddFishForm = React.createClass({

createFish: function(event) {
  //1. Prevent refreshing
  event.preventDefault();

  //2. create fish object
  var fish = {
    name: this.refs.name.value,
    price: this.refs.price.value,
    status: this.refs.status.value,
    desc: this.refs.desc.value,
    image: this.refs.image.value
  }
  //3. add fish to App state (need to pass addFish using props from App to Inventory to AddFishForm)
  // can also use spread {...this.props} instead of addFish={this.props.addFish}
  this.props.addFish(fish);
  this.refs.fishForm.reset();
},

  render: function() {
    return(
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
})

/*
  Routers
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
