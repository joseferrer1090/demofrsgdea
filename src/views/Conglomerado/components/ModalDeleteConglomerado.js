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
    alertError500: false,
    alertError400: false,
    t: this.props.t,
    code: "",
    nameCompany: "",
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
    this.setState(
      {
        modal: !this.state.modal,
        idConglomerado: id,
        useLogged: "jferrer",
      },
      () => this.props.updateTable()
    );
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CONGLOMERATE}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          nameCompany: data.name,
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
    const dataInitial = {
      code: "",
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
              this.setState({
                spinnerDelete: true,
              });
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(
                  `${CONGLOMERATE}/${this.state.idConglomerado}?code=${values.code}&username=${username.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + auth,
                    },
                  }
                )
                  .then((response) => {
                    console.log(response);
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
                  .catch((error) => console.log("", error));
                // alert(JSON.stringify(values, "", 2))
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                " Por favor introduzca el codigo del conglomerado."
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
                isSubmitting,
              } = props;
              return (
                <Fragment>
                  <form className="form">
                    <ModalBody>
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError500}
                        toggle={this.onDismiss}
                      >
                        {t("app_conglomerado_modal_eliminar_alert_error_500")}{" "}
                      </Alert>
                      <Alert
                        className="text-center"
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_conglomerado_modal_eliminar_alert_success")}
                      </Alert>
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError400}
                        toggle={this.onDismiss}
                      >
                        {t("app_conglomerado_modal_eliminar_alert_error_400")}
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
                        {t(
                          "app_conglomerado_modal_eliminar_informacion_2"
                        )}{" "}
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                          // this.setState({
                          //   spinnerDelete: true,
                          // });
                        }}
                        disabled={this.state.spinnerDelete}
                      >
                        {" "}
                        {this.state.spinnerDelete ? (
                          <i className=" fa fa-spinner fa-refresh" />
                        ) : (
                          // fa-spin
                          <div>
                            <i className="fa fa-trash" />{" "}
                            {t("app_conglomerado_modal_eliminar_boton")}
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
  t: PropTypes.any,
};

export default ModalDeleteConglomerado;
