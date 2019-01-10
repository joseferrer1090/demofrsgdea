import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import PropType from "prop-types";

class ModalDeleteRoles extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: this.props.modaldelete };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Eliminar roles </ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para eliminar el rol{" "}
            </p>

            <input
              className="form-control col-sm-6 offset-sm-3"
              type="text"
              placeholder=""
              style={{ textAlign: "center" }}
            />
            <br />
            <p className="text-center text-danger">
              {" "}
              El rol quedará eliminado de manera permanente.{" "}
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-outline-danger">
            {" "}
            <i className="fa fa-trash" /> Eliminar{" "}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteRoles.propType = {
  modaldelete: PropType.bool.isRequired
};

export default ModalDeleteRoles;
