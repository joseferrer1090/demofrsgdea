import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from "reactstrap";

class ModalViewDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: this.props.modalview };
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
          <ModalHeader> Ver departamento </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <form className="form">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <tbody>
                        <tr>
                          <td> Código: </td>
                          <td> </td>
                        </tr>
                        <tr>
                          <td> Nombre de país: </td>
                          <td> </td>
                        </tr>
                        <tr>
                          <td> Nombre: </td>
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

ModalViewDepartamento.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewDepartamento;
