import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { PERMISSIONS_BY_PAGE_ENTITY } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class PermisosAsignados extends React.Component {
  state = {
    dataPermisos: [],
    id: this.props.entidad,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.entidad !== state.id) {
      return {
        id: props.entidad
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.entidad !== prevProps.entidad) {
      this.getPermissionById();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  componentDidMount() {
    this.getPermissionById();
  }

  getPermissionById = () => {
    const token = this.state.auth;
    const username = decode(token);
    fetch(
      `${PERMISSIONS_BY_PAGE_ENTITY}${this.state.id}?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataPermisos: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  handleChange = value => {
    this.props.onChange("permisos", value);
  };

  handleBlur = () => {
    this.props.onBlur("permisos", true);
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <Select
            name={this.props.name}
            options={this.state.dataPermisos.map((aux, id) => {
              return { label: aux.name, value: aux.id };
            })}
            isMulti
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
            placeholder={t("app_roles_form_registrar_asiganar_permisos_select")}
          />
        </div>
      </div>
    );
  }
}
PermisosAsignados.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default PermisosAsignados;
