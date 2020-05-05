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
            <label htmlFor={""}></label>
            <select
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
            >
              <option> -- Seleccione -- </option>
              {props.elementConfig.options.length ? (
                props.elementConfig.options.map((aux, id) => (
                  <option key={id} value={aux.value}>
                    {aux.name}
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
        <div>
          <p>Apenas maquetando</p>
        </div>
      );
      break;
    case "checkbox":
      inputElement = (
        <div>
          <p>Apenas maquetando</p>
        </div>
      );
      break;
    case "date":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor={""}></label>
            <input
              type="date"
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
            />
          </div>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor=""></label>
            <textarea
              className="form-control form-control-sm"
              onChange={props.onChange}
              value={props.value}
            ></textarea>
          </div>
        </div>
      );
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
