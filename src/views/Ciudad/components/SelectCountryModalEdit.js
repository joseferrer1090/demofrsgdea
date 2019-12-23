import React from "react";
import PropTypes from "prop-types";
import { CONTRIES_STATUS } from "./../../../services/EndPoints";

class SelectCountry extends React.Component {
  state = {
    dataCountry: [],
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
    fetch(`${CONTRIES_STATUS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCountry: data
        });
      })
      .catch(Error => console.log("", Error));
  };

  handleChange = value => {
    this.props.onChange("city_country", value);
  };

  handleBlur = () => {
    this.props.onBlur("city_country", true);
  };

  render() {
    console.log(this.state.auth);
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
            -- {t("app_ciudad_modal_actualizar_select_pais")} --
          </option>
          {this.state.dataCountry.map((aux, id) => {
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
SelectCountry.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectCountry;
