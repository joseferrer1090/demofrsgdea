import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalViewTipoDocumental extends Component {
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
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Ver tipo documental </ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td> Código </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Nombre </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Dependencia </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Horas de respuestas </td>
                  <td />
                </tr>
                <tr>
                  <td> Indices documentales </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Estado </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Fecha de creación </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Fecha de modificación </td>
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
    );
  }
}

ModalViewTipoDocumental.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewTipoDocumental;
