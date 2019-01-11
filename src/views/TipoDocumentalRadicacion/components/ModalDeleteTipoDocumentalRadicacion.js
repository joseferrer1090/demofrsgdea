import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class ModalDeleteTipoDocumental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Eliminar tipo documental </ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para eliminar el tipo
              documental{" "}
            </p>

            <input
              className="form-control col-sm-6 offset-sm-3"
              type="text"
              placeholder=""
              style={{ textAlign: "center" }}
            />
            <br />
            <p className="text-center text-danger">
              {" "}
              El tipo documental quedará eliminado de manera permanente.{" "}
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteTipoDocumental.propTypes = {
  modaldelete: PropTypes.bool.isRequired
};

export default ModalDeleteTipoDocumental;
