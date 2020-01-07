import React from "react";
import PropTypes from "prop-types";
import { CONGLOMERATES_STATUS } from "../../../services/EndPoints";

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerate: [],
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

  getData = () => {
    fetch(`${CONGLOMERATES_STATUS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange("conglomerate", value);
  };

  handleBlur = () => {
    this.props.onBlur("conglomerateId", true);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          <option value={""}>
            -- {t("app_dependencia_form_actualizar_select_conglomerado")} --
          </option>
          {this.state.dataConglomerate.map((aux, id) => {
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
