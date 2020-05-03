import React from "react";
import { withRouter, Link } from "react-router-dom";
const crystals = require("../server/shared/crystals");

export class Crystals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null,
      //  redeemedGift: false,
      //  value: null,
      // crystals: []
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchAndUpdateUserInfo();
      console.log("crystals/ reddeem: " + this.props.userObject.redeemedGift);
    }
  }

  renderCrystalData(crystalarray) {
    return crystalarray.map((crystal, index) => {
      const { id, name, img, color, hardness, rarity, value } = crystal;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>
            <img src={img} width="80" />
          </td>
          <td>{color}</td>
          <td>{hardness}</td>
          <td>{rarity}</td>
          <td>{value}</td>
        </tr>
      );
    });
  }

  renderCrystalHeader() {
    let header = Object.keys(crystals.crystals[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  async sellCrystal(e) {
    let cId = e.currentTarget.dataset.crystalid;
    const url = "/api/sellcrystal/" + cId;
    const response = await fetch(url);
    this.props.renderUserCrystalData.fetchAndUpdateUserInfo();
  }

  renderUserCrystals(crystalarray) {
    if (crystalarray.length === 0) {
      return (
        <tr key="0">
          <td colSpan="7">You have no crystals!</td>
        </tr>
      );
    }
    return crystalarray.map((crystal, index) => {
      const { id, name, img, hardness, rarity, value } = crystal;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>
            <img src={img} width="70" />
          </td>
          <td>{hardness}</td>
          <td>{rarity}</td>
          <td>{value}</td>
          <td><button data-crystalid={id} className="button" onClick={this.sellCrystal.bind(this)}>Sell</button></td>
        </tr>
      );
    });
  }

  renderUserCrystalHeader() {
    return (
      <tr>
        <th>NAME</th>
        <th>IMAGE</th>
        <th>HARDNESS</th>
        <th>RARITY</th>
        <th>VALUE</th>
        <th>MILL</th>
      </tr>
    );
  }

  render() {
    let user = null;
    if (this.props.renderUserCrystalData) {
      user = this.props.renderUserCrystalData.userObject;
    }

    return (
      <div className="center">
        {user ? (
          <div className="center special">
          <table id="crystals">
            <tbody>{this.renderUserCrystalHeader()}
              {this.renderUserCrystals(user.crystals)}
            </tbody>
          </table>
          </div>
        ) : (
          <div className="center special">
          <table id="crystals">
            <tbody>
              <tr>{this.renderCrystalHeader()}</tr>
              {this.renderCrystalData(crystals.crystals)}
            </tbody>
          </table>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Crystals);
