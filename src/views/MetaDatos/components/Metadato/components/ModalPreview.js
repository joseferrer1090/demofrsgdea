import React, { Component, cloneElement } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes, { element } from "prop-types";
import { compose } from "redux";

class ModalPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPreview: this.props.modalpreview,
      type: this.props.inputType,
      field: this.props.field
    };
  }
  toggle = () => {
    this.setState({
      modalPreview: !this.state.modalPreview
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.inputType !== state.type) {
      return {
        type: props.inputType
      };
    } else if (props.field !== state.field) {
      return {
        field: props.field
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.inputType !== prevProps.inputType) {
      this.setState({
        type: this.props.inputType
      });
    } else if (this.props.field !== prevProps.field) {
      this.setState({
        field: this.props.field
      });
    }
  }

  renderType = data => {
    let component;
    if (data === undefined) {
      component = (
        <div className="text-center text-danger">
          {" "}
          error en la vista previa{" "}
        </div>
      );
    } else if (data.type === "Text" || data.type === "text") {
      component = (
        <div
          className="col-md-12"
          style={{ border: "1px solid #c8ced3", padding: "10px " }}
        >
          <div className="form-group">
            <label>{data.title}</label>
            <input
              name={data.name}
              type={data.type}
              className="form-control form-control-sm"
              defaultValue={data.defaultValue}
              placeholder={data.placeholder}
            />
            <small className="form-text text-muted">{data.helpertext}</small>
          </div>
        </div>
      );
    }
    return component;
  };

  render() {
    const aux = this.state.field;
    return (
      <Modal isOpen={this.state.modalPreview} toggle={this.toggle}>
        <ModalHeader>
          {" "}
          Metadato {aux.name ? aux.name : "Nombre del metadado"}{" "}
        </ModalHeader>
        <ModalBody>
          <p className="text-justify">
            El siguiente campo se visible en el formulario de radicacion, cuando
            el usuario seleccione la plantilla, donde este campo este
            configurado.
          </p>
          {this.renderType(aux)}
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              className="btn btn-secondary btn-sm"
              onClick={e => {
                this.setState({ modalPreview: false });
              }}
            >
              <i className="fa fa-times" style={{ color: "red" }} /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalPreview.propType = {
  inputType: PropTypes.string,
  modalpreview: PropTypes.bool.isRequired
};

export default ModalPreview;
