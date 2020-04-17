import React, { useState, useEffect, useRef } from "react";
import ShowTemplate from "./ShowTemplate";
import CodeMirror from "codemirror";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "./../../../../../node_modules/codemirror/lib/codemirror.css";
import "./../../../../../node_modules/codemirror/theme/ambiance.css";
import "./../../../../../node_modules/codemirror/mode/xml/xml";
import "./../../../../../node_modules/codemirror/mode/css/css";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "reactstrap";
import { decode } from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";

const PlantillaEmailForm = props => {
  const { t } = props;
  const [CodeCSS, setCodeCSS] = useState("");
  const [codeBody, setCodeBody] = useState("");
  const [showTemplate, setShowTemplate] = useState("");
  const [visible, setVisible] = useState(true);
  const [modalPreviewTemplate, setmodalPreviewTemplate] = useState(false);

  const onDismiss = () => setVisible(false);

  const processTemplate = (renderHTML, renderCSS) => {
    renderHTML = codeBody;
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
        <body></body>
        </html>`;
    setTimeout(() => {
      Template((template += renderHTML));
    }, 2000);
    return template;
  };

  const Template = value => {
    setShowTemplate(value);
  };

  const editor = () => {
    CodeMirror.fromTextArea(document.getElementById("txthtml"), {
      mode: "text/html",
      theme: "ambiance",
      lineNumbers: true
    }).on("change", value => {
      setCodeBody(value.getValue());
    });
    CodeMirror.fromTextArea(document.getElementById("txtcss"), {
      mode: "css",
      theme: "ambiance",
      lineNumbers: true
    }).on("change", value => {
      setCodeCSS(value.getValue());
    });
  };

  useEffect(() => {
    editor();
  }, []);

  const openModalTemplate = () => {
    ref.current.toggle();
  };
  const ref = useRef("child");
  const template = processTemplate();
  return (
    <div className="col-md-12">
      <form className="form">
        <div className="card">
          <div className="card-header">
            {t("app_plantilla_email_tab_title")}
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <Alert color="secondary" isOpen={visible} toggle={onDismiss}>
                  En este apartado podrá crear una plantilla para envío de
                  correos electrónicos y almacenarla para su posterior
                  utilización (newsletter, comunicados, listas, circulares,
                  boletines, etc.).
                </Alert>
              </div>
              <div className="col-6" style={{ padding: 1 }}>
                <label clas>
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
            <ShowTemplate
              ref={ref}
              template={showTemplate}
              modal={modalPreviewTemplate}
            />
          </div>
          <div className="card-footer">
            <div className="pull-right">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {
                  openModalTemplate();
                }}
                style={{ margin: "1px" }}
              >
                Vista previa
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                data-trigger="hover"
                onClick={() => console.log({ html: codeBody, css: CodeCSS })}
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
PlantillaEmailForm.propTypes = {
  t: PropTypes.string.isRequired
};
export default withTranslation("translations")(PlantillaEmailForm);
