import React from "react";
import { withRouter, Link } from "react-router-dom";
const crystals = require('../server/shared/crystals');
const usercrystals = require('../server/shared/users');

export class Crystals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null,
      redeemedGift: false,
      value: null,
      crystals: []
    };
  }

  renderCrystalData(crystalarray) {
    return crystalarray.map((crystal, index) => {
      const { id, name, img, color, hardness, rarity, value } = crystal;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td><img  src={img} width="50"/></td>
          <td>{color}</td>
          <td>{hardness}</td>
          <td>{rarity}</td>
          <td>{value}</td>
        </tr>
      );
    });
  }

  renderUserCrystals() {
    const allUserCrystals = this.state.usercrystals.crystals;

    if (allUserCrystals == undefined || allCrystals.length <= 0)
    return;


    return usercrystals.crystals.map((crystal, index) => {
      const {name, img, hardness, rarity, value} = crystal;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td><img  src={img} width="50"/></td>
          <td>{hardness}</td>
          <td>{rarity}</td>
          <td>{value}</td>
          <td><button className="button">Sell</button></td>
        </tr>
      )
    });
  }
// {this.renderUserCrystals(usercrystals.crystals)}

  renderCrystalHeader() {
    let header = Object.keys(crystals.crystals[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  render() {
    console.log("hei og hå");
    console.log(this.props);
    if (this.props.renderCrystalData) {
    console.log(this.props.renderCrystalData.user);      
    }
    return (
      <div className="center">
          <table id='crystals'>
               <tbody>
               <tr>{this.renderCrystalHeader()}</tr>
                  {this.renderCrystalData(crystals.crystals)}
               </tbody>
            </table>
      </div>
    );
  }
}


export default withRouter(Crystals);