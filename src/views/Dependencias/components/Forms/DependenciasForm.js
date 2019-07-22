import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Row,
  Col,
  Buttom,
  CustomInput
} from "reactstrap";

const DependenciaForm = props => {
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
  return (
    <div>
      <Row>
        <Col sm="8" md={{ offset: 2 }}>
          <Card>
            <CardHeader>Registro de dependencia</CardHeader>
            <CardBody>
              <form className="form" role="form">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Conglomerado <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name="conglomerado"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomerado}
                        className={`form-control form-control-sm ${errors.conglomerado &&
                          touched.conglomerado &&
                          "is-invalid"}`}
                      >
                        <option> Seleccione </option>
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.conglomerado && touched.conglomerado ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="conglomerado" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Empresa <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name={"empresa"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.empresa}
                        className={`form-control form-control-sm ${errors.empresa &&
                          touched.empresa &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option> Seleccione... </option>{" "}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.empresa && touched.empresa ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="empresa" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Sede <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name={"sede"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sede}
                        className={`form-control form-control-sm ${errors.sede &&
                          touched.sede &&
                          "is-invalid"}`}
                      >
                        <option>Seleccione...</option>
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.sede && touched.sede ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="sede" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Código <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"codigo"}
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.codigo}
                        className={`form-control form-control-sm ${errors.codigo &&
                          touched.codigo &&
                          "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.codigo && touched.codigo ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
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
                        name={"nombre"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nombre}
                        type="text"
                        placeholder=""
                        className={`form-control form-control-sm ${errors.nombre &&
                          touched.nombre &&
                          "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.nombre && touched.nombre ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="nombre" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label> Descripción </label>
                      <textarea
                        name={"descripcion"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.descripcion}
                        className="form-control form-control-sm"
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.descripcion && touched.descripcion ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="descripcion" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Cargo responsable <span className="text-danger">
                          *
                        </span>{" "}
                      </label>
                      <select
                        name={"c_responsable"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.c_responsable}
                        className={`form-control form-control-sm ${errors.c_responsable &&
                          touched.c_responsable &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option> Seleccione... </option>{" "}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.c_responsable && touched.c_responsable ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="c_responsable" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name={"estado"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado}
                          type="checkbox"
                          id="CheckboxEditDependencia"
                          label=" Si esta opción se encuentra activada, representa
                              que la dependencia es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario la dependencia no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema."
                          className={
                            errors.estado &&
                            touched.estado &&
                            "invalid-feedback"
                          }
                        />
                        {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que la dependencia es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario la dependencia no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema.
                            </p> */}
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
                      <i className="fa fa-save" /> Guardar
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

export default withFormik({
  mapPropsToValues: props => ({
    conglomerado: props.dependencia.conglomerado,
    empresa: props.dependencia.empresa,
    sede: props.dependencia.sede,
    codigo: props.dependencia.codigo,
    nombre: props.dependencia.nombre,
    descripcion: props.dependencia.descripcion,
    c_responsable: props.dependencia.c_responsable,
    estado: props.dependencia.estado
  }),
  validationSchema: Yup.object().shape({
    conglomerado: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    empresa: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
    sede: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede."),
    codigo: Yup.string().required(" Por favor introduzca un código."),
    nombre: Yup.string().required(" Por favor introduzca un nombre."),
    descripcion: Yup.string(),
    c_responsable: Yup.string()
      .required(" Por favor seleccione un cargo.")
      .ensure()
      .required(" Por favor seleccione el cargo."),
    estado: Yup.bool().test(
      "Activo",
      "Es necesario activar el conglomerado.",
      value => value === true
    )
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(DependenciaForm);
