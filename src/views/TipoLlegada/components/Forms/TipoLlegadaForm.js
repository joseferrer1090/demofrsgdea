import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";

import * as Yup from "yup";

const TipoLlegadaForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;
  return (
    <div>
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <Card>
            <CardHeader> Registro de tipo de envío / llegada </CardHeader>
            <CardBody>
              <form className="form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Código <span className="text-danger"> * </span>
                      </label>
                      <input
                        name={"codigo"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.codigo}
                        type="text"
                        className={`form-control form-control-sm ${errors.codigo &&
                          touched.codigo &&
                          "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.codigo && touched.codigo ?
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name={"codigo"} />
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
                        className={`form-control form-control-sm ${errors.nombre &&
                          touched.nombre &&
                          "is-invalid"}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.nombre && touched.nombre ?
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="nombre" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label> Descripción</label>
                      <textarea
                        name={"descripcion"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.descripcion}
                        className="form-control form-control-sm"
                      />
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
                          type="checkbox"
                          id="ExampleInputCheckbox"
                          label="Si esta opción se encuentra activada, Representa que
                             la sede es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             la sede no se elimina del sistema solo quedará
                             inactiva e invisibles para cada uno de los módulos
                             correspondiente del sistema."
                          name={"estado"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado}
                          className={
                            errors.estado &&
                            touched.estado &&
                            "invalid-feedback"
                          }
                        />
                      </div>
                      {/* <p
                            className="text-muted"
                            style={{ textAlign: "justify" }}
                          >
                            {" "}
                            Si esta opción se encuentra activada, Representa que
                            la sede es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso contrario
                            la sede no se elimina del sistema solo quedará
                            inactiva e invisibles para cada uno de los módulos
                            correspondiente del sistema.
                          </p> */}
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
    codigo: props.tipollegada.codigo,
    nombre: props.tipollegada.nombre,
    descripcion: props.tipollegada.descripcion,
    estado: props.tipollegada.estado
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string().required(" Por favor introduzca un código."),
    nombre: Yup.string().required(" Por favor introduzca un nombre."),
    descripcion: Yup.string(),
    estado: Yup.bool().test(
      "Activo",
      " Es necesario activar el estado para el tipo de llegada",
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
})(TipoLlegadaForm);
