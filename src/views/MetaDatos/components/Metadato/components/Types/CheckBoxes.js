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

class CheckBoxes extends Component {
  constructor(props) {
    super(props);
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
    console.log(this.props.field);
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
    if (state === "TITLE") {
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
      checkbox = {
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

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  createMetadata = e => {
    e.preventDefault();
    const aux = JSON.stringify(
      {
        name: this.state.name,
        title: this.state.title,
        description: this.state.description,
        checboxes: this.state.checkBoxes,
        isReadOnly: this.state.validation.isReadOnly,
        isRequired: this.state.validation.isRequired,
        inline: this.state.inline
      },
      null,
      2
    );
    alert(aux);
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
                  {/* <p
                    hidden={this.state.duplicate}
                    className="alert text-center alert-danger"
                  >
                    Values
                  </p> */}
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
          </CardBody>
          <CardFooter>
            <div className="pull-right">
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
      </div>
    );
  }
}

export default CheckBoxes;
