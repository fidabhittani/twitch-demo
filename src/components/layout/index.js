import React from "react";
import {
  Container,
  Header,
  Menu,
  Segment,
  Grid,
  List,
  Image,
  Message,
  Search,
  Label,
  Icon
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
/**
 *  ==========  APP LAYOUT  ===============
 */

const FixedMenuLayout = ({
  children,
  channel,
  userChannels,
  loading,
  handleChannelSearchChange,
  channels,
  selectedChannel,
  history,
  message: { message: errorMessage }
}) => (
  <Container style={{ marginTop: "5em" }} stretched>
    {errorMessage && (
      <Message negative>
        <Message.Header>Problem(s)</Message.Header>
        <p>{errorMessage}</p>
      </Message>
    )}

    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column width={5}>
          <Grid.Column>
            <Segment inverted>
              <Header as="h5">User follows</Header>
              <List selection verticalAlign="middle" inverted>
                {userChannels &&
                  userChannels.map((chan, i) => {
                    return (
                      <List.Item
                        description={chan.channel.description}
                        onClick={() =>
                          history.push(`/streamer/${chan.channel.name}`)
                        }
                        active={channel === chan.channel.name}
                      >
                        <Image avatar src={chan.channel.profile_banner} />
                        <List.Content>
                          <List.Header>{chan.channel.display_name}</List.Header>
                        </List.Content>
                        <List.Content floated="right">
                          <Label color="olive" size={"mini"}>
                            {chan.channel.views} <Icon name="eye" />
                          </Label>
                        </List.Content>
                      </List.Item>
                    );
                  })}
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment style={{ marginTop: "2em" }} inverted>
              <Header as="h5">Search Channels</Header>

              <Search
                loading={loading}
                onResultSelect={(v, { result }) => {
                  history.push(`/streamer/${result.name}`);
                  handleChannelSearchChange(null, { value: result.name });
                }}
                onSearchChange={handleChannelSearchChange}
                results={channels}
                value={selectedChannel}
              />
            </Segment>
          </Grid.Column>
        </Grid.Column>

        <Grid.Column width={11} stretched>
          <Segment inverted>
            <Menu fixed="top" inverted>
              <Container>
                <Menu.Item as="a" header>
                  Twitch Live Stream
                </Menu.Item>
                <Menu.Item as="a">Home</Menu.Item>
              </Container>
            </Menu>

            <Header as="h1">
              Video stream for <code>{channel || "monstercats"}</code>
            </Header>
            {children}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default connect(state => {
  const { message, loading } = state.app;
  return {
    message,
    loading
  };
})(withRouter(FixedMenuLayout));
