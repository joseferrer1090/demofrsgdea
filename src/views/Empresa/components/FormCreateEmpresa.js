import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import { isNull } from "util";

const dataConglomerado = [
  { value: "1", label: "Conglomerado 1" },
  { value: "2", label: "Conglomerado 2" },
  { value: "3", label: "Conglomerado 3" }
];

const dataRolResponsable = [{ value: "0", label: "Rol responsable" }];

class FormCreateEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionConglomerado: null,
      checked: true,
      selectedOptionRolResponsable: isNull
    };
  }

  handleChange = selectedOptionConglomerado => {
    this.setState({ selectedOptionConglomerado });
    console.log(`Option selected:`, selectedOptionConglomerado);
  };

  handleChangeRolResponsable = selectedOptionRolResponsable => {
    this.setState({ selectedOptionRolResponsable });
  };

  handleChangeSwitch = checked => {
    this.setState({ checked });
    console.log("estado es: ", this.state.checked);
  };

  render() {
    const { selectedOption, selectedOptionRolResponsable } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Card>
                <CardHeader> Registro de empresa </CardHeader>
                <CardBody>
                  <form className="form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Nit <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
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
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
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
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Conglomerado <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={dataConglomerado}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Cargo responsable{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <Select
                            value={selectedOptionRolResponsable}
                            onChange={this.handleChangeRolResponsable}
                            options={dataRolResponsable}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Descripción </label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="">
                            <div className="form-group">
                              <label>
                                {" "}
                                Estado <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <div className="">
                                <CustomInput
                                  type="checkbox"
                                  id="exampleCheck1"
                                  label="Si esta opción se encuentra activada,
                                  Representa que la empresa es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario la empresa no se
                                  elimina del sistema solo quedará inactiva e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema."
                                />

                                {/* <p
                                  className="text-muted"
                                  style={{ textAlign: "justify" }}
                                >
                                  Si esta opción se encuentra activada,
                                  Representa que la empresa es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario la empresa no se
                                  elimina del sistema solo quedará inactiva e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema.
                                </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="pull-right">
                    <button className="btn btn-secondary">
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

FormCreateEmpresa.propTypes = {};

export default FormCreateEmpresa;
