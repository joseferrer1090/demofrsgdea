import React, { Fragment } from "react";
import {
  CustomInput,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  Col,
  Row,
  CardBody,
  Alert,
  CardHeader,
  Collapse
} from "reactstrap";
import PropTypes from "prop-types";
import IMGSEDE from "./../../../assets/img/teamwork.svg";
import { HEADQUARTERS, HEADQUARTER } from "./../../../services/EndPoints";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import SelectConglomerado from "./SelectConglomeradoModalEdit";
import FieldCompany from "./SelectCompanyModalEdit";
import SelectCountry from "./SelectCountryModalEdit";
import FieldDepartment from "./SelectDepartmentModalEdit";
import FieldCity from "./SelectCityModalEdit";
import SelectCharges from "./SelectChargesModalEdit";
import { decode } from "jsonwebtoken";

class ModalEditSedes extends React.Component {
  state = {
    modal: this.props.modaledit,
    collapse: false,
    idSedes: this.props.id,
    dataResult: {},
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    headquarter_status: 0,
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

  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertSuccess: false
    });
  };

  toggle = id => {
    this.setState(
      {
        modal: !this.state.modal,
        idSedes: id
      },
      () => {
        this.props.updateTable();
      }
    );
    this.getHeadquarterByID(id);
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  getHeadquarterByID = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${HEADQUARTER}${id}?username=${username.user_name}`, {
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
            headquarter_name: data.name,
            headquarter_code: data.code,
            headquarter_description: data.description,
            headquarter_status: data.status,
            headquarter_prefix: data.prefix,
            headquarter_sequence: data.sequence,
            headquarter_country:
              data.city.department.country.status !== 1
                ? ""
                : data.city.department.country.id,
            headquarter_department:
              data.city.department.status !== 1 ? "" : data.city.department.id,
            headquarter_city: data.city.status !== 1 ? "" : data.city.id,
            headquarter_address: data.address,
            headquarter_phone: data.phone,
            headquarter_conglomerate: data.company.conglomerate.id,
            headquarter_company: data.company.id,
            headquarter_charge: data.charge === null ? " " : data.charge.id
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
            {t("app_sedes_modal_actualizar_titulo")}{" "}
            {this.state.dataResult.headquarter_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            validationSchema={Yup.object().shape({
              headquarter_conglomerate: Yup.string()
                .required(" Por favor seleccione un conglomerado.")
                .ensure(),
              headquarter_company: Yup.string()
                .required(" Por favor seleccione una empresa.")
                .ensure(),
              headquarter_code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              headquarter_name: Yup.string()
                .required(" Por favor introduzca un nombre.")
                .max(100, " Máximo 100 caracteres"),
              headquarter_description: Yup.string()
                .max(250, " Máximo 250 caracteres")
                .nullable(),
              headquarter_prefix: Yup.string()
                .required(" Por favor asigne un prefijo de radicación.")
                .min(2, " Mínimo 2 caracteres.")
                .max(6, " Máximo 6 caracteres."),
              headquarter_sequence: Yup.number()
                .required(" Por favor asigne una secuencia de radicación.")
                .integer()
                .positive(),
              headquarter_country: Yup.string()
                .ensure()
                .required(" Por favor seleccione un país."),
              headquarter_department: Yup.string()
                .ensure()
                .required(" Por favor seleccione un departamento."),
              headquarter_city: Yup.string()
                .ensure()
                .required(" Por favor seleccione una ciudad."),
              headquarter_address: Yup.string().required(
                " Por favor introduzca una dirección."
              ),
              headquarter_phone: Yup.string()
                .max(10, " Máximo 10 caracteres.")
                .required(" Por favor introduzca un número telefónico."),
              headquarter_charge: Yup.string().ensure(),
              headquarter_status: Yup.bool().test(
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
                fetch(HEADQUARTERS, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.state.auth
                  },
                  body: JSON.stringify({
                    id: this.state.idSedes,
                    code: values.headquarter_code,
                    name: values.headquarter_name,
                    prefix: values.headquarter_prefix,
                    sequence: values.headquarter_sequence,
                    address: values.headquarter_address,
                    phone: values.headquarter_phone,
                    companyId: values.headquarter_company,
                    cityId: values.headquarter_city,
                    chargeId: values.headquarter_charge,
                    description: values.headquarter_description,
                    status: tipoEstado(values.headquarter_status),
                    userName: "ccuartas"
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
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
              }, 1000);
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t("app_sedes_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_sedes_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_sedes_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGSEDE} className="img-thumbnail" />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t("app_sedes_modal_actualizar_titulo_2")}{" "}
                          </h5>{" "}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "app_sedes_form_actualizar_conglomerado"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <SelectConglomerado
                                authorization={this.state.auth}
                                t={this.state.t}
                                name={"headquarter_conglomerate"}
                                onChange={e =>
                                  setFieldValue(
                                    "headquarter_conglomerate",
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched(
                                    "headquarter_conglomerate",
                                    true
                                  )
                                }
                                value={values.headquarter_conglomerate}
                                className={`form-control form-control-sm ${errors.headquarter_conglomerate &&
                                  touched.headquarter_conglomerate &&
                                  "is-invalid"}`}
                              />

                              <div style={{ color: "#D54B4B" }}>
                                {errors.headquarter_conglomerate &&
                                touched.headquarter_conglomerate ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_conglomerate" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t("app_sedes_form_actualizar_empresa")}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <Field
                                authorization={this.state.auth}
                                t={this.state.t}
                                name="headquarter_company"
                                component={FieldCompany}
                                conglomerateId={
                                  props.values.headquarter_conglomerate
                                }
                                companyId={props.values.headquarter_company}
                              ></Field>

                              <div style={{ color: "#D54B4B" }}>
                                {errors.headquarter_company &&
                                touched.headquarter_company ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_company" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t("app_sedes_form_actualizar_codigo")}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name={"headquarter_code"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_code}
                                type="text"
                                className={`form-control form-control-sm ${errors.headquarter_code &&
                                  touched.headquarter_code &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.headquarter_code &&
                                touched.headquarter_code ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_code" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t("app_sedes_form_actualizar_nombre")}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="text"
                                name={"headquarter_name"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_name}
                                className={`form-control form-control-sm ${errors.headquarter_name &&
                                  touched.headquarter_name &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.headquarter_name &&
                                touched.headquarter_name ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_name" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "app_sedes_form_actualizar_descripcion"
                                )}{" "}
                              </label>
                              <textarea
                                name={"headquarter_description"}
                                value={values.headquarter_description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control form-control-sm ${errors.headquarter_description &&
                                  touched.headquarter_description &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.headquarter_description &&
                                touched.headquarter_description ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage
                                  name={"headquarter_description"}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "app_sedes_form_actualizar_prefij_radicacion"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="text"
                                name="headquarter_prefix"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_prefix}
                                className={`form-control form-control-sm ${errors.headquarter_prefix &&
                                  touched.headquarter_prefix &&
                                  "is-invalid"}`}
                                maxLength={"6"}
                                placeholder=" "
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.headquarter_prefix &&
                                touched.headquarter_prefix ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_prefix" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "app_sedes_form_actualizar_sec_radicacion"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                type="number"
                                name="headquarter_sequence"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_sequence}
                                className="form-control form-control-sm"
                                min={0}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.headquarter_sequence &&
                                touched.headquarter_sequence ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_sequence" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col sm="12">
                        <Card>
                          <CardHeader>
                            {" "}
                            <a
                              onClick={() => {
                                this.toggleCollapse();
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                              {t("app_sedes_form_actualizar_collapse")}{" "}
                            </a>{" "}
                          </CardHeader>
                          <Collapse isOpen={this.state.collapse}>
                            <CardBody>
                              <form className="form">
                                <div className="row" />
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_sedes_form_actualizar_cargo_responsable"
                                        )}{" "}
                                      </label>
                                      <SelectCharges
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name={"headquarter_charge"}
                                        onChange={e =>
                                          setFieldValue(
                                            "headquarter_charge",
                                            e.target.value
                                          )
                                        }
                                        onBlur={() => {
                                          setFieldTouched(
                                            "headquarter_charge",
                                            true
                                          );
                                        }}
                                        value={values.headquarter_charge}
                                        className={`form-control form-control-sm ${errors.headquarter_charge &&
                                          touched.headquarter_charge &&
                                          "is-invalid"}`}
                                      />

                                      <ErrorMessage name="headquarter_charge" />
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t("app_sedes_form_actualizar_pais")}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <SelectCountry
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name={"headquarter_country"}
                                        onChange={e =>
                                          setFieldValue(
                                            "headquarter_country",
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched("headquarter_country")
                                        }
                                        value={values.headquarter_country}
                                        className={`form-control form-control-sm ${errors.headquarter_country &&
                                          touched.headquarter_country &&
                                          "is-invalid"}`}
                                      />

                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.headquarter_country &&
                                        touched.headquarter_country ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_country" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_sedes_form_actualizar_departamento"
                                        )}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <Field
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name="headquarter_department"
                                        component={FieldDepartment}
                                        countryId={
                                          props.values.headquarter_country
                                        }
                                        departmentId={
                                          props.values.headquarter_department
                                        }
                                      ></Field>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.headquarter_department &&
                                        touched.headquarter_department ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_department" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_sedes_form_actualizar_ciudad"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <Field
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name="headquarter_city"
                                        component={FieldCity}
                                        departmentId={
                                          props.values.headquarter_department
                                        }
                                        cityId={props.values.headquarter_city}
                                        countryId={
                                          props.values.headquarter_country
                                        }
                                      ></Field>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.headquarter_city &&
                                        touched.headquarter_city ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_city" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-8">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_sedes_form_actualizar_direccion"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"headquarter_address"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.headquarter_address}
                                        type="text"
                                        className={`form-control form-control-sm ${errors.headquarter_address &&
                                          touched.headquarter_address &&
                                          "is-invalid"}`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.headquarter_address &&
                                        touched.headquarter_address ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_address" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="from-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_sedes_form_actualizar_telefono"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        type="text"
                                        name="headquarter_phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.headquarter_phone}
                                        className={`form-control form-control-sm ${errors.headquarter_phone &&
                                          touched.headquarter_phone &&
                                          "is-invalid"}`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.headquarter_phone &&
                                        touched.headquarter_phone ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_phone" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row" />

                                <div className="form-group">
                                  <label>
                                    {" "}
                                    {t("app_sedes_form_actualizar_estado")}{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="headquarter_status"
                                      render={({ field, form }) => {
                                        return (
                                          <CustomInput
                                            type="checkbox"
                                            id="conglomeradoModalEdit"
                                            label={t(
                                              "app_sedes_form_actualizar_estado_descripcion"
                                            )}
                                            {...field}
                                            checked={field.value}
                                            className={
                                              errors.headquarter_status &&
                                              touched.headquarter_status &&
                                              "invalid-feedback"
                                            }
                                          />
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </form>
                            </CardBody>
                          </Collapse>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-outline-success btn-sm"}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" />{" "}
                      {t("app_sedes_form_actualizar_boton_actualizar")}
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
                      {t("app_sedes_form_actualizar_boton_cerrar")}{" "}
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

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any
};

export default ModalEditSedes;
