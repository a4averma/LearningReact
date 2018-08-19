import React from "react";

import Header from "./partials/Header";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header title={this.props.title} status={this.props.status} speaker={this.props.speaker}/>
      </div>
    );
  }
}
