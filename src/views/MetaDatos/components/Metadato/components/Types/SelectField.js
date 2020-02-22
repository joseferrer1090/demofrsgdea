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
  Table
} from "reactstrap";
import classnames from "classnames";

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
        isRequired: false,
        min: 6,
        max: 6
      },
      options: [],
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
      case "PLACEHOLDER":
        this.setState({
          placeholder: value
        });
        break;
      case "TYPE":
        this.setState({
          type: value
        });
        break;
      case "DESCRIPTION":
        this.setState({
          description: value
        });
        break;
      case "DEFAULT_VALUE":
        this.setState({
          defaultValue: value
        });
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
        this.setState({
          validation: { ...this.state.validation, max: value }
        });
        break;
      case "DUPLICATE":
        this.setState({
          duplicate: value
        });
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
        ...options[index].value,
        defaultValue: value
      };
    } else {
      options[index] = option;
      this.setState({
        options: options
      });
    }
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
                  onClick={() => this.toggle("1")}
                >
                  Tab 1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => this.toggle("2")}
                >
                  Tab 2
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => this.toggle("3")}
                >
                  Tab 3
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={"1"}>
                <Card body>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <p className="alert alert-info text-center">
                            <strong>NAME</strong>
                          </p>
                          <label htmlFor="name">NAME</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={this.state.name}
                            onChange={e =>
                              this.changeValue("NAME", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="checkbox"
                          id={"multiple"}
                          value={this.state.multiple}
                          onChange={e =>
                            this.changeValue("MULTIPLE", e.target.checked)
                          }
                        />
                        <label className="" htmlFor="isRequired">
                          Multiple Selection
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.title}
                          onChange={e =>
                            this.changeValue("TITLE", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="form-control form-control-sm"
                          value={this.state.description}
                          onClick={e =>
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
                    <div className="form-group">
                      <input
                        type={"checkbox"}
                        value={this.state.validation.isRequired}
                        id="isRequired"
                        onChange={e =>
                          this.changeValue("IS_REQUIRED", e.target.checked)
                        }
                      />
                      <label htmlFor="isRequired"> Required </label>
                    </div>
                    <div className="form-group">
                      <input
                        type={"checkbox"}
                        value={this.state.validation.isReadOnly}
                        onChange={e =>
                          this.changeValue("IS_READONLY", e.target.checked)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor=""> Max </label>
                      <input
                        type={"number"}
                        className="form-control form-control-sm"
                        value={this.state.validation.max}
                        onChange={e => this.changeValue("MAX", e.target.value)}
                        placeholder={"6"}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Min</label>
                      <input
                        type={"number"}
                        className="form-control form-control-sm"
                        onChange={e => this.changeValue("MIN", e.target.value)}
                        value={this.state.validation.min}
                        placeholder={"6"}
                      />
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
                    <strong>Duplicate</strong> Values Found
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
                                  placeholder="Title"
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
                                  className="form-control"
                                />
                              </td>
                              <td>
                                <input
                                  placeholder="Value"
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
                                    id={option.value}
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
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.addOption()}
                  >
                    {" "}
                    Add Option
                  </button>
                </Card>
              </TabPane>
            </TabContent>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
}
export default SelectField;
