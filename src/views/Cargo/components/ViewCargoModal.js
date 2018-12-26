import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalViewCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewcargo
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Cargo </ModalHeader>
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
                  <td>Descripcion:</td>
                  <td> </td>
                </tr>
                <tr>
                  <td>Estado:</td>
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
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewCargo.propTypes = {
  modalviewcargo: PropTypes.bool.isRequired
};

export default ModalViewCargo;
