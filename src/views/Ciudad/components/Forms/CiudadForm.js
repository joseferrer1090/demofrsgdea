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
import {
  COUNTRIES,
  DEPARTMENTS,
  CITYS
} from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
const CiudadForm = props => {
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

  const [optionsDepartment, setOptionsDepartment] = useState([]);
  const [optionsCountries, setOptionsCountries] = useState([]);

  useEffect(() => {
    getDataCountries();
    getDataDepartments();
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
    console.log('Id: ' + aux.id);
    console.log('Name: ' + aux.name);
    return <option value={aux.id}>{aux.name}</option>;
  });

  const getDataDepartments = data => {
    fetch(DEPARTMENTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsDepartment(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsDepartments = optionsDepartment.map((aux, idx) => {
    console.log('Id: ' + aux.id);
    console.log('Name: ' + aux.name);
    return <option value={aux.id}>{aux.name}</option>;
  });

  return (
    <Row>
      <Col sm="8" md={{ offset: 2 }}>
        <Card>
          <ToastContainer />
          <CardHeader> Registro de ciudad </CardHeader>
          <CardBody>
            <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      País <span className="text-danger">*</span>{' '}
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
                      <option value={''} disabled>
                        {' '}
                        -- Seleccione --
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      Departamento <span className="text-danger">*</span>{' '}
                    </label>
                    <select
                      name={'departmentId'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.departmentId}
                      className={`form-control form-control-sm ${errors.departmentId &&
                        touched.departmentId &&
                        'is-invalid'}`}
                    >
                      <option value={''} disabled>
                        {' '}
                        Seleccione{' '}
                      </option>
                      {mapOptionsDepartments}
                    </select>
                    <div style={{ color: '#D54B4B' }}>
                      {errors.departmentId && touched.departmentId ? (
                        <i className="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="departmentId" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      Código <span className="text-danger">*</span>{' '}
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      Nombre <span className="text-danger">*</span>{' '}
                    </label>
                    <input
                      name="name"
                      onChange={handleChange}
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
                      Estado <span className="text-danger">*</span>{' '}
                    </label>
                    <div className="">
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
                        label="Si esta opción se encuentra activada, representa que
                        la ciudad es visible en el sistema y se podrán
                        realizar operaciones entre cada uno de los módulos
                        correspondientes de la aplicación. En caso contrario
                        la ciudad no se elimina del sistema solo quedará
                        inactivo e invisibles para cada uno de los módulos
                        correspondiente del sistema."
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
                      la ciudad es visible en el sistema y se podrán
                      realizar operaciones entre cada uno de los módulos
                      correspondientes de la aplicación. En caso contrario
                      la ciudad no se elimina del sistema solo quedará
                      inactivo e invisibles para cada uno de los módulos
                      correspondiente del sistema.
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
    code: props.ciudad.code,
    name: props.ciudad.name,
    status: props.ciudad.status,
    countryId: props.ciudad.countryId,
    departmentId: props.ciudad.departmentId
  }),
  validationSchema: Yup.object().shape({
    code: Yup.string()
      .min(2, ' Mínimo 2 caracteres.')
      .max(6, ' Máximo 6 caracteres.')
      .required(' Por favor introduzca un código.'),
    name: Yup.string()
      .required(' Por favor introduzca un nombre.')
      .max(100),
    status: Yup.bool()
      .test('Activo', 'Es necesario activar la ciudad', value => value === true)
      .required(' Es necesario activar la ciudad.'),
    countryId: Yup.string()
      .ensure()
      .required(' Por favor seleccione un país.'),
    departmentId: Yup.string()
      .ensure()
      .required(' Por favor seleccione un departamento.')
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
      fetch(CITYS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        },
        body: JSON.stringify({
          departmentId: values.departmentId,
          code: values.code,
          name: values.name,
          status: tipoEstado(values.status),
          userName: 'jferrer'
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success('Se creo la ciudad con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
              // alert("oki");
            } else if (response.status === 500) {
              toast.error('Error, la ciudad ya existe.', {
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
})(CiudadForm);
