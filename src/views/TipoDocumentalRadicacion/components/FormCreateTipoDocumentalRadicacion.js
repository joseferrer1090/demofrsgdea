import React, { Component } from "react";
import { Row, Col, CustomInput } from "reactstrap";
import PropTypes from "prop-types";

class FormCreateTipoTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        Información básica
                      </div>
                      <div className="card-body">
                        <form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Tipo de correspondencia{" "}
                                  <span className="text-danger">* </span>
                                </label>
                                <select className="form-control form-control-sm">
                                  <option>Recibida</option>
                                  <option>Despachada</option>
                                  <option>Interna</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Código <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Nombre <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Descripción{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  Días máximos de respuesta{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  min={0}
                                />
                              </div>
                            </div>
                            <Col sm="12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Estado <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <div className="text-justify">
                                  <CustomInput
                                    type="checkbox"
                                    id="ExampleInputCheckbox"
                                    label="Si esta opción se encuentra activada, Representa que
                            el tipo documental de radicacion es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             la sede no se elimina del sistema solo quedará
                             inactiva e invisibles para cada uno de los módulos
                             correspondiente del sistema."
                                  />
                                </div>
                                {/* <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            {" "}
                            Si esta opción se encuentra activada, Representa que
                            la sede es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso contrario
                            la sede no se elimina del sistema solo quedará
                            inactiva e invisibles para cada uno de los módulos
                            correspondiente del sistema.
                          </p> */}
                              </div>
                            </Col>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        Usuarios disponibles
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> Conglomerado </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Empresa </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> Sede </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> Dependencia </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label> Buscar usuario </label>
                                <div className="input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    aria-label="Dollar amount (with dot and two decimal places)"
                                  />
                                  <div
                                    className="input-group-append"
                                    id="button-addon4"
                                  >
                                    <button
                                      className="btn btn-secondary"
                                      type="button"
                                    >
                                      <i className="fa fa-search" />
                                    </button>
                                    <button
                                      className="btn btn-secondary"
                                      type="button"
                                    >
                                      <i className="fa fa-plus" /> Agregar
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <textarea
                                className="form-control form-control-sm"
                                disabled
                                placeholder="Usuarios disponibles de la consulta"
                                rows={8}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        Usuarios disponibles
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col-md-12">
                              <table className="table table-bordered table-sm">
                                <thead className="thead-light">
                                  <tr className="text-center">
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Sede</th>
                                    <th scope="col">Dependencia</th>
                                    <th scope="col">Original</th>
                                    <th scope="col">Eliminar</th>
                                  </tr>
                                </thead>
                                <tbody className="text-center">
                                  <tr>
                                    <td scope="row">
                                      NOMBRE COMPLETO DEL USUARIO
                                    </td>
                                    <td>SEDE I</td>
                                    <td>DEPENDENCIA I</td>
                                    <td>
                                      <CustomInput
                                        type="radio"
                                        id="exampleCustomCheckbox2"
                                      />{" "}
                                    </td>
                                    <td>
                                      {" "}
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                      >
                                        <i className="fa fa-trash" />
                                      </button>{" "}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">Asunto</div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Asunto</label>
                                <textarea className="form-control form-control-sm" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        Plantilla
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Plantilla</label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        Workflow
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Asunto</label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="float-right">
                  <button type="button" className="btn btn-secondary btn-sm">
                    {" "}
                    + Registrar{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormCreateTipoTramite;
