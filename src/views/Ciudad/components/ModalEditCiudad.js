import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from "reactstrap";

class ModalEditCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
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
          <ModalHeader> Editar ciudad </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <form className="form">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <tbody>
                        <tr>
                          <td> Código: </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Datos del primer Get"
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Nombre: </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Datos del primer Get"
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Estado: </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              <option> Activo </option>
                              <option> Inactivo </option>
                            </select>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Fecha de Creación: </td>
                          <td>
                            {" "}
                            <input
                              className="form-control"
                              placeholder="Datos del primer Get"
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Fecha de Modificación: </td>
                          <td>
                            {" "}
                            <input
                              className="form-control"
                              placeholder="Datos del primer Get"
                            />{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </Col>
            </Row>
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
      </div>
    );
  }
}

ModalEditCiudad.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCiudad;
