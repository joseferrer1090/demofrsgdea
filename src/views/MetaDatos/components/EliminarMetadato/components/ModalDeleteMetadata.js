import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import PropTypes from "prop-types";
import {
  METADATA_VIEW,
  METADATA_DELETE
} from "./../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class ModalDeleteMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      auth: this.props.authorization,
      id: this.props.id,
      metadata: {},
      code: "",
      alert200: false,
      alert500: false,
      alert400: false,
      alertErrorMessage: "",
      alertError: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id,
        auth: this.props.authorization
      });
      this.getMetadata(this.state.id, this.state.auth);
    }
  }

  getMetadata = (id, auth) => {
    const aux = auth;
    const user = decode(aux);
    fetch(`${METADATA_VIEW}${id}?username=${user.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          metadata: data.metadata
        });
      })
      .catch(err => {
        console.log(`Error => ${err}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  sendData = () => {
    Yup.setLocale({});
    const schema = Yup.object().shape({
      code: Yup.string().required()
    });
    schema
      .validate({
        code: this.state.code
      })
      .then(() => {
        if (schema.isValid) {
          this.deleteMetadata();
        }
      })
      .catch(err => {
        this.setState({
          alertError: true,
          alertErrorMessage: err.message
        });
        setTimeout(() => {
          this.setState({
            alertError: false
          });
        }, 1500);
      });
  };

  deleteMetadata = () => {
    const aux = this.state.auth;
    const username = decode(aux);
    fetch(
      `${METADATA_DELETE}${this.state.id}?name=${this.state.code}&username=${username.user_name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + aux
        }
      }
    )
      .then(resp => {
        if (resp.status === 204) {
          this.setState({
            alert200: true
          });
          setTimeout(() => {
            this.setState(
              {
                alert200: false,
                modal: false
              },
              () => {
                this.props.refreshComponent();
              }
            );
          }, 1500);
        } else if (resp.status === 400) {
          this.setState({
            alert400: true
          });
          setTimeout(() => {
            this.setState({
              alert400: false
            });
          }, 1500);
        } else if (resp.status === 500) {
          this.setState({
            alert500: true
          });
          setTimeout(() => {
            this.setState({
              alert500: false
            });
          }, 1500);
        }
      })
      .catch(err => {
        console(`Error => ${err.message}`);
      });
  };

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Eliminar Metadato {this.state.metadata.name} </ModalHeader>
        <ModalBody>
          <Alert color={"danger"} isOpen={this.state.alertError}>
            <i className="fa fa-exclamation-triangle" />{" "}
            {this.state.alertErrorMessage}
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert400}>
            <i className="fa fa-exclamation-triangle" /> Error al escribir el
            nombre del metadato no coincide.
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert500}>
            <i className="fa fa-exclamation-triangle" /> Error el metadato ya
            sen encuentra asociado a una plantilla y / o ya se encuentran
            registros asociados con el metadato
          </Alert>
          <Alert color={"success"} isOpen={this.state.alert200}>
            Se elimino el metadato de manera satisfactoria !
          </Alert>
          <form className="form">
            <p className="text-center">
              {" "}
              Ingresar el nombre el metadato para validar el proceso{" "}
            </p>
            <div className="form-group">
              <input
                type="text"
                className="form-control from-control-sm"
                placeholder={"nombre del metadato"}
                autoFocus
                value={this.state.code}
                onChange={e => {
                  this.setState({ code: e.target.value });
                }}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false
                });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cancelar
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                this.sendData();
              }}
            >
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteMetadata.propTypes = {};

export default ModalDeleteMetadata;
