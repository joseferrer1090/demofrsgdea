import React, { useState } from "react";
import { withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import MySelectModulos from "./components/SelectModulos";
import MySelectEntidades from "./components/SelectEntidades";
import Assignedpermissions from "./components/AsignarPermisos";
import PropTypes from "prop-types";

const RolesForm = props => {
  const [activeTab, toggleTab] = useState("1");
  const toggle = tab => {
    if (activeTab !== tab) {
      toggleTab(tab);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
    t
  } = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form className="form" noValidate>
            <Card>
              <CardHeader>{t("app_roles_tab_title")}</CardHeader>
              <CardBody>
                <div className="row">
                  <Col sm="6">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_roles_form_registrar_codigo")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"codigo"}
                        onChange={e => {
                          setFieldValue("codigo", e.target.value.toUpperCase());
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
                        <ErrorMessage name={"codigo"} />
                      </div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_roles_form_registrar_nombre")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"nombre"}
                        onChange={e => {
                          setFieldValue("nombre", e.target.value.toUpperCase());
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
                  </Col>
                  <Col sm="12">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_roles_form_registrar_descripción")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <textarea
                        name={"descripcion"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.descripcion}
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
                  </Col>
                </div>
                <Row>
                  <Col sm="12">
                    <Card body>
                      <CardTitle>
                        {" "}
                        <h4>
                          {" "}
                          {t("app_roles_form_registrar_title")} <hr />{" "}
                        </h4>
                      </CardTitle>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1"
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            <i className="fa fa-search" />{" "}
                            {t("app_roles_form_registrar_title_tab")}
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId={"1"}>
                          <div className="row">
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t("app_roles_form_registrar_modulo")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <MySelectModulos
                                  t={props.t}
                                  name={"modulos"}
                                  value={values.modulos}
                                  onChange={e => {
                                    setFieldValue("modulos", e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("modulos", true);
                                  }}
                                  className={`form-control form-control-sm ${errors.modulos &&
                                    touched.modulos &&
                                    "is-invalid"}`}
                                />
                                {touched ? (
                                  <div style={{ color: "red" }}>
                                    {" "}
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.modulos && touched.modulos ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={"modulos"} />
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t("app_roles_form_registrar_entidades")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <MySelectEntidades
                                  t={props.t}
                                  modulo={props.values.modulos}
                                  name={"entidades"}
                                  value={values.entidades}
                                  onChange={e => {
                                    setFieldValue("entidades", e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("entidades", true);
                                  }}
                                  className={`form-control form-control-sm ${errors.entidades &&
                                    touched.entidades &&
                                    "is-invalid"}`}
                                />
                                {touched ? (
                                  <div style={{ color: "red" }}>
                                    {" "}
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.entidades && touched.entidades ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={"entidades"} />
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                      <br />
                      <Row>
                        <Col sm="12">
                          <div className="form-group">
                            <label>
                              {t("app_roles_form_registrar_asignar_permisos")}{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <Assignedpermissions
                              t={props.t}
                              entidad={props.values.entidades}
                              name={"permisos"}
                              value={values.permisos}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              error={errors.permisos}
                              touched={touched.permisos}
                            />
                            {touched ? (
                              <div style={{ color: "red" }}>
                                {" "}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.permisos && touched.permisos ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"permisos"} />
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_roles_form_registrar_estado")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="">
                        <CustomInput
                          name={"estado"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado}
                          type="checkbox"
                          id="ExampleCheckBoxInput"
                          label={t(
                            "app_roles_form_registrar_estado_descripcion"
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
                </Row>
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
                        {t("app_roles_form_registrar_boton_guardar")}
                      </div>
                    )}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

RolesForm.propTypes = {
  t: PropTypes.any
};

export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: props => ({
      codigo: props.roles.codigo,
      nombre: props.roles.nombre,
      descripcion: props.roles.descripcion,
      modulos: props.roles.modulos,
      entidades: props.roles.entidades,
      entidades_search: props.roles.entidades_search,
      permisos: props.roles.permisos,
      estado: props.roles.estado
    }),
    validationSchema: Yup.object().shape({
      codigo: Yup.string()
        .required(" Por favor introduzca un código.")
        .matches(/^[0-9a-zA-Z]+$/, " Codigo no es alfanumerico")
        .min(2, " minimo 2 caracteres para el codigo")
        .max(15, " maximo 15 caracteres para el codigo"),
      nombre: Yup.string().required(" Por favor introduzca un nombre."),
      descripcion: Yup.string().required(
        " Por favor introduzca una descripción."
      ),
      estado: Yup.bool()
        .test("Activo", " Necesario activar el rol.", value => value === true)
        .required(" Necesario activar el rol."),
      modulos: Yup.string()
        .ensure()
        .required("Se requiere el modulo para filtrar"),
      entidades: Yup.string()
        .ensure()
        .required("Se requiere la entidad para filtrar"),
      permisos: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required()
          })
        )
        .required("Es necesario asignar permisos")
    }),
    handleSubmit: (values, { setSubmitting, resetForm }) => {
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
        // alert(JSON.stringify(values, null, 2));
        fetch(`http://192.168.10.180:7000/api/sgdea/role`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + window.btoa("sgdea:123456")
          },
          body: JSON.stringify({
            code: values.codigo,
            name: values.nombre,
            descripcion: values.descripcion,
            permissions: values.permisos,
            status: tipoEstado(values.estado),
            userName: "jferrer"
          })
        }).then(response => {
          response
            .json()
            .then(data => {
              if (response.status === 201) {
                toast.success("Se creo el rol con éxito.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              } else if (response.status === 400) {
                toast.error("Error al crear el rol. Inténtelo nuevamente.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              } else if (response.status === 500) {
                toast.error("Error, el rol ya existe.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              }
            })
            .catch(err => {
              toast.error(`Error ${err}.`, {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
            });
        });
        setSubmitting(false);
        resetForm();
      }, 1000);
    }
  })(RolesForm)
);
