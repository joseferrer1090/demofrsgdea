import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Spinner,
} from "reactstrap";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { decode } from "jsonwebtoken";
import {
  FIND_BY_METADATA_BAG_ID,
  METADATA_DETAIL_CREATE,
  METADATA_DETAIL_DELETE,
  METADATA_DETAIL_PUT,
} from "./../../../../../services/EndPoints";
import * as Yup from "yup";

class ModalUpdateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldetails,
      auth: this.props.authorization,
      id: this.props.id,
      idMetadata: "",
      data: [],
      metadata: {},
      spinner: false,
      hiddenColumnID: true,
      information: true,
      alertSuccess: false,
      alertsSuccessPut: false,
      alertSuccessDelete: false,
      alertError400: false,
      alertError400Put: false,
      alertError400Delete: false,
      alertError500: false,
      alertError500Put: false,
      alertError500Delete: false,
      actions: {
        visible1: true,
        visible2: true,
        visible3: true,
      },
      formcreate: {
        title: "",
        value: "",
        id: "",
        alertError: false,
        alertErrorMessage: "",
      },
      t: this.props.t,
      titleupdate: "",
      valueupdate: "",
      idupdate: "",
      alertError: false,
      alertErrorMessage: "",
      formdelete: {
        title: "",
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // Metodo para traer la data del array y los actualizar
    if (this.props.id !== prevProps.id) {
      this.setState(
        {
          id: this.props.id,
          auth: this.props.authorization,
        },
        () => this.getDataDetailsById(this.state.id, this.state.auth)
      );
    }
  }

  getDataDetailsById = (id, auth) => {
    fetch(`${FIND_BY_METADATA_BAG_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data: data,
        });
        //console.log(this.state.data);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  accionesDetails(cell, row) {
    return (
      <div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            console.log(row);
            setTimeout(() => {
              if (this.state.actions.visible2 === true) {
                this.setState({
                  actions: {
                    ...this.state.actions,
                    visible2: !this.state.actions.visible2,
                  },
                });
              }
            }, 500);

            this.setState({
              actions: {
                ...this.state.actions,
                visible2: !this.state.actions.visible2,
              },
              idMetadata: row.id,
              titleupdate: row.labelText,
              valueupdate: row.inputValue,
              idupdate: row.inputId,
            });
          }}
        >
          {" "}
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            setTimeout(() => {
              if (this.state.actions.visible3 === true) {
                this.setState({
                  actions: {
                    ...this.state.actions,
                    visible3: !this.state.actions.visible3,
                  },
                });
              }
            }, 500);
            this.setState({
              actions: {
                ...this.state.actions,
                visible3: !this.state.actions.visible3,
              },
              idMetadata: row.id,
              formdelete: {
                ...this.state.formdelete,
                title: row.labelText,
              },
            });
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  createCustomButton = (props) => {
    const { t } = this.state;
    return (
      <button
        className="btn btn-success btn-sm"
        onClick={() => {
          this.setState({
            actions: {
              ...this.state.actions,
              visible1: !this.state.actions.visible1,
            },
          });
        }}
      >
        <i className="fa fa-plus-circle" />{" "}
        {t("app_metadatos_actualizar_metdatos_modal_detalles_agregar_detalle")}
      </button>
    );
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  // PostCreateDetail
  createDetail = () => {
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(`${METADATA_DETAIL_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux,
      },
      body: JSON.stringify({
        labelText: this.state.formcreate.title,
        inputId: this.state.formcreate.id,
        inputValue: this.state.formcreate.value,
        userName: username.user_name,
        metadataBagId: this.state.id,
      }),
    })
      .then((resp) => {
        if (resp.status === 201) {
          this.getDataDetailsById(this.state.id, this.state.auth);
          this.setState({
            alertSuccess: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertSuccess: false,
            });
          }, 3000);
        } else if (resp.status === 400) {
          this.setState({
            alertError400: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertError400: false,
            });
          }, 3000);
        } else if (resp.status === 500) {
          this.setState({
            alertError500: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertError500: false,
            });
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
        this.setState({
          spinner: false,
        });
      });
    this.resetForm();
  };
  resetForm = () => {
    this.setState({
      formcreate: {
        title: "",
        value: "",
        id: "",
        alertError: false,
      },
    });
  };

  // DeleteDetails
  deleteDetail = (e) => {
    e.preventDefault();
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(
      `${METADATA_DETAIL_DELETE}${this.state.idMetadata}?username=${username.user_name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + this.state.auth,
        },
      }
    )
      .then((resp) => {
        if (resp.status === 204) {
          this.setState({
            actions: {
              ...this.state.actions,
              visible3: !this.state.actions.visible3,
            },
            alertSuccessDelete: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertSuccessDelete: false,
            });
          }, 3000);
          this.getDataDetailsById(this.state.id, this.state.auth);
        } else if (resp.status === 500) {
          this.setState({
            actions: {
              ...this.state.actions,
              visible3: !this.state.actions.visible3,
            },
            alertError500Delete: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertError500Delete: false,
            });
          }, 3000);
        } else if (resp.status === 400) {
          this.setState({
            alertError400Delete: true,
            actions: {
              ...this.state.actions,
              visible3: !this.state.actions.visible3,
            },
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertError400Delete: false,
            });
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  // PutDeatiails
  putDetails = (e) => {
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(`${METADATA_DETAIL_PUT}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux,
      },
      body: JSON.stringify({
        id: this.state.idMetadata,
        labelText: this.state.titleupdate,
        inputId: this.state.idupdate,
        inputValue: this.state.valueupdate,
        userName: username.user_name,
        metadataBagId: this.state.id,
      }),
    })
      .then((resp) => {
        if (resp.status === 200) {
          this.getDataDetailsById(this.state.id, this.state.auth);
          this.setState({
            alertsSuccessPut: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertsSuccessPut: false,
            });
          }, 3000);
        } else if (resp.status === 400) {
          this.setState({
            alertError400Put: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertError400Put: false,
            });
          }, 3000);
        } else if (resp.status === 500) {
          this.setState({
            alertError500Put: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alertError500Put: false,
            });
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
        this.setState({
          spinner: false,
        });
      });
  };

  // Validaciones del formCreate
  sendData = () => {
    Yup.setLocale({});
    const schema = Yup.object().shape({
      title: Yup.string()
        .trim()
        .required(" Por favor introduzca una etiqueta."),
      value: Yup.string().trim().required(" Por favor introduzca un valor."),
      id: Yup.string()
        .trim()
        .required(" Por favor introduzca el Id del detalle."),
    });
    schema
      .validate({
        title: this.state.formcreate.title,
        value: this.state.formcreate.value,
        id: this.state.formcreate.id,
      })
      .then((e) => {
        if (schema.isValid) {
          this.createDetail();
        }
      })
      .catch((err) => {
        this.setState({
          formcreate: {
            ...this.state.formcreate,
            alertError: true,
            alertErrorMessage: err.message,
          },
        });
        setTimeout(() => {
          this.setState({
            formcreate: {
              ...this.state.formcreate,
              alertError: false,
            },
          });
        }, 1100);
      });
  };

  // Validacion del updateForm
  sendDataUpdate = (e) => {
    Yup.setLocale({});
    const schema = Yup.object().shape({
      title: Yup.string()
        .trim()
        .required(" Por favor introduzca una etiqueta."),
      value: Yup.string().trim().required(" Por favor introduzca un valor."),
      id: Yup.string()
        .trim()
        // .required(" Por favor introduzca el Id del detalle.")
        .nullable(),
    });
    schema
      .validate({
        title: this.state.titleupdate,
        value: this.state.valueupdate,
        id: this.state.idupdate,
      })
      .then((e) => {
        if (schema.isValid) {
          this.putDetails(e);
        }
      })
      .catch((err) => {
        this.setState({
          alertError: true,
          alertErrorMessage: err.message,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1100);
      });
  };

  render() {
    const options = {
      btnGroup: this.createCustomButton,
    };
    const { t } = this.state;
    return (
      <Modal isOpen={this.state.modal} className="modal-lg">
        <ModalHeader>
          <i className="fa fa-pencil" />{" "}
          {t("app_metadatos_actualizar_metdatos_modal_detalles_titulo")}{" "}
          {this.props.name}
        </ModalHeader>
        <ModalBody>
          <Alert
            color={"light"}
            isOpen={this.state.information}
            toggle={() => {
              this.setState({ information: false });
            }}
          >
            <i className="fa fa-exclamation-triangle" />{" "}
            {t("app_metadatos_actualizar_metdatos_modal_detalles_alert_info")}
          </Alert>
          {this.state.spinner !== false ? (
            <center>
              <br />
              <Spinner
                style={{ width: "3rem", height: "3rem" }}
                type="grow"
                color="primary"
              />
            </center>
          ) : (
            <div></div>
          )}
          <Alert
            className={"text-center"}
            color="success"
            isOpen={this.state.alertSuccess}
          >
            {t("app_metadatos_actualizar_metdatos_modal_detalles_alert_200")}
          </Alert>
          <Alert
            className={"text-center"}
            color="danger"
            isOpen={this.state.alertError400}
          >
            {t("app_metadatos_actualizar_metdatos_modal_detalles_alert_400")}
          </Alert>
          <Alert
            className={"text-center"}
            color="danger"
            isOpen={this.state.alertError500}
          >
            {t("app_metadatos_actualizar_metdatos_modal_detalles_alert_500")}
          </Alert>
          <Alert
            className={"text-center"}
            color="success"
            isOpen={this.state.alertsSuccessPut}
          >
            {t(
              "app_metadatos_actualizar_metdatos_modal_detalles_alert_200_put"
            )}
          </Alert>
          <Alert
            className={"text-center"}
            color="danger"
            isOpen={this.state.alertError400Put}
          >
            {t(
              "app_metadatos_actualizar_metdatos_modal_detalles_alert_400_put"
            )}
          </Alert>
          <Alert
            className={"text-center"}
            color="danger"
            isOpen={this.state.alertError500Put}
          >
            {t(
              "app_metadatos_actualizar_metdatos_modal_detalles_alert_500_put"
            )}
          </Alert>
          <Alert
            className="text-center"
            color="success"
            isOpen={this.state.alertSuccessDelete}
          >
            {t(
              "app_metadatos_actualizar_metdatos_modal_detalles_alert_200_delete"
            )}
          </Alert>
          <Alert
            className="text-center"
            color="danger"
            isOpen={this.state.alertError400Delete}
            toggle={this.onDismiss}
          >
            {t(
              "app_metadatos_actualizar_metdatos_modal_detalles_alert_400_delete"
            )}
          </Alert>
          <Alert
            className="text-center"
            color="danger"
            isOpen={this.state.alertError500}
            toggle={this.onDismiss}
          >
            {t(
              "app_metadatos_actualizar_metdatos_modal_detalles_alert_500_delete"
            )}
          </Alert>
          <div
            className="col-md-12 animated fadeIn"
            hidden={this.state.actions.visible3}
          >
            <div className="col-md-12">
              <div className="alert alert-danger" role="alert">
                <p className="text-justify mb-0 text-dark">
                  {t(
                    "app_metadatos_actualizar_metdatos_modal_detalles_eliminar_alert_titulo"
                  )}{" "}
                  <strong>{this.state.formdelete.title}</strong>
                  <hr />
                  <p className="text-drak">
                    {t(
                      "app_metadatos_actualizar_metdatos_modal_detalles_eliminar_alert_info"
                    )}
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={(e) => {
                      this.deleteDetail(e);
                      this.setState({
                        spinner: true,
                      });
                    }}
                  >
                    <i className="fa fa-trash" />{" "}
                    {t(
                      "app_metadatos_actualizar_metdatos_modal_detalles_eliminar_btn_eliminar"
                    )}
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      this.setState({
                        actions: {
                          ...this.state.actions,
                          visible3: !this.state.actions.visible3,
                        },
                      });
                    }}
                  >
                    {" "}
                    <i className="fa fa-times" />{" "}
                    {t(
                      "app_metadatos_actualizar_metdatos_modal_detalles_eliminar_btn_cancelar"
                    )}
                  </button>
                </p>
              </div>
            </div>
          </div>
          <BootstrapTable
            data={this.state.data}
            options={options}
            striped
            bordered={false}
            style={{ padding: "0px", margin: "0px", zoom: "0" }}
          >
            <TableHeaderColumn
              dataField={"id"}
              isKey
              hidden={this.state.hiddenColumnID}
            >
              Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"labelText"} dataAlign={"center"}>
              {t(
                "app_metadatos_actualizar_metdatos_modal_detalles_table_etiqueta"
              )}
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"inputValue"} dataAlign={"center"}>
              {t(
                "app_metadatos_actualizar_metdatos_modal_detalles_table_valor"
              )}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign={"center"}
              dataFormat={(cell, row) => this.accionesDetails(cell, row)}
            >
              {t(
                "app_metadatos_actualizar_metdatos_modal_detalles_table_acciones"
              )}
            </TableHeaderColumn>
          </BootstrapTable>
          {/* <p>{this.state.id}</p> */}
          <br />
          <div
            className=" animated fadeIn col-md-12"
            hidden={this.state.actions.visible1}
            // style={{ border: "1px solid green" }}
          >
            <Card>
              <CardHeader>
                {t(
                  "app_metadatos_actualizar_metdatos_modal_detalles_agregar_titulo_card"
                )}{" "}
              </CardHeader>
              <CardBody>
                <Alert
                  isOpen={this.state.formcreate.alertError}
                  color={"danger"}
                >
                  <i className="fa fa-exclamation-triangle" />{" "}
                  {this.state.formcreate.alertErrorMessage}
                </Alert>
                <form className="form" ref={(el) => (this.myFormCreate = el)}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_detalles_agregar_etiqueta"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.formcreate.title}
                          onChange={(e) => {
                            this.setState({
                              formcreate: {
                                ...this.state.formcreate,
                                title: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_detalles_agregar_valor"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.formcreate.value}
                          onChange={(e) => {
                            this.setState({
                              formcreate: {
                                ...this.state.formcreate,
                                value: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_detalles_agregar_id"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.formcreate.id}
                          onChange={(e) => {
                            this.setState({
                              formcreate: {
                                ...this.state.formcreate,
                                id: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.sendData();
                        if (
                          this.state.formcreate.title &&
                          this.state.formcreate.value &&
                          this.state.formcreate.id !== ""
                        ) {
                          this.setState({
                            spinner: true,
                          });
                        }
                        // this.setState({
                        //   actions: {
                        //     ...this.state.actions,
                        //     visible1: !this.state.actions.visible1
                        //   }
                        // });
                      }}
                    >
                      <i className="fa fa-plus-circle" />{" "}
                      {t(
                        "app_metadatos_actualizar_metdatos_modal_detalles_agregar_btn_crear"
                      )}{" "}
                    </button>
                    &nbsp;
                    <button
                      type={"button"}
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          actions: {
                            ...this.state.actions,
                            visible1: !this.state.actions.visible1,
                          },
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t(
                        "app_metadatos_actualizar_metdatos_modal_detalles_agregar_btn_cerrar"
                      )}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
          <div
            className="col-md-12 animated fadeIn"
            hidden={this.state.actions.visible2}
          >
            <Card>
              <CardHeader>
                {t(
                  "app_metadatos_actualizar_metdatos_modal_detalles_editar_titulo_card"
                )}
              </CardHeader>
              <CardBody>
                <Alert color={"danger"} isOpen={this.state.alertError}>
                  <i className="fa fa-exclamation-triangle" />{" "}
                  {this.state.alertErrorMessage}
                </Alert>
                <form className="form">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_detalles_editar_etiqueta"
                          )}
                        </label>
                        <input
                          type={"text"}
                          className="form-control form-control-sm"
                          value={this.state.titleupdate}
                          onChange={(e) => {
                            this.setState({
                              titleupdate: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_detalles_editar_valor"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.valueupdate}
                          onChange={(e) => {
                            this.setState({
                              valueupdate: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_detalles_editar_id"
                          )}
                        </label>
                        <input
                          disabled
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.idupdate}
                          onChange={(e) => {
                            this.setState({
                              idupdate: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        this.sendDataUpdate(e);
                        if (
                          this.state.formcreate.title &&
                          this.state.formcreate.value !== ""
                        ) {
                          this.setState({
                            spinner: true,
                          });
                        }
                      }}
                    >
                      <i className="fa fa-pencil" />
                      {t(
                        "app_metadatos_actualizar_metdatos_modal_detalles_editar_btn_actualizar_"
                      )}
                    </button>
                    &nbsp;
                    <button
                      type={"button"}
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          actions: {
                            ...this.state.actions,
                            visible2: !this.state.actions.visible2,
                          },
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t(
                        "app_metadatos_actualizar_metdatos_modal_detalles_editar_btn_cerrar"
                      )}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false,
                });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t(
                "app_metadatos_actualizar_metdatos_modal_detalles_agregar_btn_cerrar"
              )}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
ModalUpdateDetails.propTypes = {
  authorization: PropTypes.string.isRequired,
  modaldetails: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default ModalUpdateDetails;
