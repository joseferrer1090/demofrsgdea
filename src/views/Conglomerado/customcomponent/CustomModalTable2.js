import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CustomModalTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalcustom2
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
        <ModalHeader> Personalizar tabla </ModalHeader>
        <ModalBody>
          <p> Probando </p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary">
            {" "}
            <i className="fa fa-pencil" /> Personalizar{" "}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

CustomModalTable2.propTypes = {
  modalcustom2: PropTypes.bool.isRequired
};

export default CustomModalTable2;
