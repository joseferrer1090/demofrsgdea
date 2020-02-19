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
        break;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this, props.index);
    }, 0);
  };

  toggle = tab => {
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
                <p>Probnado el tab 2</p>
              </TabPane>
              <TabPane tabId={"3"}>
                <p>Probando el tab 3</p>
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
