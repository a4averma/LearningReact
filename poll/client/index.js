import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import io from "socket.io-client";

import App from "./components/App";
import Audience from "./components/Audience";
import Speaker from "./components/Speaker";
import Board from "./components/Board";
import NotFound from "./components/NotFound";

class Router extends React.Component {
  state = {
    status: "disconnected",
    title: "",
    member: {},
    audience: [],
    speaker: "",
    questions: [],
    currentQuestion: false
  };

  
  componentWillMount() {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", this.connect);
    this.socket.on("disconnect", this.disconnect);
    this.socket.on("welcome", this.updateState);
    this.socket.on("joined", this.joined);
    this.socket.on("audience", this.updateAudience);
    this.socket.on("start", this.start);
    this.socket.on("end", this.updateState);
    this.socket.on("ask", this.ask);
  }

  ask = currentQ => {
    this.setState({ currentQuestion: currentQ });
  };

  connect = () => {
    var member = sessionStorage.member
      ? JSON.parse(sessionStorage.member)
      : null;
    if (member && member.type === "member") {
      this.emit("join", member);
    } else if (member && member.type === "speaker") {
      this.emit("start", { name: member.name, title: sessionStorage.title });
    }
    this.setState({ status: "connected" });
  };

  disconnect = () => {
    sessionStorage.title = "disconnected";
    this.setState({
      status: "disconnected",
      title: "disconnected",
      speaker: ""
    });
  };

  updateState = data => {
    this.setState({
      title: data.title,
      audience: data.audience,
      speaker: data.hasOwnProperty("speaker") ? data.speaker : "",
      questions: data.questions
    });
  };

  emit = (eventName, payload) => {
    this.socket.emit(eventName, payload);
  };

  joined = member => {
    sessionStorage.member = JSON.stringify(member);
    console.log(`Joined Event ${member.name}`);
    this.setState({ member, title: member.title });
  };

  updateAudience = audience => {
    this.setState({ audience });
  };

  start = data => {
    if ((this.state.member.type = "speaker")) {
      sessionStorage.title = data.title;
    }
    this.setState({
      title: data.title,
      audience: data.audience,
      speaker: data.hasOwnProperty("speaker") ? data.speaker : ""
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <App {...this.state} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Audience
                  status={this.state.status}
                  emit={this.emit}
                  member={this.state.member}
                  currentQuestion={this.state.currentQuestion}
                  count={
                    this.state.audience
                      ? Object.keys(this.state.audience).length
                      : 0
                  }
                />
              )}
            />
            <Route
              path="/speaker"
              render={() => (
                <Speaker
                  status={this.state.status}
                  emit={this.emit}
                  member={this.state.member}
                  count={
                    this.state.audience
                      ? Object.keys(this.state.audience).length
                      : 0
                  }
                  audience={this.state.audience}
                  questions={this.state.questions}
                />
              )}
            />
            <Route path="/board" component={Board} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<Router />, document.querySelector("#react-container"));
