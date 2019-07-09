import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, Row, CustomInput } from "reactstrap";

const TipoTramite = props => {
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
  return (
    <div className="col-md-12">
      <form className="form">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">
                    Información básica
                  </div>
                  <div className="card-body">
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
                            <option>Recibida</option>
                            <option>Despachada</option>
                            <option>Interna</option>
                          </select>
                          <ErrorMessage name={"t_correspondencia"} />
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
                          <ErrorMessage name={"codigo"} />
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
                          <ErrorMessage name={"nombre"} />
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
                            value={values.description}
                            type="text"
                            className={`form-control form-control-sm ${errors.descripcion &&
                              touched.descripcion &&
                              "is-invalid"}`}
                          />
                          <ErrorMessage name={"descripcion"} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
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
                          <ErrorMessage name={"d_maximos"} />
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
                              value={values.estado}
                              type="checkbox"
                              id="ExampleInputCheckbox"
                              label="Si esta opción se encuentra activada, Representa que
                    el tipo de tramite es visible en el sistema y se podrán
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
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">
                    Usuarios disponibles
                  </div>
                  <div className="card-body">
                    <div>
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
                    </div>
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
                    <div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="p-2 mb-1 bg-light text-dark">Asunto</div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Asunto</label>
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
                  <div className="p-2 mb-1 bg-light text-dark">Plantilla</div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Plantilla</label>
                            <select
                              name={"plantilla"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.plantilla}
                              className="form-control form-control-sm"
                            >
                              <option>Seleccione</option>
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
                  <div className="p-2 mb-1 bg-light text-dark">Workflow</div>
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Workflow</label>
                            <select
                              name={"workflow"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.workflow}
                              className="form-control form-control-sm"
                            >
                              <option>Seleccione</option>
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
                    <i className="fa fa-save" /> Guardar
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    t_correspondencia: props.tipotramite.t_correspondencia,
    codigo: props.tipotramite.codigo,
    nombre: props.tipotramite.nombre,
    descripcion: props.tipotramite.descripcion,
    d_maximos: props.tipotramite.d_maximos,
    estado: props.tipotramite.estado,
    plantilla: props.tipotramite.plantilla,
    asunto: props.tipotramite.asunto,
    workflow: props.tipotramite.workflow,
    user_enabled: props.tipotramite.user_enabled
  }),
  validationSchema: Yup.object().shape({
    t_correspondencia: Yup.string()
      .ensure()
      .required("necesario el tipo de correspondencia"),
    codigo: Yup.string().required("necesario codigo para el tipo de tramite"),
    nombre: Yup.string().required("nombre necesario para el tipo de tramite"),
    descripcion: Yup.string().required(
      "descripcion importante para el registro"
    ),
    d_maximos: Yup.number()
      .integer()
      .positive()
      .required("la respuesta es importante para el tramite"),
    estado: Yup.bool()
      .test(
        "Activo",
        "Es necesario activar el tipo de tramite",
        value => value === true
      )
      .required("es necesario activar el tipo de tramite"),
    user_enabled: Yup.array().of(
      Yup.object().shape({ id: Yup.number(), name: Yup.string() })
    ),
    asunto: Yup.string(),
    plantilla: Yup.string().ensure(),
    workflow: Yup.string().ensure()
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(TipoTramite);
