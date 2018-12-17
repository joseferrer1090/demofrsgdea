import React, { Component } from "react";
import PropTypes from "prop-types";

class Cargo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <p> Probando </p>
      </div>
    );
  }
}

Cargo.propTypes = {};

export default Cargo;
