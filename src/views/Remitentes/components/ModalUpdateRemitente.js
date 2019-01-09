import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

class ModalUpdateRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalupdate
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
          <ModalHeader> Actualizar remitente </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                <form className="form">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <tbody>
                        <tr>
                          <td> Identificación </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Nombre </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Email </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Teléfono </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Dirección </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Pais </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              {" "}
                              <option> Seleccione </option>
                            </select>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Departamento </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              {" "}
                              <option> Seleccione </option>
                            </select>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Ciudad </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              {" "}
                              <option> Seleccione </option>
                            </select>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Estado </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              {" "}
                              <option> Activo </option>{" "}
                              <option> Inactivo </option>{" "}
                            </select>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Observación </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <Button
              className="btn btn-secodary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalUpdateRemitente.propTypes = {
  modalupdate: PropTypes.bool.isRequired
};

export default ModalUpdateRemitente;
