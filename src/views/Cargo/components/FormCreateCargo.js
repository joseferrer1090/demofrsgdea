import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput
} from "reactstrap";

class FormCreateCargo extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="">
          <>
            <div className="col-sm-8 offset-md-2">
              <Card>
                <CardHeader> Registro de cargo </CardHeader>
                <CardBody>
                  <form className="form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Código <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
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
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Descripción</label>
                          <textarea className="form-control" placeholder="" />
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
                          <div className="">
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
                  </form>
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
          </>
        </div>
      </div>
    );
  }
}

FormCreateCargo.propTypes = {};

export default FormCreateCargo;
