import React from "react";

const Inputs = (props) => {
  // console.log(props);
  let inputElement = null;
  switch (props.formType) {
    case "text":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="">{props.label}</label>
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
              {...props.elementConfig}
            />
          </div>
        </div>
      );
      break;
    case "select":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={""}>{props.label}</label>
            <select
              className="form-control form-control-sm"
              onChange={props.onChange}
              {...props.elementConfig}
            >
              <option> -- Seleccione -- </option>
              {props.elementConfig.options.length ? (
                props.elementConfig.options.map((aux, id) => (
                  <option key={id} value={aux.value}>
                    {aux.displayValue}
                  </option>
                ))
              ) : (
                <option> -- No hay datos -- </option>
              )}
            </select>
          </div>
        </div>
      );
      break;
    case "radio":
      inputElement = (
        <div className="col-md-6">
          {props.elementConfig.options.length ? (
            props.elementConfig.options.map((aux, id) => {
              return (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    onChange={props.onChange}
                    id={aux.id}
                    {...props.elementConfig}
                    value={aux.value}
                  />
                  <label className="form-check-label" htmlFor>
                    {aux.displayValue}
                  </label>
                </div>
              );
            })
          ) : (
            <div>No hay datos asociando al input de tipo radio</div>
          )}
        </div>
      );
      break;
    case "checkbox":
      inputElement = (
        <div className="col-md-6">
          {props.elementConfig.options.length ? (
            props.elementConfig.options.map((aux, id) => {
              return (
                <div className="form-group form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={aux.id}
                    value={aux.displayValue}
                    onChange={props.onChange}
                    {...props.elementConfig}
                  />
                  <label className="form-check-label" htmlFor={aux.id}>
                    {aux.displayValue}
                  </label>
                </div>
              );
            })
          ) : (
            <div>No hay dato asociados al checkbox</div>
          )}
        </div>
      );
      break;
    case "date":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={""}>{props.label}</label>
            <input
              type="date"
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
              {...props.elementConfig}
            />
          </div>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="">{props.label}</label>
            <textarea
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
              {...props.elementConfig}
            ></textarea>
          </div>
        </div>
      );
      break;

    default:
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label>Etiqueta de metadato no asociada</label>
            <input
              type="text"
              className="form-control form-control-sm"
              disabled
              defaultValue={`El metadato no esta asociado`}
            />
          </div>
        </div>
      );
  }
  return <React.Fragment>{inputElement}</React.Fragment>;
};

export default Inputs;
