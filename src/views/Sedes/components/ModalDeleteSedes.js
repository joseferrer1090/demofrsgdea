import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PropTypes from "prop-types";

class ModalDeleteSedes extends Component {
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
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar Sede </ModalHeader>
          <ModalBody>
            <form className="form">
              <p className="text-center">
                {" "}
                Confirmar el <code> Nombre </code> para eliminar el conglomerado{" "}
              </p>

              <input
                className="form-control col-sm-6 offset-sm-3"
                type="text"
                placeholder="dato de eliminado"
                style={{ textAlign: "center" }}
              />
              <br />
              <p className="text-center text-danger">
                {" "}
                El conglomerado quedara elimando de manera permanente{" "}
              </p>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-outline-danger">
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </Button>
            <Button
              className="btn btn-outline-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalDeleteSedes.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeleteSedes;
