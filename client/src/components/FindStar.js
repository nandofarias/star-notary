import React, { Component } from 'react';
import { FormField, TextInput, Heading, Button } from 'grommet';

class FindStar extends Component {
  state = {
    starId: ''
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  findStar = async () => {
    const { drizzle } = this.props;
    const { starId } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const star = await contract.methods.tokenIdToStarInfo(starId).call();
    console.log(star);
  };
  render() {
    return (
      <div>
        <Heading level={1}>Find Star</Heading>

        <FormField label="Star ID">
          <TextInput onChange={this.handleInputChange} name="starId" />
        </FormField>
        <Button label="Submit" onClick={this.findStar} />
      </div>
    );
  }
}

export default FindStar;
