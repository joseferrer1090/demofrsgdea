import React, { useState } from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput,
  Col,
  Row,
  Alert
} from "reactstrap";
const SedesForm = props => {
  const [visibleAlert, setVisibleAlert] = useState(true);

  const onDismiss = () => {
    console.log(visibleAlert);
    setVisibleAlert(!visibleAlert);
  };

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
      <Card>
        <CardHeader>Registro de sede</CardHeader>
        <CardBody>
          <form className="form">
            <Row>
              <Col sm="6">
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
                    {" "}
                    <option value={""} disabled>-- Seleccione --</option>
                    <option value={"1"}> Conglomerado 1</option>
                    <option value={"2"}> Conglomerado 2</option>
                    <option value={"3"}> Conglomerado 3</option>
                    {" "}
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
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Empresa <span className="text-danger">*</span>
                  </label>
                  <br />
                  <select
                    name="empresa"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.empresa}
                    className={`form-control form-control-sm ${errors.empresa &&
                      touched.empresa &&
                      "is-invalid"}`}
                  >
                    <option value={""} disabled >-- Seleccione --</option>
                    <option value={"1"}> Empresa 1</option>
                    <option value={"2"}> Empresa 2</option>
                    <option value={"3"}> Empresa 3</option>
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.empresa && touched.empresa ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="empresa" />
                  </div>
                  {/* <Select
                    className=""
                    value={this.state.selectedOptionEmpresa}
                    onChange={this.handleChangeOptionEmpresa}
                    options={dataEmpresa}
                  /> */}
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Código <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="codigo"
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
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="codigo" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
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
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.nombre && touched.nombre ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="nombre" />
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label> Descripción </label>
                  <textarea
                    name="direccion"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.direccion}
                    className="form-control form-control-sm"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <div className="form-group ">
                  <label>
                    {" "}
                    Prefijo de radicación <span className="text-danger">
                      *
                    </span>{" "}
                  </label>
                  <input
                    name="pre_radicacion"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pre_radicacion}
                    type="text"
                    className={`form-control form-control-sm ${errors.pre_radicacion &&
                      touched.pre_radicacion &&
                      "is-invalid"}`}
                    maxLength={"6"}
                    placeholder=" "
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.pre_radicacion && touched.pre_radicacion ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="pre_radicacion" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {" "}
                    Secuencia de radicación{" "}
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name={"sec_radicacion"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sec_radicacion}
                    type="number"
                    className={`form-control form-control-sm ${errors.sec_radicacion &&
                      touched.sec_radicacion &&
                      "is-invalid"}`}
                    min={0}
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.sec_radicacion && touched.sec_radicacion ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="sec_radicacion" />
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <Alert
                  color="secondary"
                  isOpen={visibleAlert}
                  toggle={onDismiss}
                  fade={true}
                >
                  <h4 className="alert-heading">¡ Importante !</h4>
                  <p>
                    Los campos de{" "}
                    <b>Prefijo de radicación y Secuencia de radicación</b>, son
                    campos que se reflejaran en el formulario de radicación.
                  </p>
                  <hr />
                  <p className="mb-0">
                    Es recomendable que el campo <b>Prefijo de radicación</b>,
                    se describa acorde al proceso de radicación.
                  </p>
                </Alert>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <div className="form-group">
                  <label>País</label>
                  <select
                    name={"pais"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pais}
                    className={`form-control form-control-sm ${errors.pais &&
                      touched.pais &&
                      "is-invalid"}`}
                  >
                    <option value={""} disabled>-- Seleccione --</option>
                    <option vakue={"1"}> País 1</option>
                    <option vakue={"2"}> País 2</option>
                    <option vakue={"3"}> País 3</option>
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.pais && touched.pais ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="pais" />
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>Departamento</label>
                  <select
                    name={"departamento"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.departamento}
                    className={`form-control form-control-sm ${errors.departamento &&
                      touched.departamento &&
                      "is-invalid"}`}
                  >
                    <option value={""} disabled >-- Seleccione --</option>
                    <option value={"1"}> Departamento 1</option>
                    <option value={"2"}> Departamento 2</option>
                    <option value={"3"}> Departamento 3</option>
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.departamento && touched.departamento ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="departamento" />
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>
                    Ciudad <span className="text-danger">*</span>
                  </label>
                  <select
                    name={"ciudad"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pais}
                    className={`form-control form-control-sm ${errors.ciudad &&
                      touched.ciudad &&
                      "is-invalid"}`}
                  >
                    <option value={""} disabled>-- Seleccione --</option>
                    <option value={"1"}>Ciudad 1</option>
                    <option value={"2"}>Ciudad 2</option>
                    <option value={"3"}>Ciudad 3</option>
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.ciudad && touched.ciudad ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="ciudad" />
                  </div>
                </div>
              </Col>
              <Col sm="7">
                <div className="form-group">
                  <label>
                    {" "}
                    Dirección <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name={"direccion"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.direccion}
                    type="text"
                    className={`form-control form-control-sm ${errors.direccion &&
                      touched.direccion &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.direccion && touched.direccion ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="direccion" />
                  </div>
                </div>
              </Col>
              <Col sm="5">
                <div className="form-group">
                  <label>
                    {" "}
                    Teléfono <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name={"telefono"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.telefono}
                    type="text"
                    className={`form-control form-control-sm ${errors.telefono &&
                      touched.telefono &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.telefono && touched.telefono ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="telefono" />
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="12">
                <div className="form-group">
                  <label> Cargo responsable </label>
                  {/* <Select
                    value={selectedOptionOptionRolResponsable}
                    onChange={this.handleChangeOptionRolResponsable}
                    options={dataExampleRolResponsable}
                  /> */}
                  <select
                    name={"c_responsable"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.c_responsable}
                    className="form-control form-control-sm"
                  >
                    <option value={""}>-- Seleccione --</option>
                    <option value={"1"}> Cargo responsable 1</option>
                    <option value={"2"}> Cargo responsable 2</option>
                    <option value={"3"}> Cargo responsable 3</option>
                  </select>
                </div>
              </Col>
              <Col sm="12">
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
                      id="ExampleInputCheckbox"
                      label="Si esta opción se encuentra activada, Representa que
                             la sede es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             la sede no se elimina del sistema solo quedará
                             inactiva e invisibles para cada uno de los módulos
                             correspondiente del sistema."
                      className={
                        errors.estado && touched.estado && "invalid-feedback"
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
              </Col>
            </Row>
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
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    conglomerado: props.sede.conglomerado,
    empresa: props.sede.empresa,
    codigo: props.sede.codigo,
    nombre: props.sede.nombre,
    descripcion: props.sede.descripcion,
    pre_radicacion: props.sede.pre_radicacion,
    sec_radicacion: props.sede.sec_radicacion,
    pais: props.sede.pais,
    departamento: props.sede.departamento,
    ciudad: props.sede.ciudad,
    direccion: props.sede.direccion,
    telefono: props.sede.telefono,
    c_responsable: props.sede.c_responsable,
    estado: props.sede.estado
  }),
  validationSchema: Yup.object().shape({
    conglomerado: Yup.string()
      .required(" Por favor seleccione un conglomerado.")
      .ensure(),
    empresa: Yup.string()
      .required(" Por favor seleccione una empresa.")
      .ensure(),
    codigo: Yup.string()
      .required(" Por favor introduzca un código.")
      .max(6)
      .min(6),
    nombre: Yup.string()
      .required(" Por favor introduzca un nombre.")
      .min(100)
      .max(100),
    descripcion: Yup.string().max(250),
    pre_radicacion: Yup.string()
      .required(" Por favor asigne un prefijo de radicación.")
      .length(6),
    sec_radicacion: Yup.number()
      .required(" Por favor asigne una secuencia de radicación.")
      .integer()
      .positive(),
    pais: Yup.string()
      .ensure()
      .required(" Por favor seleccione un país."),
    departamento: Yup.string()
      .ensure()
      .required(" Por favor seleccione un departamento."),
    ciudad: Yup.string()
      .ensure()
      .required(" Por favor seleccione una ciudad."),
    direccion: Yup.string().required(" Por favor introduzca una dirección."),
    telefono: Yup.string()
      .max(8)
      .required(" Por favor introduzca un teléfono."),
    c_responsable: Yup.string().ensure(),
    estado: Yup.bool()
      .test("Activo", "Es necesario activar la sede.", value => value === true)
      .required("Necesario activar la sede.")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(SedesForm);
