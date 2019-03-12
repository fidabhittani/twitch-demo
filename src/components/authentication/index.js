import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
  Transition,
  Loader,
  Dimmer
} from "semantic-ui-react";
import queryString from "query-string";
import { getAccessToken, getLoginUrl } from "../../utils/twitch-api";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as authService from "../../utils/auth";
import { isLoading } from "../../actions";
/**
 *  ==========  LOGIN SCREEN AND PROCESS LOGIN WITH TWITCH ===============
 */

class LoginForm extends Component {
  state = {
    loginStatus: false
  };

  /**
   *  Component Did mount
   */

  componentDidMount = async () => {
    const { code } = queryString.parse(this.props.location.search);
    if (code) {
      const updatedCreds = { code, grantType: `authorization_code` };

      const { data } = await getAccessToken(updatedCreds);
      if (data) {
        Object.keys(data).forEach(key => {
          localStorage.setItem(key, data[key]);
        });
        const isAuthenticated = await authService.authenticate();

        this.setState({ loginStatus: isAuthenticated });
        this.props.setLogin(isAuthenticated);
      }
    }
  };
  /**
   *  Iniate Login
   */

   initLogin = ()=>{
     const { isLoading } = this.props;
     isLoading && isLoading(true, "Signing In")
     window.location.href = getLoginUrl()
   }


  render() {
    const { loginStatus } = this.state;
    if (loginStatus) {
      return <Redirect to="/streamer" />;
    }
    const { message, loading, loadingText } = this.props;
    const messageProps = {
      [message.messageFlag]: true
    };
    return (
      <Transition>
        <div className="login-form">
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>

          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              {message.message && (
                <Transition>
                  <Message {...messageProps}>
                    <p>{message.message}</p>
                  </Message>
                </Transition>
              )}

              <Header as="h2" color="teal" textAlign="center">
                Sign In with twitch
              </Header>
              <Form size="large">
                {loading && (
                  <Dimmer active inverted>
                    <Loader size="large">{loadingText}</Loader>
                  </Dimmer>
                )}

                <Segment>
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    onClick={this.initLogin}
                  >
                    {loading ? "Signing In..." : "SignIn"}
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </Transition>
    );
  }
}
export default connect(state => {
  const {
    app: { message, loading, loadingText }
  } = state;
  return {
    message,
    loading,
    loadingText
  };
}, {isLoading})(withRouter(LoginForm));
