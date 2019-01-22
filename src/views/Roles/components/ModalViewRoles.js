import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalViewRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewroles
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
        <ModalHeader> Ver roles </ModalHeader>
        <ModalBody>
          <div className="table-responsinve">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td> Código: </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Nombre: </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Descripción: </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Estado: </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Fecha de creación: </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> Fecha de modificación: </td>
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
    );
  }
}

ModalViewRoles.propTypes = {
  modalviewroles: PropTypes.bool.isRequired
};

export default ModalViewRoles;
