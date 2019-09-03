import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
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

const ConglomeradorForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset,
    t
  } = props;
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que el conglomerado es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el conglomerado no se elimina del
                              sistema solo quedará inactivo e invisibles para
                              cada uno de los módulos correspondiente del
                              sistema.
                            </p> */}
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
      estado: props.conglomerado.estado
    }),
    validationSchema: Yup.object().shape({
      codigo: Yup.string()
        .min(6, " Mínimo 6 caracteres.")
        .max(6, " Máximo 6 caracteres.")
        .required(" Por favor introduzca un código."),
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
        .required(" Es necesario activar el conglomerado.")
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
        fetch(CONGLOMERATES, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + window.btoa("sgdea:123456")
          },
          body: JSON.stringify({
            code: values.codigo,
            name: values.nombre,
            description: values.descripcion,
            status: tipoEstado(values.estado),
            userName: "jferrer"
          })
        })
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success("Se creo el conglomerado con éxito.", {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: "60px"
                  })
                });
              } else if (response.status === 500) {
                toast.error("El conglomerado ya existe.", {
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
