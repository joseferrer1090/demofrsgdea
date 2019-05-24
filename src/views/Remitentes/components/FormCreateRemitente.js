import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import Select from "react-select";

const dataExample = [
  { value: "ciudad1", label: "ciudad1" },
  { value: "ciudad2", label: "ciudad2" },
  { value: "ciudad3", label: "ciudad3" }
];

const dataExampleDepartamento = [
  { value: "departamento1", label: "departamento1" },
  { value: "departamento2", label: "departamento2" },
  { value: "departamento3", label: "departamento3" }
];

const dataExamplePais = [
  { value: "pais1", label: "pais1" },
  { value: "pais2", label: "pais2" },
  { value: "pais3", label: "pais3" }
];

class FormCreateRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedOptionCiudades: null,
      SelectedOptionDepartamento: null,
      SelectedOptionPais: null
    };
  }

  handleChangeSelected = SelectedOptionCiudades => {
    this.setState({ SelectedOptionCiudades });
    console.log("selected ciudad", SelectedOptionCiudades);
  };

  handleChangeSelectedDepartamento = SelectedOptionDepartamento => {
    this.setState({ SelectedOptionDepartamento });
    console.log("selected departamento", SelectedOptionDepartamento);
  };

  handleChangeSelectedPais = SelectedOptionPais => {
    this.setState({ SelectedOptionPais });
    console.log("selected pais", SelectedOptionPais);
  };

  render() {
    const {
      SelectedOptionCiudades,
      SelectedOptionPais,
      SelectedOptionDepartamento
    } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="container">
          <Row>
            <Col sm="8" md={{ offset: 2 }}>
              <Card>
                <CardHeader> Registro de tercero </CardHeader>
                <CardBody>
                  <form className="form">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Tipo de tercero{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            className="form-control form-control-sm"
                          >
                          <option>Selecione...</option>
                          </select>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Elemento de comunicación{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            className="form-control form-control-sm"
                          >
                          <option>Selecione...</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Identificación{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
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
                            className="form-control form-control-sm"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Email <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label> Teléfono fijo </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div className="form-group">
                        <label> Teléfono celular </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Dirección </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            País <span className="text-danger"> * </span>{" "}
                          </label>
                          <Select
                            value={SelectedOptionPais}
                            onChange={this.handleChangeSelectedPais}
                            options={dataExamplePais}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Departamento{" "}
                            <span className="text-danger"> * </span>{" "}
                          </label>
                          <Select
                            value={SelectedOptionDepartamento}
                            onChange={this.handleChangeSelectedDepartamento}
                            options={dataExampleDepartamento}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Ciudad <span className="text-danger"> * </span>{" "}
                          </label>
                          <Select
                            value={SelectedOptionCiudades}
                            onChange={this.handleChangeSelected}
                            options={dataExample}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Referencia </label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Observación </label>
                          <textarea className="form-control form-control-sm" />
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
                          <div className="text-justify">
                            <CustomInput
                              type="checkbox"
                              id="ExampleInputCheckbox"
                              label="Si esta opción se encuentra activada, representa
                              que el remitente es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el remitente no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema."
                            />
                            {/* <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              Activar
                            </label> */}
                            {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que el remitente es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el remitente no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema.
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button className="btn btn-secondary btn-sm">
                      {" "}
                      <i className="fa fa-plus" /> Registrar{" "}
                    </button>
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

export default FormCreateRemitente;
