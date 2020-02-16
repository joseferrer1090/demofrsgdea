import React, { Component } from "react";
import PropTypes from "prop-types";

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

  render() {
    return <div></div>;
  }
}

RadioButtons.propsTypes = {};

export default RadioButtons;
