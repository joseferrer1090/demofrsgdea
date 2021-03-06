import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CustomInput,
  Alert,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";
import IMGTERCERO from "./../../../assets/img/supply.svg";
import { TYPETHIRDPARTYS, TYPETHIRDPARTY } from "./../../../services/EndPoints";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { decode } from "jsonwebtoken";

class ModalEditTipoTercero extends React.Component {
  state = {
    modal: this.props.modalupdate,
    idTipoTerceros: this.props.id,
    dataResult: {},
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props,
    typethirdparty_status: 0,
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
      idTipoTerceros: id,
      spinner: true,
    });
    this.getTipoTercerosByID(id);
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 1500);
  };

  getTipoTercerosByID = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPETHIRDPARTY}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataResult: {
            typethirdparty_code: data.code,
            typethirdparty_name: data.name,
            typethirdparty_description: data.description,
            typethirdparty_status: data.status,
          },
        });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const dataResult = this.state.dataResult;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_tipoTerecero_modal_actualizar_titulo")}{" "}
            {dataResult.typethirdparty_name}
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
                fetch(TYPETHIRDPARTYS, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth,
                  },
                  body: JSON.stringify({
                    id: this.state.idTipoTerceros,
                    code: values.typethirdparty_code,
                    name: values.typethirdparty_name,
                    description: values.typethirdparty_description,
                    status: tipoEstado(values.typethirdparty_status),
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
                          modal: false,
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
              typethirdparty_code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              typethirdparty_name: Yup.string()
                .required(" Por favor introduzca un nombre.")
                .max(100, " Máximo 100 caracteres."),
              typethirdparty_description: Yup.string().required(
                " Por favor introduzca una descripción."
              ),
              typethirdparty_status: Yup.bool().test(
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
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError500}
                      className={"text-center"}
                    >
                      {t("app_tipoTerecero_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_tipoTerecero_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_tipoTerecero_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm={3}>
                        <img src={IMGTERCERO} className={"img-thumbnail"} />
                      </Col>
                      <Col sm={9}>
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t(
                              "app_tipoTerecero_modal_actualizar_titulo_2"
                            )}{" "}
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
                                  {t(
                                    "app_tipoTerecero_modal_actualizar_codigo"
                                  )}{" "}
                                  <span className="text-danger">*</span>
                                </label>{" "}
                                <input
                                  name={"typethirdparty_code"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.typethirdparty_code}
                                  type="text"
                                  className={`form-control form-control-sm ${
                                    errors.typethirdparty_code &&
                                    touched.typethirdparty_code &&
                                    "is-invalid"
                                  }`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.typethirdparty_code &&
                                  touched.typethirdparty_code ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"typethirdparty_code"} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {t(
                                    "app_tipoTerecero_modal_actualizar_nombre"
                                  )}{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  name={"typethirdparty_name"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.typethirdparty_name}
                                  type="text"
                                  className={`form-control form-control-sm ${
                                    errors.typethirdparty_name &&
                                    touched.typethirdparty_name &&
                                    "is-invalid"
                                  }`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.typethirdparty_name &&
                                  touched.typethirdparty_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={"typethirdparty_name"} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTerecero_modal_actualizar_descripcion"
                                  )}{" "}
                                  {/* <span className="text-danger">*</span>{" "} */}
                                </label>
                                <textarea
                                  name={"typethirdparty_description"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.typethirdparty_description}
                                  className={`form-control form-control-sm ${
                                    errors.typethirdparty_description &&
                                    touched.typethirdparty_description &&
                                    "is-invalid"
                                  }`}
                                />
                                <div style={{ color: "#D54B4B" }}>
                                  {errors.typethirdparty_description &&
                                  touched.typethirdparty_description ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage
                                    name={"typethirdparty_description"}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTerecero_modal_actualizar_estado"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="typethirdparty_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckBoxEditRoles"
                                          label={t(
                                            "app_tipoTerecero_modal_actualizar_estado_descripcion"
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.typethirdparty_status &&
                                            touched.typethirdparty_status &&
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
                        )}
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
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
                          <i className="fa fa-pencil" />{" "}
                          {t(
                            "app_tipoTerecero_modal_actualizar_button_actualizar"
                          )}{" "}
                        </div>
                      )}{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
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
                      {t("app_tipoTerecero_modal_actualizar_button_cerrar")}{" "}
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

ModalEditTipoTercero.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  t: PropTypes.any,
  updateTable: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ModalEditTipoTercero;
