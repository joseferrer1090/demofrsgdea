import React, { Component } from "react";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";

class FormUpdateData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <div className="container">
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <label> Identificación </label>
                    <p> Dato </p>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label> Nombre </label>
                    <input type="text" className="form-control" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <label> Fecha de nacimiento </label>
                    <input type="text" className="form-control" />
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label> Teléfono </label>
                    <input type="text" className="form-control" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <div className="form-group">
                    <label> Direccion </label>
                    <textarea className="form-control" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <label> Email </label>
                    <p> Dato </p>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label> Usuario </label>
                    <p> Dato </p>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
          <CardFooter>
            <div className="float-right">
              <button type="button" className="btn btn-secondary">
                <i className="fa fa-refresh" /> Actualizar perfil{" "}
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default FormUpdateData;
