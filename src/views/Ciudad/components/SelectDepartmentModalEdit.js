import React from "react";
import PropTypes from "prop-types";
import { DEPARTMENTS_BY_COUNTRY } from "../../../services/EndPoints";

class SelectDepartment extends React.Component {
  state = {
    dataDepartment: [],
    id: this.props.city_country,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.city_country !== state.id) {
      return {
        id: props.city_country
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
    if (this.props.city_country !== prevProps.city_country) {
      this.getDataDepartment();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  componentDidMount() {
    this.getDataDepartment();
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
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option value={""}>
            -- {t("app_ciudad_modal_actualizar_departamento")} --
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
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};
export default SelectDepartment;
