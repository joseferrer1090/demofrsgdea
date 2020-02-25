import React, { useState, useEffect } from "react";
import { withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput,
  Col,
  Row,
  Alert
} from "reactstrap";
import { HEADQUARTERS, CHARGES_STATUS } from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import SelectConglomerado from "./components/SelectConglomerado";
import SelectCompany from "./components/SelectCompany";
import SelectCountry from "./components/SelectCountry";
import FieldDepartment from "./components/SelectDepartment";
import FieldCity from "./components/SelectCity";
import SelectCharges from "./components/SelectCharges";
import { decode } from "jsonwebtoken";

const SedesForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    t
  } = props;

  const [visibleAlert, setVisibleAlert] = useState(true);
  const [oldValue, setOldValue] = useState();
  const [newValue, setNewValue] = useState();

  const onDismiss = () => {
    setVisibleAlert(!visibleAlert);
  };

  const changeInValue = (Old, New) => {
    setOldValue(Old);
    setNewValue(New);
  };

  return (
    <div>
      <Card>
        <ToastContainer />
        <CardHeader>{t("app_sedes_tab_title")}</CardHeader>
        <CardBody>
          <form className="form">
            <Row>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_conglomerado")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <SelectConglomerado
                    authorization={props.authorization}
                    t={props.t}
                    name={"conglomerateId"}
                    onChange={e =>
                      setFieldValue("conglomerateId", e.target.value)
                    }
                    onBlur={() => setFieldTouched("conglomerateId", true)}
                    value={values.conglomerateId}
                    className={`form-control form-control-sm ${errors.conglomerateId &&
                      touched.conglomerateId &&
                      "is-invalid"}`}
                  />

                  <div style={{ color: "#D54B4B" }}>
                    {errors.conglomerateId && touched.conglomerateId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="conglomerateId" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_empresa")}{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <br />
                  <SelectCompany
                    authorization={props.authorization}
                    t={props.t}
                    conglomerateId={props.values.conglomerateId}
                    name="companyId"
                    value={values.companyId}
                    onChange={e => setFieldValue("companyId", e.target.value)}
                    onBlur={() => setFieldTouched("companyId", true)}
                    className={`form-control form-control-sm ${errors.companyId &&
                      touched.companyId &&
                      "is-invalid"}`}
                  ></SelectCompany>

                  <div style={{ color: "#D54B4B" }}>
                    {errors.companyId && touched.companyId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="companyId" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_codigo")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="code"
                    onChange={e => {
                      setFieldValue("code", e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    value={values.code}
                    type="text"
                    className={`form-control form-control-sm ${errors.code &&
                      touched.code &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: "#D54B4B" }}>
                    {errors.code && touched.code ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="code" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_nombre")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="name"
                    onChange={e => {
                      setFieldValue("name", e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    value={values.name}
                    type="text"
                    className={`form-control form-control-sm ${errors.name &&
                      touched.name &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: "#D54B4B" }}>
                    {errors.name && touched.name ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label> {t("app_sedes_form_registrar_descripcion")} </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="form-control form-control-sm"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <div className="form-group ">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_prefij_radicacion")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="prefix"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.prefix}
                    type="text"
                    className={`form-control form-control-sm ${errors.prefix &&
                      touched.prefix &&
                      "is-invalid"}`}
                    maxLength={"6"}
                    placeholder=" "
                  />
                  <div style={{ color: "#D54B4B" }}>
                    {errors.prefix && touched.prefix ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="prefix" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_sec_radicacion")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name={"sequence"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sequence}
                    type="number"
                    className={`form-control form-control-sm ${errors.sequence &&
                      touched.sequence &&
                      "is-invalid"}`}
                    min={0}
                  />
                  <div style={{ color: "#D54B4B" }}>
                    {errors.sequence && touched.sequence ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="sequence" />
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <Alert
                  color="secondary"
                  isOpen={visibleAlert}
                  toggle={onDismiss}
                  fade={true}
                >
                  <h4 className="alert-heading">
                    {t("app_sedes_form_registrar_alert_title")}
                  </h4>
                  <p>{t("app_sedes_form_registrar_alert_title_2")}</p>
                  <hr />
                  <p className="mb-0">
                    {t("app_sedes_form_registrar_alert_title_3")}
                  </p>
                </Alert>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <div className="form-group">
                  <label>{t("app_sedes_form_registrar_pais")}</label>
                  <span className="text-danger">*</span>{" "}
                  <SelectCountry
                    authorization={props.authorization}
                    t={props.t}
                    name={"countryId"}
                    onChange={e => {
                      setFieldValue("countryId", e.target.value);
                      changeInValue(values.countryId, e.target.value);
                    }}
                    onBlur={() => setFieldTouched("countryId", true)}
                    value={values.countryId}
                    className={`form-control form-control-sm ${errors.countryId &&
                      touched.countryId &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: "#D54B4B" }}>
                    {errors.countryId && touched.countryId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="countryId" />
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>
                    {t("app_sedes_form_registrar_departamento")}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <Field
                    authorization={props.authorization}
                    t={props.t}
                    name="departmentId"
                    component={FieldDepartment}
                    oldValueCountryId={oldValue}
                    newValueCountryId={newValue}
                  ></Field>

                  <div style={{ color: "#D54B4B" }}>
                    {errors.departmentId && touched.departmentId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="departmentId" />
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>
                    {t("app_sedes_form_registrar_ciudad")}{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    authorization={props.authorization}
                    t={props.t}
                    name="cityId"
                    component={FieldCity}
                    departmentId={values.departmentId}
                  ></Field>
                  <div style={{ color: "#D54B4B" }}>
                    {errors.cityId && touched.cityId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="cityId" />
                  </div>
                </div>
              </Col>
              <Col sm="7">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_direccion")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name={"address"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    type="text"
                    className={`form-control form-control-sm ${errors.address &&
                      touched.address &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: "#D54B4B" }}>
                    {errors.address && touched.address ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="address" />
                  </div>
                </div>
              </Col>
              <Col sm="5">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_telefono")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name={"phone"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    type="text"
                    className={`form-control form-control-sm ${errors.phone &&
                      touched.phone &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: "#D54B4B" }}>
                    {errors.phone && touched.phone ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="phone" />
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="12">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_cargo_responsable")}{" "}
                  </label>

                  <SelectCharges
                    authorization={props.authorization}
                    t={props.t}
                    name={"chargeId"}
                    onChange={e => setFieldValue("chargeId", e.target.value)}
                    onBlur={() => {
                      setFieldTouched("chargeId", true);
                    }}
                    value={values.chargeId}
                    className={`form-control form-control-sm ${errors.chargeId &&
                      touched.chargeId &&
                      "is-invalid"}`}
                  />
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_sedes_form_registrar_estado")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      name={"status"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.status}
                      type="checkbox"
                      id="ExampleInputCheckbox"
                      label={t("app_sedes_form_registrar_estado_descripcion")}
                      className={
                        errors.status && touched.status && "invalid-feedback"
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        </CardBody>
        <CardFooter>
          <div className="float-right">
            <button
              type="submit"
              className="btn btn-outline-secondary btn-sm"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <i className=" fa fa-spinner fa-spin" />
              ) : (
                <div>
                  <i className="fa fa-save" />{" "}
                  {t("app_sedes_form_registrar_boton_guardar")}
                </div>
              )}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: props => ({
      conglomerateId: props.sede.conglomerateId,
      companyId: props.sede.companyId,
      code: props.sede.code,
      name: props.sede.name,
      description: props.sede.description,
      prefix: props.sede.prefix,
      sequence: props.sede.sequence,
      countryId: props.sede.countryId,
      departmentId: props.sede.departmentId,
      cityId: props.sede.cityId,
      address: props.sede.address,
      phone: props.sede.phone,
      chargeId: props.sede.chargeId,
      status: props.sede.status
    }),
    validationSchema: Yup.object().shape({
      conglomerateId: Yup.string()
        .required(" Por favor seleccione un conglomerado.")
        .ensure(),
      companyId: Yup.string()
        .required(" Por favor seleccione una empresa.")
        .ensure(),
      code: Yup.string()
        .required(" Por favor introduzca un código alfanumérico.")
        .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
        .min(2, " Mínimo 2 caracteres.")
        .max(15, " Máximo 15 caracteres."),
      name: Yup.string()
        .required(" Por favor introduzca un nombre.")
        .max(100, " Máximo 100 caracteres"),
      description: Yup.string().max(250, "Máximo 250 caracteres."),
      prefix: Yup.string()
        .required(" Por favor asigne un prefijo de radicación.")
        .min(2, " Mínimo 2 caracteres.")
        .max(6, " Máximo 6 caracteres."),
      sequence: Yup.number()
        .required(" Por favor asigne una secuencia de radicación.")
        .integer()
        .positive(),
      countryId: Yup.string()
        .ensure()
        .required(" Por favor seleccione un país."),
      departmentId: Yup.string()
        .ensure()
        .required(" Por favor seleccione un departamento."),
      cityId: Yup.string()
        .ensure()
        .required(" Por favor seleccione una ciudad."),
      address: Yup.string().required(" Por favor introduzca una dirección."),
      phone: Yup.string()
        .max(10, " Máximo 8 caracteres")
        .required(" Por favor introduzca un número telefónico."),
      chargeId: Yup.string().ensure(),
      status: Yup.bool()
        .test(
          "Activo",
          " Es necesario activar la sede.",
          value => value === true
        )
        .required(" Es necesario activar la sede.")
    }),
    handleSubmit: (values, { setSubmitting, resetForm, props }) => {
      const tipoEstado = data => {
        let tipo = null;
        if (data === true) {
          return (tipo = 1);
        } else if (data === false) {
          return (tipo = 0);
        }
        return null;
      };
      setTimeout(() => {
        const auth = props.authorization;
        const username = decode(auth);
        fetch(HEADQUARTERS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth
          },
          body: JSON.stringify({
            description: values.description,
            code: values.code,
            name: values.name,
            prefix: values.prefix,
            sequence: values.sequence,
            address: values.address,
            phone: values.phone,
            companyId: values.companyId,
            cityId: values.cityId,
            chargeId: values.chargeId,
            status: tipoEstado(values.status),
            userName: username.user_name
          })
        })
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success("Se registro la sede con éxito.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              } else if (response.status === 400) {
                toast.error(
                  "Error al registrar la sede. Inténtelo nuevamente.",
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px"
                    })
                  }
                );
              } else if (response.status === 500) {
                toast.error("Error, la sede ya existe.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              }
            })
          )
          .catch(error => {
            toast.error(`Error ${error}`, {
              position: toast.POSITION.TOP_RIGHT,
              className: css({
                marginTop: "60px"
              })
            });
          });
        setSubmitting(false);
        resetForm();
      }, 1000);
    }
  })(SedesForm)
);
