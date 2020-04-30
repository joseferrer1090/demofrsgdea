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
      t: this.props.t,
      modal: this.props.modalindexes,
      auth: this.props.authorization,
      dataMetadataActive: [],
      term: "",
      templateID: this.props.template,
      alert200: false,
      alert400: false,
      alert500: false,
      alertCatch: false,
      alertmsg: "",
      spinnerAdd: false,
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
    this.setState({
      spinnerAddt: true,
    });
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
              spinnerAdd: false,
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
            this.setState({
              alert400: true,
              spinnerAdd: false,
            });
            setTimeout(() => {
              this.setState({
                alert400: false,
              });
            }, 1300);
          } else if (response.status === 500) {
            this.setState({
              alert500: true,
              spinnerAdd: false,
            });
            setTimeout(() => {
              this.setState({
                alert500: false,
              });
            }, 1300);
          }
        })
        .catch((err) => {
          this.setState({
            alertCatch: true,
            alertmsg: err.message,
            spinnerAdd: false,
          });
          setTimeout(() => {
            this.setState({
              alertCatch: false,
            });
          }, 1300);
          // console.log(`Error => ${err.message}`);
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
    const { t } = this.state;
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
          <i className="fa fa-puzzle-piece" />{" "}
          {t(
            "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_title"
          )}
        </ModalHeader>
        <ModalBody>
          <p className="alert alert-secondary">
            <i className="fa fa-info-circle" />{" "}
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_alert_info"
            )}
          </p>
          <Alert
            color="success"
            isOpen={this.state.alert200}
            className={"text-center"}
          >
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_alert_200"
            )}
          </Alert>
          <Alert
            color="danger"
            isOpen={this.state.alert400}
            className={"text-center"}
          >
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_alert_400"
            )}
          </Alert>
          <Alert
            color="danger"
            isOpen={this.state.alert500}
            className={"text-center"}
          >
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_alert_500"
            )}
          </Alert>
          <Alert
            color="danger"
            isOpen={this.state.alertCatch}
            className={"text-center"}
          >
            <p>
              {t(
                "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_alert_catch"
              )}{" "}
              => {this.state.alertmsg}
            </p>
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
                    placeholder={t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_placeholder_search"
                    )}
                  />
                </div>
                <br />
                {Object.keys(data) ? (
                  <div className="tableFixHead">
                    <table className="table table-hover table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th className="text-center">
                            {t(
                              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_table_id"
                            )}
                          </th>
                          <th className="text-center">
                            {t(
                              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_nombre"
                            )}
                          </th>
                          <th className="text-center">
                            {t(
                              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_accion"
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>{aux}</tbody>
                    </table>
                  </div>
                ) : (
                  <div className="animated fadeIn">
                    <p className="alert alert-danger text-center">
                      <i className="fa fa-exclamation-triangle" />{" "}
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_alert_no_data"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <TableIndexes data={this.props.newData} t={t} />
              {/* <p>apenas viendo como va la cosa </p> */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => this.sendMetadataList()}
            disabled={this.state.spinnerAdd}
          >
            {this.state.spinnerAdd ? (
              <i className=" fa fa-spinner fa-refresh" />
            ) : (
              <div>
                <i className="fa fa-save" />{" "}
                {t(
                  "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_btn_agregar"
                )}
              </div>
            )}
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
            <i className="fa fa-times" />{" "}
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_btn_cerrar"
            )}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const TableIndexes = (props) => {
  const { t } = props;
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
                  <th>
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_table_asignacion_nombre"
                    )}
                  </th>
                  <th>
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_table_asignacion_accion"
                    )}
                  </th>
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
            <i className=" fa fa-exclamation-triangle" />{" "}
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_agregar_metadato_alert_info_asiganacion"
            )}
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
};
ModalAddIndexes.propTypes = {
  t: PropTypes.string.isRequired,
};
// modifico el connect para que HOC de redux permita accede a la referencia y conecta al modal a Redux
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ModalAddIndexes);
