import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditIndexText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledittext,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Probando apenas</ModalHeader>
        <ModalBody>
          <p>probando apenas mi idea</p>
        </ModalBody>
        <ModalFooter>
          <div className="float-right">
            <button
              type="button"
              onClick={() => {
                this.setState({
                  modal: false,
                });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEditIndexText;
