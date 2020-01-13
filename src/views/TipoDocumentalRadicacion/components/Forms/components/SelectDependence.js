import React from "react";
import PropTypes from "prop-types";
import { DEPENDENCIES_BY_HEADQUARTER } from "./../../../../../services/EndPoints";

class SelectDependencia extends React.Component {
  state = {
    dataDependencia: [],
    id: this.props.idSede,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.idSede !== state.auth) {
      return {
        id: props.idSede
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
    if (this.props.idSede !== prevProps.idSede) {
      // METODO
      this.getDataDependencia();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.idSede
      });
    }
  }

  getDataDependencia = () => {
    fetch(`${DEPENDENCIES_BY_HEADQUARTER}${this.props.idSede}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependencia: data
        });
      })
      .catch(err => console.log("Error", err));
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
            {" "}
            -- {t("app_tipoTramite_form_registrar_select_dependecia")} --{" "}
          </option>
          {this.state.dataDependencia.map((aux, id) => {
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

SelectDependencia.propTypes = {
  t: PropTypes.any,
  idSede: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default SelectDependencia;