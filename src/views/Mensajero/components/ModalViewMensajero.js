import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalViewMensajero extends Component {
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
        <Modal>
          <ModalHeader>Probando</ModalHeader>
          <ModalBody>
            <p>Probando</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-secondary">
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewMensajero.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewMensajero;
