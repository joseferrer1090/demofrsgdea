import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import PropTypes from "prop-types";

class ModalViewUser extends Component {
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
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalBody role="document">
          <Row>
            <Col sm="3">
              <img
                src={"https://via.placeholder.com/150"}
                className="img-thumbnail"
              />
            </Col>
            <Col sm="9">
              <Card>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <tbody>
                      <tr>
                        <td> Usuario </td>
                        <td> Dato </td>
                      </tr>
                      <tr>
                        <td> Identificacion </td>
                        <td> Dato </td>
                      </tr>
                      <tr>
                        <td> Nombre </td>
                        <td> Dato </td>
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
                        <td> Dato </td>

                        <td> Teléfono </td>
                        <td> Dato </td>
                      </tr>
                      <tr>
                        <td> Dirección </td>
                        <td> Dato </td>

                        <td> Fecha de nacimiento </td>
                        <td> Dato </td>
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
                        <td> Dato </td>

                        <td> Cargo </td>
                        <td> Dato </td>
                      </tr>
                      <tr>
                        <td> Fecha de creación </td>
                        <td> Datos </td>

                        <td> Fecha de Modificación </td>
                        <td> Dato </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewUser.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewUser;
