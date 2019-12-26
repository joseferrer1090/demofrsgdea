import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class ModalDeleteMultipleIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldeletemultiple
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
          <ModalHeader> Eliminar plantilla de datos </ModalHeader>
          <ModalBody>
            <form className="form">
              {/* <p className="text-center">
                {" "}
                Confirmar el <code> Nombre </code> para la plantilla de datos{" "}
              </p> */}
              <p className="text-center"> LOS ID DE CADA INDICE </p>

              <p className="text-center text-danger">
                {" "}
                La plantilla de datos quedara sin indices en su interior.{" "}
              </p>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger btn-sm">
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalDeleteMultipleIndex;
