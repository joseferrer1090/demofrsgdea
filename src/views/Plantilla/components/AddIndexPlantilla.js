import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader, Row, Col } from "reactstrap";
import PropTypes from "prop-types";

class AddIndexPlantilla extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <Card>
              <div className="p-2 mb-2 bg-secondary text-black">
                Indices plantilla de datos
              </div>
              <CardBody>
                <div className="btn-toolbar mb-1">
                  <button className="btn btn-success btn-sm mr-1">
                    <i className="fa fa-plus" /> Nuevo indice
                  </button>
                  <button className="btn btn-danger btn-sm mr-1">
                    <i className="fa fa-trash" /> Eliminar
                  </button>
                  <button className="btn btn-secondary btn-sm mr-1">
                    <i className="fa fa-globe" /> Vista previa
                  </button>
                </div>
                <table className="table table-bordered table-sm table-hover">
                  <thead className="thead-light">
                    <tr className="text-center">
                      <th scope="col">
                        <input type="checkbox" label="Todos" />
                      </th>
                      <th scope="col">Nombre índice</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <th scope="row">
                        <input type="checkbox" />
                      </th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>
                        <button className="btn btn-secondary btn-sm mr-1">
                          <i className="fa fa-pencil" />{" "}
                        </button>
                        <button className="btn btn-danger btn-sm mr-1">
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

AddIndexPlantilla.propTypes = {};

export default AddIndexPlantilla;
