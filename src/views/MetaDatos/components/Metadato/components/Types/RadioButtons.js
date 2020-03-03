import React, { Component } from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
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
  Table
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "./../ModalPreview";

class RadioButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inline: false,
      multiple: false,
      toolType: "RADIO_BUTTONS",
      title: "",
      name: "",
      defaultValue: "",
      description: "",
      validation: {
        isReadOnly: false,
        isRequired: false,
        min: 6,
        max: 6
      },
      radios: [],
      duplicate: false,
      activeTab: "1",
      modalpreview: false,
      dragType: this.props.dragType
    };
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
      case "MAX":
        this.setState({ validation: { ...this.state.validation, max: value } });
        break;
      case "MIN":
        this.setState({ validation: { ...this.state.validation, min: value } });
        break;
      case "INLINE":
        this.setState({ inline: value });
        break;
      case "MULTIPLE":
        this.setState({ multiple: value });
        break;
      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  removeOption = index => {
    let radios = this.state.radios;
    radios.splice(index, 1);
    this.setState({
      radios: radios
    });
    this.duplicate();
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

  duplicate = () => {
    let radios = this.state.radios;
    let u = _.uniqBy(radios, "value");
    if (!_.isEqual(radios, u)) {
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
    let radio = {
      title: "",
      value: "",
      selected: false
    };
    let radios = this.state.radios;
    radios.push(radio);
    this.setState({
      radios: radios
    });
    this.duplicate();
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  changeOptionValue = (index, value, state) => {
    let radios = this.state.radios;
    let radio = {};
    if (state === "DEFAULT_VALUE") {
      this.setState({
        defaultValue: index
      });
    }
    if (state === "TITLE") {
      radio = {
        ...radios[index],
        title: value
      };
    } else if (state === "SELECTED") {
      radio = {
        ...radios[{ index }],
        selected: !radios[index].selected
      };
    } else if (state === "VALUE") {
      radio = {
        ...radios[{ index }],
        value: value
      };
    } else {
      radio = {
        ...radios[index]
      };
    }

    radios[index] = radio;
    this.setState({
      radios: radios
    });
    this.duplicate();
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  createMetada = e => {
    e.preventDefault();
    const aux = JSON.stringify(
      {
        name: this.state.name,
        description: this.state.description,
        title: this.state.title,
        radios: this.state.radios,
        isReadOnly: this.state.validation.isReadOnly,
        isRequired: this.state.validation.isRequired,
        multiple: this.state.multiple,
        inline: this.state.inline
      },
      null,
      2
    );
    alert(aux);
  };

  openModalPreview = () => {
    this.refs.child.toggle();
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className="fa fa-circle mr-1" /> Selección de radio{" "}
            {this.state.title}
            <span
              className="pull-right cross"
              onClick={() => this.props.removeField(this.props.index)}
            >
              <i className="fa fa-times" style={{ color: "red" }} />
            </span>
          </CardHeader>
          <CardBody>
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
                  General <i className="fa fa-cog" />
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
                  Validacion <i className="fa fa-exclamation-triangle" />
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
                          type="text"
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("NAME", e.target.value)
                          }
                          placeholder={"Nombre"}
                          value={this.state.name}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="title">TITLE</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("TITLE", e.target.value)
                          }
                          value={this.state.title}
                          placeholder={"Titulo"}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea
                          className="form-control form-control-sm"
                          value={this.state.description}
                          onChange={e =>
                            this.changeValue("DESCRIPTION", e.target.value)
                          }
                        ></textarea>
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
                          type={"checkbox"}
                          value={this.state.validation.isRequired}
                          onChange={e =>
                            this.changeValue("IS_REQUIRED", e.target.checked)
                          }
                          id={"isRequired"}
                        />
                        <label htmlFor="isRequired"> ¿Es Requerido? </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type={"checkbox"}
                          value={this.state.validation}
                          onChange={e =>
                            this.changeValue("IS_READONLY", e.target.checked)
                          }
                          id={"isReadOnly"}
                        />
                        <label htmlFor="isReadOnly"> ¿Solo lectura? </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          value={this.state.multiple}
                          type="checkbox"
                          id="multiple"
                          onChange={e =>
                            this.changeValue("MULTIPLE", e.target.checked)
                          }
                        />
                        <label className="form-check-label" htmlFor="multiple">
                          ¿ Multiple selección ?
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="checkbox"
                          value={this.state.inline}
                          onChange={e =>
                            this.changeValue("INLINE", e.target.checked)
                          }
                          id="inline"
                        />
                        <label htmlFor="inline"> ¿ Alineados ? </label>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Min characters</label>
                        <input
                          type={"number"}
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("MIN", e.target.value)
                          }
                          value={this.state.validation.min}
                          placeholder={"6"}
                        />
                      </div>
                    </div> */}
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label> Max characters</label>
                        <input
                          type={"number"}
                          value={this.state.validation.max}
                          onChange={e =>
                            this.changeValue("MAX", e.target.value)
                          }
                          placeholder={"6"}
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div> */}
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"3"}>
                <Card body>
                  {this.state.radios ? (
                    <table className="table text-center">
                      <tbody>
                        {this.state.radios.map((checkbox, index) => {
                          return (
                            <tr key={index}>
                              {this.state.multiple ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  <div className="checkbox">
                                    {
                                      <input
                                        type="checkbox"
                                        value={
                                          this.state.radios[index].selected
                                        }
                                        onChange={e =>
                                          this.changeOptionValue(
                                            index,
                                            e.target.checked,
                                            "SELECTED"
                                          )
                                        }
                                      />
                                    }
                                  </div>
                                </td>
                              ) : (
                                <td hidden={true}></td>
                              )}
                              <td>
                                <input
                                  placeholder="Title"
                                  autoFocus={true}
                                  value={this.state.radios[index].title}
                                  onChange={e =>
                                    this.changeOptionValue(
                                      index,
                                      e.target.value,
                                      "TITLE"
                                    )
                                  }
                                  id={checkbox.title}
                                  type="text"
                                  className="form-control form-control-sm"
                                />
                              </td>
                              <td>
                                <input
                                  placeholder="Value"
                                  value={this.state.radios[index].value}
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
                                    id={checkbox.value}
                                    type="radio"
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
                    onClick={() => this.addOption()}
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa fa-plus" /> Agregar opciones
                  </button>
                </Card>
              </TabPane>
            </TabContent>
          </CardBody>
          <CardFooter>
            <div className="pull-right">
              <button
                type={"button"}
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  this.openModalPreview();
                }}
              >
                {" "}
                <i className="fa fa-eye" /> Vista previa{" "}
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={e => this.createMetada(e)}
              >
                {" "}
                <i className="fa fa-save" /> Guardar metadato
              </button>
            </div>
          </CardFooter>
        </Card>
        <ModalPreview
          ref={"child"}
          modalpreview={this.state.modalpreview}
          field={this.props.field}
          inputType={this.state.dragType}
        />
      </div>
    );
  }
}

RadioButtons.propsTypes = {};

export default RadioButtons;
