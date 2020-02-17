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
