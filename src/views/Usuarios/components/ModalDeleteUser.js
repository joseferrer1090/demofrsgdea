import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

class ModalDeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Eliminar usuario </ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para eliminar el usuario{" "}
            </p>

            <input
              className="form-control col-sm-6 offset-sm-3"
              type="text"
              placeholder=" "
              style={{ textAlign: "center" }}
            />
            <br />
            <p className="text-center text-danger">
              {" "}
              El usuario quedará eliminado de manera permanente{" "}
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

ModalDeleteUser.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeleteUser;
