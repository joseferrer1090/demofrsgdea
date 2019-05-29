import React, { Component } from "react";
import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from "reactstrap";
import PropTypes from "prop-types";

class FormManual extends Component {
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
              <CardHeader>
                <i className="fa fa-server" />
                Movimiento Histórico manual
              </CardHeader>
              <CardBody>
                <p className="text-justify">
                  {" "}
                  Si desea mover los registros del <b>“Log de Auditoria”</b> en
                  tiempo real, puede utilizar esta opción, con el fin de liberar
                  espacio y mejorar el rendimiento de las consultas. Los datos
                  se moverán a un repositorio de históricos de auditorias, el
                  cual podrá consultar.
                </p>
                <Card body>
                  <form role="form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Fecha desde <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Fecha hasta <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <input
                            type="date"
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
                            Operación <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>Selecciones</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Módulo <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option> Seleccione... </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Entidad <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>Selecciones</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Acción <span className="text-danger">*</span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option> Seleccione... </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </Card>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary btn-sm">
                    {" "}
                    <i className="fa fa-gear" /> Mover a histórico{" "}
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

FormManual.propTypes = {};

export default FormManual;
