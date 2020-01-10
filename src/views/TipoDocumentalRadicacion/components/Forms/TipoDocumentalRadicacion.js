import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, CustomInput, Button, Alert } from "reactstrap";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";

const TipoDocumentalRadicacion = props => {
  const { t } = props;
  return (
    <Formik
      initialValues={{
        tipocorrespondencia: "",
        codigo: "",
        nombre: "",
        descripcion: "",
        d_maximos: "",
        conglomerado: "",
        empresa: "",
        sede: "",
        dependencia: "",
        estado: false
      }}
      validationSchema={Yup.object().shape({
        tipocorrespondencia: Yup.string()
          .ensure()
          .required(" Por favor seleccione el tipo de correspondencia."),
        codigo: Yup.string()
          .required(" Por favor introduzca un código.")
          .matches(/^[0-9a-zA-Z]+$/, " No es un codigo alfanumerico")
          .min(2, " minimo 2 caracteres para el codigo")
          .max(15, " maximo 15 caracteres para el codigo"),
        nombre: Yup.string().required(" Por favor introduzca un nombre."),
        descripcion: Yup.string().required(
          " Por favor introduzca una descripción."
        ),
        d_maximos: Yup.number()
          .integer()
          .positive()
          .required(" Por favor introduzca los días máximos de respuesta."),
        estado: Yup.bool()
          .test(
            "Activo",
            "Es necesario activar el tipo de trámite",
            value => value === true
          )
          .required(" Es necesario activar el tipo de trámite.")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const tipoEstado = data => {
          let tipo = null;
          if (data === true) {
            return (tipo = 1);
          } else if (data === false) {
            return (tipo = 0);
          }
          return null;
        };
        const tipoCorrespondencia = data => {
          let tipo = null;
          if (data === "1") {
            return (tipo = 1);
          } else if (data === "2") {
            return (tipo = 2);
          } else if (data === "3") {
            return (tipo = 3);
          }
          return null;
        };
        setTimeout(() => {
          const auth = props.authorization;
          const username = decode(auth);
          console.log({
            code: values.codigo,
            name: values.nombre,
            description: values.descripcion,
            answerDays: values.d_maximos,
            issue: values.asunto,
            status: tipoEstado(values.estado),
            typeCorrespondence: values.tipocorrespondencia,
            templateId: "ef41a67a-5acb-4d8a-8f7e-2d4709a02e7d"
            // userName: username.user_name
            // users: usersdata.users,
            // original: usersdata.original
          });
          setSubmitting(false);
          resetForm({
            tipocorrespondencia: "",
            codigo: "",
            nombre: "",
            descripcion: "",
            d_maximos: "",
            conglomerado: "",
            empresa: "",
            sede: "",
            dependencia: ""
          });
        }, 1000);
      }}
      render={({
        values,
        touched,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldTouched,
        setFieldValue
      }) => (
        <div className="col-md-12">
          <form className="form">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_1")}
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_tipoTramite_form_registrar_tipo_correspondencia"
                                )}{" "}
                                <span className="text-danger">* </span>
                              </label>
                              <select
                                name="tipocorrespondencia"
                                value={values.tipocorrespondencia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control form-control-sm ${errors.tipocorrespondencia &&
                                  touched.tipocorrespondencia &&
                                  "is-invalid"}`}
                              >
                                <option value={""}>
                                  {" "}
                                  --
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia"
                                  )}
                                  --{" "}
                                </option>
                                <option value={1}>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia_recibida"
                                  )}{" "}
                                </option>
                                <option value={2}>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia_despachada"
                                  )}{" "}
                                </option>
                                <option value={3}>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia_interna"
                                  )}{" "}
                                </option>
                              </select>
                              <div style={{ color: "#D54B4B" }}>
                                {errors.tipocorrespondencia &&
                                touched.tipocorrespondencia ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="tipocorrespondencia" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t("app_tipoTramite_form_registrar_codigo")}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name="codigo"
                                onChange={e => {
                                  setFieldValue(
                                    "codigo",
                                    e.target.value.toUpperCase()
                                  );
                                }}
                                onBlur={handleBlur}
                                value={values.codigo}
                                type="text"
                                className={`form-control form-control-sm ${errors.codigo &&
                                  touched.codigo &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
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
                                {t("app_tipoTramite_form_registrar_nombre")}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name={"nombre"}
                                onChange={e => {
                                  setFieldValue(
                                    "nombre",
                                    e.target.value.toUpperCase()
                                  );
                                }}
                                onBlur={handleBlur}
                                value={values.nombre}
                                type="text"
                                className={`form-control form-control-sm ${errors.nombre &&
                                  touched.nombre &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.nombre && touched.nombre ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={"nombre"} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_tipoTramite_form_registrar_descripcion"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name="descripcion"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.descripcion}
                                type="text"
                                className={`form-control form-control-sm ${errors.descripcion &&
                                  touched.descripcion &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.descripcion && touched.descripcion ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="descripcion" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_tipoTramite_form_registrar_dias_respuesta"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name={"d_maximos"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.d_maximos}
                                type="number"
                                className={`form-control form-control-sm ${errors.d_maximos &&
                                  touched.d_maximos &&
                                  "is-invalid"}`}
                                min={0}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.d_maximos && touched.d_maximos ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={"d_maximos"} />
                              </div>
                            </div>
                          </div>
                          <Col sm="12">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "app_tipoTramite_form_registrar_estado"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <div className="text-justify">
                                <CustomInput
                                  name={"estado"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.estado}
                                  type="checkbox"
                                  id="ExampleInputCheckbox"
                                  label={t(
                                    "app_tipoTramite_form_registrar_descripcion_estado"
                                  )}
                                  className={
                                    errors.estado &&
                                    touched.estado &&
                                    "invalid-feedback"
                                  }
                                />
                              </div>
                            </div>
                          </Col>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_2")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_conglomerado"
                                  )}{" "}
                                </label>
                                {/* <SelectConglomerado
                                  authorization={props.authorization}
                                  t={props.t}
                                  name="conglomerado"
                                  value={values.conglomerado}
                                  onChange={e => {
                                    setFieldValue(
                                      "conglomerado",
                                      e.target.value
                                    );
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("conglomerado", true);
                                  }}
                                  className="form-control form-control-sm"
                                /> */}
                                {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {t("app_tipoTramite_form_registrar_empresa")}{" "}
                                </label>
                                {/* <SelectEmpresa
                                  authorization={props.authorization}
                                  idConglomerado={values.conglomerado}
                                  t={props.t}
                                  name="empresa"
                                  value={values.empresa}
                                  onChange={e => {
                                    setFieldValue("empresa", e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("empresa", true);
                                  }}
                                  className={"form-control form-control-sm"}
                                /> */}
                                {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_sede"
                                  )}{" "}
                                </label>
                                {/* <SelectSede
                                  authorization={props.authorization}
                                  t={props.t}
                                  idEmpresa={values.empresa}
                                  name="sede"
                                  value={values.sede}
                                  onChange={e => {
                                    setFieldValue("sede", e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("sede", true);
                                  }}
                                  className="form-control form-control-sm"
                                /> */}
                                {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_dependencia"
                                  )}{" "}
                                </label>
                                {/* <SelectDependencia
                                  authorization={props.authorization}
                                  t={props.t}
                                  idSede={values.sede}
                                  name="dependencia"
                                  value={values.dependencia}
                                  onChange={e => {
                                    setFieldValue(
                                      "dependencia",
                                      e.target.value
                                    );
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("dependencia", true);
                                  }}
                                  className={"form-control form-control-sm"}
                                /> */}
                              </div>
                            </div>
                            <div className="col-md-12">
                              {/* <UserList
                                authorization={props.authorization}
                                id={values.dependencia}
                                t={props.t}
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <UserListEnabled data={usersdata} t={props.t} /> */}
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_4")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {t("app_tipoTramite_form_registrar_asunto")}
                                </label>
                                <textarea
                                  name={"asunto"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.asunto}
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_5")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {t(
                                    "app_tipoTramite_form_registrar_plantilla"
                                  )}
                                </label>
                                <select
                                  name={"plantilla"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.plantilla}
                                  className="form-control form-control-sm"
                                >
                                  <option>
                                    --
                                    {t(
                                      "app_tipoTramite_form_registrar_select_plantilla"
                                    )}
                                    --
                                  </option>
                                  <option>Plantilla 1</option>
                                  <option>Plantilla 2</option>
                                  <option>Plantilla 3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_6")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {t("app_tipoTramite_form_registrar_workflow")}
                                </label>
                                <select
                                  name={"workflow"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.workflow}
                                  className="form-control form-control-sm"
                                >
                                  <option>
                                    --{" "}
                                    {t(
                                      "app_tipoTramite_form_registrar_select_workflow"
                                    )}{" "}
                                    --
                                  </option>
                                  <option>Workflow1</option>
                                  <option>Workflow2</option>
                                  <option>Workflow3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
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
                        {t("app_tipoTramite_form_registrar_boton_guardar")}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    />
  );
};
TipoDocumentalRadicacion.propTypes = {};

export default withTranslation("translations")(TipoDocumentalRadicacion);
