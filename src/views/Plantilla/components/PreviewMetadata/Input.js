import React from "react";

const Input = (props) => {
  let formElement = null;
  switch (props.formType) {
    case "select":
      formElement = (
        <React.Fragment>
          <select
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            className="form-control form-control-sm"
          >
            <option>Seleccione...</option>
            {props.options.length ? (
              props.options.map((opt, id) => {
                return (
                  <option key={id} value={opt.value}>
                    {opt.displayValue}
                  </option>
                );
              })
            ) : (
              <option>Seleccione...</option>
            )}
          </select>
        </React.Fragment>
      );
      break;
    case "radio":
      formElement = (
        <React.Fragment>
          {props.options.map((option, id) => (
            <label>
              <input
                type="radio"
                value={option.value}
                name={option.name}
                onChange={props.onChange}
              />
              {option.displayValue}
            </label>
          ))}
        </React.Fragment>
      );
      break;
    case "checkbox":
      formElement = (
        <React.Fragment>
          {props.options.map((check, id) => (
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={check.id}
                value={check.value}
                onChange={props.onChange}
                data-id={`${check.value} selected `}
              />
              <label className="form-check-label" htmlFor={check.id}>
                {check.displayValue}
              </label>
            </div>
          ))}
        </React.Fragment>
      );
      break;
    case "text":
      formElement = (
        <React.Fragment>
          <input
            type="text"
            className="form-control form-control-sm"
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            defaultValue={props.defaultValue}
          />
        </React.Fragment>
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
