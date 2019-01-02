import React, { Component } from "react";
import PropTypes from "prop-types";

class TableContentRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <p> Soy el componente Tabla</p>
      </div>
    );
  }
}

TableContentRemitente.propTypes = {};

export default TableContentRemitente;
