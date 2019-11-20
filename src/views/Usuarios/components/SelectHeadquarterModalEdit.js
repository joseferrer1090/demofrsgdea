import React from "react";
import PropTypes from "prop-types";

class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.usuario_company,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.usuario_company !== state.id) {
      return {
        id: props.usuario_company
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.usuario_company !== prevProps.usuario_company) {
      this.getDataHeadquarter();
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.usuario_company}`,
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
          onBlur={this.props.onBlur}
        >
          <option value={""}>
            -- {t("app_usuarios_modal_editar_sede_select")} --
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
