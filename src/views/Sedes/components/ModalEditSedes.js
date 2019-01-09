import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
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
          <ModalHeader> Editar Sede </ModalHeader>
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
            <button className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button className="btn btn-secondary">
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditSedes;
