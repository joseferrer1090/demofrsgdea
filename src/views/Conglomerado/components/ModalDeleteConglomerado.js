import React, { Fragment } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { CONGLOMERATE } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalDeleteConglomerado extends React.Component {
  state = {
    modal: this.props.modaldeletestate,
    idConglomerado: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertCode: false,
    t: this.props.t,
    code: "",
    nameCompany: "",
    username: "",
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
        idConglomerado: id,
        useLogged: "jferrer"
      },
      () => this.props.updateTable()
    );
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CONGLOMERATE}/${id}?username=${username.user_name}`, {
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
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      code: ""
    };
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_conglomerado_modal_eliminar_titulo")}{" "}
            {this.state.nameCompany}
          </ModalHeader>

          <Formik
            initialValues={dataInitial}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${CONGLOMERATE}/${this.state.idConglomerado}?code=${values.code}&username=${username.user_name}`,
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
                    }
                  })
                  .catch(error => console.log("", error));
                // alert(JSON.stringify(values, "", 2))
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el codigo del conglomerado."
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
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        {t("app_conglomerado_modal_eliminar_alert_error")}{" "}
                        {values.code}.
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        {t("app_conglomerado_modal_eliminar_alert_success")}
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        {t("app_conglomerado_modal_eliminar_alert_errorCode")}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("app_conglomerado_modal_eliminar_informacion")}
                      </p>
                      <input
                        type="text"
                        placeholder={t(
                          "app_conglomerado_modal_eliminar_placeholder"
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
                        {t(
                          "app_conglomerado_modal_eliminar_informacion_2"
                        )}{" "}
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
                        <i className="fa fa-trash" /> Eliminar
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
                        {t("app_conglomerado_modal_eliminar_boton_2")}{" "}
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

ModalDeleteConglomerado.propTypes = {
  modaldeletestate: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any
};

export default ModalDeleteConglomerado;
