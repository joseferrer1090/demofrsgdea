import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Alert
} from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import IMGCARGO from "./../../../assets/img/employee.svg";
import { CHARGES, CHARGE } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";

class ModalEditCargo extends React.Component {
  state = {
    modal: this.props.modaledit,
    id: this.props.id,
    dataCharge: {},
    alertError500: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    status: 0,
    auth: this.props.authorization,
    userName: ""
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
    this.getDataChargeById(id);
  };

  getDataChargeById = id => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${CHARGE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCharge: data
        });
      })
      .catch(Error, console.log("Error", Error));
  };
  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertSuccess: false
    });
  };

  render() {
    const datainit = this.state.dataCharge;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t("app_cargo_modal_actualizar_titulo")}{" "}
            {this.state.dataCharge.name}{" "}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={datainit}
            validationSchema={Yup.object().shape({
              code: Yup.string()
                .required(" Por favor introduzca un código alfanumérico.")
                .matches(/^[0-9a-zA-Z]+$/, " No es un código alfanumérico.")
                .min(2, " Mínimo 2 caracteres.")
                .max(15, " Máximo 15 caracteres."),
              name: Yup.string().required(" Por favor introduzca un nombre."),
              description: Yup.string().max(250, " Máximo 250 caracteres."),
              status: Yup.bool().test("Activado", "", value => value === true)
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const tipoEstado = data => {
                  let tipo;
                  if (data === true || data === 1) {
                    return (tipo = 1);
                  } else if (data === false || data === 0) {
                    return (tipo = 0);
                  }
                  return 0;
                };
                const user = () => {
                  const data = this.state.auth;
                  const user = decode(data);
                  return user.user_name;
                };
                fetch(CHARGES, {
                  method: "PUT",
                  headers: {
                    Authorization: "Bearer " + this.state.auth,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    code: values.code,
                    name: values.name,
                    id: this.state.id,
                    status: tipoEstado(values.status),
                    description: values.description,
                    userName: user()
                  })
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
              }, 1000);
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError500}
                    >
                      {t("app_cargo_modal_actualizar_alert_error_500")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="danger"
                      isOpen={this.state.alertError400}
                    >
                      {t("app_cargo_modal_actualizar_alert_error_400")}
                    </Alert>
                    <Alert
                      className={"text-center"}
                      color="success"
                      isOpen={this.state.alertSuccess}
                    >
                      {t("app_cargo_modal_actualizar_alert_success")}
                    </Alert>
                    <form className="form">
                      <Row>
                        <Col sm="3">
                          <img src={IMGCARGO} className="img-thumbnail" />
                        </Col>
                        <Col sm="9">
                          <div className="">
                            {" "}
                            <h5
                              className=""
                              style={{ borderBottom: "1px solid black" }}
                            >
                              {" "}
                              {t("app_cargo_modal_actualizar_titulo_2")}{" "}
                            </h5>{" "}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_cargo_modal_actualizar_codigo")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    {" "}
                                    <input
                                      name={"code"}
                                      type="text"
                                      placeholder=""
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
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_cargo_modal_actualizar_nombre")}{" "}
                                  <span className="text-danger">*</span>{" "}
                                  <dd>
                                    <input
                                      name={"name"}
                                      type="text"
                                      placeholder=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                      className={`form-control form-control-sm ${errors.name &&
                                        touched.name &&
                                        "is-invalid"}`}
                                    />
                                    <div style={{ color: "#D54B4B" }}>
                                      {errors.name && touched.name ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={"name"} />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <dl className="param">
                                  {t("app_cargo_modal_actualizar_descripcion")}
                                  <dd>
                                    {" "}
                                    <textarea
                                      name={"description"}
                                      className="form-control form-control-sm"
                                      placeholder=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.description}
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
                                      "app_cargo_modal_actualizar_estado"
                                    )}{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="status"
                                      render={({ field, form }) => {
                                        return (
                                          <CustomInput
                                            type="checkbox"
                                            id="CheckBoxEditRoles"
                                            label={t(
                                              "app_cargo_modal_actualizar_estado_descripcion"
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
                                </dl>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
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
                      {t("app_cargo_modal_actualizar_button_actualizar")}
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
                      {t("app_cargo_modal_actualizar_button_cerrar")}
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
ModalEditCargo.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};

export default ModalEditCargo;
