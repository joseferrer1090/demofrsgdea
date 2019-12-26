import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

class ModalDeleteRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel,
      id: this.props.id,
      identification: "",
      useLogged: "",
      alertError: false,
      alertCode: false,
      alertSuccess: false,
      nameTercero: "",
      t: this.props.t,
      username: "ccuartas"
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      useLogged: "ccuartas",
      identification: ""
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/thirdparty/${id}?username=${this.state.username}`,
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
          nameTercero: data.name
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
      identification: ""
    };
    const nameTercero = this.state.nameTercero;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_tercero_modal_eliminar_titulo")} {nameTercero}{" "}
          </ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/thirdparty/${this.state.id}?identification=${values.identification}&username=${this.state.useLogged}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "BASIC " + window.btoa("sgdea:123456")
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
                          modal: false,
                          alertError: false
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
                        alertCode: true
                      });
                    }
                  })
                  .catch(error => console.log(" ", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              identification: Yup.string().required(
                " Por favor introduzca el número de idenficación del tercero."
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
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_tercero_modal_eliminar_alert_success")}
                      </Alert>
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        {t("app_tercero_modal_eliminar_alert_error")}
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        {t("app_tercero_modal_eliminar_alert_errorCode")}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("app_tercero_modal_eliminar_titulo_2")}
                      </p>

                      <input
                        name={"identification"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder={t(
                          "app_tercero_modal_eliminar_placeholder"
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
                        {t("app_tercero_modal_eliminar_titulo_3")}{" "}
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
                      {t("app_tercero_modal_eliminar_boton_eliminar")}
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
                      {t("app_tercero_modal_eliminar_boton_cerrar")}
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

ModalDeleteRemitente.propTypes = {
  modaldel: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};

export default ModalDeleteRemitente;
