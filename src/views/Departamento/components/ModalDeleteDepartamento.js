import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";

class ModalDeleteDepartamento extends Component {
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
          <ModalHeader> Eliminar departamento </ModalHeader>
          <ModalBody>
            <form className="form">
              <p className="text-center">
                {" "}
                Confirmar el <code> Nombre </code> para eliminar el departamento{" "}
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
                El departamento quedará elimando de manera permanente{" "}
              </p>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-danger">
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
            <button
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
      </div>
    );
  }
}

ModalDeleteDepartamento.propTypes = {
  modaldel: PropTypes.bool.isRequired
};

export default ModalDeleteDepartamento;
