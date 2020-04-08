import React, { Component, forwardRef } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import {
  METADATA_ACTIVE,
  TEMPLATE_METADATA_BAG_CREATE,
} from "./../../../services/EndPoints";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  agregarMetadaEditAction,
  eliminarMetadatoEditAction,
} from "./../../../actions/templateMetadataActions";
import { decode } from "jsonwebtoken";

class ModalAddIndexes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalindexes,
      auth: this.props.authorization,
      dataMetadataActive: [],
      term: "",
      templateID: this.props.template,
      alert200: false,
      alert400: false,
      alert500: false,
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
        templateID: this.props.template,
      });
    }
  }

  geData = (auth) => {
    fetch(`${METADATA_ACTIVE}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          dataMetadataActive: data,
        });
        console.log(this.state.dataMetadataActive);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  sendMetadataList = () => {
    console.log(this.state.templateID);
    const auth = this.state.auth;
    const username = decode(auth);
    const newMetadataEdit = (data) => {
      let array = [];
      data.map((aux, id) => {
        return array.push({ id: aux.id });
      });
      // console.log(array);
      return array;
    };
    fetch(`${TEMPLATE_METADATA_BAG_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
      body: JSON.stringify({
        templateId: this.state.templateID,
        defaultValue: "",
        formula: "",
        required: false,
        metadata: newMetadataEdit(this.props.newData),
        userName: username.user_name,
      }),
    }).then((response) =>
      response
        .json()
        .then(() => {
          if (response.status === 201) {
            this.setState({
              alert200: true,
            });
            setTimeout(() => {
              this.setState(
                {
                  alert200: false,
                  modal: false,
                },
                () => this.props.refresh()
              );
            }, 1300);
            console.log(response.message);
          } else if (response.status === 400) {
            console.log("Error al enviar los datos");
          } else if (response.status === 500) {
            console.log("error => exiten metadatos repetidos en la plantilla");
          }
        })
        .catch((err) => {
          console.log(`Error => ${err.message}`);
        })
    );
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.geData(this.state.auth);
  };

  agregar = (id, name) => {
    this.props.agregarMetadaEditAction(id, name);
  };

  render() {
    const searchMetada = (term) => {
      return function (x) {
        return x.name.toUpperCase().includes(term);
      };
    };
    const data = this.state.dataMetadataActive;
    const aux = data.filter(searchMetada(this.state.term)).map((aux, id) => {
      return (
        <tr key={id} className="text-center">
          <td>{(id += 1)}</td>
          <td>{aux.name}</td>
          <td className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => this.agregar(aux)}
            >
              <i className="fa fa-plus" />
            </button>
          </td>
        </tr>
      );
    });
    return (
      <Modal isOpen={this.state.modal} className="modal-xl">
        <ModalHeader>
          <i className="fa fa-puzzle-piece" /> Agregar metadato a la plantilla
        </ModalHeader>
        <ModalBody>
          <p className="alert alert-secondary">
            <i className="fa fa-exclamation-triangle" /> En esta seccion se solo
            se puede asociar nuevo metadatos a la plantilla, sus valores se
            podran editar en la tabla siguiente despues del modal.
          </p>
          <Alert color="success" isOpen={this.state.alert200}>
            Se Agregaron metadatos a la plantilla
          </Alert>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-body">
                <div>
                  <input
                    type={"search"}
                    className="form-control form-control-sm"
                    value={this.state.term}
                    onChange={(e) => {
                      this.setState({
                        term: e.target.value,
                      });
                    }}
                    placeholder={`Buscar metadato`}
                  />
                </div>
                <br />
                {Object.keys(data) ? (
                  <div className="tableFixHead">
                    <table className="table table-hover table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th className="text-center">id</th>
                          <th className="text-center">Nombre</th>
                          <th className="text-center">Accion</th>
                        </tr>
                      </thead>
                      <tbody>{aux}</tbody>
                    </table>
                  </div>
                ) : (
                  <div className="animated fadeIn">
                    <p className="alert alert-danger text-center">
                      <i className="fa fa-exclamation-triangle" /> No hay datos
                      disponibles
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <TableIndexes data={this.props.newData} />
              {/* <p>apenas viendo como va la cosa </p> */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={() => this.sendMetadataList()}
          >
            <i className="fa fa-save" /> Agregar nuevos metadatos
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({
                modal: false,
              });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const TableIndexes = (props) => {
  const data = props.data;
  console.log(props);
  const dispatch = useDispatch();
  return (
    <div>
      {Object.keys(data).length ? (
        <div className="card">
          <div className="card-body">
            <table className="table table-condensed table-striped table-hover">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Nombre del metadato</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {data.map((aux, id) => {
                  return (
                    <tr key={id} className="text-center">
                      <td>{(id += 1)}</td>
                      <td>{aux.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            dispatch(eliminarMetadatoEditAction(aux))
                          }
                        >
                          {" "}
                          <i className="fa fa-trash" />{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p className="alert alert-secondary">
            <i className=" fa fa-exclamation-triangle" /> No se han asigando
            nuevos metadatos a esta plantilla
          </p>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return { newData: state.templateMetadata.metadataedit };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(
      { agregarMetadaEditAction, eliminarMetadatoEditAction },
      dispatch
    ),
  };
  // return {
  //   agregar: (aux) => dispatch(agregarMetadaEditAction(aux)),
  //   borrar: (id) => dispatch(eliminarMetadatoEditAction(id)),
  // };
};

// modifico el connect para que HOC de redux permita accede a la referencia y conecta al modal a Redux
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ModalAddIndexes);
