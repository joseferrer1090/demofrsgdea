import React, { Component, createRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Toast,
  ToastBody,
  ToastHeader,
  CustomInput
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "./../ModalPreview";
import { METADATA_CREATE } from "./../../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";

// const InputTypes = [
//   "Checkbox",
//   "Color",
//   "Date",
//   "Email",
//   "File",
//   "Month",
//   "Number",
//   "Password",
//   "Radio",
//   "Range",
//   "Search",
//   "Tel",
//   "Text",
//   "Time",
//   "Url",
//   "Week",
//   "Textarea"
// ];

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
        max: 6
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
      alert500: false
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

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  openModalPreview = () => {
    this.myModal.toggle();
  };

  CreateMetadate = e => {
    const aux = this.state.auth;
    const username = decode(aux);
    e.preventDefault();
    console.log(
      JSON.stringify({
        // name: this.state.name,
        // description: this.state.description,
        // labelText: this.state.title,
        // labelClass: "col-sm-2 col-form-label",
        // inputId: this.state.name,
        // inputType: this.state.type,
        // inputClass: "form-control form-control-sm",
        // inputPlaceholder: this.state.placeholder,
        //formula: this.state.formula,
        //status: this.state.active
        // userName: username.user_name
      })
    );
    fetch(`${METADATA_CREATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.state.auth
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
        userName: username.user_name
      })
    })
      .then(response => {
        if (response.ok) {
          this.setState({
            alert200: true
          });
          setTimeout(() => {
            this.setState({
              alert200: false
            });
          }, 1500);
          //console.log("se enviaron bien los datos");
        } else if (response.status === 400) {
          this.setState({
            alert400: true
          });
          setTimeout(() => {
            this.setState({
              alert400: false
            });
            this.resetForm();
          }, 1500);
          //console.log("Error al enviar los datos");
        } else if (response.status === 500) {
          this.setState({
            alert500: true
          });
          setTimeout(() => {
            this.setState({
              alert500: false
            });
            this.resetForm();
          }, 1500);
          //console.log("Error en el servidor");
        }
      })
      .catch(error => {
        this.setState({ alert500: true });
        setTimeout(() => {
          this.setState({
            alert500: false
          });
        }, 1500);
        //console.log(`error, ${error}`);
      });
  };

  resetForm = () => {
    this.myFormRef.reset();
  };
  render() {
    // console.log(this.state.dragType);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardHeader>
                <i className="fa fa-wpforms" /> Entrada de texto{" "}
                {this.state.title}
                <button
                  className="btn btn-link btn-sm pull-right"
                  onClick={() => this.props.removeField(this.props.index)}
                >
                  <i className="fa fa-times" style={{ color: "red" }} />
                </button>
              </CardHeader>

              <CardBody>
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
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    General <i className="fa fa-cog" />
                  </NavLink>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    {" "}
                    Validacion <i className="fa fa-exclamation-triangle" />
                  </NavLink>
                </Nav>
                <form
                  id="form1"
                  role="form"
                  className="form"
                  ref={el => (this.myFormRef = el)}
                >
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Card body>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={e => {
                                  this.changeValue("NAME", e.target.value);
                                }}
                                placeholder="NAME"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/* <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="title">Type</label>
                              <select
                                className="form-control from-control-sm"
                                onChange={e =>
                                  this.changeValue("TYPE", e.target.value)
                                }
                                className="form-control form-control-sm"
                                defaultValue={this.state.type}
                              >
                                {InputTypes.map((type, id) => {
                                  return (
                                    <option value={type} key={id}>
                                      {type}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div> */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Default value</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={e => {
                                  this.changeValue(
                                    "DEFAULT_VALUE",
                                    e.target.value
                                  );
                                }}
                                value={this.state.defaultValue}
                                placeholder={"Valor por defecto"}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Helper text</label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={e => {
                                  this.changeValue(
                                    "HELPER_TEXT",
                                    e.target.value
                                  );
                                }}
                                value={this.state.helpertext}
                                placeholder={"Texto de ayuda"}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="title">
                                {" "}
                                Label {this.state.title}
                              </label>
                              <input
                                type="text"
                                value={this.state.title}
                                onChange={e =>
                                  this.changeValue("TITLE", e.target.value)
                                }
                                placeholder="Field label Title"
                                className={"form-control form-control-sm"}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="title">Placeholder</label>
                              <input
                                type="text"
                                value={this.state.placeholder}
                                onChange={e =>
                                  this.changeValue(
                                    "PLACEHOLDER",
                                    e.target.value
                                  )
                                }
                                placeholder="Field Placeholder"
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="title">description</label>
                              <textarea
                                value={this.state.description}
                                onChange={e =>
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
                                onChange={e =>
                                  this.changeValue(
                                    "IS_REQUIRED",
                                    e.target.checked
                                  )
                                }
                                className=""
                                type={"Checkbox"}
                                id="isRequired"
                              />
                              <label className="" htmlFor={"isRequired"}>
                                {" "}
                                ¿Es requerido?
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                value={this.state.validation.isReadOnly}
                                onChange={e =>
                                  this.changeValue(
                                    "IS_READONLY",
                                    e.target.checked
                                  )
                                }
                                type={"Checkbox"}
                                className=""
                                id="isReadOnly"
                              />
                              <label htmlFor="isReadOnly">¿Solo lectura?</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="">MAX 20 caracteres</label>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={this.state.validation.max}
                                onChange={e =>
                                  this.changeValue("MAX", e.target.value)
                                }
                                placeholder={"20"}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="title">MIN 6 caracteres </label>
                              <input
                                type="number"
                                onChange={e =>
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
                          // value={this.state.active}
                          defaultValue={!this.state.active}
                          defaultChecked
                          type="checkbox"
                          id={"activeInput"}
                          label={
                            "Activar el metadato, para sea visible el la bolsa de metadatos y asignar en la platilla correspondiente."
                          }
                          onChange={e => {
                            this.setState({
                              active: e.target.checked
                            });
                          }}
                        ></CustomInput>
                        <br />
                        <CustomInput
                          value={this.state.formula}
                          type={"checkbox"}
                          label={"Campo para asignar a formula"}
                          id={"formula"}
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
                    className="btn btn-secondary btn-sm "
                    type="button"
                    onClick={this.openModalPreview}
                  >
                    <i className="fa fa-eye" /> Vista previa
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-secondary btn-sm "
                    type="button"
                    onClick={e => {
                      this.CreateMetadate(e);
                    }}
                  >
                    {" "}
                    <i className="fa fa-save" /> Guardar metadato{" "}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        <ModalPreview
          ref={m => (this.myModal = m)}
          modalpreview={this.state.modalpreview}
          inputType={this.state.dragType}
          field={this.props.field}
        />
      </div>
    );
  }
}

export default SingleField;
