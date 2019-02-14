import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  CustomInput
} from "reactstrap";

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
            <div className="col-md-8 offset-md-2">
              <Card>
                <CardHeader> Registro de conglomerado </CardHeader>
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
                            placeholder=""
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
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Descripción</label>
                          <textarea className="form-control" placeholder="" />
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
                          <div className="">
                            <CustomInput
                              type="checkbox"
                              id="ExampleInputCheckbox"
                              label=" Si esta opción se encuentra activada, representa
                              que el conglomerado es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el conglomerado no se elimina del
                              sistema solo quedará inactivo e invisibles para
                              cada uno de los módulos correspondiente del
                              sistema."
                            />

                            {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que el conglomerado es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el conglomerado no se elimina del
                              sistema solo quedará inactivo e invisibles para
                              cada uno de los módulos correspondiente del
                              sistema.
                            </p> */}
                          </div>
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
