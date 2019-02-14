import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  Alert,
  CustomInput
} from "reactstrap";

class FormCreateTipoDocumental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      TypeDocumentName: "nombre del tipo documental",
      dataOk: false
    };
  }
  createUI() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <div className="col-md-10 offset-md-3">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-secondary"
                type="button"
                id="inputGroupFileAddon03"
                onClick={this.removeClick.bind(this, i)}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
            <input type="text" className="form-control" placeholder="Asunto" />{" "}
            &nbsp;
            <input
              type="text"
              className="form-control"
              placeholder="valor del indice"
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.addClick.bind(this)}
              >
                {" "}
                <i className="fa fa-plus" />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
    this.setState({
      values
    });
  }

  addClick = () => {
    this.setState(prevState => ({ values: [...prevState.values, ""] }));
  };

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }
  handleSubmit = event => {
    alert("A name was submitted: " + this.state.values.join(", "));
    event.preventDefault();
  };
  render() {
    const { dataOk } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="row">
                  <Col sm="6">
                    <Card>
                      <CardHeader> Registro de datos </CardHeader>
                      <CardBody>
                        <Row>
                          <Col sm="12">
                            <Alert color="secondary">
                              El campo asunto se vera reflejado en el formulario
                              de radicación
                            </Alert>
                          </Col>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Código <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                Nombre <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </Col>
                          <Col sm="12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Asunto <span className="text-danger">
                                  *
                                </span>{" "}
                              </label>
                              <input className="form-control" type="text" />
                              <small
                                id="emailHelp"
                                className="form-text text-muted"
                              >
                                Información relevante en el formulario de
                                radicación (Autocomplete)
                              </small>
                            </div>
                          </Col>
                          <Col sm="12">
                            <div className="form-group">
                              <label>
                                {" "}
                                Descripción{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <textarea className="form-control" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card>
                      <CardHeader>Asignar usuarios</CardHeader>
                      <CardBody>
                        <h4 className=""> Búsqueda de usuarios </h4>
                        <hr />
                        <form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Conglomerado{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione... </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Empresa <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Sede <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Dependencia{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select className="form-control">
                                  {" "}
                                  <option> Seleccione </option>{" "}
                                </select>
                              </div>
                            </div>
                          </div>
                          {dataOk ? (
                            <div className="form-group">
                              <label> Usuarios disponibles </label>
                              <textarea className="form-control" disabled />
                            </div>
                          ) : null}
                          <div className="form-group">
                            <label>
                              {" "}
                              Asigar usuarios{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <select className="form-control">
                              {" "}
                              <option> seleccione </option>{" "}
                            </select>
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              Información relevante en el formulario de
                              radicación (Autocomplete)
                            </small>
                          </div>
                        </form>
                      </CardBody>
                      <CardFooter>
                        <div className="float-right">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              this.setState({ dataOk: true });
                            }}
                          >
                            {" "}
                            <i className="fa fa-search" /> Buscar
                          </button>{" "}
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                </div>
                <div className="row">
                  <Col sm="12">
                    <Card>
                      <CardHeader>Asignar indices</CardHeader>
                      <CardBody>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="text-center">
                              <p>
                                {" "}
                                A continuacion se deben agregar los indices
                                documentales del tipo documental{" "}
                              </p>
                              <button
                                className="btn btn-secondary"
                                onClick={this.addClick}
                                style={{ width: "150px" }}
                              >
                                {" "}
                                Agregar
                              </button>
                              <hr />
                            </div>
                          </div>
                          {this.createUI()}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </div>
                <Row>
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
                          label="                          Si esta opción se encuentra activada, representa que
                          el Tipo documental es visible en el sistema y se
                          podrán realizar operaciones entre cada uno de los
                          módulos correspondientes de la aplicación. En caso
                          contrario el Tipo documental no se elimina del sistema
                          solo quedará inactivo e invisibles para cada uno de
                          los módulos correspondiente del sistema."
                        />
                        {/* <p
                          className="text-muted"
                          style={{ textAlign: "justify" }}
                        >
                          Si esta opción se encuentra activada, representa que
                          el Tipo documental es visible en el sistema y se
                          podrán realizar operaciones entre cada uno de los
                          módulos correspondientes de la aplicación. En caso
                          contrario el Tipo documental no se elimina del sistema
                          solo quedará inactivo e invisibles para cada uno de
                          los módulos correspondiente del sistema.
                        </p> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary">registrar</button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormCreateTipoDocumental;
