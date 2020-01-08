import React from "react";
import PropTypes from "prop-types";
import { HEADQUARTER_BY_COMPANY } from "./../../../../../services/EndPoints";

class SelectSede extends React.Component {
  state = {
    dataSede: [],
    id: this.props.idEmpresa,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFormProps(props, state) {
    if (props.idEmpresa !== state.id) {
      return {
        id: props.idEmpresa
      };
    }
    if (props.authorization !== state.authorization) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idEmpresa !== prevProps.idEmpresa) {
      // Metodo
      this.getDataSede();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.idEmpresa
      });
    }
  }

  // componentDidMount() {
  //   this.getDataSede();
  // }

  getDataSede = () => {
    fetch(`${HEADQUARTER_BY_COMPANY}${this.props.idEmpresa}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataSede: data
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
            -- {t("app_tipoTramite_form_registrar_select_sede")} --
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
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectSede;
