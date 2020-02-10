import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { decode } from "jsonwebtoken";
import { CITY } from "../../../services/EndPoints";

class ModalDeleteCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel,
      idCity: this.props.id,
      nombre: "",
      useLogged: "",
      alertCode: false,
      alertError: false,
      alertSuccess: false,
      nameCity: "",
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
      idCity: id,
      code: "",
      useLogged: "ccuartas"
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CITY}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameCity: data.name
        });
      })
      .catch(Error => console.log(" ", Error));
  };
  onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  render() {
    const dataPreview = {
      code: ""
    };
    const nameCity = this.state.nameCity;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_ciudad_modal_eliminar_titulo")} {nameCity}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${CITY}${this.state.idCity}?code=${values.code}&username=${username.user_name}`,
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
                        alertCode: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertCode: false
                        });
                      }, 3000);
                    }
                  })
                  .catch(error => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el código de la ciudad."
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
                  <ModalBody>
                    <form className="form">
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        {t("app_ciudad_modal_eliminar_alert_error_500")}
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        {t("app_ciudad_modal_eliminar_alert_error_400")}
                      </Alert>
                      <Alert color="success" isOpen={this.state.alertSuccess}>
                        {t("app_ciudad_modal_eliminar_alert_success")}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("app_ciudad_modal_eliminar_titulo_2")}
                      </p>

                      <input
                        name={"code"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder={t("app_ciudad_modal_eliminar_placeholder")}
                        style={{ textAlign: "center" }}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                          touched.code &&
                          "is-invalid"}`}
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
                        {t("app_ciudad_modal_eliminar_titulo_3")}{" "}
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
                      {t("app_ciudad_modal_eliminar_button_eliminar")}
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
                      {t("app_ciudad_modal_eliminar_button_cerrar")}{" "}
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

ModalDeleteCiudad.propTypes = {
  modaldel: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ModalDeleteCiudad;
