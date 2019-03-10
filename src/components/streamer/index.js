import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MainLayout from "../layout";
import { getUserChannels, searchChannels } from "../../utils/twitch-api";

const TWITCH_EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

class Streamer extends Component {
  state = {
    userChannels: [],
    channel: null,
    searchChannel: ""
  };
  player = null;
  componentDidMount = async () => {
    const script = document.createElement("script");
    script.setAttribute("src", TWITCH_EMBED_URL);
    script.addEventListener("load", () => {
      this.createPlayer();
    });
    document.body.appendChild(script);
    /**
     *  Get User channels
     */
    this.getUserChannels();
  };
  /**
   * Did Update
   */
  componentDidUpdate = () => {
    const { channel } = this.props.match.params;

    if (this.state.channel !== channel) {
      this.createPlayer();
    }
  };

  /**
   *  This create player
   */
  createPlayer = () => {
    const { channel } = this.props.match.params;
    const embedId = `twitch-embed`;
    const embedElem = document.getElementById(embedId);
    if (embedElem) {
      embedElem.innerHTML = "";
    }

    this.player = new window.Twitch.Embed(embedId, {
      width: "100%",
      height: "600px",
      channel: channel || "monstercat"
    });
    this.setState({ channel });
  };
  /**
   *  Get Open channnels
   */

  getChannels = async (e, { value }) => {
    this.setState({ searchChannel: value });
    let { data: { channels = [] } = {} } = await searchChannels({
      query: value
    });

    channels = channels.map(channel => {
      return {
        ...channel,
        title: channel.display_name,
        image: channel.logo,
        views: channel.views
      };
    });

    this.setState({ channels });
  };

  /**
   *  get users channnels
   */
  getUserChannels = async () => {
    let { data: { follows: userChannels } = {} } = await getUserChannels();
    this.setState({ userChannels });
  };

  render() {
    const { channel } = this.props.match.params;
    const { userChannels, channels, searchChannel } = this.state;
    return (
      <MainLayout
        channel={channel}
        userChannels={userChannels}
        handleChannelSearchChange={this.getChannels}
        channels={channels}
        selectedChannel={searchChannel || channel}
      >
        <div id="twitch-embed" />
      </MainLayout>
    );
  }
}

export default withRouter(Streamer);
