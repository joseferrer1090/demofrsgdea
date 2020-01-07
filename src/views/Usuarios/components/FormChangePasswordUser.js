import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Alert,
  Card,
  CardBody
} from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import { decode } from "jsonwebtoken";
import { USER, CHANGE_PASSWORD } from "../../../services/EndPoints";

class ModalChangePasswordUser extends React.Component {
  state = {
    modal: this.props.modalpassword,
    id: this.props.id,
    userLogged: "",
    nameUser: "",
    alertSuccess: false,
    alertError: false,
    alertCode: false,
    t: this.props.t,
    auth: this.props.authorization
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
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
      id: id
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${USER}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameUser: data.name
        });
      })
      .catch(Error => console.log(Error));
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
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
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(`${CHANGE_PASSWORD}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.state.auth
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    password: values.newpassword,
                    passwordConfirm: values.confirmpassword,
                    userNameAuthenticate: username.user_name
                  })
                }).then(response => {
                  if (response.status === 500) {
                    this.setState({
                      alertError: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError: false
                      });
                    }, 2000);
                  } else if (response.status === 200) {
                    this.setState({
                      alertSuccess: true
                    });
                  }
                });
              }, 1000);
            }}
            validationSchema={Yup.object().shape({})}
          >
            {props => {
              const { values, handleChange, handleBlur, handleSubmit } = props;
              return (
                <Fragment>
                  <form className="form">
                    <ModalBody>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertError}
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
                              className="form-control form-control-sm"
                              type="password"
                              placeholder=""
                            />
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
                              className="form-control form-control-sm"
                              type="password"
                              placeholder=""
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-warning btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {" "}
                        <i className="fa fa-trash" />{" "}
                        {t(
                          "app_usuarios_modal_cambiar_contraseña_boton_cambiar_contraseña"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          this.setState({
                            modal: false,
                            alertError: false,
                            alertCode: false,
                            alertSuccess: false
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
  authorization: PropTypes.string.isRequired
};

export default ModalChangePasswordUser;
