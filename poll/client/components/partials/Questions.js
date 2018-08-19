import React from 'react';

export default class Questions extends React.Component {

  askQuestion = question => {
    this.props.emit('ask', question);
  }

  addQuestion = (question, i) => {
    return(
      <div key={i} className=" alert alert-success margin col-xs-12 col-sm-6 col-md-3">
        <span onClick={this.askQuestion.bind(null, question)}>{question.q}</span>
      </div>
    )
  }

  render() {
    return (
      <div>   
        <h2>Questions</h2> 
        <div id="questions" className="row">
          {this.props.questions.map(this.addQuestion)}
        </div>
      </div>
    )
  }
}