import React, { Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { USER } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeleteUser extends React.Component {
  state = {
    modal: this.props.modaldel,
    id: this.props.id,
    alertSuccess: false,
    alertError500: false,
    alertError400: false,
    identification: "",
    useLogged: "",
    nameUser: "",
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
    this.setState(
      {
        modal: !this.state.modal,
        id: id
      },
      () => this.props.updateTable()
    );
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
      alertError500: false,
      alertError400: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      identificacion: ""
    };
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_usuarios_modal_eliminar_titulo")} {this.state.nameUser}
          </ModalHeader>

          <Formik
            initialValues={dataInitial}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${USER}${this.state.id}?identification=${values.identificacion}&username=${username.user_name}`,
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
                        alertError500: true
                      });
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertError500: false
                        });
                      }, 3000);
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
                        alertError400: true
                      });
                    }
                  })
                  .catch(Error => console.log("", Error));
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              identificacion: Yup.string().required(
                " Por favor introduzca la identificacion del usuario."
              )
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <Fragment>
                  <form className="form">
                    <ModalBody>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertError500}
                        toggle={this.onDismiss}
                      >
                        {t("app_usuarios_modal_eliminar_alert_error_500")}{" "}
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        {t("app_usuarios_modal_eliminar_alert_success")}
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertError400}
                        toggle={this.onDismiss}
                      >
                        {t(
                          "app_usuarios_modal_eliminar_alert_errorCode_parte_1"
                        )}{" "}
                        <b>{values.identificacion}</b>{" "}
                        {t(
                          "app_usuarios_modal_eliminar_alert_errorCode_parte_2"
                        )}
                      </Alert>
                      <p className="text-center">
                        {t("app_usuarios_modal_eliminar_titulo_2")}
                      </p>
                      <input
                        type="text"
                        placeholder={t(
                          "app_usuarios_modal_eliminar_placeholder"
                        )}
                        style={{ textAlign: "center" }}
                        name="identificacion"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.identificacion &&
                          touched.identificacion &&
                          "is-invalid"}`}
                      />
                      <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.identificacion && touched.identificacion ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="identificacion" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {t("app_usuarios_modal_eliminar_titulo_3")}
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-danger btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {" "}
                        <i className="fa fa-trash" />{" "}
                        {t("app_usuarios_modal_eliminar_boton_eliminar")}
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
                        {t("app_usuarios_modal_eliminar_boton_cerrar")}
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

ModalDeleteUser.propTypes = {
  modaldeletestate: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalDeleteUser;
