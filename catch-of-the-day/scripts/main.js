var React = require('react');
var ReactDOM = require('react-dom');
/*
  StorePicker
*/

var StorePicker = React.createClass({

  render: function() {
    var name = "wes";
    return (
      <form className="store-selector">
      {/* jsx comment here */}
        <h2>Please enter a store, {name}</h2>
        <input type="text" ref="storeId" required />
        <input type="Submit" />
      </form>
    );
  }
});

ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
