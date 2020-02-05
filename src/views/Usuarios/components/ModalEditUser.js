import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CustomInput,
  Alert
} from "reactstrap";
import classnames from "classnames";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import moment from "moment";
import MySelect from "./SelectRolesModalEdit";
import SelectConglomerado from "./SelectConglomeradoModalEdit";
import SelectCompany from "./SelectCompanyModalEdit";
import SelectHeadquarter from "./SelectHeadquarterModalEdit";
import SelectDependence from "./SelectDependenceModalEdit";
import SelectCharges from "./SelectChargesModalEdit";
import { USER, USER_PUT, USER_PHOTO } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import ComponentPhoto from "./ComponentPhotoUser";

class ModalEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit,
      activeTab: "1",
      id: this.props.id,
      userLogged: "",
      dataUser: {},
      dataConglomerate: [],
      dataCompany: [],
      dataHeadquarter: [],
      dataDependence: [],
      dataCharge: [],
      alertError400: false,
      alertSuccess: false,
      alertError: false,
      t: this.props.t,
      auth: this.props.authorization
    };
    this.inputOpenFileRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
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
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${USER}${id}/?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          dataUser: data
        });
      })
      .catch(Error => console.log("Error", Error));
  };

  render() {
    const birthDate = data => {
      let birthDate;
      birthDate = new Date(data);
      return moment(birthDate).format("YYYY-MM-DD");
    };
    const dataResult = {
      usuario_identification: this.state.dataUser.identification,
      usuario_name: this.state.dataUser.name,
      usuario_email: this.state.dataUser.email,
      usuario_phone: this.state.dataUser.phone,
      usuario_address: this.state.dataUser.address,
      usuario_birthDate: birthDate(this.state.dataUser.birthDate),
      usuario_username: this.state.dataUser.username,
      usuario_conglomerate: this.state.dataUser.conglomerateId,
      usuario_company: this.state.dataUser.companyId,
      usuario_headquarter: this.state.dataUser.headquarterId,
      usuario_dependence: this.state.dataUser.dependenceId,
      usuario_charge: this.state.dataUser.chargeId,
      usuario_status: this.state.dataUser.enabled
    };
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_usuarios_modal_editar_titulo")} {this.state.dataUser.name}{" "}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              const auth = this.state.auth;
              const username = decode(auth);
              const formData = new FormData();
              formData.append(
                "user",
                new Blob(
                  [
                    JSON.stringify({
                      address: values.usuario_address,
                      birthDate: values.usuario_birthDate,
                      username: values.usuario_username,
                      chargeId: values.usuario_charge,
                      dependenceId: values.usuario_dependence,
                      email: values.usuario_email,
                      enabled: values.usuario_status,
                      id: this.state.id,
                      identification: values.usuario_identification,
                      name: values.usuario_name,
                      phone: values.usuario_phone,
                      userRoleRequests: values.roles,
                      userNameAuthenticate: username.user_name
                    })
                  ],
                  {
                    type: "application/json"
                  }
                )
              );
              setTimeout(() => {
                axios
                  .put(`${USER_PUT}`, formData, {
                    headers: {
                      Authorization: "Bearer " + auth
                    }
                  })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState(
                        {
                          alertSuccess: true
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: !this.state.modal
                        });
                      }, 500);
                    }
                  })
                  .catch(error => console.log("", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              usuario_identification: Yup.string().required(
                " Por favor introduzca una identificación."
              ),
              usuario_name: Yup.string().required(
                " Por favor introduzca un nombre."
              ),
              usuario_email: Yup.string()
                .email(" Por favor introduzca un email valido.")
                .required(" Por favor introduzca un email."),
              usuario_phone: Yup.string()
                .matches(
                  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                  " Número no valido"
                )
                .length(10, " Mínimo 10 digitos")
                .required(" Por favor introduzca un número."),
              usuario_address: Yup.string(),
              usuario_birthDate: Yup.date()
                .nullable()
                .notRequired(),
              usuario_username: Yup.string().required(
                " Por favor introduzca un username"
              ),
              usuario_conglomerate: Yup.string()
                .ensure()
                .required(" Por favor seleccione un conglomerado."),
              usuario_company: Yup.string()
                .ensure()
                .required(" Por favor seleccione una empresa."),
              usuario_headquarter: Yup.string()
                .ensure()
                .required(" Por favor seleccione una sede"),
              usuario_dependence: Yup.string()
                .ensure()
                .required(" Por favor seleccione una dependencia"),
              usuario_charge: Yup.string()
                .ensure()
                .required(" Por favor selccione un cargo"),
              usuario_status: Yup.bool().test(
                "Activado",
                "",
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
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert color="danger" isOpen={this.state.alertError}>
                      {t("app_usuarios_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {t("app_usuarios_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      {t("app_usuarios_modal_actualizar_alert_error_400")}
                    </Alert>
                    <form className="form">
                      <div className="row">
                        <Col sm="3">
                          <ComponentPhoto
                            authorization={this.state.auth}
                            id={this.state.id}
                          />
                          {/* <img
                            src={`${USER_PHOTO}${this.state.id}`}
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
                            <i className="fa fa-camera" />{" "}
                            {t("app_usuarios_modal_editar_boton_cargar_imagen")}{" "}
                          </button> */}
                        </Col>
                        <Col sm="9">
                          <div className="">
                            {" "}
                            <h5
                              className=""
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              {t("app_usuarios_modal_editar_titulo_2")}{" "}
                            </h5>{" "}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t(
                                    "app_usuarios_modal_editar_identificacion"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    <input
                                      name={"usuario_identification"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.usuario_identification}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.usuario_identification &&
                                        touched.usuario_identification &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.usuario_identification &&
                                      touched.usuario_identification ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="usuario_identification" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_usuarios_modal_editar_nombre")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"usuario_name"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.usuario_name}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.usuario_name &&
                                        touched.usuario_name &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.usuario_name &&
                                      touched.usuario_name ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="usuario_name" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_usuarios_modal_editar_email")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    <input
                                      name={"usuario_email"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.usuario_email}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.usuario_email &&
                                        touched.usuario_email &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.usuario_email &&
                                      touched.usuario_email ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="usuario_email" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_usuarios_modal_editar_telefono")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"usuario_phone"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.usuario_phone}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.usuario_phone &&
                                        touched.usuario_phone &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.usuario_phone &&
                                      touched.usuario_phone ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="usuario_phone" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_usuarios_modal_editar_direccion")}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"usuario_address"}
                                      type="text"
                                      className="form-control form-control-sm"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.usuario_address}
                                    />
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t(
                                    "app_usuarios_modal_editar_fecha_nacimiento"
                                  )}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"usuario_birthDate"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.usuario_birthDate}
                                      type="date"
                                      className="form-control form-control-sm"
                                    />
                                  </dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </div>
                      <br />
                      <div className="row">
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
                                {t("app_usuarios_modal_editar_tab")}
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
                                {t("app_usuarios_modal_editar_tab_2")}
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
                                              {t(
                                                "app_usuarios_modal_editar_conglomerado"
                                              )}{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectConglomerado
                                              authorization={this.state.auth}
                                              t={this.state.t}
                                              name={"usuario_conglomerate"}
                                              onChange={e =>
                                                setFieldValue(
                                                  "usuario_conglomerate",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={() =>
                                                setFieldTouched(
                                                  "usuario_conglomerate",
                                                  true
                                                )
                                              }
                                              value={
                                                values.usuario_conglomerate
                                              }
                                              className={`form-control form-control-sm ${errors.usuario_conglomerate &&
                                                touched.usuario_conglomerate &&
                                                "is-invalid"}`}
                                            />
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.usuario_conglomerate &&
                                              touched.usuario_conglomerate ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="usuario_conglomerate" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              {t(
                                                "app_usuarios_modal_editar_empresa"
                                              )}{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectCompany
                                              authorization={this.state.auth}
                                              t={this.state.t}
                                              usuario_conglomerate={
                                                props.values
                                                  .usuario_conglomerate
                                              }
                                              name="usuario_company"
                                              value={values.usuario_company}
                                              onChange={e =>
                                                setFieldValue(
                                                  "usuario_company",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={() =>
                                                setFieldTouched(
                                                  "usuario_company",
                                                  true
                                                )
                                              }
                                              className={`form-control form-control-sm ${errors.usuario_company &&
                                                touched.usuario_company &&
                                                "is-invalid"}`}
                                            ></SelectCompany>
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.usuario_company &&
                                              touched.usuario_company ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="usuario_company" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              {t(
                                                "app_usuarios_modal_editar_sede"
                                              )}{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectHeadquarter
                                              authorization={this.state.auth}
                                              t={this.state.t}
                                              usuario_company={
                                                props.values.usuario_company
                                              }
                                              name={"usuario_headquarter"}
                                              onChange={e =>
                                                setFieldValue(
                                                  "usuario_headquarter",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={() =>
                                                setFieldTouched(
                                                  "usuario_headquarter",
                                                  true
                                                )
                                              }
                                              value={values.usuario_headquarter}
                                              className={`form-control form-control-sm ${errors.usuario_headquarter &&
                                                touched.usuario_headquarter &&
                                                "is-invalid"}`}
                                            ></SelectHeadquarter>
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.usuario_headquarter &&
                                              touched.usuario_headquarter ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage
                                                name={"usuario_headquarter"}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              {t(
                                                "app_usuarios_modal_editar_dependencia"
                                              )}{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectDependence
                                              authorization={this.state.auth}
                                              t={this.state.t}
                                              usuario_headquarter={
                                                props.values.usuario_headquarter
                                              }
                                              name={"usuario_dependence"}
                                              value={values.usuario_dependence}
                                              onChange={e =>
                                                setFieldValue(
                                                  "usuario_dependence",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={() =>
                                                setFieldTouched(
                                                  "usuario_dependence",
                                                  true
                                                )
                                              }
                                              className={`form-control form-control-sm ${errors.usuario_dependence &&
                                                touched.usuario_dependence &&
                                                "is-invalid"}`}
                                            ></SelectDependence>
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.usuario_dependence &&
                                              touched.usuario_dependence ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="usuario_dependence" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <label>
                                              {" "}
                                              {t(
                                                "app_usuarios_modal_editar_cargo"
                                              )}{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
                                            </label>
                                            <SelectCharges
                                              authorization={this.state.auth}
                                              t={this.state.t}
                                              name={"usuario_charge"}
                                              onChange={e =>
                                                setFieldValue(
                                                  "usuario_charge",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={() => {
                                                setFieldTouched(
                                                  "usuario_charge",
                                                  true
                                                );
                                              }}
                                              value={values.usuario_charge}
                                              className={`form-control form-control-sm ${errors.usuario_charge &&
                                                touched.usuario_charge &&
                                                "is-invalid"}`}
                                            />
                                            <div style={{ color: "#D54B4B" }}>
                                              {errors.usuario_charge &&
                                              touched.usuario_charge ? (
                                                <i className="fa fa-exclamation-triangle" />
                                              ) : null}
                                              <ErrorMessage name="usuario_charge" />
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
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>
                                            {t(
                                              "app_usuarios_modal_editar_username"
                                            )}{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <input
                                            disabled
                                            name={"usuario_username"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.usuario_username}
                                            className={`form-control form-control-sm ${errors.usuario_username &&
                                              touched.usuario_username &&
                                              "is-invalid"}`}
                                            type="text"
                                          />
                                          <div style={{ color: "#D54B4B" }}>
                                            {errors.usuario_username &&
                                            touched.usuario_username ? (
                                              <i className="fa fa-exclamation-triangle" />
                                            ) : null}
                                            <ErrorMessage name="usuario_username" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>
                                            {" "}
                                            {t(
                                              "app_usuarios_modal_editar_roles"
                                            )}{" "}
                                            <span className="text-danger">
                                              *
                                            </span>{" "}
                                          </label>
                                          <MySelect
                                            authorization={this.state.auth}
                                            t={this.state.t}
                                            name={"roles"}
                                            value={values.roles}
                                            onChange={setFieldValue}
                                            onBlur={() =>
                                              setFieldTouched("roles", true)
                                            }
                                            error={errors.roles}
                                            touched={touched.roles}
                                          />
                                          {touched ? (
                                            <div style={{ color: "red" }}>
                                              {" "}
                                              <div style={{ color: "#D54B4B" }}>
                                                {errors.roles &&
                                                touched.roles ? (
                                                  <i className="fa fa-exclamation-triangle" />
                                                ) : null}
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
                                            {t(
                                              "app_usuarios_modal_editar_estado"
                                            )}{" "}
                                            <span className="text-danger">
                                              *
                                            </span>{" "}
                                          </label>
                                          <div className="text-justify">
                                            <Field
                                              name="usuario_status"
                                              render={({ field, form }) => {
                                                return (
                                                  <CustomInput
                                                    type="checkbox"
                                                    id="CheckBoxEditRoles"
                                                    label={t(
                                                      "app_usuarios_modal_editar_estado_descripcion"
                                                    )}
                                                    {...field}
                                                    checked={field.value}
                                                    className={
                                                      errors.usuario_status &&
                                                      touched.usuario_status &&
                                                      "invalid-feedback"
                                                    }
                                                  />
                                                );
                                              }}
                                            />
                                            <ErrorMessage name="usuario_status" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
                        </Col>
                      </div>
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
                      <i className="fa fa-pencil" />{" "}
                      {t("app_usuarios_modal_editar_boton_actualizar")}{" "}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t("app_usuarios_modal_editar_boton_cerrar")}{" "}
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
  id: PropTypes.any.isRequired,
  updateTable: PropTypes.func.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalEditUser;
