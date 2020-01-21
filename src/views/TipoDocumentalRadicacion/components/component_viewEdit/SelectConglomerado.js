import React from "react";
import PropTypes from "prop-types";
import { CONGLOMERATES_STATUS } from "./../../../../services/EndPoints";

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerado: [],
    t: this.props.t,
    auth: this.props.authorization
  };
  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }
  componentDidMount() {
    // METODO PARA LA DATA
    this.getDataConglomerado();
  }

  getDataConglomerado = () => {
    fetch(`${CONGLOMERATES_STATUS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = value => {
    this.props.onChange("congolomerado", value);
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
          onChange={this.props.onchange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={" "}>-- Seleccione --</option>
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
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default SelectConglomerado;
