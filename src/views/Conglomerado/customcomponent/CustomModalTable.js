import React, { Component } from "react";
import PropType from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CustomModalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalcustom
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
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
            type="button"
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

CustomModalTable.propType = {
  modal: PropType.bool.isRequired
};

export default CustomModalTable;
