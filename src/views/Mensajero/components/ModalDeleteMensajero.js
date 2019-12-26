import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { MESSENGER } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeleteMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      idMessenger: this.props.id,
      identification: "",
      useLogged: "",
      alertSuccess: false,
      alertError: false,
      alertIdentification: false,
      nameMessenger: "",
      t: this.props.t,
      username: "",
      auth: this.props.authorization
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

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      nombre: "",
      idMessenger: id,
      useLogged: "jferrer"
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${MESSENGER}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameMessenger: data.name
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertIdentification: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      identification: ""
    };
    const nameMessenger = this.state.nameMessenger;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_mensajero_modal_eliminar_titulo")} {nameMessenger}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${MESSENGER}/${this.state.idMessenger}?identification=${values.identification}&username=${username.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + auth
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                    } else if (response.status === 204) {
                      this.setState(
                        {
                          alertSuccess: true
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertIdentification: true
                      });
                    }
                  })
                  .catch(error => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              identification: Yup.string().required(
                " Por favor introduzca el número de identificación del mensajero."
              )
            })}
          >
            {props => {
              const {
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <form className="form">
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        {t("app_mensajero_modal_eliminar_alert_error")}
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertIdentification}
                        toggle={this.onDismiss}
                      >
                        {t("app_mensajero_modal_eliminar_alert_errorId")}
                      </Alert>
                      <Alert
                        className="text-center"
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_mensajero_modal_eliminar_alert_success")}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("app_mensajero_modal_eliminar_titulo_2")}
                      </p>

                      <input
                        input
                        name={"identification"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder={t(
                          "app_mensajero_modal_eliminar_placeholder"
                        )}
                        style={{ textAlign: "center" }}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.identification &&
                          touched.identification &&
                          "is-invalid"}`}
                      />
                      <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.identification && touched.identification ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="identification" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        {t("app_mensajero_modal_eliminar_titulo_3")}
                      </p>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-outline-danger btn-sm"}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-trash" />{" "}
                      {t("app_mensajero_modal_eliminar_boton_eliminar")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError: false,
                          alertSuccess: false,
                          alertIdentification: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t("app_mensajero_modal_eliminar_boton_cerrar")}{" "}
                    </button>
                  </ModalFooter>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalDeleteMensajero.propTypes = {
  modaldelete: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalDeleteMensajero;
