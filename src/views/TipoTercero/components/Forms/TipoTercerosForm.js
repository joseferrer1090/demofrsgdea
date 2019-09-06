import React from 'react';
import * as Yup from 'yup';
import { Formik, withFormik, ErrorMessage } from 'formik';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  Col,
  CustomInput
} from 'reactstrap';
import { TYPETHIRDPARTYS } from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
const TipoTercerosForm = props => {
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

  return (
    <div className="animated fadeIn">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <Card>
            <ToastContainer />
            <CardHeader> Registrar tipo de tercero </CardHeader>
            <CardBody>
              <form className="form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        Código <span className="text-danger"> * </span>
                      </label>
                      <input
                        name={'code'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        type="text"
                        className={`form-control form-control-sm ${errors.code &&
                          touched.code &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.code && touched.code ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="code" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        Nombre <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'name'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        type="text"
                        className={`form-control form-control-sm ${errors.name &&
                          touched.name &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.name && touched.name ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        Descripción <span className="text-danger">*</span>{' '}
                      </label>
                      <textarea
                        name={'description'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className={`form-control form-control-sm ${errors.description &&
                          touched.description &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        <ErrorMessage name="description" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        Estado <span className="text-danger">*</span>{' '}
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
                          name={'status'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                          className={
                            errors.status &&
                            touched.status &&
                            'invalid-feedback'
                          }
                        />
                        <ErrorMessage name="this.status" />
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
                      <i className="fa fa-save" /> Guardar
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
    code: props.TipoTercerosForm.code,
    name: props.TipoTercerosForm.name,
    status: props.TipoTercerosForm.status,
    description: props.TipoTercerosForm.description
  }),
  validationSchema: Yup.object().shape({
    code: Yup.string()
      .matches(/^[\w]+$/, ' Código no válido.')
      .min(2, ' Mínimo 2 caracteres')
      .max(15, ' Máximo 15 caracteres')
      .required(' Por favor introduzaca un código.'),
    name: Yup.string()
      .max(100)
      .required(' Por favor introduzca un nombre.'),
    description: Yup.string().max(250, ' Máximo 250 caracteres.'),
    status: Yup.bool().test(
      'Activo',
      'Se requiere la activacion del tipo de tercero.',
      value => value === true
    )
  }),
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    const tipoEstado = data => {
      let tipo = null;
      if (data === true) {
        return (tipo = 1);
      } else if (data === false) {
        return (tipo = 0);
      }
      return null;
    };
    setTimeout(() => {
      fetch(TYPETHIRDPARTYS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        },
        body: JSON.stringify({
          code: values.code,
          name: values.name,
          description: values.description,
          status: tipoEstado(values.status),
          userName: 'jferrer'
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success('Se creo el tipo de tercero con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
              // alert("oki");
            } else if (response.status === 400) {
              toast.error('Error, el tipo de tercero ya existe.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
              //alert("Erro en el cuerpo");
            }
          })
        )
        .catch(error => {
          toast.error(`Error ${error}`, {
            position: toast.POSITION.TOP_RIGHT,
            className: css({
              marginTop: '60px'
            })
          });
        });
      setSubmitting(false);
      resetForm();
    }, 1000);
  }
})(TipoTercerosForm);
