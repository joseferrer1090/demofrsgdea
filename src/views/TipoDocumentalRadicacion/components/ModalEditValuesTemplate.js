import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditValuesTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      auth: this.props.authorization,
      type: this.props.typeinput,
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
        <ModalHeader>Editar Valor de la plantilla</ModalHeader>
        <ModalBody>
          <p>Probando apenas</p>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary btn-sm">
            {" "}
            Editar
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() =>
              this.setState({
                modal: false,
              })
            }
          >
            {" "}
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditValuesTemplate.propTypes = {};

export default ModalEditValuesTemplate;
