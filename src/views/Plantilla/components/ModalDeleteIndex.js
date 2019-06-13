import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalDeletePlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldeleteindex
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
        <ModalHeader> Eliminar índice de la plantilla</ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para el índice de la planitilla{" "}
            </p>

            <input
              className="form-control col-sm-6 offset-sm-3 form-control-sm"
              type="text"
              placeholder=""
              style={{ textAlign: "center" }}
            />
            <br />
            <p className="text-center text-danger">
              {" "}
              El índice quedara eliminado de manera permanente.{" "}
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-danger btn-sm">
            {" "}
            <i className="fa fa-trash" /> Eliminar{" "}
          </button>
          <button
            className="btn btn-secondary btn-sm"
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

ModalDeletePlantilla.propTypes = {
  modaldeleteindex: PropTypes.bool.isRequired
};

export default ModalDeletePlantilla;
