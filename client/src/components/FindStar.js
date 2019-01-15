import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button, Box, Text } from 'grommet';
import { GridLoader } from 'react-spinners';
class FindStar extends Component {
  state = {
    starId: '',
    loading: false,
    star: null
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  findStar = async () => {
    this.setState({ loading: true });
    const { drizzle } = this.props;
    const { starId } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const star = await contract.methods.tokenIdToStarInfo(starId).call();
    this.setState({ loading: false, star });
  };
  render() {
    return (
      <Box fill align="center" justify="center">
        {this.state.loading ? (
          <GridLoader
            sizeUnit={'px'}
            size={50}
            color={'#7D4CDB'}
            loading={this.state.loading}
          />
        ) : this.state.star ? (
          <Box>
            <Heading level={3}>Star #{this.state.starId}</Heading>
            <Text margin="medium">Name: {this.state.star.name}</Text>
            <Text margin="medium">Story: {this.state.star.starStory}</Text>
            <Text margin="medium">RA: {this.state.star.ra}</Text>
            <Text margin="medium">DEC: {this.state.star.dec}</Text>
            <Text margin="medium">MAG: {this.state.star.mag}</Text>
            <Button
              label="Clear"
              onClick={() => this.setState({ star: null })}
            />
          </Box>
        ) : (
          <Box width="medium">
            <Heading level={3}>Find Star</Heading>

            <FormField label="Star ID">
              <TextInput onChange={this.handleInputChange} name="starId" />
            </FormField>
            <Button label="Submit" onClick={this.findStar} primary={true} />
          </Box>
        )}
      </Box>
    );
  }
}

export default FindStar;
