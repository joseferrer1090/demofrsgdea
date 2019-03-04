import React, { Component } from "react";
import PropType from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";

class FormCreateMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader>Registro mensajero</CardHeader>
              <CardBody>
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Identificación <span className="text-danger">
                            *
                          </span>{" "}
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
                          {" "}
                          Nombre <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label> Descripción </label>
                        <textarea className="form-control form-control-sm" />
                      </div>
                    </div>
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
                <div className="float-right">
                  <button className="btn btn-secondary btn-sm">
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

FormCreateMensajero.propType = {};

export default FormCreateMensajero;
