import React, { Fragment } from "react";
import PropTypes from "prop-types";
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

import IMGCOUNTRY from "./../../../assets/img/flag.svg";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import { COUNTRIES, COUNTRY } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalEditPais extends React.Component {
  state = {
    modal: this.props.modaledit,
    idPais: this.props.id,
    dataResult: {},
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    country_status: 0,
    username: "",
    auth: this.props.authorization
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idPais: id
    });
    this.getCountryByID(id);
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

  getCountryByID = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${COUNTRY}${id}?username=${username.user_name}`, {
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
            country_code: data.code,
            country_name: data.name,
            country_status: data.status
          }
        });
      })
      .catch("Error", console.log("Error", Error));
  };

  render() {
    const dataResult = this.state.dataResult;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_pais_modal_actualizar_titulo")} {dataResult.country_name}{" "}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
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
                const user = () => {
                  const data = this.state.auth;
                  const user = decode(data);
                  return user.user_name;
                };
                const auth = this.state.auth;
                fetch(COUNTRIES, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth
                  },
                  body: JSON.stringify({
                    id: this.state.idPais,
                    code: values.country_code,
                    name: values.country_name,
                    status: tipoEstado(values.country_status),
                    userName: user()
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
            validationSchema={Yup.object().shape({
              country_code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              country_name: Yup.string()
                .required(" Por favor introduzca un nombre.")
                .max(100, "Máximo 100 caracteres."),
              country_status: Yup.bool().test(
                "Activado",
                "",
                value => value === true
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
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t("app_pais_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_pais_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_pais_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGCOUNTRY} className="img-thumbnail" />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t("app_pais_modal_actualizar_titulo_2")}{" "}
                          </h5>{" "}
                        </div>
                        <form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <label>
                                {" "}
                                {t("app_pais_modal_actualizar_codigo")}{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                name={"country_code"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country_code}
                                className={`form-control form-control-sm ${errors.country_code &&
                                  touched.country_code &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.country_code && touched.country_code ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="country_code" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t("app_pais_modal_actualizar_nombre")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name="country_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.country_name}
                                  className={`form-control form-control-sm ${errors.country_name &&
                                    touched.country_name &&
                                    "is-invalid"}`}
                                />{" "}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.country_name &&
                                  touched.country_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="country_name" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t("app_pais_modal_actualizar_estado")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="country_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckboxEditPais"
                                          label={t(
                                            "app_pais_modal_actualizar_estado_descripcion"
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.country_status &&
                                            touched.country_status &&
                                            "invalid-feedback"
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="country_status" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {" "}
                      <i className="fa fa-pencil" />{" "}
                      {t("app_pais_modal_actualizar_button_actualizar")}{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false,
                          alertError500: false,
                          alertError400: false
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_pais_modal_actualizar_button_cerrar")}{" "}
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

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalEditPais;
