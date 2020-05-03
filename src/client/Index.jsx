// Copied (and modified) from https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-09/src/client/index.jsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./Home";
import Login from "./Login";
import SignUp from "./Signup";
import Crystals from "./Crystals";
import HeaderBar from "./Headerbar";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userObject: null,
    };
  }

  componentDidMount() {
    this.fetchAndUpdateUserInfo();

    let protocol = "ws:";
    if (window.location.protocol.toLowerCase() === "https:") {
      protocol = "wss:";
    }

    this.socket = new WebSocket(protocol + "//" + window.location.host);

    this.socket.onmessage = (event) => {
      const dto = JSON.parse(event.data);

      if (!dto || !dto.userCount) {
        this.setState({ userCount: "ERROR" });
        return;
      }

      this.setState({ userCount: dto.userCount });
    };
  }

  componentWillUnmount() {
    this.socket.close();
  }

  fetchAndUpdateUserInfo = async () => {
    const url = "/api/user";

    let response;

    try {
      response = await fetch(url, {
        method: "get",
      });
    } catch (err) {
      this.setState({ errorMsg: "Failed to connect to server: " + err });
      return;
    }

    console.log(response.status);
    if (response.status === 401) {
      // Passport will automatically provide error 401 if not authenticated
      this.updateLoggedInUser(null);
      return;
    }

    if (response.status !== 200) {
      this.setState({ errorMsg: "Not really sure what went wrong..." + err });
    } else {
      const payload = await response.json();
      console.log("user obj from /api/user: ", payload.user);
      this.updateLoggedInUser(payload.user.id);
      this.updateUserObject(payload.user);
    }
  };

  updateLoggedInUser = (user) => {
    this.setState({ user: user });
    console.log(user);
  };

  updateUserObject = (user) => {
    this.setState({ userObject: user });
  };

  notFound() {
    return (
      <div>
        <h2>NOT FOUND: 404</h2>
        <p>ERROR: the page you requested in not available.</p>
      </div>
    );
  }

  render() {
    const id = this.state.user ? this.state.user.id : null;
    return (
      <BrowserRouter>
        <div>
          <HeaderBar
            user={this.state.user}
            userObject={this.state.userObject}
            updateLoggedInUser={this.updateLoggedInUser}
            updateUserObject={this.updateUserObject}
          />
          <Switch>
            <Route
              exact
              path="/crystals"
              render={(props) => (
                <Crystals
                  {...props}
                  user={this.state.user}
                  userObject={this.state.userObject}
                  updateLoggedInUser={this.updateLoggedInUser}
                  fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                />
              )}
            />
            <Route
              exact
              path="/users"
              render={(props) => (
                <Users
                  {...props}
                  fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUp
                  {...props}
                  fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  user={this.state.user}
                  userObject={this.state.userObject}
                  fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                />
              )}
            />
            <Route component={this.notFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
