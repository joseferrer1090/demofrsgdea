import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";

class FormCreateTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-10 offset-1">
            <Card>
              <CardHeader>Crear nuevo tema</CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-md-6">
                    <Card body>
                      <h5 style={{ marginBottom: "5px !important" }}>
                        {" "}
                        Colores en el header <hr
                          style={{ marginTop: "5px" }}
                        />{" "}
                      </h5>
                      <p>Probando</p>
                    </Card>
                  </div>
                  <div className="col-md-6">
                    <Card body>
                      <h5>
                        {" "}
                        Colores en el footer{" "}
                        <hr style={{ marginBottom: "5px" }} />{" "}
                      </h5>
                      <p>Probando</p>
                    </Card>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Card body>
                      <h5>
                        {" "}
                        Colores en el body{" "}
                        <hr style={{ marginBottom: "5px" }} />{" "}
                      </h5>
                      <p> Probando </p>
                    </Card>
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    {" "}
                    Estado <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="">
                    <CustomInput
                      type="checkbox"
                      id="ExampleInputCheckbox"
                      label="Si esta opción se encuentra activada, Representa que
                             el tema es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             el tema no se elimina del sistema solo quedará
                             inactiva e invisibles para cada uno de los módulos
                             correspondiente del sistema."
                    />
                  </div>
                  {/* <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            {" "}
                            Si esta opción se encuentra activada, Representa que
                            la sede es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso contrario
                            la sede no se elimina del sistema solo quedará
                            inactiva e invisibles para cada uno de los módulos
                            correspondiente del sistema.
                          </p> */}
                </div>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary btn-sm">
                    {" "}
                    <i className="fa fa-plus" /> Crear{" "}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

FormCreateTheme.propTypes = {};

export default FormCreateTheme;
