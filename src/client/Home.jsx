import React from "react";
import { Link } from "react-router-dom";
import crystals from '../server/db/crystals';

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchAndUpdateUserInfo();
    }
  }

  render() {
    const user = this.props.user;

    return (
      <div className="main-content">
        <h2 className="heading">Play the Gacha Crystal game</h2>
        <p>
          Welcome to the Crystal! In this game, you will get 3 crystals, and you can mill and buy new 
        </p>
        <p>Number of Crystals: {crystals.length}</p>

        {user ? (
          <div>
            <Link to={"/match"} className={"button"}>
              Play
            </Link>
            <div className="action">
              <p>Tokens: {user.tokens}</p>
              <p>Crystals: {user.crystals}</p>
            </div>
          </div>
        ) : (
          <p>You need to log-in to start playing!</p>
        )}
      </div>
    );
  }
}
