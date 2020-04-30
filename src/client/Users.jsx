
import React from "react";
import { withRouter, Link } from "react-router-dom";

export class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redeemedGift: false,
      value: [1],
      crystals: [1]
    };
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

export default withRouter(Users);