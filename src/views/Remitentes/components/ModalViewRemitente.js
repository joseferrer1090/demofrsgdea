import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from "reactstrap";

class ModalViewRemitente extends Component {
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
          <ModalHeader>Remitente</ModalHeader>
          <ModalBody>
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <tbody>
                  <tr>
                    <td> Identificación: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Nombre: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Email: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Teléfono: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Dirección: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Ciudad: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Estado: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Observación: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Fecha de Creación: </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td> Fecha de Modificación: </td>
                    <td> </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-secondary">
              {" "}
              <i
                className="fa fa-times"
                onClick={() => {
                  this.setState({ modal: false });
                }}
              />{" "}
              Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewRemitente.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewRemitente;
