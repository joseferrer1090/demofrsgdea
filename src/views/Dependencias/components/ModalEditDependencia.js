import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Alert
} from "reactstrap";
import IMGDEPENDENCIA from "./../../../assets/img/settings-work-tool.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import SelectConglomerado from "./SelectConglomeradoModalEdit";
import FieldCompany from "./SelectCompanyModalEdit";
import FieldHeadquarter from "./SelectHeadquarterModalEdit";
import SelectCharges from "./SelectChargesModalEdit";
import { DEPENDENCE, DEPENDENCIES } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalEditDependencia extends React.Component {
  state = {
    modal: this.props.modaledit,
    id: this.props.id,
    dataDependence: {},
    dataCharge: {},
    dataDependenceConglomerate: {},
    dataDependenceCompany: {},
    dataDependenceSede: {},
    dataResult: {},
    dataConglomerate: [0],
    dataCompany: [0],
    dataChargeList: [0],
    dataHeadquarterList: [0],
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    status: 0,
    auth: this.props.authorization
  };
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

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataDependence(id);
  };

  getDataDependence = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${DEPENDENCE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependence: data,
          dataCharge: data.charge,
          dataDependenceConglomerate: data.headquarter.company.conglomerate,
          dataDependenceCompany: data.headquarter.company,
          dataDependenceSede: data.headquarter
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  render() {
    const { t } = this.props;
    const result = {
      conglomerate: this.state.dataDependenceConglomerate.id,
      company: this.state.dataDependenceCompany.id,
      headquarter: this.state.dataDependenceSede.id,
      charge: this.state.dataCharge.id,
      name: this.state.dataDependence.name,
      code: this.state.dataDependence.code,
      description: this.state.dataDependence.description,
      status: this.state.dataDependence.status
    };
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_dependencia_modal_actualizar_titulo")}{" "}
            {this.state.dataDependence.name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={result}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
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
                fetch(`${DEPENDENCIES}`, {
                  method: "PUT",
                  headers: {
                    Authorization: "Bearer " + this.state.auth,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    code: values.code,
                    name: values.name,
                    description: values.description,
                    headquarterId: values.headquarter,
                    chargeId: values.charge,
                    status: tipoEstado(values.status),
                    userName: username.user_name
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState(
                          {
                            alertSuccess: false,
                            modal: false
                          },
                          () => this.props.updateTable()
                        );
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
                        alertError500: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError500: false,
                          modal: !this.state.modal
                        });
                      }, 3000);
                    }
                  })
                  .catch(Error => console.log("Error", Error));
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              conglomerate: Yup.string()
                .ensure()
                .required(" Por favor seleccione un conglomerado."),
              company: Yup.string()
                .ensure()
                .required(" Por favor seleccione una empresa."),
              headquarter: Yup.string()
                .ensure()
                .required(" Por favor seleccione una sede."),
              code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              name: Yup.string().required(" Por favor introduzca un código."),
              description: Yup.string()
                .max(250, "Máximo 250 caracteres.")
                .nullable(),
              charge: Yup.string()
                .ensure()
                .required(" Por favor seleccione el cargo."),
              status: Yup.bool().test("Activado", "", value => value === true)
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
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_dependencia_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError500}
                      className={"text-center"}
                    >
                      {t("app_dependencia_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      color="success"
                      isOpen={this.state.alertSuccess}
                      className={"text-center"}
                    >
                      {t("app_dependencia_modal_actualizar_alert_success")}
                    </Alert>
                    <form className="form">
                      <div className="row">
                        <div className="col-md-3">
                          <img src={IMGDEPENDENCIA} className="img-thumbnail" />
                        </div>
                        <div className="col-md-9">
                          <div className="">
                            <h5
                              className=""
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              {t(
                                "app_dependencia_modal_actualizar_titulo_2"
                              )}{" "}
                            </h5>{" "}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {this.state.t(
                                    "app_dependencia_form_actualizar_conglomerado"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <SelectConglomerado
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name={"conglomerate"}
                                  onChange={e =>
                                    setFieldValue(
                                      "conglomerate",
                                      e.target.value
                                    )
                                  }
                                  onBlur={() =>
                                    setFieldTouched("conglomerate", true)
                                  }
                                  value={values.conglomerate}
                                  className={`form-control form-control-sm ${errors.conglomerate &&
                                    touched.conglomerate &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate &&
                                  touched.conglomerate ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_dependencia_form_actualizar_empresa"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <Field
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name="company"
                                  component={FieldCompany}
                                  conglomerateId={props.values.conglomerate}
                                  companyId={props.values.company}
                                ></Field>
                                {/* <SelectCompany
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  conglomerate={props.values.conglomerate}
                                  name="company"
                                  value={values.company}
                                  onChange={e =>
                                    setFieldValue("company", e.target.value)
                                  }
                                  onBlur={() =>
                                    setFieldTouched("company", true)
                                  }
                                  className={`form-control form-control-sm ${errors.company &&
                                    touched.company &&
                                    "is-invalid"}`}
                                ></SelectCompany> */}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.company && touched.company ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="company" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_dependencia_form_actualizar_sede"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <Field
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name="headquarter"
                                  component={FieldHeadquarter}
                                  companyId={props.values.company}
                                  headquarterId={props.values.headquarter}
                                ></Field>
                                {/* <SelectHeadquarter
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  company={props.values.company}
                                  name={"headquarter"}
                                  value={values.headquarter}
                                  onChange={e =>
                                    setFieldValue("headquarter", e.target.value)
                                  }
                                  onBlur={() =>
                                    setFieldTouched("headquarter", true)
                                  }
                                  className={`form-control form-control-sm ${errors.headquarter &&
                                    touched.headquarter &&
                                    "is-invalid"}`}
                                ></SelectHeadquarter> */}
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.headquarter && touched.headquarter ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="headquarter" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_dependencia_form_actualizar_codigo"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  name={"code"}
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.code}
                                  className="form-control form-control-sm"
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.code && touched.code ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="code" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_dependencia_form_actualizar_nombre"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"name"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name}
                                  className={`form-control form-control-sm ${errors.name &&
                                    touched.name &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.name && touched.name ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="name" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_dependencia_form_actualizar_cargo_responsable"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <SelectCharges
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name={"charge"}
                                  onChange={e =>
                                    setFieldValue("charge", e.target.value)
                                  }
                                  onBlur={() => {
                                    setFieldTouched("charge", true);
                                  }}
                                  value={values.charge}
                                  className={`form-control form-control-sm ${errors.charge &&
                                    touched.charge &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.charge && touched.charge ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="charge" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_dependencia_form_actualizar_descripcion"
                                  )}{" "}
                                </label>
                                <textarea
                                  name={"description"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  className="form-control"
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.description && touched.description ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="description" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {t("app_dependencia_form_actualizar_estado")}{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="dependenciaModalEdit"
                                          label={t(
                                            "app_dependencia_form_actualizar_estado_descripcion"
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.status &&
                                            touched.status &&
                                            "invalid-feedback"
                                          }
                                        />
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-outline-success btn-sm"}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" />{" "}
                      {t("app_dependencia_form_actualizar_boton_actualizar")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError400: false,
                          alertError500: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_dependencia_form_actualizar_boton_cerrar")}{" "}
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

ModalEditDependencia.propTypes = {
  modalEdit: PropTypes.bool.isRequired,
  t: PropTypes.any,
  id: PropTypes.string.isRequired
};

export default ModalEditDependencia;
