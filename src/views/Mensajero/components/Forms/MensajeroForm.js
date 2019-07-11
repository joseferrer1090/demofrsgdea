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
  CustomInput
} from "reactstrap";

const MensajeroForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
  } = props;
  return (
    <div>
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <Card>
            <CardHeader>Registro de mensajero</CardHeader>
            <CardBody>
              <form className="form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Identificación <span className="text-danger">
                          *
                        </span>{" "}
                      </label>
                      <input
                        name={"identificacion"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.identificacion}
                        type="text"
                        className={`form-control form-control-sm ${errors.identificacion &&
                          touched.identificacion &&
                          "is-invalid"}`}
                      />
                      <ErrorMessage name="identificacion" />
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
                      <ErrorMessage name="nombre" />
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
                          id="ExampleCheckboxInput"
                          label=" Si esta opción se encuentra activada, representa
                              que el cargo es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el cargo no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema."
                          className={
                            errors.estado &&
                            touched.estado &&
                            "invalid-feedback"
                          }
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
                              Si esta opción se encuentra activada, representa
                              que el cargo es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el cargo no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema.
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
    identificacion: props.mensajero.identificacion,
    nombre: props.mensajero.nombre,
    descripcion: props.mensajero.descripcion,
    estado: props.mensajero.estado
  }),
  validationSchema: Yup.object().shape({
    identificacion: Yup.number()
      .required("identificacion requerida para el mensajero")
      .integer(),
    nombre: Yup.string().required("nombre requerido para el mensajero"),
    descripcion: Yup.string(),
    estado: Yup.bool().test(
      "Activado",
      "Es necesario la activacion del mensajero",
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
})(MensajeroForm);