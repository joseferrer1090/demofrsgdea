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
      backdrop: false
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
                    <i className="fa fa-exclamation-triangle" /> Tener en cuenta
                    que cuando se editan los permisos, puede afectar la sesion
                    de los usuario <i className="fa fa-exclamation-triangle" />
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
                      <Col sm="4">
                        <div className="card">
                          <div className="card-header">
                            {" "}
                            <input type="checkbox" /> Conglomerado{" "}
                          </div>
                          <div className="card-body">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Registrar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Consultar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Ver
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Actualizar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Eliminar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Exportar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Importar
                              </Label>
                            </FormGroup>
                          </div>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="card">
                          <div className="card-header">
                            {" "}
                            <input type="checkbox" /> Empresa{" "}
                          </div>
                          <div className="card-body">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Registrar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Consultar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Ver
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Actualizar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Eliminar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Exportar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Importar
                              </Label>
                            </FormGroup>
                          </div>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="card">
                          <div className="card-header">
                            {" "}
                            <input type="checkbox" /> Sede{" "}
                          </div>
                          <div className="card-body">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Registrar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Consultar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Ver
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" />{" "}
                                Actualizar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Eliminar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Exportar
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name="radio1" /> Importar
                              </Label>
                            </FormGroup>
                          </div>
                        </div>
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
