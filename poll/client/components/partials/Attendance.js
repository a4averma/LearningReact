import React from "react";

export default class Attendance extends React.Component {
  addMember = (member, i) => {
    return (
      <tr key={i}>
        <td>{member.name}</td>
        <td>{member.id}</td>
      </tr>
    );
  };
  render() {
    return (
      <div>
        <h2>Attendance - {this.props.count} members</h2>
        {this.Console}
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Socket ID</td>
            </tr>
          </thead>
          <tbody>{this.props.audience.map(this.addMember)}</tbody>
        </table>
      </div>
    );
  }
}
