import React from "react";
import PropTypes from "prop-types";

class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.audit_empresa,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.audit_empresa !== state.id) {
      return {
        id: props.audit_empresa
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.audit_empresa !== prevProps.audit_empresa) {
      this.getDataHeadquarter();
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.audit_empresa}`,
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
          dataHeadquarter: data
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
        >
          <option value={""}>
            -- {t("app_auditoria_modal_consultar_sede_select")} --
          </option>
          {this.state.dataHeadquarter.map((aux, id) => {
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
SelectHeadquarter.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};
export default SelectHeadquarter;
