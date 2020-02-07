import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import { withTranslation } from "react-i18next";
import { TEMPLATE_EMAIL, TEMPLATES_EMAIL } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { Alert, Toast, ToastBody, ToastHeader, Row, Col } from "reactstrap";
import "./../../../../node_modules/codemirror/lib/codemirror.css";
import "./../../../../node_modules/codemirror/theme/ambiance.css";
import "./../../../../node_modules/codemirror/mode/xml/xml";
import "./../../../../node_modules/codemirror/mode/htmlmixed/htmlmixed";
import "./../../../../node_modules/codemirror/mode/css/css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { css } from "glamor";
import ShowTemplateEdit from "./ShowTemplateEdit";

const PlantillaEmailForm = ({ match, authorization, t }) => {
  /* Estado data HTML-BODY STYLES-CSS */
  const [CodeCSS, setCodeCSS] = useState("");
  const [CodeBody, setCodeBody] = useState("");
  const [showTemplate, setShowTemplate] = useState("");
  /* Estado Alert */
  const [visible, setVisible] = useState(true);
  /* Estado del modal de previsualización */
  const [modalPreviewTemplate, setmodalPreviewTemplate] = useState(false);
  /* Estado que almacena Autorización y el Id de la plantilla */
  const [auth, setAuth] = useState(authorization);
  const [id, setId] = useState(match.params.id);
  /*  Estado data de la plantilla de correo electrónico*/
  const [dataPlantillaEmail, setDataPlantillaEmail] = useState({});
  /* js-beautify */
  const beautify_html = require("js-beautify").html;
  const beautify_css = require("js-beautify").css;

  const ref = useRef("child");

  const openModalTemplate = e => {
    e.preventDefault();
    ref.current.toggle();
  };

  const onDismiss = () => setVisible(false);

  useEffect(() => {
    getDataTemplateEmail();
    console.log(t);
  }, []);

  const getDataTemplateEmail = () => {
    const username = decode(auth);
    fetch(`${TEMPLATE_EMAIL}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer" + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        setDataPlantillaEmail(data);
        editor(data);
      })
      .catch(error => console.log(`Error ${error}`));
  };

  const editor = data => {
    const txtxhtml = document.getElementById("txthtml");
    const HTMLCode = CodeMirror.fromTextArea(txtxhtml, {
      mode: "htmlmixed",
      theme: "ambiance",
      lineNumbers: true
    });
    HTMLCode.on("change", value => {
      setCodeBody(value.getValue());
    });
    HTMLCode.setValue(beautify_html(data.body, { indent_size: 2 }));

    const txtcss = document.getElementById("txtcss");
    const CSSCode = CodeMirror.fromTextArea(txtcss, {
      mode: "css",
      theme: "ambiance",
      lineNumbers: true
    });
    CSSCode.on("change", value => {
      setCodeCSS(value.getValue());
    });
    CSSCode.setValue(beautify_css(data.css, { indent_size: 2 }));
  };

  const processTemplate = (renderHTML, renderCSS) => {
    renderHTML = CodeBody;
    renderCSS = CodeCSS;
    let template = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style type="text/css">${renderCSS}</style>
        </head>
        <body></
        </html>`;
    setTimeout(() => {
      Template((template += renderHTML));
    }, 2000);
    return template;
  };

  const Template = value => {
    setShowTemplate(value);
  };

  const template = processTemplate();

  const back = () => {
    let path = `#/configuracion/plantillaemail`;
    window.location.replace(path);
  };

  const instruccionesEdit = () => {
    if (dataPlantillaEmail.name === "filing-email-answer-template") {
      return (
        <div className="col-12">
          <Alert color="secondary" isOpen={visible} toggle={onDismiss}>
            {t("app_plantilla_email_modal_editar_alert_msg")}
            <br />
            {t("app_plantilla_email_modal_editar_alert_msg_2")}
            <div className="p-3 my-2 rounded">
              <Row>
                <Col md="4">
                  <Toast>
                    <ToastHeader>
                      {t(
                        "app_plantilla_email_modal_editar_alert_template_filing_asunto_"
                      )}
                    </ToastHeader>
                    <ToastBody>
                      {t(
                        "app_plantilla_email_modal_editar_alert_template_filing_asunto_2"
                      )}
                      <hr></hr>
                      {t(
                        "app_plantilla_email_modal_editar_alert_template_filing_asunto_3"
                      )}{" "}
                      <b>
                        {t(
                          "app_plantilla_email_modal_editar_alert_template_filing_asunto_4"
                        )}
                      </b>{" "}
                      {t(
                        "app_plantilla_email_modal_editar_alert_template_filing_asunto_5"
                      )}{" "}
                      <b>
                        <code style={{ color: "#FA1818" }}>
                          ${"{subject_received}"}
                        </code>
                      </b>{" "}
                      {t(
                        "app_plantilla_email_modal_editar_alert_template_filing_asunto_6"
                      )}
                    </ToastBody>
                  </Toast>
                </Col>
                <Col md="4">
                  <Toast>
                    <ToastHeader>
                      {" "}
                      {t("app_plantilla_email_modal_editar_alert_cuerpo_html")}
                    </ToastHeader>
                    <ToastBody>
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_2"
                      )}
                      <hr></hr>
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_3"
                      )}{" "}
                      <b>
                        {t(
                          "app_plantilla_email_modal_editar_alert_cuerpo_html_4"
                        )}
                      </b>{" "}
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_5"
                      )}{" "}
                      <br></br>
                      <b>
                        <code style={{ color: "#FA1818" }}>${"{sender}"}</code>,
                        &nbsp;
                        <code style={{ color: "#FA1818" }}>
                          ${"{subject_received}"}
                        </code>
                        , &nbsp;
                        <code style={{ color: "#FA1818" }}>
                          ${"{body_received}"}
                        </code>
                        , &nbsp;
                        <code style={{ color: "#FA1818" }}>
                          ${"{attacheds}"}
                        </code>
                      </b>{" "}
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_6"
                      )}
                    </ToastBody>
                  </Toast>
                </Col>
                <Col md="4">
                  <Toast>
                    <ToastHeader>
                      {" "}
                      {t("app_plantilla_email_modal_editar_alert_estilos_css")}
                    </ToastHeader>
                    <ToastBody>
                      {t(
                        "app_plantilla_email_modal_editar_alert_estilos_css_2"
                      )}
                    </ToastBody>
                  </Toast>
                </Col>
              </Row>
            </div>
          </Alert>
        </div>
      );
    } else if (dataPlantillaEmail.name === "password-reset-request-template") {
      return (
        <div className="col-12">
          <Alert color="secondary" isOpen={visible} toggle={onDismiss}>
            {t("app_plantilla_email_modal_editar_alert_msg")}
            <br />
            {t("app_plantilla_email_modal_editar_alert_msg_2")}
            <div className="p-3 my-2 rounded">
              <Row>
                <Col md="6">
                  <Toast>
                    <ToastHeader>
                      {" "}
                      {t("app_plantilla_email_modal_editar_alert_cuerpo_html")}
                    </ToastHeader>
                    <ToastBody>
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_2"
                      )}
                      <hr></hr>
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_3"
                      )}{" "}
                      <b>
                        {t(
                          "app_plantilla_email_modal_editar_alert_cuerpo_html_4"
                        )}
                      </b>{" "}
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_5"
                      )}{" "}
                      <br></br>
                      <b>
                        <code style={{ color: "#FA1818" }}>${"{user}"}</code>,
                        &nbsp;
                        <code style={{ color: "#FA1818" }}>
                          ${"{resetUrl}"}
                        </code>
                      </b>{" "}
                      {t(
                        "app_plantilla_email_modal_editar_alert_cuerpo_html_6"
                      )}
                    </ToastBody>
                  </Toast>
                </Col>
                <Col md="6">
                  <Toast>
                    <ToastHeader>
                      {" "}
                      {t("app_plantilla_email_modal_editar_alert_estilos_css")}
                    </ToastHeader>
                    <ToastBody>
                      {t(
                        "app_plantilla_email_modal_editar_alert_estilos_css_2"
                      )}
                    </ToastBody>
                  </Toast>
                </Col>
              </Row>
            </div>
          </Alert>
        </div>
      );
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        templateEmail_name: dataPlantillaEmail.name,
        templateEmail_description: dataPlantillaEmail.description,
        templateEmail_subject: dataPlantillaEmail.subject,
        templateEmail_from: dataPlantillaEmail.from,
        txthtml: CodeBody,
        txtcss: CodeCSS
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const userName = decode(auth);
        setTimeout(() => {
          fetch(`${TEMPLATES_EMAIL}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authorization
            },
            body: JSON.stringify({
              id: id,
              name: values.templateEmail_name,
              description: values.templateEmail_description,
              subject: values.templateEmail_subject,
              from: values.templateEmail_from,
              body: values.txthtml,
              css: values.txtcss,
              username: userName.user_name
            })
          })
            .then(response =>
              response.json().then(data => {
                if (response.status === 200) {
                  toast.success(
                    "Se edito la plantilla de correo electrónico con éxito.",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        marginTop: "60px"
                      })
                    }
                  );
                } else if (response.status === 400) {
                  toast.error(
                    "Error, la plantilla de correo electrónico ya existe.",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        marginTop: "60px"
                      })
                    }
                  );
                }
              })
            )
            .catch(error => {
              toast.error(`Error ${error}.`, {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
            });
          setSubmitting(false);
          resetForm({
            name: "",
            description: "",
            subject: "",
            from: "",
            body: "",
            html: ""
          });
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        templateEmail_name: Yup.string().required(
          " Por favor introduzca un nombre."
        ),
        templateEmail_description: Yup.string().required(
          " Por favor introduzca una descripción."
        ),
        templateEmail_subject: Yup.string().required(
          " Por favor introduzca el asunto."
        ),
        templateEmail_from: Yup.string().required(
          " Por favor introduzca el remitente."
        ),
        txthtml: Yup.string().required(
          " Por favor introduzca el cuerpo de la plantilla."
        ),
        txtcss: Yup.string().required(
          " Por favor introduzca el estilo de la plantilla."
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
          setFieldTouched,
          setFieldValue
        } = props;
        return (
          <div className="col-md-12">
            <form className="form">
              <ToastContainer />
              <div className="card">
                <div className="card-header">
                  {t("app_plantilla_email_modal_editar_titulo")}{" "}
                  {values.templateEmail_name}
                </div>
                <div className="card-body">
                  <div className="row">
                    {instruccionesEdit()}
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          {t("app_plantilla_email_modal_editar_nombre")}
                          <span className="text-danger">*</span>{" "}
                          <dd>
                            {" "}
                            <input
                              type="text"
                              name={"templateEmail_name"}
                              value={values.templateEmail_name}
                              disabled
                              className={`form-control form-control-sm ${errors.templateEmail_name &&
                                touched.templateEmail_name &&
                                "is-invalid"}`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.templateEmail_name &&
                              touched.templateEmail_name ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="templateEmail_name" />
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          {t("app_plantilla_email_modal_editar_descripcion")}
                          <span className="text-danger">*</span>{" "}
                          <dd>
                            {" "}
                            <textarea
                              style={{ resize: "none", overflow: "auto" }}
                              type="text"
                              name={"templateEmail_description"}
                              value={values.templateEmail_description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control form-control-sm ${errors.templateEmail_description &&
                                touched.templateEmail_description &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.templateEmail_description &&
                              touched.templateEmail_description ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="templateEmail_description" />
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          {t("app_plantilla_email_modal_editar_asunto")}
                          <span className="text-danger">*</span>{" "}
                          <dd>
                            {" "}
                            <input
                              type="text"
                              name={"templateEmail_subject"}
                              value={values.templateEmail_subject}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control form-control-sm ${errors.templateEmail_subject &&
                                touched.templateEmail_subject &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.templateEmail_subject &&
                              touched.templateEmail_subject ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="templateEmail_subject" />
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          {t("app_plantilla_email_modal_editar_from")}
                          <span className="text-danger">*</span>{" "}
                          <dd>
                            {" "}
                            <input
                              type="text"
                              name={"templateEmail_from"}
                              value={values.templateEmail_from}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`form-control form-control-sm ${errors.templateEmail_from &&
                                touched.templateEmail_from &&
                                "is-invalid"}`}
                            />
                            <div style={{ color: "#D54B4B" }}>
                              {errors.templateEmail_from &&
                              touched.templateEmail_from ? (
                                <i className="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="templateEmail_from" />
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-6" style={{ padding: 1 }}>
                      <label>
                        <b>
                          {t("app_plantilla_email_modal_editar_cuerpo_html")}{" "}
                          <u style={{ color: "red" }}>
                            <code>
                              {t(
                                "app_plantilla_email_modal_editar_cuerpo_html_2"
                              )}
                            </code>
                          </u>
                        </b>{" "}
                      </label>
                      <textarea
                        id="txthtml"
                        name="txthtml"
                        className={`form-control form-control-sm ${errors.txthtml &&
                          touched.txthtml &&
                          "is-invalid"}`}
                      ></textarea>
                      <div style={{ color: "#D54B4B" }}>
                        {errors.txthtml && touched.txthtml ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="txthtml" />
                      </div>
                    </div>
                    <div className="col-6" style={{ padding: 1 }}>
                      <label>
                        <b>
                          {t("app_plantilla_email_modal_editar_estilos_css")}{" "}
                          <u style={{ color: "red" }}>
                            <code>
                              {t(
                                "app_plantilla_email_modal_editar_estilos_css_2"
                              )}
                            </code>
                          </u>
                        </b>
                      </label>
                      <textarea
                        id="txtcss"
                        name="txtcss"
                        className={`form-control form-control-sm ${errors.txtcss &&
                          touched.txtcss &&
                          "is-invalid"}`}
                      ></textarea>
                      <div style={{ color: "#D54B4B" }}>
                        {errors.txtcss && touched.txtcss ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="txtcss" />
                      </div>
                    </div>
                    <div className="col-12" style={{ padding: 5 }}>
                      <button
                        className="btn btn-dark btn-sm btn-block"
                        onClick={e => {
                          openModalTemplate(e);
                        }}
                        style={{ margin: "1px" }}
                      >
                        <i className="fa fa-eye" />{" "}
                        {t("app_plantilla_email_modal_editar_btn_vista_previa")}
                      </button>
                    </div>
                  </div>
                </div>
                <ShowTemplateEdit
                  ref={ref}
                  template={showTemplate}
                  modal={modalPreviewTemplate}
                />
                <div className="card-footer">
                  <div className="pull-right">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {" "}
                      <i className="fa fa-pencil" />{" "}
                      {t("app_plantilla_email_modal_editar_btn_actualizar")}{" "}
                    </button>

                    <button
                      style={{ margin: 5 }}
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={e => {
                        back(e);
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t("app_plantilla_email_modal_editar_btn_cerrar")}{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};
PlantillaEmailForm.propTypes = {
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
export default withTranslation("translations")(PlantillaEmailForm);
