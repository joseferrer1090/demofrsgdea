import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";
import {
  METADATA_VIEW,
  METADATA_DELETE,
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
      spinner: false,
      t: this.props.t,
      spinnerDelete: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.id,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id,
        auth: this.props.authorization,
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
        authorization: "Bearer " + aux,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          metadata: data.metadata,
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  sendData = () => {
    Yup.setLocale({});
    const schema = Yup.object().shape({
      code: Yup.string().required(" Por favor introduzca el nombre."),
    });
    schema
      .validate({
        code: this.state.code,
      })
      .then(() => {
        if (schema.isValid) {
          this.deleteMetadata();
        }
      })
      .catch((err) => {
        this.setState({
          alertError: true,
          alertErrorMessage: err.message,
        });
        setTimeout(() => {
          this.setState({
            alertError: false,
          });
        }, 1500);
      });
  };

  deleteMetadata = () => {
    this.setState({
      spinnerDelete: true,
    });

    const aux = this.state.auth;
    const username = decode(aux);
    fetch(
      `${METADATA_DELETE}${this.state.id}?name=${this.state.code}&username=${username.user_name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + aux,
        },
      }
    )
      .then((resp) => {
        if (resp.status === 204) {
          this.setState({
            spinnerDelete: false,
            alert200: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState(
              {
                alert200: false,
                modal: false,
              },
              () => {
                this.props.refreshComponent();
              }
            );
          }, 3000);
        } else if (resp.status === 400) {
          this.setState({
            spinnerDelete: false,
            alert400: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert400: false,
            });
          }, 3000);
        } else if (resp.status === 500) {
          this.setState({
            spinnerDelete: false,
            alert500: true,
            spinner: false,
          });
          setTimeout(() => {
            this.setState({
              alert500: false,
            });
          }, 3000);
        }
      })
      .catch((err) => {
        console(`Error => ${err.message}`);
        this.setState({
          spinnerDelete: false,
        });
      });
    this.resetForm();
  };
  resetForm = () => {
    this.setState({
      code: "",
    });
  };
  render() {
    const { t } = this.state;
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>
          {t("app_metadatos_remover_metadatos_moda_eliminar_title")}{" "}
          {this.state.metadata.name}{" "}
        </ModalHeader>
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
            &nbsp;{t("app_metadatos_remover_metadatos_moda_eliminar_alert_400")}
          </Alert>
          <Alert color={"danger"} isOpen={this.state.alert500}>
            <i className="fa fa-exclamation-triangle" />
            &nbsp;{t("app_metadatos_remover_metadatos_moda_eliminar_alert_500")}
          </Alert>
          <Alert color={"success"} isOpen={this.state.alert200}>
            &nbsp;{t("app_metadatos_remover_metadatos_moda_eliminar_alert_200")}
          </Alert>
          <form className="form">
            <p className="text-center">
              {" "}
              {t("app_metadatos_remover_metadatos_moda_eliminar_info")}
            </p>
            <div className="form-group">
              <input
                type="text"
                className="form-control from-control-sm"
                placeholder={t(
                  "app_metadatos_remover_metadatos_moda_eliminar_placeholder"
                )}
                style={{ textAlign: "center" }}
                autoFocus
                value={this.state.code}
                onChange={(e) => {
                  this.setState({ code: e.target.value });
                }}
              />
            </div>
            <br />
            <p className="text-center text-danger">
              {" "}
              {t("app_metadatos_remover_metadatos_moda_eliminar_info_2")}
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
                    spinner: true,
                  });
                }
                this.sendData();
                // this.setState({
                //   spinner: true
                // });
              }}
              disabled={this.state.spinnerDelete}
            >
              {this.state.spinnerDelete ? (
                <i className=" fa fa-spinner fa-refresh" />
              ) : (
                <div>
                  {" "}
                  <i className="fa fa-trash" />{" "}
                  {t(
                    "app_metadatos_remover_metadatos_moda_eliminar_btn_eliminar"
                  )}{" "}
                </div>
              )}
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false,
                });
              }}
            >
              {" "}
              <i className="fa fa-times" />{" "}
              {t("app_metadatos_remover_metadatos_moda_eliminar_btn_cerrar")}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalDeleteMetadata.propTypes = {};

export default ModalDeleteMetadata;
