import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  Toast,
  ToastBody,
  ToastHeader,
  CustomInput,
  Alert,
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "../../ModalPreview";
import { decode } from "jsonwebtoken";
import { METADATA_CREATE } from "../../../../../../../services/EndPoints";
import * as Yup from "yup";

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "date",
      name: "",
      toolType: "DATE_FIELD",
      defaultValue: "",
      placoholder: "",
      description: "",
      validation: {
        isRequired: false,
        isReadOnly: false,
        min: "",
        max: "",
      },
      activeTab: "1",
      modalpreview: false,
      auth: "",
      alert200: false,
      alert400: false,
      alert500: false,
      active: true,
      formula: false,
      alertError: false,
      alertErrorMessage: "",
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
    console.log(this.props.field);
  }

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "TITLE":
        this.setState({ title: value });
        break;
      case "TYPE":
        this.setState({ type: value });
        break;
      case "PLACEHOLDER":
        this.setState({ placoholder: value });
        break;
      case "DESCRIPTION":
        this.setState({ description: value });
        break;
      case "DEFAULT_VALUE":
        this.setState({ defaultValue: value });
        break;
      case "IS_REQUIRED":
        this.setState({
          validation: {
            ...this.state.validation,
            isRequired: value,
          },
        });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value },
        });
        break;
      case "MAX":
        this.setState({
          validation: { ...this.state.validation, max: value },
        });
        break;
      case "MIN":
        this.setState({ validation: { ...this.state.validation, min: value } });
        break;

      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.field);
    }, 0);
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  sendData = () => {
    this.setState({
      spinner: true,
    });
    const aux = this.state.auth;
    const user = decode(aux);
    fetch(`${METADATA_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + aux,
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        labelText: this.state.title,
        labelClass: "col-sm-2 col-form-label",
        inputId: this.state.name,
        inputType: this.state.type,
        inputClass: "form-control form-control-sm",
        inputPlaceholder: "",
        formula: this.state.formula,
        status: this.state.active,
        userName: user.user_name,
      }),
    })
      .then((resp) => {
        if (resp.status === 201) {
          this.setState({
            alert200: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert200: false,
            });
          }, 1500);
        } else if (resp.status === 400) {
          this.setState({
            alert400: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert400: false,
            });
          }, 1500);
        } else if (resp.status === 500) {
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
        this.setState({
          spinner: false,
          alertError: true,
          alertErrorMessage: error.message,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1500);
      });
    this.resetForm();
  };

  createMetadata = (e) => {
    e.preventDefault();
    Yup.setLocale({});

    const schema = Yup.object().shape({
      name: Yup.string().required(" Por favor introduzca un nombre."),
      active: Yup.bool().test(
        "Activo",
        " Es necesario activar el metadato.",
        (value) => value === true
      ),
      min: Yup.date(new Date()),
      max: Yup.date(new Date()),
      description: Yup.string().required(
        " Por favor introduzca una descripción."
      ),
      title: Yup.string().required(" Por favor introduzca la etiqueta."),
    });

    schema
      .validate({
        name: this.state.name,
        active: this.state.active,
        min: this.state.validation.min,
        max: this.state.validation.max,
        description: this.state.description,
        title: this.state.title,
      })
      .then(() => {
        this.sendData();
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

  openModalPreview = () => {
    this.MyModal.toggle();
  };

  resetForm = () => {
    this.setState({
      type: "date",
      name: "",
      title: "Title",
      description: "",
      validation: {
        isRequired: false,
        isReadOnly: false,
        min: "",
        max: "",
      },
    });
    this.changeValue("TITLE", this.state.title);
  };

  render() {
    const { t } = this.state;
    return (
      <div>
        <Card outline color={"secondary"}>
          <CardHeader>
            <i className="fa fa-calendar" />{" "}
            {t("app_metadatos_crear_metadato_entrada_fecha_title")}{" "}
            {this.state.title}
            <span
              className="pull-right"
              onClick={() => this.props.removeField(this.props.index)}
            >
              {" "}
              <i className="fa fa-times" style={{ color: "red" }} />{" "}
            </span>
          </CardHeader>
          <CardBody>
            <form ref={(el) => (this.MyForm = el)} className="form">
              <Alert color={"danger"} isOpen={this.state.alertError}>
                <i className="fa fa-exclamation-triangle" />
                {this.state.alertErrorMessage}
              </Alert>
              <Toast isOpen={this.state.alert200}>
                <ToastHeader icon={"success"}>
                  SGDEA - Modulo de configuración{" "}
                </ToastHeader>
                <ToastBody>
                  <p className="text-justify">
                    {" "}
                    Se creo el metadato de manera correcta{" "}
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
                    Error, se enviaron mal los datos al servidor{" "}
                  </p>
                </ToastBody>
              </Toast>
              <Toast isOpen={this.state.alert500}>
                <ToastHeader icon={"danger"}>
                  {" "}
                  SGDEA - Modulo de configuración{" "}
                </ToastHeader>
                <ToastBody>
                  <p className="text-justify"> Error, en el servidor </p>
                </ToastBody>
              </Toast>
              <Nav tabs>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1",
                  })}
                  onClick={() => this.toggle("1")}
                >
                  <i className="fa fa-cog" />
                  &nbsp;{" "}
                  {t("app_metadatos_crear_metadato_entrada_fecha_tab_general")}
                </NavLink>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2",
                  })}
                  onClick={() => this.toggle("2")}
                >
                  <i className="fa fa-exclamation-triangle" />
                  &nbsp;{" "}
                  {t(
                    "app_metadatos_crear_metadato_entrada_fecha_tab_validacion"
                  )}
                </NavLink>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={"1"}>
                  <Card body>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          {" "}
                          <label htmlFor="name">
                            {t(
                              "app_metadatos_crear_metadato_entrada_fecha_nombre"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.name}
                            onChange={(e) =>
                              this.changeValue("NAME", e.target.value)
                            }
                            placeholder={`${t(
                              "app_metadatos_crear_metadato_entrada_fecha_nombre_placeholder"
                            )}`}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="">
                            {t(
                              "app_metadatos_crear_metadato_entrada_fecha_label"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.title}
                            onChange={(e) =>
                              this.changeValue("TITLE", e.target.value)
                            }
                            placeholder={`${t(
                              "app_metadatos_crear_metadato_entrada_fecha_label_placeholder"
                            )}`}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="description">
                            {" "}
                            {t(
                              "app_metadatos_crear_metadato_entrada_fecha_descripcion"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <textarea
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.description}
                            onChange={(e) => {
                              this.changeValue("DESCRIPTION", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabPane>
                <TabPane tabId={"2"}>
                  <Card body>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            value={this.state.validation.isRequired}
                            onChange={(e) =>
                              this.changeValue("IS_REQUIRED", e.target.checked)
                            }
                            id={"isRequired"}
                          />
                          &nbsp;
                          <label
                            htmlFor="isRequired"
                            style={{ verticalAlign: "middle" }}
                          >
                            {" "}
                            {t(
                              "app_metadatos_crear_metadato_entrada_fecha_validacion_requerido"
                            )}{" "}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type={"checkbox"}
                            value={this.state.validation.isReadOnly}
                            onChange={(e) =>
                              this.changeValue("IS_READONLY", e.target.checked)
                            }
                            id="isReadOnly"
                          />
                          &nbsp;
                          <label
                            htmlFor="isReadOnly"
                            style={{ verticalAlign: "middle" }}
                          >
                            {" "}
                            {t(
                              "app_metadatos_crear_metadato_entrada_fecha_validacion_lectura"
                            )}{" "}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_metadatos_crear_metadato_entrada_fecha_validacion_minimo"
                            )}
                          </label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            value={this.state.validation.min}
                            onChange={(e) =>
                              this.changeValue("MIN", e.target.value)
                            }
                            patter={"yyyy/mm/dd"}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_metadatos_crear_metadato_entrada_fecha_validacion_maximo"
                            )}
                          </label>
                          <input
                            type={"date"}
                            className={"form-control form-control-sm"}
                            onChange={(e) =>
                              this.changeValue("MAX", e.target.value)
                            }
                            value={this.state.validation.max}
                            patter={"yyyy/mm/dd"}
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
                      defaultValue={this.state.active}
                      defaultChecked
                      type={"checkbox"}
                      id={"activeInput"}
                      label={`${t(
                        "app_metadatos_crear_metadato_bolsa_metadatos_status"
                      )}`}
                      onChange={(e) => {
                        this.setState({
                          active: e.target.checked,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <CustomInput
                      type={"checkbox"}
                      value={this.state.formula}
                      id="formula"
                      label={t(
                        "app_metadatos_crear_metadato_bolsa_metadatos_status_formula"
                      )}
                      onChange={(e) => {
                        this.setState({
                          formula: e.target.checked,
                        });
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
                type="button"
                className="btn btn-secondary btn-sm"
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
                onClick={(e) => this.createMetadata(e)}
                disabled={this.state.spinner}
              >
                {this.state.spinner ? (
                  <i className=" fa fa-spinner fa-refresh" />
                ) : (
                  <div>
                    {" "}
                    <i className="fa fa-save" />
                    {t(
                      "app_metadatos_crear_metadato_bolsa_metadatos_btn_guardar"
                    )}{" "}
                  </div>
                )}
              </button>
            </div>
          </CardFooter>
        </Card>
        <ModalPreview
          ref={(el) => (this.MyModal = el)}
          modalpreview={this.state.modalpreview}
          field={this.props.field}
          inputType={this.props.dragType}
          t={this.state.t}
        />
      </div>
    );
  }
}
DateField.propTypes = {
  changeState: PropTypes.func.isRequired,
  field: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  key: PropTypes.any.isRequired,
  removeField: PropTypes.func.isRequired,
  authorization: PropTypes.string.isRequired,
};
export default DateField;
