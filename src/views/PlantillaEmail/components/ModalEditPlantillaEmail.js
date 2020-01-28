import React, { useState, useEffect, useRef } from "react";
import ShowTemplate from "./Forms/ShowTemplate";
import CodeMirror from "codemirror";
import { withTranslation } from "react-i18next";
import { TEMPLATE_EMAIL } from "../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { Alert } from "reactstrap";
import "./../../../../node_modules/codemirror/lib/codemirror.css";
import "./../../../../node_modules/codemirror/theme/ambiance.css";
import "./../../../../node_modules/codemirror/mode/xml/xml";
import "./../../../../node_modules/codemirror/mode/htmlmixed/htmlmixed";
import "./../../../../node_modules/codemirror/mode/css/css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import { NonceProvider } from "react-select";

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
    <div className="col-md-12">
      <form className="form">
        <div className="card">
          <div className="card-header">
            Editar plantilla de correo electrónico
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <Alert color="secondary" isOpen={visible} toggle={onDismiss}>
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
                        value={dataPlantillaEmail.name}
                        disabled
                        className={`form-control form-control-sm`}
                      />
                      {/* <div style={{ color: "#D54B4B" }}>
                        {errors.templateEmail_name && touched.templateEmail_name ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="templateEmail_name" />
                      </div> */}
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
                        value={dataPlantillaEmail.description}
                        className={`form-control form-control-sm`}
                      />
                      {/* <div style={{ color: "#D54B4B" }}>
                        {errors.templateEmail_description && touched.templateEmail_description ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="templateEmail_description" />
                      </div> */}
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
                        value={dataPlantillaEmail.subject}
                        className={`form-control form-control-sm`}
                      />
                      {/* <div style={{ color: "#D54B4B" }}>
                        {errors.templateEmail_subject && touched.templateEmail_subject ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="templateEmail_subject" />
                      </div> */}
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
                        value={dataPlantillaEmail.from}
                        className={`form-control form-control-sm`}
                      />
                      {/* <div style={{ color: "#D54B4B" }}>
                        {errors.templateEmail_from && touched.templateEmail_from ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="templateEmail_from" />
                      </div> */}
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
                className="btn btn-outline-secondary btn-sm"
                data-trigger="hover"
                onClick={() => console.log({ html: CodeBody, css: CodeCSS })}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
PlantillaEmailForm.propTypes = {};
export default withTranslation("translations")(PlantillaEmailForm);
