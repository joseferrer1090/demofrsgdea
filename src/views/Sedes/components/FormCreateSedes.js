import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  CustomInput
} from "reactstrap";
import Select from "react-select";

const dataEmpresa = [
  { value: "1", label: "Empresa1" },
  { value: "2", label: "Empresa2" },
  { value: "3", label: "Empresa3" },
  { value: "4", label: "Empresa4" },
  { value: "5", label: "Empresa5" }
];

const dataExampleRolResponsable = [{ value: "1", label: "rol responsable" }];

class FormCreateSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionEmpresa: null,
      visibleAlert: true,
      secuencia: 1,
      selectedOptionOptionRolResponsable: null
    };
  }

  onDismiss = () => {
    this.setState({
      visibleAlert: false
    });
  };

  handleChangeOptionEmpresa = selectedOptionEmpresa => {
    this.setState({
      selectedOptionEmpresa
    });
    console.log(selectedOptionEmpresa);
  };

  handleChangeOptionRolResponsable = selectedOptionOptionRolResponsable => {
    this.setState({ selectedOptionOptionRolResponsable });
  };

  render() {
    const { selectedOptionOptionRolResponsable } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="container">
          <Row>
            <div className="col-md-8 offset-md-2">
              <Card>
                <CardHeader>Registro de sede</CardHeader>
                <CardBody>
                  <form className="form">
                    <Row>
                      <Col sm="6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Código <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </Col>
                      <Col sm="6">
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
                      </Col>
                      <Col sm="12">
                        <div className="form-group">
                          <label> Descripción </label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Conglomerado <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Empresa <span className="text-danger">*</span>{" "}
                          </label>
                          <br />
                          <Select className=""
                            value={this.state.selectedOptionEmpresa}
                            onChange={this.handleChangeOptionEmpresa}
                            options={dataEmpresa}
                          />

                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Prefijo de radicación{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            maxLength={"6"}
                            placeholder=" "
                          />
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Secuencia de radicación{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            defaultValue={this.state.secuencia}
                            min={0}
                          />
                        </div>
                      </Col>
                      <Col sm="12">
                        <Alert
                          color="secondary"
                          isOpen={this.state.visibleAlert}
                          toggle={this.onDismiss}
                          fade={true}
                        >
                          <h4 className="alert-heading">¡ Importante !</h4>
                          <p>
                            Los campos de{" "}
                            <b>
                              Prefijo de radicación y Secuencia de radicación
                            </b>
                            , son campos que se reflejaran en el formulario de
                            radicación.
                          </p>
                          <hr />
                          <p className="mb-0">
                            Es recomendable que el campo{" "}
                            <b>Prefijo de radicación</b>, se describa acorde al
                            proceso de radicación.
                          </p>
                        </Alert>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="4">
                        <div className="form-group">
                          <label>País</label>
                          <select className="form-control form-control-sm">
                            <option>Seleccione...</option>
                          </select>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="form-group">
                          <label>Departamento</label>
                          <select className="form-control form-control-sm">
                            <option> Seleccione...</option>
                          </select>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="form-group">
                          <label>
                            Ciudad <span className="text-danger">*</span>
                          </label>
                          <select className="form-control form-control-sm">
                            <option> Seleccione... </option>
                          </select>
                        </div>
                      </Col>
                      <Col sm="7">
                        <div className="form-group">
                          <label>
                            {" "}
                            Dirección <span className="text-danger">
                              *
                            </span>{" "}
                          </label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </Col>
                      <Col sm="5">
                        <div className="form-group">
                          <label>
                            {" "}
                            Teléfono <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="12">
                        <div className="form-group">
                          <label> Cargo responsable </label>
                          <Select
                            value={selectedOptionOptionRolResponsable}
                            onChange={this.handleChangeOptionRolResponsable}
                            options={dataExampleRolResponsable}
                          />
                        </div>
                      </Col>
                      <Col sm="12">
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
                             la sede es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             la sede no se elimina del sistema solo quedará
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
                      </Col>
                    </Row>
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
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

FormCreateSedes.propTypes = {};

export default FormCreateSedes;
