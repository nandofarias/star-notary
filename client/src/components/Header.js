import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Anchor } from 'grommet';

const Header = () => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ vertical: 'small', horizontal: 'medium' }}
    elevation="medium"
  >
    <Link to="/">
      <Anchor size="xxlarge">Star Notary</Anchor>
    </Link>

    <Box direction="row" gap="medium">
      <Link to="/">
        <Anchor tag="span">Home</Anchor>
      </Link>
      <Link to="/create">
        <Anchor tag="span">Create Star</Anchor>
      </Link>
      <Link to="/buy">
        <Anchor tag="span">Buy Star</Anchor>
      </Link>
      <Link to="/find">
        <Anchor tag="span">Find Star</Anchor>
      </Link>
      <Link to="/sell">
        <Anchor tag="span">Sell Star</Anchor>
      </Link>
    </Box>
  </Box>
);

export default Header;
