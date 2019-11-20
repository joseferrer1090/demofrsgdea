import React from "react";
import PropTypes from "prop-types";
class SelectDependencia extends React.Component {
  state = {
    dataDependencia: [],
    id: this.props.idSede,
    t: this.props.t
  };

  static getDerivedStateFormProps(props, state) {
    if (props.idSede !== state.id) {
      return {
        id: props.idSede
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idSede !== prevProps.idSede) {
      // Metodo para actualizar
      this.getDataDependencia();
    }
  }

  componentDidMount() {
    // metodo para refrezcer el compomente
    this.getDataDependencia();
  }

  getDataDependencia = () => {
    fetch(
      `http://192.168.20.187:7000/api/sgdea/dependence/headquarter/${this.props.idSede}`,
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
          dataDependencia: data
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
          <option>
            {" "}
            -- {t("app_tipoTramite_form_registrar_select_dependecia")} --{" "}
          </option>
          {this.state.dataDependencia.map((aux, id) => {
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
SelectDependencia.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};
export default SelectDependencia;
