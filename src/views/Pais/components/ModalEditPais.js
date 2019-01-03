import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";

class ModalEditPais extends Component {
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
          <ModalHeader> Probando </ModalHeader>
          <ModalBody>
            <p>Probando</p>
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

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditPais;
