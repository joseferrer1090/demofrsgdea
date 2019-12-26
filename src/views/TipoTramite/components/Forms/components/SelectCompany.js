import React from "react";
import PropTypes from "prop-types";

class SelectEmpresa extends React.Component {
  state = {
    dataEmpresa: [],
    id: this.props.idConglomerado,
    t: this.props.t
  };

  static getDerivedStateFormProps(props, state) {
    if (props.idConglomerado !== state.id) {
      return {
        id: props.idConglomerado
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idConglomerado !== prevProps.idConglomerado) {
      // Metodo
      this.getDataEmpresa();
    }
  }

  componentDidMount() {
    this.getDataEmpresa();
  }

  getDataEmpresa = () => {
    fetch(
      `http://192.168.20.187:7000/api/sgdea/company/conglomerate/${this.props.idConglomerado}`,
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
          dataEmpresa: data
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
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          <option value={" "}>
            {" "}
            -- {t("app_tipoTramite_form_registrar_select_empresa")} --{" "}
          </option>
          {this.state.dataEmpresa.map((aux, id) => {
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

SelectEmpresa.propTypes = {
  t: PropTypes.any
};
export default SelectEmpresa;
