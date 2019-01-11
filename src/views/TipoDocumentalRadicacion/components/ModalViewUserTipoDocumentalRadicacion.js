import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";

class ModalViewUserTipoDocumentalRadicacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewusers,
      backdrop: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal} backdrop={this.state.backdrop}>
        <ModalHeader> Usuarios asignados </ModalHeader>
        <ModalBody>
          <p> Probando </p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
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

ModalViewUserTipoDocumentalRadicacion.propTypes = {
  modalviewusers: PropTypes.bool.isRequired
};

export default ModalViewUserTipoDocumentalRadicacion;
