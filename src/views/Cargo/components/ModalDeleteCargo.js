import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { CHARGE, CHARGES } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeleteCargo extends React.Component {
  state = {
    modal: this.props.modaldelcargo,
    id: this.props.id,
    alertSuccess: false,
    alertError500: false,
    alertError400: false,
    useLogged: "jferrer",
    nameCharge: "",
    code: "",
    t: this.props.t,
    username: "ccuartas",
    auth: this.props.authorization,
    spinnerDelete: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    return null;
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
    fetch(`${CHARGE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          nameCharge: data.name,
        });
      })
      .catch("Error", console.log("Error", Error));
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
      code: "",
    };
    const nameCharge = this.state.nameCharge;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_cargo_modal_eliminar_titulo")} {nameCharge}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerDelete: true,
              });
              setTimeout(() => {
                const data = this.state.auth;
                const user = decode(data);

                fetch(
                  `${CHARGES}/${this.state.id}?code=${values.code}&username=${user.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + this.state.auth,
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
                  .catch((error) => {
                    console.log("", error);
                    this.setState({
                      spinnerDelete: false,
                    });
                  });
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el código del cargo."
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
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError500}
                        toggle={this.onDismiss}
                      >
                        {t("app_cargo_modal_eliminar_alert_error_500")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError400}
                        toggle={this.onDismiss}
                      >
                        {t("app_cargo_modal_eliminar_alert_error_400")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_cargo_modal_eliminar_alert_success")}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("app_cargo_modal_eliminar_titulo_2")}
                      </p>

                      <input
                        type="text"
                        placeholder={t("app_cargo_modal_eliminar_placeholder")}
                        style={{ textAlign: "center" }}
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${
                          errors.code && touched.code && "is-invalid"
                        }`}
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
                        {t("app_cargo_modal_eliminar_titulo_3")}
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
                          {t("app_cargo_modal_eliminar_button_eliminar")}
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
                      {t("app_cargo_modal_eliminar_button_cerrar")}{" "}
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

ModalDeleteCargo.propTypes = {
  modaldelcargo: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
};

export default ModalDeleteCargo;
