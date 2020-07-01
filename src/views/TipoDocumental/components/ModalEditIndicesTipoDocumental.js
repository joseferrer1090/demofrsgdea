import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";

class ModalEditIndicesTipoDocumental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalindices
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
        <ModalHeader> Actualizar Indices </ModalHeader>
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

ModalEditIndicesTipoDocumental.propTypes = {
  modalindices: PropTypes.bool.isRequired
};

export default ModalEditIndicesTipoDocumental;
