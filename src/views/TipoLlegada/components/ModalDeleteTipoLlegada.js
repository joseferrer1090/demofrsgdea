import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalDeleteTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete
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
          <ModalHeader>Probando </ModalHeader>
          <ModalBody>
            <p>Probando</p>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger btn-sm">
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalDeleteTipoLlegada.propTypes = {
  modaldelete: PropTypes.bool.isRequired
};

export default ModalDeleteTipoLlegada;
