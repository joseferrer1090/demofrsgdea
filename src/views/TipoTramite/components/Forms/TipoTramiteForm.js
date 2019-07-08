import React from "react";
import { Formik, withFormik, ErrorMessage } from "formik";
import { CustomInput, Row, Col } from "reactstrap";
import * as Yup from "yup";

const TipoTramiteForm = props => {
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
                            <option>Recibida</option>
                            <option>Despachada</option>
                            <option>Interna</option>
                          </select>
                          <ErrorMessage name="t_correspondencia" />
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
                          <ErrorMessage name="nombre" />
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
                          <ErrorMessage name="d_maximos" />
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
                          <textarea
                            name={"asutno"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.asunto}
                            className="form-control form-control-sm"
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
                <div className="p-2 mb-1 bg-light text-dark">Plantilla</div>
                <div className="card-body">
                  <form>
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
                          <select
                            name={"workflow"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.workflow}
                            className="form-control form-control-sm"
                          >
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
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    t_correspondencia: props.tipotramite.t_correspondencia,
    codigo: props.tipotramite.codigo,
    descripcion: props.tipotramite.descripcion,
    d_maximos: props.tipotramite.d_maximos,
    user_enabled: props.tipotramite.user_enabled,
    estado: props.tipotramite.estado,
    asunto: props.tipotramite.asunto,
    plantilla: props.tipotramite.plantilla,
    workflow: props.tipotramite.workflow,
    nombre: props.tipotramite.nombre
  }),
  validationSchema: Yup.object().shape({
    t_correspondencia: Yup.string()
      .ensure()
      .required("necesario seleccionar el tipo correspondencia"),
    codigo: Yup.string().required(
      "necesario asignar un codigo al tipo de tramite"
    ),
    nombre: Yup.string().required("necesario nombre para el tipo de tramite"),
    descripcion: Yup.string().required("necesario la descripcion del tramite"),
    d_maximos: Yup.number()
      .integer()
      .required("necesita dias maximos de respuestas"),
    estado: Yup.bool().test(
      "Activo",
      "Es necesario activar el tipo de tramite",
      value => value === true
    ),
    asunto: Yup.string(),
    workflow: Yup.string().ensure(),
    plantilla: Yup.string().ensure(),
    user_enabled: Yup.object()
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      // setSubmitting(false);
      // resetForm();
      console.log("hola");
    }, 1000);
  }
})(TipoTramiteForm);
