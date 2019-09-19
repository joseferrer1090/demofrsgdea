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
      id: this.props.id,
      userLogged: "jferrer",
      dataUser: {},
      dataConglomerate: [],
      dataCompany: [],
      dataHeadquarter: [],
      dataDependence: [],
      dataCharge: []
    };
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this.getDataConglomerate();
    // this.getDataCompany();
    // this.getDataHeadquarter();
    // this.getDataDependence();
    // this.getDataCharge();
  }

  toogleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataUser(id);
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  getDataUser = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/user/${id}/?username=${this.state.userLogged}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataUser: data
        });
      })
      .catch(Error => console.log("Error", Error));
  };

  getDataConglomerate = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataConglomerate: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  // getDataCompany = () => {
  //   fetch(`http://192.168.10.180:7000/api/sgdea/company/active`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + window.btoa("sgdea:123456")
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         dataCompany: data
  //       });
  //     })
  //     .catch(err => console.log("Error ", err));
  // };

  // getDataHeadquarter = () => {
  //   fetch(`http://192.168.10.180:7000/api/sgdea/headquarter/active`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + window.btoa("sgdea:123456")
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         dataHeadquarter: data
  //       });
  //     })
  //     .catch(err => console.log("Error", err));
  // };

  // getDataDependence = () => {
  //   fetch(`http://192.168.10.180:7000/api/sgdea/dependence/active`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + window.btoa("sgdea:123456")
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         dataDependence: data
  //       });
  //     })
  //     .catch(err => console.log("Error", err));
  // };

  // getDataCharge = () => {
  //   fetch(`http://192.168.10.180:7000/api/sgdea/charge/active`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + window.btoa("sgdea:123456")
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       this.setState({
  //         dataCharge: data
  //       });
  //     })
  //     .catch(err => console.log("Error", err));
  // };

  render() {
    console.log(this.state.id);
    const dataResult = {
      identificacion: this.state.dataUser.identification,
      nombre: this.state.dataUser.name,
      email: this.state.dataUser.email,
      telefono: this.state.dataUser.phone,
      direccion: this.state.dataUser.address,
      f_d_nacimiento: this.state.dataUser.birthDate,
      username: this.state.dataUser.username,
      conglomerado: this.state.dataUser.conglomerateId,
      empresa: this.state.dataUser.companyId,
      sede: this.state.dataUser.headquarterId,
      dependence: this.state.dataUser.dependenceId,
      cargo: this.state.dataUser.chargeId
    };
    console.log(dataResult);
    const selectOptionsConglomerate = this.state.dataConglomerate.map(
      (aux, id) => {
        return <option value={aux.id}>{aux.name}</option>;
      }
    );
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            Actualizar usuario {this.state.dataUser.name}{" "}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
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
              nombre: Yup.string().required(" Por favor introduzca un nombre."),
              identificacion: Yup.string().required(
                " Por favor introduzca una identificación."
              ),
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
              username: Yup.string().required(
                " Por favor introduzca un username."
              ),
              roles: Yup.array()
                .of(
                  Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.string().required()
                  })
                )
                .required(" Por favor seleccione al menos un rol."),
              estado: Yup.bool().test("Activado", "", value => value === true)
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
              return (
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
                            <h5
                              className=""
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              Datos personales{" "}
                            </h5>{" "}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  Identificación{" "}
                                  <span className="text-danger">*</span>{" "}
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
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.identificacion &&
                                      touched.identificacion ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="identificacion" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  Nombre <span className="text-danger">*</span>{" "}
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
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.nombre && touched.nombre ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="nombre" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  E-mail <span className="text-danger">*</span>{" "}
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
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.email && touched.email ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="email" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  Teléfono{" "}
                                  <span className="text-danger">*</span>{" "}
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
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.telefono && touched.telefono ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
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
                                      // onChange={(e)=> console.log(e.target.value)}
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
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectConglomerado
                                              name={"conglomerado"}
                                              onChange={e =>
                                                setFieldValue(
                                                  "conglomerado",
                                                  e.target.value
                                                )
                                              }
                                              value={values.conglomerado}
                                              className={`form-control form-control-sm ${errors.conglomerado &&
                                                touched.conglomerado &&
                                                "is-invalid"}`}
                                            />

                                            {/* <select
                                              name={"conglomerado"}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.conglomerado}
                                              className={`form-control form-control-sm ${errors.conglomerado &&
                                                touched.conglomerado &&
                                                "is-invalid"}`}
                                            >
                                              {mapOptionConglomerate}
                                            </select> */}
                                            {/* <div style={{ color: "#D54B4B" }}>
                                              {errors.conglomerado &&
                                              touched.conglomerado ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="conglomerado" />
                                            </div> */}
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              Empresa{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectCompany
                                              conglomerate={
                                                props.values.conglomerado
                                              }
                                              name="empresa"
                                              value={values.empresa}
                                              onChange={e =>
                                                setFieldValue(
                                                  "empresa",
                                                  e.target.value
                                                )
                                              }
                                              className={`form-control form-control-sm ${errors.empresa &&
                                                touched.empresa &&
                                                "is-invalid"}`}
                                            ></SelectCompany>
                                            {/* <select
                                              name={"empresa"}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.empresa}
                                              className={`form-control form-control-sm ${errors.empresa &&
                                                touched.empresa &&
                                                "is-invalid"}`}
                                            >
                                              <option>Seleccioen</option>
                                            </select> */}
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.empresa &&
                                              touched.empresa ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="empresa" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              Sede{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectHeadquarter
                                              company={props.values.empresa}
                                              name={"sede"}
                                              onChange={e =>
                                                setFieldValue(
                                                  "sede",
                                                  e.target.value
                                                )
                                              }
                                              className={`form-control form-control-sm ${errors.sede &&
                                                touched.sede &&
                                                "is-invalid"}`}
                                            ></SelectHeadquarter>
                                            {/* <select
                                              name={"sede"}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.sede}
                                              className={`form-control form-control-sm ${errors.sede &&
                                                touched.sede &&
                                                "is-invalid"}`}
                                            >
                                              <option>Seleccione</option>
                                            </select> */}
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.sede && touched.sede ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name={"sede"} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              Dependencia{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectDependence
                                              headquarter={props.values.sede}
                                              name={"dependence"}
                                              value={values.dependence}
                                              onChange={e =>
                                                setFieldValue(
                                                  "dependence",
                                                  e.target.value
                                                )
                                              }
                                              className={`form-control form-control-sm ${errors.dependence &&
                                                touched.dependence &&
                                                "is-invalid"}`}
                                            ></SelectDependence>
                                            {/* <select
                                              name={"dependencia"}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.dependencia}
                                              className={`form-control form-control-sm ${errors.dependencia &&
                                                touched.dependencia &&
                                                "is-invalid"}`}
                                            >
                                              <option>Seleccione</option>
                                            </select> */}
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.dependencia &&
                                              touched.dependencia ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="dependencia" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              Cargo{" "}
                                              <span className="text-danger">
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
                                              <option>Seleccione</option>
                                            </select>
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.cargo && touched.cargo ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
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
                                              <span className="text-danger">
                                                *
                                              </span>
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
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.username &&
                                              touched.username ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="username" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              Roles{" "}
                                              <span className="text-danger">
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
                                                <div
                                                  style={{ color: "#D54B4B" }}
                                                >
                                                  {errors.roles &&
                                                  touched.roles ? (
                                                    <i className="fa fa-exclamation-triangle" />
                                                  ) : null}
                                                  <ErrorMessage
                                                    name={"roles"}
                                                  />
                                                </div>
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              Estado{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <div className="text-justify">
                                              <Field
                                                name="estado"
                                                render={({ field, form }) => {
                                                  return (
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
                                              <ErrorMessage name="estado" />
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
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      type="button"
                      className="btn btn-outline-success btn-sm"
                    >
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
  modaledit: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired
};

export default ModalEditUser;

// -------------------------------------------------------------------------------------------------------- //

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

// ------------------------------------------------------------------------------------------------------ //
class SelectConglomerado extends React.Component {
  state = {
    dataConglomerate: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange("conglomerado", value);
  };

  handleBlur = () => {
    this.props.onBlur("conglomerado", true);
  };

  render() {
    // const selectOptionsConglomerate = this.state.dataConglomerate.map(
    //   (aux, id) => {
    //     return <option value={aux.id}>{aux.name}</option>;
    //   }
    // );
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          // onChange={e => setFieldValue("conglomerado", e)}
          value={this.props.value}
          className={this.props.className}
        >
          {this.state.dataConglomerate.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })}
        </select>
        {/* <div style={{ color: "#D54B4B" }}>
          {errors.conglomerado && touched.conglomerado ? (
            <i className="fa fa-exclamation-triangle" />
          ) : null}
          <ErrorMessage name="conglomerado" />
        </div> */}
      </div>
    );
  }
}

// ----------------------------------------------------------------------------------------------------//

class SelectCompany extends React.Component {
  state = {
    dataCompany: [],
    id: this.props.conglomerate
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerate !== state.id) {
      return {
        conglomerate: props.conglomerate
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conglomerate !== prevProps.conglomerate) {
      this.getDataCompany(this.props.conglomerate);
    }
  }

  //edf39040-6f53-4f4e-b348-ef279819051a => no borrar

  // componentDidMount() {
  //   this.getDataCompany();
  // }

  getDataCompany = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/conglomerate/${this.props.conglomerate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: data
        });
      })
      .catch(err => console.log("Error", err));
  };
  render() {
    console.log(this.props.conglomerate);
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          {this.state.dataCompany.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })}
        </select>
        {/* <select
          name={this.props.name}
          value={this.props.value}
          className="form-control form-control-sm"
          onChange={this.props.onChange}
        >
          {this.dataCompany.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })}
        </select> */}
      </div>
    );
  }
}

// ------------------------------------------------------------------------------------- //
class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.company
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company !== state.id) {
      return {
        company: props.company
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.company !== prevProps.company) {
      // metodo del fetch()
      this.getDataHeadquarter();
    }
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.company}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataHeadquarter: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  render() {
    console.log(this.props.company);
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          {this.state.dataHeadquarter.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })}
        </select>
      </div>
    );
  }
}

// -------------------------------------------------------------------------------------- //

class SelectDependence extends React.Component {
  state = {
    dataDependence: [],
    id: this.props.headquarter
  };

  static getDerivedStateFromProps(props, state) {
    if (props.headquarter !== state.id) {
      return {
        headquarter: props.headquarter
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.headquarter !== prevProps.headquarter) {
      // metodo del fetch()
      this.getDataDependence();
    }
  }

  getDataDependence = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/headquarter/${this.props.headquarter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  render() {
    console.log(this.props.headquarter);
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          className={this.props.className}
        >
          {this.state.dataDependence.map((aux, id) => {
            return <option value={aux.id}>{aux.name}</option>;
          })}
        </select>
      </div>
    );
  }
}
