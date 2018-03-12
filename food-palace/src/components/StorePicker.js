import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  state = {
    name: getFunName()
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  goToStore = event => {
    event.preventDefault();
    if (!this.state.name.length) {
      return;
    }

    this.setState(prevState => ({
      name: event.target.value
    }));
    this.props.history.push(`/store/${this.state.name}`);
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Food Palace</h5>
            <form action="" className="form-inline" onSubmit={this.goToStore}>
              <div className="form-group mb-2">
                <input
                  className="form-control"
                  type="text"
                  id="store-name"
                  placeholder={this.props.name}
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mx-sm-3 mb-2">
                Visit Store
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StorePicker;
