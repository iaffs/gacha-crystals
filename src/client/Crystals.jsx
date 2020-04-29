import React from "react";
import { withRouter } from "react-router-dom";

export class Crystals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null,
      crystals: 15
    };
  }
}
