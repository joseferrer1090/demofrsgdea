import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
class PermisosAsignados extends React.Component {
  state = {
    dataPermisos: [],
    id: this.props.entidad,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
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
  }

  componentDidMount() {
    this.getPermissionById();
  }

  getPermissionById = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/permission/page/entity/${this.state.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
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
  t: PropTypes.any
};
export default PermisosAsignados;
