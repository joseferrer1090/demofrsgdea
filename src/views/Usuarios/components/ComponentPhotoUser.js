import React, { Component } from "react";
import PropTypes from "prop-types";
import { USER_PHOTO } from "./../../../services/EndPoints";

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
    console.log(this.state.photo);
    return (
      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            {/* <svg className="glyph stroked download">
              <use xlinkHref="#stroked-download" />
            </svg>
            Cambiar Imagen */}
          </div>
          <div className="previewComponent">
            <div className="row">
              <form onSubmit={e => this._handleSubmit(e)}>
                <div className="col-md-3">
                  <div>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={"fileUploader"}
                    />
                    <input
                      type="button"
                      className="btn btn-secondary btn-sm"
                      defaultValue="Browse..."
                      onClick={() => {
                        this.refs.fileUploader.click();
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="imgPreview">{$imagePreview}</div> */}
          </div>
          {/* <button
            className="submitButton"
            type="submit"
            onClick={e => this._handleSubmit(e)}
          >
            Aceptar cambios
          </button> */}
        </div>
      </div>
    );
  }
}

export default ComponentPhotoUser;
