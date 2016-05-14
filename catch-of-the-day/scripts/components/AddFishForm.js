/*
  AddFishForm
*/

import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class AddFishForm extends React.Component {

createFish(event) {
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
}

  render() {
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
    );
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;
