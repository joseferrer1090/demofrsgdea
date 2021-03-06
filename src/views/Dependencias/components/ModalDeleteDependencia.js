import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";
import { DEPENDENCE } from "../../../services/EndPoints";

class ModalDeleteDependencia extends Component {
  state = {
    modal: this.props.modalDel,
    code: "",
    id: this.props.id,
    userLogged: "",
    alertError500: false,
    alertError400: false,
    alertSuccess: false,
    nameDependence: "",
    t: this.props.t,
    username: "",
    auth: this.props.authorization,
    spinnerDelete: false,
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

    fetch(`${DEPENDENCE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          nameDependence: data.name,
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
    const dataInit = {
      code: "",
    };
    const nameDependence = this.state.nameDependence;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_dependencia_form_eliminar_titulo")} {nameDependence}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInit}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerDelete: true,
              });
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${DEPENDENCE}${this.state.id}?code=${values.code}&username=${username.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
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
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: false,
                        });
                      }, 3000);
                    } else if (response.status === 204) {
                      this.setState({
                        alertSuccess: true,
                        spinnerDelete: false,
                      });
                      setTimeout(() => {
                        this.setState(
                          {
                            alertSuccess: false,
                            modal: false,
                          },
                          () => this.props.updateTable()
                        );
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true,
                        spinnerDelete: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false,
                          modal: false,
                        });
                      }, 3000);
                    }
                  })
                  .catch((Error) => {
                    console.log("Error", Error);
                    this.setState({
                      spinnerDelete: false,
                    });
                  });
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el código de la dependencia."
              ),
            })}
          >
            {(props) => {
              const {
                values,
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
                        {t("app_dependencia_modal_eliminar_alert_error_500")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError400}
                        toggle={this.onDismiss}
                      >
                        {t("app_dependencia_modal_eliminar_alert_error_400")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_dependencia_modal_eliminar_alert_success")}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("app_dependencia_form_eliminar_titulo_2")}
                      </p>

                      <input
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${
                          errors.code && touched.code && "is-invalid"
                        }`}
                        type="text"
                        placeholder={t(
                          "app_dependencia_form_eliminar_placeholder"
                        )}
                        style={{ textAlign: "center" }}
                      />
                      <div className="text-center" style={{ color: "#D54B4B" }}>
                        {errors.code && touched.code ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="code" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {" "}
                        {t("app_dependencia_form_eliminar_titulo_3")}{" "}
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
                          {t("app_dependencia_form_eliminar_boton_eliminar")}
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError400: false,
                          alertError500: false,
                          alertSuccess: false,
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t("app_dependencia_form_eliminar_boton_cerrar")}{" "}
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

ModalDeleteDependencia.propTypes = {
  modalDel: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
};

export default ModalDeleteDependencia;
