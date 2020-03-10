import React, { Component } from "react";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { METADATA_VIEW } from "./../../../../../services/EndPoints";

class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      id: this.props.idMetadata,
      data: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.idMetadata !== state.id) {
      return {
        id: props.idMetadata
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idMetadata !== prevProps.idMetadata) {
      this.setState({
        id: this.props.idMetadata,
        auth: this.props.authorization
      });
      this.getDataMetadata(this.state.id, this.state.auth);
    } else if (this.props.idMetadata === null || this.props.idMetadata === "") {
    }
    return;
  }

  getDataMetadata = (id, auth) => {
    const aux = auth;
    const username = decode(auth);
    fetch(`${METADATA_VIEW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + aux
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div>
        {this.state.id ? (
          <div>{this.state.id}</div>
        ) : (
          <div className="text-center">Seleccione un metadao</div>
        )}
      </div>
    );
  }
}

ViewComponent.propTypes = {
  idMetadata: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ViewComponent;
