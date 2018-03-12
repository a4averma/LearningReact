import React from 'react';

export default class AddItemForm extends React.Component {
  state = {
    name: '',
    price: '',
    status: true,
    desc: '',
    image: 'https://picsum.photos/200/100?random'
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  createItem = event => {
    event.preventDefault();
    if (
      !this.state.name.length &&
      !this.state.price.length &&
      !this.state.desc.length &&
      !this.state.image.length
    ) {
      return;
    }
    const item = this.state;
    this.props.addItem(item);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="ItemEdit" onSubmit={this.createItem}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <input
              className="form-control"
              type="number"
              name="price"
              placeholder="Price"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <select
              name="status"
              className="form-control"
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
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="image"
            placeholder="Image"
            onChange={this.handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Add Item
        </button>
      </form>
    );
  }
}
