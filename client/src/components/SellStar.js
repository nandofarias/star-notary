import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button, Box } from 'grommet';
import { GridLoader } from 'react-spinners';
import Toast from './Toast';

class SellStar extends Component {
  state = {
    starId: '',
    starPrice: '',
    loading: false,
    result: null
  };

  sellStar = async () => {
    this.setState({ loading: true });
    const { drizzle, drizzleState } = this.props;
    const { starId, starPrice } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const account = drizzleState.accounts[0];
    const value = drizzle.web3.utils.toWei(starPrice, 'ether');
    try {
      await contract.methods.putStarUpForSale(starId, value).send({ account });
      this.setState({
        loading: false,
        result: `Star #${starId} put on sale, congrats!`
      });
    } catch (error) {
      console.log(error);
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

            <Heading level={3}>Sell Star</Heading>

            <FormField label="Star ID">
              <TextInput onChange={this.handleInputChange} name="starId" />
            </FormField>

            <FormField label="Star Price">
              <TextInput onChange={this.handleInputChange} name="starPrice" />
            </FormField>

            <Button label="Submit" onClick={this.sellStar} primary={true} />
          </Box>
        )}
      </Box>
    );
  }
}

export default SellStar;
