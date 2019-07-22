import React from "react";
import {
  Formik,
  withFormik,
  ErrorMessage,
  yupToFormErrors,
  Field
} from "formik";
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
import CustonImageInput from "./CustonImageInput";

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
    setFieldValue,
    initialValues = {
      file: undefined
    }
  } = props;

  return (
    <div>
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
                  <Field
                    name={"file"}
                    component={CustonImageInput}
                    setFieldValue={setFieldValue}
                  />

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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.identificacion && touched.identificacion ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.email && touched.email ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.telefono && touched.telefono ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
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
                          <option>conglomerado1</option>
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
                          <option>empresa1</option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.empresa && touched.empresa ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="empresa" />
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
                          <option>sede1</option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.sede && touched.sede ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name={"sede"} />
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
                          <option>dependencia</option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.dependencia && touched.dependencia ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="dependencia" />
                        </div>
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
                          <option>cargo1</option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.cargo && touched.cargo ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="cargo" />
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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.username && touched.username ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.password && touched.password ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
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
                        <div style={{ color: '#D54B4B' }}>
                        {
                          errors.confirm_password && touched.confirm_password ?
                          <i class="fa fa-exclamation-triangle"/> :
                          null
                        }
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
    file: props.user.file
  }),
  validationSchema: Yup.object().shape({
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
    nombre: Yup.string()
      .required(" Por favor introduzca un nombre."),
    identificacion: Yup.string()
      .required(" Por favor introduzca una identificación."),
    sede: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede."),
    conglomerado: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    empresa: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
    dependencia: Yup.string()
      .ensure()
      .required(" Por favor seleccione una dependencia."),
    cargo: Yup.string()
      .ensure()
      .required(" Por favor seleccione un cargo."),
    username: Yup.string()
      .required(" Por favor introduzca un username."),
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
    estado: Yup.bool().test(
      "Activo",
      "Se requiere la activacion del usuario",
      value => value === true
    ),
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
      alert(
        JSON.stringify(
          {
            identificacion: values.identificacion,
            nombre: values.nombre,
            email: values.email,
            telefono: values.telefono,
            direccion: values.direccion,
            f_d_nacimiento: values.f_d_nacimiento,
            conglomerado: values.conglomerado,
            empresa: values.empresa,
            sede: values.sede,
            dependencia: values.dependencia,
            cargo: values.cargo,
            username: values.username,
            password: values.password,
            confirm_password: values.confirm_password,
            roles: values.roles,
            estado: values.estado,
            file: {
              type: values.file.type,
              name: values.file.name,
              size: values.file.size
            }
          },
          null,
          2
        )
      );
      // alert(
      //   JSON.stringify({
      //     file: values.file
      //   })
      // );
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
