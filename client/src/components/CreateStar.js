import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button, Box } from 'grommet';
import { GridLoader } from 'react-spinners';
import Toast from './Toast';
class CreateStar extends Component {
  state = {
    starName: '',
    starStory: '',
    starRa: '',
    starDec: '',
    starMag: '',
    loading: false,
    result: null
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  createStar = async () => {
    this.setState({ loading: true });
    const { drizzle, drizzleState } = this.props;
    const { starName, starStory, starRa, starDec, starMag } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const account = drizzleState.accounts[0];
    const size = await contract.methods.starsArraySize().call();
    const nextId = Number(size) + 1;
    try {
      await contract.methods
        .createStar(starName, starStory, starRa, starDec, starMag, nextId)
        .send({ account });
      this.setState({
        loading: false,
        result: `Congratulation, star #${nextId} is now yours`
      });
    } catch (error) {
      this.setState({
        loading: false,
        result: 'Unable to process your request'
      });
    }
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
        ) : (
          <Box width="medium">
            <Toast
              background="primary"
              text={this.state.result}
              render={this.state.result}
              onClose={() => this.setState({ result: null })}
            />
            <Heading level={3}>Create Star</Heading>
            <FormField label="Star Name">
              <TextInput onChange={this.handleInputChange} name="starName" />
            </FormField>
            <FormField label="Star Story">
              <TextInput onChange={this.handleInputChange} name="starStory" />
            </FormField>
            <FormField label="Star RA">
              <TextInput onChange={this.handleInputChange} name="starRa" />
            </FormField>
            <FormField label="Star DEC">
              <TextInput onChange={this.handleInputChange} name="starDec" />
            </FormField>
            <FormField label="Star MAG">
              <TextInput onChange={this.handleInputChange} name="starMag" />
            </FormField>
            <Button label="Submit" onClick={this.createStar} primary={true} />
          </Box>
        )}
      </Box>
    );
  }
}

export default CreateStar;
