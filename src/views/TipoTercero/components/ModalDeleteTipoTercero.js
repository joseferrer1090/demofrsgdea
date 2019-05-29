import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalDeleteTipoTercero extends Component {
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
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Eliminar tipo de tercero </ModalHeader>
          <ModalBody>
            <form className="form">
              <p className="text-center">
                {" "}
                Confirmar el <code> Nombre </code> para eliminar el tipo de
                tercero{" "}
              </p>

              <input
                className="form-control form-control-sm col-sm-6 offset-sm-3"
                type="text"
                placeholder=""
                style={{ textAlign: "center" }}
              />
              <br />
              <p className="text-center text-danger">
                {" "}
                El tipo de tercero quedará eliminado de manera permanente.{" "}
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
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalDeleteTipoTercero.propTypes = {
  modaldelete: PropTypes.bool.isRequired
};

export default ModalDeleteTipoTercero;
