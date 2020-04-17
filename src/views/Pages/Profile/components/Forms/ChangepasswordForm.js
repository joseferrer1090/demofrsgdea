import React, { Fragment } from "react";
import { Alert, Card, CardBody, Row, Col, CardFooter } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage, withFormik } from "formik";
import { decode } from "jsonwebtoken";
import { UPDATE_PROFILE_PASSWORD } from "../../../../../services/EndPoints";

class ChangepasswordForm extends React.Component {
  state = {
    userLogged: "",
    nameUser: "",
    alertSuccess: false,
    alertError400: false,
    alertError500: false,
    t: this.props.t,
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

  onDismiss = () => {
    this.setState({
      alertError500: false,
      alertError400: false,
      alertSuccess: false
    });
  };

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Formik
          // initialValues={dataInitial}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              const auth = this.props.authorization;
              const username = decode(auth);
              fetch(`${UPDATE_PROFILE_PASSWORD}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + this.props.authorization
                },
                body: JSON.stringify({
                  userNameAuthenticate: username.user_name,
                  passwordOld: values.old_password,
                  passwordNew: values.new_password,
                  passwordConfirm: values.confirm_password
                })
              })
                .then(response => {
                  if (response.status === 500) {
                    console.log("500");

                    this.setState({
                      alertError500: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError500: false,
                        modal: !this.state.modal
                      });
                    }, 3000);
                  } else if (response.status === 200) {
                    console.log("200");
                    this.setState({
                      alertSuccess: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertSuccess: false,
                        modal: false
                      });
                    }, 3000);
                  } else if (response.status === 400) {
                    console.log("400  ");
                    this.setState({
                      alertError400: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertError400: false
                      });
                    }, 3000);
                  }
                })
                .catch(error => console.log("", error));
              setSubmitting(false);
              resetForm({
                old_password: "",
                new_password: "",
                confirm_password: ""
              });
            }, 5000);
          }}
          validationSchema={Yup.object().shape({
            old_password: Yup.string().required(
              "Por favor introduzca su contraseña actual."
            ),
            new_password: Yup.string()
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
                "Contraseña no valida, la contraseña debe tener al menos una letra en mayuscula, al menos un dígito, no acepta espacios en blanco y al menos un carácter especial."
              )
              .required("Por favor introduzca su contraseña nueva.")
              .min(8)
              .max(15),
            confirm_password: Yup.string()
              .oneOf(
                [Yup.ref("new_password"), null],
                "La contraseña no coincide."
              )
              .min(8)
              .max(15)
              .required("Por favor confirme su contraseña.")
          })}
        >
          {props => {
            const {
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              isSubmitting,
              touched
            } = props;
            return (
              <Fragment>
                <div>
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <p className="text-center">
                            {t("user_profile_tab_3_form_data_3_text")}
                          </p>{" "}
                          <Alert
                            color="danger"
                            isOpen={this.state.alertError500}
                            toggle={this.onDismiss}
                          >
                            {t("app_usuarios_modal_actualizar_alert_error_500")}
                          </Alert>
                          <Alert
                            color="success"
                            isOpen={this.state.alertSuccess}
                          >
                            {t(
                              "app_usuarios_modal_cambiar_contraseña_alert_success"
                            )}
                          </Alert>
                          <Alert
                            className={"text-center"}
                            color="danger"
                            isOpen={this.state.alertError400}
                          >
                            {t("app_usuarios_modal_actualizar_alert_error_400")}
                          </Alert>
                          <form className="form">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "user_profile_tab_3_form_data_3_actual_password"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name="old_password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.old_password}
                                className={`form-control form-control-sm ${errors.old_password &&
                                  touched.old_password &&
                                  "is-invalid"}`}
                                type="password"
                                placeholder=""
                              />
                              <div
                                // className="text-center"
                                style={{ color: "#D54B4B" }}
                              >
                                {errors.old_password && touched.old_password ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="old_password" />
                              </div>
                              {/* <ErrorMessage name="old_password" /> */}
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "user_profile_tab_3_form_data_3_nueva_password"
                                )}{" "}
                                {/* Nueva contraseña */}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name={"new_password"}
                                value={values.new_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password"
                                placeholder=""
                                className={`form-control form-control-sm ${errors.new_password &&
                                  touched.new_password &&
                                  "is-invalid"}`}
                              />
                              <div
                                // className="text-center"
                                style={{ color: "#D54B4B" }}
                              >
                                {errors.new_password && touched.new_password ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="new_password" />
                              </div>
                              {/* <ErrorMessage name={"new_password"} /> */}
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "user_prifile_tab_3_form_data_3_confirmar_password"
                                )}{" "}
                                {/* Confirmar nueva contraseña */}
                                <span className="text-danger"> * </span>{" "}
                              </label>
                              <input
                                name={"confirm_password"}
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password"
                                className={`form-control form-control-sm ${errors.confirm_password &&
                                  touched.confirm_password &&
                                  "is-invalid"}`}
                                placeholder=""
                              />
                              <div
                                // className="text-center"
                                style={{ color: "#D54B4B" }}
                              >
                                {errors.confirm_password &&
                                touched.confirm_password ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="confirm_password" />
                              </div>
                              {/* <ErrorMessage name={"confirm_password"} /> */}
                            </div>
                          </form>
                        </CardBody>
                        <CardFooter>
                          <div className="float-right">
                            <button
                              type="submit"
                              className="btn btn-outline-secondary btn-sm"
                              disabled={isSubmitting}
                              onClick={e => {
                                e.preventDefault();
                                handleSubmit();
                              }}
                            >
                              {isSubmitting ? (
                                <div>
                                  {" "}
                                  <i className="fa fa-refresh fa-spin" />{" "}
                                  {t("user_profile_tab_3_form_data_3_button")}
                                </div>
                              ) : (
                                <div>
                                  <i className="fa fa-refresh" />{" "}
                                  {t("user_profile_tab_3_form_data_3_button")}
                                </div>
                              )}
                            </button>
                          </div>
                        </CardFooter>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Fragment>
            );
          }}
        </Formik>
      </Fragment>
    );
  }
}

ChangepasswordForm.propTypes = {
  authorization: PropTypes.string.isRequired
};
export default ChangepasswordForm;
