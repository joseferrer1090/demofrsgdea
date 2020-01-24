import React from "react";
import { withFormik, ErrorMessage } from "formik";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput
} from "reactstrap";
import * as Yup from "yup";
import { CHARGES } from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";

const CargoForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    t
  } = props;
  return (
    <Row>
      <Col sm={{ size: 8, offset: 2 }}>
        <Card>
          <ToastContainer />
          <CardHeader> {t("app_cargo_tab_title")} </CardHeader>
          <CardBody>
            <form className="form" noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("app_cargo_form_registrar_codigo")}{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      name={"code"}
                      type="text"
                      placeholder=""
                      onChange={e => {
                        setFieldValue("code", e.target.value.toUpperCase());
                      }}
                      onBlur={handleBlur}
                      value={values.code}
                      className={`form-control form-control-sm ${errors.code &&
                        touched.code &&
                        "is-invalid"}`}
                    />
                    <div style={{ color: "#D54B4B" }}>
                      {errors.code && touched.code ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name={"code"} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("app_cargo_form_registrar_nombre")}{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      name={"name"}
                      type="text"
                      placeholder=""
                      onChange={e => {
                        setFieldValue("name", e.target.value.toUpperCase());
                      }}
                      onBlur={handleBlur}
                      value={values.name}
                      className={`form-control form-control-sm ${errors.name &&
                        touched.name &&
                        "is-invalid"}`}
                    />
                    <div style={{ color: "#D54B4B" }}>
                      {errors.name && touched.name ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name={"name"} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label> {t("app_cargo_form_registrar_descripcion")}</label>
                    <textarea
                      name={"description"}
                      className="form-control form-control-sm"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("app_cargo_form_registrar_estado")}{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="text-justify">
                      <CustomInput
                        name={"status"}
                        type="checkbox"
                        id="ExampleCheckboxInput"
                        label={t("app_cargo_form_registrar_estado_descripcion")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.status && touched.status && "invalid-feedback"
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
                    {t("app_cargo_form_registrar_button_guardar")}
                  </div>
                )}
              </button>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};
CargoForm.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: props => ({
      code: props.cargo.code,
      name: props.cargo.name,
      description: props.cargo.description,
      status: props.cargo.status
    }),
    validationSchema: Yup.object().shape({
      code: Yup.string()
        .required(" Por favor introduzca un código alfanumérico.")
        .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
        .min(2, " Mínimo 2 caracteres.")
        .max(15, " Máximo 15 caracteres."),
      name: Yup.string().required(" Por favor introduzca un nombre."),
      description: Yup.string().max(250, " Máximo 250 caracteres."),
      status: Yup.bool()
        .test(
          "Activo",
          " Necesario activar el cargo. ",
          value => value === true
        )
        .required(" Se debe activar el cargo.")
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
        fetch(`${CHARGES}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth
          },
          body: JSON.stringify({
            description: values.description,
            code: values.code,
            name: values.name,
            status: tipoEstado(values.status),
            userName: username.user_name
          })
        })
          .then(response =>
            response.json().then(data => {
              console.log(response);
              if (response.status === 201) {
                toast.success("Se registro el cargo con éxito.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              } else if (response.status === 400) {
                toast.error(
                  "Error al registrar el cargo. Inténtelo nuevamente.",
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px"
                    })
                  }
                );
              } else if (response.status === 500) {
                toast.error("Error, el cargo ya existe.", {
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
  })(CargoForm)
);
