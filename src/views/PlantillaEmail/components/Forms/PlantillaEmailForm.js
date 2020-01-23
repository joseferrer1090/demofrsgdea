import React, { useState, useEffect, useRef } from "react";
import ShowTemplate from "./ShowTemplate";
import CodeMirror from "codemirror";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import "./../../../../../node_modules/codemirror/lib/codemirror.css";
import "react-toastify/dist/ReactToastify.css";

const PlantillaEmailForm = props => {
  const { t } = props;
  const [CodeCSS, setCodeCSS] = useState("");
  const [CodeHTML, setCodeHTML] = useState("");
  const [showTemplate, setShowTemplate] = useState("");
  const [modalPreviewTemplate, setmodalPreviewTemplate] = useState(false);

  const processTemplate = (renderHTML, renderCSS) => {
    renderHTML = CodeHTML;
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
      mode: { name: "html", htmlMode: true },
      lineNumbers: true
    }).on("change", value => {
      setCodeHTML(value.getValue());
    });
    CodeMirror.fromTextArea(document.getElementById("txtcss"), {
      mode: { name: "html", htmlMode: true },
      lineNumbers: true
    }).on("change", value => {
      setCodeCSS(value.getValue());
    });
  };

  useEffect(() => {
    editor();
  }, []);

  const template = processTemplate();

  const openModalTemplate = () => {
    ref.current.toggle();
  };
  const ref = useRef("child");
  return (
    <div className="col-md-12">
      <form className="form">
        <div className="card">
          <div className="card-header">
            {t("app_plantilla_email_tab_title")}
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <textarea id="txthtml">{template}</textarea>
              </div>
              <div className=" editor-resizer css-editor-resizer"></div>
              <div className="col-6">
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
                onClick={() => console.log({ html: CodeHTML, css: CodeCSS })}
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
export default withTranslation("translations")(PlantillaEmailForm);
