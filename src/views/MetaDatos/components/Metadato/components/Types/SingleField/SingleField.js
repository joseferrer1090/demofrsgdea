import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Toast,
  ToastBody,
  ToastHeader,
  CustomInput,
  Alert,
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "../../ModalPreview";
import { METADATA_CREATE } from "../../../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class SingleField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      name: "",
      toolType: "SINGLE_FIELD",
      defaultValue: "",
      placeholder: "",
      description: "",
      helpertext: "",
      validation: {
        isReadOnly: false,
        isRequired: false,
        min: 6,
        max: 6,
      },
      active: true,
      formula: false,
      activeTab: "1",
      tab: "",
      modalpreview: false,
      dragType: "",
      auth: "",
      alert200: false,
      alert400: false,
      alert500: false,
      alertError: false,
      alertErrorMessage: "",
      previewInfoField: false,
      t: this.props.t,
      spinner: false,
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
    this.setState(this.props.field);
    this.setState({ dragType: this.props.dragType });
  }

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "TITLE":
        this.setState({ title: value });
        break;
      case "PLACEHOLDER":
        this.setState({ placeholder: value });
        break;
      case "TYPE":
        this.setState({ type: value });
        break;
      case "DESCRIPTION":
        this.setState({ description: value });
        break;
      case "DEFAULT_VALUE":
        this.setState({ defaultValue: value });
        break;
      case "IS_REQUIRED":
        this.setState({
          validation: { ...this.state.validation, isRequired: value },
        });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value },
        });
        break;
      case "MIN":
        this.setState({ validation: { ...this.state.validation, min: value } });
        break;
      case "MAX":
        this.setState({ validation: { ...this.state.validation, max: value } });
        break;
      case "HELPER_TEXT":
        this.setState({ helpertext: value });
        break;
      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  openModalPreview = () => {
    this.myModal.toggle();
  };

  sendData = () => {
    this.setState({
      spinner: true,
    });
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(`${METADATA_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.state.auth,
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        labelText: this.state.title,
        labelClass: "col-sm-2 col-form-label",
        inputId: this.state.name,
        inputType: this.state.type,
        inputClass: "form-control form-control-sm",
        inputPlaceholder: this.state.placeholder,
        formula: this.state.formula,
        status: this.state.active,
        userName: username.user_name,
      }),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            alert200: true,
          });
          console.log({
            id: this.state.name,
            name: this.state.name,
            type: this.state.type,
            title: this.state.title,
            inputPlaceholder: this.state.placeholder,
            description: this.state.description,
            formula: this.state.formula,
            active: this.state.active,
          });
          setTimeout(() => {
            this.setState({
              alert200: false,
              spinner: false,
            });
          }, 1500);
        } else if (response.status === 400) {
          this.setState({
            alert400: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert400: false,
            });
          }, 1500);
        } else if (response.status === 500) {
          this.setState({
            alert500: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert500: false,
            });
          }, 1500);
        }
      })
      .catch((error) => {
        this.setState({ alert500: true, spinner: false });
        setTimeout(() => {
          this.setState({
            alert500: false,
          });
        }, 1500);
        console.log(`error, ${error}`);
      });
    setTimeout(() => {
      this.resetForm();
    }, 500);
  };

  CreateMetadate = (e) => {
    e.preventDefault();
    Yup.setLocale({});
    const schema = Yup.object().shape({
      name: Yup.string().required(" Por favor introduzca un nombre."),
      active: Yup.bool().test(
        "Activo",
        " Es necesario activar el metadato.",
        (value) => value === true
      ),
      description: Yup.string().required(
        " Por favor introduzca una descripción."
      ),
      title: Yup.string().required(" Por favor introduzca la etiqueta."),
    });
    schema
      .validate({
        name: this.state.name,
        active: this.state.active,
        description: this.state.description,
        title: this.state.title,
      })
      .then(() => {
        if (schema.isValid) {
          this.sendData();
        }
      })
      .catch((err) => {
        this.setState(
          {
            alertError: true,
            alertErrorMessage: err.message,
          },
          console.log(err)
        );
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1500);
      });
  };

  resetForm = () => {
    this.setState({
      name: "",
      description: "",
      title: "Title",
      type: "text",
      defaultValue: "",
      placeholder: "",
      helpertext: "",
      formula: false,
      active: true,
      validation: {
        isReadOnly: false,
        isRequired: false,
        min: 6,
        max: 6,
      },
    });
    this.changeValue("TITLE", this.state.title);
  };
  render() {
    const { t } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardHeader>
                <i className="fa fa-wpforms" />
                {t("app_metadatos_crear_metadato_entrada_texto_title")}{" "}
                {this.state.title}
                <button
                  className="btn btn-link btn-sm pull-right"
                  onClick={() => this.props.removeField(this.props.index)}
                >
                  <i className="fa fa-times" style={{ color: "red" }} />
                </button>
              </CardHeader>
              <CardBody>
                <Alert color={"danger"} isOpen={this.state.alertError}>
                  <p className="text-justify">
                    <i className="fa fa-exclamation-triangle fa-1x" />{" "}
                    {this.state.alertErrorMessage}
                  </p>
                </Alert>
                <Toast isOpen={this.state.alert200}>
                  <ToastHeader icon={"success"}>
                    SGDEA - Modulo de configuración
                  </ToastHeader>
                  <ToastBody>
                    <p className="text-justify">
                      {" "}
                      Se creo correactamente el metadato.{" "}
                    </p>
                  </ToastBody>
                </Toast>
                <Toast isOpen={this.state.alert400}>
                  <ToastHeader icon={"danger"}>
                    SGDEA - Modulo de configuración
                  </ToastHeader>
                  <ToastBody>
                    <p className="text-justify">
                      {" "}
                      Error al enviar los datos al servidor.{" "}
                    </p>
                  </ToastBody>
                </Toast>
                <Toast isOpen={this.state.alert500}>
                  <ToastHeader icon={"danger"}>
                    {" "}
                    SGDEA - Modulo de configuración
                  </ToastHeader>
                  <ToastBody>
                    <p className="text-justify">
                      {" "}
                      Error al enviar los datos, ocurrio un problema en el
                      servidor{" "}
                    </p>
                  </ToastBody>
                </Toast>
                <br />
                <Nav tabs>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <i className="fa fa-cog" />
                    &nbsp;{" "}
                    {t(
                      "app_metadatos_crear_metadato_entrada_texto_tab_general"
                    )}
                  </NavLink>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <i className="fa fa-exclamation-triangle" />
                    &nbsp;{" "}
                    {t(
                      "app_metadatos_crear_metadato_entrada_texto_tab_validacion"
                    )}
                  </NavLink>
                </Nav>
                <form className="form" ref={(el) => (this.myFormRef = el)}>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Card body>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="name">
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_nombre"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => {
                                  this.changeValue("NAME", e.target.value);
                                }}
                                placeholder={`${t(
                                  "app_metadatos_crear_metadato_entrada_texto_nombre_placeholder"
                                )}`}
                                value={this.state.name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_defaultValue"
                                )}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => {
                                  this.changeValue(
                                    "DEFAULT_VALUE",
                                    e.target.value
                                  );
                                }}
                                value={this.state.defaultValue}
                                placeholder={`${t(
                                  "app_metadatos_crear_metadato_entrada_texto_defaultValue_placeholder"
                                )}`}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_helpText"
                                )}
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => {
                                  this.changeValue(
                                    "HELPER_TEXT",
                                    e.target.value
                                  );
                                }}
                                value={this.state.helpertext}
                                placeholder={`${t(
                                  "app_metadatos_crear_metadato_entrada_texto_helpText_placeholder"
                                )}`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="title">
                                {" "}
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_label"
                                )}{" "}
                                {this.state.title}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="text"
                                value={this.state.title}
                                onChange={(e) =>
                                  this.changeValue("TITLE", e.target.value)
                                }
                                placeholder={`${t(
                                  "app_metadatos_crear_metadato_entrada_texto_label_placeholder"
                                )}`}
                                className={"form-control form-control-sm"}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="title">
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_placeholder"
                                )}
                              </label>
                              <input
                                type="text"
                                value={this.state.placeholder}
                                onChange={(e) =>
                                  this.changeValue(
                                    "PLACEHOLDER",
                                    e.target.value
                                  )
                                }
                                placeholder={`${t(
                                  "app_metadatos_crear_metadato_entrada_texto_placeholder_placeholder"
                                )}`}
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="title">
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_descripcion"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <textarea
                                value={this.state.description}
                                onChange={(e) =>
                                  this.changeValue(
                                    "DESCRIPTION",
                                    e.target.value
                                  )
                                }
                                className="form-control form-control-sm"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TabPane>
                    <TabPane tabId="2">
                      <Card body>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                value={this.state.validation.isRequired}
                                onChange={(e) =>
                                  this.changeValue(
                                    "IS_REQUIRED",
                                    e.target.checked
                                  )
                                }
                                className=""
                                type={"Checkbox"}
                                id="isRequired"
                              />
                              <label
                                htmlFor={"isRequired"}
                                style={{ verticalAlign: "middle" }}
                              >
                                {" "}
                                &nbsp;{" "}
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_validacion_requerido"
                                )}
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                value={this.state.validation.isReadOnly}
                                onChange={(e) =>
                                  this.changeValue(
                                    "IS_READONLY",
                                    e.target.checked
                                  )
                                }
                                type={"Checkbox"}
                                className=""
                                id="isReadOnly"
                              />
                              <label
                                htmlFor="isReadOnly"
                                style={{ verticalAlign: "middle" }}
                              >
                                &nbsp;{" "}
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_validacion_lectura"
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="">
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_validacion_maximo"
                                )}{" "}
                              </label>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={this.state.validation.max}
                                onChange={(e) =>
                                  this.changeValue("MAX", e.target.value)
                                }
                                placeholder={"20"}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="title">
                                {t(
                                  "app_metadatos_crear_metadato_entrada_texto_validacion_minimo"
                                )}{" "}
                              </label>
                              <input
                                type="number"
                                onChange={(e) =>
                                  this.changeValue("MIN", e.target.value)
                                }
                                value={this.state.validation.min}
                                placeholder="6"
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TabPane>
                  </TabContent>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <CustomInput
                          defaultValue={!this.state.active}
                          defaultChecked
                          type="checkbox"
                          id={"activeInput"}
                          label={`${t(
                            "app_metadatos_crear_metadato_bolsa_metadatos_status"
                          )}`}
                          onChange={(e) => {
                            this.setState({
                              active: e.target.checked,
                            });
                          }}
                        ></CustomInput>
                        <br />
                        <CustomInput
                          value={this.state.formula}
                          type={"checkbox"}
                          label={`${t(
                            "app_metadatos_crear_metadato_bolsa_metadatos_status_formula"
                          )}`}
                          id={"formula"}
                          onChange={(e) => {
                            this.setState({ formula: e.target.checked });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardBody>
              <CardFooter>
                <div className="pull-right">
                  <button
                    className="btn btn-secondary btn-sm "
                    type="button"
                    onClick={this.openModalPreview}
                  >
                    <i className="fa fa-eye" />{" "}
                    {t(
                      "app_metadatos_crear_metadato_bolsa_metadatos_btn_preview"
                    )}
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-secondary btn-sm "
                    type="button"
                    onClick={(e) => {
                      this.CreateMetadate(e);
                    }}
                    disabled={this.state.spinner}
                  >
                    {this.state.spinner ? (
                      <i className=" fa fa-spinner fa-refresh" />
                    ) : (
                      <div>
                        {" "}
                        <i className="fa fa-save" />{" "}
                        {t(
                          "app_metadatos_crear_metadato_bolsa_metadatos_btn_guardar"
                        )}{" "}
                      </div>
                    )}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        <ModalPreview
          ref={(m) => (this.myModal = m)}
          modalpreview={this.state.modalpreview}
          inputType={this.state.dragType}
          field={this.props.field}
          // field={this.state.previewInfoField}
          t={this.state.t}
        />
      </div>
    );
  }
}

export default SingleField;
