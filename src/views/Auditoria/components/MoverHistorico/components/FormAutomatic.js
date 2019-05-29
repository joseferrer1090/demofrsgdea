import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Col,
  Row,
  Collapse
} from "reactstrap";
import PropTypes from "prop-types";

class FormAutomatic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader>
                {" "}
                <i className="fa fa-server" /> Mover histórico automatico{" "}
              </CardHeader>
              <CardBody>
                <p className="text-justify">
                  Si desea mover los registros del <b>“Log de Auditoria” </b> de
                  forma programada, es decir que el sistema se encarga de
                  ejecutar esta acción, puede utilizar esta opción, con el fin
                  de liberar espacio y mejorar el rendimiento de las consultas.
                  Los datos se moverán a un repositorio de históricos de
                  auditorias, el cual podrá consultar.
                </p>
                <form role="form">
                  <div className="row">
                    <div className="col-md-12">
                      <Card body>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Fecha desde{" "}
                                <span className="text-danger">*</span>{" "}
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
                                Fecha hasta{" "}
                                <span className="text-danger">*</span>{" "}
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
                                <option>Seleccione</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Módulo <span className="text-danger">*</span>{" "}
                              </label>
                              <select className="form-control form-control-sm">
                                <option> Seleccione </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Entidad <span className="text-danger">*</span>
                              </label>
                              <select className="form-control form-control-sm">
                                {" "}
                                <option>Seleccione</option>{" "}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Acción <span className="text-danger">*</span>
                              </label>
                              <select className="form-control form-control-sm">
                                <option>Seleccione</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="col-md-12">
                      <Card body>
                        <form role="form">
                          <div className="row" />
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Periodo <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Hora <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <input
                                  type="time"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Día de semana{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Día del mes{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Mes <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Card>
                      <Card body>
                        <div className="row">
                          <div className="col-md-12">
                            <form role="form">
                              <div className="row">
                                <div className="col-md-12">
                                  <p className="text-justify">
                                    {" "}
                                    ¿Desea enviar una notificación al
                                    administrador del sistema indicando las
                                    horas o los dias antes en la cual se va a
                                    ejecutar la programación automática?
                                  </p>

                                  <div className="col-md-6 offset-3">
                                    <div className="offset-2">
                                      Sí{" "}
                                      <input
                                        type="radio"
                                        name="notificacion"
                                        onClick={() => {
                                          this.toggle();
                                        }}
                                        value="si"
                                      />{" "}
                                      <span className="offset-6">
                                        {" "}
                                        No{" "}
                                        <input
                                          type="radio"
                                          name="notificacion"
                                          value="no"
                                          onClick={() => {
                                            this.setState({
                                              collapse: false
                                            });
                                          }}
                                        />{" "}
                                      </span>
                                    </div>
                                  </div>
                                  <br />
                                  <Collapse isOpen={this.state.collapse}>
                                    <div className="col-md-6 offset-3">
                                      <Card body>
                                        <div className="row">
                                          <div className="col">
                                            <label>
                                              Días / horas antes que se desea
                                              enviar la notificación{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <input
                                              type="number"
                                              className="form-control form-control-sm"
                                            />
                                            <br />
                                            <div className="">
                                              <select
                                                className="form-control form-control-sm"
                                                disabled
                                              >
                                                <option>Dias</option>
                                                <option>Horas</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                    </div>
                                  </Collapse>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-sm btn-warning ">
                    {" "}
                    <i className="fa fa-pencil" /> Editar{" "}
                  </button>
                  &nbsp;
                  <button className="btn btn-secondary btn-sm">
                    {" "}
                    <i className="fa fa-refresh" /> Programar{" "}
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

FormAutomatic.propTypes = {};

export default FormAutomatic;
