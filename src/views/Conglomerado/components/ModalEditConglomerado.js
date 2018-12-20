import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditstate
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader> Conglomerado </ModalHeader>
          <ModalBody>
            <form className="form">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Código</td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Dato desde el primer GET"
                        />{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Dato desde el primer GET"
                        />{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>Descripción</td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Dato desde el primer GET"
                        />{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-outline-success">
              <i className="fa fa-pencil" /> Actualizar registro{" "}
            </Button>
            <Button
              className="btn btn-outline-secondary"
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

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired
};

export default ModalEditConglomerado;
