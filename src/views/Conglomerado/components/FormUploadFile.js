import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Formik, Field, ErrorMessage, withFormik } from "formik";
import * as Yup from "yup";
import { Row, Col, CustomInput } from "reactstrap";

class FormUploadFile extends React.Component {
  state = {
    document: ""
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col md="4">
            <div className="list-group">
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">1. Paso</h5>
                </div>
                <p className="mb-1" style={{ textAlign: "justify" }}>
                  Descargue la plantilla de formato de importación de datos
                  (Link). Abre el archivo , proceda a rellenar los campos
                  indicados en el formato y guarde los cambios.
                </p>
              </a>
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">2. Paso</h5>
                </div>
                <p className="mb-1" style={{ textAlign: "justify" }}>
                  Si desea importar un archivo plano debe indicar el separador
                  de los campos. Si el primer registro del archivo contiene los
                  títulos debe marcar el check “Títulos”.
                </p>
              </a>
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">3. Paso</h5>
                </div>
                <p className="mb-1" style={{ textAlign: "justify" }}>
                  Haga clic en la opción “Seleccionar archivo” y seleccione el
                  archivo de formato de importación de los datos al cual le
                  agrego los campos requeridos. Haga clic en la opción “Cargar
                  información”.
                </p>
              </a>
            </div>
          </Col>
          <Col md="8">
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(
                    JSON.stringify({
                      separador: values.separador,
                      titulos: values.titulos
                    })
                  );
                }, 1000);
              }}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset
                } = props;
                return (
                  <Fragment>
                    <div className="card">
                      <div className="card-body">
                        <form className="form" encType="multipart/form-data">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Separador{" "}
                                  <span>
                                    {" "}
                                    <b> (Para archivos planos) </b>{" "}
                                    <span className="text-danger">*</span>
                                  </span>{" "}
                                </label>
                                <input
                                  name={"separador"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.separador}
                                  type="text"
                                  className={`form-control form-control-sm ${errors.separador &&
                                    touched.separador &&
                                    "is-invalid"}`}
                                />
                                <div className="" style={{ color: "#D54B4B" }}>
                                  {errors.separador && touched.separador ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="separador" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Títulos</label>
                                <CustomInput
                                  name={"titulos"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.titulos}
                                  type="checkbox"
                                  id="ExampleInputCheckbox3"
                                  label="(El primer registro contiene los títulos de las columnas)"
                                  className={
                                    errors.titulos &&
                                    touched.titulos &&
                                    "invalid-feedback"
                                  }
                                />{" "}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  Archivo a importar en extnsion <b>CSV</b>{" "}
                                  <span className="text-danger"> * </span>
                                </label>
                                <input type="file" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer">
                        <div className="text-right">
                          <button
                            type="button"
                            className={"btn btn-outline-secondary btn-sm"}
                            onClick={e => {
                              e.preventDefault();
                              handleSubmit();
                            }}
                          >
                            <i className="fa fa-save" /> subir archivo
                          </button>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default FormUploadFile;
