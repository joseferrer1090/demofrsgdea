import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import Input from "./PreviewMetadata/Input";
import PropTypes from "prop-types";
import {
  TEMPLATE_METADATA_BAG_VIEW,
  TEMPLATE_METADATA_BAG_UPDATE,
  TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID,
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class ModalEditIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.props.t,
      id: this.props.id,
      modal: this.props.modaleditindexes,
      auth: this.props.authorization,
      template: this.props.templateid,
      metadata: this.props.metadataid,
      dataMetadata: {},
      nameMetadata: "",
      optionsMetadata: [],
      typeMetadata: "",
      objMetadata: {
        defaultValue: "",
        formula: {},
        required: "",
      },
      alertError: false,
      alertError404: false,
      alertSuccess: false,
      alertSuccessMessage: "",
      spinnerEdit: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
        metadata: props.metadataid,
        template: props.templateid,
        id: props.id,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.metadataid !== prevProps.metadataid) {
      //Perform some operation here
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
          objMetadata: {
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  updateMetadata = (e) => {
    e.preventDefault();
    Yup.setLocale({});
    const schema = Yup.object().shape({
      formula: Yup.bool().required(),
      requerido: Yup.bool().required(),
      defaultValue: Yup.string().ensure().required(),
    });
    schema
      .validate({
        formula: this.state.objMetadata.formula,
        requerido: this.state.objMetadata.required,
        defaultValue: this.state.objMetadata.defaultValue,
      })
      .then(() => {
        this.putMetadata();
        // console.log("los datos correctos");
      })
      .catch((err) => {
        this.setState({
          alertError: true,
          alertErrorMessage: err.errors,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1200);
        // console.log(err.errors);
      });
  };

  putMetadata = () => {
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
        defaultValue: this.state.objMetadata.defaultValue,
        formula: this.state.objMetadata.formula,
        required: this.state.objMetadata.required,
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
                modal: false,
              });
            }, 1300);
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
          alertError: true,
          alertErrorMessage: err.message,
          spinnerEdit: false,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1200);
      });
  };

  render() {
    const { t } = this.state;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t(
              "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_title"
            )}{" "}
            {this.state.nameMetadata}{" "}
          </ModalHeader>
          <form>
            <ModalBody>
              <div className="row">
                <div className="col-md-12">
                  <p className=" alert alert-secondary">
                    <i className="fa fa-exclamation-triangle" />{" "}
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_info"
                    )}
                  </p>
                  <Alert
                    color="danger"
                    isOpen={this.state.alertError}
                    className={"text-center"}
                  >
                    <i className="fa fa-exclamation-triangle" />{" "}
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_500"
                    )}
                  </Alert>
                  <Alert
                    color={"danger"}
                    isOpen={this.state.alertError404}
                    className={"text-center"}
                  >
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_400"
                    )}
                  </Alert>
                  <Alert
                    color={"success"}
                    isOpen={this.state.alertSuccess}
                    className={"text-center"}
                  >
                    {t(
                      "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_alert_200"
                    )}
                  </Alert>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="formula">
                      {" "}
                      {t(
                        "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_formula"
                      )}{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      value={this.state.objMetadata.formula}
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        this.setState({
                          objMetadata: {
                            ...this.state.objMetadata,
                            formula: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="" disabled>
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
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <select
                      id="required"
                      className="form-control form-control-sm"
                      value={this.state.objMetadata.required}
                      onChange={(e) => {
                        this.setState({
                          objMetadata: {
                            ...this.state.objMetadata,
                            required: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="" disabled>
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
                  <div className="form-group">
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
                          options={this.state.optionsMetadata}
                          onChange={(e) => {
                            this.setState({
                              objMetadata: {
                                ...this.state.objMetadata,
                                defaultValue: e.currentTarget.value,
                              },
                            });
                          }}
                          value={this.state.objMetadata.defaultValue}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                onClick={(e) => this.updateMetadata(e)}
                className="btn btn-success btn-sm"
                disabled={this.state.spinnerEdit}
              >
                <i className="fa fa-pencil" />{" "}
                {t(
                  "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_btn_editar"
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  this.setState({ modal: false });
                }}
              >
                {" "}
                <i className="fa fa-times" />{" "}
                {t(
                  "app_plantilla_administrar_view_metadatos_asociados_modal_editar_metadato_btn_cerrar"
                )}{" "}
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

ModalEditIndex.propTypes = {
  modaleditindexes: PropTypes.bool.isRequired,
};

export default ModalEditIndex;
