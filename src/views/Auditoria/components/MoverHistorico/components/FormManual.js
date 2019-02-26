import React, { Component } from "react";
import PropTypes from "prop-types";

class FormManual extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>Probando el primer componente</p>
      </div>
    );
  }
}

FormManual.propTypes = {};

export default FormManual;
