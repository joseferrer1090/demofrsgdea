import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  CardTitle
} from "reactstrap";

const RolesForm = props => {
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
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form className="form" noValidate>
            <Card>
              <CardHeader>Registro de rol</CardHeader>
              <CardBody>
                <div className="row">
                  <Col sm="6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Código <span className="text-danger">*</span>{" "}
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
                      <ErrorMessage name={"codigo"} />
                    </div>
                  </Col>
                  <Col sm="6">
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
                      <ErrorMessage name={"nombre"} />
                    </div>
                  </Col>
                  <Col sm="12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Descripción <span className="text-danger">*</span>{" "}
                      </label>
                      <textarea
                        name={"descripcion"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.descripcion}
                        className={`form-control form-control-sm ${errors.descripcion &&
                          touched.descripcion &&
                          "is-invalid"}`}
                      />
                      <ErrorMessage name={"descripcion"} />
                    </div>
                  </Col>
                </div>
                <Row>
                  <Col sm="12">
                    <Card body>
                      <CardTitle>
                        {" "}
                        <h4>
                          {" "}
                          Asignar permisos <hr />{" "}
                        </h4>
                      </CardTitle>
                      <Row>
                        <Col sm="6">
                          <div className="form-group">
                            <label>
                              {" "}
                              Modulo <span className="text-danger">*</span>{" "}
                            </label>
                            <select className="form-control form-control-sm">
                              {" "}
                              <option> Seleccione... </option>{" "}
                            </select>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="form-group">
                            <label>
                              {" "}
                              Entidades <span className="text-danger">
                                *
                              </span>{" "}
                            </label>
                            <select
                              className="form-control form-control-sm
                                "
                            >
                              {" "}
                              <option> Seleccione... </option>{" "}
                            </select>
                          </div>
                        </Col>
                        {/*  Aqui va la funcionalidad    */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                multiple
                                className="form-control"
                                style={{
                                  width: "310px",
                                  marginLeft: "14px"
                                }}
                              >
                                <option> Seleccione </option>
                              </select>
                              {/* <ListaRoles
                                data={this.props.data}
                                favouritesroles={this.state.favourites}
                                addFavourite={this.addFavourite.bind(this)}
                              /> */}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <select
                              multiple
                              className="form-control"
                              disabled
                              style={{
                                width: "310px",
                                marginRight: "10px"
                              }}
                            >
                              <option> las nuevas opciones</option>
                            </select>
                            {/* <NuevaListaRoles
                              data={this.props.data}
                              favourites={this.state.favourites}
                              deleteFavourite={this.deleteFavourite.bind(this)}
                            /> */}
                          </div>
                        </div>
                        {/*  Fin   */}
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="">
                        <CustomInput
                          name={"estado"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.estado}
                          type="checkbox"
                          id="ExampleCheckBoxInput"
                          label=" Si esta opción se encuentra activada, representa
                            que el rol es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso
                            contrario el rol no se elimina del sistema solo
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
                              que el rol es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el rol no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema.
                            </p> */}
                      </div>
                    </div>
                  </Col>
                </Row>
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
        </div>
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    codigo: props.roles.codigo,
    nombre: props.roles.nombre,
    descripcion: props.roles.descripcion,
    modulos: props.roles.modulos,
    entidades: props.roles.entidades,
    estado: props.roles.estado
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string().required("necesario el codigo"),
    nombre: Yup.string().required("necesario el nombre"),
    descripcion: Yup.string().required("necesario descripcion"),
    estado: Yup.bool()
      .test("Activo", "necesario activar el rol", value => value === true)
      .required("necesario activar el rol")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(RolesForm);
