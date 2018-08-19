import React from "react";

export default class Ask extends React.Component {
  state = {
    choices: []
  };

  componentWillMount() {
    this.setUpChoices();
  }

  componentWillReceiveProps() {
    this.setUpChoices();
  }

  addChoiceButton = (choice, i) => {
    var buttonTypes = ["primary", "sucess", "warning", "danger"];
    return (
      <button key={i} className={`col-xs-12 col-sm-6 btn btn-${buttonTypes[i]}`}>
        {choice}: {this.props.question[choice]}
      </button>
    );
  };

  setUpChoices = () => {
    var choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({ choices: choices });
  };

  render() {
    return (
      <div id="currentQ">
        <h2>{this.props.question.q}</h2>
        <div className="row">{this.state.choices.map(this.addChoiceButton)}</div>
      </div>
    );
  }
}
