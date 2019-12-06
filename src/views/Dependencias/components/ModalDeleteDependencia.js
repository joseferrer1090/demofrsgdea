import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

class ModalDeleteDependencia extends Component {
  state = {
    modal: this.props.modalDel,
    code: "",
    id: this.props.id,
    userLogged: "jferrer",
    alertError: false,
    alertCode: false,
    alertSuccess: false,
    nameDependence: "",
    t: this.props.t,
    username: "ccuartas"
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/${id}?username=${this.state.username}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + window.btoa("sgdea:123456"),
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameDependence: data.name
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
    const dataInit = {
      code: ""
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
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/dependence/${this.state.id}?code=${values.code}&username=${this.state.userLogged}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: "Basic " + window.btoa("sgdea:123456")
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: false
                        });
                      }, 2000);
                    } else if (response.status === 204) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState(
                          {
                            alertSuccess: false,
                            modal: false
                          },
                          () => this.props.updateTable()
                        );
                      }, 2000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertCode: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertCode: false,
                          modal: false
                        });
                      }, 2000);
                    }
                  })
                  .catch(Error => console.log("Error", Error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el código de la dependencia."
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
                handleSubmit,
                t
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
                        {t("app_dependencia_modal_eliminar_alert_error")}
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        {t("app_dependencia_modal_eliminar_alert_errorCode")}
                      </Alert>
                      <Alert color="success" isOpen={this.state.alertSuccess}>
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
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                          touched.code &&
                          "is-invalid"}`}
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
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-trash" />{" "}
                      {t("app_dependencia_form_eliminar_boton_eliminar")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
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
  id: PropTypes.string.isRequired
};

export default ModalDeleteDependencia;
