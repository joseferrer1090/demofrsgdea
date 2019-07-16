import React, { Component } from "react";
import classnames from "classnames";

class CustomImageInput extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  state = {
    file: undefined,
    imagePreviewUrl: undefined
  };

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click();
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
      this.props.setFieldValue(this.props.field.name, file);
    }
  }

  showPreloadImage() {
    const { errorMessage, classes } = this.props;
    const { name } = this.props.field;
    const { file, imagePreviewUrl } = this.state;

    let comp = null;

    if (errorMessage) {
      comp = <div style={{ fontSize: 36 }}>error_outline</div>;
    } else if (file) {
      comp = (
        <img
          className="img"
          // src={`data:base64,${imagePreviewUrl}`}
          src={imagePreviewUrl}
          alt="..."
          className={"img-thumbnail"}
        />
      );
    } else {
      comp = (
        <div style={{ fontSize: 36 }}>
          <img src="" />
        </div>
      );
    }
    return comp;
  }

  // componentDidMount() {
  //   console.log(this.fileUpload.current);
  // }

  render() {
    const { errorMessage, title, classes } = this.props;
    const { name, onBlur } = this.props.field;
    // console.log(this.state.file);
    //  console.log(this.state.imagePreviewUrl);
    return (
      <div className={"container"}>
        <div style={{ marginTop: "-20px" }}>
          {this.state.imagePreviewUrl ? (
            this.showPreloadImage()
          ) : (
            <img
              src={"https://via.placeholder.com/550?text=sgdea+perfil"}
              className="img-thumbnail img-fluid"
            />
          )}
        </div>
        <br />
        <input
          style={{ display: "none" }}
          className={""}
          id={name}
          name={name}
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
          // onBlur={onBlur}
          //className="form-control"
        />

        <button
          onClick={this.showFileUpload}
          className={"btn btn-secondary btn-sm"}
        >
          <i className={"fa fa-camera"} /> cargar imagen{" "}
        </button>
      </div>
    );
  }
}

export default CustomImageInput;
