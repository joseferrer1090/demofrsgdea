import React from "react";
import { Formik, withFormik, ErrorMessage, yupToFormErrors } from "formik";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  Table
} from "reactstrap";
import * as Yup from "yup";

const CargoForm = props => {
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
    <div className="row">
      <div className="col-md-6">
        <Card>
          <CardHeader>Asignar responsabilidades</CardHeader>
          <CardBody>
            <Row>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Conglomerado <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable del conglomerado:
                  </p>
                  <select
                    name={"conglomerado"}
                    onChang={handleChange}
                    onBlur={handleBlur}
                    value={values.conglomerado_id}
                    className={`form-control form-control-sm ${errors.conglomerado &&
                      touched.conglomerado &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option> Seleccione </option>{" "}
                  </select>
                  <ErrorMessage name="conglomerado" />
                  <br />
                  <CustomInput
                    name={"conglomerado_responsable"}
                    type="checkbox"
                    id="IdResponsableConglomerado"
                    label="Responsable ?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.conglomerado_responsable}
                    className={
                      errors.conglomerado_responsable &&
                      touched.conglomerado_responsable &&
                      "invalid-feedback"
                    }
                  />
                  <ErrorMessage name={"conglomerado_responsable"} />
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Empresa <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable del empresa:
                  </p>
                  <select
                    name={"empresa"}
                    value={values.empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control form-control-sm ${errors.empresa &&
                      touched.empresa &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option> Seleccione </option>{" "}
                  </select>
                  <ErrorMessage name={"empresa"} />
                  <br />
                  <CustomInput
                    name={"empresa_responsable"}
                    type="checkbox"
                    id="IdResponsableEmpresa"
                    label="Responsable ?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.empresa_responsable}
                    className={
                      errors.empresa_responsable &&
                      touched.empresa_responsable &&
                      "invalid-feedback"
                    }
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Sede <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable de la Sede:
                  </p>
                  <select
                    name={"sede"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sede}
                    className={`form-control form-control-sm ${errors.sede &&
                      touched.sede &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option> Seleccione </option>{" "}
                  </select>
                  <ErrorMessage name={"sede"} />
                  <br />
                  <CustomInput
                    name={"sede_responsable"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="checkbox"
                    id="IdResponsableSede"
                    label="Responsable ?"
                    className={
                      errors.estado && touched.estado && "invalid-feedback"
                    }
                  />
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Dependencia <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable de la
                    dependencia:
                  </p>
                  <select
                    name={"dependencia"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dependencia}
                    className={`form-control form-control-sm ${errors.dependencia &&
                      touched.dependencia &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option> Seleccione </option>{" "}
                  </select>
                  <ErrorMessage name={"dependencia"} />
                  <br />
                  <CustomInput
                    name={"dependencia_responsable"}
                    type="checkbox"
                    id="IdResponsableDependencia"
                    label="Responsable ?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dependencia_responsable}
                    className={
                      errors.dependencia_responsable &&
                      touched.dependencia_responsable &&
                      "invalid-feedback"
                    }
                  />
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 ">
        <Card>
          <CardHeader> Registro de cargo </CardHeader>
          <CardBody>
            <div className="row">
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
                  <ErrorMessage name={"codigo"} />
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
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nombre}
                    className={`form-control form-control-sm ${errors.nombre &&
                      touched.nombre &&
                      "is-invalid"}`}
                  />
                  <ErrorMessage name={"nombre"} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label> Descripción</label>
                  <textarea
                    name={"descripcion"}
                    className="form-control form-control-sm"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descripcion}
                  />
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
                      name={"estado"}
                      type="checkbox"
                      id="ExampleCheckboxInput"
                      label=" Si esta opción se encuentra activada, representa
                        que el cargo es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso
                        contrario el cargo no se elimina del sistema solo
                        quedará inactivo e invisibles para cada uno de los
                        módulos correspondiente del sistema."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.estado && touched.estado && "invalid-feedback"
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
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    conglomerado: props.cargo.conglomerado,
    conglomerado_responsable: props.cargo.conglomerado,
    empresa: props.cargo.empresa,
    empresa_responsable: props.cargo.empresa,
    sede: props.cargo.sede,
    sede_responsable: props.cargo.sede_responsable,
    dependencia: props.cargo.dependencia,
    dependencia_responsable: props.cargo.dependencia_responsable,
    codigo: props.cargo.codigo,
    nombre: props.cargo.nombre,
    descripcion: props.cargo.descripcion,
    estado: props.cargo.estado
  }),
  validationSchema: Yup.object().shape({
    conglomerado: Yup.string()
      .ensure()
      .required("seleccione un conglomerado para el cargo"),
    conglomerado_responsable: Yup.bool()
      .test("Activo", "necesario activar responsable", value => value === true)
      .required("necesario activar responsable"),
    empresa: Yup.string()
      .ensure()
      .required("seleccionar empresa para el cargo"),
    empresa_responsable: Yup.bool()
      .test("Activo", "necesario activar responsable", value => value === true)
      .required("necesario activar el responsable"),
    sede: Yup.string()
      .ensure()
      .required("seleccione una sede para el cargo"),
    sede_responsable: Yup.bool()
      .test(
        "Activo",
        "necesario activar responsable de sede",
        value => value === true
      )
      .required("necesario activar responsable de sede"),
    dependencia: Yup.string()
      .ensure()
      .required("seleccione una dependencia para el cargo"),
    dependencia_responsable: Yup.bool()
      .test(
        "Activo",
        "necesario activar responsable de dependencia",
        value => value === true
      )
      .required("necesario activar responsable de dependencia"),
    codigo: Yup.string().required("necesario asignar codigo al cargo"),
    nombre: Yup.string().required("necesario asignar nombre al cargo"),
    descripcion: Yup.string(),
    estado: Yup.bool()
      .test("Activo", "necesario activar el cargo", value => value === true)
      .required("se debe activar el cargo")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(CargoForm);