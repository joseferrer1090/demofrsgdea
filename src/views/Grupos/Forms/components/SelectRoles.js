import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { USERS_BY_DEPENDENCE } from "./../../../../services/EndPoints";

class MySelect extends React.Component {
  state = {
    dataUsersDependencia: [],
    id: this.props.idDependence,
    username: "jferrer",
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.idDependence !== state.id) {
      return {
        id: props.idDependence
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
    if (this.props.idDependence !== prevProps.idDependence) {
      this.getDataUserDependenceList();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState(
        {
          auth: this.props.authorization
        },
        this.getDataUserDependenceList()
      );
    }
  }

  getDataUserDependenceList = () => {
    fetch(`${USERS_BY_DEPENDENCE}${this.props.idDependence}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataUsersDependencia: data
        });
        //console.log(data);
      })
      .catch(err => console.log("Error", err));
  };

  // Lista de usuarios por la dependencia //

  handleChange = value => {
    this.props.onChange("roles", value);
  };

  handleBlur = () => {
    this.props.onBlur("roles", true);
  };

  render() {
    const { t } = this.props;
    return (
      <div style={{ margin: "0" }}>
        <Select
          name={this.props.name}
          options={this.state.dataUsersDependencia.map((aux, id) => {
            return { label: aux.name, value: aux.id };
          })}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={t(
            "app_grupoUsuarios_form_registrar_placeholder_usuarios_asigandos"
          )}
        />
        {/* {!!this.props.error && this.props.touched && (
            <div
              style={{ color: "red", marginTop: ".5rem" }}
              className="invalid-feedback"
            >
              {this.props.error}
            </div>
          )} */}
      </div>
    );
  }
}
MySelect.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default MySelect;
