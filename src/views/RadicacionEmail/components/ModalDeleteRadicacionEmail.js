import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { decode } from "jsonwebtoken";
import { EMAIL_FILING } from "./../../../services/EndPoints";
class ModalDeleteRadicacionEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      idRadicacionEmail: this.props.id,
      email: "",
      useLogged: "",
      alertSuccess: false,
      alertError500: false,
      alertError400: false,
      t: this.props.t,
      auth: this.props.authorization,
      spinnerDelete: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      nombre: "",
      idRadicacionEmail: id,
      useLogged: "jferrer",
    });
    const auth = this.state.auth;
    const username = decode(auth);

    fetch(`${EMAIL_FILING}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          email: data.email,
        });
      })
      .catch((Error) => console.log(" ", Error));
  };

  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertError400: false,
      alertSuccess: false,
    });
  };

  render() {
    const dataInitial = {
      email: "",
    };
    const email = this.state.email;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_radicacion_email_modal_eliminar_titulo")} {email}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerDelete: SVGComponentTransferFunctionElement,
              });
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${EMAIL_FILING}/${this.state.idRadicacionEmail}?email=${values.email}&username=${username.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + auth,
                    },
                  }
                )
                  .then((response) => {
                    if (response.status === 500) {
                      this.setState({
                        alertError500: true,
                        spinnerDelete: false,
                      });
                    } else if (response.status === 204) {
                      this.setState(
                        {
                          alertSuccess: true,
                          spinnerDelete: false,
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false,
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true,
                        spinnerDelete: false,
                      });
                    }
                  })
                  .catch((error) => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required(
                " Por favor introduzca el correo electrónico ha eliminar."
              ),
            })}
          >
            {(props) => {
              const {
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <form className="form">
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError500}
                        toggle={this.onDismiss}
                      >
                        {t(
                          "app_radicacion_email_modal_eliminar_alert_error_500"
                        )}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError400}
                        toggle={this.onDismiss}
                      >
                        {t(
                          "app_radicacion_email_modal_eliminar_alert_error_400"
                        )}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_radicacion_email_modal_eliminar_alert_success")}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("appradicacion_email_modal_eliminar_titulo_2")}
                      </p>

                      <input
                        input
                        name={"email"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder={t(
                          "app_radicacion_email_modal_eliminar_placeholder"
                        )}
                        style={{ textAlign: "center" }}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${
                          errors.email && touched.email && "is-invalid"
                        }`}
                      />
                      <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.email && touched.email ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="email" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        {t("app_radicacion_email_modal_eliminar_titulo_3")}
                      </p>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-outline-danger btn-sm"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      disabled={this.state.spinnerDelete}
                    >
                      {this.state.spinnerDelete ? (
                        <i className=" fa fa-spinner fa-refresh" />
                      ) : (
                        <div>
                          <i className="fa fa-trash" />{" "}
                          {this.props.t(
                            "app_radicacion_email_modal_eliminar_boton_eliminar"
                          )}{" "}
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError500: false,
                          alertSuccess: false,
                          alertError400: false,
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {this.props.t(
                        "app_radicacion_email_modal_eliminar_boton_cerrar"
                      )}{" "}
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

ModalDeleteRadicacionEmail.propTypes = {
  modaldelete: PropTypes.bool.isRequired,
  t: PropTypes.any,
};

export default ModalDeleteRadicacionEmail;
