import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Alert,
  Spinner,
} from "reactstrap";
import {
  METADATA_VIEW,
  METADATA_UPDATE,
} from "./../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import IMG from "./../../../../../assets/img/keyboard.png";
import * as Yup from "yup";
import moment from "moment";

class ModalUpdateMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalupdate,
      auth: this.props.authorization,
      id: this.props.id,
      data: {},
      fechaCreacion: "",
      fechaModificacion: "",
      nombre: "",
      descripcion: "",
      label: "",
      idMetadata: "",
      status: null,
      formula: null,
      alertError: false,
      alertErrorMessage: "",
      alert200: false,
      alert400: false,
      alert500: false,
      spinner: true,
      t: this.props.t,
      spinnerActualizar: false,
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
    if (this.props.id !== prevProps.id) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.id,
      });
      this.getDataMetaDataByID(this.state.id, this.state.auth);
    } else if (this.props.authorization === "" || this.props.id === null) {
    }
    return;
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      spinner: true,
    });
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 2000);
  };

  getDataMetaDataByID = (id, auth) => {
    const aux = auth;
    const user = decode(aux);
    fetch(`${METADATA_VIEW}${id}?username=${user.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data.metadata,
          fechaCreacion: data.metadata.createdAt,
          fechaModificacion: data.metadata.updatedAt,
          nombre: data.metadata.name,
          descripcion: data.metadata.description,
          label: data.metadata.labelText,
          idMetadata: data.metadata.inputId,
          status: data.metadata.status,
          formula: data.metadata.formula,
          spinner: false,
        });
        console.log(data.metadata);
      })
      .catch((err) => {
        console.log(`${err.message}`);
      });
  };

  sendData = (e) => {
    e.preventDefault();
    Yup.setLocale({}); // => en caso que sea una validacion custom
    const schema = Yup.object().shape({
      nombre: Yup.string().trim().required(" Por favor introduzca un nombre."),
      descripcion: Yup.string()
        .trim()
        .required(" Por favor introduzca una descripión."),
      label: Yup.string().trim().required(" Por favor introduzca la etiqueta."),
      idMetadata: Yup.string()
        .trim()
        .required(" Por favor introduzca el ID del campo."),
    });
    schema
      .validate({
        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
        label: this.state.label,
        idMetadata: this.state.idMetadata,
        status: this.state.status,
        formula: this.state.formula,
      })
      .then(() => {
        if (schema.isValid) {
          this.sendEditMetadata();
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
        }, 1500);
      });
  };

  sendEditMetadata = () => {
    this.setState({
      spinnerActualizar: true,
    });
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(`${METADATA_UPDATE}/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux,
      },
      body: JSON.stringify({
        // id: this.state.data.id,
        name: this.state.nombre,
        description: this.state.descripcion,
        labelText: this.state.label,
        labelClass: "col-sm-2 col-form-label",
        inputId: this.state.idMetadata,
        inputType: this.state.data.inputType,
        inputClass: this.state.data.inputClass,
        inputPlaceholder: this.state.data.inputPlaceholder,
        formula: this.state.formula,
        status: this.state.status,
        userName: username.user_name,
      }),
    })
      .then((resp) => {
        if (resp.status === 400) {
          this.setState({
            alert400: true,
            spinnerActualizar: false,
          });
          setTimeout(() => {
            this.setState({
              alert400: false,
            });
          }, 1500);
        } else if (resp.status === 200) {
          this.setState({
            alert200: true,
            spinnerActualizar: false,
          });
          setTimeout(() => {
            this.setState(
              {
                alert200: false,
                modal: false,
              },
              () => {
                this.props.refresh();
              }
            );
          }, 1500);
        } else if (resp.status === 500) {
          this.setState({
            alert500: true,
            spinnerActualizar: false,
          });
          setTimeout(() => {
            this.setState({
              alert500: false,
            });
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
        this.setState({
          spinnerActualizar: false,
        });
      });
  };
  FechaCreacionMetadato = (data) => {
    return moment(data).format("DD-MM-YYYY, h:mm:ss a");
  };
  FechaModificacionMetadato = (data) => {
    return moment(data).format("DD-MM-YYYY, h:mm:ss a");
  };

  render() {
    const { t } = this.state;
    return (
      <Modal isOpen={this.state.modal} className="modal-lg">
        <ModalHeader>
          {t("app_metadatos_actualizar_metadatos_modal_controles_titulo")}{" "}
          {this.state.data.name}
        </ModalHeader>
        <ModalBody>
          <Alert color={"danger"} isOpen={this.state.alertError}>
            <i className="fa fa-exclamation-triangle" />{" "}
            {this.state.alertErrorMessage}
          </Alert>
          <Alert color={"success"} isOpen={this.state.alert200}>
            <p>
              {t("app_metadatos_actualizar_metdatos_modal_controles_alert_200")}
            </p>
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert400}>
            <p>
              <i className="fa fa-exclamation-triangle" />{" "}
              {t("app_metadatos_actualizar_metdatos_modal_controles_alert_400")}
            </p>
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert500}>
            <p>
              <i className="fa fa-exclamation-triangle" />{" "}
              {t("app_metadatos_actualizar_metdatos_modal_controles_alert_500")}
            </p>
          </Alert>
          <div className="row">
            <div className={"col-md-4"}>
              <img
                src={IMG}
                // width={220}
                className="img-thumbnail"
                // style={{ padding: "20px" }}
              />
            </div>
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
              <div className={"col-md-8"}>
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_controles_fecha_creacion"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type={"text"}
                          className="form-control form-control-sm"
                          value={this.FechaCreacionMetadato(
                            this.state.fechaCreacion
                          )}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_controles_fecha_modificacion"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type={"text"}
                          className="form-control form-control-sm"
                          value={this.FechaModificacionMetadato(
                            this.state.fechaModificacion
                          )}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_controles_nombre"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.nombre}
                          onChange={(e) => {
                            this.setState({
                              nombre: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_controles_descripcion"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          className="form-control form-control-sm"
                          value={this.state.descripcion}
                          onChange={(e) => {
                            this.setState({
                              descripcion: e.target.value,
                            });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_controles_etiqueta"
                          )}{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type={"text"}
                          className="form-control form-control-sm"
                          value={this.state.label}
                          onChange={(e) => {
                            this.setState({
                              label: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_metadatos_actualizar_metdatos_modal_controles_id_campo"
                          )}{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type={"text"}
                          className="form-control form-control-sm"
                          value={this.state.idMetadata}
                          onChange={(e) => {
                            this.setState({
                              idMetadata: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <CustomInput
                          // value={this.state.active}
                          defaultValue={!this.state.status}
                          defaultChecked
                          type="checkbox"
                          id={"activeInput"}
                          label={`${t(
                            "app_metadatos_crear_metadato_bolsa_metadatos_status"
                          )}`}
                          onChange={(e) => {
                            this.setState({
                              status: e.target.checked,
                            });
                          }}
                        ></CustomInput>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <CustomInput
                          // value={this.state.active}
                          defaultValue={!this.state.formula}
                          type="checkbox"
                          id={"formula"}
                          label={`${t(
                            "app_metadatos_crear_metadato_bolsa_metadatos_status_formula"
                          )}`}
                          onChange={(e) => {
                            this.setState({
                              formula: e.target.checked,
                            });
                          }}
                        ></CustomInput>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              // className="btn btn-secondary btn-sm"
              className={"btn btn-success btn-sm"}
              onClick={(e) => {
                this.sendData(e);
              }}
              disabled={this.state.spinnerActualizar}
            >
              {this.state.spinnerActualizar ? (
                <i className=" fa fa-spinner fa-refresh" />
              ) : (
                <div>
                  {" "}
                  <i className="fa fa-pencil" />{" "}
                  {t(
                    "app_metadatos_actualizar_metdatos_modal_controles_btn_actualizar"
                  )}{" "}
                </div>
              )}
            </button>
            &nbsp;
            <button
              type={"button"}
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false,
                  spinner: false,
                });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t(
                "app_metadatos_actualizar_metdatos_modal_controles_btn_cerrar"
              )}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalUpdateMetadata.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ModalUpdateMetadata;
