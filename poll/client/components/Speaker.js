import React from "react";
import Display from "./partials/Display";
import JoinSpeaker from "./partials/JoinSpeaker";
import Attendance from "./partials/Attendance";
import Questions from './partials/Questions';

export default class Speaker extends React.Component {
  render() {
    return (
      <div>
        <Display if={this.props.status === "connected"}>
          <Display
            if={this.props.member.name && this.props.member.type === "speaker"}
          >
            <Questions questions={this.props.questions} emit={this.props.emit} />
            <Attendance
              count={this.props.count}
              audience={this.props.audience}
            />
          </Display>
          <Display if={!this.props.member.name}>
            <h2>Start the Presentation</h2>
            <JoinSpeaker emit={this.props.emit} />
          </Display>
        </Display>
      </div>
    );
  }
}
