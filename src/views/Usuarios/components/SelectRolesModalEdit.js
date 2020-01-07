import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { ROLES_STATUS_ACTIVE } from "../../../services/EndPoints";

class MySelect extends React.Component {
  state = {
    dataRoles: [],
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
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let url = `${ROLES_STATUS_ACTIVE}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.auth
      }
    });
    const data = await response.json();
    this.setState({
      dataRoles: data
    });
  };

  handleChange = value => {
    this.props.onChange("roles", value);
  };

  handleBlur = () => {
    this.props.onBlur("roles", true);
  };

  render() {
    const aux = this.state.dataRoles.map((aux, id) => {
      return {
        label: aux.name,
        value: aux.id
      };
    });
    const { t } = this.props;
    return (
      <div style={{ margin: "0" }}>
        <Select
          name={this.props.name}
          options={aux}
          isMulti
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          placeholder={`-- ${t("app_usuarios_modal_editar_roles_select")} --`}
        />
      </div>
    );
  }
}
MySelect.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default MySelect;
