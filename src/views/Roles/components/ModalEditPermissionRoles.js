import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  UncontrolledAlert
} from "reactstrap";

class ModalEditPermissionRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditpermission,
      backdrop: true
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
        <Modal
          className="modal-lg"
          isOpen={this.state.modal}
          backdrop={this.state.backdrop}
        >
          <ModalHeader> Asignar permisos </ModalHeader>
          <ModalBody>
            <form>
              <Row>
                <Col sm="12">
                  <UncontrolledAlert color="warning">
                    <div className="text-center">
                      <i className="fa fa-exclamation-triangle" /> Tener en
                      cuenta que cuando se editan los permisos, puede afectar la
                      sesion de los usuario{" "}
                      <i className="fa fa-exclamation-triangle" />
                    </div>
                  </UncontrolledAlert>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle>
                      {" "}
                      <h4>
                        {" "}
                        Asignar permisos <hr />{" "}
                      </h4>
                    </CardTitle>
                    <Row>
                      <Col sm="6">
                        <Card body>
                          <p className="text-center"> Permisos disponibles </p>
                        </Card>
                      </Col>
                      <Col sm="6">
                        <Card body>
                          <p className="text-center"> Permisos asignados </p>
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row />
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-warning">
              {" "}
              <i className="fa fa-lock" /> Editar permiso{" "}
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

ModalEditPermissionRoles.propTypes = {
  modaleditpermission: PropTypes.bool.isRequired
};

export default ModalEditPermissionRoles;
