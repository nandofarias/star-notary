import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Anchor, Text } from 'grommet';

class Home extends Component {
  render() {
    return (
      <Box fill align="center" justify="center">
        <Heading level={1}>
          Have you ever wunder to have your own star ?
        </Heading>
        <Link to="/create">
          <Anchor size="xxlarge">Create a star</Anchor>
        </Link>
        <Text size="large">or</Text>
        <Link to="/buy">
          <Anchor size="xxlarge">Buy one</Anchor>
        </Link>
      </Box>
    );
  }
}

export default Home;
