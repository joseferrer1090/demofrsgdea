import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { COMPANYS } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeleteEmpresa extends React.Component {
  state = {
    modal: this.props.modaldelempresa,
    idCompany: this.props.id,
    alertSuccess: false,
    alertError500: false,
    alertError400: false,
    code: "",
    nameCompany: "",
    t: this.props.t,
    auth: this.props.authorization
  };
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
      idCompany: id
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${COMPANYS}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameCompany: data.name
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
      code: ""
    };
    const nameCompany = this.state.nameCompany;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_empresa_modal_eliminar_titulo")} {nameCompany}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${COMPANYS}/${this.state.idCompany}?code=${values.code}&username=${username.user_name}`,
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
                  .catch(error => console.log("", error));
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el código de la empresa."
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
                    <Alert
                      className="text-center"
                      color="danger"
                      isOpen={this.state.alertError500}
                      toggle={this.onDismiss}
                    >
                      {t("app_empresa_modal_eliminar_alert_error_500")}
                    </Alert>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError400}
                      toggle={this.onDismiss}
                    >
                      {t("app_empresa_modal_eliminar_alert_error_400")}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {t("app_empresa_modal_eliminar_alert_success")}
                    </Alert>
                    <form className="form">
                      <p className="text-center">
                        {" "}
                        {t("app_empresa_modal_eliminar_titulo_2")}
                      </p>

                      <input
                        type="text"
                        placeholder={t(
                          "app_empresa_modal_eliminar_placeholder"
                        )}
                        style={{ textAlign: "center" }}
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        {t("app_empresa_modal_eliminar_titulo_3")}
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
                      {t("app_empresa_modal_eliminar_boton_eliminar")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError500: false,
                          alertError400: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t("app_empresa_modal_eliminar_boton_cerrar")}{" "}
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

ModalDeleteEmpresa.propTypes = {
  t: PropTypes.any,
  modaldelempresa: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default ModalDeleteEmpresa;
