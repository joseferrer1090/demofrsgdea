import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalEditTipoLlegada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
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
          <ModalHeader>Probando</ModalHeader>
          <ModalBody>
            <p>Probando</p>
          </ModalBody>
          <ModalFooter>
            <div className="float-right">
              <button className="btn btn-success btn-sm">
                <i className="fa fa-pencil" /> Actualizar
              </button>
              <button className="btn btn-secondary btn-sm">
                <i className="fa fa-times" /> Cerrar
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditTipoLlegada.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditTipoLlegada;
