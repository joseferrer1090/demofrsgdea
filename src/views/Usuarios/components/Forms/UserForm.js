import React from "react";
import { Formik, withFormik, ErrorMessage, yupToFormErrors } from "formik";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput
} from "reactstrap";
import * as Yup from "yup";
import Select from "react-select";

const UserForm = props => {
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

  return (
    <div>
      <Card>
        <CardHeader>Registro de usuarios </CardHeader>
        <CardBody>
          <Row>
            <Col sm="3">
              <div className="text-center">
                {/* <img
                  src={"/assets/img/avatar2.png"}
                  className="img-thumbnail"
                />
                <br />
                <br />
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={this.inputOpenFileRef}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm "
                  style={{ width: "160px" }}
                  onClick={this.showOpenFileDlg}
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
                      <ErrorMessage name="email" />
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
                      <ErrorMessage name="telefono" />
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
                        Conglomerado <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name={"conglomerado"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomerado}
                        className={`form-control form-control-sm ${errors.conglomerado &&
                          touched.conglomerado &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option>Seleccione...</option>{" "}
                      </select>
                      <ErrorMessage name="conglomerado" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Empresa <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name={"empresa"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.empresa}
                        className={`form-control form-control-sm ${errors.empresa &&
                          touched.empresa &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option>Seleccione... </option>{" "}
                      </select>
                      <ErrorMessage name="empresa" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Sede <span className="text-danger">*</span>{" "}
                      </label>
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
                        <option> Seleccione... </option>{" "}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Dependencia <span className="text-danger">*</span>{" "}
                      </label>
                      {/* <Select
                        value={selectedoptiondependencia}
                        onChange={this.handleSelectedOptionDependencia}
                        options={dataExampleDependencia}
                        placeholder={""}
                      /> */}
                      <select
                        name={"dependencia"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dependencia}
                        className={`form-control form-control-sm ${errors.dependencia &&
                          touched.dependencia &&
                          "is-invalid"}`}
                      >
                        <option>--Seleccione--</option>
                      </select>
                      <ErrorMessage name="dependencia" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Cargo <span className="text-danger">*</span>{" "}
                      </label>
                      {/* <Select
                        value={selectedoptioncargo}
                        onChange={this.handleChangeSelectedOptionCargo}
                        options={dataExampleCargo}
                        placeholder={""}
                      /> */}
                      <select
                        name={"cargo"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cargo}
                        className={`form-control form-control-sm ${errors.cargo &&
                          touched.cargo &&
                          "is-invalid"}`}
                      >
                        <option>--Seleccione--</option>
                      </select>
                      <ErrorMessage name="cargo" />
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
                        Nombre de usuario <span className="text-danger">
                          *
                        </span>{" "}
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
                      <ErrorMessage name="username" />
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
                      <ErrorMessage name="password" />
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
                      <ErrorMessage name="confirm_password" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Roles <span className="text-danger">*</span>{" "}
                      </label>
                      <MySelect
                        value={values.topics}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.topics}
                        touched={touched.topics}
                      />
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
                      <ErrorMessage name="roles" />
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
    identificacion: props.user.identificacion,
    nombre: props.user.nombre,
    email: props.user.email,
    telefono: props.user.telefono,
    direccion: props.user.direccion,
    f_d_nacimiento: props.user.f_d_nacimiento,
    conglomerado: props.user.conglomerado,
    empresa: props.user.empresa,
    sede: props.user.sede,
    dependencia: props.user.dependencia,
    cargo: props.user.cargo,
    username: props.user.username,
    password: props.user.password,
    confirm_password: props.user.confirm_password,
    roles: props.user.roles,
    estado: props.user.estado,
    topics: props.user.topics
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("email no es valido")
      .required("email requerido"),
    telefono: Yup.string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "numero no valido"
      )
      .length(10, "maximo 10 digitos")
      .required("numero requerido"),
    nombre: Yup.string().required("nombre requerido"),
    identificacion: Yup.string().required("identificacion requerida"),
    sede: Yup.string()
      .ensure()
      .required("requere sede"),
    conglomerado: Yup.string()
      .ensure()
      .required("conglomerado requerido"),
    empresa: Yup.string()
      .ensure()
      .required("empresa requerida"),
    dependencia: Yup.string()
      .ensure()
      .required("dependencia requerida"),
    cargo: Yup.string()
      .ensure()
      .required("cargo requerido"),
    username: Yup.string().required("username requerido "),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
        "contraseña no valida, la contraseña debe tener al menos una letra en mayuscula, al menos un digito, no espacio en blanco, al menos un caracter especial"
      )
      .required("contraseña es necesaria")
      .min(8, "minimo son 8 caracteres")
      .max(15),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "contraseñas no coinciden")
      .required("necesario confirmar la contraseña")
      .min(10, "minimo son 10 caracteres")
      .max(200),
    roles: Yup.string()
      .ensure()
      .required("seleccionar rol"),
    estado: Yup.bool().test(
      "Activo",
      "se requiere la activacion el usuario",
      value => value === true
    ),
    topics: Yup.array().required("Seleccione al menos un rol")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(UserForm);

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
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange("topics", value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur("topics", true);
  };

  render() {
    return (
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="color">Topics (select at least 3) </label>
        <Select
          id="color"
          options={options}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}
