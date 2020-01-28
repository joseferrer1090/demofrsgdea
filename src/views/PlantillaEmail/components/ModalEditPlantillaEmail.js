import React, { useState, useEffect, useRef } from "react";
import ShowTemplate from "./Forms/ShowTemplate";
import CodeMirror from "codemirror";
import { withTranslation } from "react-i18next";
import { TEMPLATE_EMAIL, TEMPLATES_EMAIL } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { Alert } from "reactstrap";
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

const PlantillaEmailForm = ({ match, authorization, props }) => {
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
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        templateEmail_name: dataPlantillaEmail.name,
        templateEmail_description: dataPlantillaEmail.description,
        templateEmail_subject: dataPlantillaEmail.subject,
        templateEmail_from: dataPlantillaEmail.from
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const userName = decode(auth);
        setTimeout(() => {
          alert(JSON.stringify(values, "", 2));
          fetch(`${TEMPLATES_EMAIL}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authorization
            },
            body: JSON.stringify({
              id: id,
              name: "",
              description: "",
              subject: "",
              from: "",
              body: "",
              html: "",
              userName: userName.user_name
            })
          })
            .then(response =>
              response.json().then(data => {
                if (response.status === 201) {
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
              <div className="card">
                <div className="card-header">
                  Editar plantilla de correo electrónico
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <Alert
                        color="secondary"
                        isOpen={visible}
                        toggle={onDismiss}
                      >
                        En este apartado podrá editar una plantilla de correo
                        electrónico y almacenarla para su posterior utilización
                        (newsletter, comunicados, listas, circulares, boletines,
                        etc.).
                      </Alert>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          Nombre
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
                          Descripción
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
                          Asunto
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
                          De parte de
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
                          Cuerpo de la plantilla{" "}
                          <u style={{ color: "red" }}>
                            <code>HTML</code>
                          </u>
                        </b>{" "}
                      </label>
                      <textarea id="txthtml"></textarea>
                    </div>
                    <div className="col-6" style={{ padding: 1 }}>
                      <label>
                        <b>Estilos de la plantilla</b>{" "}
                        <u style={{ color: "red" }}>
                          <code>CSS</code>
                        </u>
                      </label>
                      <textarea id="txtcss"></textarea>
                    </div>
                  </div>
                </div>
                <ShowTemplate
                  ref={ref}
                  template={showTemplate}
                  modal={modalPreviewTemplate}
                />

                <div className="card-footer">
                  <div className="pull-right">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={e => {
                        openModalTemplate(e);
                      }}
                      style={{ margin: "1px" }}
                    >
                      Vista previa
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {" "}
                      <i className="fa fa-pencil" /> Actualizar{" "}
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
PlantillaEmailForm.propTypes = {};
export default withTranslation("translations")(PlantillaEmailForm);
