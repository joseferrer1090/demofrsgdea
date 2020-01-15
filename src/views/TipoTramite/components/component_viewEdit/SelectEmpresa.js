import React, { Component } from "react";
import PropTypes from "prop-types";
import { COMPANY_BY_CONGLOMERATE } from "./../../../../services/EndPoints";

class SelectEmpresa extends Component {
  state = {
    dataEmpresa: [],
    id: this.props.idConglomerado,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.idConglomerado !== state.id) {
      return {
        id: props.idConglomerado
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idConglomerado !== prevProps.idConglomerado) {
      // METODO
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.idConglomerado
      });
    }
  }

  getDataEmpresa = () => {
    fetch(`${COMPANY_BY_CONGLOMERATE}${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataEmpresa: data
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
          <option value={" "}>
            {" "}
            -- Seleccione --
            {/* -- {t("app_tipoTramite_form_registrar_select_empresa")} --{" "} */}
          </option>
          {this.state.dataEmpresa.map((aux, id) => {
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

SelectEmpresa.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default SelectEmpresa;
