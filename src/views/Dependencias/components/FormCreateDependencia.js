import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Row,
  Col,
  Buttom,
  CustomInput
} from "reactstrap";
import Select from "react-select";

class FromCreateDependencia extends Component {
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
                <CardHeader>Registro de dependencia</CardHeader>
                <CardBody>
                  <form className="form" role="form">
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Descripción </label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Conglomerado <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option> Seleccione </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Empresa <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Sede <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <opotion>Seleccione</opotion>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Cargo responsable </label>
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
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
                              id="ExampleInputCheckbox"
                              label=" Si esta opción se encuentra activada, representa
                              que la dependencia es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario la dependencia no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema."
                            />
                            {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que la dependencia es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario la dependencia no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema.
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <Button className="bntn btn-secondary btn-sm">
                      {" "}
                      <i className="fa fa-plus" /> Registrar{" "}
                    </Button>
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

FromCreateDependencia.propTypes = {};

export default FromCreateDependencia;
