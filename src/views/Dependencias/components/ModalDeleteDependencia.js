import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

class ModalDeleteDependencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalDel
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
          <ModalHeader>Probando</ModalHeader>
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
            <Button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              Probando{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalDeleteDependencia.propTypes = {
  modalDel: PropTypes.bool.isRequired
};

export default ModalDeleteDependencia;
