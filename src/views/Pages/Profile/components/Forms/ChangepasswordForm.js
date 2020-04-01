import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Alert,
  Card,
  CardBody,
  Row,
  Col,
  CardFooter
} from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { decode } from "jsonwebtoken";
// import { USER } from "../../../services/EndPoints";
import { UPDATE_PROFILE_PASSWORD } from "../../../../../services/EndPoints";

class ChangepasswordForm extends React.Component {
  state = {
    // modal: this.props.modalpassword,
    // id: this.props.id,
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
          onSubmit={(values, { setSubmitting }) => {
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
                  id: ""
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
              // resetForm({
              //   old_password: "",
              //   new_password: "",
              //   confirm_password: ""
              // });
            }, 5000);
          }}
          validationSchema={Yup.object().shape({
            old_password: Yup.string().required(
              "Necesario validar su clave antigua."
            ),
            new_password: Yup.string()
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
                "Contraseña no valida, la contraseña debe tener al menos una letra en mayuscula, al menos un dígito, no acepta espacios en blanco y al menos un carácter especial."
              )
              .required("Es necesario digitar la nueva contraseña.")
              .min(8)
              .max(15),
            confirm_password: Yup.string()
              .oneOf(
                [Yup.ref("new_password"), null],
                "La contraseña no coincide."
              )
              .min(8)
              .max(15)
              .required("Es necesario repetir la contraseña.")
          })}
        >
          {props => {
            const {
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
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
                            {/* {t("user_profile_tab_3_form_data_3_text")} */}
                            Elige un contraseña unica para proteger tu cuenta
                            Escoge una contraseña que sea difícil de decifrar
                          </p>{" "}
                          <Alert
                            color="danger"
                            isOpen={this.state.alertError500}
                            toggle={this.onDismiss}
                          >
                            Error al cambiar la contraseña, intente nuevamente.
                          </Alert>
                          <Alert
                            color="success"
                            isOpen={this.state.alertSuccess}
                            // toggle={this.onDismiss}
                          >
                            {/* {t(
                              "app_usuarios_modal_cambiar_contraseña_alert_success"
                            )} */}
                            Se cambio la constraseña con éxito.
                          </Alert>
                          <Alert
                            className={"text-center"}
                            color="danger"
                            isOpen={this.state.alertError400}
                          >
                            {/* {t("app_usuarios_modal_actualizar_alert_error_400")} */}
                            Error al cambiar la contraseña, intente nuevamente.
                          </Alert>
                          <form className="form">
                            <div className="form-group">
                              <label>
                                {" "}
                                {/* {t(
                                  "user_profile_tab_3_form_data_3_actual_password"
                                )}{" "} */}
                                Contraseña actual
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
                              <ErrorMessage name="old_password" />
                            </div>
                            <div className="form-group">
                              <label>
                                {/* {" "}
                                {t(
                                  "user_profile_tab_3_form_data_3_nueva_password"
                                )}{" "} */}
                                Nueva contraseña
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name={"new_password"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password"
                                placeholder=""
                                className={`form-control form-control-sm ${errors.new_password &&
                                  touched.new_password &&
                                  "is-invalid"}`}
                              />
                              <ErrorMessage name={"new_password"} />
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                {/* {t(
                                  "user_prifile_tab_3_form_data_3_confirmar_password"
                                )}{" "} */}
                                Confirmar nueva contraseña
                                <span className="text-danger"> * </span>{" "}
                              </label>
                              <input
                                name={"confirm_password"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password"
                                className={`form-control form-control-sm ${errors.confirm_password &&
                                  touched.confirm_password &&
                                  "is-invalid"}`}
                                placeholder=""
                              />
                              <ErrorMessage name={"confirm_password"} />
                            </div>
                          </form>
                        </CardBody>
                        <CardFooter>
                          <div className="float-right">
                            <button
                              type="submit"
                              className="btn btn-outline-secondary btn-sm"
                              // disabled={isSubmitting}
                              onClick={e => {
                                e.preventDefault();
                                handleSubmit();
                              }}
                            >
                              <div>
                                <i className="fa fa-refresh" />{" "}
                                {/* {t("user_profile_tab_3_form_data_3_button")} */}
                                Actualizar contraseña
                              </div>
                              {/* {isSubmitting ? (
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
                                )} */}
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

// ChangepasswordForm.propTypes = {
//   modalpassword: PropTypes.bool.isRequired,
//   id: PropTypes.string.isRequired,
//   t: PropTypes.any,
//   authorization: PropTypes.string.isRequired
// };

export default ChangepasswordForm;

// import React, { useEffect, useState } from "react";
// import { Formik, withFormik, ErrorMessage, yupToFormErrors } from "formik";
// import * as Yup from "yup";
// import { Card, CardBody, CardFooter, Col, Row, Alert } from "reactstrap";
// import { withTranslation } from "react-i18next";
// import { decode } from "jsonwebtoken";
// import {
//   PASSWORD_RESET_REQUEST,
//   PASSWORD_RESET,
//   UPDATE_PROFILE_PASSWORD
// } from "../../../../../services/EndPoints";

// const ChangepasswordForm = props => {
//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     isSubmitting,
//     t
//   } = props;
//   // useEffect(() => {
//   //   console.log(props.authorization);
//   // }, [props.authorization]);
//   // alertSuccess: false,
//   // alertError400: false,
//   // alertError500: false,
//   const [alertSuccess, setAlertSuccess] = useState(false);
//   const [alertError400, setAlertError400] = useState(false);
//   const [alertError500, setalertError500] = useState(false);
//   return (
//     <div>
//       <Row>
//         <Col sm="12">
//           <Card>
//             <CardBody>
//               <p className="text-center">
//                 {t("user_profile_tab_3_form_data_3_text")}
//               </p>
//               <Alert
//                 color="danger"
//                 isOpen={alertError500}
//                 // toggle={this.onDismiss}
//               ></Alert>
//               <Alert
//                 color="success"
//                 isOpen={alertSuccess}
//                 // toggle={this.onDismiss}
//               >
//                 {t("app_usuarios_modal_cambiar_contraseña_alert_success")}
//               </Alert>
//               <Alert
//                 className={"text-center"}
//                 color="danger"
//                 isOpen={alertError400}
//               >
//                 {t("app_usuarios_modal_actualizar_alert_error_400")}
//               </Alert>
//               <form className="form">
//                 <div className="form-group">
//                   <label>
//                     {" "}
//                     {t("user_profile_tab_3_form_data_3_actual_password")}{" "}
//                     <span className="text-danger">*</span>{" "}
//                   </label>
//                   <input
//                     name="old_password"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.old_password}
//                     className={`form-control form-control-sm ${errors.old_password &&
//                       touched.old_password &&
//                       "is-invalid"}`}
//                     type="password"
//                     placeholder=""
//                   />
//                   <ErrorMessage name="old_password" />
//                 </div>
//                 <div className="form-group">
//                   <label>
//                     {" "}
//                     {t("user_profile_tab_3_form_data_3_nueva_password")}{" "}
//                     <span className="text-danger">*</span>{" "}
//                   </label>
//                   <input
//                     name={"new_password"}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     type="password"
//                     placeholder=""
//                     className={`form-control form-control-sm ${errors.new_password &&
//                       touched.new_password &&
//                       "is-invalid"}`}
//                   />
//                   <ErrorMessage name={"new_password"} />
//                 </div>
//                 <div className="form-group">
//                   <label>
//                     {" "}
//                     {t(
//                       "user_prifile_tab_3_form_data_3_confirmar_password"
//                     )}{" "}
//                     <span className="text-danger"> * </span>{" "}
//                   </label>
//                   <input
//                     name={"confirm_password"}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     type="password"
//                     className={`form-control form-control-sm ${errors.confirm_password &&
//                       touched.confirm_password &&
//                       "is-invalid"}`}
//                     placeholder=""
//                   />
//                   <ErrorMessage name={"confirm_password"} />
//                 </div>
//               </form>
//             </CardBody>
//             <CardFooter>
//               <div className="float-right">
//                 <button
//                   type="submit"
//                   className="btn btn-outline-secondary btn-sm"
//                   disabled={isSubmitting}
//                   onClick={handleSubmit}
//                 >
//                   {isSubmitting ? (
//                     <div>
//                       {" "}
//                       <i className="fa fa-refresh fa-spin" />{" "}
//                       {t("user_profile_tab_3_form_data_3_button")}
//                     </div>
//                   ) : (
//                     <div>
//                       <i className="fa fa-refresh" />{" "}
//                       {t("user_profile_tab_3_form_data_3_button")}
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </CardFooter>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default withTranslation("translations")(
//   withFormik({
//     mapPropsToValues: props => ({
//       new_password: props.changepassword.new_password,
//       confirm_password: props.changepassword.confirm_password,
//       old_password: props.changepassword.old_password
//     }),
//     validationSchema: Yup.object().shape({
//       old_password: Yup.string().required(
//         "Necesario validar su clave antigua."
//       ),
//       new_password: Yup.string()
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, // esta expresion regular valida la contraseña
//           "Contraseña no valida, la contraseña debe tener al menos una letra en mayuscula, al menos un dígito, no acepta espacios en blanco y al menos un carácter especial."
//         )
//         .required("Es necesario digitar la nueva contraseña.")
//         .min(8)
//         .max(15),
//       confirm_password: Yup.string()
//         .oneOf([Yup.ref("new_password"), null], "La contraseña no coincide.")
//         .min(8)
//         .max(15)
//         .required("Es necesario repetir la contraseña.")
//     }),
//     handleSubmit: (values, { setSubmitting, resetForm, props }) => {
//       setTimeout(() => {
//         const auth = props.authorization;
//         const username = decode(auth);
//         fetch(`${UPDATE_PROFILE_PASSWORD}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + props.authorization
//           },
//           body: JSON.stringify({
//             id: ""
//           })
//         })
//           .then(response => {
//             if (response.status === 500) {
//               console.log("500");
//               // setalertError500(true);
//               // this.setState({
//               //   alertError500: true
//               // });
//               // setTimeout(() => {
//               //   this.setState({
//               //     alertError500: false,
//               //     modal: !this.state.modal
//               //   });
//               // }, 3000);
//             } else if (response.status === 200) {
//               console.log("200");
//               // this.setState({
//               //   alertSuccess: true
//               // });
//               // setTimeout(() => {
//               //   this.setState({
//               //     alertSuccess: false,
//               //     modal: false
//               //   });
//               // }, 3000);
//             } else if (response.status === 400) {
//               console.log("400  ");
//               // this.setState({
//               //   alertError400: true
//               // });
//               // setTimeout(() => {
//               //   this.setState({
//               //     alertError400: false
//               //   });
//               // }, 3000);
//             }
//           })
//           .catch(error => console.log("", error));
//         setSubmitting(false);
//         resetForm({
//           old_password: "",
//           new_password: "",
//           confirm_password: ""
//         });
//       }, 500);
//     }
//   })(ChangepasswordForm)
// );
