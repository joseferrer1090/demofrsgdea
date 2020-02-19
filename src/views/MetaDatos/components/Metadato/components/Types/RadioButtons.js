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
      activeTab: "1"
    };
  }

  componentDidMount() {
    this.setState(this.props.field);
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
    this.duplicates();
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

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className="fa fa-circle mr-1" /> {this.state.title}
            <span
              className="pull-right cross"
              onClick={() => this.props.removeField(this.props.index)}
            >
              <i className="fa fa-times" />
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
                  tab 1
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
                  tab 2
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                >
                  tab 3
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
                    <div className="form-group">
                      <input
                        value={this.state.multiple}
                        type="checkbox"
                        id="multiple"
                        onChange={e =>
                          this.changeValue("MULTIPLE", e.target.checked)
                        }
                      />
                      <label className="form-check-label" htmlFor="isRequired">
                        Multiple Selection
                      </label>
                    </div>
                    <div className="form-group">
                      <input
                        type="checkbox"
                        value={this.state.inline}
                        onChange={e =>
                          this.changeValue("INLINE", e.target.checked)
                        }
                        id={"inline"}
                      />
                      <label>Inline</label>
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
              <TabPane activeTab={"2"}>
                <Card body>
                  <div className="row">
                    <div className="">
                      <div className="form-group">
                        <input
                          type={"checkbox"}
                          value={this.state.validation.isRequired}
                          onChange={e =>
                            this.changeValue("IS_REQUIRED", e.target.checked)
                          }
                          id={"isRequired"}
                        />
                        <label htmlFor="isRequired"> Rquired</label>
                      </div>
                      <div classNam="form-group">
                        <input
                          type={"checkbox"}
                          value={this.state.validation}
                          onChange={e =>
                            this.changeValue("IS_READONLY", e.target.checked)
                          }
                        />
                        <label htmlFor=""> Readonly </label>
                      </div>
                      <div className="col-md-6">
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
                      </div>
                      <div className="col-md-6">
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
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane activeTab={"3"}>
                <Card body>
                  <p className="text-center"> Values </p>
                  {this.state.radios ? (
                    <table className="table text-center">
                      <tbody>
                        {this.state.radios.map((checkbox, index) => {
                          return (
                            <tr key={index}>
                              {this.state.multiple ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  <div className="radio">
                                    {
                                      <input
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
                                  className="form-control"
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
                                  className="form-control"
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
                                  x
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
                    Agregar
                  </button>
                </Card>
              </TabPane>
            </TabContent>
          </CardBody>
          <CardFooter>{}</CardFooter>
        </Card>
      </div>
    );
  }
}

RadioButtons.propsTypes = {};

export default RadioButtons;
