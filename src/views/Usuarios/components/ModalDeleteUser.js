import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalDeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel
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
        <ModalHeader> Probando </ModalHeader>
        <ModalBody>
          <p> Probando </p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary"> Cerrar </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteUser.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeleteUser;
