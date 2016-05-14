/*
  Fish
*/

import React from 'react';
import h from '../helpers';

var Fish = React.createClass({

  addToOrder: function() {
    this.props.addToOrder(this.props.index);
  },

  render: function() {
    var details = this.props.details;
    var isAvailable = (details.status === 'available' ? true : false);
    var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!')
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.addToOrder}>{buttonText}</button>
      </li>
    )
  }
})

export default Fish;
