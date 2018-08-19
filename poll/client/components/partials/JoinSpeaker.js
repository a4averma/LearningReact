import React from "react";

export default class JoinSpeaker extends React.Component {
  state = {
    name: "", 
    title: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  start = event => {
    event.preventDefault();
    var speaker = this.state;
    console.log(JSON.stringify(speaker));
    this.props.emit("start", speaker);
    event.currentTarget.reset();
  };
  render() {
    return (
      <form onSubmit={this.start}>
        <label>Full Name</label>
        <input
          className="form-control"
          placeholder="Enter your name"
          name="name"
          onChange={this.handleChange}
          required
        />
        <label>Presentation Title</label>
        <input
          className="form-control"
          placeholder="Your Presentation Title..."
          name="title"
          onChange={this.handleChange}
          required
        />
        <button className="btn btn-primary">Join</button>
      </form>
    );
  }
}
