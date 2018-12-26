import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import DatePicker from "react-datepicker";
import "./../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "./../../../css/custom_calendar.css";

class FormCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: ""
    };
  }

  handleChangeFechaNacimiento = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div className="container">
          <Row>
            <Col sm="10" md={{ offset: 1 }}>
              <Card>
                <CardHeader>Registrar usuario </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="3">
                      <div className="text-center">
                        <img
                          src={"https://via.placeholder.com/150"}
                          className="img-thumbnail"
                        />
                        <br />
                        <br />
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm "
                          style={{ width: "160px" }}
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
                                Identificacion{" "}
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
                                Telefono <span className="text-danger">
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
                              <label> Direccion </label>
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
                                placeholderText="Fecha de nacimiento"
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
                              <select className="form-control">
                                <option>Dependencia 1</option>
                                <option>Dependencia 2</option>
                                <option>Dependencia 3</option>
                              </select>
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
                              <select className="form-control">
                                <option>Cargo 1</option>
                                <option>Cargo 2</option>
                                <option>Cargo 3</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-12"
                          style={{ border: "1px solid red" }}
                        >
                          <div className="form-group">
                            <label>
                              {" "}
                              Roles <span className="text-danger">*</span>{" "}
                            </label>
                            <p> selector de roles para el usuario </p>
                          </div>
                        </div>
                      </form>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button className="btn btn-secondary"> Registrar </button>
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
