import React, {useEffect, useState} from "react";
import { Formik, withFormik, ErrorMessage, yupToFormErrors } from "formik";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput,
  Table
} from "reactstrap";
import * as Yup from "yup";
import { CONGLOMERATES, COMPANYS, DEPENDENCIES, HEADQUARTERS, CHARGES} from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
const CargoForm = props => {
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
  const [optionsDependencies, setOptionsDependencies] = useState([]);

  useEffect (() => {
    getDataConglomerates();
    getDataCompany();
    getDataHeadquarters();
    getDataDependencies();
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

    const getDataCompany = (data) => {
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

        const getDataDependencies = (data) => {
          fetch(DEPENDENCIES, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + window.btoa("sgdea:123456")
            }
          })
            .then(response => response.json())
            .then(data => {
              setOptionsDependencies(data)
              // this.setState({
              //   dataConglomerates: data
              // });
            })
            .catch(Error => console.log(" ", Error));
        };

        const mapOptionsDependencies =
          optionsDependencies.map((aux,idx)=>{
            return(
              <option value={aux.id}>{aux.name}</option>
            );
          });


  return (
    <div className="row">
      <div className="col-md-6">
        <Card>
        <ToastContainer/>
          <CardHeader>Asignar responsabilidades</CardHeader>
          <CardBody>
            <Row>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Conglomerado <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable del conglomerado:
                  </p>
                  <select
                    name={"conglomerateId"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.conglomerateId}
                    className={`form-control form-control-sm ${errors.conglomerateId &&
                      touched.conglomerateId &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option value={""} disabled> Seleccione </option>{" "}
                    {mapOptionsConglomerate}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.conglomerateId && touched.conglomerateId ?
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name="conglomerateId" />
                  </div>
                  <br />
                  <CustomInput
                    name={"conglomerado_responsable"}
                    type="checkbox"
                    id="IdResponsableConglomerado"
                    label="Responsable ?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.conglomerado_responsable}
                    className={
                      errors.conglomerado_responsable &&
                      touched.conglomerado_responsable &&
                      "invalid-feedback"
                    }
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.conglomerado_responsable && touched.conglomerado_responsable ?
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name={"conglomerado_responsable"} />
                  </div>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Empresa <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable del empresa:
                  </p>
                  <select
                    name={"companyId"}
                    value={values.companyId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control form-control-sm ${errors.companyId &&
                      touched.companyId &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option value={""} disabled> Seleccione </option>{" "}
                    {mapOptionsCompanys}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.companyId && touched.companyId ?
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name={"companyId"} />
                  </div>
                  <br />
                  <CustomInput
                    name={"empresa_responsable"}
                    type="checkbox"
                    id="IdResponsableEmpresa"
                    label="Responsable ?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.empresa_responsable}
                    className={
                      errors.empresa_responsable &&
                      touched.empresa_responsable &&
                      "invalid-feedback"
                    }
                  />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Sede <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable de la Sede:
                  </p>
                  <select
                    name={"headquarterId"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.headquarterId}
                    className={`form-control form-control-sm ${errors.headquarterId &&
                      touched.headquarterId &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option value={""} disabled> Seleccione </option>{" "}
                    {mapOptionsHeadquarters}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.headquarterId && touched.headquarterId ?
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name={"headquarterId"} />
                  </div>
                  <br />
                  <CustomInput
                    name={"sede_responsable"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="checkbox"
                    id="IdResponsableSede"
                    label="Responsable ?"
                    className={
                      errors.estado && touched.estado && "invalid-feedback"
                    }
                  />
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <h5 className="card-title">
                    Dependencia <span className="text-danger">*</span>
                  </h5>
                  <p className="card-text text-justify">
                    Esta asignando este cargo como responsable de la
                    dependencia:
                  </p>
                  <select
                    name={"dependencyId"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dependencyId}
                    className={`form-control form-control-sm ${errors.dependencyId &&
                      touched.dependencyId &&
                      "is-invalid"}`}
                  >
                    {" "}
                    <option value={""} disabled> Seleccione </option>{" "}
                    {mapOptionsDependencies}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.dependencyId && touched.dependencyId ?
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name={"dependencyId"} />
                  </div>
                  <br />
                  <CustomInput
                    name={"dependencia_responsable"}
                    type="checkbox"
                    id="IdResponsableDependencia"
                    label="Responsable ?"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dependencia_responsable}
                    className={
                      errors.dependencia_responsable &&
                      touched.dependencia_responsable &&
                      "invalid-feedback"
                    }
                  />
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 ">
        <Card>
          <CardHeader> Registro de cargo </CardHeader>
          <CardBody>
            <div className="row">
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
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name={"code"} />
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
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={`form-control form-control-sm ${errors.name &&
                      touched.name &&
                      "is-invalid"}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                  {
                    errors.name && touched.name ?
                    <i className="fa fa-exclamation-triangle"/> :
                    null
                  }
                  <ErrorMessage name={"name"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label> Descripción</label>
                  <textarea
                    name={"description"}
                    className="form-control form-control-sm"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {" "}
                    Estado <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      name={"status"}
                      type="checkbox"
                      id="ExampleCheckboxInput"
                      label=" Si esta opción se encuentra activada, representa
                        que el cargo es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso
                        contrario el cargo no se elimina del sistema solo
                        quedará inactivo e invisibles para cada uno de los
                        módulos correspondiente del sistema."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.status && touched.status && "invalid-feedback"
                      }
                    />
                    {/* <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        Activar
                      </label> */}
                    {/* <p
                        className="text-muted"
                        style={{ textAlign: "justify" }}
                      >
                        Si esta opción se encuentra activada, representa
                        que el cargo es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso
                        contrario el cargo no se elimina del sistema solo
                        quedará inactivo e invisibles para cada uno de los
                        módulos correspondiente del sistema.
                      </p> */}
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    conglomerateId: props.cargo.conglomerateId,
    conglomerado_responsable: props.cargo.conglomerado,
    companyId: props.cargo.companyId,
    empresa_responsable: props.cargo.empresa,
    headquarterId: props.cargo.headquarterId,
    sede_responsable: props.cargo.sede_responsable,
    dependencyId: props.cargo.dependencyId,
    dependencia_responsable: props.cargo.dependencia_responsable,
    code: props.cargo.code,
    name: props.cargo.name,
    description: props.cargo.description,
    status: props.cargo.status
  }),
  validationSchema: Yup.object().shape({
    conglomerateId: Yup.string()
      .ensure()
      .required(" Por favor seleccione un conglomerado."),
    conglomerado_responsable: Yup.bool()
      .test("Activo", " Necesario activar responsable.", value => value === true)
      .required(" Necesario activar responsable"),
    companyId: Yup.string()
      .ensure()
      .required(" Por favor seleccione una empresa."),
    empresa_responsable: Yup.bool()
      .test("Activo", "Necesario activar responsable.", value => value === true)
      .required("Necesario activar el responsable."),
    headquarterId: Yup.string()
      .ensure()
      .required(" Por favor seleccione una sede."),
    sede_responsable: Yup.bool()
      .test(
        "Activo",
        "Necesario activar responsable de sede.",
        value => value === true
      )
      .required("Necesario activar responsable de sede."),
    dependencyId: Yup.string()
      .ensure()
      .required(" Por favor seleccione una dependencia."),
    dependencia_responsable: Yup.bool()
      .test(
        "Activo",
        "Necesario activar responsable de dependencia.",
        value => value === true
      )
      .required("necesario activar responsable de dependencia"),
    code: Yup.string().required(" Por favor introduzca un código.")
    .min(6, "Mínimo 6 caracteres.")
    .max(6, "Máximo 6 caracteres.")
    ,
    name: Yup.string().required(" Por favor introduzca un nombre."),
    description: Yup.string()
        .max(250, " Máximo 250 caracteres."),
    status: Yup.bool()
      .test("Activo", " Necesario activar el cargo. ", value => value === true)
      .required(" Se debe activar el cargo.")
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
      fetch(CHARGES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        },
        body: JSON.stringify({
          description: values.description,
          code: values.code,
          name: values.name,
          status: tipoEstado(values.status),
          userName: "jferrer"
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success("Se creo el cargo con exito", {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
              // alert("oki");
            } else if (response.status === 500) {
              toast.error("Error, el cargo ya existe", {
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
})(CargoForm);
