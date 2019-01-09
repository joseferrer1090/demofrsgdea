import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardTitle
} from "reactstrap";
import Select from "react-select";

class FormCreateGrupos extends Component {
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
                <CardHeader> Registro grupo de usuarios </CardHeader>
                <CardBody>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Código <span className="text-danger">*</span>{" "}
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Nombre <span className="text-dange">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-md-12">
                      <Card>
                        <CardBody>
                          <h4 className=""> Búsqueda de usuarios </h4>
                          <hr />
                          <br />
                          <form className="form">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Empresa{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Sede <span className="text-danger">
                                      *
                                    </span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione </option>{" "}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Dependencia{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select className="form-control">
                                    {" "}
                                    <option> Seleccione </option>{" "}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label> Usuarios disponibles </label>
                              <textarea className="form-control" disabled />
                            </div>
                          </form>
                        </CardBody>
                        <CardFooter>
                          <div className="float-right">
                            <button className="btn btn-secondary btn-sm">
                              {" "}
                              <i className="fa fa-search" /> Buscar
                            </button>{" "}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Seleccione usuario(s) asignados{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <select className="form-control">
                          {" "}
                          <option> Seleccione </option>{" "}
                        </select>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="">
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
                                Si esta opción se encuentra activada, Representa
                                que el grupo es visible en el sistema y se
                                podrán realizar operaciones entre cada uno de
                                los módulos correspondientes de la aplicación.
                                En caso contrario el grupo no se elimina del
                                sistema solo quedará inactiva e invisibles para
                                cada uno de los módulos correspondiente del
                                sistema
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      </div>
    );
  }
}

export default FormCreateGrupos;
