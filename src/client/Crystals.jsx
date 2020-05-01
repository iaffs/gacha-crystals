import React from "react";
import { withRouter, Link } from "react-router-dom";
const crystals = require('../server/shared/crystals');

export class Crystals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null,
      redeemedGift: false,
      value: 1,
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
    return crystals.crystals.map((crystal, index) => {
      const {name, img, hardness, rarity, value} = crystal;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td><img  src={img} width="50"/></td>
          <td>{hardness}</td>
          <td>{rarity}</td>
          <td>{value}</td>
        </tr>
      )
    });
  }

  renderCrystalHeader() {
    let header = Object.keys(crystals.crystals[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  render() {
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