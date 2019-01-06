import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";

class FormCreateCargo extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Card>
                <CardHeader> Registro de Conglomerado </CardHeader>
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Descripción</label>
                          <textarea
                            className="form-control"
                            placeholder="Opcional"
                          />
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
                              Activar cargo en el sistema.
                            </label>
                            <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que el cargo es visible en el sistemas y se podran
                              realizar operaciones entre cada uno de los modulos
                              correspondientes de la aplicación. En caso
                              contrario el cargo no se elimina del sistema solo
                              quedara inactivo e invisibles para cada uno de los
                              modulos correspondiente del sistema.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="pull-right">
                    <button
                      className="btn btn-default btn-sm"
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
          </div>
        </div>
      </div>
    );
  }
}

FormCreateCargo.propTypes = {};

export default FormCreateCargo;
