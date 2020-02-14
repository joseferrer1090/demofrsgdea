import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput,
  Alert
} from "reactstrap";
import PropTypes from "prop-types";
import ImgRadicacionEmail from "./../../../assets/img/message.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";
import { EMAIL_FILING } from "../../../services/EndPoints";

class ModalUpdateRadicacionEmail extends React.Component {
  state = {
    modal: this.props.modalupdate,
    idRadicacionEmail: this.props.id,
    dataResult: {},
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    messenger_status: 0,
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
    this.setState({
      modal: !this.state.modal,
      idRadicacionEmail: id
    });
    this.getRadiacionEmailByID(id);
  };

  getRadiacionEmailByID = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${EMAIL_FILING}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataResult: {
            radicacionemail_protocol: data.protocol,
            radicacionemail_host: data.host,
            radicacionemail_port: data.port,
            radicacionemail_email: data.email,
            radicacionemail_password: data.password,
            radicacionemail_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataResult = this.state.dataResult;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_radicacion_email_modal_actualizar_titulo")}{" "}
            {dataResult.radicacionemail_email}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            validationSchema={Yup.object().shape({
              radicacionemail_protocol: Yup.string()
                // .min(1, ' Por favor introduzca un protocolo válido.')
                .required(" Por favor introduzca el protocolo."),
              radicacionemail_host: Yup.string()
                // .min(1, ' Por favor introduzca un host válido.')
                .required(" Por favor introduzca el host."),
              radicacionemail_port: Yup.number()
                // .min(1, 'Por favor introduzca un puerto válido.')
                .required(" Por favor introduzca un puerto."),
              radicacionemail_email: Yup.string()
                .email(" Por favor introduzca un email valido.")
                .required(" Por favor introduzca un email."),
              radicacionemail_password: Yup.string().required(
                " Por favor introduzca una contraseña."
              ),
              radicacionemail_status: Yup.bool().test(
                "Activo",
                "",
                value => value === true
              )
            })}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo;
                if (data === true || data === 1) {
                  return (tipo = 1);
                } else if (data === false || data === 0) {
                  return (tipo = 0);
                }
                return 0;
              };

              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(`${EMAIL_FILING}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth
                  },
                  body: JSON.stringify({
                    id: this.state.idRadicacionEmail,
                    protocol: values.radicacionemail_protocol,
                    host: values.radicacionemail_host,
                    port: values.radicacionemail_port,
                    email: values.radicacionemail_email,
                    password: values.radicacionemail_password,
                    status: values.radicacionemail_status,
                    username: username.user_name
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState(
                        {
                          alertSuccess: true
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError500: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: !this.state.modal
                        });
                      }, 3000);
                    }
                  })
                  .catch(error => console.log("", error));
                setSubmitting(false);
              }, 500);
            }}
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
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t(
                        "app_radicacion_email_modal_actualizar_alert_error_500"
                      )}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_radicacion_email_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t(
                        "app_radicacion_email_modal_actualizar_alert_error_400"
                      )}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={ImgRadicacionEmail} />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t(
                              "app_radicacion_email_modal_actualizar_titulo_2"
                            )}
                          </h5>{" "}
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  "app_radicacion_email_modal_actualizar_protocol"
                                )}
                                <span className="text-danger">*</span>{" "}
                                <dd>
                                  <input
                                    name={"radicacionemail_protocol"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.radicacionemail_protocol}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.radicacionemail_protocol &&
                                      touched.radicacionemail_protocol &&
                                      "is-invalid"}`}
                                  />
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.radicacionemail_protocol &&
                                    touched.radicacionemail_protocol ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="radicacionemail_protocol" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  "app_radicacion_email_modal_actualizar_host"
                                )}
                                <span className="text-danger">*</span>{" "}
                                <dd>
                                  {" "}
                                  <input
                                    name={"radicacionemail_host"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.radicacionemail_host}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.radicacionemail_host &&
                                      touched.radicacionemail_host &&
                                      "is-invalid"}`}
                                  />
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.radicacionemail_host &&
                                    touched.radicacionemail_host ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="radicacionemail_host" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  "app_radicacion_email_modal_actualizar_puerto"
                                )}
                                <span className="text-danger">*</span>{" "}
                                <dd>
                                  {" "}
                                  <input
                                    name={"radicacionemail_port"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.radicacionemail_port}
                                    type="number"
                                    className={`form-control form-control-sm ${errors.radicacionemail_port &&
                                      touched.radicacionemail_port &&
                                      "is-invalid"}`}
                                  />
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.radicacionemail_port &&
                                    touched.radicacionemail_port ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="radicacionemail_port" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  "app_radicacion_email_modal_actualizar_email"
                                )}
                                <span className="text-danger">*</span>{" "}
                                <dd>
                                  {" "}
                                  <input
                                    name={"radicacionemail_email"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.radicacionemail_email}
                                    type="email"
                                    className={`form-control form-control-sm ${errors.radicacionemail_email &&
                                      touched.radicacionemail_email &&
                                      "is-invalid"}`}
                                  />
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.radicacionemail_email &&
                                    touched.radicacionemail_email ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="radicacionemail_email" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  "app_radicacion_email_modal_actualizar_constraseña"
                                )}
                                <span className="text-danger">*</span>{" "}
                                <dd>
                                  {" "}
                                  <input
                                    name={"radicacionemail_password"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.radicacionemail_password}
                                    type="password"
                                    className={`form-control form-control-sm ${errors.radicacionemail_password &&
                                      touched.radicacionemail_password &&
                                      "is-invalid"}`}
                                  />
                                  <div style={{ color: "#D54B4B" }}>
                                    {errors.radicacionemail_password &&
                                    touched.radicacionemail_password ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="radicacionemail_password" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <dl className="param">
                                <label>
                                  {" "}
                                  {this.props.t(
                                    "app_radicacion_email_modal_actualizar_estado"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="radicacionemail_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckBoxEditRoles"
                                          label={this.props.t(
                                            "app_radicacion_email_modal_actualizar_estado_descripcion"
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.radicacionemail_status &&
                                            touched.radicacionemail_status &&
                                            "invalid-feedback"
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="radicacionemail_status" />
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      type="button"
                      className="btn btn-sm btn-outline-success"
                    >
                      <i className="fa fa-pencil" />{" "}
                      {this.props.t(
                        "app_radicacion_email_modal_actualizar_boton_actualizar"
                      )}
                    </button>
                    <button
                      className="btn btn-sm btn-secondary "
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError400: false,
                          alertError500: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {this.props.t(
                        "app_radicacion_email_modal_actualizar_boton_cerrar"
                      )}{" "}
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

ModalUpdateRadicacionEmail.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any
};

export default ModalUpdateRadicacionEmail;
