import React from "react";
import PropTypes from "prop-types";

class SelectCompany extends React.Component {
  state = {
    dataCompany: [],
    id: this.props.conglomerate,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerate !== state.id) {
      return {
        id: props.conglomerate
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conglomerate !== prevProps.conglomerate) {
      this.getDataCompany();
    }
  }

  componentDidMount() {
    this.getDataCompany();
  }

  getDataCompany = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/conglomerate/${this.state.id}`,
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
          dataCompany: data
        });
      })
      .catch(err => console.log("Error", err));
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option value={""}>
            -- {t("app_dependencia_form_actualizar_select_empresa")} --
          </option>
          {this.state.dataCompany.map((aux, id) => {
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
SelectCompany.propTypes = {
  t: PropTypes.any,
  id: PropTypes.string.isRequired
};
export default SelectCompany;
