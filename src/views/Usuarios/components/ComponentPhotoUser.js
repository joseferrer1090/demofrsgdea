import React, { Component } from "react";
import PropTypes from "prop-types";
import { USER_PHOTO } from "./../../../services/EndPoints";

class ComponentPhotoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      idUser: this.props.id,
      photo: {}
    };
  }

  componentDidMount() {
    this.getDataPhotoUser(this.props.id);
  }

  getDataPhotoUser = id => {
    fetch(`${USER_PHOTO}${id}`, {
      method: "GET"
    })
      .then(response => response.text())
      .then(data => {
        this.setState({
          photo: data
        });
      })
      .catch(err => console.log("error", err));
  };

  render() {
    const { photo } = this.state;
    return (
      <div>
        <img
          className="img-thumbnail"
          src={`data:text/plain;chartset=UTF-8;${photo}`}
        />
      </div>
    );
  }
}

export default ComponentPhotoUser;
