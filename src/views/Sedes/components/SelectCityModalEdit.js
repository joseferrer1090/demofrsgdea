import React from "react";
import PropTypes from "prop-types";
import { CITIES_BY_DEPARTMENT } from "../../../services/EndPoints";

class SelectCity extends React.Component {
  state = {
    dataCity: [],
    id: this.props.headquarter_department,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.headquarter_department !== state.id) {
      return {
        id: props.headquarter_department
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
    if (
      this.props.headquarter_department !== prevProps.headquarter_department
    ) {
      this.getDataCitys();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  componentDidMount() {
    this.getDataCitys();
  }

  getDataCitys = () => {
    fetch(`${CITIES_BY_DEPARTMENT}${this.props.headquarter_department}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCity: data
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
            -- {t("app_sedes_form_actualizar_select_ciudad")} --
          </option>
          {this.state.dataCity.map((aux, id) => {
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
SelectCity.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.array,
  authorization: PropTypes.string.isRequired
};
export default SelectCity;
