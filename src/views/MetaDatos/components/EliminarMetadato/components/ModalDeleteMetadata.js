import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner
} from "reactstrap";
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
      alertError: false,
      spinner: false
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
      code: Yup.string().required(" Por favor introduzca el nombre.")
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
            alert200: true,
            spinner: false
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
          }, 3000);
        } else if (resp.status === 400) {
          this.setState({
            alert400: true,
            spinner: false
          });
          setTimeout(() => {
            this.setState({
              alert400: false
            });
          }, 3000);
        } else if (resp.status === 500) {
          this.setState({
            alert500: true,
            spinner: false
          });
          setTimeout(() => {
            this.setState({
              alert500: false
            });
          }, 3000);
        }
      })
      .catch(err => {
        console(`Error => ${err.message}`);
      });
    this.resetForm();
  };
  resetForm = () => {
    this.setState({
      code: ""
    });
  };
  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>Eliminar {this.state.metadata.name} </ModalHeader>
        <ModalBody>
          {this.state.spinner !== false ? (
            <center>
              <br />
              <Spinner
                style={{ width: "3rem", height: "3rem" }}
                type="grow"
                color="primary"
              />
            </center>
          ) : (
            <div></div>
          )}
          <Alert color={"danger"} isOpen={this.state.alertError}>
            <i className="fa fa-exclamation-triangle" />{" "}
            {this.state.alertErrorMessage}
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert400}>
            <i className="fa fa-exclamation-triangle" />
            &nbsp;Error, el nombre no es válido para eliminar el metadato.
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert500}>
            <i className="fa fa-exclamation-triangle" />
            &nbsp;Error, el metadato se encuentra asociado.
          </Alert>
          <Alert color={"success"} isOpen={this.state.alert200}>
            &nbsp;Se elimino el metadato con éxito.
          </Alert>
          <form className="form">
            <p className="text-center">
              {" "}
              Confirmar el nombre para eliminar el metadato.
            </p>
            <div className="form-group">
              <input
                type="text"
                className="form-control from-control-sm"
                placeholder={"Nombre del metadato a eliminar"}
                style={{ textAlign: "center" }}
                autoFocus
                value={this.state.code}
                onChange={e => {
                  this.setState({ code: e.target.value });
                }}
              />
            </div>
            <br />
            <p className="text-center text-danger">
              {" "}
              El metadato quedará eliminado de manera permanente.
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="pull-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                if (this.state.code !== "") {
                  this.setState({
                    spinner: true
                  });
                }
                this.sendData();
                // this.setState({
                //   spinner: true
                // });
              }}
            >
              {" "}
              <i className="fa fa-trash" /> Eliminar{" "}
            </button>
            &nbsp;
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
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteMetadata.propTypes = {};

export default ModalDeleteMetadata;
