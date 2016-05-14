/*
  StorePicker
*/

import React from 'react';
import {History} from 'react-router';
import h from '../helpers';

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

export default StorePicker;
