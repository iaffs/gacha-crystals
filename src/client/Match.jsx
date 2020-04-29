import React from "react";
import { withRouter } from "react-router-dom";

export class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null,
      match: null
    };
  }

  componentDidMount() {
    this.fetchCurrentMatch();
  }

  fetchCurrentMatch = async () => {
    const url = "/api/matches/ongoing";

    let response;

    try {
      response = await fetch(url, {
        method: "get"
      });
    } catch (err) {
      this.setState({ errorMsg: "Failed to connect to server: " + err });
      return;
    }

    if (response.status === 401) {
      this.props.updateLoggedInUser(null);
      this.props.history.push("/");
      return;
    }

    if (response.status === 404) {
      await this.startNewMatch();
      return;
    }

    if (response.status !== 200) {
      this.setState({
        errorMsg: "Failed connection to server. Status " + response.status
      });
      return;
    }

    const match = await response.json();
    this.setState({ match: match, errorMsg: null });
  };

  startNewMatch = async () => {
    const url = "/api/matches";

    let response;

    try {
      response = await fetch(url, {
        method: "post"
      });
    } catch (err) {
      this.setState({ errorMsg: "Failed to connect to server: " + err });
      return;
    }

    if (response.status === 401) {
      this.props.updateLoggedInUser(null);
      this.props.history.push("/");
      return;
    }

    if (response.status !== 201) {
      this.setState({
        errorMsg: "Failed connection to server. Status " + response.status
      });
      return;
    }

    const match = await response.json();
    this.setState({ match: match, errorMsg: null });
  };

  answerDiv = (prefix, index) => {
    return (
      <button className="answer" onClick={() => this.doAnswer(index)}>
        {prefix + this.state.match.currentQuiz.answers[index]}
      </button>
    );
  };

  doAnswer = async index => {
    const url = "/api/matches/ongoing";

    let response;

    try {
      response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ answerIndex: index })
      });
    } catch (err) {
      this.setState({ errorMsg: "Failed to connect to server: " + err });
      return;
    }

    if (response.status === 401) {
      this.props.updateLoggedInUser(null);
      this.props.history.push("/");
      return;
    }

    if (response.status !== 201) {
      this.setState({
        errorMsg: "Failed connection to server. Status " + response.status
      });
      return;
    }

    const match = await response.json();
    this.setState({ match: match, errorMsg: null });

    if (match.victory || match.defeat) {
      await this.props.fetchAndUpdateUserInfo();
    }
  };

  victoriesDefeatsDiv = () => {
    return (
      <div>
        <p>Tokens: {this.props.user.tokens}</p>
        <p>Crystals: {this.props.user.crystals}</p>
      </div>
    );
  };

  render() {
    if (this.state.errorMsg) {
      return <h2>ERROR: {this.state.errorMsg}</h2>;
    }

    if (!this.state.match) {
      return <h2>Loading...</h2>;
    }

    if (this.state.match.victory) {
      return (
        <div className="center">
          <h2>You Won!</h2>
          <div className="action">
            <button
              className="button new-game-button"
              onClick={this.startNewMatch}
            >
              New Match
            </button>
          </div>
          {this.props.user ? this.victoriesDefeatsDiv() : <div />}
        </div>
      );
    }

    if (this.state.match.defeat) {
      return (
        <div className="center">
          <h2>Wrong Answer! You Lost!</h2>
          <div className="action">
            <button
              className="button new-game-button"
              onClick={this.startNewMatch}
            >
              New Match
            </button>
          </div>
          {this.props.user ? this.victoriesDefeatsDiv() : <div />}
        </div>
      );
    }

    const match = this.state.match;
    const count = "" + (match.currentIndex + 1) + "/" + match.numberOfQuizzes;

    return (
      <div className={"quiz"} id={"quiz_" + match.currentQuiz.id}>
        <p className={"question"}>
          Question {count}: {match.currentQuiz.question}
        </p>
        {this.answerDiv("A: ", 0)}
        {this.answerDiv("B: ", 1)}
        {this.answerDiv("C: ", 2)}
        {this.answerDiv("D: ", 3)}
      </div>
    );
  }
}

export default withRouter(Match);
