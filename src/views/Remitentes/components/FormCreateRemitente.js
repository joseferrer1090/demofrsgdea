import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, CardFooter, Row, Col } from "reactstrap";
import Select from "react-select";

const dataExample = [
  { value: "ciudad1", label: "ciudad1" },
  { value: "ciudad2", label: "ciudad2" },
  { value: "ciudad3", label: "ciudad3" }
];

class FormCreateRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedOptionCiudades: null
    };
  }

  handleChangeSelected = SelectedOptionCiudades => {
    this.setState({ SelectedOptionCiudades });
    console.log("selected ciudad", SelectedOptionCiudades);
  };

  render() {
    const { SelectedOptionCiudades } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="8" md={{ offset: 2 }}>
            <Card>
              <CardHeader> Remitente </CardHeader>
              <CardBody>
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Identificaicón <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nombre <span className="text-danger">*</span>{" "}
                        </label>
                        <input className="form-control" type="text" />
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
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label> Teléfono </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label> Dirección </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
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
                        <label> Observación </label>
                        <textarea className="form-control" />
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
                            Activar remitente en el sistema.
                          </label>
                          <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            Si esta opción se encuentra activada, representa que
                            el Remitente es visible en el sistemas y se podran
                            realizar operaciones entre cada uno de los modulos
                            correspondientes de la aplicación. En caso contrario
                            el Remitente no se elimina del sistema solo quedara
                            inactivo e invisibles para cada uno de los modulos
                            correspondiente del sistema.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary">
                    {" "}
                    <i className="fa fa-check" /> Registrar{" "}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormCreateRemitente;
