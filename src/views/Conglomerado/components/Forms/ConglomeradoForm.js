import React, { useState } from "react";
import { withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  CustomInput,
  CardBody,
  CardFooter,
  CardHeader,
  Card
} from "reactstrap";
import { CONGLOMERATES } from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import FieldCity from "./components/SelectCity";
import FieldDepartment from "./components/SelectDepartment";
import SelectCountry from "./components/SelectCountry";
import SelectCharges from "./components/SelectCharges";
import { decode } from "jsonwebtoken";

const ConglomeradorForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleSubmit,
    t
  } = props;

  const [oldValue, setOldValue] = useState();
  const [newValue, setNewValue] = useState();

  const changeInValue = (Old, New) => {
    setOldValue(Old);
    setNewValue(New);
  };

  return (
    <div>
      <Card>
        <ToastContainer />
        <CardHeader> {t("app_conglomerado_tab_title")} </CardHeader>
        <CardBody>
          <form className="form" noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_conglomerado_form_registrar_codigo")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="codigo"
                    onChange={e => {
                      setFieldValue("codigo", e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control form-control-sm ${errors.codigo &&
                      touched.codigo &&
                      "is-invalid"}`}
                    placeholder=""
                    value={values.codigo}
                  />
                  <div className="" style={{ color: "#D54B4B" }}>
                    {errors.codigo && touched.codigo ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="codigo" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_conglomerado_form_registrar_nombre")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="nombre"
                    onChange={e => {
                      setFieldValue("nombre", e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control form-control-sm ${errors.nombre &&
                      touched.nombre &&
                      "is-invalid"}`}
                    value={values.nombre}
                    placeholder=""
                  />
                  <div className="" style={{ color: "#D54B4B" }}>
                    {errors.nombre && touched.nombre ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="nombre" />
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    {t("app_conglomerado_form_registrar_pais")}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <SelectCountry
                    authorization={props.authorization}
                    t={props.t}
                    name={"countryId"}
                    onChange={e => {
                      setFieldValue("countryId", e.target.value);
                      changeInValue(values.countryId, e.target.value);
                    }}
                    onBlur={() => {
                      setFieldTouched("countryId", true);
                    }}
                    value={values.countryId}
                    className={`form-control form-control-sm ${errors.countryId &&
                      touched.countryId &&
                      "is-invalid"}`}
                  />

                  {touched ? (
                    <div style={{ color: "#D54B4B" }}>
                      {errors.countryId && touched.countryId ? (
                        <i class="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="countryId" />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    {t("app_conglomerado_form_registrar_departamento")}
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
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    {t("app_conglomerado_form_registrar_ciudad")}{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    authorization={props.authorization}
                    t={props.t}
                    name="cityId"
                    component={FieldCity}
                    departmentId={values.departmentId}
                    oldValueCountryId={oldValue}
                    newValueCountryId={newValue}
                  ></Field>
                  <div style={{ color: "#D54B4B" }}>
                    {errors.cityId && touched.cityId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="cityId" />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {" "}
                    {t(
                      "app_conglomerado_form_registrar_cargo_responsable"
                    )}{" "}
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
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {t("app_conglomerado_form_registrar_descripcion")}
                  </label>
                  <textarea
                    name="descripcion"
                    value={values.descripcion}
                    className="form-control form-control-sm"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="" style={{ color: "#D54B4B" }}>
                    {errors.descripcion && touched.descripcion ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="descripcion" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {" "}
                    {t("app_conglomerado_form_registrar_estado")}{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      value={values.estado}
                      name="estado"
                      type="checkbox"
                      id="ExampleInputCheckbox"
                      label={t(
                        "app_conglomerado_form_registrar_estado_descripcion"
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.estado && touched.estado && "invalid-feedback"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <div className="pull-right">
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
                  {t("app_conglomerado_from_button_guardar")}
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
      codigo: props.conglomerado.codigo,
      nombre: props.conglomerado.nombre,
      descripcion: props.conglomerado.descripcion,
      estado: props.conglomerado.estado,
      countryId: props.conglomerado.countryId,
      departmentId: props.conglomerado.departmentId,
      cityId: props.conglomerado.cityId,
      chargeId: props.conglomerado.chargeId
    }),
    validationSchema: Yup.object().shape({
      codigo: Yup.string()
        .required(" Por favor introduzca un código alfanumérico.")
        .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
        .min(2, " Mínimo 2 caracteres.")
        .max(15, " Máximo 15 caracteres."),
      nombre: Yup.string()
        .required(" Por favor introduzca un nombre.")
        .max(100),
      descripcion: Yup.string().max(250, " Máximo 250 caracteres."),
      estado: Yup.bool()
        .test(
          "Activo",
          " Es necesario activar el conglomerado.",
          value => value === true
        )
        .required(" Es necesario activar el conglomerado."),
      countryId: Yup.string()
        .required(" Por favor seleccione un país.")
        .ensure(),
      departmentId: Yup.string()
        .required(" Por favor seleccione un departamento.")
        .ensure(),
      cityId: Yup.string()
        .required(" Por favor seleccione una ciudad.")
        .ensure(),
      chargeId: Yup.string().ensure()
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
        fetch(CONGLOMERATES, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.authorization
          },
          body: JSON.stringify({
            code: values.codigo,
            name: values.nombre,
            description: values.descripcion,
            status: tipoEstado(values.estado),
            chargeId: values.chargeId,
            cityId: values.cityId,
            userName: username.user_name
          })
        })
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success("Se registro el conglomerado con éxito.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              } else if (response.status === 400) {
                toast.error(
                  "Error al registrar el conglomerado. Inténtelo nuevamente.",
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px"
                    })
                  }
                );
              } else if (response.status === 500) {
                toast.error("Error, el conglomerado ya existe.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              }
            })
          )
          .catch(error => {
            toast.error(`Error ${error}.`, {
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
  })(ConglomeradorForm)
);
