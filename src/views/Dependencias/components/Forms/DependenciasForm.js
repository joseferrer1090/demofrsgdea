import React, {useState, useEffect}from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Row,
  Col,
  Buttom,
  CustomInput
} from "reactstrap";
import { CONGLOMERATES, COMPANYS, HEADQUARTERS, DEPENDENCIES, CHARGES } from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
const DependenciaForm = props => {
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

  const [optionsConglomerate, setOptionsConglomerate] = useState([]);
  const [optionsCompanys, setOptionsCompanys] = useState([]);
  const [optionsHeadquarters, setOptionsHeadquarters] = useState([]);
  const [optionsCharges, setOptionsCharges] = useState([]);


  useEffect (() => {
    getDataConglomerates();
    getDataCompanys();
    getDataHeadquarters();
    getDataCharges();
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

    const getDataCompanys = (data) => {
      fetch(COMPANYS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      })
        .then(response => response.json())
        .then(data => {
          setOptionsCompanys(data)
          // this.setState({
          //   dataConglomerates: data
          // });
        })
        .catch(Error => console.log(" ", Error));
    };

    const mapOptionsCompanys =
      optionsCompanys.map((aux,idx)=>{
        return(
          <option value={aux.id}>{aux.name}</option>
        );
      });

  const getDataHeadquarters = (data) => {
    fetch(HEADQUARTERS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa("sgdea:123456")
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsHeadquarters(data)
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(" ", Error));
  };

  const mapOptionsHeadquarters =
  optionsHeadquarters.map((aux,idx)=>{
      return(
        <option value={aux.id}>{aux.name}</option>
      );
    });

    const getDataCharges = (data) => {
      fetch(CHARGES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      })
        .then(response => response.json())
        .then(data => {
          setOptionsCharges(data)
          // this.setState({
          //   dataConglomerates: data
          // });
        })
        .catch(Error => console.log(" ", Error));
    };

    const mapOptionsCharges =
      optionsCharges.map((aux,idx)=>{
        return(
          <option value={aux.id}>{aux.name}</option>
        );
      });

  return (
    <div>
      <Row>
        <Col sm="8" md={{ offset: 2 }}>
          <Card>
          <ToastContainer/>
            <CardHeader>Registro de dependencia</CardHeader>
            <CardBody>
              <form className="form" role="form">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Conglomerado <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name="conglomerateId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.conglomerateId}
                        className={`form-control form-control-sm ${errors.conglomerateId &&
                          touched.conglomerateId &&
                          "is-invalid"}`}
                      >
                        <option value={""}>-- Seleccione --</option>
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
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Empresa <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name={"companyId"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.companyId}
                        className={`form-control form-control-sm ${errors.companyId &&
                          touched.companyId &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option value={""}> -- Seleccione --</option>
                        {mapOptionsCompanys}
                        {" "}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.companyId && touched.companyId ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="companyId" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        {" "}
                        Sede <span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        name={"headquarterId"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.headquarterId}
                        className={`form-control form-control-sm ${errors.headquarterId &&
                          touched.headquarterId &&
                          "is-invalid"}`}
                      >
                        <option value={""}>-- Seleccione --</option>
                          {mapOptionsHeadquarters}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.headquarterId && touched.headquarterId ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="headquarterId" />
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
                        name={"code"}
                        type="text"
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
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
                        Nombre <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        name={"name"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        type="text"
                        placeholder=""
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label> Descripción </label>
                      <textarea
                        name={"description"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className="form-control form-control-sm"
                      />
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.description && touched.description ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="description" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Cargo responsable <span className="text-danger">
                          *
                        </span>{" "}
                      </label>
                      <select
                        name={"chargeId"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.chargeId}
                        className={`form-control form-control-sm ${errors.chargeId &&
                          touched.chargeId &&
                          "is-invalid"}`}
                      >
                        {" "}
                        <option value={""}>-- Seleccione --</option>
                          {mapOptionsCharges}
                        {" "}
                      </select>
                      <div style={{ color: '#D54B4B' }}>
                      {
                        errors.chargeId && touched.chargeId ?
                        <i class="fa fa-exclamation-triangle"/> :
                        null
                      }
                      <ErrorMessage name="chargeId" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Estado <span className="text-danger">*</span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name={"status"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                          type="checkbox"
                          id="CheckboxEditDependencia"
                          label=" Si esta opción se encuentra activada, representa
                              que la dependencia es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario la dependencia no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema."
                          className={
                            errors.status &&
                            touched.status &&
                            "invalid-feedback"
                          }
                        />
                        {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que la dependencia es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario la dependencia no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema.
                            </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardBody>
            <CardFooter>
              <div className="float-right">
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
        </Col>
      </Row>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    conglomerateId: props.dependencia.conglomerateId,
    companyId: props.dependencia.companyId,
    headquarterId: props.dependencia.headquarterId,
    code: props.dependencia.code,
    name: props.dependencia.name,
    description: props.dependencia.description,
    chargeId: props.dependencia.chargeId,
    status: props.dependencia.status
  }),
  validationSchema: Yup.object().shape({
    conglomerateId: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    companyId: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
      headquarterId: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede."),
    code: Yup.string().required(" Por favor introduzca un código.")
    .min(6, " Mínimo 6 caracteres.")
    .max(6, " Máximo 6 caracteres."),
    name: Yup.string().required(" Por favor introduzca un nombre."),
    description: Yup.string(),
    chargeId: Yup.string()
      .required(" Por favor seleccione un cargo.")
      .ensure()
      .required(" Por favor seleccione el cargo."),
      status: Yup.bool().test(
      "Activo",
      "Es necesario activar el conglomerado.",
      value => value === true
    )
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
      fetch(DEPENDENCIES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        },
        body: JSON.stringify({
          description: values.description,
          code: values.code,
          name: values.name,
          headquarterId: values.headquarterId,
          chargeId: values.chargeId,
          status: tipoEstado(values.status),
          userName: "jferrer"
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success("Se creo la dependencia con exito", {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
              // alert("oki");
            } else if (response.status === 500) {
              toast.error("Error, la dependencia ya existe", {
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
})(DependenciaForm);
