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

class ModalEditPais extends Component {
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
          <ModalHeader> Actualizar país </ModalHeader>
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
                              placeholder=""
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
                              placeholder=""
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
                      </tbody>
                    </table>
                  </div>
                </form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button
              type="button"
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

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditPais;
