import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage, Field } from "formik";
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
import FieldDependencia from "./components/SelectDependence";
import FieldCompany from "./components/SelectCompany";
import FieldSede from "./components/SelectHeadquarter";
import PropTypes from "prop-types";
import { TYPEPROCEDURE_POST } from "./../../../../services/EndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { USERS_BY_DEPENDENCE } from "./../../../../services/EndPoints";
import { decode } from "jsonwebtoken";

const TipoTramiteForm = props => {
  const { t } = props;
  const usersdata = useSelector(state => state.typeProcedureReducer);
  const [StateChangeAlert, setAux] = useState("");

  const users = usersdata.users;

  const [oldValueConglomerate, setOldValueConglomerate] = useState();
  const [newValueConglomerate, setNewValueConglomerate] = useState();

  const changeInValueConglomerate = (Old, New) => {
    setOldValueConglomerate(Old);
    setNewValueConglomerate(New);
  };

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
        estado: false,
        users: ""
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
        // workflow: Yup.string()
        //   .ensure()
        //   .required(" Por favor seleccione el WorkFlow."),
        // plantilla: Yup.string()
        //   .ensure()
        //   .required(" Por favor seleccione la plantilla.")
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
                  toast.success("Se registro el tipo de trámite con éxito.", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: "60px"
                    })
                  });
                } else if (response.status === 400) {
                  toast.error(
                    "Error al registrar  el tipo de trámite. Inténtelo nuevamente.",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        marginTop: "60px"
                      })
                    }
                  );
                } else if (response.status === 500) {
                  toast.error("Error, el tipo de trámite ya existe", {
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
          setAux(null);
          users.splice(0, users.length);
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
            dependencia: "",
            workflow: "",
            plantilla: ""
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
                    <ToastContainer />
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
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {t(
                                  "app_tipoTramite_form_registrar_descripcion"
                                )}{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>
                              <textarea
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
                                    changeInValueConglomerate(
                                      values.conglomerado,
                                      e.target.value
                                    );
                                  }}
                                  onBlur={() => {
                                    setFieldTouched("conglomerado", true);
                                  }}
                                  className="form-control form-control-sm"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {t("app_tipoTramite_form_registrar_empresa")}{" "}
                                </label>
                                <Field
                                  authorization={props.authorization}
                                  t={props.t}
                                  name="empresa"
                                  component={FieldCompany}
                                  oldValueConglomerateId={oldValueConglomerate}
                                  newValueConglomerateId={newValueConglomerate}
                                  conglomerado={values.conglomerado}
                                ></Field>
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
                                <Field
                                  authorization={props.authorization}
                                  t={props.t}
                                  name="sede"
                                  component={FieldSede}
                                  companyId={values.empresa}
                                  conglomerateId={values.conglomerado}
                                ></Field>
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
                                <Field
                                  authorization={props.authorization}
                                  t={props.t}
                                  name="dependencia"
                                  component={FieldDependencia}
                                  sedeId={values.sede}
                                  companyId={values.empresa}
                                  conglomerateId={values.conglomerado}
                                ></Field>

                                {/* <SelectDependencia
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
                                /> */}
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
                  <UserListEnabled
                    data={usersdata}
                    t={props.t}
                    aux={StateChangeAlert}
                  />
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
  let id = props.id;
  const [data, setdata] = useState([]);
  const firstUpdate = useRef(true);

  const dispatch = useDispatch();
  const AgregarUsuario = user => dispatch(agregarUserAction(user));

  const fetchNewValues = id => {
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
      })
      .catch(err => {
        console.log("Error", err);
        setdata([]);
      });
  };

  const validateValues = () => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchNewValues(id);
  };

  useEffect(() => {
    validateValues();
  }, [id]);

  return (
    <div>
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
                      <h6 className="badge badge-secondary">Agregar</h6>
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
  const aux = useSelector(state => state.typeProcedureReducer.assigned);
  const dispatch = useDispatch();
  const users = props.data;
  const t = props.t;
  const [state, setstate] = useState(aux);

  useEffect(() => {
    if (users.users.length === 0) {
      setstate(null);
    } else if (props.aux === null) {
      setstate(null);
    }
  }, [state, users, props.aux]);

  return (
    <div className="col-md-12">
      {state === true ? (
        <Alert color="success" fade={true}>
          Usuario asignado para recibir original.
        </Alert>
      ) : state === false ? (
        <Alert color="danger" fade={true}>
          Se deshabilito el usuario para recibir original.
        </Alert>
      ) : null}
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
                                className={"btn btn-secondary btn-sm"}
                                type="button"
                                onClick={() => {
                                  dispatch(agregarOriginal(aux.id));
                                  setstate(true);
                                  if (state === true || state === false) {
                                    setstate(null);
                                    setTimeout(() => {
                                      setstate(true);
                                    }, 300);
                                  }
                                }}
                              >
                                {" "}
                                Asignar original{" "}
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  dispatch(borrarUserAction(aux.id));
                                  setstate(false);
                                  if (state === true || state === false) {
                                    setstate(null);
                                    setTimeout(() => {
                                      setstate(false);
                                    }, 300);
                                  }
                                }}
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
