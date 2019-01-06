import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";

class FormCreateConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="anitmated fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Card>
                <CardHeader> Registro de Conglomerado </CardHeader>
                <CardBody>
                  <form className="form">
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
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary"
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

export default FormCreateConglomerado;
