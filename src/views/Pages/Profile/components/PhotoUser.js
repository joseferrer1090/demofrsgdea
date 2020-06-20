import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  USER_PHOTO,
  USER_UPLOAD_PHOTO,
} from "./../../../../services/EndPoints";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { Alert, Col, Row, Popover, PopoverHeader, Spinner } from "reactstrap";

class PhotoUser extends Component {
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
      t: this.props.t,
      spinner: true,
    };
  }

  static getDerivedStaticFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    if (props.id !== state.id) {
      return {
        idUser: props.id,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
    if (this.props.id !== prevProps.id) {
      this.setState({
        idUser: this.props.id,
      });
      setTimeout(() => {
        this.getPhoto(this.state.idUser);
      }, 1000);
    }
  }

  getPhoto = (id) => {
    fetch(`${USER_PHOTO}${id}`, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        this.setState({
          photo: data,
          spinner: false,
        });
      })
      .catch((err) => console.log(`err => ${err}`));
  };

  _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  _handleSubmit = (e) => {
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
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          this.setState({
            alertSuccess: true,
          });
          setTimeout(() => {
            this.setState({
              alertSuccess: false,
            });
          }, 3000);
        }
      })
      .catch((error) => {
        // console.log(` ${error.response.status}`);
        if (error.response.status === 400) {
          this.setState({
            alertError400: true,
          });
          setTimeout(() => {
            this.setState({
              alertError400: false,
            });
          }, 3000);
        } else if (error.response.status === 500) {
          this.setState({
            alertError500: true,
          });
          setTimeout(() => {
            this.setState({
              alertError500: false,
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
        <div align="center" style={{ marginTop: "20px" }}>
          {" "}
          <img
            className="img-thumbnail d-block aling-item"
            src={imagePreviewUrl}
            width={"160px"}
          />
        </div>
      );
    } else {
      $imagePreviewUrl = (
        <div align="center" style={{ marginTop: "20px" }}>
          <img
            className="img-thumbnail d-block"
            src={this.state.photo}
            width={"160px"}
          />
        </div>
      );
    }
    const { t } = this.state;
    return (
      <div>
        <form
          onSubmit={(e) => this._handleSubmit(e)}
          encType={"multipart/form-data"}
        >
          {this.state.spinner !== false ? (
            <center>
              <br />
              <Spinner
                style={{ width: "3rem", height: "3rem" }}
                type="grow"
                color="primary"
              />
            </center>
          ) : (
            <Fragment>
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
              <Row>
                <Col md="12">
                  {" "}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={"uploadFile"}
                    onChange={(e) => this._handleImageChange(e)}
                  />
                  {$imagePreviewUrl}
                </Col>
              </Row>
              &nbsp;
              <div align="center">
                <button
                  id="Popover1"
                  className="btn btn-primary btn-sm"
                  data-hover="hover"
                  onClick={() => {
                    this.refs.uploadFile.click();
                  }}
                  onMouseOver={() => {
                    this.setState({
                      popOverOpen: true,
                    });
                  }}
                  onMouseLeave={() => {
                    this.setState({
                      popOverOpen: false,
                    });
                  }}
                >
                  {" "}
                  <i className="fa fa-image" />{" "}
                </button>
                <Popover
                  placement="bottom"
                  isOpen={this.state.popOverOpen}
                  target="Popover1"
                >
                  <PopoverHeader>Cambiar imagen</PopoverHeader>
                </Popover>
                &nbsp;
                <button
                  id="Popover2"
                  type="submit"
                  className="btn btn-primary btn-sm"
                  data-hover="hover"
                  onMouseOver={() => {
                    this.setState({
                      popOverOpen_Actualizar: true,
                    });
                  }}
                  onMouseLeave={() => {
                    this.setState({
                      popOverOpen_Actualizar: false,
                    });
                  }}
                >
                  {" "}
                  <i className="fa fa-upload" />{" "}
                </button>
                <Popover
                  placement="bottom"
                  isOpen={this.state.popOverOpen_Actualizar}
                  target="Popover2"
                  // toggle={toggle}
                >
                  <PopoverHeader>Actualizar imagen</PopoverHeader>
                </Popover>
              </div>
            </Fragment>
          )}
        </form>
      </div>
    );
  }
}

export default PhotoUser;
