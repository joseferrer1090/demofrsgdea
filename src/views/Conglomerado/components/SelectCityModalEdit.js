import React from "react";
import PropTypes from "prop-types";
import { CITIES_BY_DEPARTMENT } from "../../../services/EndPoints";

class SelectCity extends React.Component {
  state = {
    dataCity: [],
    id: this.props.conglomerate_department,
    t: this.props.t,
    auth: this.props.authorization,
    statusValue: this.props.statusValue,
    countryId: this.props.conglomerate_country
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerate_department !== state.id) {
      return {
        id: props.conglomerate_department
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
      this.props.conglomerate_department !== prevProps.conglomerate_department
    ) {
      this.getDataCitys();
    }
    if (this.props.conglomerate_country !== prevProps.conglomerate_country) {
      this.getDataCitysChange();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }
  getDataCitysChange = () => {
    this.setState({
      dataCity: []
    });
  };
  componentDidMount() {
    this.getDataCitys();
  }

  getDataCitys = () => {
    fetch(`${CITIES_BY_DEPARTMENT}${this.state.id}`, {
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
      .catch(err => {
        console.log("Error", err);
        this.setState({ dataCity: [] });
      });
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
            -- {t("app_conglomerado_modal_actualizar_ciudad_select")} --
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
  t: PropTypes.any
};

export default SelectCity;
