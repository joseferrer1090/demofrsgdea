import React, { Component } from "react";
import PropTypes from "prop-types";
import { USER_PHOTO } from "./../../services/EndPoints";

class PhotoAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popOverOpen_Actualizar: false,
      popOverOpen: false,
      auth: this.props.authorization,
      idUser: this.props.id,
      file: "",
      imagePreviewUrl: "",
      photo: "",
      alertSuccess: false,
      alertError500: false,
      alertError400: false,
      t: this.props.t
    };
  }

  static getDerivedStaticFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        idUser: props.id
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
    if (this.props.id !== prevProps.id) {
      this.setState({
        idUser: this.props.id
      });
      setTimeout(() => {
        this.getPhoto(this.state.idUser);
      }, 1000);
    }
  }

  getPhoto = id => {
    fetch(`${USER_PHOTO}${id}`, {
      method: "GET"
    })
      .then(response => response.text())
      .then(data => {
        this.setState({
          photo: data
        });
      })
      .catch(err => console.log(`err => ${err}`));
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreviewUrl = null;
    if (imagePreviewUrl) {
      $imagePreviewUrl = (
        <img
          // src={"../../assets/img/avatars/user2.jpg"}
          // src={"../../assets/img/GESTIONDOCUMENTAL.jpg"}
          src={imagePreviewUrl}
          className="img-avatar"
          alt="administratos@image"
        />
      );
    } else {
      $imagePreviewUrl = (
        <img
          className="img-avatar"
          src={this.state.photo}
          //   alt="administratos@image"
        />
      );
    }

    return $imagePreviewUrl;
  }
}

export default PhotoAvatar;
