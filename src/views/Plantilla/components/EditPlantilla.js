import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  Label,
  FormGroup
} from "reactstrap";
import PropTypes from "prop-types";
import dataDependencias from "./../../../data/json_dependencia.json";
import "./css/fixedTable.css";

class EditPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataDependencias,
      term: ""
    };
  }

  handleSearchInput = event => {
    this.setState({ term: event.target.value });
  };

  searchDependecies = term => {
    return function(x) {
      return x.nombre.toLowerCase().includes(term);
    };
  };

  render() {
    const term = this.state.term;
    const aux = this.state.data.data
      .filter(this.searchDependecies(term))
      .map((aux, id) => {
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{aux.nombre.toLowerCase()}</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        );
      });

    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="p-2 mb-2 bg-secondary text-black">
                    Editar plantilla
                  </div>
                  <div className="card-body">
                    <form className="form">
                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <Label for="exampleCheckbox">
                              Unidad de correspondencia{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <div>
                              <CustomInput
                                type="checkbox"
                                id="exampleCustomInline"
                                label="Recibida"
                                inline
                              />
                              <CustomInput
                                type="checkbox"
                                id="exampleCustomInline2"
                                label="Despachada"
                                inline
                              />
                              <CustomInput
                                type="checkbox"
                                id="exampleCustomInline3"
                                label="Interna"
                                inline
                              />
                            </div>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Nombre <span className="text-danger">*</span>
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
                              Descripción <span className="text-danger">*</span>
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
                              Conglomerado{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Empresa <span className="text-danger">*</span>
                            </label>
                            <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              Sede <span className="text-danger">*</span>
                            </label>
                            <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-header">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Buscar dependencia"
                                onChange={e => this.handleSearchInput(e)}
                              />
                            </div>
                            <div className="">
                              <div className="tableFixHead">
                                <table className="table table-sm table-hover table-bordered ">
                                  <thead className="thead-light">
                                    <tr className="text-center">
                                      <th>id</th>
                                      <th>Dependécia</th>
                                      <th>Todos</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-center">{aux}</tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <button
              type="button"
              className="btn btn-outline-success btn-sm float-right"
            >
              {" "}
              <i className="fa fa-pencil" /> Editar Plantilla{" "}
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

EditPlantilla.propTypes = {};

export default EditPlantilla;
