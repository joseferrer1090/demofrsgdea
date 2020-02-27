import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CustomInput,
  Alert
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  CONGLOMERATES,
  CHARGES_STATUS,
  CONGLOMERATE
} from "./../../../services/EndPoints";
import { Trans } from "react-i18next";
import FieldCity from "./SelectCityModalEdit";
import FieldDepartment from "./SelectDepartmentModalEdit";
import SelectCountry from "./SelectCountryModalEdit";
import { decode } from "jsonwebtoken";

class ModalEditConglomerado extends React.Component {
  state = {
    modal: this.props.modaleditstate,
    idConglomerado: this.props.id,
    dataResult: {},
    alertError500: false,
    alertError400: false,
    alertSuccess: false,
    t: this.props.t,
    optionsCharges: [0],
    // status: 0,
    auth: this.props.authorization,
    oldValue: "",
    newValue: ""
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
      this.setState(
        {
          auth: this.props.authorization
        },

        this.getDataCharges()
      );
    }
  }

  toggle = id => {
    this.setState(
      {
        modal: !this.state.modal,
        idConglomerado: id
      },
      () => {
        this.props.updateTable();
      }
    );
    this.getConglomeradoByID(id);
  };

  getConglomeradoByID = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CONGLOMERATE}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataResult: {
            conglomerate_country:
              data.city.department.country.status !== 1
                ? ""
                : data.city.department.country.id,
            conglomerate_department:
              data.city.department.status !== 1 ? "" : data.city.department.id,
            conglomerate_city: data.city.status !== 1 ? "" : data.city.id,
            conglomerate_name: data.name,
            code: data.code,
            description: data.description,
            status: data.status,
            conglomerate_charge: data.charge === null ? "" : data.charge.id
          }
        });
      })
      .catch(error => console.log(error));
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertSuccess: false
    });
  };

  getDataCharges = data => {
    fetch(CHARGES_STATUS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCharges: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  changeInValue = (Old, New) => {
    this.setState({
      oldValue: Old,
      newValue: New
    });
  };

  render() {
    const mapOptionsCharges = this.state.optionsCharges.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const dataResult = this.state.dataResult;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <Trans>{t("app_conglomerado_modal_actualizar_titulo")}</Trans>
            &nbsp;{this.state.dataResult.conglomerate_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
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
                fetch(CONGLOMERATES, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth
                  },
                  body: JSON.stringify({
                    id: this.state.idConglomerado,
                    code: values.code,
                    name: values.conglomerate_name,
                    description: values.description,
                    status: tipoEstado(values.status),
                    cityId: values.conglomerate_city,
                    chargeId: values.conglomerate_charge,
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
                          this.props.updateTable()
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
                  .catch(error => console.log("", error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              conglomerate_name: Yup.string().required(
                " Por favor introduzca un nombre."
              ),
              conglomerate_country: Yup.string()
                .required(" Por favor seleccione un país.")
                .ensure(),
              conglomerate_department: Yup.string()
                .required(" Por favor seleccione un departamento.")
                .ensure(),
              conglomerate_city: Yup.string()
                .required(" Por favor seleccione una ciudad.")
                .ensure(),
              conglomerate_charge: Yup.string().ensure(),
              description: Yup.string()
                .nullable()
                .max(250, " Máximo 250 caracteres."),
              status: Yup.bool().test("Activo", "", value => value === true)
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
                      isOpen={this.state.alertError500}
                    >
                      {t("app_conglomerado_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_conglomerado_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_conglomerado_modal_actualizar_alert_success")}
                    </Alert>
                    <form className="form">
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            src={IMGCONGLOMERADO}
                            className="img-thumbnail"
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="">
                            {" "}
                            <h5
                              className=""
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              <Trans>
                                {t(
                                  "app_conglomerado_modal_actualizar_titulo_2"
                                )}
                              </Trans>{" "}
                            </h5>{" "}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  <Trans>
                                    {t(
                                      "app_conglomerado_modal_actualizar_codigo"
                                    )}
                                  </Trans>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name={"code"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.code}
                                  className={`form-control form-control-sm ${errors.code &&
                                    touched.code &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.code && touched.code ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"code"} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  <Trans>
                                    {t(
                                      "app_conglomerado_modal_actualizar_nombre"
                                    )}
                                  </Trans>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  type="text"
                                  name="conglomerate_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_name}
                                  className={`form-control form-control-sm ${errors.conglomerate_name &&
                                    touched.conglomerate_name &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_name &&
                                  touched.conglomerate_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"conglomerate_name"} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {t("app_conglomerado_modal_actualizar_pais")}
                                </label>
                                <span className="text-danger">*</span>{" "}
                                <SelectCountry
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name={"conglomerate_country"}
                                  onChange={e => {
                                    setFieldValue(
                                      "conglomerate_country",
                                      e.target.value
                                    );
                                    this.changeInValue(
                                      values.conglomerate_country,
                                      e.target.value
                                    );
                                  }}
                                  onBlur={() => {
                                    setFieldTouched(
                                      "conglomerate_country",
                                      true
                                    );
                                  }}
                                  value={values.conglomerate_country}
                                  className={`form-control form-control-sm ${errors.conglomerate_country &&
                                    touched.conglomerate_country &&
                                    "is-invalid"}`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_country &&
                                  touched.conglomerate_country ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_country" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_conglomerado_modal_actualizar_departamento"
                                  )}{" "}
                                </label>
                                <span className="text-danger">*</span>{" "}
                                <Field
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name="conglomerate_department"
                                  component={FieldDepartment}
                                  countryId={props.values.conglomerate_country}
                                  departmentId={
                                    props.values.conglomerate_department
                                  }
                                ></Field>
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_department &&
                                  touched.conglomerate_department ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_department" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_conglomerado_modal_actualizar_ciudad"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <Field
                                  authorization={this.state.auth}
                                  t={this.state.t}
                                  name="conglomerate_city"
                                  component={FieldCity}
                                  departmentId={
                                    props.values.conglomerate_department
                                  }
                                  cityId={props.values.conglomerate_city}
                                  countryId={props.values.conglomerate_country}
                                ></Field>
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.conglomerate_city &&
                                  touched.conglomerate_city ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_city" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_conglomerado_modal_actualizar_cargo_responsable"
                                  )}{" "}
                                </label>
                                <select
                                  name="conglomerate_charge"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_charge}
                                  className="form-control form-control-sm"
                                >
                                  {" "}
                                  <option value={" "}>
                                    --{" "}
                                    {t(
                                      "app_conglomerado_form_select_cargo_responsable"
                                    )}{" "}
                                    --{" "}
                                  </option>
                                  {mapOptionsCharges}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  <Trans>
                                    {t(
                                      "app_conglomerado_modal_actualizar_descripcion"
                                    )}
                                  </Trans>
                                </label>
                                <textarea
                                  name="description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  className="form-control form-control-sm"
                                />

                                <ErrorMessage name="description" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  <Trans>
                                    {t(
                                      "app_conglomerado_modal_actualizar_estado"
                                    )}
                                  </Trans>{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="text-justify ">
                                  <Field
                                    name="status"
                                    type=""
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="conglomeradoModalEdit"
                                          label={t(
                                            "app_conglomerado_modal_actualizar_estado_descripcion"
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

                                  <ErrorMessage name="status" />
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
                      {t("app_conglomerado_modal_actualizar_botom_actualizar")}
                    </button>
                    <button
                      className={"btn btn-outline-secondary btn-sm"}
                      type="button"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError400: false,
                          alertError500: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{" "}
                      {t("app_conglomerado_modal_actualizar_botom_cerrar")}
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

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalEditConglomerado;
