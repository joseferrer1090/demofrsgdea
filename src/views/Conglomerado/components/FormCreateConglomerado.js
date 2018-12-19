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
                  <form className="form" role="form">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-6 float-right">
                          <label>
                            {" "}
                            Fecha de registro{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Dato1 <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Dato 1"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Dato1 <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Dato 1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Dato3 <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="dato3"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Dato4 </label>
                          <textarea
                            className="form-control"
                            rows={"8"}
                            placeholder="Dato 4"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="pull-right">
                    <button
                      className="btn btn-outline-secondary"
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
