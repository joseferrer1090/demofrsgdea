import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput,
  Alert,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";
import ImgMensajero from "./../../../assets/img/courier.svg";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { MESSENGERS, MESSENGER } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalActualizarMensajero extends React.Component {
  state = {
    modal: this.props.modalupdate,
    idMensajero: this.props.id,
    dataResult: {},
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    messenger_status: 0,
    username: "",
    auth: this.props.authorization,
    spinner: true,
    spinnerActualizar: false,
  };

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      idMensajero: id,
      spinner: true,
    });
    this.getMessengerByID(id);
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 1500);
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

  getMessengerByID = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${MESSENGER}/${id}?username=${username.user_name}`, {
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
            messenger_identification: data.identification,
            messenger_name: data.name,
            messenger_description: data.description,
            messenger_status: data.status,
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
            {t("app_mensajero_modal_actualizar_titulo")}{" "}
            {dataResult.messenger_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            validationSchema={Yup.object().shape({
              messenger_identification: Yup.string()
                .matches(
                  /^[0-9]+$/,
                  "  El número de identificación no acepta puntos, letras, ni caracteres especiales."
                )
                .required(" Por favor introduzca una identificación."),
              messenger_name: Yup.string()
                .required(" Por favor introduzca un nombre.")
                .max(100),
              messenger_description: Yup.string().max(
                250,
                "Máximo 250 caracteres."
              ),
              messenger_status: Yup.bool().test(
                "Activo",
                "",
                (value) => value === true
              ),
            })}
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
                fetch(MESSENGERS, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth,
                  },
                  body: JSON.stringify({
                    id: this.state.idMensajero,
                    identification: values.messenger_identification,
                    name: values.messenger_name,
                    description: values.messenger_description,
                    status: tipoEstado(values.messenger_status),
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
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t("app_mensajero_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_mensajero_modal_actualizar_alert_success")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_mensajero_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={ImgMensajero} />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {" "}
                          <h5
                            className=""
                            style={{ borderBottom: "1px solid black" }}
                          >
                            {" "}
                            {t("app_mensajero_modal_actualizar_titulo_2")}{" "}
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
                                    "app_mensajero_modal_actualizar_identificacion"
                                  )}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    <input
                                      name={"messenger_identification"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.messenger_identification}
                                      type="text"
                                      className={`form-control form-control-sm ${
                                        errors.messenger_identification &&
                                        touched.messenger_identification &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.messenger_identification &&
                                      touched.messenger_identification ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="messenger_identification" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_mensajero_modal_actualizar_nombre")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"messenger_name"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.messenger_name}
                                      type="text"
                                      className={`form-control form-control-sm ${
                                        errors.messenger_name &&
                                        touched.messenger_name &&
                                        "is-invalid"
                                      }`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.messenger_name &&
                                      touched.messenger_name ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="messenger_name" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <dl className="param">
                                  {t(
                                    "app_mensajero_modal_actualizar_descripción"
                                  )}
                                  <dd>
                                    {" "}
                                    <textarea
                                      name={"messenger_description"}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.messenger_description}
                                      className="form-control form-control-sm"
                                    />
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <dl className="param">
                                  <label>
                                    {" "}
                                    {t(
                                      "app_mensajero_modal_actualizar_estado"
                                    )}{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="messenger_status"
                                      render={({ field, form }) => {
                                        return (
                                          <CustomInput
                                            type="checkbox"
                                            id="CheckBoxEditRoles"
                                            label={t(
                                              "app_mensajero_modal_actualizar_estado_descripcion"
                                            )}
                                            {...field}
                                            checked={field.value}
                                            className={
                                              errors.messenger_status &&
                                              touched.messenger_status &&
                                              "invalid-feedback"
                                            }
                                          />
                                        );
                                      }}
                                    />
                                    <ErrorMessage name="messenger_status" />
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      type="button"
                      className="btn btn-sm btn-success"
                      disabled={this.state.spinnerActualizar}
                    >
                      {this.state.spinnerActualizar ? (
                        <i className=" fa fa-spinner fa-refresh" />
                      ) : (
                        <div>
                          <i className="fa fa-pencil" />{" "}
                          {t("app_mensajero_modal_actualizar_boton_actualizar")}
                        </div>
                      )}
                    </button>
                    <button
                      className="btn btn-sm btn-secondary "
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError500: false,
                          alertError400: false,
                          alertSuccess: false,
                        });
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_mensajero_modal_actualizar_boton_cerrar")}{" "}
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

ModalActualizarMensajero.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any,
};

export default ModalActualizarMensajero;
