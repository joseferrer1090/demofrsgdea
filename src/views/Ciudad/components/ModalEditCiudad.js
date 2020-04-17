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
  Spinner,
} from "reactstrap";
import IMGCITY from "./../../../assets/img/skyline.svg";
import { CITYS, CITY } from "./../../../services/EndPoints";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import SelectCountry from "./SelectCountryModalEdit";
import FieldDepartment from "./SelectDepartmentModalEdit";
import { decode } from "jsonwebtoken";

class ModalEditCiudad extends React.Component {
  state = {
    modal: this.props.modaledit,
    idCity: this.props.id,
    dataResult: {},
    optionsCountries: [0],
    optionsDepartment: [0],
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    city_status: 0,
    auth: this.props.authorization,
    spinner: true,
    spinnerActualizar: false,
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
  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertError400: false,
      alertSuccess: false,
    });
  };
  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      idCity: id,
      spinner: true,
    });
    this.getCityByID(id);
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 1500);
  };

  getCityByID = (id) => {
    const auth = this.state.auth;

    const username = decode(auth);
    fetch(`${CITY}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataResult: {
            city_country: data.department.country.id,
            city_department: data.department.id,
            city_code: data.code,
            city_name: data.name,
            city_status: data.status,
          },
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const dataResult = this.state.dataResult;
    const { t } = this.props;

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_ciudad_modal_actualizar_titulo")} {dataResult.city_name}{" "}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerActualizar: true,
              });
              const tipoEstado = (data) => {
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
                fetch(CITYS, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth,
                  },
                  body: JSON.stringify({
                    id: this.state.idCity,
                    code: values.city_code,
                    name: values.city_name,
                    departmentId: values.city_department,
                    status: tipoEstado(values.city_status),
                    userName: username.user_name,
                  }),
                })
                  .then((response) => {
                    if (response.status === 200) {
                      this.setState(
                        {
                          alertSuccess: true,
                          spinnerActualizar: false,
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true,
                        spinnerActualizar: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false,
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError500: true,
                        spinnerActualizar: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: !this.state.modal,
                        });
                      }, 3000);
                    }
                  })
                  .catch((error) => {
                    console.log("", error);
                    this.setState({
                      spinnerActualizar: false,
                    });
                  });
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              city_country: Yup.string()
                .ensure()
                .required(" Por favor seleccione un país."),
              city_department: Yup.string()
                .ensure()
                .required(" Por favor seleccione un departamento."),
              city_code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              city_name: Yup.string()
                .required(" Por favor introduzca un nombre.")
                .max(100, "Máximo 100 caracteres."),
              city_status: Yup.bool().test(
                "Activado",
                "",
                (value) => value === true
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
                setFieldValue,
                setFieldTouched,
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t("app_ciudad_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_ciudad_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_ciudad_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGCITY} className="img-thumbnail" />
                      </Col>

                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t("app_ciudad_modal_actualizar_titulo_2")}{" "}
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
                                <dl className="param">
                                  {t("app_ciudad_modal_actualizar_pais")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <SelectCountry
                                      authorization={this.state.auth}
                                      t={this.state.t}
                                      name={"city_country"}
                                      onChange={(e) =>
                                        setFieldValue(
                                          "city_country",
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched("city_country", true)
                                      }
                                      value={values.city_country}
                                      className={`form-control form-control-sm ${
                                        errors.city_country &&
                                        touched.city_country &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.city_country &&
                                      touched.city_country ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="city_country" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t(
                                    "app_ciudad_modal_actualizar_select_departamento"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <Field
                                      authorization={this.state.auth}
                                      t={this.state.t}
                                      name="city_department"
                                      component={FieldDepartment}
                                      countryId={props.values.city_country}
                                      departmentId={
                                        props.values.city_department
                                      }
                                    ></Field>
                                    {/* <SelectDepartment
                                    authorization={this.state.auth}
                                    t={this.state.t}
                                    city_country={props.values.city_country}
                                    name="city_department"
                                    value={values.city_department}
                                    onChange={e =>
                                      setFieldValue(
                                        "city_department",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("city_department", true)
                                    }
                                    className={`form-control form-control-sm ${errors.city_department &&
                                      touched.city_department &&
                                      "is-invalid"}`}
                                  /> */}
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.city_department &&
                                      touched.city_department ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="city_department" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_ciudad_modal_actualizar_codigo")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      type="text"
                                      name={"city_code"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.city_code}
                                      className={`form-control form-control-sm ${
                                        errors.city_code &&
                                        touched.city_code &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.city_code && touched.city_code ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="city_code" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_ciudad_modal_actualizar_nombre")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      type="text"
                                      name="city_name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.city_name}
                                      className={`form-control form-control-sm ${
                                        errors.city_name &&
                                        touched.city_name &&
                                        "is-invalid"
                                      }`}
                                    />{" "}
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.city_name && touched.city_name ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="city_name" />
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
                                    {t(
                                      "app_ciudad_modal_actualizar_estado"
                                    )}{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="city_status"
                                      render={({ field, form }) => {
                                        return (
                                          <CustomInput
                                            type="checkbox"
                                            id="CheckboxEditCiudad"
                                            label={t(
                                              "app_ciudad_modal_actualizar_estado_descripcion"
                                            )}
                                            {...field}
                                            checked={field.value}
                                            className={
                                              errors.city_status &&
                                              touched.city_status &&
                                              "invalid-feedback"
                                            }
                                          />
                                        );
                                      }}
                                    />
                                    <ErrorMessage name="city_status" />
                                  </div>
                                </dl>
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
                      className="btn btn-success btn-sm "
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      disabled={this.state.spinnerActualizar}
                    >
                      {this.state.spinnerActualizar ? (
                        <i className=" fa fa-spinner fa-refresh" />
                      ) : (
                        <div>
                          {" "}
                          <i className="fa fa-pencil" />{" "}
                          {t("app_ciudad_modal_actualizar_button_actualizar")}{" "}
                        </div>
                      )}
                    </button>
                    <button
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
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_ciudad_modal_actualizar_button_cerrar")}{" "}
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

ModalEditCiudad.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  t: PropTypes.any,
  id: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default ModalEditCiudad;
