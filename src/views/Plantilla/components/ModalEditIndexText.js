import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Input from "./PreviewMetadata/Input";

class ModalEditIndexText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledittext,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>Editar valores del metadato</ModalHeader>
        <ModalBody>
          <p className=" alert alert-secondary">
            <i className="fa fa-exclamation-triangle" /> Los valores que se
            ingresen en el siguiente formulario solo afecta al valor por defecto
            que tendra el metadato en la plantilla asociada.
          </p>
          <form className="form">
            <div className="form-group">
              <label>Requerido</label>
              <input type="checkbox" />
            </div>
            <div className="form-group">
              <label>Formula</label>
              <input type="checkbox" />
            </div>
          </form>
          <Input formType="text" />
        </ModalBody>
        <ModalFooter>
          <div className="float-right">
            <button className="btn btn-outline-success btn-sm">
              {" "}
              <i className="fa fa-pencil" /> Editar metadato{" "}
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false,
                });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditIndexText.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default ModalEditIndexText;
