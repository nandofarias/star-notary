import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading } from 'grommet';

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
    <Heading level={3}>Star Notary</Heading>
    <Box direction="row">
      <Button>
        <Link to="/">Home</Link>
      </Button>
      <Button>
        <Link to="/create">Create Star</Link>
      </Button>
      <Button>
        <Link to="/buy">Buy Star</Link>
      </Button>
      <Button>
        <Link to="/find">Find Star</Link>
      </Button>
      <Button>
        <Link to="/sell">Sell Star</Link>
      </Button>
    </Box>
  </Box>
);

export default Header;
