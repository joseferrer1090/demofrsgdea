import React, { useEffect, useState } from 'react';
import { Formik, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  CustomInput
} from 'reactstrap';
import { COUNTRIES, DEPARTMENTS } from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

const DepartamentoForm = props => {
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
    handleReset,
    t
  } = props;

  const [optionsCountries, setOptionsCountries] = useState([]);

  useEffect(() => {
    getDataCountries();
  }, []);

  const getDataCountries = data => {
    fetch(COUNTRIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsCountries(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsCountries = optionsCountries.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  return (
    <Row>
      <Col sm={{ size: 8, offset: 2 }}>
        <Card>
          <ToastContainer />
          <CardHeader> {t('app_departamento_tab_title')} </CardHeader>
          <CardBody>
            <form className="form">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      {' '}
                      {t('app_departamento_form_select_pais')}{' '}
                      <span className="text-danger">*</span>{' '}
                    </label>
                    <select
                      name={'countryId'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.countryId}
                      className={`form-control form-control-sm ${errors.countryId &&
                        touched.countryId &&
                        'is-invalid'}`}
                    >
                      <option disabled value={''}>
                        {' '}
                        -- {t('app_departamento_form_registrar_pais')} --
                      </option>
                      {mapOptionsCountries}
                    </select>
                    <div style={{ color: '#D54B4B' }}>
                      {errors.countryId && touched.countryId ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="countryId" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      {' '}
                      {t('app_departamento_form_registrar_codigo')}{' '}
                      <span className="text-danger">*</span>{' '}
                    </label>
                    <input
                      name="code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.code &&
                        touched.code &&
                        'is-invalid'}`}
                      placeholder=""
                      value={values.code}
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {errors.code && touched.code ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="code" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>
                      {' '}
                      {t('app_departamento_form_registrar_nombre')}{' '}
                      <span className="text-danger">*</span>{' '}
                    </label>
                    <input
                      name="name"
                      onChange={e => {
                        setFieldValue('name', e.target.value.toUpperCase());
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`form-control form-control-sm ${errors.name &&
                        touched.name &&
                        'is-invalid'}`}
                      value={values.name}
                      placeholder=""
                    />
                    <div style={{ color: '#D54B4B' }}>
                      {errors.name && touched.name ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      {' '}
                      {t('app_departamento_form_registrar_estado')}{' '}
                      <span className="text-danger">*</span>{' '}
                    </label>
                    <div className="text-justify">
                      <CustomInput
                        value={values.status}
                        name="status"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.status && touched.status && 'invalid-feedback'
                        }
                        type="checkbox"
                        id="ExampleCheckboxInput"
                        label={t(
                          'app_departamento_form_registrar_estado_descripcion'
                        )}
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
                    Si esta opción se encuentra activada, representa que
                    el departamento es visible en el sistema y se podrán
                    realizar operaciones entre cada uno de los módulos
                    correspondientes de la aplicación. En caso contrario
                    el departamento no se elimina del sistema solo
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
                    <i className="fa fa-save" />{' '}
                    {t('app_departamento_form_button_guardar')}
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
export default withTranslation('translations')(
  withFormik({
    mapPropsToValues: props => ({
      code: props.departamento.code,
      name: props.departamento.name,
      status: props.departamento.status,
      countryId: props.departamento.countryId
    }),
    validationSchema: Yup.object().shape({
      code: Yup.string()
        .required(' Por favor introduzca un código alfanumérico.')
        .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
        .min(2, ' Mínimo 2 caracteres.')
        .max(15, ' Máximo 15 caracteres.'),
      name: Yup.string()
        .required('  Por favor introduzca un nombre.')
        .max(100, 'Máximo 100 caracteres.'),
      status: Yup.bool()
        .test(
          'Activo',
          'Es necesario activar el departamento',
          value => value === true
        )
        .required('Es necesario activar el departamento'),
      countryId: Yup.string()
        .ensure()
        .required(' Por favor seleccione un país.')
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
        fetch(DEPARTMENTS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa('sgdea:123456')
          },
          body: JSON.stringify({
            countryId: values.countryId,
            code: values.code,
            name: values.name,
            status: tipoEstado(values.status),
            userName: 'jferrer'
          })
        })
          .then(response =>
            response.json().then(data => {
              console.log(response.status);
              if (response.status === 201) {
                toast.success('Se creo el departamento con éxito.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 400) {
                toast.error('Error, el departamento ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error('Error, no se pudo crear el departamento.', {
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
  })(DepartamentoForm)
);
