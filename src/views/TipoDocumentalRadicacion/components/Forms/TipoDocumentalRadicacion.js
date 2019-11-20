import React from "react";
import { withFormik, ErrorMessage } from "formik";
import { Col, CustomInput } from "reactstrap";
import * as Yup from "yup";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

const TipoDocumentalRadicacion = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    t
  } = props;
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="p-2 mb-1 bg-light text-dark">
                  {t("app_documentalRadicacion_form_registrar_titulo_1")}
                </div>
                <div className="card-body">
                  <form className="form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_tipo_correspondencia"
                            )}{" "}
                            <span className="text-danger">* </span>
                          </label>
                          <select
                            name={"tipo_correspondencia"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tipo_correspondencia}
                            className={`form-control form-control-sm ${errors.tipo_correspondencia &&
                              touched.tipo_correspondencia &&
                              "is-invalid"}`}
                          >
                            <option disabled value={""}>
                              {" "}
                              --{" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_tipo_correspondencia"
                              )}{" "}
                              --{" "}
                            </option>
                            <option value={"1"}>
                              {" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_tipo_correspondencia_recibida"
                              )}{" "}
                            </option>
                            <option value={"2"}>
                              {" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_tipo_correspondencia_despachada"
                              )}{" "}
                            </option>
                            <option value={"3"}>
                              {" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_tipo_correspondencia_interna"
                              )}{" "}
                            </option>
                          </select>
                          <div style={{ color: "#D54B4B" }}>
                            {errors.tipo_correspondencia &&
                            touched.tipo_correspondencia ? (
                              <i className="fa fa-exclamation-triangle" />
                            ) : null}
                            <ErrorMessage name={"tipo_correspondencia"} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_codigo"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"codigo"}
                            onChange={e => {
                              setFieldValue(
                                "codigo",
                                e.target.value.toUpperCase()
                              );
                            }}
                            onBlur={handleBlur}
                            values={values.codigo}
                            type="text"
                            className={`form-control form-control-sm ${errors.codigo &&
                              touched.codigo &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: "#D54B4B" }}>
                            {errors.codigo && touched.codigo ? (
                              <i className="fa fa-exclamation-triangle" />
                            ) : null}
                            <ErrorMessage name={"codigo"} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_nombre"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            type="text"
                            name={"nombre"}
                            onChange={e => {
                              setFieldValue(
                                "nombre",
                                e.target.value.toUpperCase()
                              );
                            }}
                            onBlur={handleBlur}
                            value={values.nombre}
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
                              "app_documentalRadicacion_form_registrar_descripcion"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"descripcion"}
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
                            <ErrorMessage name={"descripcion"} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_dias_respuesta"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"d_maximos_respuesta"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.d_maximos_respuesta}
                            type="number"
                            min={0}
                            className={`form-control form-control-sm ${errors.d_maximos_respuesta &&
                              touched.d_maximos_respuesta &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: "#D54B4B" }}>
                            {errors.d_maximos_respuesta &&
                            touched.d_maximos_respuesta ? (
                              <i className="fa fa-exclamation-triangle" />
                            ) : null}
                            <ErrorMessage name={"d_maximos_respuesta"} />
                          </div>
                        </div>
                      </div>
                      <Col sm="12">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_documentalRadicacion_form_registrar_estado"
                            )}{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <div className="text-justify">
                            <CustomInput
                              name={"estado"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.estados}
                              type="checkbox"
                              id="ExampleInputCheckbox"
                              label={t(
                                "app_documentalRadicacion_form_registrar_descripcion_estado"
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
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="p-2 mb-1 bg-light text-dark">
                  {t("app_documentalRadicacion_form_registrar_titulo_2")}
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_documentalRadicacion_form_registrar_conglomerado"
                            )}{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>
                              --{" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_conglomerado"
                              )}{" "}
                              --
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_empresa"
                            )}{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>
                              --{" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_empresa"
                              )}{" "}
                              --
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_documentalRadicacion_form_registrar_sede"
                            )}{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>
                              --{" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_sede"
                              )}{" "}
                              --
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_documentalRadicacion_form_registrar_dependencia"
                            )}{" "}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>
                              --{" "}
                              {t(
                                "app_documentalRadicacion_form_registrar_select_dependecia"
                              )}{" "}
                              --
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_documentalRadicacion_form_registrar_select_buscar_usuario"
                            )}{" "}
                          </label>
                          <div className="input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              aria-label="Dollar amount (with dot and two decimal places)"
                            />
                            <div
                              className="input-group-append"
                              id="button-addon4"
                            >
                              <button
                                className="btn btn-secondary"
                                type="button"
                              >
                                <i className="fa fa-search" />
                              </button>
                              <button
                                className="btn btn-secondary"
                                type="button"
                              >
                                <i className="fa fa-plus" />{" "}
                                {t(
                                  "app_documentalRadicacion_form_registrar_select_buscar_usuario_agregar"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <textarea
                          className="form-control form-control-sm"
                          disabled
                          placeholder={t(
                            "app_documentalRadicacion_form_registrar_placeholder_select"
                          )}
                          rows={8}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="p-2 mb-1 bg-light text-dark">
                  {t("app_documentalRadicacion_form_registrar_titulo_3")}
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <table className="table table-bordered table-sm">
                          <thead className="thead-light">
                            <tr className="text-center">
                              <th scope="col">
                                {t(
                                  "app_documentalRadicacion_form_registrar_table_usuarios_disponibles_usuario"
                                )}
                              </th>
                              <th scope="col">
                                {t(
                                  "app_documentalRadicacion_form_registrar_table_usuarios_disponibles_sede"
                                )}
                              </th>
                              <th scope="col">
                                {t(
                                  "app_documentalRadicacion_form_registrar_table_usuarios_disponibles_dependencia"
                                )}
                              </th>
                              <th scope="col">
                                {t(
                                  "app_documentalRadicacion_form_registrar_table_usuarios_disponibles_original"
                                )}
                              </th>
                              <th scope="col">
                                {t(
                                  "app_documentalRadicacion_form_registrar_table_usuarios_disponibles_eliminar"
                                )}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            <tr>
                              <td scope="row">NOMBRE COMPLETO DEL USUARIO</td>
                              <td>SEDE I</td>
                              <td>DEPENDENCIA I</td>
                              <td>
                                <CustomInput
                                  type="radio"
                                  id="exampleCustomCheckbox2"
                                />{" "}
                              </td>
                              <td>
                                {" "}
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                >
                                  <i className="fa fa-trash" />
                                </button>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="p-2 mb-1 bg-light text-dark">
                  {t("app_documentalRadicacion_form_registrar_titulo_4")}
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_asunto"
                            )}
                          </label>
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="p-2 mb-1 bg-light text-dark">
                  {t("app_documentalRadicacion_form_registrar_titulo_5")}
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_plantilla"
                            )}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>
                              --
                              {t(
                                "app_documentalRadicacion_form_registrar_select_plantilla"
                              )}
                              --
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="p-2 mb-1 bg-light text-dark">
                  {t("app_documentalRadicacion_form_registrar_titulo_6")}
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_documentalRadicacion_form_registrar_workflow"
                            )}
                          </label>
                          <select className="form-control form-control-sm">
                            <option>
                              --
                              {t(
                                "app_documentalRadicacion_form_registrar_select_workflow"
                              )}
                              --
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
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
                  {t("app_documentalRadicacion_form_registrar_boton_guardar")}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: props => ({
      tipo_correspondencia: props.tdocumentalradicacion.tipo_correspondencia,
      codigo: props.tdocumentalradicacion.codigo,
      nombre: props.tdocumentalradicacion.nombre,
      descripcion: props.tdocumentalradicacion.descripcion,
      d_maximos_respuesta: props.tdocumentalradicacion.d_maximos_respuesta,
      estado: props.tdocumentalradicacion.estado,
      user_enabled: props.tdocumentalradicacion.user_enabled,
      asunto: props.tdocumentalradicacion.asunto,
      plantilla: props.tdocumentalradicacion.plantilla,
      workflow: props.tdocumentalradicacion.workflow
    }),
    validationSchema: Yup.object().shape({
      tipo_correspondencia: Yup.string()
        .ensure()
        .required(" Por favor seleccione el tipo de correspondencia."),
      codigo: Yup.string().required(" Por favor introduzca un código. "),
      nombre: Yup.string().required(" Por favor introduzca un nombre."),
      descripcion: Yup.string().required(
        " Por favor introduzca una descripción."
      ),
      d_maximos_respuesta: Yup.number()
        .positive()
        .integer()
        .required(" Por favor introduzca el número de días de respuesta."),
      estado: Yup.bool().test(
        "Activo",
        "Se necesita activar el tipo documental de radicacion",
        value => value === true
      ),
      user_enabled: Yup.array().of(
        Yup.object().shape({ id: Yup.number(), name: Yup.string() })
      ),
      plantilla: Yup.string().notRequired(),
      workflow: Yup.string()
        .ensure()
        .notRequired(),
      asunto: Yup.string().notRequired()
    }),
    handleSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        resetForm();
      }, 1000);
    }
  })(TipoDocumentalRadicacion)
);
TipoDocumentalRadicacion.propTypes = {
  t: PropTypes.any
};
