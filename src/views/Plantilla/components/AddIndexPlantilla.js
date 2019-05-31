import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader, Row, Col } from "reactstrap";
import ModalAddIndexes from "./ModalAddIndexes";
import ModalEditIndexes from "./ModalEditIndex";
import ModalDeleteIndex from "./ModalDeleteIndex";
import PropTypes from "prop-types";

class AddIndexPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modaladd: false,
      modaledit: false,
      modaldel: false
    };
  }

  openModalAdd() {
    this.refs.child.toggle();
  }

  openModaEdit() {
    this.refs.child2.toggle();
  }

  openModalDelete() {
    this.refs.child3.toggle();
  }

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
                  <button
                    className="btn btn-success btn-sm mr-1"
                    onClick={() => this.openModalAdd()}
                  >
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
                      <td>Adjuntar archivo</td>
                      <td>archivo</td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm mr-1"
                          onClick={() => this.openModaEdit()}
                        >
                          <i className="fa fa-pencil" />{" "}
                        </button>
                        <button
                          className="btn btn-danger btn-sm mr-1"
                          onClick={() => this.openModalDelete()}
                        >
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
        <ModalAddIndexes modaladdindexes={this.state.modaladd} ref={"child"} />
        <ModalEditIndexes
          modaleditindexes={this.state.modaledit}
          ref={"child2"}
        />
        <ModalDeleteIndex
          modaldeleteindex={this.state.modaldel}
          ref={"child3"}
        />
      </div>
    );
  }
}

AddIndexPlantilla.propTypes = {};

export default AddIndexPlantilla;
