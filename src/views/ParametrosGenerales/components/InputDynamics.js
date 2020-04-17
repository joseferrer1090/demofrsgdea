import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

const pass = {
  WebkitTextSecurity: "disc",
  textSecurity: "disc"
};

const PasswordInput = props => {
  return (
    <input
      type={"password"}
      className="form-control form-control-sm"
      {...props.elementConfig}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value}
      name={props.name}
      defaultValue={props.defaultValue}
      style={pass}
    />
  );
};

const InputDynamics = props => {
  let formElement = null;

  switch (props.formType) {
    case "input":
      formElement = (
        <input
          className="form-control form-control-sm"
          {...props.elementConfig}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          name={props.name}
          defaultValue={props.defaultValue}
          disabled={props.disable}
        />
      );
      break;

    case "select":
      formElement = (
        <select
          className="form-control form-control-sm"
          onChange={props.onChange}
          value={props.value}
          name={props.name}
        >
          {props.options.length ? (
            props.options.map((opt, id) => {
              return (
                <option key={id} value={opt.value}>
                  {" "}
                  {opt.displayname}{" "}
                </option>
              );
            })
          ) : (
            <option>Selecctione</option>
          )}
        </select>
      );
      break;

    case "textarea":
      formElement = (
        <React.Fragment>
          <textarea
            className="form-control form-control-sm"
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            disabled={props.disable}
          ></textarea>
        </React.Fragment>
      );
      break;

    case "radiobutton":
      formElement = (
        <React.Fragment>
          {props.elementConfig.options.map((option, id) => (
            <label>
              <input
                type="radio"
                value={option.value}
                name={option.name}
                onChange={props.onChange}
              />
              {option.name}
            </label>
          ))}
        </React.Fragment>
      );
      break;

    case "checkbox":
      formElement = (
        <React.Fragment>
          {props.elementConfig.options.map((check, id) => (
            <label>
              <input
                type="checkbox"
                name={check.name}
                id={check.id}
                value={check.value}
                onChange={props.onChange}
              />
              {check.name}
            </label>
          ))}
        </React.Fragment>
      );
      break;

    case "password":
      formElement = (
        <PasswordInput
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          name={props.name}
          defaultValue={props.defaultValue}
        />
      );
      break;

    default:
      formElement = <input />;
  }
  return <React.Fragment>{formElement}</React.Fragment>;
};

export default InputDynamics;

//  {
//    props.elementConfig.options.map((option, id) => (
//      <option key={id} value={option.value}>
//        {" "}
//        {option.displayname}{" "}
//      </option>
//    ));
//  }
