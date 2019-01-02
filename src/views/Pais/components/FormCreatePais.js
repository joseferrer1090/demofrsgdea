import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from "reactstrap";

class FormCreatePais extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="8" md={{ offset: 2 }}>
            <Card>
              <CardHeader> Paises </CardHeader>
              <CardBody>
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Codigo <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nombre <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
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
                            Activar pais en el sistema.
                          </label>
                          <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            Si esta opción se encuentra activada, representa que
                            el Pais es visible en el sistemas y se podran
                            realizar operaciones entre cada uno de los modulos
                            correspondientes de la aplicación. En caso contrario
                            el Pais no se elimina del sistema solo quedara
                            inactivo e invisibles para cada uno de los modulos
                            correspondiente del sistema.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary">
                    {" "}
                    <i className="fa fa-check" /> Registrar{" "}
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

FormCreatePais.propTypes = {};

export default FormCreatePais;
