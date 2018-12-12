import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditstate
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader> Conglomerado </ModalHeader>
          <ModalBody>
            <p> Contenido del modal Editar </p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired
};

export default ModalEditConglomerado;
