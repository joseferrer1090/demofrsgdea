import React from "react";
import PropTypes from "prop-types";
import { ENTITIES_BY_MODULE } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class MySelectEntidades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataEntidades: [],
      id: this.props.modulo,
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
    if (props.modulo !== state.id) {
      return {
        id: props.modulo
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.modulo !== prevProps.modulo) {
      this.getDataEntity();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  // componentDidMount() {
  //   this.getDataEntity();
  // }

  getDataEntity = () => {
    const token = this.state.auth;
    const username = decode(token);

    fetch(`${ENTITIES_BY_MODULE}${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataEntidades: data
        });
        console.log(data);
      })
      .catch(err => console.log("Error", err));
  };

  handleChange = value => {
    this.props.onChange("entidad", value);
  };

  handleBlur = () => {
    this.props.onBlur("entidad", true);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
          value={this.props.value}
        >
          <option value={""}>
            -- {t("app_roles_form_registrar_entidades_select")} --
          </option>
          {this.state.dataEntidades.map((aux, id) => {
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
MySelectEntidades.propTypes = {
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};
export default MySelectEntidades;
