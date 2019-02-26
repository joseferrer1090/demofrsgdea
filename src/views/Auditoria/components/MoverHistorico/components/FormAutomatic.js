import React, { Component } from "react";
import PropTypes from "prop-types";

class FormAutomatic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>Probando el segundo componente</p>
      </div>
    );
  }
}

FormAutomatic.propTypes = {};

export default FormAutomatic;
