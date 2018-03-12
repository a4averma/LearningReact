import React from 'react';

const Login = props => (
  <div className="col-md-4 card">
    <div className="card-body">
      <h4 className="card-title">Inventory Login</h4>

      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        onClick={() => props.authenticate('Facebook')}
      >
        Facebook
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg btn-block"
        onClick={() => props.authenticate('Twitter')}
      >
        Twitter
      </button>
    </div>
  </div>
);

export default Login;
