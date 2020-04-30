import React from "react";
import { withRouter, Link } from "react-router-dom";
import crystals from "../server/db/crystals";

export class Crystals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null,
      crystals: []
    };
  }

  renderCrystalData() {
    //let crysArray;
    //console.log(this.props.user)
    //if (typeof this.props.user !== 'undefined') {
      //crysArray = this.props.user.crystals
      //} else {
        //crysArray = crystals;
    return crystals.map((crystal, index) => {
      const { id, name, img, color, hardness, rarity, value } = crystal;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td><img  src={img} width="60"/></td>
          <td>{color}</td>
          <td>{hardness}</td>
          <td>{rarity}</td>
          <td>{value}</td>
        </tr>
      );
    });
  }

  renderCrystalHeader() {
    let header = Object.keys(crystals[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  render() {
    return (
      <div className="center">
        <Link to={"/"} className={"button"}>Back</Link>
          <h1>All possible Crystals</h1>
          <table id='crystals'>
               <tbody>
                  <tr>{this.renderCrystalHeader()}</tr>
                  {this.renderCrystalData()}
               </tbody>
            </table>
      </div>
    );
  }
}


export default withRouter(Crystals);
