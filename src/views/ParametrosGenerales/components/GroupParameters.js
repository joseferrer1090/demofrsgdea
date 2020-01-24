import React from "react";
import PropTypes from "prop-types";
import {} from "./../../../services/EndPoints";

class GroupParameters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.moduleID,
      auth: this.props.authorization
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.moduleID
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.moduleID !== prevProps.moduleID) {
      // METODO
      this.getDataParameter(this.props.moduleID);
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.moduleID
      });
    }
  }

  getDataParameter = id => {};

  render() {
    console.log(this.props);
    return (
      <div>
        <p className="text-center">Informacion del grupo de parametros</p>
      </div>
    );
  }
}

export default GroupParameters;
