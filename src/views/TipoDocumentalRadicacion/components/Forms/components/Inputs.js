import React from "react";

const Inputs = (props) => {
  console.log(props);
  let inputElement = null;
  switch (props.fromType) {
    case "input":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor=""></label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
            />
          </div>
        </div>
      );
      break;
    case "select":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label></label>
            <select
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
            ></select>
          </div>
        </div>
      );
      break;
    case "radio":
      break;
    case "checkbox":
      break;
    case "date":
      break;
    case "textarea":
      break;

    default:
      inputElement = (
        <div className="form-group">
          <label>Etiqueta de metadato no asociada</label>
          <input
            type="text"
            className="form-control form-control-sm"
            disabled
            defaultValue={`El metadato no esta asociado`}
          />
        </div>
      );
  }
  return <React.Fragment>{inputElement}</React.Fragment>;
};

export default Inputs;
