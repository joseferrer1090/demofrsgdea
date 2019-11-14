import React from 'react';
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
import { MESSENGERS } from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';
const RadicacionEmailForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    setFieldValue,
    t
  } = props;
  return (
    <div>
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <Card>
            <ToastContainer />
            <CardHeader>Registro de email para radicación</CardHeader>
            <CardBody>
              <form className="form">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>
                        Protocolo
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'protocolo'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.protocolo}
                        type="text"
                        className={`form-control form-control-sm ${errors.protocolo &&
                          touched.protocolo &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.protocolo && touched.protocolo ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="protocolo" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        Host <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'host'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.host}
                        type="text"
                        className={`form-control form-control-sm ${errors.host &&
                          touched.host &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.host && touched.host ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="host" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>
                        {' '}
                        Puerto <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'puerto'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.puerto}
                        type="number"
                        className={`form-control form-control-sm ${errors.puerto &&
                          touched.puerto &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.puerto && touched.puerto ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="puerto" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        Email <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'email'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        type="email"
                        className={`form-control form-control-sm ${errors.email &&
                          touched.email &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.email && touched.email ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        Contraseña <span className="text-danger">*</span>{' '}
                      </label>
                      <input
                        name={'password'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        type="password"
                        className={`form-control form-control-sm ${errors.password &&
                          touched.password &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.password && touched.password ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_mensajero_form_registrar_estado')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name={'status'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                          type="checkbox"
                          id="ExampleCheckboxInput"
                          label={
                            'Si esta opción se encuentra activada, representa que el correo electrónico es visible en el sistema y se podrán realizar operaciones entre cada uno de los módulos correspondientes de la aplicación. En caso contrario el correo electrónico no se elimina del sistema solo quedará inactivo e invisibles para cada uno de los módulos correspondiente del sistema.'
                          }
                          className={
                            errors.status &&
                            touched.status &&
                            'invalid-feedback'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardBody>
            <CardFooter>
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
                      <i className="fa fa-save" />{' '}
                      {t('app_mensajero_form_registrar_boton_guardar')}
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

export default withTranslation('translations')(
  withFormik({
    mapPropsToValues: props => ({
      protocolo: props.radicacionemail.protocolo,
      host: props.radicacionemail.host,
      puerto: props.radicacionemail.puerto,
      email: props.radicacionemail.email,
      password: props.radicacionemail.password,
      status: props.radicacionemail.status
    }),
    validationSchema: Yup.object().shape({
      protocolo: Yup.string()
        // .min(1, ' Por favor introduzca un protocolo válido.')
        .required(' Por favor introduzca el protocolo.'),
      host: Yup.string()
        // .min(1, ' Por favor introduzca un host válido.')
        .required(' Por favor introduzca el host.'),
      puerto: Yup.number()
        // .min(1, 'Por favor introduzca un puerto válido.')
        .required(' Por favor introduzca un puerto.'),
      email: Yup.string()
        .email(' Por favor introduzca un email valido.')
        .required(' Por favor introduzca un email.'),
      password: Yup.string().required(' Por favor introduzca una contraseña.'),
      status: Yup.bool().test(
        'Activo',
        'Es necesario la activacion del mensajero',
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
        fetch(
          'http://192.168.10.180:8090/api/sgdea/service/configuration/email/accounts/filing',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM3NjY0OTksInVzZXJfbmFtZSI6ImNjdWFydGFzIiwiYXV0aG9yaXRpZXMiOlsiQVNJU1RFTlRFIEFETUlOSVNUUkFUSVZPIl0sImp0aSI6IjkxMGRhYzBjLTgyODEtNDFlYi1iNzM2LWU1ZWQ1OTUxZmE5MyIsImNsaWVudF9pZCI6ImZyb250ZW5kYXBwIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.l165cU9w7Yl8eDgKdrYgZ-ZQOazEthA4Cx1jFEpQDjs'
            },
            body: JSON.stringify({
              protocol: values.protocolo,
              host: values.host,
              port: values.puerto,
              email: values.email,
              password: values.password,
              username: 'cantero',
              status: values.status
            })
          }
        )
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success('Se registro el correo electrónico con éxito.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 400) {
                toast.error('Error, el correo electrónico ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error(
                  'Error, no se pudo registrar el correo electrónico.',
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    className: css({
                      marginTop: '60px'
                    })
                  }
                );
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
  })(RadicacionEmailForm)
);
