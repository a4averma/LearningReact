import React from 'react';
import { formatPrice } from '../helpers.js';

export default class Order extends React.Component {
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  render() {
    const id = Object.keys(this.props.order);
    const total = id.reduce((prevTotal, key) => {
      const item = this.props.items[key];
      const count = this.props.order[key];
      if (item && item.status === true) {
        return prevTotal + count * item.price;
      }
      return prevTotal;
    }, 0);
    if (this.isEmpty(this.props.order)) {
      return null;
    } else {
      return (
        <div className="col-md-4 card">
          <div className="card-body">
            <h4 className="card-title">Order</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {id.map(key => {
                  if (!this.props.items[key]) {
                    return null;
                  } else if (
                    this.props.items[key] &&
                    !this.props.items[key].status
                  ) {
                    return (
                      <tr key={key}>
                        <td>
                          Sorry,{' '}
                          {this.props.items[key]
                            ? this.props.items[key].name
                            : 'This item'}{' '}
                          is no longer available.{' '}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={key}>
                        <td>{this.props.items[key].name}</td>
                        <td>{formatPrice(this.props.items[key].price)}</td>
                        <td>{this.props.order[key]}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              this.props.deleteOrder(key);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <hr />

            <h5>Total: {formatPrice(total)}</h5>
          </div>
        </div>
      );
    }
  }
}
