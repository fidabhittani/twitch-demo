import React, { Component } from "react";
import Login from "./components/authentication";
import { Route, Redirect } from "react-router-dom";
import Streamer from "./components/streamer";
import * as authService from "./utils/auth";
import { getUserAccessToken } from "./utils/functions";

const accessToken = getUserAccessToken();

/**
 *  Main Application Components, router-outlet for views
 */
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    isloggedIn: !!accessToken
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

        <PrivateRoute
          exact
          auth={isloggedIn}
          path="/streamer/:channel?"
          component={Streamer}
        />
      </div>
    );
  }
}

export default App;
