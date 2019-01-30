import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ModalViewAuditoria extends Component {
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
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Detalle de la auditoría </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tr>
                  <td> Fecha y hora de la auditoria: </td>
                  <td> Dato </td>
                </tr>
                <tr>
                  <td> Acción realizada: </td>
                  <td> Dato </td>
                </tr>
                {/* <tr>
                  <td> Tabla </td>
                  <td> Dato </td>
                </tr> */}
                <tr>
                  <td> Usuario que realizó la acción: </td>
                  <td> Dato </td>
                </tr>
                <tr>
                  <td> Tipo de usuario: </td>
                  <td> Dato </td>
                </tr>
                {/* <tr>
                  <td> Sentencia ejecutada: </td>
                  <td>
                    <code> Setencia ejecuatada </code>
                  </td>
                </tr> */}
              </table>
            </div>
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
      </div>
    );
  }
}

ModalViewAuditoria.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewAuditoria;
