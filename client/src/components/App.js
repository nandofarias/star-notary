import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grommet } from 'grommet';

import Home from './Home';
import BuyStar from './BuyStar';
import CreateStar from './CreateStar';
import FindStar from './FindStar';
import SellStar from './SellStar';
import Header from './Header';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    }
  }
};

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }
  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return 'Loading Drizzle...';
    return (
      <Router>
        <Grommet theme={theme}>
          <Header />

          <Route exact path="/" component={Home} />
          <Route
            path="/create"
            render={() => (
              <CreateStar
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
            )}
          />
          <Route
            path="/buy"
            render={() => (
              <BuyStar
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
            )}
          />
          <Route
            path="/find"
            render={() => (
              <FindStar
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
            )}
          />
          <Route
            path="/sell"
            render={() => (
              <SellStar
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
            )}
          />
        </Grommet>
      </Router>
    );
  }
}
export default App;
