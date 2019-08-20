import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Formik, Field, ErrorMessage, withFormik } from "formik";
import * as Yup from "yup";
import { Row, Col, CustomInput } from "reactstrap";
import axios from "axios";
import { CsvToHtmlTable } from "react-csv-to-table";

class FormUploadFile extends React.Component {
  state = {
    file: null
  };

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    console.log(this.state.file);
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
                const formData = new FormData();
                const file = this.state.file;
                const separador = values.separador;
                formData.append("file", file);
                formData.append("separator", separador);
                setTimeout(() => {
                  axios
                    .post(
                      `http://192.168.10.180:7001/api/sgdea/conglomerate/import/jferrer`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data"
                        }
                      }
                    )
                    .then(response => response.json())
                    .catch(error => console.log("", error));
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
                        <form className="form">
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
                                <input
                                  type="file"
                                  className={"form-control"}
                                  onChange={e => this.onChange(e)}
                                />
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
        <br />
        <Row>
          <Col md={12}>
            <PreviewFile
              file={this.state.file}
              estilos={"table table-striped table-hover table-bordered"}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default FormUploadFile;

class PreviewFile extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }
    this.setState(
      {
        loading: true
      },
      () => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };

        reader.readAsBinaryString(nextProps.file);
      }
    );
  }
  render() {
    const { file } = this.props;
    const { loading } = this.state;
    const thumb = this.state.thumb;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    // console.log(thumb.toString());
    console.log(file.type);

    return <CsvToHtmlTable data={thumb} tableClassName={this.props.estilos} />;
  }
}
