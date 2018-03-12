import React from 'react';

export default class AddItemForm extends React.Component {
  handleChange = event => {
    const updatedItem = {
      ...this.props.item,
      [event.target.name]: event.target.value
    };
    this.props.updateItem(this.props.index, updatedItem);
  };

  deleteItem = event => {
    event.preventDefault();
    this.props.deleteItem(this.props.index);
  };

  render() {
    return (
      <form className="ItemEdit" onSubmit={this.deleteItem}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              value={this.props.item.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <input
              className="form-control"
              type="number"
              name="price"
              placeholder="Price"
              value={this.props.item.price}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <select
              name="status"
              className="form-control"
              value={this.props.item.status}
              onChange={this.handleChange}
            >
              <option value={true}>Fresh</option>
              <option value={false}>Sold Out</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            type="text"
            name="desc"
            placeholder="Description"
            value={this.props.item.desc}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="image"
            placeholder="Image"
            value={this.props.item.image}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-danger btn-lg btn-block">
          Delete
        </button>
      </form>
    );
  }
}
