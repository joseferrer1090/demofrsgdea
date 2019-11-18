import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

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
    const { errorMessage } = this.props;
    const { file, imagePreviewUrl } = this.state;

    let comp = null;

    if (errorMessage) {
      comp = <div style={{ fontSize: 36 }}>error_outline</div>;
    } else if (file) {
      comp = (
        <img
          className="img"
          src={imagePreviewUrl}
          alt="..."
          className={'img-thumbnail'}
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

  render() {
    const { name } = this.props.field;
    const { t } = this.props;
    return (
      <div className={'container'}>
        <div style={{ marginTop: '-20px' }}>
          {this.state.imagePreviewUrl ? (
            this.showPreloadImage()
          ) : (
            <img
              src={'https://via.placeholder.com/550?text=sgdea+perfil'}
              className="img-thumbnail img-fluid"
            />
          )}
        </div>
        <br />
        <input
          style={{ display: 'none' }}
          className={''}
          id={name}
          name={name}
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
        />

        <button
          type="button"
          onClick={this.showFileUpload}
          className={'btn btn-secondary btn-sm'}
        >
          <i className={'fa fa-camera'} />{' '}
          {t('app_usuarios_form_registrar_boton_cargar_imagen')}{' '}
        </button>
      </div>
    );
  }
}

export default withTranslation('translations')(CustomImageInput);
