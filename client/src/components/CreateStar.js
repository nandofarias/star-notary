import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button } from 'grommet';

class CreateStar extends Component {
  state = {
    starName: '',
    starStory: '',
    starRa: '',
    starDec: '',
    starMag: ''
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  createStar = async () => {
    const { drizzle, drizzleState } = this.props;
    const { starName, starStory, starRa, starDec, starMag } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const account = drizzleState.accounts[0];
    const size = await contract.methods.starsArraySize().call();
    const nextId = Number(size) + 1;
    const result = await contract.methods
      .createStar(starName, starStory, starRa, starDec, starMag, nextId)
      .send({ account });
    console.log(result);
  };
  render() {
    return (
      <div>
        <Heading level={1}>Create Star</Heading>
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
        <Button label="Submit" onClick={this.createStar} />
      </div>
    );
  }
}

export default CreateStar;
