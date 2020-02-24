import React, { Component } from "react";
import PropTypes from "prop-types";
import Metadato from "./components/Metadato/index";

class MetaDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Metadato />
      </div>
    );
  }
}

export default MetaDatos;
