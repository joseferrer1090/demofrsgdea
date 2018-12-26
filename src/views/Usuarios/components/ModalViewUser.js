import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview
    };
  }

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Probando </ModalHeader>
        <ModalBody>
          <p>Probando</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary">
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalViewUser.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewUser;
