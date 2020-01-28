import React from "react";
import PropTypes from "prop-types";
import { withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import SelectConglomerado from "./components/SelectConglomerado";
import SelectEmpresa from "./components/SelectEmpresa";
import SelectSedes from "./components/SelectSedes";
import SelectDependencia from "./components/SelectDependencia";
import MySelect from "./components/SelectRoles";
import { decode } from "jsonwebtoken";
import { GROUPUSERS } from "./../../../services/EndPoints";

const GrupoUsuariosForm = props => {
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
  return (
    <Row>
      <ToastContainer />
      <Col sm="8" md={{ offset: 2 }}>
        <form>
          <Card>
            <CardHeader>{t("app_grupoUsuarios_tab_title")} </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("app_grupoUsuarios_form_registrar_codigo")}{" "}
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
                      value={values.codigo}
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
                      {" "}
                      {t("app_grupoUsuarios_form_registrar_nombre")}{" "}
                      <span className="text-danger">*</span>
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
                    />
                    <div style={{ color: "#D54B4B" }}>
                      {errors.nombre && touched.nombre ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="nombre" />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("app_grupoUsuarios_form_registrar_descripcion")}
                    </label>
                    <textarea
                      name="descripcion"
                      value={values.descripcion}
                      className="form-control form-control-sm"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div style={{ color: "#D54B4B" }}>
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
                  <Card>
                    <CardBody>
                      <h5 className="">
                        {" "}
                        {t(
                          "app_grupoUsuarios_form_registrar_busqueda_usuarios"
                        )}{" "}
                      </h5>
                      <hr />
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              {t(
                                "app_grupoUsuarios_form_registrar_conglomerado"
                              )}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <SelectConglomerado
                              authorization={props.authorization}
                              t={props.t}
                              name="conglomerado"
                              onChange={e => {
                                setFieldValue("conglomerado", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("conglomerado", true);
                              }}
                              value={values.conglomerado}
                              className={`form-control form-control-sm ${errors.conglomerado &&
                                touched.conglomerado &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.conglomerado && touched.conglomerado ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="conglomerado" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              {t(
                                "app_grupoUsuarios_form_registrar_empresa"
                              )}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <SelectEmpresa
                              authorization={props.authorization}
                              t={props.t}
                              idConglomerado={props.values.conglomerado}
                              name="empresa"
                              value={values.empresa}
                              onChange={e => {
                                setFieldValue("empresa", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("empresa", true);
                              }}
                              className={`form-control form-control-sm ${errors.empresa &&
                                touched.empresa &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.empresa && touched.empresa ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="empresa" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              {t("app_grupoUsuarios_form_registrar_sede")}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <SelectSedes
                              authorization={props.authorization}
                              t={props.t}
                              company={props.values.empresa}
                              name="sede"
                              value={values.sede}
                              onChange={e => {
                                setFieldValue("sede", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("sede", true);
                              }}
                              className={`form-control form-control-sm ${errors.sede &&
                                touched.sede &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.sede && touched.sede ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="sede" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>
                              {" "}
                              {t(
                                "app_grupoUsuarios_form_registrar_dependencia"
                              )}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <SelectDependencia
                              authorization={props.authorization}
                              t={props.t}
                              headquarter={props.values.sede}
                              name="dependencia"
                              value={values.dependencia}
                              onChange={e => {
                                setFieldValue("dependencia", e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched("dependencia", true);
                              }}
                              className={`form-control form-control-sm ${errors.dependencia &&
                                touched.dependencia &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.dependencia && touched.dependencia ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="dependencia" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        {/* <label>Usuarios disponibles</label> */}
                        {/* <select
                          className="form-control form-control-sm"
                          multiple
                          disabled
                        >
                          <option>Usuarios disponibles de la consulta</option>
                        </select> */}
                      </div>

                      {/*dataOk ? (
                                <div className="form-group">
                                  <label>Usuarios disponibles</label>
                                  <select className="form-control form-control-sm"  multiple>
                                   {buscarOpciones}
                                  </select>
                                </div>
                            ) : null*/}
                    </CardBody>
                    {/* <CardFooter>
                      <div className="float-right">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          // onClick={() => {
                          //   this.setState({ dataOk: !this.state.dataOk });
                          // }}
                        >
                          {" "}
                          <i className="fa fa-search" /> Buscar
                        </button>{" "}
                      </div>
                    </CardFooter> */}
                  </Card>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t(
                        "app_grupoUsuarios_form_registrar_usuarios_asignados"
                      )}{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <MySelect
                      authorization={props.authorization}
                      t={props.t}
                      idDependence={props.values.dependencia}
                      name={"roles"}
                      value={values.roles}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.roles}
                      touched={touched.roles}
                    />
                    {touched ? (
                      <div style={{ color: "red" }}>
                        {" "}
                        <div style={{ color: "#D54B4B" }}>
                          {errors.roles && touched.roles ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name={"roles"} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="">
                      <div className="form-group">
                        <label>
                          {" "}
                          {t("app_grupoUsuarios_form_registrar_estado")}{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="text-justify">
                          <CustomInput
                            name="estado"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.estado &&
                              touched.estado &&
                              "invalid-feedback"
                            }
                            value={values.estado}
                            type="checkbox"
                            id="ExampleCheckBoxInput"
                            label={t(
                              "app_grupoUsuarios_form_registrar_descripcion_estado"
                            )}
                          />
                          <ErrorMessage name="estado" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      {t("app_grupoUsuarios_form_registrar_boton_guardar")}
                    </div>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Col>
    </Row>
  );
};

export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: props => ({
      codigo: props.grupoUsuarios.codigo,
      nombre: props.grupoUsuarios.nombre,
      descripcion: props.grupoUsuarios.descripcion,
      conglomerado: props.grupoUsuarios.conglomerado,
      empresa: props.grupoUsuarios.empresa,
      sede: props.grupoUsuarios.sede,
      dependencia: props.grupoUsuarios.dependencia,
      estado: props.grupoUsuarios.estado,
      roles: props.grupoUsuarios.roles
    }),
    validationSchema: Yup.object().shape({
      codigo: Yup.string()
        .min(6, " Mínimo 6 caracteres.")
        .max(6, " Máximo 6 caracteres.")
        .required(" Por favor introduzca un código."),
      nombre: Yup.string()
        .required(" Por favor introduzca un nombre.")
        .max(100),
      descripcion: Yup.string().max(
        250,
        " Máximo 250 para la descripción del conglomerado"
      ),
      conglomerado: Yup.string()
        .ensure()
        .required(" Por favor seleccione un conglomerado."),
      empresa: Yup.string()
        .ensure()
        .required(" Por favor seleccione una empresa."),
      sede: Yup.string()
        .ensure()
        .required(" Por favor seleccione una sede."),
      dependencia: Yup.string()
        .ensure()
        .required(" Por favor seleccione una dependencia."),
      estado: Yup.bool()
        .test(
          "Activo",
          "Es necesario activar el grupo de usuarios.",
          value => value === true
        )
        .required(" Se debe aceptar la activacion de la empresa."),
      roles: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required()
          })
        )
        .required(" Por favor seleccione al menos un rol.")
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
        //alert(JSON.stringify(values, null, 2));
        fetch(GROUPUSERS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.authorization
          },
          body: JSON.stringify({
            code: values.codigo,
            name: values.nombre,
            description: values.descripcion,
            users: values.roles,
            status: tipoEstado(values.estado),
            userName: "jferrer"
          })
        })
          .then(response => {
            if (response.status === 201) {
              toast.success("Se registro el grupo de usuarios con éxito.", {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
            } else if (response.status === 400) {
              toast.error(
                "Error al registrar el grupo de usuarios. Inténtelo nuevamente.",
                {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                }
              );
            } else if (response.status === 500) {
              toast.error("Error, el grupo de usuarios ya existe.", {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
            }
          })
          .catch(err => {
            toast.error(`Error, ${err}`, {
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
  })(GrupoUsuariosForm)
);

GrupoUsuariosForm.propTypes = {
  t: PropTypes.any
};
