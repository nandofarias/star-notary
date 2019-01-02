import React, { Component } from 'react';

class FindStar extends Component {
  state = {
    starId: '',
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

  async findStar() {
    const { drizzle } = this.props;
    const { starId } = this.state;
    const contract = drizzle.contracts.StarNotary;
    const star = await contract.methods.tokenIdToStarInfo(starId).call();
    this.setState({
      starName: star.name,
      starStory: star.starStory,
      starRa: star.ra,
      starDec: star.dec,
      starMag: star.mag
    });
  }
  render() {
    return (
      <div>
        <h1>Look Up Star By Id</h1>

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
          <label htmlFor="star-name">Star Name:</label>
          <input id="star-name" disabled value={this.state.starName} />
        </div>

        <div>
          <label htmlFor="star-story">Star Story:</label>
          <input id="star-story" disabled value={this.state.starStory} />
        </div>

        <div>
          <label htmlFor="star-ra">Star Ra:</label>
          <input id="star-ra" disabled value={this.state.starRa} />
        </div>

        <div>
          <label htmlFor="star-dec">Star Dec:</label>
          <input id="star-dec" disabled value={this.state.starDec} />
        </div>

        <div>
          <label htmlFor="star-mag">Star Mag:</label>
          <input id="star-mag" disabled value={this.state.starMag} />
        </div>

        <button onClick={() => this.findStar()}>Find Star</button>
      </div>
    );
  }
}

export default FindStar;
