import React from "react";
import PropTypes from "prop-types";
import { HEADQUARTER_BY_COMPANY } from "../../../services/EndPoints";

class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.company,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company !== state.id) {
      return {
        id: props.company
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
    if (this.props.company !== prevProps.company) {
      this.getDataHeadquarter();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(`${HEADQUARTER_BY_COMPANY}${this.props.company}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataHeadquarter: data
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
            -- {t("app_dependencia_form_actualizar_select_sede")} --
          </option>
          {this.state.dataHeadquarter.map((aux, id) => {
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
SelectHeadquarter.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectHeadquarter;
