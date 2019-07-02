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
                  <ErrorMessage name="codigo" />
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
                  <ErrorMessage name="nombre" />
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
                  <ErrorMessage name="descripcion" />
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
              {isSubmitting ? <i class=" fa fa-spinner fa-spin" /> : "Guardar"}
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
      .min(6, "Minimo son 6 caracteres en el codigo")
      .max(6, "Maximo son 6 caracteres")
      .required("Codigo es requerido"),
    nombre: Yup.string()
      .required("Nombre es requerido")
      .max(100),
    descripcion: Yup.string().max(
      250,
      "Maximo 250 para la descripcion del conglomerado"
    ),
    estado: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el conglomerado",
        value => value === true
      )
      .required("Es importante activar el conglomerado")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(ConglomeradorForm);
