import React from "react";

export default class Header extends React.Component {
  static defaultProps = {
    status: "disconnected"
  };
  render() {
    return (
      <header className="navbar row">
        <div className="col-xs-10">
          <h1>{this.props.title}</h1>
          <p>{this.props.speaker}</p>
        </div>
        <div className="col-xs-2">
          <span id="connection-status" className={this.props.status} />
        </div>
      </header>
    );
  }
}
