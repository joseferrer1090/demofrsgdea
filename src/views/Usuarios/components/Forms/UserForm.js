import React, { useState, useEffect, Fragment } from "react";
import { Formik, withFormik, ErrorMessage, Field } from "formik";
import {
  CONGLOMERATES,
  COUNTRIES,
  DEPARTMENTS,
  CITYS,
  CHARGES,
  COMPANY
} from "./../../../../services/EndPoints";
import * as Yup from "yup";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CustomInput,
  CardFooter
} from "reactstrap";

const UserForm = props => {
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
    handleReset,
    t
  } = props;

  const [conglomerateOptions, setConglomerateOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [sedeOptions, setSedeOptions] = useState([]);
  const [dependenciaOptions, setDependenciaOptions] = useState([]);
  const [cargoOptions, setCargoOptions] = useState([]);

  useEffect(() => {
    dataConglomerate();
    dataCompany();
    dataSedes();
    dataDependencia();
    dataCharge();
  }, []);

  const dataConglomerate = data => {
    fetch(CONGLOMERATES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        setConglomerateOptions(data);
      })
      .catch(error => console.log(" " + error));
  };

  const dataCompany = data => {
    fetch("http://192.168.10.180:7000/api/sgdea/company/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        setCompanyOptions(data);
      })
      .catch(Error => console.log(" " + Error));
  };

  const dataSedes = data => {
    fetch("http://192.168.10.180:7000/api/sgdea/headquarter", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        setSedeOptions(data);
      })
      .catch(Error => console.log(" " + Error));
  };

  const dataDependencia = data => {
    fetch("http://192.168.10.180:7000/api/sgdea/dependence", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        setDependenciaOptions(data);
      })
      .catch(Error => console.log(" " + Error));
  };

  const dataCharge = data => {
    fetch("http://192.168.10.180:7000/api/sgdea/charge", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        setCargoOptions(data);
      })
      .catch(Error => console.log(" " + Error));
  };

  console.log(conglomerateOptions);
  console.log(companyOptions);
  console.log(sedeOptions);
  console.log(dependenciaOptions);
  console.log(cargoOptions);

  return (
    <Fragment>
      <Card>
        <CardHeader>Registro de usuarios </CardHeader>
        <CardBody>
          <form encType={"multipart/form-data"}>
            <Row>
              <Col sm="3">
                <div className="text-center">
                  {/* <img
                  src={"/assets/img/avatar2.png"}
                  className="img-thumbnail"
                /> */}
                  <br />
                  <br />
                  {/* <Field
                    name={"file"}
                    component={CustonImageInput}
                    setFieldValue={setFieldValue}
                  /> */}

                  {/* <input
                  type="file"
                  style={{ display: "none" }}
                  // ref={this.inputOpenFileRef}
                  value={values.imageUser}
                  onChange={handleChange}
                  onBlur={handleBlur}
                /> */}
                  {/* <button
                  type="button"
                  className="btn btn-secondary btn-sm "
                  style={{ width: "160px" }}
                  onClick={showOpenFileDlg}
                >
                  {" "}
                  <i className="fa fa-camera" /> Cambiar imagen{" "}
                </button> */}
                </div>
              </Col>

              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos personales{" "}
                  </h5>{" "}
                </div>
                <br />
                <form className="from">
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
                        <div style={{ color: "#D54B4B" }}>
                          {errors.identificacion && touched.identificacion ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="identificacion" />
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
                        <div style={{ color: "#D54B4B" }}>
                          {errors.nombre && touched.nombre ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="nombre" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          name={"email"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          type="text"
                          className={`form-control form-control-sm ${errors.email &&
                            touched.email &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: "#D54B4B" }}>
                          {errors.email && touched.email ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="email" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
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
                        <div style={{ color: "#D54B4B" }}>
                          {errors.telefono && touched.telefono ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="telefono" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label> Dirección </label>
                        <input
                          name={"direccion"}
                          type="text"
                          className="form-control form-control-sm"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.direccion}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Fecha de nacimiento </label>
                        <input
                          name={"f_d_nacimiento"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.f_d_nacimiento}
                          type="date"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos laborales{" "}
                  </h5>{" "}
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {" "}
                          Conglomerado <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <select
                          name={"conglomeradoID"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.conglomeradoID}
                          className={`form-control form-control-sm ${errors.conglomeradoID &&
                            touched.conglomeradoID &&
                            "is-invalid"}`}
                        >
                          {" "}
                          <option disabled value={""}>
                            {" "}
                            -- Seleccione --{" "}
                          </option>{" "}
                          <option value={"1"}> Conglomerado 1 </option>
                          <option value={"2"}> Conglomerado 2 </option>
                          <option value={"3"}> Conglomerado 3 </option>
                        </select>
                        <div style={{ color: "#D54B4B" }}>
                          {errors.conglomeradoID && touched.conglomeradoID ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="conglomeradoID" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {" "}
                          Empresa <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          name={"empresaID"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.empresaID}
                          className={`form-control form-control-sm ${errors.empresaID &&
                            touched.empresaID &&
                            "is-invalid"}`}
                        >
                          {" "}
                          <option disabled value={""}>
                            {" "}
                            -- Seleccione --{" "}
                          </option>{" "}
                          <option value={"1"}> Empresa 1 </option>
                          <option value={"2"}> Empresa 2 </option>
                          <option value={"3"}> Empresa 3 </option>
                        </select>
                        <div style={{ color: "#D54B4B" }}>
                          {errors.empresaID && touched.empresaID ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="empresaID" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {" "}
                          Sede <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          name={"sedeID"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.sedeID}
                          className={`form-control form-control-sm ${errors.sedeID &&
                            touched.sedeID &&
                            "is-invalid"}`}
                        >
                          {" "}
                          <option disabled value={""}>
                            {" "}
                            -- Seleccione --{" "}
                          </option>{" "}
                          <option value={"1"}> Sede 1 </option>
                          <option value={"2"}> Sede 2 </option>
                          <option value={"3"}> Sede 3 </option>
                        </select>
                        <div style={{ color: "#D54B4B" }}>
                          {errors.sedeID && touched.sedeID ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name={"sedeID"} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Dependencia <span className="text-danger">
                            *
                          </span>{" "}
                        </label>
                        <select
                          name={"dependenciaID"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dependenciaID}
                          className={`form-control form-control-sm ${errors.dependenciaID &&
                            touched.dependenciaID &&
                            "is-invalid"}`}
                        >
                          <option disabled value={""}>
                            {" "}
                            -- Seleccione --{" "}
                          </option>
                          <option value={"1"}> Dependencia 1 </option>
                          <option value={"2"}> Dependencia 2 </option>
                          <option value={"3"}> Dependencia 3 </option>
                        </select>
                        <div style={{ color: "#D54B4B" }}>
                          {errors.dependenciaID && touched.dependenciaID ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="dependenciaID" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Cargo <span className="text-danger">*</span>{" "}
                        </label>
                        <select
                          name={"cargoID"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cargoID}
                          className={`form-control form-control-sm ${errors.cargoID &&
                            touched.cargoID &&
                            "is-invalid"}`}
                        >
                          <option disabled value={""}>
                            {" "}
                            -- Seleccione --{" "}
                          </option>
                          <option value={"1"}> Cargo 1 </option>
                          <option value={"2"}> Cargo 2 </option>
                          <option value={"3"}> Cargo 3 </option>
                        </select>
                        <div style={{ color: "#D54B4B" }}>
                          {errors.cargoID && touched.cargoID ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="cargoID" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos de seguridad{" "}
                  </h5>{" "}
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Nombre de usuario{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          name={"username"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          className={`form-control form-control-sm ${errors.username &&
                            touched.username &&
                            "is-invalid"}`}
                          type="text"
                        />
                        <div style={{ color: "#D54B4B" }}>
                          {errors.username && touched.username ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="username" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Contraseña <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          name={"password"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          className={`form-control form-control-sm ${errors.password &&
                            touched.password &&
                            "is-invalid"}`}
                          type="password"
                        />
                        <div style={{ color: "#D54B4B" }}>
                          {errors.password && touched.password ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="password" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Confirmar contraseña{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          name={"confirm_password"}
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirm_password}
                          className={`form-control form-control-sm ${errors.confirm_password &&
                            touched.confirm_password &&
                            "is-invalid"}`}
                        />
                        <div style={{ color: "#D54B4B" }}>
                          {errors.confirm_password &&
                          touched.confirm_password ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="confirm_password" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Roles <span className="text-danger">*</span>{" "}
                        </label>
                        {/* <MySelect
                          name={"roles"}
                          value={values.roles}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          error={errors.roles}
                          touched={touched.roles}
                        /> */}
                        {/* {touched ? (
                          <div style={{ color: "red" }}>
                            {" "}
                            <div style={{ color: "#D54B4B" }}>
                              {errors.roles && touched.roles ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name={"roles"} />
                            </div>
                          </div>
                        ) : null} */}
                        {/* <select
                        name={"roles"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.roles}
                        className={`form-control form-control-sm ${errors.roles &&
                          touched.roles &&
                          "is-invalid"}`}
                      >
                        <option>--Seleccione--</option>
                      </select> */}
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
                            id="ExampleCheckBoxInput"
                            label="Si esta opción se encuentra activada,
                                representa que el usuario es visible en el
                                sistema y se podrán realizar operaciones entre
                                cada uno de los módulos correspondientes de la
                                aplicación. En caso contrario el usuario no se
                                elimina del sistema solo quedará inactivo e
                                invisibles para cada uno de los módulos
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
                                  Si esta opción se encuentra activada,
                                  representa que el usuario es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario el usuario no se
                                  elimina del sistema solo quedará inactivo e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema.
                                </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
    </Fragment>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    identificacion: props.user.identificacion,
    nombre: props.user.nombre,
    email: props.user.email,
    telefono: props.user.telefono,
    direccion: props.user.direccion,
    f_d_nacimiento: props.user.f_d_nacimiento,
    conglomeradoID: props.user.conglomeradoID,
    empresaID: props.user.empresaID,
    sedeID: props.user.sedeID,
    dependenciaID: props.user.dependenciaID,
    cargoID: props.user.cargoID,
    username: props.user.username,
    password: props.user.password,
    confirm_password: props.user.confirm_password,
    rolesID: props.user.rolesID,
    estado: props.user.estado
  }),
  validationSchema: Yup.object().shape({
    identificacion: Yup.string().required(
      " Por favor introduzca una identificación."
    ),
    nombre: Yup.string().required("Por favor introduzca un nombre."),
    email: Yup.string()
      .email(" Por favor introduzca un email valido.")
      .required(" Por favor introduzca un email."),
    telefono: Yup.string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        " Número no valido"
      )
      .length(10, " Mínimo 10 digitos")
      .required(" Por favor introduzca un número."),
    direccion: Yup.string(),
    f_d_nacimiento: Yup.date()
      .nullable()
      .notRequired(),
    conglomeradoID: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    empresaID: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
    sedeID: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede"),
    dependenciaID: Yup.string()
      .ensure()
      .required(" Por favor seleccione una dependencia"),
    cargoID: Yup.string()
      .ensure()
      .required(" Por favor selccione un cargo"),
    username: Yup.string().required(" Por favor introduzca un username"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
        " Contraseña no valida, asegúrese de que lleve al menos una letra en mayuscula, un digito, y un caracter especial."
      )
      .required(" Por favor introduzca una contraseña.")
      .min(8, "  Mínimo 8 caracteres. ")
      .max(15, " Máximo 15 caracteres."),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], " Las contraseñas no coinciden.")
      .required(" Por favor confirme la contraseña.")
      .min(10, " Mínimo 10 caracteres.")
      .max(200),
    rolesID: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
    ),
    estado: Yup.bool().test(
      "Activo",
      "Se requiere la activacion del usuario",
      value => value === true
    )
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, "", 2));
    }, 1000);
    setSubmitting(false);
    resetForm();
  }
})(UserForm);
