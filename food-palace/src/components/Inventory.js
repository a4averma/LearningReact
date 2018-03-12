import React from 'react';
import AddItemForm from './AddItemForm';
import EditItem from './EditItem';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

export default class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  };
  authHandler = async authData => {
    // Verify owner
    const store = await base.fetch(this.props.store, { context: this });
    // Claim if no owner
    if (!store.owner) {
      await base.post(`${this.props.store}/owner`, { data: authData.user.uid });
    }
    // update state
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };
  handleClick = () => {
    this.props.load();
  };

  componentDidUpdate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  render() {
    //check auth status
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    //check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div className="col-md-4 card">
          <div className="card-body">
            <button
              type="button"
              className="btn btn-warning btn-block"
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="col-md-4 card">
        <div className="card-body">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.logout}
          >
            Logout
          </button>
          <hr />
          <h4 className="card-title">Inventory</h4>
          <AddItemForm addItem={this.props.addItem} />
          {Object.keys(this.props.items)
            .map(key => {
              return (
                <EditItem
                  key={key}
                  item={this.props.items[key]}
                  updateItem={this.props.updateItem}
                  deleteItem={this.props.deleteItem}
                  index={key}
                />
              );
            })
            .reverse()}
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={this.handleClick}
          >
            Load Sample
          </button>
        </div>
      </div>
    );
  }
}
