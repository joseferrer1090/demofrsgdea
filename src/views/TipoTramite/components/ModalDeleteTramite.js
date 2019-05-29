import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PropTypes from "prop-types";

class ModalDeleteTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Eliminar sede </ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para eliminar el sede{" "}
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
              La sede quedará eliminada de manera permanente.{" "}
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" className="btn btn-danger">
            {" "}
            <i className="fa fa-trash" /> Eliminar{" "}
          </Button>
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            <i className="fa fa-times" /> Cerrar{" "}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteTramite.propTypes = {
  modaldelte: PropTypes.bool.isRequired
};

export default ModalDeleteTramite;
