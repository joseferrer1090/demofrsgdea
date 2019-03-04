import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalDeleteMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Eliminar mensajero</ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para eliminar el mensajero{" "}
            </p>

            <input
              className="form-control col-sm-6 offset-sm-3"
              type="text"
              placeholder=" "
              style={{ textAlign: "center" }}
            />
            <br />
            <p className="text-center text-danger">
              {" "}
              El mensajero quedará eliminada de manera permanente{" "}
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger btn-sm">
            {" "}
            <i className="fa fa-trash" /> Eliminar{" "}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteMensajero.propTypes = {
  modaldelete: PropTypes.bool.isRequired
};

export default ModalDeleteMensajero;
