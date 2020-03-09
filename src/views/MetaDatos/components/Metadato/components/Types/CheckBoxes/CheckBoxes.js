import React, { Component } from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  Toast,
  ToastHeader,
  ToastBody,
  CustomInput,
  Alert
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "../../ModalPreview";
import { decode } from "jsonwebtoken";
import { METADATA_CREATE } from "../../../../../../../services/EndPoints";
import * as Yup from "yup";

class CheckBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      inline: false,
      toolType: "CHECK_BOXES",
      title: "",
      name: "",
      type: "checkbox",
      defaultValue: "",
      description: "",
      validation: {
        isReadOnly: false,
        isRequired: false,
        min: 6,
        max: 6
      },
      active: true,
      formula: false,
      duplicate: false,
      checkBoxes: [],
      modalpreview: false,
      dragType: this.props.dragType,
      auth: "",
      alert200: false,
      alert400: false,
      alert500: false,
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
    console.log(this.props.field);
    //console.log(this.state.auth);
  }

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "DESCRIPTION":
        this.setState({
          description: value
        });
        break;
      case "TITLE":
        this.setState({
          title: value
        });
        break;
      case "DEFAULT_VALUE":
        this.setState({
          defaultValue: value
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
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value }
        });
        break;
      case "MIN":
        this.setState({
          validation: { ...this.state.validation, min: value }
        });
        break;
      case "MAX":
        this.setState({ validation: { ...this.state.validation, max: value } });
        break;
      case "INLINE":
        this.setState({
          inline: value
        });
        break;

      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  removeOption = index => {
    let checboxes = this.state.checkBoxes;
    checboxes.splice(index, 1);
    this.setState({
      checkBoxes: checboxes
    });
    this.duplicate();
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  duplicate = () => {
    let checboxes = this.state.checkBoxes;
    let u = _.uniqBy(checboxes, "value");
    if (!_.isEqual(checboxes, u)) {
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
    let checkbox = {
      title: "",
      value: "",
      checked: false
    };
    let checboxes = this.state.checkBoxes;
    checboxes.push(checkbox);
    this.setState({
      checkBoxes: checboxes
    });
    this.duplicate();
    setTimeout(() => {
      // console.log(this.state, this.props.index);
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  changeOptionValue(index, value, state) {
    let checkBoxes = this.state.checkBoxes;
    let checkBox = {};
    if (state === "TITLE") {
      checkBox = {
        ...checkBoxes[index],
        title: value
      };
    } else if (state === "SELECTED") {
      checkBox = {
        ...checkBoxes[index],
        selected: checkBox[index].checked
      };
    } else if (state === "VALUE") {
      checkBox = {
        ...checkBoxes[index],
        value: value
      };
    } else {
      checkBox = {
        ...checkBoxes[index]
      };
    }
    checkBoxes[index] = checkBox;
    this.setState({
      checkBoxes: checkBoxes
    });
    this.duplicate();
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  }

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
        labelText: this.state.name,
        labelClass: "col-sm-2 col-form-label",
        inputId: this.state.name,
        inputType: this.state.type,
        inputClass: "form-control form-control-sm",
        inputPlacehoder: "Placehoolder",
        formula: this.state.formula,
        status: this.state.active,
        userName: user.user_name,
        details: this.state.checkBoxes
      })
    })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            alert200: true
          });
          setTimeout(() => {
            this.setState({
              alert200: false
            });
            this.resetForm();
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
  };

  createMetadata = e => {
    e.preventDefault();
    // van los valores de las validaciones
    Yup.setLocale({});
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      active: Yup.bool().test(value => value === true),
      checboxes: Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required(),
            value: Yup.string().required(),
            selected: Yup.bool()
          })
        )
        .required(),
      description: Yup.string().required()
    });
    schema
      .validate({
        name: this.state.name,
        active: this.state.active,
        checboxes: this.state.checkBoxes,
        description: this.state.description
      })
      .then(() => {
        this.sendData();
        console.log("Se enviaron bien los datos");
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
      });
  };

  OpenModalPreview = () => {
    this.myModal.toggle();
  };

  resetForm = () => {
    this.myForm.reset();
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className="fa fa-check-square mr-1"></i> Check Boxes{" "}
            {this.state.title}
            <span
              className="pull-right cross"
              onClick={() => this.props.removeField(this.props.index)}
            >
              <i className="fa fa-times" style={{ color: "red" }} />
            </span>
          </CardHeader>
          <CardBody>
            <Alert color="danger" isOpen={this.state.alertError}>
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
                  Se creo el metadato de manera correacta{" "}
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
                  Error, al enviar los datos del formulario{" "}
                </p>
              </ToastBody>
            </Toast>
            <Toast isOpen={this.state.alert500}>
              <ToastHeader icon={"danger"}>
                {" "}
                SGDEA - Modulo de configuración{" "}
              </ToastHeader>
              <ToastBody>
                <p className="text-justify">
                  {" "}
                  Error, problemas con el servidor{" "}
                </p>
              </ToastBody>
            </Toast>
            <form ref={el => (this.myForm = el)} className="form" role="form">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => this.toggle("1")}
                  >
                    General <i className="fa fa-cog" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => this.toggle("2")}
                  >
                    Validation <i className="fa fa-exclamation-triangle" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => this.toggle("3")}
                  >
                    Values <i className="fa fa-list-ul" />
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={"1"}>
                  <Card body>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="name">NAME</label>
                          <input
                            type={"text"}
                            className={"form-control form-control-sm"}
                            value={this.state.name}
                            onChange={e =>
                              this.changeValue("NAME", e.target.value)
                            }
                            placeholder={"nombre"}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.title}
                            onChange={e =>
                              this.changeValue("TITLE", e.target.value)
                            }
                            placeholder="Title"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="description"> Description </label>
                          <input
                            type="text"
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
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            value={this.state.validation.isRequired}
                            onChange={e =>
                              this.changeValue("IS_REQUIRED", e.target.checked)
                            }
                            id="isRequired"
                          />
                          <label htmlFor="isRequired"> ¿ Es requerido ? </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            id={"isReadOnly"}
                            type={"checkbox"}
                            onChange={e =>
                              this.changeValue("IS_READONLY", e.target.checked)
                            }
                            value={this.state.validation.isReadOnly}
                          />
                          <label htmlFor="isReadOnly"> ¿ Solo lectura ? </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            onChange={e =>
                              this.changeValue("INLINE", e.target.checked)
                            }
                            value={this.state.inline}
                            id={"inline"}
                          />
                          <label htmlFor="inline"> ¿ En linea ? </label>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Min</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("MIN", e.target.value)
                          }
                          placeholder="6"
                        />
                      </div>
                    </div> */}
                      {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>Max</label>
                        <input
                          type="numbre"
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("MAX", e.target.value)
                          }
                          value={this.state.validation.max}
                        />
                      </div>
                    </div> */}
                    </div>
                  </Card>
                </TabPane>
                <TabPane tabId={"3"}>
                  <Card body>
                    <p
                      hidden={!this.state.duplicate}
                      className="alert text-center alert-danger"
                    >
                      <strong>Valores </strong> Duplicados
                    </p>
                    {this.state.checkBoxes ? (
                      <table className="table text-center">
                        <tbody>
                          {this.state.checkBoxes.map((checkbox, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div>
                                    <input
                                      className="middle"
                                      type={"checkbox"}
                                      autoFocus={true}
                                      value={
                                        this.state.checkBoxes[index].selected
                                      }
                                      onChange={e =>
                                        this.changeOptionValue(
                                          index,
                                          e.target.checked,
                                          "SELECT"
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                                <td>
                                  <input
                                    id={checkbox.title}
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder={"Title"}
                                    autoFocus={true}
                                    value={this.state.checkBoxes[index].title}
                                    onChange={e =>
                                      this.changeOptionValue(
                                        index,
                                        e.target.value,
                                        "TITLE"
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    placeholder="Value"
                                    value={this.state.checkBoxes[index].value}
                                    onChange={e =>
                                      this.changeOptionValue(
                                        index,
                                        e.target.value,
                                        "VALUE"
                                      )
                                    }
                                    id={checkbox.value}
                                    type="text"
                                    className="form-control form-control-sm"
                                  />
                                </td>
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
                      <i className="fa fa-plus" /> Agregar Valores
                    </button>
                  </Card>
                </TabPane>
              </TabContent>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <CustomInput
                      type={"checkbox"}
                      defaultValue={this.state.active}
                      defaultChecked
                      id={"activeInput"}
                      label={
                        "Activar el metadato, para sea visible el la bolsa de metadatos y asignar en la plantilla correspondiente."
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
                      type="checkbox"
                      id={"formula"}
                      label={
                        "Campo para asignar a formula o seleccion condicional."
                      }
                      onChange={e => {
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
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  this.OpenModalPreview();
                }}
              >
                {" "}
                <i className="fa fa-eye" /> Vista previa
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={e => this.createMetadata(e)}
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
          inputType={this.state.dragType}
          field={this.props.field}
        />
      </div>
    );
  }
}

export default CheckBoxes;
