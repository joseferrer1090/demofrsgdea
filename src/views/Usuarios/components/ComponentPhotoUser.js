import React, { Component } from "react";
import PropTypes from "prop-types";
import { USER_PHOTO } from "./../../../services/EndPoints";
import axios from "axios";
import { decode } from "jsonwebtoken";

class ComponentPhotoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      idUser: this.props.id,
      file: "",
      imagePreviewUrl: "",
      photo: ""
    };
  }

  componentDidMount() {
    this.getPhoto(this.state.idUser);
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

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  _handleSubmit = e => {
    e.preventDefault();
    const token = this.state.auth;
    const username = decode(token);
    const formData = new FormData();
    formData.append("photo", this.state.file);
    formData.append("username", username.user_name);

    for (var value of formData.values()) {
      console.log(value);
    }
    axios
      .post(
        `http://192.168.20.187:8090/api/sgdea/service/configuration/users/photo/${this.props.id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          console.log("Se actualizo la imagen de perfil");
        } else if (response.status === 400) {
          console.log(" Se enviaron mal los datos  ");
        } else if (response.status === 500) {
          console.log(" Error no se puede cambiar la imagen de perfil  ");
        }
      })
      .catch(err => console.log(`err => ${err}`));
    //console.log(this.state.file);
  };

  // componentDidMount() {
  //   fetch(
  //     `http://192.168.10.180:8090/api/sgdea/service/configuration/users/photo/view/base64/0dd61056-02bb-4114-bb07-59f284cb50de`,
  //     {
  //       method: "GET"
  //     }
  //   )
  //     .then(response => response.text())
  //     .then(data => {
  //       this.setState({
  //         photo: data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    // console.log(this.state.photo);
    // console.log(this.state.file);
    let { imagePreviewUrl } = this.state;
    let $imagePreviewUrl = null;
    if (imagePreviewUrl) {
      $imagePreviewUrl = (
        <img
          className="img-thumbnail d-block"
          src={imagePreviewUrl}
          width={"160px"}
        />
      );
    } else {
      $imagePreviewUrl = (
        <img
          className="img-thumbnail d-block"
          src={this.state.photo}
          width={"160px"}
        />
      );
    }
    return (
      <div>
        <form
          onSubmit={e => this._handleSubmit(e)}
          encType={"multipart/form-data"}
        >
          <input
            type="file"
            style={{ display: "none" }}
            ref={"uploadFile"}
            onChange={e => this._handleImageChange(e)}
          />
          {$imagePreviewUrl}
          &nbsp;
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm btn-block"
            onClick={() => {
              this.refs.uploadFile.click();
            }}
          >
            <i className="fa fa-image" /> Cambiar imagen
          </button>
          <button
            type="submit"
            className="btn btn-outline-secondary btn-sm btn-block"
          >
            {" "}
            <i className="fa fa-upload" /> Cargar{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default ComponentPhotoUser;
