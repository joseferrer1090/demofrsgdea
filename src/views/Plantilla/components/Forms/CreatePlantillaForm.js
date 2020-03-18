import React from "react";
import { Card, CardHeader, CardBody, CustomInput } from "reactstrap";
import { Formik, ErrorMessage, Field } from "formik";

const CreatePlantillaForm = () => {
  return (
    <div className="row">
      <div className="col-md-8">
        <Card>
          <CardHeader>
            <i className="fa fa-wpforms" /> Registro de plantilla
          </CardHeader>
          <CardBody>
            <Formik>
              {props => (
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Codigo <spam className="text-danger">*</spam>{" "}
                        </label>
                        <input
                          value={props.values.codigo}
                          name={"codigo"}
                          type="text"
                          className={`form-control form-control-sm ${props
                            .errors.codigo &&
                            props.touched.codigo &&
                            "is-invalid"}`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Nombre <span className="text-danger">*</span>
                        </label>
                        <input
                          value={props.values.nombre}
                          name={"nombre"}
                          type="text"
                          className={`form-control form-control-sm ${props
                            .errors.nombre &&
                            props.touched.nombre &&
                            "is-invalid"}`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Descripcion <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          value={props.values.descripcion}
                          name={"descripcion"}
                          className={`form-control form-control-sm ${props
                            .errors.descripcion &&
                            props.touched.descripcion &&
                            `is-valid`}`}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          Estado <span className="text-danger">*</span>
                        </label>
                        <div className="text-justify">
                          <CustomInput
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.estado}
                            name={"estado"}
                            type="checkbox"
                            id="ExampleInputCheckbox"
                            label={
                              "Si esta opción se encuentra activada, representa que la Plantilla es visible en el sistema y se podrán realizar operaciones entre cada uno de los módulos correspondientes de la aplicación. En caso contrario la Plantilla no se elimina del sistema solo quedará inactivo y no visible para cada uno de los módulos correspondientes del sistema."
                            }
                            className={
                              props.errors.estado &&
                              props.touched.estado &&
                              "invalid-feedback"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CreatePlantillaForm;
