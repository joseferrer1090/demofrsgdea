import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalDeleteMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      auth: this.props.authorization,
      id: this.props.id
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Eliminar Metadato</ModalHeader>
        <ModalBody>
          <p>{this.props.id}</p>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cancelar
            </button>
            &nbsp;
            <button type="button" className="btn btn-secondary btn-sm">
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteMetadata.propTypes = {};

export default ModalDeleteMetadata;
