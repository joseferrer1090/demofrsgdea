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
  NavItem
} from "reactstrap";
import classnames from "classnames";

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "Date",
      name: "",
      toolType: "DATE_FIELD",
      defaultValue: "",
      placoholder: "",
      description: "",
      validation: {
        isRequired: false,
        isReadOnly: false,
        min: "",
        max: ""
      },
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
            isRequired: value
          }
        });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value }
        });
        break;
      case "MAX":
        this.setState({
          validation: { ...this.state.validation, max: value }
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

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div>
        <Card outline color={"secondary"}>
          <CardHeader>
            <i className="fa fa-calendar" /> Fecha {this.state.name}
            <span
              className="pull-right"
              onClick={() => this.props.removeField(this.props.index)}
            >
              {" "}
              <i className="fa fa-times" />{" "}
            </span>
          </CardHeader>
          <CardBody>
            <Nav tabs>
              <NavLink
                className={classnames({
                  activeTab: this.state.activeTab === "1"
                })}
                onClick={() => this.toggle("1")}
              >
                Tab 1
              </NavLink>
              <NavLink
                className={classnames({
                  activeTab: this.state.activeTab === "2"
                })}
                onClick={() => this.toggle("2")}
              >
                Tab 2
              </NavLink>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={"1"}>
                <Card body>
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
                          placeholder={"Nombre"}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">TITLE</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={this.state.title}
                        onChange={e =>
                          this.changeValue("TITLE", e.target.value)
                        }
                        placeholder={"Titulo"}
                      />
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"2"}>
                <Card body>
                  <div className="row">
                    <div className="form-group">
                      <input
                        type="checkbox"
                        value={this.state.validation.isRequired}
                        onChange={e =>
                          this.changeValue("IS_REQUIRED", e.target.checked)
                        }
                        id={"isRequired"}
                      />
                      <label htmlFor=""> isRequired </label>
                    </div>
                    <div className="form-group">
                      <input
                        type={"checkbox"}
                        value={this.state.validation.isReadOnly}
                        onChange={
                          (e => this.changeValue("IS_READONLY"),
                          e.target.checked)
                        }
                        id="isReadOnly"
                      />
                      <label htmlFor> isReadOnly </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor>MAX</label>
                    </div>
                    <div className="form-group">
                      <label htmlFor>MIN</label>
                    </div>
                  </div>
                </Card>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default DateField;
