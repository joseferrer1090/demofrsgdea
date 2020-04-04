import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader, Row, Col } from "reactstrap";
import { TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID } from "./../../../services/EndPoints";
import ModalAddIndexes from "./ModalAddIndexes";
import ModalEditIndexes from "./ModalEditIndex";
import ModalDeleteIndex from "./ModalDeleteIndex";
import ModalMultiple from "./ModalDeleteMultipleIndex";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";

class AddIndexPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modaladd: false,
      modaledit: false,
      modaldel: false,
      modaldelmul: false,
      auth: this.props.authorization,
      id: this.props.match.params.id,
      dataTemplate: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  componentDidMount() {
    this.getDataTemplateID(this.state.id, this.state.auth);
  }

  getDataTemplateID = (id, auth) => {
    const token = auth;
    const username = decode(auth);
    fetch(`${TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataTemplate: data
        });
        console.log(this.state.dataTemplate);
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  openModalAdd() {
    this.modalAdd.toggle();
  }

  openModaEdit() {
    this.modalEdit.toggle();
  }

  openModalDelete() {
    this.modalEdit.toggle();
  }

  openModalMult() {
    this.refs.child4.toggle();
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.dataTemplate.length ? (
          <Row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Card>
                <div className="p-2 mb-2 bg-secondary text-black">
                  <i className="fa fa-puzzle-piece" /> Metadatos asociados en la
                  plantilla
                </div>
                <CardBody>
                  <div className="btn-toolbar mb-1">
                    <button
                      className="btn btn-success btn-sm mr-1"
                      onClick={() => this.openModalAdd()}
                    >
                      <i className="fa fa-plus" /> Nuevo índice
                    </button>
                    {/* <button className="btn btn-secondary btn-sm mr-1">
                      <i className="fa fa-globe" /> Vista previa
                    </button> */}
                  </div>
                  <table className="table table-bordered table-sm table-hover">
                    <thead className="thead-light">
                      <tr className="text-center">
                        <th scope="col">Nombre del metadato</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {this.state.dataTemplate.map((aux, id) => {
                        return (
                          <tr key={id}>
                            <td>{aux.metadataBag.name}</td>
                            <td>{aux.metadataBag.inputType}</td>
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
                        );
                      })}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Card>
                <div className="p-2 mb-2 bg-secondary text-black">
                  <i className="fa fa-puzzle-piece" /> Metadatos asociados en la
                  plantilla
                </div>
                <CardBody>
                  <div className="btn-toolbar mb-1">
                    <button
                      className="btn btn-success btn-sm mr-1"
                      onClick={() => this.openModalAdd()}
                    >
                      <i className="fa fa-plus" /> Nuevo índice
                    </button>
                    {/* <button
                      className="btn btn-danger btn-sm mr-1"
                      onClick={() => this.openModalMult()}
                    >
                      <i className="fa fa-trash" /> Eliminar
                    </button> */}
                    {/* <button className="btn btn-secondary btn-sm mr-1">
                      <i className="fa fa-globe" /> Vista previa
                    </button> */}
                  </div>
                  <br />
                  <div className="text-center">
                    <p className="alert alert-danger">
                      <i className="fa fa-exclamation-triangle" /> No hay
                      metadatos asociados a esta plantilla
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
        <ModalAddIndexes
          authorization={this.state.auth}
          modaladdindexes={this.state.modaladd}
          ref={el => (this.modalAdd = el)}
        />
        <ModalEditIndexes
          modaleditindexes={this.state.modaledit}
          ref={el => (this.modalEdit = el)}
        />
        <ModalDeleteIndex
          modaldeleteindex={this.state.modaldel}
          ref={el => (this.modalDel = el)}
        />
        <ModalMultiple
          modaldeletemultiple={this.state.modalmul}
          ref={"child4"}
        />
      </div>
    );
  }
}

AddIndexPlantilla.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default AddIndexPlantilla;
