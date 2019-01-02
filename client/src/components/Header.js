import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/create">Create Star</Link>
    </li>
    <li>
      <Link to="/buy">Buy Star</Link>
    </li>
    <li>
      <Link to="/find">Find Star</Link>
    </li>
    <li>
      <Link to="/sell">Sell Star</Link>
    </li>
  </ul>
);

export default Header;
