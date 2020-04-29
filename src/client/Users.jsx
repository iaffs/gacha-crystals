import React from "react";

export class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redeemedGift: false,
      tokens: [1],
      crystals: [1]
    };
  }

  renderUserInfo() {
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
          <td><img  src={img} width="50"/></td>
          <td>{color}</td>
          <td>{hardness}</td>
          <td>{rarity}</td>
          <td>{value}</td>
        </tr>
      );
    });
  }

  renderUserInfoHeader() {
    let header = Object.keys(crystals[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }

  render() {
    return (
      <div className="center">
          <h1>{}</h1>
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
