import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import Input from "./PreviewMetadata/Input";
import {
  TEMPLATE_METADATA_BAG_VIEW,
  TEMPLATE_METADATA_BAG_UPDATE,
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class ModalEditIndexText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.props.t,
      id: this.props.id,
      modal: this.props.modaledittext,
      template: this.props.templateid,
      auth: this.props.authorization,
      metadata: this.props.metadataid,
      dataMetadata: {},
      nameMetadata: "",
      typeMetadata: "",
      objMetada: {
        defaultValue: "",
        formula: "",
        required: "",
      },
      alertError: false,
      alertError404: false,
      alertSuccess: false,
      spinnerEdit: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
        metadata: props.metadataid,
        template: props.templateid,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.metadataid !== prevProps.metadataid) {
      this.setState({ metadata: this.props.metadataid, id: this.props.id });
      this.getDataMetadata(this.props.metadataid);
    }
  }

  getDataMetadata = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(
      `${TEMPLATE_METADATA_BAG_VIEW}/${id}?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataMetadata: data,
          nameMetadata: data.metadata.elementConfig.name,
          optionsMetadata: data.metadata.elementConfig.options,
          typeMetadata: data.metadata.elementConfig.type,
          objMetada: {
            defaultValue: data.defaultValue,
            formula: data.formula,
            required: data.required,
          },
        });
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  updatedMetadata = (e) => {
    e.preventDefault();
    Yup.setLocale({});

    const schema = Yup.object().shape({
      formula: Yup.bool().required(),
      requerido: Yup.bool().required(),
      defaultValue: Yup.string().required(),
    });

    schema
      .validate({
        formula: this.state.objMetada.formula,
        requerido: this.state.objMetada.required,
        defaultValue: this.state.objMetada.defaultValue,
      })
      .then(() => {
        this.updateMetadataText();
      })
      .catch((err) => {
        this.setState({
          alertMessage: err.message,
          alertError: true,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1200);
        // console.log(`Error => ${err.message}`);
      });
  };

  updateMetadataText = () => {
    this.setState({
      spinnerEdit: true,
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TEMPLATE_METADATA_BAG_UPDATE}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
      body: JSON.stringify({
        id: this.state.dataMetadata.id,
        metadataBagId: this.state.id,
        templateId: this.state.template,
        defaultValue: this.state.objMetada.defaultValue,
        formula: this.state.objMetada.formula,
        required: this.state.objMetada.required,
        userName: username.user_name,
      }),
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.status === 200) {
            this.setState(
              {
                alertSuccess: true,
                spinnerEdit: false,
              },
              () => this.props.refresh()
            );
            setTimeout(() => {
              this.setState({
                alertSuccess: false,
              });
            }, 1300);
            // console.log(response);
          } else if (response.status === 404) {
            this.setState({
              alertError404: true,
              spinnerEdit: false,
            });
            setTimeout(() => {
              this.setState({
                alertError404: false,
              });
            }, 1200);
          } else if (response.status === 500) {
            this.setState({
              alertError: true,
              spinnerEdit: false,
            });
            setTimeout(() => {
              this.setState({
                alertError: false,
              });
            }, 1200);
          }
        })
      )
      .catch((err) => {
        this.setState({
          spinnerEdit: false,
          alertError: true,
          alertErrorMessage: err.message,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1200);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { t } = this.state;
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>
          {t(
            "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_title"
          )}{" "}
          {this.state.nameMetadata}
        </ModalHeader>
        <ModalBody>
          <p className=" alert alert-secondary text-justify">
            <i className="fa fa-exclamation-triangle" />{" "}
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_info"
            )}
          </p>
          <Alert
            color="danger"
            isOpen={this.state.alertError}
            className="text-center"
          >
            <i className="fa fa-exclamation-triangle" />{" "}
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_500"
            )}
          </Alert>
          <Alert
            color="danger"
            className={"text-center"}
            isOpen={this.state.alertError404}
          >
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_400"
            )}
          </Alert>
          <Alert
            color={"success"}
            isOpen={this.state.alertSuccess}
            className="text-center"
          >
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_200"
            )}
          </Alert>
          <form className="form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_formula"
                    )}
                    <span className="text-danger"> *</span>{" "}
                  </label>
                  <select
                    className="form-control form-control-sm"
                    value={this.state.objMetada.formula}
                    onChange={(e) => {
                      this.setState({
                        objMetada: {
                          ...this.state.objMetada,
                          formula: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="">
                      --{" "}
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_formula_placeholder"
                      )}{" "}
                      --
                    </option>
                    <option value="true">
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_formula_valor_1"
                      )}
                    </option>
                    <option value="false">
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_formula_valor_2"
                      )}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_requerido"
                    )}{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control form-control-sm"
                    value={this.state.objMetada.required}
                    onChange={(e) => {
                      this.setState({
                        objMetada: {
                          ...this.state.objMetada,
                          required: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="">
                      --{" "}
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_requerido_placeholder"
                      )}{" "}
                      --
                    </option>
                    <option value="true">
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_requerido_valor_1"
                      )}
                    </option>
                    <option value="false">
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_requerido_valor_2"
                      )}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_title_card"
                    )}{" "}
                    {this.state.nameMetadata}
                  </div>
                  <div className="card-body">
                    <Input
                      formType={this.state.typeMetadata}
                      onChange={(e) => {
                        this.setState({
                          objMetada: {
                            ...this.state.objMetada,
                            defaultValue: e.target.value,
                          },
                        });
                      }}
                      value={this.state.objMetada.defaultValue}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="float-right">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                this.updatedMetadata(e);
              }}
              className="btn btn-outline-success btn-sm"
              disabled={this.state.spinnerEdit}
            >
              {this.state.spinnerEdit ? (
                <i className="fa fa-spinner fa-refresh" />
              ) : (
                <div>
                  <i className="fa fa-pencil" />{" "}
                  {t(
                    "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_btn_editar"
                  )}{" "}
                </div>
              )}
            </button>
            &nbsp;
            <button
              type="button"
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
                "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_btn_cerrar"
              )}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditIndexText.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default ModalEditIndexText;
