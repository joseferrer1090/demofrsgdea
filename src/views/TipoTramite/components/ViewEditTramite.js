import React, { useRef, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, Field } from "formik";
import { Col, CustomInput, ToastBody, Alert, Button } from "reactstrap";
import * as Yup from "yup";
import SelectConglomerado from "./component_viewEdit/SelectConglomerado";
import SelectEmpresa from "./component_viewEdit/SelectEmpresa";
import SelectSede from "./component_viewEdit/SelectSede";
import SelectDependencia from "./component_viewEdit/SelectDependencia";
import {
  TYPEPROCEDURE,
  USERS_BY_DEPENDENCE
} from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  agregarUserAction,
  borrarUserAction,
  agregarOriginal,
  obtenerTramiteEditarAction
} from "./../../../actions/typeProcedureAction";

const ViewEditTramite = ({ match, history, authorization, props }) => {
  const { users, data } = useSelector(state => ({
    users: state.typeProcedureReducer.tramite.users,
    data: state.typeProcedureReducer.tramite.typeProcedure
  }));
  const [auth, setAuth] = useState(authorization);
  const [id, setId] = useState(match.params.id);
  const [response, setResponse] = useState({});

  const usersData = useSelector(state => state.typeProcedureReducer);
  const dispatch = useDispatch();

  console.log(users);
  console.log(data);

  //console.log(datainitial);
  //console.log(datainitialusers);

  useEffect(() => {
    dispatch(obtenerTramiteEditarAction(id));
    getDataTipoTramite();
  }, []);

  const getDataTipoTramite = () => {
    const username = decode(auth);
    fetch(`${TYPEPROCEDURE}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        setResponse(data.typeProcedure);
        console.log(data.users);
        //console.log(data.users);
        //setDataUsers(data.users);
        //setData(data);
      })
      .catch(err => console.log(`err => ${err}`));
  };
  console.log(response.code);
  console.log(response.name);
  console.log(response.description);
  console.log(response.issue);
  console.log(response);
  //console.log(auth);
  //console.log(id);
  //console.log(usersData);

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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        tipocorrespondencia: Yup.string()
          .ensure()
          .required(" Por favor seleccione el tipo de correspondencia."),
        codigo: Yup.string().required(" Por favor introduzca un código."),
        nombre: Yup.string().required(" Por favor introduzca un nombre."),
        descripcion: Yup.string().required(
          " Por favor introduzca una descripción."
        ),
        d_maximos: Yup.number()
          .integer()
          .positive()
          .required(" Por favor introduzca los días máximos de respuesta."),
        estado: Yup.bool().test("Activado", "", value => value === true)
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldTouched,
          setFieldValue
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
                                        authorization={auth}
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
                                        authorization={auth}
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
                                        authorization={auth}
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
                                        authorization={auth}
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
                                    <UserList
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
                        <UserListEnabled />
                      </div>
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

function UserList(props) {
  const t = props.t;
  const id = props.id;
  const auth = props.authorization;

  const [data, setData] = useState([]);
  const firstUpdate = useRef(true);

  const dispatch = useDispatch();
  const AgregarUsuario = user => dispatch(agregarUserAction(user));

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
        setData(data);
        // console.log(data);
      })
      .catch(err => console.log("Error", err));
    //console.log("componentDidUpdate");
  }, [id]);

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
          <p>No hay usuarios</p>
          // <p>{t("app_tipoTramite_form_registrar_placeholder_select")}</p>
        )}
      </div>
    </div>
  );
}
const UserListEnabled = props => {
  //const [users, setUser] = useState(props.data);
  const x = useSelector(state => state.typeProcedureReducer.assigned);
  const users = useSelector(state => state.typeProcedureReducer.tramite);

  // useEffect(() => {
  //   if (props.data !== users) {
  //     setUser(props.data);
  //   }
  // }, [props.data]);

  console.log(users.users);

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
  const t = props.t;
  // console.log(useSelector(state => state.typeProcedureReducer));
  // console.log(users.users);
  return (
    <div className="col-md-12">
      {notificacion({ x })}
      <div className="card">
        <div className="p-2 mb-1 bg-light text-dark">
          Tabla de usuarios asignados
          {/* {t("app_tipoTramite_form_registrar_titulo_3")} */}
        </div>
        <div className="card-body">
          <div>
            <div className="row">
              <div className="col-md-12">
                {Object.keys(users).length === 0 ? (
                  <p className="text-center">
                    {" "}
                    <b>
                      Usuarios asiganado
                      {/* {t("app_tipoTramite_form_registrar_usuarios_disponibles")}{" "} */}
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

export default withTranslation("translations")(ViewEditTramite);
