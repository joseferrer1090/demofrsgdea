import React, { Component } from "react";
import PropTypes from "prop-types";
import TableContent from "./components/TableContentMetadata";

class ListaMetadato extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>Lista de metadatos</p>
      </div>
    );
  }
}

ListaMetadato.propTypes = {};

export default ListaMetadato;
