import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CustomInput,
  Alert,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import IMGPROFILE from "./../../../assets/img/profile.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { THIRDPARTYS, THIRDPARTY } from "../../../services/EndPoints";
import SelectCountry from "./SelectCountryModalEdit";
import FieldDepartment from "./SelectDepartmentModalEdit";
import FieldCity from "./SelectCityModalEdit";
import { decode } from "jsonwebtoken";
import SelectTipoTercero from "./SelectTipoTerceroModalEdit";

class ModalUpdateRemitente extends React.Component {
  state = {
    modal: this.props.modalupdate,
    id: this.props.id,
    dataResult: {},
    alertSuccess: false,
    alertError500: false,
    alertError400: false,
    activeTab: "1",
    optionsTipoTercero: [],
    optionsCountries: [],
    optionsDepartments: [],
    optionsCities: [],
    t: this.props.t,
    tercero_estado: 0,
    username: "",
    auth: this.props.authorization,
    spinner: true,
    spinnerActualizar: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      spinner: true,
    });
    this.getTerceroByID(id);
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 1500);
  };
  getTerceroByID = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${THIRDPARTY}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dataResult: {
            tercero_tipoTercero: data.typeThirdParty.id,
            tercero_elementoComunicacion: data.communicationElement,
            tercero_identificacion: data.identification,
            tercero_nombre: data.name,
            tercero_email: data.email,
            tercero_telFijo: data.landline,
            tercero_telCel: data.cellPhone,
            tercero_direccion: data.address,
            tercero_referencia: data.reference,
            tercero_observacion: data.observation,
            tercero_estado: data.status,
            tercero_pais:
              data.city.department.country.status !== 1
                ? ""
                : data.city.department.country.id,
            tercero_departamento:
              data.city.department.status !== 1 ? "" : data.city.department.id,
            tercero_ciudad: data.city.status !== 1 ? "" : data.city.id,
          },
        });
      })
      .catch((error) => console.log(error));
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  render() {
    const dataResult = this.state.dataResult;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_tercero_modal_actualizar_titulo")}{" "}
            {this.state.dataResult.tercero_nombre}{" "}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerActualizar: true,
              });
              const tipoEstado = (data) => {
                let tipo;
                if (data === true || data === 1) {
                  return (tipo = 1);
                } else if (data === false || data === 0) {
                  return (tipo = 0);
                }
                return 0;
              };
              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(THIRDPARTYS, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth,
                  },
                  body: JSON.stringify({
                    address: values.tercero_direccion,
                    cellPhone: values.tercero_telCel,
                    communicationElement: values.tercero_elementoComunicacion,
                    cityId: values.tercero_ciudad,
                    email: values.tercero_email,
                    id: this.state.id,
                    identification: values.tercero_identificacion,
                    landline: values.tercero_telFijo,
                    name: values.tercero_nombre,
                    observation: values.tercero_observacion,
                    reference: values.tercero_referencia,
                    status: tipoEstado(values.tercero_estado),
                    typeThirdPartyId: values.tercero_tipoTercero,
                    userName: username.user_name,
                  }),
                })
                  .then((response) => {
                    if (response.status === 200) {
                      this.setState(
                        {
                          alertSuccess: true,
                          spinnerActualizar: false,
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true,
                        spinnerActualizar: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false,
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError500: true,
                        spinnerActualizar: false,
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: !this.state.modal,
                        });
                      }, 3000);
                    }
                  })
                  .catch((error) => {
                    console.log("", error);
                    this.setState({
                      spinnerActualizar: false,
                    });
                  });
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              tercero_tipoTercero: Yup.string()
                .ensure()
                .required(" Por favor seleccione el tipo de tercero."),
              tercero_elementoComunicacion: Yup.string()
                .ensure()
                .required(" Por favor seleccione un elemento de comunicación."),
              tercero_pais: Yup.string()
                .ensure()
                .required(" Por favor seleccione un país."),
              tercero_departamento: Yup.string()
                .ensure()
                .required(" Por favor seleccione un departamento."),
              tercero_ciudad: Yup.string()
                .ensure()
                .required(" Por favor seleccione una ciudad."),
              tercero_identificacion: Yup.string()
                .matches(
                  /^[0-9]+$/,
                  "  El número de identificación no acepta puntos, letras, ni caracteres especiales."
                )
                .required(" Por favor introduzca una identificación."),
              tercero_nombre: Yup.string()
                .max(45, "Máximo 45 caracteres.")
                .required(" Por favor introduzca un nombre."),
              tercero_email: Yup.string()
                .email(" Por favor introduzca un email valido.")
                .required(" Por favor introduzca un email."),
              tercero_telFijo: Yup.string()
                .matches(
                  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                  " Número no valido."
                )
                .required(" Por favor introduzca un teléfono fijo."),
              tercero_telCel: Yup.string()
                .matches(
                  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                  " Número no valido."
                )
                .required(" Por favor introduzca un teléfono celular."),
              tercero_direccion: Yup.string()
                .max(45, "Máximo 45 caracteres")
                .required("Por favor introduzca una dirección."),
              tercero_referencia: Yup.string()
                .nullable()
                .max(50, "Máximo 50 caracteres."),
              tercero_observacion: Yup.string()
                .nullable()
                .max(250, "Máximo 250 caracteres."),
              tercero_estado: Yup.bool().test(
                "Activado",
                "",
                (value) => value === true
              ),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t("app_tercero_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_tercero_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_tercero_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGPROFILE} className="img-thumbnail" />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t("app_tercero_modal_actualizar_titulo_2")}{" "}
                          </h5>{" "}
                        </div>
                        {this.state.spinner !== false ? (
                          <center>
                            <br />
                            <Spinner
                              style={{ width: "3rem", height: "3rem" }}
                              type="grow"
                              color="primary"
                            />
                          </center>
                        ) : (
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tercero_modal_actualizar_tipoTercero"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>

                                <SelectTipoTercero
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name={"tercero_tipoTercero"}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "tercero_tipoTercero",
                                      e.target.value
                                    )
                                  }
                                  onBlur={() => {
                                    setFieldTouched(
                                      "tercero_tipoTercero",
                                      true
                                    );
                                  }}
                                  value={values.tercero_tipoTercero}
                                  className={`form-control form-control-sm ${
                                    errors.tercero_tipoTercero &&
                                    touched.tercero_tipoTercero &&
                                    "is-invalid"
                                  }`}
                                />

                                <div style={{ color: "#D54B4B" }}>
                                  {errors.tercero_tipoTercero &&
                                  touched.tercero_tipoTercero ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="tercero_tipoTercero" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tercero_modal_actualizar_ElementoComunicacion"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <select
                                  name={"tercero_elementoComunicacion"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.tercero_elementoComunicacion}
                                  className={`form-control form-control-sm ${
                                    errors.tercero_elementoComunicacion &&
                                    touched.tercero_elementoComunicacion &&
                                    "is-invalid"
                                  }`}
                                >
                                  <option disabled value={""}>
                                    --{" "}
                                    {t(
                                      "app_tercero_modal_actualizar_select_ElementoComunicacion"
                                    )}{" "}
                                    --
                                  </option>
                                  <option value={1}>
                                    {t(
                                      "app_tercero_form_registrar_option_remitente"
                                    )}
                                  </option>
                                  <option value={2}>
                                    {t(
                                      "app_tercero_form_registrar_option_destinatario"
                                    )}{" "}
                                  </option>
                                  <option value={3}>
                                    {t(
                                      "app_tercero_form_registrar_option_mixto"
                                    )}{" "}
                                  </option>
                                </select>
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.tercero_elementoComunicacion &&
                                  touched.tercero_elementoComunicacion ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="tercero_elementoComunicacion" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group ">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tercero_modal_actualizar_identificacion"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"tercero_identificacion"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.tercero_identificacion}
                                  className={`form-control form-control-sm ${
                                    errors.tercero_identificacion &&
                                    touched.tercero_identificacion &&
                                    "is-invalid"
                                  }`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.tercero_identificacion &&
                                  touched.tercero_identificacion ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="tercero_identificacion" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tercero_modal_actualizar_nombre"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"tercero_nombre"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.tercero_nombre}
                                  className={`form-control form-control-sm ${
                                    errors.tercero_nombre &&
                                    touched.tercero_nombre &&
                                    "is-invalid"
                                  }`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.tercero_nombre &&
                                  touched.tercero_nombre ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="tercero_nombre" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t("app_tercero_modal_actualizar_email")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"tercero_email"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.tercero_email}
                                  className={`form-control form-control-sm ${
                                    errors.tercero_email &&
                                    touched.tercero_email &&
                                    "is-invalid"
                                  }`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.tercero_email &&
                                  touched.tercero_email ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="tercero_email" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Col>
                      <Col sm="12">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === "1",
                              })}
                              onClick={() => {
                                this.toggleTab("1");
                              }}
                            >
                              {t("app_tercero_modal_actualizar_collapse")}
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            {this.state.spinner !== false ? (
                              <center>
                                <br />
                                <Spinner
                                  style={{ width: "3rem", height: "3rem" }}
                                  type="grow"
                                  color="primary"
                                />
                              </center>
                            ) : (
                              <Row>
                                <Col sm="6">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_telFijo"
                                      )}{" "}
                                    </label>
                                    <input
                                      type="text"
                                      name={"tercero_telFijo"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.tercero_telFijo}
                                      className={`form-control form-control-sm ${
                                        errors.tercero_telFijo &&
                                        touched.tercero_telFijo &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_telFijo &&
                                      touched.tercero_telFijo ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_telFijo" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="6">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_telCelular"
                                      )}{" "}
                                      <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                      type="text"
                                      name={"tercero_telCel"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.tercero_telCel}
                                      className={`form-control form-control-sm ${
                                        errors.tercero_telCel &&
                                        touched.tercero_telCel &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_telCel &&
                                      touched.tercero_telCel ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_telCel" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="12">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_direccion"
                                      )}{" "}
                                      <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                      type="text"
                                      name={"tercero_direccion"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.tercero_direccion}
                                      className={`form-control form-control-sm ${
                                        errors.tercero_direccion &&
                                        touched.tercero_direccion &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_direccion &&
                                      touched.tercero_direccion ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_direccion" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="4">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_pais"
                                      )}{" "}
                                      <span className="text-danger">*</span>{" "}
                                    </label>
                                    <SelectCountry
                                      authorization={this.state.auth}
                                      t={this.state.t}
                                      name={"tercero_pais"}
                                      onChange={(e) =>
                                        setFieldValue(
                                          "tercero_pais",
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched("tercero_pais", true)
                                      }
                                      value={values.tercero_pais}
                                      className={`form-control form-control-sm ${
                                        errors.tercero_pais &&
                                        touched.tercero_pais &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_pais &&
                                      touched.tercero_pais ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_pais" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="4">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_departamento"
                                      )}{" "}
                                      <span className="text-danger">*</span>{" "}
                                    </label>
                                    <Field
                                      authorization={this.state.auth}
                                      t={this.state.t}
                                      name="tercero_departamento"
                                      component={FieldDepartment}
                                      countryId={props.values.tercero_pais}
                                      departmentId={
                                        props.values.tercero_departamento
                                      }
                                    ></Field>
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_departamento &&
                                      touched.tercero_departamento ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_departamento" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="4">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_ciudad"
                                      )}{" "}
                                      <span className="text-danger">*</span>{" "}
                                    </label>
                                    <Field
                                      authorization={this.state.auth}
                                      t={this.state.t}
                                      name="tercero_ciudad"
                                      component={FieldCity}
                                      departmentId={
                                        props.values.tercero_departamento
                                      }
                                      cityId={props.values.tercero_ciudad}
                                      countryId={props.values.tercero_pais}
                                    ></Field>
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_ciudad &&
                                      touched.tercero_ciudad ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_ciudad" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="6">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_referencia"
                                      )}{" "}
                                    </label>
                                    <textarea
                                      type="text"
                                      name={"tercero_referencia"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.tercero_referencia}
                                      className={`form-control form-control-sm ${
                                        errors.tercero_referencia &&
                                        touched.tercero_referencia &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_referencia &&
                                      touched.tercero_referencia ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_referencia" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="6">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_observacion"
                                      )}{" "}
                                    </label>
                                    <textarea
                                      type="text"
                                      name={"tercero_observacion"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.tercero_observacion}
                                      className={`form-control form-control-sm ${
                                        errors.tercero_observacion &&
                                        touched.tercero_observacion &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.tercero_observacion &&
                                      touched.tercero_observacion ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="tercero_observacion" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="12">
                                  <div className="form-group">
                                    <label>
                                      {" "}
                                      {t(
                                        "app_tercero_modal_actualizar_estado"
                                      )}{" "}
                                      <span className="text-danger">*</span>{" "}
                                    </label>
                                    <div className="text-justify">
                                      <Field
                                        name="tercero_estado"
                                        render={({ field, form }) => {
                                          return (
                                            <CustomInput
                                              type="checkbox"
                                              id="CheckboxEditTerceros"
                                              label={t(
                                                "app_tercero_modal_actualizar_estado_descripcion"
                                              )}
                                              {...field}
                                              checked={field.value}
                                              className={
                                                errors.tercero_estado &&
                                                touched.tercero_estado &&
                                                "invalid-feedback"
                                              }
                                            />
                                          );
                                        }}
                                      />
                                      <ErrorMessage name="tercero_estado" />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            )}
                          </TabPane>
                        </TabContent>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="btn btn-success btn-sm"
                      disabled={this.state.spinnerActualizar}
                    >
                      {this.state.spinnerActualizar ? (
                        <i className=" fa fa-spinner fa-refresh" />
                      ) : (
                        <div>
                          {" "}
                          <i className="fa fa-pencil" />{" "}
                          {t("app_tercero_modal_actualizar_boton_actualizar")}{" "}
                        </div>
                      )}
                    </button>
                    <Button
                      className="btn btn-secodary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError400: false,
                          alertError500: false,
                          alertSuccess: false,
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_tercero_modal_actualizar_boton_cerrar")}{" "}
                    </Button>
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

ModalUpdateRemitente.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
};

export default ModalUpdateRemitente;
