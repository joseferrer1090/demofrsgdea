import React from "react";
import PropTypes from "prop-types";
import { COMPANY_BY_CONGLOMERATE } from "./../../../../../services/EndPoints";

class SelectCompany extends React.Component {
  state = {
    dataEmpresa: [],
    id: this.props.idConglomerado,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.idConglomerado !== state.id) {
      return {
        id: props.idConglomerado
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
    if (this.props.idConglomerado !== prevProps.idConglomerado) {
      // METODO
      this.getDataEmpresa();
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState(
        {
          auth: this.props.authorization,
          id: this.props.idConglomerado
        },
        this.getDataEmpresa()
      );
    }
  }

  getDataEmpresa = () => {
    fetch(`${COMPANY_BY_CONGLOMERATE}${this.state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
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

SelectCompany.propTypes = {
  t: PropTypes.any,
  idConglomerado: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default SelectCompany;