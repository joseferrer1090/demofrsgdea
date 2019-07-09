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
  Badge,
  CustomInput
} from "reactstrap";

import ListaRoles from "./../componentsPermission/ListaRoles";
import NuevaListaRoles from "./../componentsPermission/NuevaListaRoles";

class FormCreateRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: []
    };
  }

  addFavourite(id) {
    const newSet = this.state.favourites.concat([id]);
    console.log("voy por este lado", id);
    this.setState({
      favourites: newSet
    });
  }

  deleteFavourite(id) {
    const { favourites } = this.state;
    const newList = [...favourites.slice(0, id), ...favourites.slice(id + 1)];
    this.setState({
      favourites: newList
    });
  }

  render() {
    console.log(this.state.favourites);
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
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Nombre <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </Col>
                      <Col sm="12">
                        <div className="form-group">
                          <label> Descripción</label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <CardTitle>
                          {" "}
                          <h5>
                            {" "}
                            Asignar permisos <hr />{" "}
                          </h5>
                        </CardTitle>
                        <Row>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Módulo <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <select className="form-control form-control-sm">
                                {" "}
                                <option> Seleccione... </option>{" "}
                              </select>
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Entidades <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <select
                                className="form-control form-control-sm
                                "
                              >
                                {" "}
                                <option> Seleccione... </option>{" "}
                              </select>
                            </div>
                          </Col>
                          {/*  Aqui va la funcionalidad    */}
                          <Row>
                            <div className="col-md-6">
                              <label className="col-md-12">
                                <dt>Permisos disponibles:</dt>
                              </label>
                              <ListaRoles
                                data={this.props.data}
                                favouritesroles={this.state.favourites}
                                addFavourite={this.addFavourite.bind(this)}
                              />
                              {/* <select
                                    multiple
                                    className="form-control"
                                    style={{
                                      width: "310px",
                                      marginLeft: "14px"
                                    }}
                                  >
                                    <option> Seleccione </option>
                                  </select> */}
                            </div>
                            <div className="col-md-6">
                              <label>
                                <dt>Permisos asignados:</dt>
                              </label>
                              <NuevaListaRoles
                                data={this.props.data}
                                favourites={this.state.favourites}
                                deleteFavourite={this.deleteFavourite.bind(
                                  this
                                )}
                              />
                              {/* <select
                                  multiple
                                  className="form-control"
                                  disabled
                                  style={{
                                    width: "310px",
                                    marginRight: "10px"
                                  }}
                                >
                                  <option> las nuevas opciones</option>
                                </select> */}
                            </div>
                          </Row>
                          {/*  Fin   */}
                        </Row>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col sm="12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Estado <span className="text-danger">*</span>{" "}
                          </label>
                          <div className="text-justify">
                            <CustomInput
                              type="checkbox"
                              id="ExampleCheckBoxInput"
                              label=" Si esta opción se encuentra activada, representa
                            que el rol es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso
                            contrario el rol no se elimina del sistema solo
                            quedará inactivo e invisibles para cada uno de los
                            módulos correspondiente del sistema."
                            />
                            {/* <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              Activar
                            </label> */}
                            {/* <p
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
                            </p> */}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button type="button" className="btn btn-secondary btn-sm">
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
