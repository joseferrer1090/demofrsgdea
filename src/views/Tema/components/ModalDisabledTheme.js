import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class ModalDisabledTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldisabled
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
        <ModalHeader>Deshabilitar tema</ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para deshabilitar el tema{" "}
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
              El tema quedará deshabilitado de manera permanente.{" "}
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-danger btn-sm">
              {" "}
              <i className="fa fa-power-off" /> Desactivar{" "}
            </button>
            &nbsp;
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDisabledTheme.propTypes = {
  modaldisabled: PropTypes.bool.isRequired
};

export default ModalDisabledTheme;
