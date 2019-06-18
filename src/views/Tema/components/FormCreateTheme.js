import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";
import { ChromePicker } from "react-color";

class FormCreateTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const handleColorChange = ({ hex }) => {
      console.log(hex);
    };
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-10 offset-1">
            <Card>
              <CardHeader>Crear nuevo tema</CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        Código <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Nombre <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label> Descripción </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="p-2 mb-2 bg-secondary text-dark">
                    Datos adicionales
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <Card body>
                          <h5 className="text-center">
                            Colores en el header{" "}
                            <hr style={{ marginTop: "2px" }} />{" "}
                          </h5>
                          <p className="text-center">
                            Este color afectapra los diferentes header de la
                            aplicacion{" "}
                          </p>
                          <ChromePicker
                            color={"#333"}
                            onChange={handleColorChange}
                          />
                        </Card>
                      </div>
                      <div className="col-md-4">
                        <Card body>
                          <h5 className="text-center">
                            {" "}
                            Colores en el footer{" "}
                            <hr style={{ marginBottom: "5px" }} />{" "}
                          </h5>
                          <p className="text-center">
                            {" "}
                            Este Color afectara al footer de la aplicacion{" "}
                          </p>
                          <ChromePicker
                            color={"#333"}
                            onChange={handleColorChange}
                          />
                        </Card>
                      </div>
                      <div className="col-md-4">
                        <Card body>
                          <h5 className="text-center">
                            Colores en el body{" "}
                            <hr style={{ marginBottom: "5px" }} />{" "}
                          </h5>
                          <p className="text-center">
                            {" "}
                            Este color afectara algunas secciones del body
                          </p>
                          <ChromePicker
                            color={"#333"}
                            onChange={handleColorChange}
                          />
                        </Card>
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-md-4">
                        <Card body>
                          <h5>
                            {" "}
                            Colores en el body{" "}
                            <hr style={{ marginBottom: "5px" }} />{" "}
                          </h5>
                          <p> Probando </p>
                        </Card>
                      </div>
                    </div> */}
                    <div className="form-group">
                      <div className="">
                        <CustomInput
                          type="checkbox"
                          id="ExampleInputCheckbox2"
                          label="Aplicar a todos los usuarios"
                        />
                      </div>
                    </div>
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
