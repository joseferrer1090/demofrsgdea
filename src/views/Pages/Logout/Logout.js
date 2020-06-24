import React, { Component } from "react";
import PropTypes from "prop-types";
import * as types from "./../../../constants/user.constants";
import { connect } from "react-redux";
import Cookie from "js-cookie";

class Logout extends Component {
  componentDidMount() {
    sessionStorage.clear();
    localStorage.clear();
    Cookie.remove("auth");
    this.props.history.replace("/");
  }
  render() {
    return null;
  }
}
export default connect()(Logout);
