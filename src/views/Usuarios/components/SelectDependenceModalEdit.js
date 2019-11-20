import React from "react";
import PropTypes from "prop-types";

class SelectDependence extends React.Component {
  state = {
    dataDependence: [],
    id: this.props.usuario_headquarter,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.usuario_headquarter !== state.id) {
      return {
        id: props.usuario_headquarter
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.usuario_headquarter !== prevProps.usuario_headquarter) {
      this.getDataDependence();
    }
  }

  componentDidMount() {
    this.getDataDependence();
  }

  getDataDependence = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/headquarter/${this.props.usuario_headquarter}`,
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
          dataDependence: data
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
          className={this.props.className}
          onBlur={this.props.onBlur}
        >
          <option value={""}>
            -- {t("app_usuarios_modal_editar_dependencia_select")} --
          </option>
          {this.state.dataDependence.map((aux, id) => {
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
SelectDependence.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};
export default SelectDependence;
