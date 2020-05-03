import React from "react";
import { Link } from "react-router-dom";
//import crystals from '../server/shared/crystals';
import Crystals from "./Crystals";
const crystals = require("../server/shared/crystals");
const usercrystals = require("../server/shared/users");

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gift: 3,
      userObject: null,
      value: null,
      crystals: [],
      errorMsg: null,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchAndUpdateUserInfo();
      this.state.gift = this.props.userObject.gift;
      //this.setState({redeemedGift : this.props.userObject.redeemedGift})
      //console.log("home userobj: " + this.state.userObject.redeemedGift);
      //console.log(this.props.user);
      //console.log("this.props.use");
      //this.setState({redeemedGift : this.props.user.redeemedGift})
    }
  }

  handleClickGift = (event) => {
    // this.props.userObject.redeemedGift = true;
    //this.state...redeemedGift: true });
    this.setState({ gift: this.state.gift - 1 });
    this.redeemedGift(); //async api call
    this.props.fetchAndUpdateUserInfo();
  };

  handleLootBoxClick = (event) => {
    // generate random crystal

    // 1. check if user has enough money
    // 2. what is the price for the loot box?
    // 3. result of loot box - store in state + backend?
    // 4. update render?
    //const newCrystal = crystals.randomCrystal();
    //this.setState({crystals: [...this.state.crystals, crystal]});
    this.buyLootBox(); //async api call
    // update user info here
  };

  async redeemedGift() {
    const url = "/api/redeemedgift";
    const response = await fetch(url);

    if (response.status != 200) {
      this.setState({ errorMsg: "something went wrong" });
    }
  }

  async buyLootBox() {
    const url = "/api/buylootbox";
    const response = await fetch(url);
    if (response.status === 204) {
      console.log("user did not have enough money");
    }
    if (response.status != 200) {
      this.setState({ errorMsg: "something went wrong" });
      console.log("loot box button");
      console.log(this.state.buyLootBox);
    } else {
      console.log("ok");
      this.props.fetchAndUpdateUserInfo();
    }
  }

  render() {
    const user = this.props.userObject;
    //console.log(this.state.redeemedGift);
    //console.log(user);
    // let renderButton = this.renderButton();

    /*
    const gift = this.redeemedGift;
    let content;
    if (!gift) {
      content = this.renderNotGiftButton();
    } else {
      content = this.renderGiftButton(gift);
    }
    */
    return (
      <div className="main-content center">
        <h2 className="heading center">Play the Gacha Crystal game</h2>
        <p className="limited">
          Welcome to the Crystals! In this game, you will get 3 free crystals
          when you log in for the first time, and you can mill and buy random
          crystals with the value of the crystals you already redeemed!
        </p>
        <p>Number of existing Crystals: {crystals.crystals.length}</p>
        {user ? (
          <div className="home">
            <Link to={"/crystals"} className={"button"}>
              All Crystals
            </Link>
            <div className="center">
              <p className="wallet"> Wallet: {user.value} </p>
              <button
                onClick={this.handleClickGift}
                className="button"
                disabled={this.state.redeemedGift}
              >
                {this.state.gift > 0
                  ? this.state.gift + " gifts left"
                  : "No more gifts"}
              </button>
              <button onClick={this.handleLootBoxClick} className="button">
                buy loot-box
              </button>
            </div>
            <Crystals renderUserCrystalData={this.props}></Crystals>
          </div>
        ) : (
          <div className="main-content center">
            <p>You need to log-in to start playing!</p>
            <Crystals></Crystals>
          </div>
        )}
      </div>
    );
  }
}
