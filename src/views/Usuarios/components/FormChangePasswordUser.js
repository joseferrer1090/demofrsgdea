import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Alert,
  Card,
  CardBody,
} from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { decode } from "jsonwebtoken";
import { USER, CHANGE_PASSWORD } from "../../../services/EndPoints";

class ModalChangePasswordUser extends React.Component {
  state = {
    modal: this.props.modalpassword,
    id: this.props.id,
    userLogged: "",
    nameUser: "",
    alertSuccess: false,
    alertError400: false,
    alertError500: false,
    t: this.props.t,
    auth: this.props.authorization,
    spinnerChangePassword: false,
  };

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
      id: id,
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${USER}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          nameUser: data.name,
        });
      })
      .catch((Error) => console.log(Error));
  };

  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertError400: false,
      alertSuccess: false,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_usuarios_modal_cambiar_contraseña_titulo")}{" "}
            {this.state.nameUser}
          </ModalHeader>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerChangePassword: true,
              });
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(`${CHANGE_PASSWORD}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.state.auth,
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    password: values.newpassword,
                    passwordConfirm: values.confirmpassword,
                    userNameAuthenticate: username.user_name,
                  }),
                })
                  .then((response) => {
                    if (response.status === 500) {
                      this.setState({
                        alertError500: true,
                        spinnerChangePassword: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: !this.state.modal,
                        });
                      }, 3000);
                    } else if (response.status === 200) {
                      this.setState({
                        alertSuccess: true,
                        spinnerChangePassword: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false,
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true,
                        spinnerChangePassword: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false,
                        });
                      }, 3000);
                    }
                  })
                  .catch((error) => {
                    console.log("", error);
                    this.setState({
                      spinnerChangePassword: false,
                    });
                  });
                setSubmitting(false);
              }, 5000);
            }}
            validationSchema={Yup.object().shape({
              newpassword: Yup.string()
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
                  " Contraseña no valida, asegúrese de que lleve al menos una letra en mayuscula, un digito, y un caracter especial."
                )
                .required(" Por favor introduzca una contraseña.")
                .min(8, "  Mínimo 8 caracteres. ")
                .max(15, " Máximo 15 caracteres."),
              confirmpassword: Yup.string()
                .oneOf(
                  [Yup.ref("newpassword"), null],
                  " Las contraseñas no coinciden."
                )
                .required(" Por favor confirme la contraseña.")
                .min(8, " Mínimo 8 caracteres.")
                .max(15, " Máximo 15 caracteres."),
            })}
          >
            {(props) => {
              const {
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
              } = props;
              return (
                <Fragment>
                  <form className="form">
                    <ModalBody>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertError500}
                        toggle={this.onDismiss}
                      ></Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        {t(
                          "app_usuarios_modal_cambiar_contraseña_alert_success"
                        )}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError400}
                      >
                        {t("app_usuarios_modal_actualizar_alert_error_400")}
                      </Alert>
                      {t("app_usuarios_modal_cambiar_contraseña_alert_error")}
                      <p
                        className="text-muted"
                        style={{ textAlign: "justify" }}
                      >
                        {t(
                          "app_usuarios_modal_cambiar_contraseña_enunciado_parte_1"
                        )}
                        <code> {this.state.nameUser}</code>
                        {t(
                          "app_usuarios_modal_cambiar_contraseña_enunciado_parte_2"
                        )}
                      </p>
                      <Card>
                        <CardBody>
                          <div className="form-group">
                            <label>
                              {" "}
                              {t(
                                "app_usuarios_modal_cambiar_contraseña_nueva_contraseña"
                              )}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <input
                              name={"newpassword"}
                              value={values.newpassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control form-control-sm ${
                                errors.newpassword &&
                                touched.newpassword &&
                                "is-invalid"
                              }`}
                              type="password"
                              placeholder=""
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.newpassword && touched.newpassword ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="newpassword" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>
                              {" "}
                              {t(
                                "app_usuarios_modal_cambiar_contraseña_confirmar_contraseña"
                              )}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <input
                              name={"confirmpassword"}
                              value={values.confirmpassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control form-control-sm ${
                                errors.confirmpassword &&
                                touched.confirmpassword &&
                                "is-invalid"
                              }`}
                              type="password"
                              placeholder=""
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.confirmpassword &&
                              touched.confirmpassword ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="confirmpassword" />
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-warning btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                        disabled={this.state.spinnerChangePassword}
                      >
                        {this.state.spinnerChangePassword ? (
                          <i className=" fa fa-spinner fa-refresh" />
                        ) : (
                          <div>
                            {" "}
                            <i className="fa fa-pencil" />{" "}
                            {t(
                              "app_usuarios_modal_cambiar_contraseña_boton_cambiar_contraseña"
                            )}
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
                            alertError400: false,
                            alertSuccess: false,
                          });
                        }}
                      >
                        <i className="fa fa-times" />{" "}
                        {t("app_usuarios_modal_cambiar_contraseña_cerrar")}
                      </button>
                    </ModalFooter>
                  </form>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalChangePasswordUser.propTypes = {
  modalpassword: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalChangePasswordUser;
