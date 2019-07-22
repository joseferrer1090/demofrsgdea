import React from 'react';
import * as Yup from 'yup';
import { Formik, withFormik, ErrorMessage } from "formik";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  Col,
  CustomInput
} from "reactstrap";
const TipoTercerosForm = props =>{
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue
  } = props;

  return(
    <div className="animated fadeIn">
    <Row>
      <Col sm={{ size: 8, offset: 2 }}>
        <Card>
          <CardHeader> Registrar tipo de tercero </CardHeader>
          <CardBody>
            <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
                      Código <span className="text-danger"> * </span>
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
                      <i class="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="codigo"/>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {" "}
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
                      <i class="fa fa-exclamation-triangle"/> :
                      null
                    }
                    <ErrorMessage name="nombre"/>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      Descripción <span className="text-danger">
                        *
                      </span>{" "}
                    </label>
                    <textarea
                         name={"descripcion"}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.descripcion}
                         className={`form-control form-control-sm ${errors.descripcion &&
                          touched.descripcion &&
                          "is-invalid"}`}
                           />
                           <div style={{ color: '#D54B4B' }}>
                           <ErrorMessage name="descripcion"/>
                           </div>

                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {" "}
                      Estado <span className="text-danger">*</span>{" "}
                    </label>
                    <div className="">
                      <CustomInput
                        type="checkbox"
                        id="ExampleInputCheckbox"
                        label="Si esta opción se encuentra activada, Representa que
                         el tipo de tercero es visible en el sistema y se podrán
                         realizar operaciones entre cada uno de los módulos
                         correspondientes de la aplicación. En caso contrario
                         la sede no se elimina del sistema solo quedará
                         inactiva e invisibles para cada uno de los módulos
                         correspondiente del sistema."
                         name={"estado"}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.estado}
                         className={
                            errors.estado &&
                            touched.estado &&
                            "invalid-feedback"
                          }
                      />
                      <ErrorMessage name="estado"/>
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
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter>
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
                  <i className="fa fa-save" /> Registrar
                </div>
              )}
            </button>
          </div>
        </CardFooter>
        </Card>
      </Col>
    </Row>
  </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    codigo: props.TipoTercerosForm.codigo,
    nombre: props.TipoTercerosForm.nombre,
    estado: props.TipoTercerosForm.estado,
    descripcion: props.TipoTercerosForm.descripcion
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string()
    .min(6, " Mínimo 6 caracteres")
    .max(6, " Máximo 6 caracteres")
    .required(" Por favor introduzaca un código."),
    nombre: Yup.string()
    .max(100)
    .required(" Por favor introduzca un nombre."),
    descripcion: Yup.string()
    .max(250, " Máximo 250 caracteres."),
    estado: Yup.bool().test(
      "Activo",
      "Se requiere la activacion del tipo de tercero.",
      value => value === true
    )
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(TipoTercerosForm);
