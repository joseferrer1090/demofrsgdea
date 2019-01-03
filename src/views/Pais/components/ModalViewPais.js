import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap";

class ModalViewPais extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: this.props.modalview };
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
          <ModalHeader> Probando </ModalHeader>
          <ModalBody>
            <p>Probnado</p>
          </ModalBody>
          <ModalFooter>
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
      </div>
    );
  }
}

ModalViewPais.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewPais;
