import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Buttom } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditstate
    };
  }
  render() {
    return (
      <div>
        <p>Probando el modal de editar</p>
      </div>
    );
  }
}

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired
};

export default ModalEditConglomerado;
