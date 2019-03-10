import React, { Component } from "react";
import Login from "./components/authentication";
import { Route, Redirect } from "react-router-dom";
import Streamer from "./components/streamer";
import * as authService from "./utils/auth";

/**
 *  Main Application Components, router-outlet for views
 */

class App extends Component {
  state = {
    isloggedIn: false
  };
  componentDidMount = async () => {
    const isAuthenticated = await authService.authenticate();
    this.setState({ isloggedIn: isAuthenticated });
  };

  setLogin = isloggedIn => {
    this.setState({ isloggedIn });
  };

  render() {
    const { isloggedIn } = this.state;
    return (
      <div className="a">
        <Route
          path={["/", "/login", "/process-login"]}
          exact
          render={() =>
            isloggedIn ? (
              <Redirect to="/streamer/monstercat" />
            ) : (
              <Login setLogin={this.setLogin} />
            )
          }
        />

        <Route
          exact
          path="/streamer/:channel?"
          render={() =>
            isloggedIn ? <Streamer /> : <Login setLogin={this.setLogin} />
          }
        />
      </div>
    );
  }
}

export default App;
