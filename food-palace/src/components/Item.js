import React from 'react';
import { formatPrice } from '../helpers';

export default class Item extends React.Component {
  handleClick = () => {
    this.props.addOrder(this.props.index);
  };
  render() {
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={this.props.details.image}
          alt={this.props.details.name}
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.details.name}</h5>
          <p className="card-text">{this.props.details.desc}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {formatPrice(parseFloat(this.props.details.price))}
          </li>
          <li className="list-group-item">
            {this.props.details.status ? 'Available' : 'Out of Stock'}
          </li>
        </ul>
        <div className="card-body">
          <button
            className="btn btn-outline-success btn-sm card-link"
            disabled={!this.props.details.status}
            onClick={this.handleClick}
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  }
}
