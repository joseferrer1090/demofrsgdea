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
                    className="form-control form-control-sm"
                  >
                    {" "}
                    <option>--Seleccione-- </option>{" "}
                  </select>
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
                    className="form-control form-control-sm"
                  >
                    <option>--seleccione--</option>
                  </select>
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
                    className="form-control form-control-sm"
                  />
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
                    className="form-control form-control-sm"
                  />
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
                    className="form-control form-control-sm"
                    maxLength={"6"}
                    placeholder=" "
                  />
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
                    className="form-control form-control-sm"
                    min={0}
                  />
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
                    className="form-control form-control-sm"
                  >
                    <option>--Seleccione--</option>
                  </select>
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
                    className="form-control form-control-sm"
                  >
                    <option>--Seleccione--</option>
                  </select>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>
                    Ciudad <span className="text-danger">*</span>
                  </label>
                  <select
                    name={"pais"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pais}
                    className="form-control form-control-sm"
                  >
                    <option>--Seleccione--</option>
                  </select>
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
                    className="form-control form-control-sm"
                  />
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
                    className="form-control form-control-sm"
                  />
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
                    <option>--Seleccione--</option>
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
            <button className="btn btn-secondary btn-sm">
              {" "}
              <i className="fa fa-plus" /> Registrar{" "}
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
      .required("conglomerado requerido")
      .ensure(),
    empresa: Yup.string()
      .required("empresa requerida")
      .ensure(),
    codigo: Yup.string()
      .required("se requiere codigo")
      .max(6)
      .min(6),
    nombre: Yup.string()
      .required("se requiere nombre")
      .min(100)
      .max(100),
    descripcion: Yup.string().max(250),
    pre_radicacion: Yup.string()
      .required("se requiere asignar un prefijo de radicacion para la sede")
      .length(6),
    sec_radicacion: Yup.number()
      .required("se requiere una secuencia de radicacion")
      .integer()
      .positive(),
    pais: Yup.string().ensure(),
    departamento: Yup.string().ensure(),
    ciudad: Yup.string(),
    direccion: Yup.string().max(250)
  })
})(SedesForm);
