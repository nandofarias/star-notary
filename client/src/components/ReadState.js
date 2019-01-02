import React from 'react';

class ReadState extends React.Component {
  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    console.log(drizzle);
    console.log(drizzleState);
    console.log(drizzle.web3);
  }

  render() {
    return <div>ReadState Component</div>;
  }
}

export default ReadState;
