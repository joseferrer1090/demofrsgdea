import React from 'react'
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CustomInput,
  CardBody,
  CardFooter,
  CardHeader,
  Card,
  Row,
  Col
} from "reactstrap";

const FormPais = props =>{
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
  return(
    <Row>
      <Col sm="8" md={{ offset: 2 }}>
        <Card>
          <CardHeader> Registro de país </CardHeader>
          <CardBody>
            <form className="form">
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
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.codigo && touched.codigo ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="codigo"/>
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
                    <div style={{ color: '#D54B4B' }}>
                    {
                      errors.nombre && touched.nombre ?
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="nombre"/>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.estado && touched.estado && "invalid-feedback"
                        }
                        type="checkbox"
                        id="ExampleCheckboxInput"
                        label="Si esta opción se encuentra activada, representa que
                        el país es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso contrario
                        el país no se elimina del sistema solo quedará
                        inactivo e invisibles para cada uno de los módulos
                        correspondiente del sistema."
                      />
                      {/* <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        Activar
                      </label> */}
                      {/* <p
                        className="text-muted"
                        style={{ textAlign: "justify" }}
                      >
                        Si esta opción se encuentra activada, representa que
                        el país es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso contrario
                        el país no se elimina del sistema solo quedará
                        inactivo e invisibles para cada uno de los módulos
                        correspondiente del sistema.
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
      </Col>
    </Row>

  );
}

export default withFormik({
  mapPropsToValues: props => ({
    codigo: props.pais.codigo,
    nombre: props.pais.nombre,
    estado: props.pais.estado
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string()
      .min(6, " Mínimo 6 caracteres.")
      .max(6, " Máximo 6 caracteres.")
      .required(" Por favor introduzca un código."),
    nombre: Yup.string()
      .required(" Por favor introduzca un nombre.")
      .max(100),
    estado: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el país",
        value => value === true
      )
      .required("Es necesario activar el país")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(FormPais);
