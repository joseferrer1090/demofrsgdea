import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { PERMISSIONS_BY_PAGE_ENTITY } from "./../../../../../services/EndPoints";

class Assignedpermissions extends React.Component {
  state = {
    dataPermission: [],
    id: this.props.entidad,
    t: this.props.t,
    auth: this.props.authorization
  };
  //http://192.168.10.180:7000/api/sgdea/permission/page/entity/${this.state.id}

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

  // componentDidMount() {
  //   this.getPermissionById();
  // }

  getPermissionById = () => {
    fetch(`${PERMISSIONS_BY_PAGE_ENTITY}${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataPermission: data
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
        <Select
          name={this.props.name}
          options={this.state.dataPermission.map((aux, id) => {
            return { label: aux.name, value: aux.id };
          })}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={t("app_roles_form_registrar_asiganar_permisos_select")}
        />
      </div>
    );
  }
}
Assignedpermissions.propTypes = {
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};
export default Assignedpermissions;
