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
    console.log(this.state.file);
    let { imagePreviewUrl } = this.state;
    let $imagePreviewUrl = null;
    if (imagePreviewUrl) {
      $imagePreviewUrl = (
        <img className="img-thumbnail" src={imagePreviewUrl} />
      );
    } else {
      $imagePreviewUrl = (
        <img className="img-thumbnail" src={this.state.photo} />
      );
    }
    return (
      <div>
        <form>
          <input
            type="file"
            style={{ display: "none" }}
            ref={"uploadFile"}
            onChange={e => this._handleImageChange(e)}
          />
          {$imagePreviewUrl}
          <button
            type="button"
            className="btn btn-secondary btn-sm btn-block"
            onClick={() => {
              this.refs.uploadFile.click();
            }}
          >
            <i className="fa fa-image" /> Cambiar imagen
          </button>
        </form>
      </div>
    );
  }
}

export default ComponentPhotoUser;
