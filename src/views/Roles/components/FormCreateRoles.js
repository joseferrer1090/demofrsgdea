import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Label,
  Input,
  CardText,
  CardTitle
} from "reactstrap";

class FormCreateRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="10" md={{ offset: 1 }}>
            <Card>
              <CardHeader> Registro de rol </CardHeader>
              <CardBody>
                <form>
                  <Row>
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Código <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nombre <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </Col>
                  </Row>
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
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Eliminar
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Exportar
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Importar
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
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Eliminar
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Exportar
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Importar
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
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Eliminar
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Exportar
                                  </Label>
                                </FormGroup>
                                <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" name="radio1" />{" "}
                                    Importar
                                  </Label>
                                </FormGroup>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Estado <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            Activar
                          </label>
                          <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            Si esta opción se encuentra activada, representa que
                            el rol es visible en el sistema y se podrán realizar
                            operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso contrario
                            el rol no se elimina del sistema solo quedará
                            inactivo e invisibles para cada uno de los módulos
                            correspondiente del sistema.
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button type="button" className="btn btn-secondary">
                    {" "}
                    <i className="fa fa-plus" /> Registrar{" "}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormCreateRoles;
