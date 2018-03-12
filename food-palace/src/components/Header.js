import React from 'react';

const Header = props => (
  <header className="top">
    <h1>Food Palace</h1>
    <h4 className="tagline">{props.tagline}</h4>
  </header>
);

export default Header;
