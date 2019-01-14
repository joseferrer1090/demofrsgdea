import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import DatePicker from "react-datepicker";
import "./../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "./../../../css/custom_calendar.css";
import Select from "react-select";

const dataExampleDependencia = [
  { value: "departamento1", label: "departamento 1" },
  { value: "departamento2", label: "departamento 2" },
  { value: "departamento3", label: "departamento 3" }
];

const dataExampleCargo = [
  { value: "cargo1", label: "Cargo 1" },
  { value: "cargo2", label: "Cargo 2" },
  { value: "cargo3", label: "Cargo 3" }
];

const dataExmapleRoles = [
  { value: "rol1", label: "rol 1" },
  { value: "rol2", label: "rol 2" },
  { value: "rol3", label: "rol 3" },
  { value: "rol4", label: "rol 4" }
];

class FormCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      selectedOptionDependencia: null,
      seledtedOptionCargo: null,
      selectedOptionRoles: null
    };
    this.inputOpenFileRef = React.createRef();
  }

  handleChangeFechaNacimiento = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeSelectedOptionCargo = seledtedOptionCargo => {
    this.setState({ seledtedOptionCargo });
    console.log(this.state.seledtedOptionCargo);
  };

  handleSelectedOptionDependencia = selectedOptionDependencia => {
    this.setState({ selectedOptionDependencia });
    console.log(this.state.selectedOptionDependencia);
  };

  handleSelectedOptionRoles = selectedOptionRoles => {
    this.setState({ selectedOptionRoles });
    console.log(this.state.selectedOptionRoles);
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  render() {
    const {
      selectedoptiondependencia,
      selectedoptioncargo,
      selectedOptionRoles
    } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="git">
          <Row>
            <Col sm="10" md={{ offset: 1 }}>
              <Card>
                <CardHeader>Registro de usuarios </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="3">
                      <div className="text-center">
                        <img
                          src={"/assets/img/avatar2.png"}
                          className="img-thumbnail"
                        />
                        <br />
                        <br />
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={this.inputOpenFileRef}
                        />
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm "
                          style={{ width: "160px" }}
                          onClick={this.showOpenFileDlg}
                        >
                          {" "}
                          <i className="fa fa-camera" /> Cambiar imagen{" "}
                        </button>
                      </div>
                    </Col>

                    <Col sm="9">
                      <form className="from">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Identificación{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Nombre <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Email <span className="text-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Teléfono <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label> Dirección </label>
                              <textarea className="form-control" />
                            </div>
                          </div>
                        </div>
                        <hr style={{ border: "1px dashed #ccc" }} />
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Fecha de nacimiento{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeFechaNacimiento}
                                className="form-control large"
                                placeholderText=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Nombre de usuario{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Contraseña{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input className="form-control" type="password" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Repetir contaseña{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input className="form-control" type="password" />
                            </div>
                          </div>
                        </div>
                        <hr style={{ border: "1px dashed #ccc" }} />
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Dependencia{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <Select
                                value={selectedoptiondependencia}
                                onChange={this.handleSelectedOptionDependencia}
                                options={dataExampleDependencia}
                                placeholder={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Cargo <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <Select
                                value={selectedoptioncargo}
                                onChange={this.handleChangeSelectedOptionCargo}
                                options={dataExampleCargo}
                                placeholder={""}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Roles <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <Select
                                value={selectedOptionRoles}
                                onChange={this.handleSelectedOptionRoles}
                                options={dataExmapleRoles}
                                placeholder={"Selecciones los roles"}
                                isMulti
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Estado <span className="text-danger">
                                  *
                                </span>{" "}
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
                                  Si esta opción se encuentra activada,
                                  representa que el usuario es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario el usuario no se
                                  elimina del sistema solo quedará inactivo e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button className="btn btn-secondary">
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

FormCreateUser.propTypes = {};

export default FormCreateUser;
