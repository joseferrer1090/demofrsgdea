import React, { Component } from "react";
import PropTypes from "prop-types";
import * as types from "./../../../constants/user.constants";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: types.userConstants.LOGOUT
    });
  }
  render() {
    return null;
  }
}
export default connect()(Logout);
