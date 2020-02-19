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
  NavItem
} from "reactstrap";
import classnames from "classnames";

class CheckBoxexs extends Component {
  constructor(props) {
    super(propx);
    this.state = {
      activeTab: "1",
      inline: false,
      toolType: "CHECK_BOXES",
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
      duplicate: false,
      checkBoxes: []
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

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
    let checbox = {
      title: "",
      value: "",
      selected: false
    };
    let checboxes = this.state.checkBoxes;
    checboxes.push(checbox);
    this.setState({
      checkBoxes: checboxes
    });
    this.duplicate();
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  changeOptionValue = (index, value, state) => {
    let checboxes = this.state.checkBoxes;
    let checkbox = {};
    if (stte === "TITLE") {
      checkbox = {
        ...checboxes[index],
        title: value
      };
    } else if (state === "SELECTED") {
      checkbox = {
        ...checboxes[index],
        selected: !checboxes[index].selected
      };
    } else if (state === "VALUE") {
      checbox = {
        ...checboxes[index],
        value: value
      };
    } else {
      checkbox = {
        ...checboxes[index]
      };
    }
    checboxes[index] = checkbox;
    this.setState({
      checkBoxes: checboxes
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
            <i className="fa fa-check-square mr-1"></i> Check Boxes{" "}
            {this.state.title}
            <span
              className="pull-right cross"
              onClick={() => this.props.removeField(this.props.index)}
            >
              <i className="fa fa-times" />
            </span>
          </CardHeader>
          <CardBody>
            <Nav tabs>
              <NavItem
                className={classnames({
                  activeTab: this.state.activeTab === "1"
                })}
                onClick={() => this.toggle("1")}
              >
                <NavLink>Tab 1</NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  activeTab: this.state.activeTab === "2"
                })}
                onClick={() => this.toggle("2")}
              >
                <NavLink>Tab 2</NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  activeTab: this.state.activeTab === "3"
                })}
                onClick={() => this.toggle("3")}
              >
                <NavLink>Tab 3</NavLink>
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
                    <div className="form-group">
                      <input
                        type="checkbox"
                        onChange={e =>
                          this.changeValue("INLINE", e.target.checked)
                        }
                        value={this.state.inline}
                        id={"inline"}
                      />
                      <label>Inline</label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={this.state.title}
                        onClick={e => this.changeValue("TITLE", e.target.value)}
                        placeholder="Titulo"
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"2"}>
                <Card body>
                  <div className="row">
                    <div className="">
                      <div className="form-group">
                        <input
                          type="checkbox"
                          value={this.state.validation.isRequired}
                          onChange={e =>
                            this.changeValue("IS_REQUIRED", e.target.checked)
                          }
                        />
                        <label htmlFor=""> isRequired </label>
                      </div>
                      <div className="form-group">
                        <input
                          type={"checkbox"}
                          onChange={e =>
                            this.changeValue("IS_READONLY", e.target.checked)
                          }
                          value={this.state.validation.isReadOnly}
                        />
                        <label htmlFor="">isReadOnly</label>
                      </div>
                      <div className="col-md-6">
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
                      <div className="col-md-6">
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
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"3"}>
                <Card body>
                  <p
                    hidden={this.state.duplicate}
                    className="alert text-center alert-danger"
                  >
                    Values
                  </p>
                  {this.state.checkBoxes ? (
                    <table className="table text-center">
                      <tbody>
                        {this.state.checkBoxes.map((checkbox, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className>
                                  <input
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
                                  className="form-control"
                                />
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <span
                                  onClick={() => this.removeOption(index)}
                                  className="cross pull-right"
                                >
                                  X
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
                    Add{" "}
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

export default CheckBoxexs;
