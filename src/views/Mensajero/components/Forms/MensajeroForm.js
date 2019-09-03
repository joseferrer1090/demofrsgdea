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
const MensajeroForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
  } = props;
  return (
    <div>
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <Card>
            <ToastContainer />
            <CardHeader>Registro de mensajero</CardHeader>
            <CardBody>
              <form className="form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {' '}
                        Identificación <span className="text-danger">
                          *
                        </span>{' '}
                      </label>
                      <input
                        name={'identification'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.identification}
                        type="text"
                        className={`form-control form-control-sm ${errors.identification &&
                          touched.identification &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {errors.identification && touched.identification ? (
                          <i className="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="identification" />
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
                      <label> Descripción </label>
                      <textarea
                        name={'description'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        {' '}
                        Estado <span className="text-danger">*</span>{' '}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name={'status'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.status}
                          type="checkbox"
                          id="ExampleCheckboxInput"
                          label=" Si esta opción se encuentra activada, representa
                              que el cargo es visible en el sistema y se podrán
                              realizar operaciones entre cada uno de los módulos
                              correspondientes de la aplicación. En caso
                              contrario el cargo no se elimina del sistema solo
                              quedará inactivo e invisibles para cada uno de los
                              módulos correspondiente del sistema."
                          className={
                            errors.status &&
                            touched.status &&
                            'invalid-feedback'
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
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    identification: props.mensajero.identification,
    name: props.mensajero.name,
    description: props.mensajero.description,
    status: props.mensajero.status
  }),
  validationSchema: Yup.object().shape({
    identification: Yup.number()
      .required(' Por favor introduzca una identificación.')
      .integer(),
    name: Yup.string().required(' Por favor introduzca un nombre.'),
    description: Yup.string(),
    status: Yup.bool().test(
      'Activado',
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
      fetch(MESSENGERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        },
        body: JSON.stringify({
          identification: values.identification,
          name: values.name,
          description: values.description,
          status: tipoEstado(values.status),
          userName: 'jferrer'
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success('Se creo el mensajero con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
              // alert("oki");
            } else if (response.status === 500) {
              toast.error('Error, el mensajero ya existe.', {
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
})(MensajeroForm);
