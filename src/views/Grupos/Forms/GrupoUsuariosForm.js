import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Row, Col, Card, CardHeader, CardBody, CardFooter, CustomInput} from 'reactstrap';
import Select from "react-select";
import AsyncSelect from '../../../../node_modules/react-select/lib/AsyncCreatable';
import { strict } from "assert";

const GrupoUsuariosForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
return(
  <Row>
        <Col sm="8" md={{ offset: 2 }}>
        <form>
          <Card>
            <CardHeader> Registro de grupo de usuarios </CardHeader>
            <CardBody>
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
                            value={values.codigo}
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
                            Nombre <span className="text-danger">*</span>
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
                          <label>
                            {" "}
                            Descripción
                          </label>
                          <textarea
                            name="descripcion"
                            value={values.descripcion}
                            className="form-control form-control-sm"
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                  <div className="row">
                    <div className="col-md-12">
                      <Card>
                        <CardBody>
                          <h5 className=""> Búsqueda de usuarios </h5>
                          <hr />
                          <br />
                            <div className="row">
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Conglomerado{" "}
                                    <span className="text-danger">*</span>{" "}
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
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Empresa{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select
                                      name="empresa"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      className={`form-control form-control-sm
                                      ${errors.empresa &&
                                        touched.empresa &&
                                        "is-invalid"}`}
                                      value={values.empresa}
                                    >
                                    <option value={""}>--Seleccione--</option>
                                    <option value={"1"}>Empresa 1</option>
                                    <option value={"2"}>Empresa 2</option>
                                    <option value={"3"}>Empresa 3</option>
                                  </select>
                                  <div style={{ color: '#D54B4B' }}>
                                  {
                                    errors.empresa && touched.empresa ?
                                    <i class="fa fa-exclamation-triangle"/> :
                                    null
                                  }
                                  <ErrorMessage name="empresa"/>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Sede <span className="text-danger">
                                      *
                                    </span>{" "}
                                  </label>
                                  <select
                                      name="sede"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      className={`form-control form-control-sm
                                      ${errors.sede &&
                                        touched.sede &&
                                        "is-invalid"}`}
                                      value={values.sede}
                                    >
                                    <option value={""}>--Seleccione--</option>
                                    <option value={"1"}>Sede 1</option>
                                    <option value={"2"}>Sede 2</option>
                                    <option value={"3"}>Sede 3</option>
                                  </select>
                                  <div style={{ color: '#D54B4B' }}>
                                  {
                                    errors.sede && touched.sede ?
                                    <i class="fa fa-exclamation-triangle"/> :
                                    null
                                  }
                                  <ErrorMessage name="sede"/>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <label>
                                    {" "}
                                    Dependencia{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <select
                                    name="dependencia"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`form-control form-control-sm
                                      ${errors.dependencia &&
                                        touched.dependencia &&
                                        "is-invalid"}`}
                                    value={values.dependencia}
                                    >
                                    <option value={""}>--Seleccione--</option>
                                    <option value={"1"}>Dependencia 1</option>
                                    <option value={"2"}>Dependencia 2</option>
                                    <option value={"3"}>Dependencia 3</option>
                                  </select>
                                  <div style={{ color: '#D54B4B' }}>
                                  {
                                    errors.dependencia && touched.dependencia ?
                                    <i class="fa fa-exclamation-triangle"/> :
                                    null
                                  }
                                  <ErrorMessage name ="dependencia"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                                  <label>Usuarios disponibles</label>
                                  <select
                                  className="form-control form-control-sm"
                                  multiple
                                  disabled
                                  >
                                        <option>Usuarios disponibles de la consulta</option>
                                  </select>
                                </div>

                            {/*dataOk ? (
                                <div className="form-group">
                                  <label>Usuarios disponibles</label>
                                  <select className="form-control form-control-sm"  multiple>
                                   {buscarOpciones}
                                  </select>
                                </div>
                            ) : null*/}
                        </CardBody>
                        <CardFooter>
                          <div className="float-right">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              // onClick={() => {
                              //   this.setState({ dataOk: !this.state.dataOk });
                              // }}
                            >
                              {" "}
                              <i className="fa fa-search" /> Buscar
                            </button>{" "}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Seleccione usuario(s) asignados{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <MySelect
                          name={"roles"}
                          value={values.roles}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.roles}
                          touched={touched.roles}
                        />
                        {touched ? (
                          <div style={{ color: "red" }}>
                            {" "}
                            <div style={{ color: '#D54B4B' }}>
                            {
                              errors.roles && touched.roles ?
                              <i class="fa fa-exclamation-triangle"/> :
                              null
                            }
                            <ErrorMessage name={"roles"} />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
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
                                className={
                                  errors.estado &&
                                  touched.estado &&
                                  "invalid-feedback"
                                }
                                value={values.estado}
                                type="checkbox"
                                id="ExampleCheckBoxInput"
                                label="Si esta opción se encuentra activada, representa
                                que el grupo es visible en el sistema y se
                                podrán realizar operaciones entre cada uno de
                                los módulos correspondientes de la aplicación.
                                En caso contrario el grupo no se elimina del
                                sistema solo quedará inactiva e invisibles para
                                cada uno de los módulos correspondiente del
                                sistema"
                              />
                              <ErrorMessage name="estado"/>
                            </div>
                          </div>
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
          </form>
        </Col>
      </Row>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    codigo: props.grupoUsuarios.codigo,
    nombre: props.grupoUsuarios.nombre,
    descripcion: props.grupoUsuarios.descripcion,
    conglomerado: props.grupoUsuarios.conglomerado,
    empresa: props.grupoUsuarios.empresa,
    sede: props.grupoUsuarios.sede,
    dependencia: props.grupoUsuarios.dependencia,
    estado: props.grupoUsuarios.estado,
    roles: props.grupoUsuarios.roles
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string()
      .min(6, " Mínimo 6 caracteres.")
      .max(6, " Máximo 6 caracteres.")
      .required(" Por favor introduzca un código."),
    nombre: Yup.string()
    .required(" Por favor introduzca un nombre.")
    .max(100),
    descripcion: Yup.string()
    .max(250, " Máximo 250 para la descripción del conglomerado"),
    conglomerado: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    empresa: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
    sede: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede."),
    dependencia: Yup.string()
      .ensure()
      .required(" Por favor seleccione una dependencia."),
    estado: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el grupo de usuarios.",
        value => value === true
      )
      .required(" Se debe aceptar la activacion de la empresa."),
    roles: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
      .required(" Por favor seleccione al menos un rol.")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(GrupoUsuariosForm);

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" }
];

class MySelect extends React.Component {
  handleChange = value => {
    this.props.onChange("roles", value);
  };

  handleBlur = () => {
    this.props.onBlur("roles", true);
  };

  render() {
    return (
      <div style={{ margin: "0" }}>
        <Select
          name={this.props.name}
          options={options}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder={"-- seleccione rol --"}
        />
        {/* {!!this.props.error && this.props.touched && (
          <div
            style={{ color: "red", marginTop: ".5rem" }}
            className="invalid-feedback"
          >
            {this.props.error}
          </div>
        )} */}
      </div>
    );
  }
}
