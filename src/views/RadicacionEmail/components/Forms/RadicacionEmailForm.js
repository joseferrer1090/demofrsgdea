import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import decode from "jsonwebtoken";
import { EMAIL_FILING } from "./../../../../services/EndPoints";
const RadicacionEmailForm = (props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    setFieldValue,
    t,
  } = props;
  return (
    <div>
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <Card>
            <ToastContainer />
            <CardHeader>{t("app_radicacion_email_tab_title")}</CardHeader>
            <CardBody>
              <form className="form">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>
                        {t("app_radicacion_email_form_registrar_protocolo")}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"protocolo"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.protocolo}
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.protocolo && touched.protocolo && "is-invalid"
                        }`}
                      />
                      <div style={{ color: "#D54B4B" }}>
                        {errors.protocolo && touched.protocolo ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="protocolo" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_radicacion_email_form_registrar_host")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"host"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.host}
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.host && touched.host && "is-invalid"
                        }`}
                      />
                      <div style={{ color: "#D54B4B" }}>
                        {errors.host && touched.host ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="host" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_radicacion_email_form_registrar_puerto")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"puerto"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.puerto}
                        type="number"
                        className={`form-control form-control-sm ${
                          errors.puerto && touched.puerto && "is-invalid"
                        }`}
                      />
                      <div style={{ color: "#D54B4B" }}>
                        {errors.puerto && touched.puerto ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="puerto" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_radicacion_email_form_registrar_email")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"email"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        type="email"
                        className={`form-control form-control-sm ${
                          errors.email && touched.email && "is-invalid"
                        }`}
                      />
                      <div style={{ color: "#D54B4B" }}>
                        {errors.email && touched.email ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t(
                          "app_radicacion_email_form_registrar_contraseña"
                        )}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        type="password"
                        className={`form-control form-control-sm ${
                          errors.password && touched.password && "is-invalid"
                        }`}
                      />
                      <div style={{ color: "#D54B4B" }}>
                        {errors.password && touched.password ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_radicacion_email_form_registrar_estado")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name={"status"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                          type="checkbox"
                          id="ExampleCheckboxInput"
                          label={t(
                            "app_radicacion_email_form_registrar_estado_descripcion"
                          )}
                          className={
                            errors.status &&
                            touched.status &&
                            "invalid-feedback"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
                      {t("app_radicacion_email_form_registrar_boton_guardar")}
                    </div>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: (props) => ({
      protocolo: props.radicacionemail.protocolo,
      host: props.radicacionemail.host,
      puerto: props.radicacionemail.puerto,
      email: props.radicacionemail.email,
      password: props.radicacionemail.password,
      status: props.radicacionemail.status,
    }),
    validationSchema: Yup.object().shape({
      protocolo: Yup.string()
        // .min(1, ' Por favor introduzca un protocolo válido.')
        .required(" Por favor introduzca el protocolo."),
      host: Yup.string()
        // .min(1, ' Por favor introduzca un host válido.')
        .required(" Por favor introduzca el host."),
      puerto: Yup.number()
        // .min(1, 'Por favor introduzca un puerto válido.')
        .required(" Por favor introduzca un puerto."),
      email: Yup.string()
        .email(" Por favor introduzca un email valido.")
        .required(" Por favor introduzca un email."),
      password: Yup.string().required(" Por favor introduzca una contraseña."),
      status: Yup.bool().test(
        "Activo",
        "Es necesario la activacion del mensajero",
        (value) => value === true
      ),
    }),
    handleSubmit: (values, { setSubmitting, resetForm, props }) => {
      const tipoEstado = (data) => {
        let tipo = null;
        if (data === true) {
          return (tipo = 1);
        } else if (data === false) {
          return (tipo = 0);
        }
        return null;
      };

      setTimeout(() => {
        const { t } = props;
        const auth = props.authorization;
        const username = decode(auth);

        fetch(`${EMAIL_FILING}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
          body: JSON.stringify({
            protocol: values.protocolo,
            host: values.host,
            port: values.puerto,
            email: values.email,
            password: values.password,
            username: username.user_name,
            status: values.status,
          }),
        })
          .then((response) =>
            response.json().then((data) => {
              if (response.status === 201) {
                toast.success(
                  t("app_radicacion_email_actualizar_alert_success"),
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px",
                    }),
                  }
                );
              } else if (response.status === 400) {
                toast.error(
                  t("app_radicacion_email_actualizar_alert_error_400"),
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px",
                    }),
                  }
                );
              } else if (response.status === 500) {
                toast.error(
                  t("app_radicacion_email_actualizar_alert_error_500"),
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px",
                    }),
                  }
                );
              }
            })
          )
          .catch((error) => {
            toast.error(`Error ${error}`, {
              position: toast.POSITION.TOP_RIGHT,
              className: css({
                marginTop: "60px",
              }),
            });
          });
        setSubmitting(false);
        resetForm();
      }, 1000);
    },
  })(RadicacionEmailForm)
);
