import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import { Row, Col, CustomInput } from "reactstrap";
import * as Yup from "yup";

const TipoDocumentalRadicacion = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;
  return (
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
                            name={"tipo_correspondencia"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tipo_correspondencia}
                            className={`form-control form-control-sm ${errors.tipo_correspondencia &&
                              touched.tipo_correspondencia &&
                              "is-invalid"}`}
                          >
                            <option>Recibida</option>
                            <option>Despachada</option>
                            <option>Interna</option>
                          </select>
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.tipo_correspondencia && touched.tipo_correspondencia ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name={"tipo_correspondencia"} />
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
                            values={values.codigo}
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
                            type="text"
                            name={"nombre"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombre}
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
                            Descripción <span className="text-danger">*</span>{" "}
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
                            Días máximos de respuesta{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            name={"d_maximos_respuesta"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.d_maximos_respuesta}
                            type="number"
                            min={0}
                            className={`form-control form-control-sm ${errors.d_maximos_respuesta &&
                              touched.d_maximos_respuesta &&
                              "is-invalid"}`}
                          />
                          <div style={{ color: '#D54B4B' }}>
                            {
                              errors.d_maximos_respuesta && touched.d_maximos_respuesta ?
                              <i className="fa fa-exclamation-triangle"/> :
                              null
                            }
                          <ErrorMessage name={"d_maximos_respuesta"} />
                          </div>
                        </div>
                      </div>
                      <Col sm="12">
                        <div className="form-group">
                          <label>
                            {" "}
                            Estado <span className="text-danger">*</span>{" "}
                          </label>
                          <div className="text-justify">
                            <CustomInput
                              name={"estado"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.estados}
                              type="checkbox"
                              id="ExampleInputCheckbox"
                              label="Si esta opción se encuentra activada, Representa que
                    el tipo documental de radicacion es visible en el sistema y se podrán
                     realizar operaciones entre cada uno de los módulos
                     correspondientes de la aplicación. En caso contrario
                     la sede no se elimina del sistema solo quedará
                     inactiva e invisibles para cada uno de los módulos
                     correspondiente del sistema."
                              className={
                                errors.estado &&
                                touched.estado &&
                                "invalid-feedback"
                              }
                            />
                          </div>
                          {/* <p
                    className="text-muted"
                    style={{ textAlign: "justify" }}
                  >
                    {" "}
                    Si esta opción se encuentra activada, Representa que
                    la sede es visible en el sistema y se podrán
                    realizar operaciones entre cada uno de los módulos
                    correspondientes de la aplicación. En caso contrario
                    la sede no se elimina del sistema solo quedará
                    inactiva e invisibles para cada uno de los módulos
                    correspondiente del sistema.
                  </p> */}
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
                          disabled
                          placeholder="Usuarios disponibles de la consulta"
                          rows={8}
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
                              <td scope="row">NOMBRE COMPLETO DEL USUARIO</td>
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
                          <textarea className="form-control form-control-sm" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="p-2 mb-1 bg-light text-dark">Plantilla</div>
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
                <div className="p-2 mb-1 bg-light text-dark">Workflow</div>
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
        </div>
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    tipo_correspondencia: props.tdocumentalradicacion.tipo_correspondencia,
    codigo: props.tdocumentalradicacion.codigo,
    nombre: props.tdocumentalradicacion.nombre,
    descripcion: props.tdocumentalradicacion.descripcion,
    d_maximos_respuesta: props.tdocumentalradicacion.d_maximos_respuesta,
    estado: props.tdocumentalradicacion.estado,
    user_enabled: props.tdocumentalradicacion.user_enabled,
    asunto: props.tdocumentalradicacion.asunto,
    plantilla: props.tdocumentalradicacion.plantilla,
    workflow: props.tdocumentalradicacion.workflow
  }),
  validationSchema: Yup.object().shape({
    tipo_correspondencia: Yup.string()
      .ensure()
      .required(" Por favor seleccione el tipo de correspondencia."),
    codigo: Yup.string()
      .required(" Por favor introduzca un código. "),
    nombre: Yup.string()
      .required(" Por favor introduzca un nombre."),
    descripcion: Yup.string()
      .required(" Por favor introduzca una descripción."),
    d_maximos_respuesta: Yup.number()
      .positive()
      .integer()
      .required(" Por favor introduzca el número de días de respuesta."),
    estado: Yup.bool().test(
      "Activo",
      "Se necesita activar el tipo documental de radicacion",
      value => value === true
    ),
    user_enabled: Yup.array().of(
      Yup.object().shape({ id: Yup.number(), name: Yup.string() })
    ),
    plantilla: Yup.string()
      .notRequired(),
    workflow: Yup.string()
      .ensure()
      .notRequired(),
    asunto: Yup.string().notRequired()
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(TipoDocumentalRadicacion);
