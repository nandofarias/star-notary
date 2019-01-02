import React, { Component } from 'react';

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

  async createStar() {
    const { drizzle, drizzleState } = this.props;
    const { starName, starStory, starRa, starDec, starMag } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const account = drizzleState.accounts[0];
    const size = await contract.methods.starsArraySize().call();
    const result = await contract.methods
      .createStar(starName, starStory, starRa, starDec, starMag, size + 1)
      .send({ account });
    console.log(result);
  }
  render() {
    return (
      <div>
        <h1>Create Star</h1>

        <div>
          <label htmlFor="star-name">Star Name:</label>
          <input
            id="star-name"
            name="starName"
            value={this.state.starName}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="star-story">Star Story:</label>
          <input
            id="star-story"
            name="starStory"
            value={this.state.starStory}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="star-ra">Star Ra:</label>
          <input
            id="star-ra"
            name="starRa"
            value={this.state.starRa}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="star-dec">Star Dec:</label>
          <input
            id="star-dec"
            name="starDec"
            value={this.state.starDec}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="star-mag">Star Mag:</label>
          <input
            id="star-mag"
            name="starMag"
            value={this.state.starMag}
            onChange={this.handleInputChange}
          />
        </div>

        <button onClick={() => this.createStar()}>Create Star</button>
      </div>
    );
  }
}

export default CreateStar;
