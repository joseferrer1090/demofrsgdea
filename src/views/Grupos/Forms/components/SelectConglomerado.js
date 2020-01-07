import React from "react";
import PropTypes from "prop-types";
import { CONGLOMERATES_STATUS } from "./../../../../services/EndPoints";

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerado: [],
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
    fetch(CONGLOMERATES_STATUS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          // onChange={e => setFieldValue("conglomerado", e)}
          value={this.props.value}
          // onBlur={this.handleBlur}
          className={this.props.className}
        >
          <option value={""}>
            -- {t("app_grupoUsuarios_form_registrar_select_conglomerado")} --
          </option>
          {this.state.dataConglomerado.map((aux, id) => {
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
SelectConglomerado.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectConglomerado;
