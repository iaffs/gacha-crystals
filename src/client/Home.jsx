import React from "react";
import { Link } from "react-router-dom";
//import crystals from '../server/shared/crystals';
import Crystals from "./Crystals";
const crystals = require('../server/shared/crystals');


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
      <div className="main-content center">
        <h2 className="heading center">Play the Gacha Crystal game</h2>
        <p>
          Welcome to the Crystals! In this game, you will get 3 crystals, 
          and you can mill and buy loot-boxes with new ones for you
        </p>
        <p>Number of existing Crystals: {crystals.crystals.length}</p>
        {user ? (
          <div>
            <Link to={"/crystals"} className={"button"}>
              All Crystals
            </Link>
            <div className="action center">
              <p>Wallet: {user.value}</p>
              <p>Crystals: {user.crystals}</p>
              <Crystals renderCrystalData={this.props.renderCrystalData}></Crystals>
            </div>
            
          </div>
        ) : (
          <div className="main-content center">
          <p>You need to log-in to start playing!</p>
          <Crystals renderCrystalData={this.props.renderCrystalData}></Crystals>
            </div>
        )}
      </div>
    );
  }
}
