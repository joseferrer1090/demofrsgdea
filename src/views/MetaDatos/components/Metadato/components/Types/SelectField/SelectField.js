import React, { Component } from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  Toast,
  ToastBody,
  ToastHeader,
  CustomInput,
  Alert
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "../../ModalPreview";
import { decode } from "jsonwebtoken";
import { METADATA_CREATE } from "../../../../../../../services/EndPoints";
import * as Yup from "yup";

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "SELECT",
      toolType: "SELECT_FIELD",
      title: "",
      name: "",
      multiple: false,
      defaultValue: "",
      placeholder: "",
      description: "",
      validation: {
        isReadOnly: false,
        isRequired: false
        // min: 6,
        // max: 6
      },
      formula: false,
      active: true,
      options: [],
      duplicate: false,
      activeTab: "1",
      modalpreview: false,
      dragType: "",
      helpertext: "",
      auth: "",
      alert200: false,
      alert500: false,
      alert400: false,
      alertError: false,
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
  }

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "DESCRIPTION":
        this.setState({ description: value });
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
      case "DEFAULT_VALUE":
        this.setState({ defaultValue: value });
        break;
      case "IS_REQUIRED":
        this.setState({
          validation: { ...this.state.validation, isRequired: value }
        });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value }
        });
        break;
      case "MIN":
        this.setState({ validation: { ...this.state.validation, min: value } });
        break;
      case "MAX":
        this.setState({ validation: { ...this.state.validation, max: value } });
        break;
      case "MULTIPLE":
        this.setState({ multiple: value });
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

  changeOptionValue = (index, value, state) => {
    let options = this.state.options;
    let option = {};
    if (state === "TITLE") {
      option = {
        ...options[index],
        title: value
      };
    } else if (state === "SELECTED") {
      option = {
        ...options[index],
        selected: !options[index].selected
      };
    } else if (state === "VALUE") {
      option = {
        ...options[index],
        value: value
      };
    } else if (state === "DEFAULT_VALUE") {
      option = {
        ...options[index],
        defaultValue: value
      };
    } else {
      option = {
        ...options[index]
      };
    }
    options[index] = option;
    this.setState({
      options: options
    });
    this.duplicate();
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  duplicate = () => {
    let options = this.state.options;
    let u = _.uniqBy(options, "value");
    if (!_.isEqual(options, u)) {
      this.setState({
        duplicate: true
      });
    } else {
      this.setState({
        duplicate: false
      });
    }
  };

  addOption = () => {
    let option = {
      title: "",
      value: "",
      selected: false
    };
    let options = this.state.options;
    options.push(option);
    this.setState({
      options: options
    });
    this.duplicate();
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  removeOption = index => {
    let options = this.state.options;
    options.splice(index, 1);
    this.setState({
      options: options
    });
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  sendData = () => {
    const aux = this.state.auth;
    const user = decode(aux);

    fetch(`${METADATA_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux
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
        details: [
          {
            labelText: this.state.options[0].title,
            inputValue: this.state.options[0].value
          }
        ]
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
      .catch(err => {
        this.setState({
          alert500: true
        });
        setTimeout(() => {
          this.setState({ alert500: false });
        }, 1500);
      });
    this.resetForm();
  };

  createMetada = e => {
    e.preventDefault();
    Yup.setLocale({});
    const schema = Yup.object().shape({
      name: Yup.string().required(" Por favor introduzca un nombre."),
      options: Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required(" Por favor introduzca la etiqueta."),
            value: Yup.string().required(" Por favor introduzca el valor."),
            selected: Yup.bool()
          })
        )
        .required("Por favor agregue las opciones."),
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
        options: this.state.options,
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
        console.log(err.message);
      });
  };

  openModalPreview = () => {
    this.myModal.toggle();
  };

  resetForm = () => {
    this.setState({
      name: "",
      description: "",
      title: "",
      helpertext: "",
      formula: false,
      active: true,
      multiple: false,
      validation: {
        isReadOnly: false,
        isRequired: false
      },
      options: []
    });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className="fa fa-caret-square-o-down" /> Selección multiple{" "}
            {this.state.title}
            <span
              className="pull-right"
              onClick={() => this.props.removeField(this.props.index)}
            >
              <i className="fa fa-times" style={{ color: "red" }} />
            </span>
          </CardHeader>
          <CardBody>
            <Alert color={"danger"} isOpen={this.state.alertError}>
              <i className="fa fa-exclamation-triangle"></i>{" "}
              {this.state.alertErrorMessage}
            </Alert>
            <Toast isOpen={this.state.alert200}>
              <ToastHeader icon={"success"}>
                {" "}
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
                  Error, al enviar los dato del formulario
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
                  Error, al enviar los datos al servidor
                </p>
              </ToastBody>
            </Toast>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => this.toggle("1")}
                >
                  <i className="fa fa-cog" />
                  &nbsp; General
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => this.toggle("2")}
                >
                  <i className="fa fa-exclamation-triangle" />
                  &nbsp; Validación
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => this.toggle("3")}
                >
                  <i className="fa fa-list-ul" />
                  &nbsp; Valores <span className="text-danger">*</span>{" "}
                </NavLink>
              </NavItem>
            </Nav>
            <form className="form" ref={el => (this.myFormSelect = el)}>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={"1"}>
                  <Card body>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="name">
                            Nombre <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            placeholder={"Nombre"}
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
                            Etiqueta <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            placeholder={"Etiqueta"}
                            type="text"
                            className="form-control form-control-sm"
                            onChange={e =>
                              this.changeValue("TITLE", e.target.value)
                            }
                            value={this.state.title}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="helpertext">Texto de ayuda </label>
                          <input
                            placeholder={"Texto de ayuda"}
                            type="text"
                            className="form-control form-control-sm"
                            onChange={e =>
                              this.changeValue("HELPER_TEXT", e.target.value)
                            }
                            value={this.state.helpertext}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="description">
                            Descripción <span className="text-danger">*</span>{" "}
                          </label>
                          <textarea
                            id="description"
                            className="form-control form-control-sm"
                            value={this.state.description}
                            onChange={e =>
                              this.changeValue("DESCRIPTION", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabPane>
                <TabPane tabId={"2"}>
                  <Card body>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type={"checkbox"}
                              value={this.state.validation.isRequired}
                              id="isRequired"
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
                              ¿Es requerido?{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              id="isReadOnly"
                              type={"checkbox"}
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
                              ¿Solo lectura?{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id={"multiple"}
                              value={this.state.multiple}
                              onChange={e =>
                                this.changeValue("MULTIPLE", e.target.checked)
                              }
                            />
                            &nbsp;
                            <label
                              className=""
                              htmlFor="multiple"
                              style={{ verticalAlign: "middle" }}
                            >
                              ¿Seleccion multiple?
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabPane>
                <TabPane tabId={"3"}>
                  <Card body>
                    <p
                      hidden={!this.state.duplicate}
                      className="alert text-center alert-danger"
                    >
                      <i className="fa fa-exclamation-triangle" /> &nbsp;{" "}
                      <strong>Valores duplicados</strong>
                    </p>
                    {this.state.options ? (
                      <table className="table text-center">
                        <tbody>
                          {this.state.options.map((option, index) => {
                            return (
                              <tr key={index}>
                                {this.state.multiple ? (
                                  <td style={{ verticalAlign: "middle" }}>
                                    <div className="">
                                      {
                                        <input
                                          value={
                                            this.state.options[index].selected
                                          }
                                          onChange={e =>
                                            this.changeOptionValue(
                                              index,
                                              e.target.checked,
                                              "SELECTED"
                                            )
                                          }
                                          type="checkbox"
                                        />
                                      }
                                    </div>
                                  </td>
                                ) : (
                                  <td hidden={true}></td>
                                )}
                                <td>
                                  <input
                                    placeholder="Etiqueta"
                                    autoFocus={true}
                                    value={this.state.options[index].title}
                                    onChange={e =>
                                      this.changeOptionValue(
                                        index,
                                        e.target.value,
                                        "TITLE"
                                      )
                                    }
                                    id={option.title}
                                    type="text"
                                    className="form-control form-control-sm"
                                  />
                                </td>
                                <td>
                                  <input
                                    placeholder="Valor"
                                    value={this.state.options[index].value}
                                    onChange={e =>
                                      this.changeOptionValue(
                                        index,
                                        e.target.value,
                                        "VALUE"
                                      )
                                    }
                                    id={option.value}
                                    type="text"
                                    className="form-control form-control-sm"
                                  />
                                </td>
                                {!this.state.multiple ? (
                                  <td style={{ verticalAlign: "middle" }}>
                                    <input
                                      name="default"
                                      value={this.state.defaultValue}
                                      onChange={e =>
                                        this.changeOptionValue(
                                          index,
                                          e.target.checked,
                                          "DEFAULT_VALUE"
                                        )
                                      }
                                      id={option.value}
                                      type="checkbox"
                                    />
                                  </td>
                                ) : (
                                  <td hidden={true}></td>
                                )}
                                <td style={{ verticalAlign: "middle" }}>
                                  <span
                                    onClick={() => this.removeOption(index)}
                                    className="cross pull-right"
                                  >
                                    <i
                                      className="fa fa-times"
                                      style={{ color: "red" }}
                                    />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <span></span>
                    )}
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => this.addOption()}
                    >
                      {" "}
                      <i className="fa fa-plus" /> Agregar opciones
                    </button>
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
                      type={"checkbox"}
                      id={"active"}
                      label={
                        "Si esta opción se encuentra activada, representa que el metadato es visible el la bolsa de metadatos y se podrá realizar la asiganción en la plantilla correspondiente."
                      }
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
                      id={"formula"}
                      type={"checkbox"}
                      label={
                        "Si esta opción se encuentra activada, representa que el metadato es visible el la bolsa de metadatos y se podrá realizar la asiganción a una formula."
                      }
                      onChange={e => {
                        this.setState({
                          formula: e.target.checked
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
                <i className="fa fa-eye" /> Vista previa
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={e => {
                  this.createMetada(e);
                }}
              >
                {" "}
                <i className="fa fa-save" /> Guardar metadato{" "}
              </button>
            </div>
          </CardFooter>
        </Card>
        <ModalPreview
          ref={el => (this.myModal = el)}
          modalpreview={this.state.modalpreview}
          inputType={this.props.field.toolType}
          field={this.props.field}
        />
      </div>
    );
  }
}
SelectField.propTypes = {
  changeState: PropTypes.func.isRequired,
  field: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  key: PropTypes.any.isRequired,
  removeField: PropTypes.func.isRequired,
  authorization: PropTypes.string.isRequired
};
export default SelectField;
