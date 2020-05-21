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

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
      this.getDateTemplate(this.state.auth);
    }
  }

  getDateTemplate = (auth) => {
    fetch(`${TEMPLATE_ACTIVE}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
      })

      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  render() {
    const data = this.state.data;
    // console.log(this.state.data);
    return (
      <div className="form-group">
        <label>
          Plantilla <span className="text-danger">*</span>
        </label>
        <select
          value={this.props.value}
          name={this.props.name}
          className={this.props.className}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option value="">-- Seleccione --</option>
          {Object.keys(data) ? (
            data.map((aux, id) => {
              return (
                <option key={id} value={aux.id}>
                  {aux.name}
                </option>
              );
            })
          ) : (
            <option value="">No hay plantillas diponibles</option>
          )}
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
