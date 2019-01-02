import React, { Component } from 'react';

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
        <h1>Put Star For Sale</h1>

        <div>
          <label htmlFor="star-id">Star Id:</label>
          <input
            id="star-id"
            name="starId"
            value={this.state.starId}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="star-price">Star Price:</label>
          <input
            id="star-price"
            name="starPrice"
            value={this.state.starPrice}
            onChange={this.handleInputChange}
          />
        </div>

        <button onClick={this.sellStar}>Put for sale</button>
      </div>
    );
  }
}

export default SellStar;
