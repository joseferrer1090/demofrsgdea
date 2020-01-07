import React from "react";
import PropTypes from "prop-types";
import { CHARGES_STATUS } from "./../../../../../services/EndPoints";

class SelectCharges extends React.Component {
  state = {
    dataCharges: [],
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
    fetch(`${CHARGES_STATUS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCharges: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  handleChange = value => {
    this.props.onChange("company_charge", value);
  };

  handleBlur = () => {
    this.props.onBlur("company_charge", true);
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
            -- {t("app_conglomerado_form_select_cargo_responsable")} --
          </option>
          {this.state.dataCharges.map((aux, id) => {
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
SelectCharges.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectCharges;
