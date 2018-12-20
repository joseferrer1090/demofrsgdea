import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Select from "react-select";
import Switch from "react-switch";

const dataConglomerado = [
  { value: "1", label: "Conglomerado 1" },
  { value: "2", label: "Conglomerado 2" },
  { value: "3", label: "Conglomerado 3" }
];

class FormCreateEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionConglomerado: null,
      checked: true
    };
  }

  handleChange = selectedOptionConglomerado => {
    this.setState({ selectedOptionConglomerado });
    console.log(`Option selected:`, selectedOptionConglomerado);
  };

  handleChangeSwitch = checked => {
    this.setState({ checked });
    console.log("estado es: ", this.state.checked);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader> Registro de Empresa </CardHeader>
              <CardBody>
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nit <span className="text-danger">*</span>{" "}
                        </label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Codigo <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nombre <span className="text-danger">*</span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Conglomerado <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <Select
                          value={selectedOption}
                          onChange={this.handleChange}
                          options={dataConglomerado}
                        />
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
                        <br />
                        <Switch
                          onChange={this.handleChangeSwitch}
                          checked={this.state.checked}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <div className="pull-right">
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

FormCreateEmpresa.propTypes = {};

export default FormCreateEmpresa;
