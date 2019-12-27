import React from "react";
import PropTypes from "prop-types";
import { DEPARTMENTS_BY_COUNTRY } from "../../../../../services/EndPoints";

class SelectDepartment extends React.Component {
  state = {
    dataDepartment: [],
    id: this.props.pais,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.pais !== state.id) {
      return {
        id: props.pais
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
    if (this.props.pais !== prevProps.pais) {
      this.getDataDepartment();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState(
        {
          auth: this.props.authorization
        },
        this.getDataDepartment()
      );
    }
  }

  getDataDepartment = () => {
    fetch(`${DEPARTMENTS_BY_COUNTRY}${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDepartment: data
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
          className={this.props.className}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        >
          <option value={""}>
            -- {t("app_tercero_form_registrar_select_departamento")} --
          </option>
          {this.state.dataDepartment.map((aux, id) => {
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
SelectDepartment.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectDepartment;
