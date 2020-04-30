import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./Home";
import Login from "./Login";
import SignUp from "./Signup";
import Crystals from './Crystals'
import HeaderBar from "./Headerbar";

class App extends React.Component {
  constructor(props) {
    super(props);

    /*
            As whether we are logged in or not will impact the rendering of
            all pages, such state info as to be stored here in the root component.
            If a user is logged in, then we store its data here.
            A null value means the user is not logged in.
         */

    this.state = {
      user: null,
      userCount: 1,
      
    };
  }

  /*
        Whether we are logged in or not depends on the session cookie.
        That is what is sent to the server at each HTTP request.
        If missing, we will get a 401 status code error.
        It could happen that, when this component is mounted, there is
        already a valid cookie.
        A simple example is when we manually refresh the page from the browser:
        the component will be re-mounted with new state (and so userId is null),
        although we have a valid cookie.
        So, here we do a AJAX call to the server. If such call is authenticated,
        then will we get the user id, and so update the component's state.
     */
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
      this.updateLoggedInUserId(null);
      return;
    }

    if (response.status !== 200) {
      //TODO here could have some warning message in the page.
      this.setState({ errorMsg: "Not really sure what went wrong..." + err})
    } else {
      const user = await response.json();
      console.log(user);
      this.updateLoggedInUserId(user.id);
    }
  };

  updateLoggedInUserId = (id) => {
    this.setState({ user: id });
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
    /*
            When we have a switch, to have a component for a page we just use
            the attribute "component".
            However, if we need to pass some props to the component, we need
            to use the attribute "render".
         */

    const id = this.state.user ? this.state.user.id : null;

    return (
      <BrowserRouter>
        <div>
          <HeaderBar userId={id} updateLoggedInUser={this.updateLoggedInUser} />
          <Switch>
            <Route
              exact
              path="/crystals"
              render={(props) => (
                <Crystals
                  {...props}
                  user={this.state.user}
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
                  userCount={this.state.userCount}
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