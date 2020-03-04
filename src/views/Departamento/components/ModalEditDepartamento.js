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
  Alert,
  Spinner
} from "reactstrap";
import IMGDEPARTAMENTO from "./../../../assets/img/map-marker.svg";
import {
  DEPARTMENTS,
  CONTRIES_STATUS,
  DEPARTMENT
} from "./../../../services/EndPoints";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";
import CountrySelect from "./SelectCountry";

class ModalEditDepartamento extends React.Component {
  state = {
    modal: this.props.modaledit,
    idDepartment: this.props.id,
    dataResult: {},
    optionsCountries: [],
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    department_status: 0,
    username: "",
    auth: this.props.authorization,
    spinner: true
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
      idDepartment: id,
      spinner: true
    });
    this.getDepartmentByID(id);
    setTimeout(() => {
      this.setState({
        spinner: false
      });
    }, 1500);
    // this.getDataCountries();
  };

  getDepartmentByID = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${DEPARTMENT}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataResult: {
            department_country: data.country.id,
            department_name: data.name,
            department_code: data.code,
            department_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertSuccess: false,
      alertError400: false
    });
  };

  render() {
    const dataResult = this.state.dataResult;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_departamento_modal_actualizar_titulo")}{" "}
            {dataResult.department_name}{" "}
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
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(DEPARTMENTS, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth
                  },
                  body: JSON.stringify({
                    id: this.state.idDepartment,
                    code: values.department_code,
                    name: values.department_name,
                    countryId: values.department_country,
                    status: tipoEstado(values.department_status),
                    userName: username.user_name
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
              department_country: Yup.string()
                .ensure()
                .required(" Por favor seleccione un país."),
              department_code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              department_name: Yup.string()
                .required(" Por favor introduzca un nombre.")
                .max(100, "Máximo 100 caracteres."),
              department_status: Yup.bool().test(
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
                handleSubmit,
                setFieldTouched,
                setFieldValue
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t("app_departamento_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_departamento_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_departamento_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGDEPARTAMENTO} className="img-thumbnail" />
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
                              "app_departamento_modal_actualizar_titulo_2"
                            )}{" "}
                          </h5>{" "}
                        </div>
                        {this.state.spinner !== false ? (
                          <center>
                            <br />
                            <Spinner
                              style={{ width: "3rem", height: "3rem" }}
                              type="grow"
                              color="primary"
                            />
                          </center>
                        ) : (
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_departamento_modal_actualizar_pais"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <CountrySelect
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name={"department_country"}
                                  onChange={e =>
                                    setFieldValue(
                                      "department_country",
                                      e.target.value
                                    )
                                  }
                                  onBlur={() => {
                                    setFieldTouched("department_country", true);
                                  }}
                                  value={values.department_country}
                                  className={`form-control form-control-sm ${errors.department_country &&
                                    touched.department_country &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.department_country &&
                                  touched.department_country ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="department_country" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_departamento_modal_actualizar_codigo"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  name="department_code"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="text"
                                  className={`form-control form-control-sm ${errors.department_code &&
                                    touched.department_code &&
                                    "is-invalid"}`}
                                  placeholder=""
                                  value={values.department_code}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.department_code &&
                                  touched.department_code ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="department_code" />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_departamento_modal_actualizar_nombre"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  name="department_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="text"
                                  className={`form-control form-control-sm ${errors.department_name &&
                                    touched.department_name &&
                                    "is-invalid"}`}
                                  value={values.department_name}
                                  placeholder=""
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.department_name &&
                                  touched.department_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="department_name" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_departamento_modal_actualizar_estado"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="department_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckboxEditCiudad"
                                          label={t(
                                            "app_departamento_modal_actualizar_estado_descripcion"
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.department_status &&
                                            touched.department_status &&
                                            "invalid-feedback"
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="department_status" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
                      {t("app_departamento_modal_actualizar_button_actualizar")}{" "}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError500: false,
                          alertError400: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_departamento_modal_actualizar_button_cerrar")}{" "}
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

ModalEditDepartamento.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalEditDepartamento;
