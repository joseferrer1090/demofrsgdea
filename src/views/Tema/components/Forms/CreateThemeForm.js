import React from 'react';
import { Formik, withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput
} from 'reactstrap';
import { ChromePicker } from 'react-color';

const handleColorChange = ({ hex }) => {
  console.log(hex);
};

const CreateThemeForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  return (
    <div className="animated fadeIn">
      <div className="row">
        <div className="col-md-10 offset-1">
          <Card>
            <CardHeader>Crear nuevo tema</CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      Código <span className="text-danger">*</span>{' '}
                    </label>
                    <input
                      name="codigo"
                      onChange={e => {setFieldValue("codigo", e.target.value.toUpperCase())}}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.codigo &&
                        touched.codigo &&
                        'is-invalid'}`}
                      placeholder=""
                      value={values.codigo}
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {errors.codigo && touched.codigo ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="codigo" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      {' '}
                      Nombre <span className="text-danger">*</span>{' '}
                    </label>
                    <input
                      name="nombre"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.nombre &&
                        touched.nombre &&
                        'is-invalid'}`}
                      value={values.nombre}
                      placeholder=""
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {errors.nombre && touched.nombre ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="nombre" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label> Descripción </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="p-2 mb-2 bg-secondary text-dark">
                  Datos adicionales
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <Card body>
                        <h5 className="text-center">
                          Colores en el header{' '}
                          <hr style={{ marginTop: '2px' }} />{' '}
                        </h5>
                        <p className="text-center">
                          Este color afectapra los diferentes header de la
                          aplicacion{' '}
                        </p>
                        <ChromePicker
                          color={'#333'}
                          onChange={handleColorChange}
                        />
                      </Card>
                    </div>
                    <div className="col-md-4">
                      <Card body>
                        <h5 className="text-center">
                          {' '}
                          Colores en el footer{' '}
                          <hr style={{ marginBottom: '5px' }} />{' '}
                        </h5>
                        <p className="text-center">
                          {' '}
                          Este Color afectara al footer de la aplicacion{' '}
                        </p>
                        <ChromePicker
                          color={'#333'}
                          onChange={handleColorChange}
                        />
                      </Card>
                    </div>
                    <div className="col-md-4">
                      <Card body>
                        <h5 className="text-center">
                          Colores en el body{' '}
                          <hr style={{ marginBottom: '5px' }} />{' '}
                        </h5>
                        <p className="text-center">
                          {' '}
                          Este color afectara algunas secciones del body
                        </p>
                        <ChromePicker
                          color={'#333'}
                          onChange={handleColorChange}
                        />
                      </Card>
                    </div>
                  </div>
                  {/* <div className="row">
                      <div className="col-md-4">
                        <Card body>
                          <h5>
                            {" "}
                            Colores en el body{" "}
                            <hr style={{ marginBottom: "5px" }} />{" "}
                          </h5>
                          <p> Probando </p>
                        </Card>
                      </div>
                    </div> */}
                  <div className="form-group">
                    <Field
                      name="aplicarTema"
                      render={({ field, form }) => {
                        return (
                          <CustomInput
                            type="checkbox"
                            id="ExampleInputCheckbox2"
                            label="Aplicar a todos los usuarios"
                            {...field}
                            checked={field.value}
                          />
                        );
                      }}
                    />
                    {/* <div className="">
                        <CustomInput
                          type="checkbox"
                          id="ExampleInputCheckbox2"
                          label="Aplicar a todos los usuarios"
                        />
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>
                  {' '}
                  Estado <span className="text-danger">*</span>{' '}
                </label>
                <div className="">
                  <CustomInput
                    value={values.estado}
                    name="estado"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.estado && touched.estado && 'invalid-feedback'
                    }
                    type="checkbox"
                    id="ExampleInputCheckbox"
                    label="Si esta opción se encuentra activada, Representa que
                             el tema es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             el tema no se elimina del sistema solo quedará
                             inactiva e invisibles para cada uno de los módulos
                             correspondiente del sistema."
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
                      <i className="fa fa-save" /> Crear
                    </div>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    codigo: props.theme.codigo,
    nombre: props.theme.nombre,
    estado: props.theme.estado,
    aplicarTema: props.theme.aplicarTema
  }),
  validationSchema: Yup.object().shape({
    codigo: Yup.string()
      .min(6, ' Mínimo 6 caracteres.')
      .max(6, ' Máximo 6 caracteres.')
      .required(' Por favor introduzca un código.'),
    nombre: Yup.string()
      .required(' Por favor introduzca un nombre.')
      .max(100),
    aplicarTema: Yup.bool().test('Activado', '', value => value === true),
    estado: Yup.bool()
      .test('Activo', 'Es necesario activar el país', value => value === true)
      .required('Es necesario activar el país')
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(CreateThemeForm);
