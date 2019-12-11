import React from "react";
import PropTypes from "prop-types";

class SelectSedes extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.company,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company !== state.id) {
      return {
        company: props.company
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.company !== prevProps.company) {
      // metodo del fetch()
      this.getDataHeadquarter();
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.company}`,
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
            -- {t("app_grupoUsuarios_form_registrar_select_sede")} --{" "}
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
SelectSedes.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};
export default SelectSedes;