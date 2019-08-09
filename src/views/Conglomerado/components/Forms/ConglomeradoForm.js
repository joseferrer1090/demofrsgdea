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
    handleReset
  } = props;

  console.log(errors);
  console.log(touched);

  return (
    <div>
      <Card>
        <CardHeader> Registro de conglomerado </CardHeader>
        <CardBody>
          <form className="form" noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Código <span className="text-danger">*</span>{" "}
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
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="codigo" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Nombre <span className="text-danger">*</span>{" "}
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
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="nombre" />
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label> Descripción</label>
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
                      <i class="fa fa-exclamation-triangle" />
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
                    Estado <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      value={values.estado}
                      name="estado"
                      type="checkbox"
                      id="ExampleInputCheckbox"
                      label=" Si esta opción se encuentra activada, representa
                              que el conglomerado es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el conglomerado no se elimina del
                              sistema solo quedará inactivo e invisibles para
                              cada uno de los módulos correspondiente del
                              sistema."
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
                  <i className="fa fa-save" /> Guardar
                </div>
              )}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default withFormik({
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
        " Es necesario activar el conglomerado",
        value => value === true
      )
      .required(" Es importante activar el conglomerado")
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
              alert("oki");
            } else if (response.status === 400) {
              alert("Erro en el cuerpo");
            }
          })
        )
        .catch(error => {
          console.log(" ", error);
        });
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(ConglomeradorForm);
