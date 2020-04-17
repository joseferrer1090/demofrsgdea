import React, { Component } from "react";
import PropTypes from "prop-types";
import { USER_PHOTO, USER_UPLOAD_PHOTO } from "./../../../services/EndPoints";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { Alert } from "reactstrap";

class ComponentPhotoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    setTimeout(() => {
      this.getPhoto(this.state.idUser);
    }, 5000);
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
      .post(`${USER_UPLOAD_PHOTO}${this.props.id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            alertSuccess: true
          });
          setTimeout(() => {
            this.setState({
              alertSuccess: false
            });
          }, 2000);
        } else if (response.status === 400) {
          this.setState({
            alertError400: true
          });
          setTimeout(() => {
            this.setState({
              alertError400: false
            });
          }, 2000);
        } else if (response.status === 500) {
          this.setState({
            alertError500: true
          });
          setTimeout(() => {
            this.setState({
              alertError500: false
            });
          }, 2000);
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({
            alertError400: true
          });
          setTimeout(() => {
            this.setState({
              alertError400: false
            });
          }, 3000);
        } else if (error.response.status === 500) {
          this.setState({
            alertError500: true
          });
          setTimeout(() => {
            this.setState({
              alertError500: false
            });
          }, 3000);
        }
      });
  };

  render() {
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
    const { t } = this.state;
    return (
      <div>
        <form
          onSubmit={e => this._handleSubmit(e)}
          encType={"multipart/form-data"}
        >
          <Alert
            className={"text-center"}
            color="danger"
            isOpen={this.state.alertError500}
          >
            {t("app_usuarios_modal_actualizar_alert_error_500_image")}
          </Alert>
          <Alert
            className={"text-center"}
            color="success"
            isOpen={this.state.alertSuccess}
          >
            {t("app_usuarios_modal_actualizar_alert_success_image")}
          </Alert>
          <Alert
            className={"text-center"}
            color="danger"
            isOpen={this.state.alertError400}
          >
            {t("app_usuarios_modal_actualizar_alert_error_400_image")}
          </Alert>
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
            <i className="fa fa-image" />{" "}
            {t("app_usuarios_modal_editar_boton_cmabiar_imagen")}
          </button>
          <button
            type="submit"
            className="btn btn-outline-secondary btn-sm btn-block"
          >
            {" "}
            <i className="fa fa-upload" />{" "}
            {t("app_usuarios_modal_editar_boton_cargar_imagen")}{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default ComponentPhotoUser;
