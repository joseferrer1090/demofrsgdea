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
                <p>Tab 1</p>
              </TabPane>
              <TabPane tabId={"2"}>
                <p>Tab 2</p>
              </TabPane>
              <TabPane tabId={"3"}>
                <p>Tab 3</p>
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
