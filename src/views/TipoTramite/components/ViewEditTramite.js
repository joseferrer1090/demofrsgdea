import React, { Fragment } from "react";
import { Col, CustomInput } from "reactstrap";
import { Formik, ErrorMessage, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";

class ViewEditTable extends React.Component {
  state = {
    t_correspondencia_selected:[],
    codigo: "",
    nombre: "",
    descripcion: "",
    d_maximos: "",
    estado: ""
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  componentDidMount() {
    this.getTipoTramiteInformation();
    this.getTipoTramiteData()
  }

  getTipoTramiteInformation() {
    fetch(`http://localhost:3001/tipotramite/1`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          t_correspondencia: data.t_correspondencia,
          codigo: data.codigo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          d_maximos: data.d_maximos,
          estado: data.estado
        });
        console.log(this.state);
      })
      .catch(error => console.log("Error", error));
}

  getTipoTramiteData = () => {
    fetch("http://localhost:3001/tipotramiteSelected")
      .then(response => response.json())
      .then(data => {
        this.setState({
          t_correspondencia_selected: data
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataPreview={
      t_correspondencia: this.state.t_correspondencia,
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      d_maximos: this.state.d_maximos,
      estado: this.state.estado
    }

    console.log(this.state.t_correspondencia_selected);
    const auxSelected = this.state.t_correspondencia_selected.map((aux, id) => {
      return (
        <option key={id} value={aux.id}>
          {aux.nombre}
        </option>
      );
    });
    console.log(auxSelected);

    return (
      <Fragment>
      <Formik
      initialValues={dataPreview}
      onSubmit={(values, {setSubmitting}) =>{
        setTimeout(()=>{
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false)
        },500)
      }}
      validationSchema={Yup.object().shape({
        t_correspondencia: Yup.string()
          .ensure()
          .required(" Por favor seleccione el tipo de correspondencia."),
        codigo: Yup.string()
          .required(" Por favor introduzca un código."),
        nombre: Yup.string()
          .required(" Por favor introduzca un nombre."),
        descripcion: Yup.string()
        .required(" Por favor introduzca una descripción."),
        d_maximos: Yup.number()
          .integer()
          .positive()
          .required(" Por favor introduzca los días máximos de respuesta."),
        estado: Yup.bool()
          .test(
            "Activado",
            "",
            value=> value === true
          ),
      })}
      >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return(
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
                                name={"t_correspondencia"}
                                value={values.t_correspondencia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control form-control-sm ${errors.t_correspondencia &&
                                  touched.t_correspondencia &&
                                  "is-invalid"}`}
                              >
                                {auxSelected}
                              </select>
                              <div style={{ color: '#D54B4B' }}>
                              {
                                errors.t_correspondencia && touched.t_correspondencia ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name={"t_correspondencia"} />
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Código <span className="text-danger">*</span>{" "}
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
                              <div style={{ color: '#D54B4B' }}>
                              {
                                errors.codigo && touched.codigo ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name={"codigo"} />
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Nombre <span className="text-danger">*</span>{" "}
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
                              <div style={{ color: '#D54B4B' }}>
                              {
                                errors.nombre && touched.nombre ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
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
                              <div style={{ color: '#D54B4B' }}>
                              {
                                errors.descripcion && touched.descripcion ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name={"descripcion"} />
                              </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Días máximos de respuesta{" "}
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
                              <div style={{ color: '#D54B4B' }}>
                              {
                                errors.d_maximos && touched.d_maximos ?
                                <i className="fa fa-exclamation-triangle"/> :
                                null
                              }
                              <ErrorMessage name={"d_maximos"} />
                              </div>
                              </div>
                            </div>
                            <Col sm="12">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Estado <span className="text-danger">
                                    *
                                  </span>{" "}
                                </label>
                                <div className=" text-justify">
                                <Field
                                name="estado"
                                render={({field, form}) =>{
                                  return(
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
                                  <ErrorMessage name="estado"/>
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
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Empresa </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> Sede </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label> Dependencia </label>
                                <select className="form-control form-control-sm">
                                  <option>Seleccione</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
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
                              </div>
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
                      <div className="p-2 mb-1 bg-light text-dark">Asunto</div>
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
                    onClick={e=>{
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
      </Fragment>
    );
  }
}

export default ViewEditTable;
