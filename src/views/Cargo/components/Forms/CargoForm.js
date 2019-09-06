import React, { useEffect, useState } from 'react';
import { Formik, withFormik, ErrorMessage, yupToFormErrors } from 'formik';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CustomInput
} from 'reactstrap';
import * as Yup from 'yup';
import { CHARGES } from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
const CargoForm = props => {
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
    <Row>
      <Col sm={{ size: 8, offset: 2 }}>
        <Card>
          <ToastContainer />
          <CardHeader> Registro de cargo </CardHeader>
          <CardBody>
            <form className="form" noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      Código <span className="text-danger">*</span>{' '}
                    </label>
                    <input
                      name={'code'}
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.code}
                      className={`form-control form-control-sm ${errors.code &&
                        touched.code &&
                        'is-invalid'}`}
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {errors.code && touched.code ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name={'code'} />
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
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={`form-control form-control-sm ${errors.name &&
                        touched.name &&
                        'is-invalid'}`}
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {errors.name && touched.name ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name={'name'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label> Descripción</label>
                    <textarea
                      name={'description'}
                      className="form-control form-control-sm"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {' '}
                      Estado <span className="text-danger">*</span>{' '}
                    </label>
                    <div className="text-justify">
                      <CustomInput
                        name={'status'}
                        type="checkbox"
                        id="ExampleCheckboxInput"
                        label=" Si esta opción se encuentra activada, representa
                        que el cargo es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso
                        contrario el cargo no se elimina del sistema solo
                        quedará inactivo e invisibles para cada uno de los
                        módulos correspondiente del sistema."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.status && touched.status && 'invalid-feedback'
                        }
                      />
                      {/* <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        Activar
                      </label> */}
                      {/* <p
                        className="text-muted"
                        style={{ textAlign: "justify" }}
                      >
                        Si esta opción se encuentra activada, representa
                        que el cargo es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso
                        contrario el cargo no se elimina del sistema solo
                        quedará inactivo e invisibles para cada uno de los
                        módulos correspondiente del sistema.
                      </p> */}
                    </div>
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
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    code: props.cargo.code,
    name: props.cargo.name,
    description: props.cargo.description,
    status: props.cargo.status
  }),
  validationSchema: Yup.object().shape({
    code: Yup.string()
      .required(' Por favor introduzca un código.')
      .matches(/^[\w]+$/, ' Código no válido.')
      .min(2, ' Mínimo 2 caracteres.')
      .max(15, ' Máximo 15 caracteres.'),
    name: Yup.string().required(' Por favor introduzca un nombre.'),
    description: Yup.string().max(250, ' Máximo 250 caracteres.'),
    status: Yup.bool()
      .test('Activo', ' Necesario activar el cargo. ', value => value === true)
      .required(' Se debe activar el cargo.')
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
      fetch(CHARGES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        },
        body: JSON.stringify({
          description: values.description,
          code: values.code,
          name: values.name,
          status: tipoEstado(values.status),
          userName: 'jferrer'
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success('Se creo el cargo con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
            } else if (response.status === 400) {
              toast.error('Error, el cargo ya existe.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
            } else if (response.status === 500) {
              toast.error('Error, no se pudo crear el cargo.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
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
})(CargoForm);
