import React from "react";
import PropTypes from "prop-types";
import { privateName } from "@babel/types";

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerado: [],
    t: this.props.t
  };

  componentDidMount() {
    this.getDataConglomerado();
  }

  getDataConglomerado = () => {
    fetch(`http://192.168.20.187:7000/api/sgdea/conglomerate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  handleChange = value => {
    this.props.onChange("conglomerado", value);
  };

  handleBlur = () => {
    this.props.onBlur("conglomerado", true);
  };

  render() {
    const data = this.state.dataConglomerado;
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={" "}>
            -- {t("app_tipoTramite_form_registrar_select_conglomerado")} --
          </option>
          {data.map((aux, id) => {
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
  t: PropTypes.any
};
export default SelectConglomerado;
