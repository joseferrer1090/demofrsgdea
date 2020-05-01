import React, { Component } from "react";
import { TEMPLATE_ACTIVE } from "./../../../../../services/EndPoints";
import PropTypes from "prop-types";

class SelectPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.autorization,
      data: [],
    };
  }

  render() {
    return (
      <div className="form-group">
        <label>
          Plantilla <span className="text-danger">*</span>
        </label>
        <select
          value={this.props.value}
          name={this.props.name}
          className="form-control form-control-sm"
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option>-- Seleccione --</option>
          <option>Plantilla 1</option>
          <option>Plantilla 2</option>
          <option>Plantilla 3</option>
        </select>
      </div>
    );
  }
}

SelectPlantilla.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default SelectPlantilla;

//  <select
//    name={"plantilla"}
//    onChange={handleChange}
//    onBlur={handleBlur}
//    value={values.plantilla}
//    className="form-control form-control-sm"
//  >
//    <option>
//      --
//      {t("app_documentalRadicacion_form_registrar_select_plantilla")}
//      --
//    </option>
//    <option>Plantilla 1</option>
//    <option>Plantilla 2</option>
//    <option>Plantilla 3</option>
//  </select>;
