import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditUsersTipoDocumentalRadicacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditusers
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Actualizar asignación de usuarios </ModalHeader>
        <ModalBody>
          <p> Probando </p>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditUsersTipoDocumentalRadicacion.propTypes = {
  modaleditusers: PropTypes.bool.isRequired
};

export default ModalEditUsersTipoDocumentalRadicacion;
