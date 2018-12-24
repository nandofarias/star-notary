import React from 'react';

class ReadState extends React.Component {
  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.StarNotary;
    const star = await contract.methods.tokenIdToStarInfo(0).call();
    console.log(star);
    console.log(drizzleState);
  }

  render() {
    return <div>ReadState Component</div>;
  }
}

export default ReadState;
