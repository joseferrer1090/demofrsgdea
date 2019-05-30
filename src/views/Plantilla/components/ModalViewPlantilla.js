import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalViewPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Ver platilla de datos</ModalHeader>
          <ModalBody>
            <p>Probando apenas</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ModalViewPlantilla.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewPlantilla;
