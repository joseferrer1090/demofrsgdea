import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalViewSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview
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
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Ver sede </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Código:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Nombre:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Prefijo de radicación:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Dirección:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Teléfono:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Secuencia de radicación:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Ciudad:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Estado:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Fecha de creación:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Fecha de modificación:</td>
                    <td> </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      </div>
    );
  }
}

ModalViewSedes.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewSedes;
