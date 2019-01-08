import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PropTypes from "prop-types";

class ModalViewConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewstate
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
          <ModalHeader>Ver conglomerado </ModalHeader>
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
                    <td>Descripción:</td>
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
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
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

ModalViewConglomerado.propTypes = {
  modalviewstate: PropTypes.bool.isRequired
};

export default ModalViewConglomerado;
