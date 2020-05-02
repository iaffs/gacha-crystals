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
      redeemedGift: false,
      value: null,
      crystals: [],
      errorMsg: null,
    };
    if (this.props.user) {
      console.log("settes her");
      this.state.redeemedGift = this.props.user.redeemedGift;
    }

    console.log("props her");
    console.log(props);
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchAndUpdateUserInfo();
      //console.log(this.props.user);
      //console.log("this.props.use");
      //this.setState({redeemedGift : this.props.user.redeemedGift})
    }
  }

  renderButton() {

    return (
      <React.Fragment>
        <button class="button">Redeem gift!</button>
      </React.Fragment>
    );
  }

  /*
  renderGiftButton(user) {
    return (
        <button className="button" onClick={this.getFreeCrystal}>
          You have free gift!
        </button>
    );
  }

  renderNotGiftButton() {
    return (
          <button className="button">
            No free gift left
          </button>
          
    );
  }
  */

  /*
  getFreeCrystal() {
    const url = "api/getfreecrystal";
    fetch(url)
    .then(res => {
      if (res.status == 200) {
        this.fetchAndUpdateUserInfo();
      }
    })
  }

  async updateCrystals() {
    const url = "api/user";
    let response;
    try {
      response = await fetch(url);
    } catch (err) {
      this.setState({
      value: null,
      crystals: [],
      errorMsg: "Error when retrieving inventory: " + errorMsg
      });
      return;
    }

    if (response.status === 401) {
      this.props.fetchAndUpdateUserInfo(null);
      return;
    }

    if (response.status === 200) {
      const result = await response.json();
      this.setState({
        id: result.id,
        value: result.value,
        crystals: result.crystals
      });

      this.props.fetchAndUpdateUserInfo(result.id);

    } else {
      this.setState({
        value: null,
        crystals: null,
        errorMsg: "Problems with HTTP. Status code: " + response.status
      })
    }
  }
  */

  handleClickGift = (event) => {
    this.setState({ redeemedGift: true });
    this.redeemedGift();
  };

  async redeemedGift() {
    const url = "/api/redeemedgift";
    const response = await fetch(url);

    if (response.status != 200) {
      this.setState({ errorMsg: "something went wrong" });
      
    }
  }

  async buyCrystal() {
    const url = "api/buycrystal";
    const response = await fetch(url);
    if (response.status != 200) {
      this.setState({errorMsg: "something went wrong"});
    }
  }

  render() {
    const user = this.props.user;
    //console.log(this.state.redeemedGift);
    //console.log(user);
    let renderButton = this.renderButton();
    
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
          when you log in for the first time, and you can mill and buy
          random crystals with the value of the crystals you already redeemed!
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
              <div>
              <button
                onClick={this.handleClickGift}
                disabled={this.state.redeemedGift}
                className="button">
                {this.state.redeemedGift ? "Gift redeemed" : "Get free gift"}
              </button>
              <button
                onClick={this.buyCrystal}
                className="button">
                  buy loot-box
              </button>
              </div>
              <Crystals
                renderCrystalData={this.props}
              ></Crystals>
            </div>
          </div>
        ) : (
          <div className="main-content center">
            <p>You need to log-in to start playing!</p>
            <Crystals
              renderCrystalData={this.props.renderCrystalData}
            ></Crystals>
          </div>
        )}
      </div>
    );
  }
}
