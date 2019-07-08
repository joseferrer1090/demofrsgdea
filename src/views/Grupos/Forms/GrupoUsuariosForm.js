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
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
return(
  <Row>
        <Col sm="8" md={{ offset: 2 }}>
          <Card>
            <CardHeader> Registro de grupo de usuarios </CardHeader>
            <CardBody>
                  <form>
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
                          <ErrorMessage name="codigo" />
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
                          <ErrorMessage name="nombre" />
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
                          <ErrorMessage name="descripcion" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-md-12">
                      <Card>
                        <CardBody>
                          <h5 className=""> Búsqueda de usuarios </h5>
                          <hr />
                          <br />
                          <form className="form">
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
                                  <ErrorMessage name="conglomerado" />
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
                                  <ErrorMessage name="empresa"/>
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
                                  <ErrorMessage name="sede"/>
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
                                  <ErrorMessage name ="dependencia"/>
                                </div>
                              </div>
                            </div>

                            {/*dataOk ? (
                                <div className="form-group">
                                  <label>Usuarios disponibles</label>
                                  <select className="form-control form-control-sm"  multiple>
                                   {buscarOpciones}
                                  </select>
                                </div>
                            ) : null*/}

                          </form>
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
                        <Select
                          //  onChange={selectedOptionUserAsigandos}
                           defaultValue={{
                              value: 'loadUsers',
                              label: 'Cargar usuarios'
                            }}
                            // options={filtraritems}
                            isMulti
                          />
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
    estado: props.grupoUsuarios.estado
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string()
      .min(6, "Mínimo son 6 caracteres en el código")
      .max(6, "Máximo son 6 caracteres")
      .required("Codigo es requerido"),
    nombre: Yup.string()
    .required("Nombre es requerido")
    .max(100),
    descripcion: Yup.string()
    .max(250, "Máximo 250 para la descripción del conglomerado"),
    conglomerado: Yup.string()
      .ensure()
      .required("Seleccionar conglomerador para el grupo de usuarios"),
    empresa: Yup.string()
      .ensure()
      .required("Seleccionar empresa para el grupo de usuarios"),
    sede: Yup.string()
      .ensure()
      .required("Seleccionar sede para el grupo de usuarios"),
    dependencia: Yup.string()
      .ensure()
      .required("Seleccionar dependencia para el grupo de usuarios"),
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
})(GrupoUsuariosForm);

