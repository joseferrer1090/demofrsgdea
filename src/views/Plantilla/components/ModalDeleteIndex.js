import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import {
  TEMPLATE_METADATA_BAG_DELETE,
  THIRDPARTYS_EXPORT,
} from "./../../../services/EndPoints";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";

class ModalDeletePlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldeleteindex,
      auth: this.props.authorization,
      id: this.props.id,
      alert200: false,
      alert400: false,
      alert500: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevState.id) {
      this.setState({
        id: this.props.id,
      });
    }
  }

  deleteMetadata = () => {
    const auth = this.props.authorization;
    const username = decode(auth);
    fetch(
      `${TEMPLATE_METADATA_BAG_DELETE}/${this.state.id}?username=${username.user_name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth,
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          this.setState({
            alert200: true,
          });
          setTimeout(() => {
            this.setState({
              alert200: false,
              modal: false,
            });
          }, 1300);
        } else if (response.status === 500) {
          this.setState({
            alert500: true,
          });
          setTimeout(() => {
            this.setState({
              alert500: false,
              modal: false,
            });
          }, 1300);
        } else if (response.status === 400) {
          this.setState({
            alert400: true,
          });
          setTimeout(() => {
            this.setState({
              alert400: false,
              modal: false,
            });
          }, 1300);
        }
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Eliminar metadato de la plantilla</ModalHeader>
        <ModalBody>
          <Alert color={"success"} isOpen={this.state.alert200}>
            <p>El metadato se elimino con exito de la plantilla</p>
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert400}>
            <p>Error => no se puede eliminar el metadato de la plantilla</p>
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert500}>
            <p>
              Error => el metadato no se puede eliminar porque existen registro
              con la plantilla
            </p>
          </Alert>
          <p className="text-center">
            ¿ Desesa Eliminar el metadato de la plantilla junto con su valores ?
          </p>
          {/* <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el <code> Nombre </code> para el índice de la planitilla{" "}
            </p>

            <input
              className="form-control col-sm-6 offset-sm-3 form-control-sm"
              type="text"
              placeholder=""
              style={{ textAlign: "center" }}
            />
            <br />
            <p className="text-center text-danger">
              {" "}
              El índice quedara eliminado de manera permanente.{" "}
            </p>
          </form> */}
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.deleteMetadata()}
          >
            {" "}
            <i className="fa fa-trash" /> Eliminar{" "}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeletePlantilla.propTypes = {
  modaldeleteindex: PropTypes.bool.isRequired,
};

export default ModalDeletePlantilla;
