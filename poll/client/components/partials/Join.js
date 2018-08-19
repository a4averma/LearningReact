import React from "react";
import { NavLink } from "react-router-dom";

export default class Join extends React.Component {
  state = {
    name: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  join = event => {
    event.preventDefault();
    var memberName = this.state;
    this.props.emit("join", memberName);
    event.currentTarget.reset();
  };
  render() {
    return (
      <form onSubmit={this.join}>
        <label>Full Name</label>
        <input
          className="form-control"
          placeholder="Enter your name"
          name="name"
          onChange={this.handleChange}
          required
        />
        <button className="btn btn-primary">Join</button>
        <NavLink to="/speaker">Speaker</NavLink>
      </form>
    );
  }
}
