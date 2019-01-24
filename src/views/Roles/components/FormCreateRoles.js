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
  CardTitle,
  Badge
} from "reactstrap";

import PermissionList from "./../componentsPermission/PermissionList";
import data from "./../../../data/data.json";

class FormCreateRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favPermission: []
    };
  }

  addPermission(id) {
    const newSet = this.state.favPermission.concat([id]);
    this.setState({
      favPermission: newSet
    });
  }

  deletePermission(id) {
    const { favPermission } = this.state;
    const newList = [
      ...favPermission.slice(0, id),
      ...favPermission.slice(id + 1)
    ];
    this.setState({
      favPermission: newList
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
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
                      <Col sm="12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Descripción <span className="text-danger">
                              *
                            </span>{" "}
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
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Modulo <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione... </option>{" "}
                                </select>
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Entidades{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione... </option>{" "}
                                </select>
                              </div>
                            </Col>
                            {/*  Aqui va la funcionalidad    */}

                            <Col sm="12">
                              <PermissionList
                                favourites={this.state.favourites}
                                addPermssionAssigned={this.addPermission.bind(
                                  this
                                )}
                              />
                            </Col>
                            <Col sm="12">
                              <Card body>
                                <p> otra lista </p>
                              </Card>
                            </Col>

                            {/*  Fin   */}
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
                              Si esta opción se encuentra activada, representa
                              que el rol es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el rol no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema.
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormCreateRoles;
