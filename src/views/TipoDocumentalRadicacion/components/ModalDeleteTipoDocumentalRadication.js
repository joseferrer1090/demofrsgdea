import React, { Component, Fragment } from "react";
import { Formik, ErrorMessage } from "formik";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
} from "reactstrap";
import PropTypes from "prop-types";
import {
  TYPEDOCUMENTARY_SHOW,
  TYPEDOCUMENTARY_DELETE,
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import * as Yup from "yup";

class ModalDeleteTramite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: this.props.t,
      modal: this.props.modaldelete,
      id: this.props.id,
      dataTypeDocumental: {},
      alertSuccess: false,
      alertError500: false,
      alertError400: false,
      code: "",
      auth: this.props.authorization,
      spinnerDelete: false,
    };
  }

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
        id: this.props.id,
      });
    }
  }

  getData = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataTypeDocumental: data.typeDocumentary,
        });
      })
      .catch((err) => console.log(err));
  };

  toggle = (id) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      id: id,
    }));
    this.getData(id);
  };

  onDismiss = () => {
    this.setState({
      alertSuccess: false,
      alertError500: false,
      alertError400: false,
    });
  };

  render() {
    const aux = this.state.dataTypeDocumental;
    const { t } = this.props;
    const dataInitial = {
      code: "",
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_documentalRadicacion_modal_eliminar_titulo")} {aux.name}
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
                  `${TYPEDOCUMENTARY_DELETE}${this.state.id}?code=${values.code}&username=${username.user_name}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
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
                  .catch((Error) => {
                    console.log("", Error);
                    this.setState({
                      spinnerDelete: false,
                    });
                  });
                // alert(JSON.stringify(values, "", 2))
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required("Por favor introduzca el codigo"),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <Fragment>
                  <form className="form">
                    <ModalBody>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError500}
                        toggle={this.onDismiss}
                      >
                        {t(
                          "app_documentalRadicacion_modal_eliminar_alert_error_500"
                        )}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t(
                          "app_documentalRadicacion_modal_eliminar_alert_success"
                        )}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError400}
                        toggle={this.onDismiss}
                      >
                        {t(
                          "app_documentalRadicacion_modal_eliminar_alert_error_400"
                        )}
                      </Alert>
                      <p className="text-center">
                        {" "}
                        {t("app_documentalRadicacion_modal_eliminar_titulo_2")}
                      </p>
                      <input
                        type="text"
                        placeholder={t(
                          "app_documentalRadicacion_modal_eliminar_placeholder"
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
                        {t("app_documentalRadicacion_modal_eliminar_titulo_3")}
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-danger btn-sm"
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
                            {" "}
                            <i className="fa fa-trash" />{" "}
                            {t(
                              "app_documentalRadicacion_modal_eliminar_boton_eliminar"
                            )}{" "}
                          </div>
                        )}
                      </button>
                      <Button
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
                        {t(
                          "app_documentalRadicacion_modal_eliminar_boton_cerrar"
                        )}{" "}
                      </Button>
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

ModalDeleteTramite.propTypes = {
  modaldelte: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ModalDeleteTramite;
