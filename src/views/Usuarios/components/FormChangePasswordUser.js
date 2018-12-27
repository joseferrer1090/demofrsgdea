import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";

class ModalChangePasswordUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalpassword
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
        <ModalHeader> Cambiar contraseña </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="12">
              <p className="text-muted" style={{ textAlign: "justify" }}>
                Tener en cuenta que previamente se debe notificar al usuario{" "}
                <code>Nombre</code>, que la constraseña se va a actular. en caso
                contrario se le puede borrar las operaciones que se esten
                realizando en el sistema.
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <form className="form">
                    <div className="form-group">
                      <label>
                        {" "}
                        Nueva contraseña <span className="text-danger">
                          *
                        </span>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        {" "}
                        Confirmar nueva contraseña{" "}
                        <span className="text-danger"> * </span>{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-warning">
            {" "}
            <i className="fa fa-lock" /> Cambiar contraseña{" "}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalChangePasswordUser.propTypes = {
  modalpassword: PropTypes.bool.isRequired
};

export default ModalChangePasswordUser;
