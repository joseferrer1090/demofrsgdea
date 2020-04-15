import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CustomInput,
  Alert,
  Spinner,
} from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import IMGEMPRESA from "./../../../assets/img/company.svg";
import { CONGLOMERATES_STATUS, COMPANYS } from "../../../services/EndPoints";
import SelectCountry from "./SelectCountryModalEdit";
import FieldDepartment from "./SelectDepartmentModalEdit";
import FieldCity from "./SelecCityModalEdit";
import SelectCharges from "./SelectChargesModalEdit";
import { decode } from "jsonwebtoken";

class ModalEditEmpresa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditempresa,
      dataCompany: {},
      optionsConglomerate: [0],
      optionsCharges: [0],
      id: this.props.id,
      alertSuccess: false,
      alertError500: false,
      alertError400: "",
      t: this.props.t,
      company_status: 0,
      auth: this.props.authorization,
      spinner: true,
      spinnerDelete: false,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState(
        {
          auth: this.props.authorization,
        },
        this.getDataConglomerates()
      );
    }
  }
  toggle = (id) => {
    this.setState(
      {
        modal: !this.state.modal,
        id: id,
        spinner: true,
      },
      () => this.props.updateTable()
    );
    this.getCompanyById(id);
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 2000);
  };

  getDataConglomerates = (data) => {
    const auth = this.state.auth;
    fetch(CONGLOMERATES_STATUS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          optionsConglomerate: data,
        });
      })
      .catch((Error) => console.log(" ", Error));
  };

  getCompanyById = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${COMPANYS}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataCompany: {
            company_country:
              data.city.department.country.status !== 1
                ? ""
                : data.city.department.country.id,
            company_department:
              data.city.department.status !== 1 ? "" : data.city.department.id,
            company_city: data.city.status !== 1 ? "" : data.city.id,
            company_code: data.code,
            company_nit: data.nit,
            company_name: data.name,
            company_description: data.description,
            company_status: data.status,
            company_conglomerate: data.conglomerate.id,
            company_charge: data.charge === null ? " " : data.charge.id,
            // data.charge !== null ? { company_charge: data.charge.id } : ''
          },
          spinner: false,
        });
      })
      .catch((Error) => console.log("", Error));
  };

  render() {
    const { t } = this.props;

    const mapOptionsConglomerate = this.state.optionsConglomerate.map(
      (aux, idx) => {
        return (
          <option key={aux.id} value={aux.id}>
            {aux.name}
          </option>
        );
      }
    );

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            {t("app_empresa_modal_actualizar_titulo")}{" "}
            {this.state.dataCompany.company_name}{" "}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.dataCompany}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({
                spinnerDelete: true,
              });
              const tipoEstado = (data) => {
                let tipo;
                if (data === true || data === 1) {
                  tipo = 1;
                  return tipo;
                } else if (data === false || data === 0) {
                  tipo = 0;
                  return tipo;
                }
                return 0;
              };

              setTimeout(() => {
                const auth = this.state.auth;
                const username = decode(auth);
                fetch(`${COMPANYS}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth,
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    code: values.company_code,
                    nit: values.company_nit,
                    name: values.company_name,
                    description: values.company_description,
                    conglomerateId: values.company_conglomerate,
                    chargeId: values.company_charge,
                    cityId: values.company_city,
                    status: tipoEstado(values.company_status),
                    userName: username.user_name,
                  }),
                }).then((response) => {
                  if (response.status === 200) {
                    this.setState(
                      {
                        alertSuccess: true,
                        spinnerDelete: false,
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
                      spinnerDelete: false,
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError400: false,
                      });
                    }, 3000);
                  } else if (response.status === 500) {
                    this.setState({
                      alertError500: true,
                      spinnerDelete: false,
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError500: false,
                        modal: !this.state.modal,
                      });
                    }, 3000);
                  }
                });
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              company_conglomerate: Yup.string()
                .ensure()
                .required(" Por favor seleccione un conglomerado."),
              company_code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              company_name: Yup.string()
                .required(" Por favor introduzca un nombre.")
                .max(100, " Máximo 100 caracteres."),
              company_nit: Yup.string()
                .matches(
                  /^[0-9]+$/,
                  "  El número Nit no acepta puntos, letras, ni caracteres especiales."
                )
                .min(8, " Mínimo 8 caracteres.")
                .max(15, " Máximo 15 caracteres.")
                .required(" Por favor introduzca el Nit."),
              company_description: Yup.string()
                .max(250, " Máximo 250 caracteres.")
                .nullable(),
              company_charge: Yup.string().ensure(),
              company_country: Yup.string()
                .ensure()
                .required(" Por favor seleccione un país."),
              company_department: Yup.string()
                .ensure()
                .required(" Por favor seleccione un departamento."),
              company_city: Yup.string()
                .ensure()
                .required(" Por favor seleccione una ciudad."),
              company_status: Yup.bool().test(
                "Activo",
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
                    <form className="form">
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError500}
                      >
                        {t("app_empresa_modal_actualizar_alert_error_500")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t("app_empresa_modal_actualizar_alert_success")}
                      </Alert>
                      <Alert
                        className={"text-center"}
                        color="danger"
                        isOpen={this.state.alertError400}
                      >
                        {t("app_empresa_modal_actualizar_alert_error_400")}
                      </Alert>
                      <Row>
                        <Col sm="3">
                          <img src={IMGEMPRESA} className="img-thumbnail" />
                        </Col>
                        <Col sm="9">
                          <div className="">
                            {" "}
                            <h5
                              className=""
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              {t("app_empresa_modal_actualizar_titulo_2")}{" "}
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
                                  <dl className="param">
                                    {t(
                                      "app_empresa_modal_actualizar_conglomerado"
                                    )}{" "}
                                    <span className="text-danger">*</span>{" "}
                                    <dd>
                                      {" "}
                                      <select
                                        className={`form-control form-control-sm ${
                                          errors.company_conglomerate &&
                                          touched.company_conglomerate &&
                                          "is-invalid"
                                        }`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={"company_conglomerate"}
                                        value={values.company_conglomerate}
                                      >
                                        <option value={""} disabled>
                                          --{" "}
                                          {t(
                                            "app_empresa_modal_actualizar_select_conglomerado"
                                          )}{" "}
                                          --
                                        </option>
                                        {mapOptionsConglomerate}
                                      </select>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.company_conglomerate &&
                                        touched.company_conglomerate ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_conglomerate" />
                                      </div>
                                    </dd>
                                  </dl>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <dl className="param">
                                    {t("app_empresa_modal_actualizar_codigo")}{" "}
                                    <span className="text-danger">*</span>{" "}
                                    <dd>
                                      <input
                                        name={"company_code"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company_code}
                                        type="text"
                                        className={`form-control form-control-sm ${
                                          errors.company_code &&
                                          touched.company_code &&
                                          "is-invalid"
                                        }`}
                                      />
                                      <div
                                        className=""
                                        style={{ color: "#D54B4B" }}
                                      >
                                        {errors.company_code &&
                                        touched.company_code ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_code" />
                                      </div>
                                    </dd>
                                  </dl>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <dl className="param">
                                    {t("app_empresa_modal_actualizar_nit")}{" "}
                                    <span className="text-danger">*</span>{" "}
                                    <dd>
                                      {" "}
                                      <input
                                        type="text"
                                        name={"company_nit"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company_nit}
                                        className={`form-control form-control-sm ${
                                          errors.company_nit &&
                                          touched.company_nit &&
                                          "is-invalid"
                                        }`}
                                      />{" "}
                                      <div
                                        className=""
                                        style={{ color: "#D54B4B" }}
                                      >
                                        {errors.company_nit &&
                                        touched.company_nit ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_nit" />
                                      </div>
                                    </dd>
                                  </dl>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <dl className="param">
                                    {t("app_empresa_modal_actualizar_nombre")}
                                    <span className="text-danger">*</span>{" "}
                                    <dd>
                                      {" "}
                                      <input
                                        name={"company_name"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.company_name}
                                        type="text"
                                        className={`form-control form-control-sm ${
                                          errors.company_name &&
                                          touched.company_name &&
                                          "is-invalid"
                                        }`}
                                      />{" "}
                                      <div
                                        className=""
                                        style={{ color: "#D54B4B" }}
                                      >
                                        {errors.company_name &&
                                        touched.company_name ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_name" />
                                      </div>
                                    </dd>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          )}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader>
                              {" "}
                              {t("app_empresa_modal_actualizar_collapse")}{" "}
                            </CardHeader>
                            <CardBody>
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
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t("app_empresa_modal_actualizar_pais")}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>

                                      <SelectCountry
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name={"company_country"}
                                        onChange={(e) =>
                                          setFieldValue(
                                            "company_country",
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched(
                                            "company_country",
                                            true
                                          )
                                        }
                                        value={values.company_country}
                                        className={`form-control form-control-sm ${
                                          errors.company_country &&
                                          touched.company_country &&
                                          "is-invalid"
                                        }`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.company_country &&
                                        touched.company_country ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_country" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_empresa_modal_actualizar_departamento"
                                        )}
                                        <span className="text-danger">*</span>{" "}
                                      </label>

                                      <Field
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name="company_department"
                                        component={FieldDepartment}
                                        countryId={props.values.company_country}
                                        departmentId={
                                          props.values.company_department
                                        }
                                      ></Field>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.company_department &&
                                        touched.company_department ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_department" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_empresa_modal_actualizar_ciudad"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <Field
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name="company_city"
                                        component={FieldCity}
                                        departmentId={
                                          props.values.company_department
                                        }
                                        cityId={props.values.company_city}
                                        countryId={props.values.company_country}
                                      ></Field>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.company_city &&
                                        touched.company_city ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_city" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_empresa_modal_actualizar_descripcion"
                                        )}{" "}
                                      </label>
                                      <input
                                        name="company_description"
                                        value={values.company_description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        className={`form-control form-control-sm ${
                                          errors.company_description &&
                                          touched.company_description &&
                                          "is-invalid"
                                        }`}
                                      />
                                      <div
                                        className=""
                                        style={{ color: "#D54B4B" }}
                                      >
                                        {errors.company_description &&
                                        touched.company_description ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_description" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_empresa_modal_actualizar_cargo_responsable"
                                        )}{" "}
                                      </label>
                                      <SelectCharges
                                        authorization={this.state.auth}
                                        t={this.state.t}
                                        name={"company_charge"}
                                        onChange={(e) =>
                                          setFieldValue(
                                            "company_charge",
                                            e.target.value
                                          )
                                        }
                                        onBlur={() => {
                                          setFieldTouched(
                                            "company_charge",
                                            true
                                          );
                                        }}
                                        value={values.company_charge}
                                        className={`form-control form-control-sm ${
                                          errors.company_charge &&
                                          touched.company_charge &&
                                          "is-invalid"
                                        }`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.company_charge &&
                                        touched.company_charge ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="company_charge" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_empresa_modal_actualizar_estado"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <div className="text-justify">
                                        <Field
                                          name="company_status"
                                          type=""
                                          render={({ field, form }) => {
                                            return (
                                              <CustomInput
                                                type="checkbox"
                                                id="conglomeradoModalEdit"
                                                label={t(
                                                  "app_empresa_modal_actualizar_estado_descripcion"
                                                )}
                                                {...field}
                                                checked={field.value}
                                                className={
                                                  errors.company_status &&
                                                  touched.company_status &&
                                                  "invalid-feedback"
                                                }
                                              />
                                            );
                                          }}
                                        />
                                        <ErrorMessage name="company_status" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={"btn btn-success btn-sm"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {this.state.spinnerDelete ? (
                        <i className=" fa fa-spinner fa-refresh" />
                      ) : (
                        <div>
                          <i className="fa fa-pencil" />{" "}
                          {t("app_empresa_modal_actualizar_boton_actualizar")}
                        </div>
                      )}
                    </button>
                    <button
                      className={"btn btn-secondary btn-sm"}
                      type="button"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false,
                          alertError500: false,
                          alertError400: false,
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t("app_empresa_modal_actualizar_boton_cerrar")}
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

ModalEditEmpresa.propTypes = {
  modaleditempresa: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.any,
};
export default ModalEditEmpresa;
