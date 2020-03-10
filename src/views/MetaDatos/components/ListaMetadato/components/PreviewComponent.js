import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";

const styleInput = {
  border: "1px solid #c8ced3",
  padding: "10px"
};

const PreviewComponent = props => {
  let formElement = null;
  switch (props.fromType) {
    case "text":
      formElement = (
        <div style={styleInput}>
          <div className="form-group">
            <label>{props.labelInput}</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder={props.inputPlaceholder}
            />
            {/* <small className="form-text text-muted">{props.helperText}</small> */}
          </div>
        </div>
      );
      break;
    case "select":
      formElement = (
        <div style={styleInput}>
          <div className="form-group">
            <label>{props.labelInput}</label>
            <select className="form-control form-control-sm">
              {props.details.map((aux, id) => {
                return (
                  <option value={aux.input_value}>{aux.label_text}</option>
                );
              })}
            </select>
          </div>
        </div>
      );
      break;
    case "checkbox":
      formElement = (
        <div style={styleInput}>
          <div className="form-check">
            <label>{props.labelInput}</label>
            {props.details.map((aux, id) => {
              return (
                <div key={id}>
                  <input type="checkbox" value={aux.input_value} />{" "}
                  <label htmlFor={aux.input_value}>{aux.label_text}</label>
                </div>
              );
            })}
          </div>
        </div>
      );
      break;
    case "radio":
      formElement = (
        <div style={styleInput}>
          <div className="form-check">
            <label>{props.labelInput}</label>
            {props.details.map((aux, id) => {
              return (
                <div key={id}>
                  <input type="radio" value={aux.input_value} />
                  <label htmlFor={aux.input_value}>{aux.label_text}</label>
                </div>
              );
            })}
          </div>
        </div>
      );
      break;
    case "textarea":
      formElement = (
        <div style={styleInput}>
          <div className="form-group">
            <label>{props.labelInput}</label>
            <textarea className="form-control form-control-sm"></textarea>
          </div>
        </div>
      );
      break;
    case "date":
      formElement = (
        <div style={styleInput}>
          <div className="form-group">
            <label>{props.labelInput}</label>
            <input type="date" className="form-control form-control-sm" />
          </div>
        </div>
      );
      break;
    default:
      formElement = <input />;
  }
  return (
    <div>
      {props.fromType ? (
        <div>{formElement}</div>
      ) : (
        <p
          style={{
            textAlign: "center",
            padding: "3.5em",
            fontSize: "12pt",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "rgb(170, 170, 170)",
            backgroundColor: "rgb(238, 238, 238)",
            marginBottom: "0rem",
            border: "1px solid grey"
          }}
        >
          Vista previa del metadato
        </p>
      )}
    </div>
  );
};

export default PreviewComponent;
