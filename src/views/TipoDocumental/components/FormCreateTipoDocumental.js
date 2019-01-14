import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

class FormCreateTipoDocumental extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [], NombreTipoDocumental: "nombre tipo documental" };
  }

  createUI() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <div className="col-md-10 offset-md-1">
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
            <input
              type="text"
              className="form-control"
              placeholder="nombre del indice"
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

  addClick() {
    this.setState(prevState => ({ values: [...prevState.values, ""] }));
  }

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
    return (
      <div className="animated fadeIn">
        <div className="container">
          <Row>
            <Col sm="8" md={{ offset: 2 }}>
              <Card>
                <CardHeader> Registro tipo documental </CardHeader>
                <CardBody>
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
                  <Row>
                    <Col sm="6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Dependencia <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <select className="form-control">
                          <option> Seleccione </option>
                        </select>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="form-group">
                        <label> Hora de respuesta </label>
                        <input type="text" className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <CardTitle>
                            {" "}
                            Indices documentales <hr />{" "}
                          </CardTitle>
                          <form className="form">
                            <Card body>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="text-center">
                                    <p>
                                      {" "}
                                      A continuacion se deben agregar los
                                      indices documentales del tipo documental{" "}
                                    </p>
                                    <button
                                      className="btn btn-secondary"
                                      onClick={this.addClick.bind(this)}
                                      style={{ width: "150px" }}
                                    >
                                      {" "}
                                      Agregar
                                    </button>
                                  </div>
                                  <hr />
                                  {this.createUI()}
                                </div>
                              </div>
                            </Card>
                          </form>
                        </CardBody>
                        <CardFooter>
                          <div className="float-right">
                            <button className="btn btn-secondary">
                              {" "}
                              <i className="fa fa-check" /> Crear indices
                            </button>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
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
                            Activar
                          </label>
                          <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            Si esta opción se encuentra activada, representa que
                            el Tipo documental es visible en el sistema y se
                            podrán realizar operaciones entre cada uno de los
                            módulos correspondientes de la aplicación. En caso
                            contrario el Tipo documental no se elimina del
                            sistema solo quedará inactivo e invisibles para cada
                            uno de los módulos correspondiente del sistema.
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="float-right">
                    <button type="button" className="btn btn-secondary ">
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

export default FormCreateTipoDocumental;
