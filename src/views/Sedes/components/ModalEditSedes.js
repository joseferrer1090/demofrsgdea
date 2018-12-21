import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditSedes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
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
          <ModalHeader> Editar Sede </ModalHeader>
          <ModalBody>
            <p>Probando</p>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-secondary">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            <button className="btn btn-secondary">
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditSedes;
