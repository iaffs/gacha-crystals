// Copied (and modified) from https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-09/src/client/signup.jsx

import React from "react";
import { Link, withRouter } from "react-router-dom";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }

  doLogout = async () => {
    const url = "/api/logout";

    let response;

    try {
      response = await fetch(url, { method: "post" });
    } catch (err) {
      alert("Failed to connect to server: " + err);
      return;
    }

    if (response.status !== 204) {
      alert("Error when connecting to server: status code " + response.status);
      return;
    }
    this.props.updateLoggedInUser(null);
    this.props.updateUserObject(null);
    this.props.history.push("/");
  };

  renderLoggedIn(userId) {
    return (
      <React.Fragment>
        <p className="header-text">Welcome {userId} !</p>
        <button className="header-button" onClick={this.doLogout}>
          Log out
        </button>
      </React.Fragment>
    );
  }

  renderNotLoggedIn() {
    return (
      <React.Fragment>
        <p className="header-text">You are not logged in</p>
        <div className="action-buttons">
          <Link className="header-button" to="/login" tabIndex="0">
            Log in
          </Link>
          <Link className="header-button" to="/signup" tabIndex="0">
            Sign up
          </Link>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const userId = this.props.user;

    let content;
    if (!userId) {
      content = this.renderNotLoggedIn();
    } else {
      content = this.renderLoggedIn(userId);
    }

    return (
      <div className="header">
        <Link className="header-logo" to={"/"} tabIndex="0">
          Gacha Crystal
        </Link>
        {content}
      </div>
    );
  }
}

export default withRouter(HeaderBar);
