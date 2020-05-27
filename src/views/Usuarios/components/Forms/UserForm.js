import React, { Fragment, useState } from "react";
import { withFormik, ErrorMessage, Field } from "formik";
import { USERS } from "./../../../../services/EndPoints";
import * as Yup from "yup";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CustomInput,
  CardFooter,
} from "reactstrap";
import CustonImageInput from "./CustonImageInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import MySelect from "./components/SelectRoles";
import SelectConglomerado from "./components/SelectConglomerado";
import FieldCompany from "./components/SelectCompany";
import FieldHeadquarter from "./components/SelectHeadquarter";
import FieldDependence from "./components/SelectDependence";
import SelectCharge from "./components/SelectCharge";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";

const UserForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    t,
  } = props;
  const [oldValueConglomerate, setOldValueConglomerate] = useState();
  const [newValueConglomerate, setNewValueConglomerate] = useState();

  const changeInValueConglomerate = (Old, New) => {
    setOldValueConglomerate(Old);
    setNewValueConglomerate(New);
  };

  return (
    <Fragment>
      <Card>
        <ToastContainer />
        <CardHeader> {t("app_usuarios_tab_title")}</CardHeader>
        <CardBody>
          <form encType={"multipart/form-data"}>
            <Row>
              <Col sm="3">
                <div className="text-center">
                  <br />
                  <br />
                  <Field
                    name={"foto"}
                    component={CustonImageInput}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </Col>

              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    {t("app_usuarios_form_registrar_titulo_1")}{" "}
                  </h5>{" "}
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_usuarios_form_registrar_identificacion")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"identificacion"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.identificacion}
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.identificacion &&
                          touched.identificacion &&
                          "is-invalid"
                        }`}
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
                        {t("app_usuarios_form_registrar_nombre")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"nombre"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nombre}
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.nombre && touched.nombre && "is-invalid"
                        }`}
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
                        {t("app_usuarios_form_registrar_email")}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name={"email"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.email && touched.email && "is-invalid"
                        }`}
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
                        {t("app_usuarios_form_registrar_telefono")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"telefono"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.telefono}
                        type="text"
                        className={`form-control form-control-sm ${
                          errors.telefono && touched.telefono && "is-invalid"
                        }`}
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
                      <label>
                        {" "}
                        {t("app_usuarios_form_registrar_direccion")}{" "}
                      </label>
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
                      <label>
                        {t("app_usuarios_form_registrar_fecha_nacimiento")}{" "}
                      </label>
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
                  {t("app_usuarios_form_registrar_titulo_2")}{" "}
                </h5>{" "}
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_usuarios_form_registrar_conglomerado")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <SelectConglomerado
                        authorization={props.authorization}
                        t={props.t}
                        name={"conglomeradoID"}
                        onChange={(e) => {
                          setFieldValue("conglomeradoID", e.target.value);
                          changeInValueConglomerate(
                            values.conglomeradoID,
                            e.target.value
                          );
                        }}
                        value={values.conglomeradoID}
                        className={`form-control form-control-sm ${
                          errors.conglomeradoID &&
                          touched.conglomeradoID &&
                          "is-invalid"
                        }`}
                      ></SelectConglomerado>
                      {touched ? (
                        <div style={{ color: "red" }}>
                          {" "}
                          <div style={{ color: "#D54B4B" }}>
                            {errors.conglomeradoID && touched.conglomeradoID ? (
                              <i className="fa fa-exclamation-triangle" />
                            ) : null}
                            <ErrorMessage name={"conglomeradoID"} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_usuarios_form_registrar_empresa")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <Field
                        authorization={props.authorization}
                        t={props.t}
                        name="empresaID"
                        component={FieldCompany}
                        oldValueConglomerateId={oldValueConglomerate}
                        newValueConglomerateId={newValueConglomerate}
                        conglomeradoID={values.conglomeradoID}
                      ></Field>
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
                        {t("app_usuarios_form_registrar_sede")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <Field
                        authorization={props.authorization}
                        t={props.t}
                        name="sedeID"
                        component={FieldHeadquarter}
                        companyId={values.empresaID}
                        conglomerateId={values.conglomeradoID}
                      ></Field>
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
                        {t("app_usuarios_form_registrar_dependencia")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <Field
                        authorization={props.authorization}
                        t={props.t}
                        name="dependenciaID"
                        component={FieldDependence}
                        sedeId={values.sedeID}
                        companyId={values.empresaID}
                        conglomerateId={values.conglomeradoID}
                      ></Field>
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
                        {t("app_usuarios_form_registrar_cargo")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <SelectCharge
                        authorization={props.authorization}
                        t={props.t}
                        name={"cargoID"}
                        onChange={(e) =>
                          setFieldValue("cargoID", e.target.value)
                        }
                        onBlur={() => {
                          setFieldTouched("cargoID", true);
                        }}
                        value={values.cargoID}
                        className={`form-control form-control-sm ${
                          errors.cargoID && touched.cargoID && "is-invalid"
                        }`}
                      />
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
                  {t("app_usuarios_form_registrar_titulo_3")}{" "}
                </h5>{" "}
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        {t("app_usuarios_form_registrar_username")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"username"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className={`form-control form-control-sm ${
                          errors.username && touched.username && "is-invalid"
                        }`}
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
                        {t("app_usuarios_form_registrar_contraseña")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`form-control form-control-sm ${
                          errors.password && touched.password && "is-invalid"
                        }`}
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
                        {t(
                          "app_usuarios_form_registrar_confirmar_contraseña"
                        )}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"confirm_password"}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm_password}
                        className={`form-control form-control-sm ${
                          errors.confirm_password &&
                          touched.confirm_password &&
                          "is-invalid"
                        }`}
                      />
                      <div style={{ color: "#D54B4B" }}>
                        {errors.confirm_password && touched.confirm_password ? (
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
                        {t("app_usuarios_form_registrar_roles")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <MySelect
                        authorization={props.authorization}
                        t={props.t}
                        name={"rolesID"}
                        value={values.rolesID}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.rolesID}
                        touched={touched.rolesID}
                      />{" "}
                      {touched ? (
                        <div style={{ color: "red" }}>
                          {" "}
                          <div style={{ color: "#D54B4B" }}>
                            {errors.rolesID && touched.rolesID ? (
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
                        {t("app_usuarios_form_registrar_estado")}{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          type="checkbox"
                          id="ExampleCheckBoxInput"
                          label={t(
                            "app_usuarios_form_registrar_estado_descripcion"
                          )}
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
                      </div>
                    </div>
                  </div>
                </div>
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
                  <i className="fa fa-save" />{" "}
                  {t("app_usuarios_form_registrar_boton_guardar")}
                </div>
              )}
            </button>
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
};
UserForm.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired,
};

export default withTranslation("translations")(
  withFormik({
    mapPropsToValues: (props) => ({
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
      estado: props.user.estado,
      foto: props.user.foto,
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
      f_d_nacimiento: Yup.date().nullable().notRequired(),
      conglomeradoID: Yup.string()
        .ensure()
        .required(" Por favor seleccione un conglomerado."),
      empresaID: Yup.string()
        .ensure()
        .required(" Por favor seleccione una empresa."),
      sedeID: Yup.string().ensure().required(" Por favor seleccione una sede"),
      dependenciaID: Yup.string()
        .ensure()
        .required(" Por favor seleccione una dependencia"),
      cargoID: Yup.string().ensure().required(" Por favor selccione un cargo"),
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
        .min(8, " Mínimo 8 caracteres.")
        .max(15, " Máximo 15 caracteres."),
      rolesID: Yup.array().of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
      estado: Yup.bool().test(
        "Activo",
        "Se requiere la activacion del usuario",
        (value) => value === true
      ),
      foto: Yup.mixed(),
    }),
    handleSubmit: (values, { setSubmitting, resetForm, props }) => {
      const { t } = props;
      const formData = new FormData();
      const auth = props.authorization;
      const username = decode(auth);
      formData.append("photo", values.foto);
      formData.append(
        "user",
        new Blob(
          [
            JSON.stringify({
              identification: values.identificacion,
              name: values.nombre,
              email: values.email,
              phone: values.telefono,
              address: values.direccion,
              birthDate: values.f_d_nacimiento,
              username: values.username,
              password: values.password,
              dependenceId: values.dependenciaID,
              chargeId: values.cargoID,
              userRoleRequests: values.rolesID,
              enabled: values.estado,
              userNameAuthenticate: username.user_name,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      setTimeout(() => {
        axios
          .post(`${USERS}`, formData, {
            headers: {
              Authorization: "Bearer " + props.authorization,
            },
          })
          .then((response) => {
            if (response.status === 201) {
              toast.success(t("app_usuaios_alert_toast_201"), {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px",
                }),
              });
            } else if (response.status === 400) {
              toast.error(t("app_usuarios_alert_toast_400"), {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px",
                }),
              });
            } else if (response.status === 500) {
              toast.error(t("app_usuarios_alert_toast_500"), {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px",
                }),
              });
            }
          })
          .catch((error) => {
            toast.error(`${error}.`, {
              position: toast.POSITION.TOP_RIGHT,
              className: css({
                marginTop: "60px",
              }),
            });
          });
        console.log(formData);
      }, 1000);
      setSubmitting(false);
      resetForm({
        identificacion: "",
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        f_d_nacimiento: "",
        conglomeradoID: "",
        empresaID: "",
        sedeID: "",
        dependenciaID: "",
        cargoID: "",
        username: "",
        password: "",
        confirm_password: "",
        rolesID: "",
        estado: "",
        foto: "",
      });
    },
  })(UserForm)
);
