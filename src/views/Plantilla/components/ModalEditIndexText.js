import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Input from "./PreviewMetadata/Input";
import { TEMPLATE_METADATA_BAG_VIEW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalEditIndexText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledittext,
      template: this.props.templateid,
      auth: this.props.authorization,
      metadata: this.props.metadataid,
    };
  }

  static DerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
        template: props.templateid,
        metadata: props.metadataid,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    } else if (this.props.metadataid !== prevProps.metadataid) {
      this.setState({
        metadata: this.props.metadataid,
      });
    } else if (this.props.templateid !== prevProps.templateid) {
      this.setState({
        template: this.props.templateid,
      });
    } else {
      return null;
    }
    this.getDataMetadata(this.state.metadata);
  }

  getDataMetadata = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(
      `${TEMPLATE_METADATA_BAG_VIEW}/${id}?username=${username.user_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    console.log(this.state.metadata);
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
