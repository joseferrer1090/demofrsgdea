import React, { Component } from "react";
import { Row, Col, Card, CardTitle } from "reactstrap";
import PropTypes from "prop-types";
import Tabinformaction from "./components/TabProfile";

class Profle extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="3">
            <div className="card">
              {" "}
              <a
                className="text-center"
                onClick={() => {
                  alert("hola");
                }}
              >
                <img
                  className="img-responsive "
                  src="/assets/img/avatars/user2.jpg"
                  style={{ margin: "10px" }}
                />
              </a>
              <CardTitle>
                <p className="text-center">
                  {" "}
                  Nombre del usuario{" "}
                  <small className="form-text"> Administrador </small>{" "}
                </p>
                <address>
                  <div style={{ margin: "10px " }}>
                    {" "}
                    <p className="text-center">
                      <i className="fa fa-phone-square" />
                      {"   "}+(1234) - 5678910
                    </p>
                    <p className="text-center">
                      <i className="fa fa-envelope" /> {"   "} admin@admin.com
                    </p>
                  </div>
                </address>
              </CardTitle>
            </div>
            <div className="card">
              <div className="card-header">
                {" "}
                <i className="icon-lock" /> Roles y permisos{" "}
              </div>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Gestionar usuarios
                  <span className="badge badge-success badge-pill">
                    activado
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Gestion tipo documental radicación
                  <span className="badge badge-success badge-pill">
                    activado
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Gestion radicación
                  <span className="badge badge-success badge-pill">
                    activado
                  </span>
                </li>
              </ul>
            </div>
            <br />
          </Col>
          <Col sm="9">
            <div className="" style={{ height: "200px" }}>
              <Tabinformaction />
            </div>
          </Col>
        </Row>
        <Row />
      </div>
    );
  }
}

Profle.propTypes = {};

export default Profle;
