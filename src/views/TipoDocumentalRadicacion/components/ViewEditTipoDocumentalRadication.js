import React, { useRef, useEffect, useState, Fragment } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Col, CustomInput, Alert } from "reactstrap";
import SelectConglomerado from "./component_viewEdit/SelectConglomerado";
import FieldCompany from "./component_viewEdit/SelectEmpresa";
import FieldHeadquarter from "./component_viewEdit/SelectSede";
import FieldDependence from "./component_viewEdit/SelectDependencia";
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerTipoDocumentalAction,
  agregarusuarioTipodocumentaleditar,
  borrarusuarioTipodocumentaleditar,
  asignarOriginalTipodocumentaleditar,
} from "./../../../actions/documentaryTypeAction";
import {
  TYPEDOCUMENTARY_SHOW,
  USERS_BY_DEPENDENCE,
  TYPEDOCUMENTARY_PUT,
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { withTranslation } from "react-i18next";
import { Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";

const ViewEditTipodocumental = ({ match, history, authorization, t }) => {
  const [auth, setAuth] = useState(authorization);
  const [id, setId] = useState(match.params.id);
  const [response, setResponse] = useState({});
  const [spinnerActualizar, setSpinnerActualizar] = useState(false);

  const dispatch = useDispatch();
  const usersData = useSelector(
    (state) => state.documentaryTypeReducer.tipodocumental.users
  );
  const userOriginal = useSelector(
    (state) => state.documentaryTypeReducer.tipodocumental.original
  );

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
        authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.typeDocumentary);
      })
      .catch((err) => console.log(`error ${err}`));
  };

  const back = (e) => {
    e.preventDefault();
    let path = `#/configuracion/tipodocumentalradicacion`;
    window.location.replace(path);
  };

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
        asunto: response.issue,
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
        estado: Yup.bool().test("Activado", "", (value) => value === true),
      })}
      onSubmit={(values, { setSubmitting, props, resetForm }) => {
        setSpinnerActualizar(true);
        const token = auth;
        const userName = decode(auth);
        const TipoEstado = (data) => {
          let tipo;
          if (data === true || data === 1) {
            return (tipo = 1);
          } else if (data === false || data === 0) {
            return (tipo = 0);
          }
          return 0;
        };
        setTimeout(() => {
          const token = authorization;
          const username = decode(auth);
          fetch(`${TYPEDOCUMENTARY_PUT}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authorization,
            },
            body: JSON.stringify({
              id: id,
              code: values.codigo,
              name: values.nombre,
              description: values.descripcion,
              answerDays: values.d_maximos,
              issue: values.asunto,
              status: TipoEstado(values.estado),
              typeCorrespondence: values.tipocorrespondencia,
              templateId: "ef41a67a-5acb-4d8a-8f7e-2d4709a02e7d",
              userName: username.user_name,
              users: usersData,
              original: userOriginal,
            }),
          })
            .then((response) =>
              response.json().then((data) => {
                if (response.status === 200) {
                  setSpinnerActualizar(false);
                  toast.success(
                    "Se actualizo el tipo documental de radicación con éxito.",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        marginTop: "60px",
                      }),
                    }
                  );
                  setTimeout(() => {
                    let path = `#/configuracion/tipodocumentalradicacion`;
                    window.location.replace(path);
                  }, 5000);
                } else if (response.status === 400) {
                  setSpinnerActualizar(false);
                  toast.error(
                    "Error al actualizar el tipo documental de radicación. Inténtelo nuevamente.",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        marginTop: "60px",
                      }),
                    }
                  );
                } else if (response.status === 500) {
                  setSpinnerActualizar(false);
                  toast.error(
                    "Error, el tipo documental de radicación ya esta asignado.",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        marginTop: "60px",
                      }),
                    }
                  );
                }
              })
            )
            .catch((error) => {
              setSpinnerActualizar(false);
              toast.error(`Error ${error}.`, {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: "60px",
                }),
              });
            });
          setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        } = props;
        return (
          <Fragment>
            <div className="animated fadeIn">
              <ToastContainer />
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card">
                            <div className="p-2 mb-1 bg-light text-dark">
                              {t("app_documentalRadicacion_actualizar_titulo")}
                            </div>
                            <div className="card-body">
                              <form className="form">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        {t(
                                          "app_documentalRadicacion_actualizar_tipo_correspondencia"
                                        )}{" "}
                                        <span className="text-danger">* </span>
                                      </label>
                                      <select
                                        name="tipocorrespondencia"
                                        value={values.tipocorrespondencia}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`form-control form-control-sm ${
                                          errors.tipocorrespondencia &&
                                          touched.tipocorrespondencia &&
                                          "is-invalid"
                                        }`}
                                      >
                                        <option value={" "}>
                                          --{" "}
                                          {t(
                                            "app_documentalRadicacion_actualizar_select_tipo_correspondencia"
                                          )}{" "}
                                          --
                                        </option>
                                        <option value={1}>
                                          {t(
                                            "app_documentalRadicacion_actualizar_select_tipo_correspondencia_recibida"
                                          )}
                                        </option>
                                        <option value={2}>
                                          {t(
                                            "app_documentalRadicacion_actualizar_select_tipo_correspondencia_despachada"
                                          )}
                                        </option>
                                        <option value={3}>
                                          {t(
                                            "app_documentalRadicacion_actualizar_select_tipo_correspondencia_interna"
                                          )}
                                        </option>
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
                                        {t(
                                          "app_documentalRadicacion_actualizar_codigo"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"codigo"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.codigo}
                                        type="text"
                                        className={`form-control form-control-sm ${
                                          errors.codigo &&
                                          touched.codigo &&
                                          "is-invalid"
                                        }`}
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
                                        {t(
                                          "app_documentalRadicacion_actualizar_nombre"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"nombre"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.nombre}
                                        type="text"
                                        className={`form-control form-control-sm ${
                                          errors.nombre &&
                                          touched.nombre &&
                                          "is-invalid"
                                        }`}
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
                                          "app_documentalRadicacion_actualizar_descripcion"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"descripcion"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.descripcion}
                                        type="text"
                                        className={`form-control form-control-sm ${
                                          errors.descripcion &&
                                          touched.descripcion &&
                                          "is-invalid"
                                        }`}
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
                                        {t(
                                          "app_documentalRadicacion_actualizar_dias_respuesta"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <input
                                        name={"d_maximos"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.d_maximos}
                                        type="number"
                                        className={`form-control form-control-sm ${
                                          errors.d_maximos &&
                                          touched.d_maximos &&
                                          "is-invalid"
                                        }`}
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
                                        {t(
                                          "app_documentalRadicacion_actualizar_estado"
                                        )}{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </label>
                                      <div className=" text-justify">
                                        <Field
                                          name="estado"
                                          render={({ field, form }) => {
                                            return (
                                              <CustomInput
                                                type="checkbox"
                                                id="CheckBoxEditRoles"
                                                label={t(
                                                  "app_documentalRadicacion_actualizar_estado_descripcion"
                                                )}
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
                              {t(
                                "app_documentalRadicacion_actualizar_titulo_2"
                              )}
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_documentalRadicacion_actualizar_conglomerado"
                                        )}{" "}
                                      </label>
                                      <SelectConglomerado
                                        t={t}
                                        authorization={authorization}
                                        name="conglomerado"
                                        value={values.conglomerado}
                                        onChange={(e) => {
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
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        {t(
                                          "app_documentalRadicacion_actualizar_empresa"
                                        )}{" "}
                                      </label>
                                      <Field
                                        authorization={auth}
                                        t={t}
                                        name="empresa"
                                        component={FieldCompany}
                                        conglomerateId={
                                          props.values.conglomerado
                                        }
                                        companyId={props.values.empresa}
                                      ></Field>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_documentalRadicacion_actualizar_sede"
                                        )}{" "}
                                      </label>
                                      <Field
                                        authorization={auth}
                                        t={t}
                                        name="sede"
                                        component={FieldHeadquarter}
                                        companyId={props.values.empresa}
                                        headquarterId={props.values.sede}
                                        conglomerateId={
                                          props.values.conglomerado
                                        }
                                      ></Field>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>
                                        {" "}
                                        {t(
                                          "app_documentalRadicacion_actualizar_dependencia"
                                        )}{" "}
                                      </label>
                                      <Field
                                        authorization={auth}
                                        t={t}
                                        name="dependencia"
                                        component={FieldDependence}
                                        headquarterId={props.values.sede}
                                        conglomerateId={
                                          props.values.conglomerado
                                        }
                                        companyId={props.values.empresa}
                                      ></Field>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <UserList
                                      t={t}
                                      authorization={auth}
                                      id={values.dependencia}
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <UserListEnabled t={t} />
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="card">
                            <div className="p-2 mb-1 bg-light text-dark">
                              {t(
                                "app_documentalRadicacion_actualizar_titulo_4"
                              )}
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        {t(
                                          "app_documentalRadicacion_actualizar_asunto"
                                        )}
                                      </label>
                                      <textarea
                                        value={values.asunto}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control form-control-sm"
                                        // placeholder="Asunto ya cargado"
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
                              {t(
                                "app_documentalRadicacion_actualizar_titulo_5"
                              )}
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        {t(
                                          "app_documentalRadicacion_actualizar_plantilla"
                                        )}
                                      </label>
                                      <select className="form-control form-control-sm">
                                        <option>
                                          --{" "}
                                          {t(
                                            "app_documentalRadicacion_actualizar_plantilla_placeholder"
                                          )}{" "}
                                          --
                                        </option>
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
                              {t(
                                "app_documentalRadicacion_actualizar_titulo_6"
                              )}
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        {t(
                                          "app_documentalRadicacion_actualizar_workflow"
                                        )}
                                      </label>
                                      <select className="form-control form-control-sm">
                                        <option>
                                          --{" "}
                                          {t(
                                            "app_documentalRadicacion_actualizar_workflow_placeholder"
                                          )}{" "}
                                          --
                                        </option>
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
                          className="btn btn-success btn-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                          }}
                          disabled={spinnerActualizar}
                        >
                          {spinnerActualizar ? (
                            <i className=" fa fa-spinner fa-refresh" />
                          ) : (
                            <div>
                              {" "}
                              <i className="fa fa-pencil" />{" "}
                              {t(
                                "app_documentalRadicacion_actualizar_boton_actualizar"
                              )}{" "}
                            </div>
                          )}
                        </button>
                        <button
                          style={{ margin: 5 }}
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            back(e);
                          }}
                        >
                          {" "}
                          <i className="fa fa-times" />{" "}
                          {t(
                            "app_documentalRadicacion_actualizar_boton_cerrar"
                          )}
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

function UserList(props) {
  const t = props.t;
  const id = props.id;
  const [data, setData] = useState([]);
  const firstUpdate = useRef(true);

  const dispatch = useDispatch();
  const AgregarUsuario = (user) =>
    dispatch(agregarusuarioTipodocumentaleditar(user));

  const fetchNewValues = (id) => {
    fetch(`${USERS_BY_DEPENDENCE}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log("Error", err);
        setData([]);
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
          padding: "10px",
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
                      <h6 className="badge badge-secondary">
                        {t(
                          "app_documentalRadicacion_actualizar_user_list_btn_agregar"
                        )}
                      </h6>
                    </Button>
                  </div>
                </li>
              </ul>
            );
          })
        ) : (
          <p>
            {t(
              "app_documentalRadicacion_actualizar_placeholder_textarea_usuarios"
            )}
          </p>
        )}
      </div>
    </div>
  );
}

const UserListEnabled = (props) => {
  const t = props.t;
  const dispatch = useDispatch();
  const aux = useSelector((state) => state.documentaryTypeReducer.assigned);
  const users = useSelector(
    (state) => state.documentaryTypeReducer.tipodocumental
  );
  const [state, setstate] = useState(aux);

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
          {t("app_documentalRadicacion_actualizar_titulo_3")}
        </div>
        <div className="card-body">
          <div>
            <div className="row">
              <div className="col-md-12">
                {Object.keys(users).length === 0 ? (
                  <p className="text-center">
                    {" "}
                    <b>
                      {t(
                        "app_documentalRadicacion_actualizar_user_list_titulo"
                      )}
                    </b>{" "}
                  </p>
                ) : (
                  <table className="table table-bordered table-sm">
                    <thead className="thead-light">
                      <tr className="text-center">
                        <th scope="col">
                          {t(
                            "app_documentalRadicacion_actualizar_table_usuario"
                          )}
                        </th>
                        <th scope="col">
                          {t(
                            "app_documentalRadicacion_actualizar_table_original"
                          )}
                        </th>
                        <th scope="col">
                          {t(
                            "app_documentalRadicacion_actualizar_table_eliminar"
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {users.users.map((aux, id) => {
                        return (
                          <tr>
                            <td scope="row"> {aux.name} </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                  dispatch(
                                    asignarOriginalTipodocumentaleditar(aux.id)
                                  );
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
                                {t(
                                  "app_documentalRadicacion_actualizar_table_boton_orignal"
                                )}{" "}
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  dispatch(
                                    borrarusuarioTipodocumentaleditar(aux.id)
                                  );
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

export default withTranslation("translations")(ViewEditTipodocumental);
