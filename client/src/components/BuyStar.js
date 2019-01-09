import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button } from 'grommet';

class BuyStar extends Component {
  state = {
    starId: '',
    starPrice: ''
  };

  buyStar = async () => {
    const { drizzle, drizzleState } = this.props;
    const { starId, starPrice } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const account = drizzleState.accounts[0];
    const value = drizzle.web3.utils.toWei(starPrice, 'ether');
    const result = await contract.methods
      .buyStar(starId)
      .send({ account, value });
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
        <Heading level={1}>Buy Star</Heading>

        <FormField label="Star ID">
          <TextInput onChange={this.handleInputChange} name="starId" />
        </FormField>

        <FormField label="Star Price">
          <TextInput onChange={this.handleInputChange} name="starPrice" />
        </FormField>

        <Button label="Submit" onClick={this.buyStar} />
      </div>
    );
  }
}

export default BuyStar;
