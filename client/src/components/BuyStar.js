import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button, Box } from 'grommet';
import { GridLoader } from 'react-spinners';
import Toast from './Toast';

class BuyStar extends Component {
  state = {
    starId: '',
    starPrice: '',
    loading: false,
    result: null
  };

  buyStar = async () => {
    this.setState({ loading: true });
    const { drizzle, drizzleState } = this.props;
    const { starId, starPrice } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const account = drizzleState.accounts[0];
    const value = drizzle.web3.utils.toWei(starPrice, 'ether');
    try {
      await contract.methods.buyStar(starId).send({ account, value });
      this.setState({
        loading: false,
        result: `Congratulation, star #${starId} is now yours`
      });
    } catch (error) {
      this.setState({
        loading: false,
        result: 'Unable to process your request'
      });
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
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

            <Heading level={3}>Buy Star</Heading>

            <FormField label="Star ID">
              <TextInput onChange={this.handleInputChange} name="starId" />
            </FormField>

            <FormField label="Star Price">
              <TextInput onChange={this.handleInputChange} name="starPrice" />
            </FormField>

            <Button label="Submit" onClick={this.buyStar} primary={true} />
          </Box>
        )}
      </Box>
    );
  }
}

export default BuyStar;
