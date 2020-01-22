import React, { useRef, useEffect, useState, Fragment } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Col, CustomInput } from "reactstrap";
import SelectConglomerado from "./component_viewEdit/SelectConglomerado";
import SelectEmpresa from "./component_viewEdit/SelectEmpresa";
import SelectSede from "./component_viewEdit/SelectSede";
import SelectDependencia from "./component_viewEdit/SelectDependencia";
import { useSelector, useDispatch } from "react-redux";
import { obtenerTipoDocumentalAction } from "./../../../actions/documentaryTypeAction";
import { TYPEDOCUMENTARY_SHOW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { withTranslation } from "react-i18next";

const ViewEditTipodocumental = ({ match, history, authorization, props }) => {
  const [auth, setAuth] = useState(authorization);
  const [id, setId] = useState(match.params.id);
  const [response, setResponse] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerTipoDocumentalAction(id));
    getDataTypeDocumentary();
  }, []);

  const getDataTypeDocumentary = () => {
    const username = decode(auth);
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        setResponse(data.typeDocumentary);
      })
      .catch(err => console.log(`error ${err}`));
  };

  console.log(response);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        codigo: response.code,
        tipocorrespondencia: response.typeCorrespondence,
        nombre: response.name,
        descripcion: response.description,
        d_maximos: response.answerDays,
        estado: response.status,
        asunto: response.issue
      }}
      validationSchema={Yup.object().shape({
        tipocorrespondencia: Yup.string()
          .ensure()
          .required("Por favor seleccione el tipo de correspondencia."),
        codigo: Yup.string().required("Por favor introduzca el código."),
        nombre: Yup.string().required("Por favor introduzaca el nombre."),
        descripcion: Yup.string().required(
          "Por favor introduzca la descripcion."
        ),
        d_maximos: Yup.number()
          .integer()
          .positive()
          .required("Por favor introduzca los dias maximos de respuesta."),
        estado: Yup.bool().test("Activado", "", value => value === true)
      })}
      onSubmit={(values, { setSubmitting, props }) => {
        const token = auth;
        const userName = decode(auth);
        const TipoEstado = data => {
          let tipo;
          if (data === true || data === 1) {
            return (tipo = 1);
          } else if (data === false || data === 0) {
            return (tipo = 0);
          }
          return 0;
        };
        setTimeout(() => {
          console.log(
            JSON.stringify(
              {
                id: id,
                code: values.codigo,
                name: values.nombre,
                description: values.descripcion,
                answerDays: values.d_maximos,
                issue: values.asunto,
                status: TipoEstado(values.estado),
                typeCorrespondence: values.tipocorrespondencia,
                templateId: "ef41a67a-5acb-4d8a-8f7e-2d4709a02e7d",
                userName: userName.user_name,
                users: "",
                original: "original"
              },
              2,
              null
            )
          );
          setSubmitting(false);
        }, 1000);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          setSubmitting
        } = props;
        return (
          <Fragment>
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card">
                            <div className="p-2 mb-1 bg-light text-dark">
                              Información básica
                            </div>
                            <div className="card-body">
                              <form className="form">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        Tipo de correspondencia{" "}
                                        <span className="text-danger">* </span>
                                      </label>
                                      <select
                                        name="tipocorrespondencia"
                                        value={values.tipocorrespondencia}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`form-control form-control-sm ${errors.tipocorrespondencia &&
                                          touched.tipocorrespondencia &&
                                          "is-invalid"}`}
                                      >
                                        <option value={" "}>
                                          -- Seleccione --
                                        </option>
                                        <option value={1}>Recibida</option>
                                        <option value={2}>Despachada</option>
                                        <option value={3}>Interna</option>
                                      </select>
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.tipocorrespondencia &&
                                        touched.tipocorrespondencia ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage
                                          name={"tipocorrespondencia"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        Código{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"codigo"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.codigo}
                                        type="text"
                                        className={`form-control form-control-sm ${errors.codigo &&
                                          touched.codigo &&
                                          "is-invalid"}`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.codigo && touched.codigo ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name={"codigo"} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        Nombre{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"nombre"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.nombre}
                                        type="text"
                                        className={`form-control form-control-sm ${errors.nombre &&
                                          touched.nombre &&
                                          "is-invalid"}`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.nombre && touched.nombre ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name={"nombre"} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        Descripción{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"descripcion"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.descripcion}
                                        type="text"
                                        className={`form-control form-control-sm ${errors.descripcion &&
                                          touched.descripcion &&
                                          "is-invalid"}`}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.descripcion &&
                                        touched.descripcion ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name={"descripcion"} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Días máximos de respuesta{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <input
                                        name={"d_maximos"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.d_maximos}
                                        type="number"
                                        className={`form-control form-control-sm ${errors.d_maximos &&
                                          touched.d_maximos &&
                                          "is-invalid"}`}
                                        min={0}
                                      />
                                      <div style={{ color: "#D54B4B" }}>
                                        {errors.d_maximos &&
                                        touched.d_maximos ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name={"d_maximos"} />
                                      </div>
                                    </div>
                                  </div>
                                  <Col sm="12">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        Estado{" "}
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </label>
                                      <div className=" text-justify">
                                        <Field
                                          name="estado"
                                          render={({ field, form }) => {
                                            return (
                                              <CustomInput
                                                type="checkbox"
                                                id="CheckBoxEditRoles"
                                                label=" Si esta opción se encuentra activada, representa
                                  que el rol es visible en el sistema y se podrán
                                  realizar operaciones entre cada uno de los módulos
                                  correspondientes de la aplicación. En caso
                                  contrario el rol no se elimina del sistema solo
                                  quedará inactivo e invisibles para cada uno de los
                                  módulos correspondiente del sistema."
                                                {...field}
                                                checked={field.value}
                                                className={
                                                  errors.estado &&
                                                  touched.estado &&
                                                  "invalid-feedback"
                                                }
                                              />
                                            );
                                          }}
                                        />
                                        <ErrorMessage name="estado" />
                                      </div>
                                    </div>
                                  </Col>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card">
                            <div className="p-2 mb-1 bg-light text-dark">
                              Usuarios disponibles
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label> Conglomerado </label>
                                      <SelectConglomerado
                                        authorization={authorization}
                                        name="conglomerado"
                                        value={values.conglomerado}
                                        onChange={e => {
                                          setFieldValue(
                                            "conglomerado",
                                            e.target.value
                                          );
                                        }}
                                        onBlur={() => {
                                          setFieldTouched("conglomerado", true);
                                        }}
                                        className="form-control form-control-sm"
                                      />
                                      {/* <select className="form-control form-control-sm">
                                            <option>Seleccione</option>
                                          </select> */}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Empresa </label>
                                      <SelectEmpresa
                                        authorization={authorization}
                                        idConglomerado={values.conglomerado}
                                        t={props.t}
                                        name="empresa"
                                        value={values.empresa}
                                        onChange={e => {
                                          setFieldValue(
                                            "empresa",
                                            e.target.value
                                          );
                                        }}
                                        onBlur={() => {
                                          setFieldTouched("empresa", true);
                                        }}
                                        className={
                                          "form-control form-control-sm"
                                        }
                                      />
                                      {/* <select className="form-control form-control-sm">
                                            <option>Seleccione</option>
                                          </select> */}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label> Sede </label>
                                      <SelectSede
                                        authorization={authorization}
                                        idEmpresa={values.empresa}
                                        name="sede"
                                        value={values.sede}
                                        onChange={e => {
                                          setFieldValue("sede", e.target.value);
                                        }}
                                        onBlur={() => {
                                          setFieldTouched("sede", true);
                                        }}
                                        className="form-control form-control-sm"
                                      />
                                      {/* <select className="form-control form-control-sm">
                                            <option>Seleccione</option>
                                          </select> */}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label> Dependencia </label>
                                      <SelectDependencia
                                        authorization={authorization}
                                        idSede={values.sede}
                                        name="dependencia"
                                        value={values.dependencia}
                                        onChange={e => {
                                          setFieldValue(
                                            "dependencia",
                                            e.target.value
                                          );
                                        }}
                                        onBlur={() => {
                                          setFieldTouched("dependencia", true);
                                        }}
                                        className={
                                          "form-control form-control-sm"
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    {/* <div className="form-group">
                                      <label> Buscar usuario </label>
                                      <div className="input-group input-group-sm">
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          aria-label="Dollar amount (with dot and two decimal places)"
                                        />
                                        <div
                                          className="input-group-append"
                                          id="button-addon4"
                                        >
                                          <button
                                            className="btn btn-secondary"
                                            type="button"
                                          >
                                            <i className="fa fa-search" />
                                          </button>
                                          <button
                                            className="btn btn-secondary"
                                            type="button"
                                          >
                                            <i className="fa fa-plus" /> Agregar
                                          </button>
                                        </div>
                                      </div>
                                    </div> */}
                                    {/*<UserList
                                      authorization={auth}
                                      id={values.dependencia}
                                    />*/}
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">{/* <UserListEnabled />*/}</div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="card">
                            <div className="p-2 mb-1 bg-light text-dark">
                              Asunto
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Asunto</label>
                                      <textarea
                                        value={values.asunto}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control form-control-sm"
                                        placeholder="Asunto ya cargado"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card">
                            <div className="p-2 mb-1 bg-light text-dark">
                              Plantilla
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Plantilla</label>
                                      <select className="form-control form-control-sm">
                                        <option>Seleccione</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card">
                            <div className="p-2 mb-1 bg-light text-dark">
                              Workflow
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Workflow</label>
                                      <select className="form-control form-control-sm">
                                        <option>Seleccione</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="float-right">
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
                </div>
              </div>
            </div>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default withTranslation("translations")(ViewEditTipodocumental);
