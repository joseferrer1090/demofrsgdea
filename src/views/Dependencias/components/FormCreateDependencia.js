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
  Buttom
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
                          className="form-control"
                          placeholder="Dato alfanumerico"
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
                          placeholder="Dato importante"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Rol responsable <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <select className="form-control">
                          <option> Rol 1 </option>
                          <option> Rol 2 </option>
                          <option> Rol 3 </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Sede <span className="text-danger">*</span>{" "}
                        </label>
                        <select className="form-control">
                          <option> Sede 1</option>
                          <option> Sede 2 </option>
                          <option> Sede 3 </option>
                        </select>
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
                            Si esta opción se encuentra activada, representa que
                            la dependencia es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso contrario
                            la dependencia no se elimina del sistema solo
                            quedará inactivo e invisibles para cada uno de los
                            módulos correspondiente del sistema.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <Button className="bntn btn-secondary">
                    {" "}
                    <i className="fa fa-plus" /> Registrar{" "}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

FromCreateDependencia.propTypes = {};

export default FromCreateDependencia;
