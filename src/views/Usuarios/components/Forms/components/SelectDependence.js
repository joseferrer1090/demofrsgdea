import React from "react";
import PropTypes from "prop-types";
import { DEPENDENCIES_BY_HEADQUARTER } from "../../../../../services/EndPoints";

class SelectDependence extends React.Component {
  state = {
    dataDependence: [],
    id: this.props.headquarter,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.headquarter !== state.id) {
      return {
        headquarter: props.headquarter
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
    if (this.props.headquarter !== prevProps.headquarter) {
      // metodo del fetch()
      this.getDataDependence();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState(
        {
          auth: this.props.authorization
        },
        this.getDataDependence()
      );
    }
  }
  getDataDependence = () => {
    fetch(`${DEPENDENCIES_BY_HEADQUARTER}${this.props.headquarter}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data
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
          className={this.props.className}
        >
          <option value={""}>
            -- {t("app_usuarios_form_registrar_dependencia_select")} --
          </option>
          {this.state.dataDependence.map((aux, id) => {
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

SelectDependence.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectDependence;
