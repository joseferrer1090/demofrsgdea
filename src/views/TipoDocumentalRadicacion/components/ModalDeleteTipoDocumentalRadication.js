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

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      auth: this.props.authorization
    }));
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader> Eliminar tipo documental de radicación </ModalHeader>
        <ModalBody>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para eliminar el tipo
              documental de radicación{" "}
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
              El tipo documental de radicación quedará eliminada de manera
              permanente.{" "}
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
  modaldelte: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalDeleteTramite;
