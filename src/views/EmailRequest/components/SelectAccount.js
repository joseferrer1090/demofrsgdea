import React from "react";
import PropTypes from "prop-types";
import { EMAIL_ACCOUNTS } from "./../../../services/EndPoints";

class SelectAccount extends React.Component {
  state = {
    dataEmailAccount: [],
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.getData();
    }, 1000);

    // console.log(this.state.auth);
  }
  getData = () => {
    fetch(`${EMAIL_ACCOUNTS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataEmailAccount: data
        });
      });
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={""}>-- Seleccione --</option>
          {this.state.dataEmailAccount.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.email}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
SelectAccount.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default SelectAccount;
