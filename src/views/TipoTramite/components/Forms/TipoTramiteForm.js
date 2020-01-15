import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, CustomInput, Button, Alert } from "reactstrap";
import {
  agregarUserAction,
  borrarUserAction,
  agregarOriginal
} from "../../../../actions/typeProcedureAction";
import "react-toastify/dist/ReactToastify.css";
import { withTranslation } from "react-i18next";
import SelectConglomerado from "./components/SelectConglomerado";
import SelectDependencia from "./components/SelectDependence";
import SelectEmpresa from "./components/SelectCompany";
import SelectSede from "./components/SelectHeadquarter";
import PropTypes from "prop-types";
import { TYPEPROCEDURE_POST } from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { USERS_BY_DEPENDENCE } from "./../../../../services/EndPoints";
import { decode } from "jsonwebtoken";

const TipoTramiteForm = props => {
  const { t, authorization } = props;
  const usersdata = useSelector(state => state.users);
  const aux = useSelector(state => state.users.assigned);
  // console.log(props.authorization);
  console.log(aux);
  return (
    <Formik
      initialValues={{
        tipocorrespondencia: "",
        codigo: "",
        nombre: "",
        descripcion: "",
        d_maximos: "",
        conglomerado: "",
        empresa: "",
        sede: "",
        dependencia: "",
        estado: false
      }}
      validationSchema={Yup.object().shape({
        tipocorrespondencia: Yup.string()
          .ensure()
          .required(" Por favor seleccione el tipo de correspondencia."),
        codigo: Yup.string()
          .required(" Por favor introduzca un código.")
          .matches(/^[0-9a-zA-Z]+$/, " No es un codigo alfanumerico")
          .min(2, " minimo 2 caracteres para el codigo")
          .max(15, " maximo 15 caracteres para el codigo"),
        nombre: Yup.string().required(" Por favor introduzca un nombre."),
        descripcion: Yup.string().required(
          " Por favor introduzca una descripción."
        ),
        d_maximos: Yup.number()
          .integer()
          .positive()
          .required(" Por favor introduzca los días máximos de respuesta."),
        estado: Yup.bool()
          .test(
            "Activo",
            "Es necesario activar el tipo de trámite",
            value => value === true
          )
          .required(" Es necesario activar el tipo de trámite.")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const tipoEstado = data => {
          let tipo = null;
          if (data === true) {
            return (tipo = 1);
          } else if (data === false) {
            return (tipo = 0);
          }
          return null;
        };
        const tipoCorrespondencia = data => {
          let tipo = null;
          if (data === "1") {
            return (tipo = 1);
          } else if (data === "2") {
            return (tipo = 2);
          } else if (data === "3") {
            return (tipo = 3);
          }
          return null;
        };
        setTimeout(() => {
          const auth = props.authorization;
          const username = decode(auth);
          // console.log({
          //   code: values.codigo,
          //   name: values.nombre,
          //   description: values.descripcion,
          //   answerDays: values.d_maximos,
          //   issue: values.asunto,
          //   status: tipoEstado(values.estado),
          //   typeCorrespondence: values.tipocorrespondencia,
          //   templateId: "ef41a67a-5acb-4d8a-8f7e-2d4709a02e7d",
          //   userName: username.user_name,
          //   users: usersdata.users,
          //   original: usersdata.original
          // });
          fetch(`${TYPEPROCEDURE_POST}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + props.authorization
            },
            body: JSON.stringify({
              code: values.codigo,
              name: values.nombre,
              description: values.descripcion,
              answerDays: values.d_maximos,
              issue: values.asunto,
              status: tipoEstado(values.estado),
              typeCorrespondence: tipoCorrespondencia(
                values.tipocorrespondencia
              ),
              templateId: "ef41a67a-5acb-4d8a-8f7e-2d4709a02e7d",
              userName: username.user_name,
              users: usersdata.users,
              original: usersdata.original
            })
          })
            .then(response =>
              response.json().then(data => {
                if (response.status === 201) {
                  toast.success("Tipo de tramite creado con exito.", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px"
                    })
                  });
                } else if (response.status === 500) {
                  toast.error("Tipo de tramite existente", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px"
                    })
                  });
                }
              })
            )
            .catch(error => {
              toast.error(`Error ${error}.`, {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px"
                })
              });
            });
          setSubmitting(false);
          resetForm({
            tipocorrespondencia: "",
            codigo: "",
            nombre: "",
            descripcion: "",
            d_maximos: "",
            conglomerado: "",
            empresa: "",
            sede: "",
            dependencia: ""
          });
        }, 1000);
      }}
      render={({
        values,
        touched,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldTouched,
        setFieldValue
      }) => (
        <div className="col-md-12">
          <form className="form">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_1")}
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_tipoTramite_form_registrar_tipo_correspondencia"
                                )}{" "}
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
                                <option value={""}>
                                  {" "}
                                  --
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia"
                                  )}
                                  --{" "}
                                </option>
                                <option value={1}>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia_recibida"
                                  )}{" "}
                                </option>
                                <option value={2}>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia_despachada"
                                  )}{" "}
                                </option>
                                <option value={3}>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_select_tipo_correspondencia_interna"
                                  )}{" "}
                                </option>
                              </select>
                              <div style={{ color: "#D54B4B" }}>
                                {errors.tipocorrespondencia &&
                                touched.tipocorrespondencia ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="tipocorrespondencia" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t("app_tipoTramite_form_registrar_codigo")}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name="codigo"
                                onChange={e => {
                                  setFieldValue(
                                    "codigo",
                                    e.target.value.toUpperCase()
                                  );
                                }}
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
                                <ErrorMessage name="codigo" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {t("app_tipoTramite_form_registrar_nombre")}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name={"nombre"}
                                onChange={e => {
                                  setFieldValue(
                                    "nombre",
                                    e.target.value.toUpperCase()
                                  );
                                }}
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
                                {t(
                                  "app_tipoTramite_form_registrar_descripcion"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <input
                                name="descripcion"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.descripcion}
                                type="text"
                                className={`form-control form-control-sm ${errors.descripcion &&
                                  touched.descripcion &&
                                  "is-invalid"}`}
                              />
                              <div style={{ color: "#D54B4B" }}>
                                {errors.descripcion && touched.descripcion ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="descripcion" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_tipoTramite_form_registrar_dias_respuesta"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
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
                                {errors.d_maximos && touched.d_maximos ? (
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
                                {t(
                                  "app_tipoTramite_form_registrar_estado"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <div className="text-justify">
                                <CustomInput
                                  name={"estado"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.estado}
                                  type="checkbox"
                                  id="ExampleInputCheckbox"
                                  label={t(
                                    "app_tipoTramite_form_registrar_descripcion_estado"
                                  )}
                                  className={
                                    errors.estado &&
                                    touched.estado &&
                                    "invalid-feedback"
                                  }
                                />
                              </div>
                            </div>
                          </Col>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_2")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_conglomerado"
                                  )}{" "}
                                </label>
                                <SelectConglomerado
                                  authorization={props.authorization}
                                  t={props.t}
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
                                <label>
                                  {t("app_tipoTramite_form_registrar_empresa")}{" "}
                                </label>
                                <SelectEmpresa
                                  authorization={props.authorization}
                                  idConglomerado={values.conglomerado}
                                  t={props.t}
                                  name="empresa"
                                  value={values.empresa}
                                  onChange={e => {
                                    setFieldValue("empresa", e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("empresa", true);
                                  }}
                                  className={"form-control form-control-sm"}
                                />
                                {/* <select className="form-control form-control-sm">
                              <option>Seleccione</option>
                            </select> */}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_sede"
                                  )}{" "}
                                </label>
                                <SelectSede
                                  authorization={props.authorization}
                                  t={props.t}
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
                                <label>
                                  {" "}
                                  {t(
                                    "app_tipoTramite_form_registrar_dependencia"
                                  )}{" "}
                                </label>
                                <SelectDependencia
                                  authorization={props.authorization}
                                  t={props.t}
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
                                  className={"form-control form-control-sm"}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <UserList
                                authorization={props.authorization}
                                id={values.dependencia}
                                t={props.t}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <UserListEnabled data={usersdata} t={props.t} />
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_4")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {t("app_tipoTramite_form_registrar_asunto")}
                                </label>
                                <textarea
                                  name={"asunto"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.asunto}
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_5")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {t(
                                    "app_tipoTramite_form_registrar_plantilla"
                                  )}
                                </label>
                                <select
                                  name={"plantilla"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.plantilla}
                                  className="form-control form-control-sm"
                                >
                                  <option>
                                    --
                                    {t(
                                      "app_tipoTramite_form_registrar_select_plantilla"
                                    )}
                                    --
                                  </option>
                                  <option>Plantilla 1</option>
                                  <option>Plantilla 2</option>
                                  <option>Plantilla 3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="p-2 mb-1 bg-light text-dark">
                        {t("app_tipoTramite_form_registrar_titulo_6")}
                      </div>
                      <div className="card-body">
                        <div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {t("app_tipoTramite_form_registrar_workflow")}
                                </label>
                                <select
                                  name={"workflow"}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.workflow}
                                  className="form-control form-control-sm"
                                >
                                  <option>
                                    --{" "}
                                    {t(
                                      "app_tipoTramite_form_registrar_select_workflow"
                                    )}{" "}
                                    --
                                  </option>
                                  <option>Workflow1</option>
                                  <option>Workflow2</option>
                                  <option>Workflow3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <i className="fa fa-save" />{" "}
                        {t("app_tipoTramite_form_registrar_boton_guardar")}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    />
  );
};
function UserList(props) {
  const t = props.t;
  const id = props.id;
  const auth = props.authorization;

  const [data, setdata] = useState([]);
  const firstUpdate = useRef(true);

  const dispatch = useDispatch();
  const AgregarUsuario = user => dispatch(agregarUserAction(user));

  // const getDataUsers = () => {
  //   fetch(`http://192.168.20.187:7000/api/sgdea/user/dependence/${id}`,{
  //     method: "GET",
  //     headers: {
  //       "Content-Type":"application/json",
  //       Authorization: "Basic " + window.btoa('sgdea:123456')
  //     }
  //   }).then(response => response.json()).then(data => {
  //     setdata(data);
  //     console.log(data);
  //   }).catch(err => console.log("Error", err));
  // };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetch(`${USERS_BY_DEPENDENCE}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        setdata(data);
        // console.log(data);
      })
      .catch(err => console.log("Error", err));
    //console.log("componentDidUpdate");
  }, [id]);

  //console.log(id);

  return (
    <div>
      {/* <div className="form-group">
            <label> Buscar usuario <span className="text-danger">*</span> </label>
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
                
              </div>
            </div>
          </div> */}
      <div
        style={{
          height: "140px",
          overflow: "scroll",
          overflowX: "hidden",
          border: "1px solid #e3e3e3",
          background: "#e3e3e3",
          padding: "10px"
        }}
      >
        {data.length > 0 ? (
          data.map((aux, id) => {
            return (
              <ul className="list-unstyled">
                <li className="media">
                  <img
                    className="mr-2"
                    src="https://via.placeholder.com/40"
                    alt="Generic placeholder image"
                  />
                  <div className="media-body">
                    <p className="mt-0 mb-1">{aux.name}</p>
                    <Button
                      style={{ marginTop: "-13px", marginLeft: "-12px" }}
                      color={"link"}
                      onClick={() =>
                        AgregarUsuario({ id: aux.id, name: aux.name })
                      }
                    >
                      <h6 className="badge badge-secondary">agregar</h6>
                    </Button>
                  </div>
                </li>
              </ul>
            );
          })
        ) : (
          <p>{t("app_tipoTramite_form_registrar_placeholder_select")}</p>
        )}
      </div>
    </div>
  );
}

const UserListEnabled = props => {
  const x = useSelector(state => state.users.assigned);

  const notificacion = ({ x, visible }) => {
    if (x === null) {
      return;
    } else if (x === true) {
      return (
        <Alert isOpen={x} color="success" fade={true}>
          Usuario Asignado para recibir original
        </Alert>
      );
    } else if (x === false) {
      return (
        <Alert isOpen={x} color="danger" fade={true}>
          Se deshabilito el usuario para recibir original
        </Alert>
      );
    }
    return x;
  };
  const dispatch = useDispatch();
  const users = props.data;
  const t = props.t;
  // console.log(users.users);
  return (
    <div className="col-md-12">
      {notificacion({ x })}
      <div className="card">
        <div className="p-2 mb-1 bg-light text-dark">
          {t("app_tipoTramite_form_registrar_titulo_3")}
        </div>
        <div className="card-body">
          <div>
            <div className="row">
              <div className="col-md-12">
                {Object.keys(users.users).length === 0 ? (
                  <p className="text-center">
                    {" "}
                    <b>
                      {t("app_tipoTramite_form_registrar_usuarios_disponibles")}{" "}
                    </b>{" "}
                  </p>
                ) : (
                  <table className="table table-bordered table-sm">
                    <thead className="thead-light">
                      <tr className="text-center">
                        <th scope="col">Usuario</th>
                        <th scope="col">Original</th>
                        <th scope="col">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {users.users.map((aux, id) => {
                        return (
                          <tr>
                            <td scope="row">{aux.name}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(agregarOriginal(aux.id))
                                }
                              >
                                {" "}
                                asignar original{" "}
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  dispatch(borrarUserAction(aux.id))
                                }
                              >
                                <i className="fa fa-trash" />
                              </button>{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TipoTramiteForm.propTypes = {
  t: PropTypes.any,
  authorization: PropTypes.string.isRequired
};
export default withTranslation("translations")(TipoTramiteForm);
