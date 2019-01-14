import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle
} from "reactstrap";

class FormCreateTipoDocumental extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="container">
          <Row>
            <Col sm="8" md={{ offset: 2 }}>
              <Card>
                <CardHeader> Registro tipo documental </CardHeader>
                <CardBody>
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
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Dependencia <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <select className="form-control">
                          <option> Seleccione </option>
                        </select>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label> Hora de respuesta </label>
                        <input type="text" className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <Card body>
                        <CardTitle>
                          {" "}
                          Indices documentales <hr />{" "}
                        </CardTitle>
                        <p> Indices de tipo documental dinamico </p>
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
                            el Tipo documental es visible en el sistema y se
                            podrán realizar operaciones entre cada uno de los
                            módulos correspondientes de la aplicación. En caso
                            contrario el Tipo documental no se elimina del
                            sistema solo quedará inactivo e invisibles para cada
                            uno de los módulos correspondiente del sistema.
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button type="button" className="btn btn-secondary ">
                      <i className="fa fa-plus" /> Registrar{" "}
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default FormCreateTipoDocumental;
