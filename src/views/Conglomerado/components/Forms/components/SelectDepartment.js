import React from "react";
import PropTypes from "prop-types";

class SelectDepartment extends React.Component {
  state = {
    dataDepartment: [],
    id: this.props.countryId,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.countryId !== state.id) {
      return {
        id: props.countryId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.countryId !== prevProps.countryId) {
      this.getDataDepartment();
    }
  }

  componentDidMount() {
    this.getDataDepartment();
  }

  getDataDepartment = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/department/country/${this.state.id}`,
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
          dataDepartment: data
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
            -- {t("app_conglomerado_form_select_departamento")} --
          </option>
          {this.state.dataDepartment.map((aux, id) => {
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

SelectDepartment.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};

export default SelectDepartment;
