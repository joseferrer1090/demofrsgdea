import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert
} from "reactstrap";
import Select from "react-select";

const dataEmpresa = [
  { value: "1", label: "Empresa1" },
  { value: "2", label: "Empresa2" },
  { value: "3", label: "Empresa3" },
  { value: "4", label: "Empresa4" },
  { value: "5", label: "Empresa5" }
];

class FormCreateSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionEmpresa: null,
      visibleAlert: true,
      secuencia: 1
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="8" md={{ offset: 2 }}>
            <Card>
              <CardHeader>Registro Sede</CardHeader>
              <CardBody>
                <form className="form">
                  <Row>
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Código <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nombre <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="4">
                      <div className="form-group">
                        <label>
                          {" "}
                          Empresa <span className="text-danger">*</span>{" "}
                        </label>
                        <br />
                        <Select
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
                          className="form-control"
                          maxLength={"6"}
                          placeholder="ABCDEF"
                        />
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <label> Secuencia de inicio </label>
                        <input
                          type="number"
                          className="form-control"
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
                          Los campos de <b>Secuencia de radicación</b> y{" "}
                          <b> Prefijo </b>, son campos que se reflejaran en los
                          formularios de radicación
                        </p>
                        <hr />
                        <p className="mb-0">
                          Es recomendable que en el campo <b>Prefijo</b>,
                          describa acorde al proceso de radicación.
                        </p>
                      </Alert>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="4">
                      <div className="form-group">
                        <label>País</label>
                        <select className="form-control">
                          <option>Departamento1</option>
                          <option> Departamento2 </option>
                          <optiion> Departamento3 </optiion>
                        </select>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <label>Departamento</label>
                        <select className="form-control">
                          <option>Departamento1</option>
                          <option> Departamento2 </option>
                          <optiion> Departamento3 </optiion>
                        </select>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <label>
                          Ciudad <span className="text-danger">*</span>
                        </label>
                        <select className="form-control">
                          <option>Departamento1</option>
                          <option> Departamento2 </option>
                          <optiion> Departamento3 </optiion>
                        </select>
                      </div>
                    </Col>
                    <Col sm="7">
                      <div className="form-group">
                        <label>
                          {" "}
                          Dirección <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea className="form-control" />
                      </div>
                    </Col>
                    <Col sm="5">
                      <div className="form-group">
                        <label>
                          {" "}
                          Telefono <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Estado <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="form-group form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            Activar empresa
                          </label>
                        </div>
                        <p
                          className="text-muted"
                          style={{ textAlign: "justify" }}
                        >
                          {" "}
                          Si esta opción se encuentra activada, representa que
                          la empresa es visible en el sistemas y se podran
                          realizar operaciones entre cada uno de los modulos
                          correspondientes de la aplicación. En caso contrario
                          la empresa no se elimina del sistema solo quedara
                          inactiva e invisibles para cada uno de los modulos
                          correspondiente del sistema.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary"> Registrar </button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

FormCreateSedes.propTypes = {};

export default FormCreateSedes;
