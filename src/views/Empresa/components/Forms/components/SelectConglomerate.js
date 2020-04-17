import React from "react";
import PropTypes from "prop-types";
import { CONGLOMERATES_STATUS } from "../../../../../services/EndPoints";

class SelectConglomerate extends React.Component {
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
      this.setState(
        {
          auth: this.props.authorization
        },
        () => this.getData()
      );
    }
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
      })
      .catch(Error => console.log(" ", Error));
  };

  handleChange = value => {
    this.props.onChange("conglomerateId", value);
  };

  handleBlur = () => {
    this.props.onBlur("conglomerateId", true);
  };

  render() {
    const { t } = this.props;
    const dataConglomerate = this.state.dataConglomerate;
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
            -- {t("app_empresa_form_registrar_select_conglomerado")} --
          </option>
          {dataConglomerate.map((aux, id) => {
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
SelectConglomerate.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectConglomerate;
