import React, { Fragment } from "react";
import { Col, CustomInput } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import SelectConglomerado from "./component_viewEdit/SelectConglomerado";
import SelectEmpresa from "./component_viewEdit/SelectEmpresa";
import SelectSede from "./component_viewEdit/SelectSede";
import SelectDependencia from "./component_viewEdit/SelectDependencia";
import { TYPEPROCEDURE } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";

// Tener en cuenta hacer por redux el editar
// Agregar los types OBTENER_TIPO_TRAMITE, EDITAR_TIPO_TRAMITE
// OBETENER_TIPO_TRAMITE => debo traer toda la data y llenar todo el objecto
// EDITAR_TIPO_TRAMITE => debo editar el tramite por redux y hacer fetch para el put
// TOKEN => ya esta en la y la informaciuon del token para la peticon.
// Verificar como puedo pasar la informacion del token en el Action del TypeProceduteActions.
// Integrar redux en el formulario y verificar los state que se estan formando de manera global en la app

class ViewEditTable extends React.Component {
  state = {
    tipocorrespondencia: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    d_maximos: "",
    estado: "",
    auth: this.props.authorization,
    id: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
    this.getDateTipoTramite(this.state.id);
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    });
  }

  getDateTipoTramite = id => {
    const { auth } = this.state;
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
        console.log(data);
      })
      .catch(err => console.log(`err => ${err}`));
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  // componentDidMount() {
  //   this.getTipoTramiteInformation();
  //   this.getTipoTramiteData();
  // }

  // getTipoTramiteInformation() {
  //   fetch(TIPO_TRAMITE_EDIT)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         t_correspondencia: data.t_correspondencia,
  //         codigo: data.codigo,
  //         nombre: data.nombre,
  //         descripcion: data.descripcion,
  //         d_maximos: data.d_maximos,
  //         estado: data.estado
  //       });
  //       console.log(this.state);
  //     })
  //     .catch(error => console.log("Error", error));
  // }

  // getTipoTramiteData = () => {
  //   fetch(TIPO_CORRESPONDENCIA_SELECTED)
  //     .then(response => response.json())q
  //     .then(data => {
  //       this.setState({
  //         t_correspondencia_selected: data
  //       });
  //     })
  //     .catch(error => console.log(error));
  // };

  render() {
    const dataPreview = {
      tipocorrespondencia: this.state.tipocorrespondencia,
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      d_maximos: this.state.d_maximos,
      estado: this.state.estado
    };

    // const auxSelected = this.state.t_correspondencia_selected.map((aux, id) => {
    //   return (
    //     <option key={id} value={aux.id}>
    //       {aux.nombre}
    //     </option>
    //   );
    // });
    // console.log(this.props.match.params.id);
    // console.log(this.props.authorization);
    console.log(this.state.id);
    console.log(this.state.auth);
    return (
      <Formik
        initialValues={dataPreview}
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
            handleSubmit
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
                                          <span className="text-danger">
                                            *{" "}
                                          </span>
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
                                          value={values.description}
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
                                        <SelectConglomerado className="form-control form-control-sm" />
                                        {/* <select className="form-control form-control-sm">
                                            <option>Seleccione</option>
                                          </select> */}
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Empresa </label>
                                        <SelectEmpresa className="form-control form-control-sm" />
                                        {/* <select className="form-control form-control-sm">
                                            <option>Seleccione</option>
                                          </select> */}
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label> Sede </label>
                                        <SelectSede className="form-control form-control-sm" />
                                        {/* <select className="form-control form-control-sm">
                                            <option>Seleccione</option>
                                          </select> */}
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label> Dependencia </label>
                                        <SelectDependencia className="form-control form-control-sm" />
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
                                                <i className="fa fa-plus" />{" "}
                                                Agregar
                                              </button>
                                            </div>
                                          </div>
                                        </div> */}
                                      <textarea
                                        className="form-control form-control-sm"
                                        placeholder="Usuarios ya seleccionado"
                                        rows={8}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card">
                              <div className="p-2 mb-1 bg-light text-dark">
                                Usuarios disponibles
                              </div>
                              <div className="card-body">
                                <form>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <table className="table table-bordered table-sm">
                                        <thead className="thead-light">
                                          <tr className="text-center">
                                            <th scope="col">Usuario</th>
                                            <th scope="col">Sede</th>
                                            <th scope="col">Dependencia</th>
                                            <th scope="col">Original</th>
                                            <th scope="col">Eliminar</th>
                                          </tr>
                                        </thead>
                                        <tbody className="text-center">
                                          <tr>
                                            <td scope="row">
                                              NOMBRE COMPLETO DEL USUARIO
                                            </td>
                                            <td>SEDE I</td>
                                            <td>DEPENDENCIA I</td>
                                            <td>
                                              <CustomInput
                                                type="radio"
                                                id="exampleCustomCheckbox2"
                                              />{" "}
                                            </td>
                                            <td>
                                              {" "}
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                              >
                                                <i className="fa fa-trash" />
                                              </button>{" "}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
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
  }
}

export default ViewEditTable;
