import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput
} from "reactstrap";

const EmpresaForm = props => {
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
        <CardHeader> Registro de empresa </CardHeader>
        <CardBody>
          <form className="form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Conglomerado <span className="text-danger">*</span>{" "}
                  </label>
                  <select
                    name="conglomerado"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`form-control form-control-sm ${errors.conglomerado &&
                      touched.conglomerado &&
                      "is-invalid"}`}
                    value={values.conglomerado}
                  >
                    <option value={""}>--Seleccione--</option>
                    <option value={"1"}>Conglomerado 1</option>
                    <option value={"2"}>Conglomerado 2</option>
                    <option value={"3"}>Conglomerado 3</option>
                  </select>
                  <ErrorMessage name="conglomerado" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Código <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="codigo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.codigo}
                    type="text"
                    className={`form-control form-control-sm ${errors.codigo &&
                      touched.codigo &&
                      "is-invalid"}`}
                  />
                  <ErrorMessage name="codigo" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Nit <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="nit"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nit}
                    className={`form-control form-control-sm ${errors.nit &&
                      touched.nit &&
                      "is-invalid"}`}
                    type="text"
                  />
                  <ErrorMessage name="nit" />
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
                    value={values.nombre}
                    type="text"
                    className={`form-control form-control-sm ${errors.nombre &&
                      touched.nombre &&
                      "is-invalid"}`}
                  />
                  <ErrorMessage name="nombre" />
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label> Descripción </label>
                  <textarea
                    name="descripcion"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descripcion}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label> Cargo responsable </label>
                  <select
                    name="c_responsable"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.c_responsable}
                    className="form-control form-control-sm"
                  >
                    {" "}
                    <option> Seleccione... </option>
                    <option value="1">Cargo 1</option>
                    <option value="2">Cargo 2</option>
                    <option value="3">Cargo 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name="estado"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="checkbox"
                          id="exampleCheck1"
                          label="Si esta opción se encuentra activada,
                                  Representa que la empresa es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario la empresa no se
                                  elimina del sistema solo quedará inactiva e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema."
                          className={
                            errors.estado &&
                            touched.estado &&
                            "invalid-feedback"
                          }
                          value={values.estado}
                        />

                        {/* <p
                                  className="text-muted"
                                  style={{ textAlign: "justify" }}
                                >
                                  Si esta opción se encuentra activada,
                                  Representa que la empresa es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario la empresa no se
                                  elimina del sistema solo quedará inactiva e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema.
                                </p> */}
                      </div>
                    </div>
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
    conglomerado: props.empresa.conglomerado,
    codigo: props.empresa.codigo,
    nit: props.empresa.nit,
    nombre: props.empresa.nombre,
    descripcion: props.empresa.descripcion,
    c_responsable: props.empresa.c_responsable,
    estado: props.empresa.estado
  }),
  validationSchema: Yup.object().shape({
    conglomerado: Yup.string()
      .ensure()
      .required("seleccionar conglomerador para la empresa"),
    codigo: Yup.string()
      .required("Codigo requerido")
      .min(6)
      .max(6),
    nit: Yup.number()
      .required("asociar nit para la empresa")
      .positive("nit debe ser positivo")
      .integer("nit no acepta puntos ni caracteres especiales"),
    nombre: Yup.string()
      .required("nombre requerido")
      .max(100, "limite para el nombre 100 caracteres"),
    descripcion: Yup.string().max(250),
    c_responsable: Yup.string().ensure(),
    estado: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el conglomerado",
        value => value === true
      )
      .required("se debe aceptar la activacion de la empresa")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(EmpresaForm);
