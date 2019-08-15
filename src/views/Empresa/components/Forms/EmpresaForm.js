import React,{useState, useEffect} from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput
} from "reactstrap";
import { CONGLOMERATES,COMPANYS } from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

const EmpresaForm = props =>{

  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  // console.log(`Errors: ${errors}`);
  // console.log(`Touched: ${touched}`);
const [optionsConglomerate, setOptionsConglomerate] = useState([]);

  useEffect (() => {
    getDataConglomerates()
  }, []);

  const getDataConglomerates = (data) => {
    fetch(CONGLOMERATES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsConglomerate(data)
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(" ", Error));
  };

  const mapOptionsConglomerate =
    optionsConglomerate.map((aux,idx)=>{
      return(
        <option value={aux.id}>{aux.name}</option>
      );
    });

  return (
    <div>
      <Card>
      <ToastContainer/>
        <CardHeader> Registro de empresa </CardHeader>
        <CardBody>
          <form className="form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Conglomerado <span className="text-danger">*</span>{" "}
                  </label>
                  <select
                    name="conglomerateId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`form-control form-control-sm ${errors.conglomerateId &&
                      touched.conglomerateId &&
                      "is-invalid"}`}
                    value={values.conglomerateId}
                  >
                    <option value={""} disabled>--Seleccione--</option>
                      {mapOptionsConglomerate}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.conglomerateId && touched.conglomerateId ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="conglomerateId" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Código <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code}
                    type="text"
                    className={`form-control form-control-sm ${errors.code &&
                      touched.code &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.code && touched.code ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="code" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Nit <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="nit"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nit}
                    className={`form-control form-control-sm ${errors.nit &&
                      touched.nit &&
                      "is-invalid"}`}
                    type="text"
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.nit && touched.nit ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="nit" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {" "}
                    Nombre <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    type="text"
                    className={`form-control form-control-sm ${errors.name &&
                      touched.name &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.name && touched.name ?
                    <i class="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="name" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label> Descripción </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label> Cargo responsable </label>
                  <select
                    name="chargeId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.chargeId}
                    className="form-control form-control-sm"
                  >
                    {" "}
                    <option value={""} disabled> -- Seleccione -- </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name="status"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="checkbox"
                          id="exampleCheck1"
                          label="Si esta opción se encuentra activada,
                                  Representa que la empresa es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario la empresa no se
                                  elimina del sistema solo quedará inactiva e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema."
                          className={
                            errors.status &&
                            touched.status &&
                            "invalid-feedback"
                          }
                          value={values.status}
                        />

                        {/* <p
                                  className="text-muted"
                                  style={{ textAlign: "justify" }}
                                >
                                  Si esta opción se encuentra activada,
                                  Representa que la empresa es visible en el
                                  sistema y se podrán realizar operaciones entre
                                  cada uno de los módulos correspondientes de la
                                  aplicación. En caso contrario la empresa no se
                                  elimina del sistema solo quedará inactiva e
                                  invisibles para cada uno de los módulos
                                  correspondiente del sistema.
                                </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter>
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
                  <i className="fa fa-save" /> Guardar
                </div>
              )}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    conglomerateId: props.empresa.conglomerateId,
    code: props.empresa.code,
    nit: props.empresa.nit,
    name: props.empresa.name,
    description: props.empresa.description,
    chargeId: props.empresa.chargeId,
    status: props.empresa.status
  }),
  validationSchema: Yup.object().shape({
    conglomerateId: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    code: Yup.string()
      .required(" Por favor introduzca un código.")
      .min(6, " Mínimo 6 caracteres.")
      .max(6, " Máximo 6 caracteres."),
    nit: Yup.number()
      .required(" Por favor introduzca el Nit.")
      .positive(" Nit debe ser positivo.")
      .integer(" Nit no acepta puntos, ni caracteres especiales."),
    name: Yup.string()
      .required(" Por favor introduzca un nombre.")
      .max(100, "Máximo 100 caracteres."),
    description: Yup.string().max(250),
    chargeId: Yup.string().ensure(),
    status: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el conglomerado",
        value => value === true
      )
      .required("Se debe aceptar la activacion de la empresa.")
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    const tipoEstado = data => {
      let tipo = null;
      if (data === true) {
        return (tipo = 1);
      } else if (data === false) {
        return (tipo = 0);
      }
      return null;
    };
    setTimeout(() => {
      fetch(COMPANYS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        },
        body: JSON.stringify({
          conglomerateId: values.conglomerateId,
          code: values.code,
          nit: values.nit,
          name: values.name,
          description: values.description,
          chargeId: values.chargeId,
          status: tipoEstado(values.status),
          userName: "jferrer"
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success("Se creo la empresa con exito", {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
              // alert("oki");
            } else if (response.status === 500) {
              toast.error("Error, la empresa ya existe", {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
              //alert("Erro en el cuerpo");
            }
          })
        )
        .catch(error => {
          toast.error(`Error ${error}`, {
            position: toast.POSITION.TOP_RIGHT,
            className: css({
              marginTop: "60px"
            })
          });
        });
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(EmpresaForm);
