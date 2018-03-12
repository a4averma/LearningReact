import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Item from './Item';
import { clear } from '../helpers';
import sampleItems from '../items';
import base from '../base';

export default class App extends React.Component {
  state = {
    items: {},
    order: {}
  };

  componentWillMount() {
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/items`, {
      context: this,
      state: 'items'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addItem = item => {
    //Copy of state
    const items = { ...this.state.items };

    //Add our new item
    items[`item${Date.now()}`] = item;

    //Update
    this.setState({
      items
    });

    console.log(this.state.items);
  };

  updateItem = (key, updatedItem) => {
    const items = { ...this.state.items };

    items[key] = updatedItem;

    this.setState({ items });
  };

  deleteItem = key => {
    const items = { ...this.state.items };

    items[key] = null;

    this.setState({ items });
  };

  loadSampleItems = () => {
    this.setState({
      items: sampleItems
    });
  };

  addToOrder = key => {
    // Copy of state
    const order = { ...this.state.order };
    //Add to order or update the number
    order[key] = order[key] + 1 || 1;
    //call setState
    this.setState({ order });
  };

  deleteOrder = key => {
    const order = { ...this.state.order };

    delete order[key];

    this.setState({ order });
  };

  render() {
    return (
      <div className="container">
        <Header tagline={clear(this.props.match.params.storeId)} />
        <div className="row">
          <ul className="col-md-4">
            {Object.keys(this.state.items)
              .map(key => (
                <Item
                  key={key}
                  details={this.state.items[key]}
                  addOrder={this.addToOrder}
                  index={key}
                />
              ))
              .reverse()}
          </ul>
          <Order
            items={this.state.items}
            order={this.state.order}
            deleteOrder={this.deleteOrder}
          />
          <Inventory
            store={this.props.match.params.storeId}
            addItem={this.addItem}
            load={this.loadSampleItems}
            items={this.state.items}
            updateItem={this.updateItem}
            deleteItem={this.deleteItem}
          />
        </div>
      </div>
    );
  }
}
