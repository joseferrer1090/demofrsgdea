import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Card,
  CardBody,
  Col,
  Row
} from "reactstrap";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
    };
    this.inputOpenFileRef = React.createRef();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };
  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar usuario</ModalHeader>
        <ModalBody>
          <form className="form">
            <Row>
              <Col sm="3">
                <img
                  src={"https://via.placeholder.com/150"}
                  className="img-thumbnail"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={this.inputOpenFileRef}
                />
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={this.showOpenFileDlg}
                  style={{ width: "160px" }}
                >
                  <i className="fa fa-camera" /> Cambiar imagen{" "}
                </button>
              </Col>
              <Col sm="9">
                <Card>
                  <div className="table-responsive">
                    <table className="table table-striped table-sm">
                      <tbody>
                        <tr>
                          <td> Usuario </td>
                          <td>
                            {" "}
                            <input
                              type="text"
                              className="form-control"
                              disabled
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Identificacion </td>
                          <td>
                            {" "}
                            <input type="text" className="form-control" />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Nombre </td>
                          <td>
                            {" "}
                            <input type="text" className="form-control" />{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </Col>
              <div className="col-md-12">
                <Card>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped">
                      <tbody>
                        <tr>
                          <td> E-mail </td>
                          <td>
                            {" "}
                            <input className="form-control" type="text" />{" "}
                          </td>

                          <td> Teléfono </td>
                          <td>
                            {" "}
                            <input className="form-control" type="text" />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Dirección </td>
                          <td>
                            {" "}
                            <input type="text" className="form-control" />{" "}
                          </td>

                          <td> Fecha de nacimiento </td>
                          <td>
                            {" "}
                            <input type="text" className="form-control" />{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
              <div className="col-md-12">
                <Card>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped">
                      <tbody>
                        <tr>
                          <td> Roles </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              <option> Rol 1 </option>
                              <option> Rol 2 </option>
                              <option> Rol 3 </option>
                            </select>{" "}
                          </td>

                          <td> Cargo </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              <option> Cargo 1 </option>
                              <option> Cargo 2 </option>
                              <option> Cargo 3 </option>
                            </select>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td> Estado </td>
                          <td>
                            {" "}
                            <select className="form-control">
                              <option> Activo </option>
                              <option> Inactivo </option>
                            </select>{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </Row>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-outline-success">
            <i className="fa fa-pencil" /> Actualizar{" "}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditUser.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditUser;
