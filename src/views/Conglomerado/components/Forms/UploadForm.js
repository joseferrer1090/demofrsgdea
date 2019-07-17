import React, { useState, Fragment, useEffect } from "react";
import { Formik, withFormik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Row, Col, CustomInput } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import { readFile } from "fs";

const UploadForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    setFieldValue
  } = props;

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
                Si desea importar un archivo plano debe indicar el separador de
                los campos. Si el primer registro del archivo contiene los
                títulos debe marcar el check “Títulos”.
              </p>
            </a>
            <a className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">3. Paso</h5>
              </div>
              <p className="mb-1" style={{ textAlign: "justify" }}>
                Haga clic en la opción “Seleccionar archivo” y seleccione el
                archivo de formato de importación de los datos al cual le agrego
                los campos requeridos. Haga clic en la opción “Cargar
                información”.
              </p>
            </a>
          </div>
        </Col>
        <Col md="8">
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
                      <ErrorMessage name={"separador"} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Títulos</label>
                      <CustomInput
                        name={"cabeza_titulos"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cabeza_titulos}
                        type="checkbox"
                        id="ExampleInputCheckbox3"
                        label="(El primer registro contiene los títulos de las columnas)"
                        className={
                          errors.estado && touched.estado && "invalid-feedback"
                        }
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Archivo a importar en extensión{" "}
                        <span>
                          {" "}
                          <b>CSV</b> <span className="text-danger"> * </span>
                        </span>{" "}
                      </label>
                      <br />
                      <input
                        name="archivo"
                        type="file"
                        onChange={event => {
                          setFieldValue(
                            event.target.name,
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${errors.archivo &&
                          touched.archivo &&
                          "is-invalid"}`}
                      />
                      <ErrorMessage name={"archivo"} />
                      {/* <input
                           id="real-file"
                           type="file"
                           className="form-control"
                           onChange={this.onChange}
                           accept={".csv"}
                         /> */}
                      {/* {console.log(this.state.data)} */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="pull-right">
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
                      <i className="fa fa-save" /> cargar informacion
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Fragment>
        <Row>
          <Col sm={12}>
            <PreviewFile
              file={values.archivo}
              estilos={"table table-striped table-hover table-bordered"}
            />
            {/* <CsvToHtmlTable
              data={}
              csvDelimiter=","
              tableClassName="table table-striped table-hover table-bordered"
            /> */}
          </Col>
        </Row>
      </Fragment>
    </Fragment>
  );
};
export default withFormik({
  mapPropsToValues: props => ({
    separador: props.importarmasivo.separador,
    cabeza_titulos: props.importarmasivo.cabeza_titulos
  }),
  validationSchema: Yup.object().shape({
    separador: Yup.string()
      .test("valor", "valor maximo 1 caracter", val => val.length === 1)
      .nullable(),
    cabeza_titulos: Yup.bool().test("Activado", "", value => value === true),
    archivo: Yup.mixed()
      .test("file size", "archivo no puede ser vacio", value => value.size > 0)
      .test("fileType", "extension no soportada", value =>
        ["application/vnd.ms-excel", "text/csv"].includes(value.type)
      )
      .nullable()
    // Yup.addMethod(Yup.array, "archivo", file => {
    //    console.log(file.size);
    //     return "this is not file valid";
    //    })
    //archivo: Yup.mixed()
    //  .test("file size", "File size is not null", value => value.size > 0)
    //  .test("fileType", "Unsupported File Format", value =>
    //     ["application/vnd.ms-excel", "text/csv"].includes(value.type)
    //   )
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(
        JSON.stringify(
          {
            separador: values.separador,
            cabeza_titulos: values.cabeza_titulos,
            fileName: values.archivo.name,
            type: values.archivo.type,
            size: `${values.archivo.size} bytes`
          },
          null,
          1
        )
      );
      //console.log(values);
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(UploadForm);

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

    console.log(thumb.toString());

    return <CsvToHtmlTable data={thumb} tableClassName={this.props.estilos} />;
  }
}
