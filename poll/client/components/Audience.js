import React from "react";
import Display from "./partials/Display";
import Join from "./partials/Join";
import Ask from './partials/Ask';

export default class Audience extends React.Component {
  render() {
    return (
      <div>
        <Display if={this.props.status === "connected"}>
          <Display if={this.props.member.name}>
            <Display if={!this.props.currentQuestion}>
              <p>{this.props.count} members are connected.</p>
              <h2>Welcome, {this.props.member.name}</h2>
            </Display>
            <Display if={this.props.currentQuestion}>
              <h2>
                {this.props.currentQuestion.q}
              </h2>
              <Ask question={this.props.currentQuestion} />
            </Display>
          </Display>
          <Display if={!this.props.member.name}>
            <h1>Join the Session</h1>
            <Join emit={this.props.emit} />
          </Display>
        </Display>
        <Display if={this.props.status === "disconnected"}>Connecting</Display>
      </div>
    );
  }
}
