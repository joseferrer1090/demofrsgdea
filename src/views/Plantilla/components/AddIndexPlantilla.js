import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import {
  TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID,
  TEMPLATE_SHOW,
} from "./../../../services/EndPoints";
import ModalAddIndexes from "./ModalAddIndexes";
import ModalEditIndexes from "./ModalEditIndex";
import ModalDeleteIndex from "./ModalDeleteIndex";
import ModalEditText from "./ModalEditIndexText";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";

class AddIndexPlantilla extends Component {
  parentRef = React.createRef(); // Esta referencia se crea de esta manera porque se esta implementando redux como su fuera un HOC
  constructor(props) {
    super(props);
    this.state = {
      modaladd: false,
      modaledit: false,
      modaldel: false,
      modeledittext: false,
      auth: this.props.authorization,
      id: this.props.match.params.id,
      dataTemplate: [],
      idSelectedTable: "",
      idSelectedMetadata: "",
      dataTemplateInfo: {
        name: "",
        createdAt: "",
        updatedAt: "",
        code: "",
        description: "",
        status: "",
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  componentDidMount() {
    this.getDataTemplateID(this.state.id, this.state.auth);
    this.getTemplateInformation(this.state.id, this.state.auth);
    // console.log(this.parentRef.current.toggle());
    console.log(this.props.match);
  }

  getTemplateInformation = (id, auth) => {
    const username = decode(auth);
    fetch(`${TEMPLATE_SHOW}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTemplateInfo: {
            name: data.name,
            code: data.code,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            status: data.status,
          },
        });
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  getDataTemplateID = (id, auth) => {
    const token = auth;
    const username = decode(auth);
    fetch(`${TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          dataTemplate: data,
          // dataTemplateInfo: data.template,
        });
        // console.log(
        //   this.state.dataTemplate.map((aux, id) => {
        //     console.log(aux.metadataBag.id);
        //   })
        // );
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  openModalAdd() {
    // Accedo al metodo toggle que me permite visualizar el modal
    this.parentRef.current.toggle();
  }

  openModalEdit() {
    this.modalEdit.toggle();
  }

  openModalDelete() {
    this.modalDel.toggle();
  }

  openModalEditText() {
    this.modalEditText.toggle();
  }

  renderModal = (data, id, idmetadata) => {
    let aux;
    if (data === "checkbox" || data === "select" || data === "radio") {
      aux = (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalEdit();
            this.setState({
              idSelectedTable: id,
              idSelectedMetadata: idmetadata,
            });
          }}
        >
          <i className="fa fa-pencil" />
        </button>
      );
    } else if (data === "text" || data === "date" || data === "textarea") {
      aux = (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalEditText();
            this.setState({
              idSelectedTable: id,
              idSelectedMetadata: idmetadata,
            });
          }}
        >
          <i className="fa fa-pencil" />
        </button>
      );
    }
    return aux;
  };

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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header">
                          <i className="fa fa-puzzle-piece" /> Datos de la
                          plantilla
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Nombre</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={this.state.dataTemplateInfo.name}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Codigo</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={this.state.dataTemplateInfo.code}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Descripcion</label>
                                <textarea
                                  className="form-control form-control-sm"
                                  value={
                                    this.state.dataTemplateInfo.description
                                  }
                                  disabled
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header">
                          <i className="fa fa-info" />
                          Informacion de la plantilla
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Fecha de creacion</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={this.state.dataTemplateInfo.createdAt}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Fecha de modificacion</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={this.state.dataTemplateInfo.updatedAt}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Estado</label>
                                {this.state.dataTemplateInfo.status === 1 ? (
                                  <input
                                    type="text"
                                    className="form-control form-contol-sm"
                                    value={"Activo"}
                                    style={{ color: "green" }}
                                    disabled
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value="Inactivo"
                                    style={{ color: "red" }}
                                    disabled
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          <tr key={aux.metadataBag.id}>
                            {/* <td>{aux.metadataBag.id}</td> */}
                            <td>{aux.metadataBag.name}</td>
                            <td>{aux.metadataBag.inputType}</td>
                            <td>
                              {this.renderModal(
                                aux.metadataBag.inputType,
                                aux.id,
                                aux.metadataBag.id
                              )}
                              {/* <button
                                className="btn btn-secondary btn-sm mr-1"
                                onClick={() => {
                                  this.openModaEdit();
                                  this.setState({
                                    idSelectedTable: aux.id,
                                  });
                                }}
                              >
                                <i className="fa fa-pencil" />{" "}
                              </button> */}
                              &nbsp;
                              <button
                                className="btn btn-danger btn-sm mr-1"
                                onClick={() => {
                                  this.openModalDelete();
                                  this.setState({
                                    idSelectedTable: aux.id,
                                  });
                                }}
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
          template={this.props.match.params.id}
          refresh={() => {
            this.getDataTemplateID(this.state.id, this.props.authorization);
          }}
          ref={this.parentRef} // asocio la referencia al componente hijo
        />
        <ModalEditIndexes
          refresh={() => {
            this.getDataTemplateID(this.state.id, this.props.authorization);
          }}
          id={this.state.idSelectedMetadata}
          authorization={this.state.auth}
          templateid={this.props.match.params.id}
          metadataid={this.state.idSelectedTable}
          modaleditindexes={this.state.modaledit}
          ref={(el) => (this.modalEdit = el)}
        />
        <ModalDeleteIndex
          authorization={this.state.auth}
          id={this.state.idSelectedTable}
          modaldeleteindex={this.state.modaldel}
          refresh={() =>
            this.getDataTemplateID(this.state.id, this.props.authorization)
          }
          ref={(el) => (this.modalDel = el)}
        />
        <ModalEditText
          id={this.state.idSelectedMetadata}
          authorization={this.state.auth}
          templateid={this.props.match.params.id}
          metadataid={this.state.idSelectedTable}
          modaledittext={this.state.modeledittext}
          ref={(el) => (this.modalEditText = el)}
          refresh={() => {
            this.getDataTemplateID(this.state.id, this.props.authorization);
          }}
        />
      </div>
    );
  }
}

AddIndexPlantilla.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default AddIndexPlantilla;
