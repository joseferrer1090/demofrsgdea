import React, { Component } from "react";
import PropTypes from "prop-types";
import { HEADQUARTER_BY_COMPANY } from "./../../../../services/EndPoints";

class SelectSede extends Component {
  state = {
    dataSede: [],
    id: this.props.idEmpresa,
    t: this.props.t,
    auth: this.props.authorization
  };
  static getDerivedStateFromProps(props, state) {
    if (props.idEmpresa !== state.id) {
      return {
        id: props.idEmpresa
      };
    }
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.idEmpresa !== prevProps.idEmpresa) {
      // METODO
      this.getDataSede();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        id: this.props.idEmpresa,
        auth: this.props.authorization
      });
    }
  }
  getDataSede = () => {
    fetch(`${HEADQUARTER_BY_COMPANY}${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataSede: data
        });
      })
      .catch(err => console.log(`err => ${err}`));
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          <option>
            -- Seleccione --
            {/* -- {t("app_tipoTramite_form_registrar_select_sede")} -- */}
          </option>
          {this.state.dataSede.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

SelectSede.propTypes = {
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default SelectSede;
