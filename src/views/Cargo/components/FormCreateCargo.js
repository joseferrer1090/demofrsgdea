import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  Table
} from "reactstrap";
import data from "./../../../data/data";

class FormCreateCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">
            <Card>
              <CardHeader>Asignar responsabilidades</CardHeader>
              <CardBody>
                <Row>
                  <Col sm="6">
                    <Card body>
                      <h5 className="card-title">
                        Conglomerado <span className="text-danger">*</span>
                      </h5>
                      <p className="card-text text-justify">
                        Esta asignando este cargo como responsable del
                        conglomerado:
                      </p>
                      <select className="form-control form-control-sm">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                      <br />
                      <CustomInput
                        type="checkbox"
                        id="IdResponsableConglomerado"
                        label="Responsable ?"
                      />
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <h5 className="card-title">
                        Empresa <span className="text-danger">*</span>
                      </h5>
                      <p className="card-text text-justify">
                        Esta asignando este cargo como responsable del empresa:
                      </p>
                      <select className="form-control form-control-sm">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                      <br />
                      <CustomInput
                        type="checkbox"
                        id="IdResponsableEmpresa"
                        label="Responsable ?"
                      />
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <Card body>
                      <h5 className="card-title">
                        Sede <span className="text-danger">*</span>
                      </h5>
                      <p className="card-text text-justify">
                        Esta asignando este cargo como responsable de la Sede:
                      </p>
                      <select className="form-control form-control-sm">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                      <br />
                      <CustomInput
                        type="checkbox"
                        id="IdResponsableSede"
                        label="Responsable ?"
                      />
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <h5 className="card-title">
                        Dependencia <span className="text-danger">*</span>
                      </h5>
                      <p className="card-text text-justify">
                        Esta asignando este cargo como responsable de la
                        dependencia:
                      </p>
                      <select className="form-control form-control form-control-sm">
                        {" "}
                        <option> Seleccione </option>{" "}
                      </select>
                      <br />
                      <CustomInput
                        type="checkbox"
                        id="IdResponsableDependencia"
                        label="Responsable ?"
                      />
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
          <div className="col-md-6 ">
            <Card>
              <CardHeader> Registro de cargo </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Código <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Nombre <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label> Descripción</label>
                      <textarea
                        className="form-control form-control-sm"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          type="checkbox"
                          id="ExampleCheckboxInput"
                          label=" Si esta opción se encuentra activada, representa
                              que el cargo es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el cargo no se elimina del sistema solo
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
                              que el cargo es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el cargo no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema.
                            </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <div className="pull-right">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      console.log("probando");
                    }}
                  >
                    {" "}
                    <i className="fa fa-plus" /> Registrar{" "}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

FormCreateCargo.propTypes = {};

export default FormCreateCargo;
