import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  CardTitle,
  CardText,
  NavLink,
CustomInput
} from "reactstrap";
import Select from "react-select";
import classnames from "classnames";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ModalEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      activeTab: "1",
      identificacion: "",
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      f_d_nacimiento: "",
      conglomerado: "",
      empresa: "",
      sede: "",
      dependencia: "",
      cargo: "",
      username: "",
      roles: [],
      estado: "",
      file: ""
    };
    this.inputOpenFileRef = React.createRef();
  }

  toogleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  componentDidMount() {
    this.getRolesInformation()
  }

  getRolesInformation() {
    fetch(`http://localhost:3001/usuarios/1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          identificacion: data.identificacion,
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          direccion: data.direccion,
          f_d_nacimiento: data.f_d_nacimiento,
          conglomerado: data.conglomerado,
          empresa: data.empresa,
          sede: data.sede,
          dependencia: data.dependencia,
          cargo: data.cargo,
          username: data.username,
          password: data.password,
          confirm_password: data.confirm_password,
          roles: data.roles,
          estado: data.estado,
          file: data.file
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
}

  render() {
    const dataPreview ={
      identificacion: this.state.identificacion,
      nombre: this.state.nombre,
      email: this.state.email,
      telefono: this.state.telefono,
      direccion: this.state.direccion,
      f_d_nacimiento: this.state.f_d_nacimiento,
      conglomerado: this.state.conglomerado,
      empresa: this.state.empresa,
      sede: this.state.sede,
      dependencia: this.state.dependencia,
      cargo: this.state.cargo,
      username: this.state.username,
      roles: this.state.roles,
      estado: this.state.estado,
      file: this.state.file
    }
    return (
      <Fragment>
      <Modal className="modal-lg" isOpen={this.state.modal}>
      <ModalHeader> Actualizar usuario</ModalHeader>
      <Formik
      initialValues={dataPreview}
          onSubmit={(values, {setSubmitting}) =>{
            setTimeout(()=>{
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false)
            },500)
          }}
          validationSchema={Yup.object().shape({
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
            roles: Yup.array()
              .of(
                Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required()
                })
              )
              .required(" Por favor seleccione al menos un rol."),
            estado: Yup.bool()
              .test(
                "Activado",
                "",
                value=> value === true
              ),
          })}
      >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
          setFieldTouched
        } = props;
        return(
          <Fragment>
          <ModalBody>
        <form className="form">
          <Row>
            <Col sm="3">
              <img
                src={"https://via.placeholder.com/150"}
                className="img-thumbnail"
              />
              <input
                type="file"
                style={{ display: "none" }}
                ref={this.inputOpenFileRef}
              />
              <button
                className="btn btn-secondary btn-sm"
                onClick={this.showOpenFileDlg}
                style={{ width: "160px" }}
              >
                <i className="fa fa-camera" /> Cambiar imagen{" "}
              </button>
            </Col>
            <Col sm="9">
              <div className="">
                {" "}
                <h5 className="" style={{ borderBottom: "1px solid black" }}>
                  {" "}
                  Datos personales{" "}
                </h5>{" "}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      Identificación <span className="text-danger">
                      *
                    </span>{" "}
                      <dd>
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
                      <ErrorMessage name="identificacion" />
                      </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                     Nombre <span className="text-danger">
                     *
                   </span>{" "}
                      <dd>
                        {" "}
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
                        <i className="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="nombre" />
                      </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      E-mail <span className="text-danger">
                      *
                    </span>{" "}
                      <dd>
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
                      <i className="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="email" />
                    </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                    Teléfono <span className="text-danger">
                    *
                  </span>{" "}
                      <dd>
                        {" "}
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
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="telefono" />
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      Dirección
                      <dd>
                        {" "}
                        <input
                        name={"direccion"}
                        type="text"
                        className="form-control form-control-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.direccion}
                      />
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      Fecha de nacimiento
                      <dd>
                        {" "}
                        <input
                        name={"f_d_nacimiento"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.f_d_nacimiento}
                        type="date"
                        className="form-control form-control-sm"
                      />
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toogleTab("1");
                    }}
                  >
                    Datos laborales
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toogleTab("2");
                    }}
                  >
                    Datos de seguridad
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <Card body>
                        <form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Conglomerado{" "}
                                  <span className="text-danger">*</span>{" "}
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
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name="conglomerado" />
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Empresa{" "}
                                  <span className="text-danger">*</span>{" "}
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
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name="empresa" />
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Sede <span className="text-danger">
                                    *
                                  </span>{" "}
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
                                <i className="fa fa-exclamation-triangle"/> :
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
                                  Dependencia{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
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
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name="dependencia" />
                              </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Cargo <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
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
                          <i className="fa fa-exclamation-triangle"/> :
                          null
                        }
                        <ErrorMessage name="cargo" />
                        </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <Card body>
                        <form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Usuario{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                disabled
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
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name="username" />
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              {" "}
                              Roles <span className="text-danger">
                                *
                              </span>{" "}
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
                                    <i className="fa fa-exclamation-triangle"/> :
                                    null
                                  }
                                  <ErrorMessage name={"roles"} />
                                  </div>
                                </div>
                              ) : null}
                          </div>
                        </div>
                            <div className="col-md-12">
                              <div className="form-group">
                              <label>
                              {" "}
                              Estado <span className="text-danger">
                                *
                              </span>{" "}
                            </label>
                            <div className="text-justify">
                            <Field
                                name="estado"
                                render={({field, form})=>{
                                  return(
                                    <CustomInput
                                    type="checkbox"
                                    id="CheckBoxEditRoles"
                                    label=" Si esta opción se encuentra activada, representa
                                  que el rol es visible en el sistema y se podrán
                                  realizar operaciones entre cada uno de los módulos
                                  correspondientes de la aplicación. En caso
                                  contrario el rol no se elimina del sistema solo
                                  quedará inactivo e invisibles para cada uno de los
                                  módulos correspondiente del sistema."
                                  {...field}
                                  checked={field.value}
                                  className={
                                    errors.estado &&
                                    touched.estado &&
                                    "invalid-feedback"
                                  }
                                  />

                                  );
                                }}
                            />
                                <ErrorMessage name="estado"/>
                              </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={e=>{
            e.preventDefault();
            handleSubmit();
          }}
          type="button"
          className="btn btn-outline-success btn-sm">
          <i className="fa fa-pencil" /> Actualizar{" "}
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.setState({ modal: false });
          }}
        >
          <i className="fa fa-times" /> Cerrar{" "}
        </button>
      </ModalFooter>
          </Fragment>
        );
      }}
      </Formik>
    </Modal>
      </Fragment>
    );
  }
}

ModalEditUser.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditUser;

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
      </div>
    );
  }
}
