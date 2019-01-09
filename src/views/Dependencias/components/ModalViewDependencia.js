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
          <ModalHeader> Ver dependencia </ModalHeader>
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
                    <td>Rol responsable:</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Sede:</td>
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
            <Button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
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
