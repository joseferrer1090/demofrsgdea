import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";

class ModalViewEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewempresa
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
          <ModalHeader> Ver empresa </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Conglomerado:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Código:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Nombre:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Estado: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Rol responsable: </td>
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

ModalViewEmpresa.propTypes = {
  modalviewempresa: PropTypes.bool.isRequired
};

export default ModalViewEmpresa;
