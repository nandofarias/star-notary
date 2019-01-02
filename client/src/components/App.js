import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ReadState from './ReadState';
import BuyStar from './BuyStar';
import CreateStar from './CreateStar';
import FindStar from './FindStar';
import SellStar from './SellStar';
import Header from './Header';

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
        <div>
          <Header />

          <Route
            exact
            path="/"
            render={() => (
              <ReadState
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
            )}
          />
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
        </div>
      </Router>
    );
  }
}
export default App;
