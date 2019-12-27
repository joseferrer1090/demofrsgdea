import React from "react";
import PropTypes from "prop-types";
import { TYPETHIRDPARTYS_STATUS } from "../../../../../services/EndPoints";

class SelectTipoTercero extends React.Component {
  state = {
    dataTipoTercero: [],
    t: this.props.t,
    auth: this.props.authorization
  };
  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState(
        {
          auth: this.props.authorization
        },
        this.getData()
      );
    }
  }

  getData = () => {
    fetch(`${TYPETHIRDPARTYS_STATUS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataTipoTercero: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange("tipoTercero", value);
  };

  handleBlur = () => {
    this.props.onBlur("tipoTercero", true);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          className={this.props.className}
          onBlur={this.props.onBlur}
        >
          <option value={""}>
            -- {t("app_tercero_form_select_registrar_pais")} --
          </option>
          {this.state.dataTipoTercero.map((aux, id) => {
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
SelectTipoTercero.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectTipoTercero;
