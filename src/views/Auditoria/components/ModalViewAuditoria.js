import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

class ModalViewAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <p> Probando </p>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewAuditoria.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewAuditoria;
