import React, { useState } from "react";
import PropTypes from "prop-types";

const InputDynamics = props => {
  let formElement = null;

  switch (props.formType) {
    case "text":
      formElement = (
        <input
          className="form-control form-control-sm"
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
        />
      );
      break;
    case "textarea":
      formElement = <textarea />;
      break;

    default:
      formElement = <input />;
  }
  return <React.Fragment>{formElement}</React.Fragment>;
};

export default InputDynamics;
