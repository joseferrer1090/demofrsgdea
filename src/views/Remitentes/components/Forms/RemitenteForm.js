import React from 'react';
import * as Yup from 'yup';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import { Formik, withFormik, ErrorMessage } from "formik";

const RemitenteForm = props =>{
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue
  } = props;

  return(
    <div className="animated fadeIn">
        <div className="container">
          <Row>
            <Col sm="8" md={{ offset: 2 }}>
              <Card>
                <CardHeader> Registro de tercero </CardHeader>
                <CardBody>
                  <form className="form">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Tipo de tercero{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            name={"tipoTercero"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tipoTercero}
                            className={`form-control form-control-sm ${errors.tipoTercero &&
                              touched.tipoTercero &&
                              "is-invalid"}`}
                          >
                          <option disabled value={""}>-- Selecione --</option>
                          <option value="1">Cliente</option>
                          <option value="2">Proveedor </option>
                          <option value="3">Stakeholders </option>
                          <option value="4">Ley </option>
                          <option value="5">Otros </option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.tipoTercero && touched.tipoTercero ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="tipoTercero"/>
                          </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Elemento de comunicación{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            name={"elementoComunicacion"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.elementoComunicacion}
                            className={`form-control form-control-sm ${errors.elementoComunicacion &&
                              touched.elementoComunicacion &&
                              "is-invalid"}`}
                          >
                          <option disabled value={""}>-- Selecione --</option>
                          <option value="1">Remitente</option>
                          <option value="2">Destinatario </option>
                          <option value="3">Mixto </option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.elementoComunicacion && touched.elementoComunicacion ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="elementoComunicacion"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Identificación{" "}
                            <span className="text-danger">*</span>{" "}
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
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.identificacion && touched.identificacion ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="identificacion"/>
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
                          onBlur={handleBlur.nombre}
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
                          <ErrorMessage name="nombre"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Email <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"email"}
                            onChange={handleChange}
                            onBlur={handleBlur.email}
                            value={values.email}
                            type="email"
                            className={`form-control form-control-sm ${errors.email &&
                              touched.email &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.email && touched.email ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="email"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label> Teléfono fijo </label>
                          <input
                          name={"telefonoFijo"}
                          onChange={handleChange}
                          onBlur={handleBlur.telefonoFijo}
                          type="text"
                          value={values.telefonoFijo}
                          className={`form-control form-control-sm ${errors.telefonoFijo &&
                            touched.telefonoFijo &&
                            "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.telefonoFijo && touched.telefonoFijo ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="telefonoFijo"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div className="form-group">
                        <label> Teléfono celular </label>
                        <input
                          name={"telefonoCelular"}
                          onChange={handleChange}
                          onBlur={handleBlur.telefonoCelular}
                          value={values.telefonoCelular}
                          type="text"
                          className={`form-control form-control-sm ${errors.telefonoCelular &&
                            touched.telefonoCelular &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                            {
                              errors.telefonoCelular && touched.telefonoCelular ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                        <ErrorMessage name="telefonoCelular"/>
                        </div>
                      </div>
                    </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Dirección </label>
                          <input
                            name={"direccion"}
                            onChange={handleChange}
                            onBlur={handleBlur.direccion}
                            value={values.direccion}
                            type="text"
                            className={`form-control form-control-sm ${errors.direccion &&
                              touched.direccion &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.direccion && touched.direccion ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="direccion"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            País <span className="text-danger"> * </span>{" "}
                          </label>
                          <select
                            name={"pais"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pais}
                            className={`form-control form-control-sm ${errors.pais &&
                              touched.pais &&
                              "is-invalid"}`}
                          >
                          <option disabled value={""}> -- Seleccione --</option>
                          <option value="1">País 1</option>
                          <option value="2">País 2 </option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.pais && touched.pais ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="pais"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Departamento{" "}
                            <span className="text-danger"> * </span>{" "}
                          </label>
                          <select
                            name={"departamento"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.departamento}
                            className={`form-control form-control-sm ${errors.departamento &&
                              touched.departamento &&
                              "is-invalid"}`}
                          >
                          <option disabled value={""}>-- Seleccione --</option>
                          <option value="1">Departamento 1</option>
                          <option value="2">Departamento 2 </option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.departamento && touched.departamento ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="departamento"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>
                            {" "}
                            Ciudad <span className="text-danger"> * </span>{" "}
                          </label>
                          <select
                            name={"ciudad"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ciudad}
                            className={`form-control form-control-sm ${errors.ciudad &&
                              touched.ciudad &&
                              "is-invalid"}`}
                          >
                          <option value={""} disabled>-- Seleccione --</option>
                          <option value="1">Ciudad 1</option>
                          <option value="2">Ciudad 2 </option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.ciudad && touched.ciudad ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name="ciudad"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Referencia </label>
                          <textarea
                            name={"referencia"}
                            onChange={handleChange}
                            onBlur={handleBlur.referencia}
                            value={values.referencia}
                            type="text"
                            className={`form-control form-control-sm ${errors.referencia &&
                              touched.referencia &&
                              "is-invalid"}`}
                          />
                          <ErrorMessage name="referencia"/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Observación </label>
                          <textarea
                            name={"observacion"}
                            onChange={handleChange}
                            onBlur={handleBlur.observacion}
                            type="text"
                            value={values.observacion}
                            className={`form-control form-control-sm ${errors.observacion &&
                              touched.observacion &&
                              "is-invalid"}`}
                          />
                          <ErrorMessage name="observacion"/>
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
                              type="checkbox"
                              id="ExampleInputCheckbox"
                              label="Si esta opción se encuentra activada, representa
                              que el remitente es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el remitente no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema."
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
                              que el remitente es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el remitente no se elimina del sistema
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
                  <i className="fa fa-save" /> Registrar
                </div>
              )}
            </button>
          </div>
        </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
  );
}
export default withFormik({
  mapPropsToValues: props =>({
    tipoTercero: props.remitenteForm.tipoTercero,
    elementoComunicacion: props.remitenteForm.elementoComunicacion,
    pais: props.remitenteForm.pais,
    departamento: props.remitenteForm.departamento,
    ciudad: props.remitenteForm.ciudad,
    identificacion:props.remitenteForm.identificacion,
    nombre: props.remitenteForm.nombre,
    email: props.remitenteForm.email,
    direccion: props.remitenteForm.direccion,
    telefonoFijo: props.remitenteForm.telefonoFijo,
    telefonoCelular:props.remitenteForm.telefonoCelular,
    referencia: props.remitenteForm.referencia,
    observacion:props.remitenteForm.observacion,
    estado: props.remitenteForm.estado,
  }),
  validationSchema: Yup.object().shape({
    tipoTercero: Yup.string()
    .ensure()
    .required(" Por favor seleccione el tipo de tercero."),
    elementoComunicacion: Yup.string()
    .ensure()
    .required(" Por favor seleccione un elemento de comunicación."),
    pais: Yup.string()
    .ensure()
    .required(" Por favor seleccione un país."),
    departamento: Yup.string()
    .ensure()
    .required(" Por favor seleccione un departamento."),
    ciudad: Yup.string()
    .ensure()
    .required(" Por favor seleccione una ciudad."),
    identificacion: Yup.string()
    .max(20, "Máximo 20 caracteres")
    .required(" Por favor introduzca una identificación."),
    nombre: Yup.string()
    .max(45, "Máximo 45 caracteres.")
    .required(" Por favor introduzca un nombre."),
    email: Yup.string()
    .email(" Por favor introduzca un email valido.")
    .required(" Por favor introduzca un email."),
    telefonoFijo: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      " Número no valido."
    )
    .length(10, " Míximo 10 digitos")
    .required(" Por favor introduzca un teléfono fijo."),
    telefonoCelular: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      " Número no valido."
    )
    .length(10, " Míximo 10 digitos")
    .required(" Por favor introduzca un teléfono celular."),
    direccion: Yup.string()
    .max(45, "Máximo 45 caracteres")
    .required("Por favor introduzca una dirección."),
    referencia: Yup.string()
    .notRequired()
    .max(50, "Máximo 50 caracteres."),
    observacion: Yup.string()
    .notRequired()
    .max(250, "Máximo 250 caracteres."),
    estado: Yup.bool().test(
      "Activo",
      "se requiere la activacion el usuario",
      value => value === true
    ),
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(RemitenteForm);


