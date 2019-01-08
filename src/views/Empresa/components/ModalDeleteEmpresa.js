import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class ModalDeleteEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelempresa
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar empresa </ModalHeader>
          <ModalBody>
            <form className="form">
              <p className="text-center">
                {" "}
                Confirmar el <code> Nombre </code> para eliminar la Empresa{" "}
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
                La empresa quedará eliminada de manera permanente{" "}
              </p>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-danger">
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalDeleteEmpresa.propTypes = {
  modaldelempresa: PropTypes.bool.isRequired
};

export default ModalDeleteEmpresa;
