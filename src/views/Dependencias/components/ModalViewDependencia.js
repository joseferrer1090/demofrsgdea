import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

class ModalViewDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalView
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
          <ModalHeader> Probando </ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>Codigo:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Nombre:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Rol responsable:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Nombre de la sede</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Estado</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Fecha de creacion:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Fecha de modificacion:</td>
                    <td> </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              {" "}
              Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewDependencia.propTypes = {
  modalView: PropTypes.bool.isRequired
};

export default ModalViewDependencia;
