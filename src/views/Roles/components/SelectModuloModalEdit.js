import React from "react";
import PropTypes from "prop-types";
import { MODULE_ALL } from "./../../../services/EndPoints";

class SelectModulo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataModule: [],
      t: this.props.t,
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  componentDidMount() {
    this.getDataModulos();
  }

  getDataModulos = () => {
    fetch(`${MODULE_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataModule: data
        });
      })
      .catch(err => console.log("", err));
  };

  handleChange = value => {
    this.props.onChange("modulos", value);
  };

  handleBlur = () => {
    this.props.onBlur("modulos", true);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          className="form-control form-control-sm"
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          name={this.props.name}
          value={this.props.value}
        >
          <option value={0}>
            {" "}
            -- {t("app_roles_form_registrar_modulo_select")} --{" "}
          </option>
          {this.state.dataModule.map((aux, id) => {
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
SelectModulo.porpTypes = {
  t: PropTypes.any
};
export default SelectModulo;
