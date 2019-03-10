import React from "react";
import {
  Container,
  Header,
  Menu,
  Segment,
  Label,
  Grid,
  Icon,
  Message,
  Search
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
  <Container style={{ marginTop: "5em" }}>
    {errorMessage && (
      <Message negative>
        <Message.Header>Problem(s)</Message.Header>
        <p>{errorMessage}</p>
      </Message>
    )}

    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column width={4}>
          <Grid.Column>
            <Header as="h5">User follows</Header>
            <Menu fluid vertical tabular>
              {userChannels &&
                userChannels.map((chan, i) => {
                  return (
                    <React.Fragment key={`key-${i}`}>
                      <Link to={`/streamer/${chan.channel.name}`}>
                        <Menu.Item
                          name={chan.channel.display_name}
                          as={"a"}
                          active={channel === chan.channel.name}
                        >
                          <Label color="teal">
                            {chan.channel.views}&nbsp;&nbsp; <Icon name="eye" />
                          </Label>
                          {chan.channel.display_name}
                        </Menu.Item>
                      </Link>
                    </React.Fragment>
                  );
                })}
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Segment style={{ marginTop: "2em" }}>
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

        <Grid.Column width={12} stretched>
          <Segment>
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
