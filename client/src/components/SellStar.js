import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button } from 'grommet';

class SellStar extends Component {
  state = {
    starId: '',
    starPrice: ''
  };

  sellStar = async () => {
    const { drizzle, drizzleState } = this.props;
    const { starId, starPrice } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const account = drizzleState.accounts[0];
    const value = drizzle.web3.utils.toWei(starPrice, 'ether');
    const result = await contract.methods
      .putStarUpForSale(starId, value)
      .send({ account });
    console.log(result);
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <Heading level={1}>Sell Star</Heading>

        <FormField label="Star ID">
          <TextInput onChange={this.handleInputChange} name="starId" />
        </FormField>

        <FormField label="Star Price">
          <TextInput onChange={this.handleInputChange} name="starPrice" />
        </FormField>

        <Button label="Submit" onClick={this.sellStar} />
      </div>
    );
  }
}

export default SellStar;
