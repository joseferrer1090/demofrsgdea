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
      duplicate: false
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

  render() {
    return (
      <div>
        <Card>
          <CardHeader></CardHeader>
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
}
export default SelectField;
