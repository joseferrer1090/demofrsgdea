import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  Toast,
  ToastHeader,
  ToastBody,
  CustomInput,
  Alert
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "../../ModalPreview";
import { METADATA_CREATE } from "../../../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class Paragraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolType: "PARAGRAPH",
      title: "",
      name: "",
      type: "",
      content: "",
      colorText: "#000000",
      background: "#cccccc",
      color: "",
      fontSize: 10,
      align: "center",
      validation: {
        isReadOnly: false,
        isRequired: false
      },
      description: "",
      disabled: false,
      activeTab: "1",
      modalpreview: false,
      auth: "",
      alert200: false,
      alert400: false,
      alert500: false,
      active: true,
      formula: false,
      alertError: false,
      t: this.props.t,
      alertErrorMessage: ""
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
    this.setState(this.props.field);
    console.log(this.props.field);
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "TITLE":
        this.setState({ title: value });
        break;
      case "CONTENT":
        this.setState({ content: value });
        break;
      case "TEXT_COLOR":
        this.setState({ colorText: value });
        break;
      case "BACKGROUND_COLOR":
        this.setState({ background: value });
        break;
      case "FONT_SIZE":
        this.setState({ fontSize: value });
        break;
      case "TEXT_ALIGN":
        this.setState({ align: value });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value }
        });
        break;
      case "IS_REQUIRED":
        this.setState({
          validation: {
            ...this.state.validation,
            isRequired: value
          }
        });
        break;
      case "IS_DISABLED":
        this.setState({ disabled: value });
        break;
      case "DESCRIPTION":
        this.setState({ description: value });
        break;

      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  fontSizes = () => {
    let sizes = [];
    for (let i = 6; i <= 72; i++) {
      sizes.push(i);
    }
    return sizes;
  };

  resetForm = () => {
    this.setState({
      name: "",
      description: "",
      content: "",
      toolType: "PARAGRAPH",
      title: "Title",
      validation: {
        isReadOnly: false,
        isRequired: false
      },
      align: "center",
      fontSize: "",
      colorText: "",
      background: ""
    });
    this.changeValue("TITLE", this.state.title);
  };

  sendData = () => {
    const aux = this.state.auth;
    const user = decode(aux);
    fetch(`${METADATA_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + aux
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        labelText: this.state.title,
        labelClass: "col-sm-2 col-form-label",
        inputId: this.state.name,
        inputType: this.state.type,
        inputClass: "form-control form-control-sm",
        inputPlaceholder: this.state.content,
        formula: this.state.formula,
        status: this.state.active,
        userName: user.user_name
      })
    })
      .then(resp => {
        if (resp.status === 201) {
          this.setState({
            alert200: true
          });

          setTimeout(() => {
            this.setState({
              alert200: false
            });
          }, 1500);
        } else if (resp.status === 400) {
          this.setState({
            alert400: true
          });
          setTimeout(() => {
            this.setState({
              alert400: false
            });
          }, 1500);
        } else if (resp.status === 500) {
          this.setState({
            alert500: true
          });
          setTimeout(() => {
            this.setState({
              alert500: false
            });
          }, 1500);
        }
      })
      .catch(error => {
        this.setState({
          alertError: true,
          alertErrorMessage: error.message
        });
        setTimeout(() => {
          this.setState({
            alertError: false
          });
        }, 1500);
      });
    this.resetForm();
  };

  createMatadata = e => {
    e.preventDefault();
    Yup.setLocale({});
    const schema = Yup.object().shape({
      name: Yup.string().required(" Por favor introduzca un nombre."),
      active: Yup.bool().test(
        "Activo",
        " Es necesario activar el metadato.",
        value => value === true
      ),
      description: Yup.string().required(
        " Por favor introduzca una descripción."
      ),
      title: Yup.string().required(" Por favor introduzca la etiqueta.")
    });
    schema
      .validate({
        name: this.state.name,
        active: this.state.active,
        description: this.state.description,
        title: this.state.title
      })
      .then(() => {
        this.sendData();
      })
      .catch(err => {
        this.setState({
          alertError: true,
          alertErrorMessage: err.message
        });
        setTimeout(() => {
          this.setState({
            alertError: false
          });
        }, 1500);
        console.log(err);
      });
  };

  openModalPreview = () => {
    this.MyModal.toggle();
  };

  render() {
    const { t } = this.state;
    return (
      <div>
        <Card clolor={"secondary"}>
          <CardHeader>
            <i className="fa fa-paragraph" />{" "}
            {t("app_metadatos_crear_metadato_entrada_parrafo_title")}{" "}
            {this.state.title}
            <span
              className="pull-right cross"
              onClick={() => this.props.removeField(this.props.indes)}
            >
              {" "}
              <i className="fa fa-times" style={{ color: "red" }} />{" "}
            </span>
          </CardHeader>
          <CardBody>
            <Alert isOpen={this.state.alertError} color={"danger"}>
              <i className="fa fa-exclamation-triangle" />{" "}
              {this.state.alertErrorMessage}
            </Alert>
            <Toast isOpen={this.state.alert200}>
              <ToastHeader icon={"success"}>
                SGDEA - Modulo de configuración
              </ToastHeader>
              <ToastBody>
                <p className="text-justify">
                  {" "}
                  Se registro el metadato de manera correcta{" "}
                </p>
              </ToastBody>
            </Toast>
            <Toast isOpen={this.state.alert400}>
              <ToastHeader icon={"danger"}>
                {" "}
                SGDEA - Modulo de configuración{" "}
              </ToastHeader>
              <ToastBody>
                <p className="text-justify">
                  {" "}
                  Se enviaron mal los dato al servidor{" "}
                </p>
              </ToastBody>
            </Toast>
            <Toast isOpen={this.state.alert500}>
              <ToastHeader icon={"danger"}>
                {" "}
                SGDEA - Modulo de configuración{" "}
              </ToastHeader>
              <ToastBody>
                <p className="text-justify"> Error, interno el el servidor </p>
              </ToastBody>
            </Toast>
            <form ref={el => (this.MyForm = el)} className="form"></form>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  <i className="fa fa-cog" />
                  &nbsp;{" "}
                  {t(
                    "app_metadatos_crear_metadato_entrada_parrafo_tab_general"
                  )}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  {" "}
                  <i className="fa fa-exclamation-triangle" />
                  &nbsp;{" "}
                  {t(
                    "app_metadatos_crear_metadato_entrada_parrafo_tab_validacion"
                  )}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  <i className="fa fa-pencil" />
                  &nbsp;{" "}
                  {t(
                    "app_metadatos_crear_metadato_entrada_parrafo_tab_estilos"
                  )}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={"1"}>
                <Card body>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">
                          {t(
                            "app_metadatos_crear_metadato_entrada_parrafo_nombre"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          placeholder={`${t(
                            "app_metadatos_crear_metadato_entrada_parrafo_nombre_placeholder"
                          )}`}
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.name}
                          onChange={e =>
                            this.changeValue("NAME", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="title">
                          {t(
                            "app_metadatos_crear_metadato_entrada_parrafo_label"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          placeholder={`${t(
                            "app_metadatos_crear_metadato_entrada_parrafo_label_placeholder"
                          )}`}
                          type="text"
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("TITLE", e.target.value)
                          }
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="paragraph">
                          {t(
                            "app_metadatos_crear_metadato_entrada_parrafo_parrafo"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          placeholder={`${t(
                            "app_metadatos_crear_metadato_entrada_parrafo_parrafo_placeholder"
                          )}`}
                          type="text"
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("CONTENT", e.target.value)
                          }
                          value={this.state.content}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-grouop">
                        <label>
                          {t(
                            "app_metadatos_crear_metadato_entrada_parrafo_descripcion"
                          )}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          type="text"
                          className="form-control form-control-sm"
                          onChange={e => {
                            this.changeValue("DESCRIPTION", e.target.value);
                          }}
                          value={this.state.description}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"2"}>
                <div className="row">
                  <div className="col-md-12">
                    <Card body>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="isRequired"
                              value={this.state.validation.isRequired}
                              onChange={e =>
                                this.changeValue(
                                  "IS_REQUIRED",
                                  e.target.checked
                                )
                              }
                            />
                            &nbsp;
                            <label
                              htmlFor="isRequired"
                              style={{ verticalAlign: "middle" }}
                            >
                              {" "}
                              {t(
                                "app_metadatos_crear_metadato_entrada_parrafo_validacion_requerido"
                              )}{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="isReadOnly"
                              value={this.state.validation.isReadOnly}
                              onChange={e =>
                                this.changeValue(
                                  "IS_READONLY",
                                  e.target.checked
                                )
                              }
                            />
                            &nbsp;
                            <label
                              htmlFor="isReadOnly"
                              style={{ verticalAlign: "middle" }}
                            >
                              {" "}
                              {t(
                                "app_metadatos_crear_metadato_entrada_parrafo_validacion_lectura"
                              )}{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="disabled"
                              value={this.state.disabled}
                              onChange={e =>
                                this.changeValue(
                                  "IS_DISABLED",
                                  e.target.checked
                                )
                              }
                            />
                            &nbsp;
                            <label
                              htmlFor="disabled"
                              style={{ verticalAlign: "middle" }}
                            >
                              {" "}
                              {t(
                                "app_metadatos_crear_metadato_entrada_parrafo_validacion_deshabilitado"
                              )}{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId={"3"}>
                <Card body>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="Color">
                          {t(
                            "app_metadatos_crear_metadato_entrada_parrafo_estilos_textColor"
                          )}
                        </label>
                        <input
                          value={this.state.colorText}
                          onChange={e =>
                            this.changeValue("TEXT_COLOR", e.target.value)
                          }
                          className={"form-control form-control-sm"}
                          type="color"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="BackgroundColor">
                          {" "}
                          {t(
                            "app_metadatos_crear_metadato_entrada_parrafo_estilos_backgroundColor"
                          )}
                        </label>
                        <input
                          value={this.state.background}
                          onChange={e =>
                            this.changeValue("BACKGROUND_COLOR", e.target.value)
                          }
                          className="form-control form-control-sm"
                          type="color"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="Color">
                          {t(
                            "app_metadatos_crear_metadato_entrada_parrafo_estilos_alingText"
                          )}
                        </label>
                        <select
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("TEXT_ALIGN", e.target.value)
                          }
                          value={this.state.align}
                        >
                          <option value="center">
                            {t(
                              "app_metadatos_crear_metadato_entrada_parrafo_estilos_alingText_centro"
                            )}
                          </option>
                          <option value="left">
                            {t(
                              "app_metadatos_crear_metadato_entrada_parrafo_estilos_alingText_izquierda"
                            )}
                          </option>
                          <option value="right">
                            {t(
                              "app_metadatos_crear_metadato_entrada_parrafo_estilos_alingText_derecha"
                            )}
                          </option>
                          <option value="justify">
                            {t(
                              "app_metadatos_crear_metadato_entrada_parrafo_estilos_alingText_justificado"
                            )}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="Color">
                        {" "}
                        {t(
                          "app_metadatos_crear_metadato_entrada_parrafo_estilos_sizeFont"
                        )}{" "}
                      </label>
                      <select
                        className="form-control form-control-sm"
                        value={this.state.fontSize}
                        onChange={e =>
                          this.changeValue("FONT_SIZE", e.target.value)
                        }
                      >
                        {this.fontSizes().map(size => {
                          return (
                            <option key={size} value={size}>
                              {size} pt
                            </option>
                          );
                        })}
                      </select>
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
                    defaultValue={this.state.active}
                    defaultChecked
                    type={"checkbox"}
                    id={"activeInput"}
                    label={t(
                      "app_metadatos_crear_metadato_bolsa_metadatos_status"
                    )}
                    onChange={e => {
                      this.setState({
                        active: e.target.checked
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <CustomInput
                    value={this.state.formula}
                    type="checkbox"
                    id="formula"
                    label={t(
                      "app_metadatos_crear_metadato_bolsa_metadatos_status_formula"
                    )}
                    onChange={e => {
                      this.setState({
                        formula: e.target.checked
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <div className="pull-right">
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={() => {
                  this.openModalPreview();
                }}
              >
                <i className="fa fa-eye" />{" "}
                {t("app_metadatos_crear_metadato_bolsa_metadatos_btn_preview")}
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={e => {
                  this.createMatadata(e);
                }}
              >
                <i className="fa fa-save" />{" "}
                {t("app_metadatos_crear_metadato_bolsa_metadatos_btn_guardar")}
              </button>
            </div>
          </CardFooter>
        </Card>
        <ModalPreview
          modalpreview={this.state.modalpreview}
          ref={el => (this.MyModal = el)}
          field={this.props.field}
          inputType={this.props.dragType}
          t={this.state.t}
        />
      </div>
    );
  }
}
Paragraph.propsTypes = {
  changeState: PropTypes.func.isRequired,
  field: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  key: PropTypes.any.isRequired,
  removeField: PropTypes.func.isRequired,
  authorization: PropTypes.string.isRequired
};
export default Paragraph;
