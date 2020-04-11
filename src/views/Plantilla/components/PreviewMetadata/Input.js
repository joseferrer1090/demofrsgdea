import React from "react";

const Input = (props) => {
  let formElement = null;
  switch (props.formType) {
    case "select":
      formElement = (
        <div>
          <select className="form-control form-control-sm"></select>
        </div>
      );
      break;
    case "radio":
      formElement = (
        <div>
          <input type="radio" />
        </div>
      );
      break;
    case "checkbox":
      formElement = (
        <div>
          <input type="checkbox" />
        </div>
      );
      break;
    case "text":
      formElement = (
        <div>
          <input type="text" className="form-control form-control-sm" />
        </div>
      );
      break;
    case "textarea":
      formElement = (
        <div>
          <textarea className="form-control form-control-sm"></textarea>
        </div>
      );
      break;
    case "date":
      formElement = (
        <div>
          <input type="date" />
        </div>
      );
      break;

    default:
      formElement = (
        <div>
          <input />
        </div>
      );
  }
  return <React.Fragment>{formElement}</React.Fragment>;
};

export default Input;
