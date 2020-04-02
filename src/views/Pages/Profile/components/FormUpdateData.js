import React, { Component, Fragment } from "react";
import { Card, CardBody, CardFooter, Row, Col, Alert } from "reactstrap";
import { withTranslation } from "react-i18next";
import { decode } from "jsonwebtoken";
import {
  SEARCH_BY_USERNAME,
  UPDATE_PROFILE
} from "./../../../../services/EndPoints";
import moment from "moment";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

class FormUpdateData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.authorization,
      dataPut: {},
      alertError500: false,
      alertError400: false,
      alertSuccess: false
    };
  }
  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
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
      setTimeout(() => {
        this.getProfileByID();
      }, 1000);
    }
  }

  getProfileByID = () => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${SEARCH_BY_USERNAME}/?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          // data: data,
          idProfile: data.id,
          dataPut: {
            profile_identification: data.identification,
            profile_name: data.name,
            profile_birthday: data.birthDate,
            profile_phone: data.phone,
            profile_address: data.address,
            profile_email: data.email,
            profile_username: data.username
          }
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  FormatDate = data => {
    return moment(data).format("YYYY-MM-DD");
  };

  render() {
    const { t } = this.props;
    const { dataPut } = this.state;

    return (
      <Fragment>
        <Formik
          enableReinitialize={true}
          initialValues={dataPut}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const auth = this.state.auth;
              const username = decode(auth);
              fetch(UPDATE_PROFILE, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + auth
                },
                body: JSON.stringify({
                  id: this.state.idProfile,
                  name: values.profile_name,
                  phone: values.profile_phone,
                  address: values.profile_address,
                  birthDate: values.profile_birthday,
                  userNameAuthenticate: values.profile_username
                })
              })
                .then(response => {
                  if (response.status === 200) {
                    this.setState({
                      alertSuccess: true
                    });
                    setTimeout(() => {
                      this.setState({
                        alertSuccess: false
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
                        alertError500: false
                      });
                    }, 3000);
                  }
                })
                .catch(error => console.log("", error));
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            profile_identification: Yup.string().required(
              " Por favor introduzca una identificación."
            ),
            profile_name: Yup.string().required(
              "Por favor introduzca un nombre."
            ),
            profile_birthday: Yup.date()
              .nullable()
              .notRequired(),
            profile_phone: Yup.string()
              .matches(
                /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                " Número no valido"
              )
              .length(10, " Mínimo 10 digitos")
              .required(" Por favor introduzca un número."),
            profile_address: Yup.string(),
            profile_email: Yup.string()
              .email(" Por favor introduzca un email valido.")
              .required(" Por favor introduzca un email."),
            profile_username: Yup.string().required(
              " Por favor introduzca un username"
            )
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
              isSubmitting
            } = props;
            return (
              <Fragment>
                <div className="animated fadeIn">
                  <Card>
                    <CardBody>
                      <div className="container">
                        <Alert
                          className={"text-center"}
                          color="danger"
                          isOpen={this.state.alertError500}
                        >
                          Error al actualizar el perfil. Intente nuevamente.
                        </Alert>
                        <Alert
                          className={"text-center"}
                          color="danger"
                          isOpen={this.state.alertError400}
                        >
                          Error al actualizar el perfil. Intente nuevamente.
                        </Alert>
                        <Alert
                          className={"text-center"}
                          color="success"
                          isOpen={this.state.alertSuccess}
                        >
                          Se ha actualizado el perfil con éxito.
                        </Alert>
                        <Row>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t("user_profile_tab_1_form_update_1_id")}{" "}
                              </label>
                              <input
                                disabled
                                name={"profile_identification"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.profile_identification}
                                type="text"
                                className={`form-control form-control-sm ${errors.profile_identification &&
                                  touched.profile_identification &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.profile_identification &&
                                touched.profile_identification ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={"profile_identification"} />
                              </div>
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {t("user_profile_tab_1_form_update_1_name")}{" "}
                              </label>
                              <input
                                type="text"
                                name={"profile_name"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.profile_name}
                                className={`form-control form-control-sm ${errors.profile_name &&
                                  touched.profile_name &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.profile_name && touched.profile_name ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={"profile_name"} />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="6">
                            <div className="form-group">
                              <p>
                                {" "}
                                {t(
                                  "user_profile_tab_1_from_update_1_date"
                                )}{" "}
                              </p>
                              <input
                                name={"profile_birthday"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={this.FormatDate(values.profile_birthday)}
                                type="date"
                                className="form-control form-control-sm"
                              />
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t("user_profile_tab_1_from_update_1_tel")}{" "}
                              </label>
                              <input
                                name={"profile_phone"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.profile_phone}
                                type="text"
                                className={`form-control form-control-sm ${errors.profile_phone &&
                                  touched.profile_phone &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.profile_phone &&
                                touched.profile_phone ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="profile_phone" />
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t("user_profile_tab_1_from_update_1_dir")}{" "}
                              </label>
                              <input
                                name={"profile_address"}
                                type="text"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.profile_address}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "user_profile_tab_1_from_update_1_email"
                                )}{" "}
                              </label>
                              <input
                                disabled
                                name={"profile_email"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.profile_email}
                                type="text"
                                className={`form-control form-control-sm ${errors.profile_email &&
                                  touched.profile_email &&
                                  "is-invalid"}`}
                              />
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="form-group">
                              <label>
                                {" "}
                                {t(
                                  "user_profile_tab_1_from_update_1_user"
                                )}{" "}
                              </label>
                              <input
                                disabled
                                name={"profile_username"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.profile_username}
                                type="text"
                                className={`form-control form-control-sm ${errors.profile_username &&
                                  touched.profile_username &&
                                  "is-invalid"}`}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
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
                              <i className="fa fa-refresh" />{" "}
                              {t("user_profile_tab_1_from_update_1_update")}{" "}
                            </div>
                          )}
                        </button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </Fragment>
            );
          }}
        </Formik>
      </Fragment>
    );
  }
}

export default withTranslation("translations")(FormUpdateData);
