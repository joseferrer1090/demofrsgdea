import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
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
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Actualizar conglomerado </ModalHeader>
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
                          placeholder=""
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
                          placeholder=""
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
                          placeholder=""
                        />{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success">
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
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
