import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  Col,
  CustomInput
} from 'reactstrap';
import {
  COUNTRIES,
  DEPARTMENTS,
  CITYS,
  TYPETHIRDPARTYS,
  THIRDPARTYS
} from './../../../../services/EndPoints';
import Select from 'react-select';
import { Formik, withFormik, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

const RemitenteForm = props => {
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

  const [optionsTipoTecero, setOptionsTipoTercero] = useState([]);
  const [optionsDepartment, setOptionsDepartment] = useState([]);
  const [optionsCountries, setOptionsCountries] = useState([]);
  const [optionsCitys, setOptionsCitys] = useState([]);

  useEffect(() => {
    getDataCountries();
    getDataDepartments();
    getDataCitys();
    getDataTipoTeceros();
  }, []);

  const getDataTipoTeceros = data => {
    fetch(TYPETHIRDPARTYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsTipoTercero(data);
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsTipoTerceros = optionsTipoTecero.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

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
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsDepartments = optionsDepartment.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const getDataCitys = data => {
    fetch(CITYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsCitys(data);
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsCitys = optionsCitys.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  return (
    <div className="animated fadeIn">
      <div className="container">
        <Row>
          <Col sm="8" md={{ offset: 2 }}>
            <Card>
              <ToastContainer />
              <CardHeader> Registro de tercero </CardHeader>
              <CardBody>
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {' '}
                          Tipo de tercero <span className="text-danger">
                            *
                          </span>{' '}
                        </label>
                        <select
                          name={'tipoTercero'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tipoTercero}
                          className={`form-control form-control-sm ${errors.tipoTercero &&
                            touched.tipoTercero &&
                            'is-invalid'}`}
                        >
                          <option disabled value={''}>
                            -- Selecione --
                          </option>
                          {mapOptionsTipoTerceros}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                          {errors.tipoTercero && touched.tipoTercero ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="tipoTercero" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {' '}
                          Elemento de comunicación{' '}
                          <span className="text-danger">*</span>{' '}
                        </label>
                        <select
                          name={'elementoComunicacion'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.elementoComunicacion}
                          className={`form-control form-control-sm ${errors.elementoComunicacion &&
                            touched.elementoComunicacion &&
                            'is-invalid'}`}
                        >
                          <option disabled value={''}>
                            -- Selecione --
                          </option>
                          <option value={1}>Remitente</option>
                          <option value={2}>Destinatario </option>
                          <option value={3}>Mixto </option>
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                          {errors.elementoComunicacion &&
                          touched.elementoComunicacion ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="elementoComunicacion" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {' '}
                          Identificación <span className="text-danger">
                            *
                          </span>{' '}
                        </label>
                        <input
                          name={'identificacion'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.identificacion}
                          type="text"
                          className={`form-control form-control-sm ${errors.identificacion &&
                            touched.identificacion &&
                            'is-invalid'}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                          {errors.identificacion && touched.identificacion ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="identificacion" />
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
                          name={'nombre'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nombre}
                          type="text"
                          className={`form-control form-control-sm ${errors.nombre &&
                            touched.nombre &&
                            'is-invalid'}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                          {errors.nombre && touched.nombre ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="nombre" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
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
                    <div className="col-md-4">
                      <div className="form-group">
                        <label> Teléfono fijo </label>
                        <input
                          name={'telefonoFijo'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          value={values.telefonoFijo}
                          className={`form-control form-control-sm ${errors.telefonoFijo &&
                            touched.telefonoFijo &&
                            'is-invalid'}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                          {errors.telefonoFijo && touched.telefonoFijo ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="telefonoFijo" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label> Teléfono celular </label>
                        <input
                          name={'telefonoCelular'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.telefonoCelular}
                          type="text"
                          className={`form-control form-control-sm ${errors.telefonoCelular &&
                            touched.telefonoCelular &&
                            'is-invalid'}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                          {errors.telefonoCelular && touched.telefonoCelular ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="telefonoCelular" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label> Dirección </label>
                        <input
                          name={'direccion'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.direccion}
                          type="text"
                          className={`form-control form-control-sm ${errors.direccion &&
                            touched.direccion &&
                            'is-invalid'}`}
                        />
                        <div style={{ color: '#D54B4B' }}>
                          {errors.direccion && touched.direccion ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="direccion" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {' '}
                          País <span className="text-danger"> * </span>{' '}
                        </label>
                        <select
                          name={'pais'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pais}
                          className={`form-control form-control-sm ${errors.pais &&
                            touched.pais &&
                            'is-invalid'}`}
                        >
                          <option disabled value={''}>
                            {' '}
                            -- Seleccione --
                          </option>
                          {mapOptionsCountries}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                          {errors.pais && touched.pais ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="pais" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {' '}
                          Departamento <span className="text-danger">
                            {' '}
                            *{' '}
                          </span>{' '}
                        </label>
                        <select
                          name={'departamento'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.departamento}
                          className={`form-control form-control-sm ${errors.departamento &&
                            touched.departamento &&
                            'is-invalid'}`}
                        >
                          <option disabled value={''}>
                            -- Seleccione --
                          </option>
                          {mapOptionsDepartments}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                          {errors.departamento && touched.departamento ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="departamento" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {' '}
                          Ciudad <span className="text-danger"> * </span>{' '}
                        </label>
                        <select
                          name={'ciudad'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ciudad}
                          className={`form-control form-control-sm ${errors.ciudad &&
                            touched.ciudad &&
                            'is-invalid'}`}
                        >
                          <option value={''} disabled>
                            -- Seleccione --
                          </option>
                          {mapOptionsCitys}
                        </select>
                        <div style={{ color: '#D54B4B' }}>
                          {errors.ciudad && touched.ciudad ? (
                            <i className="fa fa-exclamation-triangle" />
                          ) : null}
                          <ErrorMessage name="ciudad" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label> Referencia </label>
                        <textarea
                          name={'referencia'}
                          onChange={handleChange}
                          onBlur={handleBlur.referencia}
                          value={values.referencia}
                          type="text"
                          className={`form-control form-control-sm ${errors.referencia &&
                            touched.referencia &&
                            'is-invalid'}`}
                        />
                        <ErrorMessage name="referencia" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label> Observación </label>
                        <textarea
                          name={'observacion'}
                          onChange={handleChange}
                          onBlur={handleBlur.observacion}
                          type="text"
                          value={values.observacion}
                          className={`form-control form-control-sm ${errors.observacion &&
                            touched.observacion &&
                            'is-invalid'}`}
                        />
                        <ErrorMessage name="observacion" />
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
                            type="checkbox"
                            id="ExampleInputCheckbox"
                            label="Si esta opción se encuentra activada, representa
                              que el remitente es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el remitente no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema."
                            name={'estado'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.estado}
                            className={
                              errors.estado &&
                              touched.estado &&
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
                              que el remitente es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el remitente no se elimina del sistema
                              solo quedará inactivo e invisibles para cada uno
                              de los módulos correspondiente del sistema.
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
    </div>
  );
};
export default withFormik({
  mapPropsToValues: props => ({
    tipoTercero: props.remitenteForm.tipoTercero,
    elementoComunicacion: props.remitenteForm.elementoComunicacion,
    pais: props.remitenteForm.pais,
    departamento: props.remitenteForm.departamento,
    ciudad: props.remitenteForm.ciudad,
    identificacion: props.remitenteForm.identificacion,
    nombre: props.remitenteForm.nombre,
    email: props.remitenteForm.email,
    direccion: props.remitenteForm.direccion,
    telefonoFijo: props.remitenteForm.telefonoFijo,
    telefonoCelular: props.remitenteForm.telefonoCelular,
    referencia: props.remitenteForm.referencia,
    observacion: props.remitenteForm.observacion,
    estado: props.remitenteForm.estado
  }),
  validationSchema: Yup.object().shape({
    tipoTercero: Yup.string()
      .ensure()
      .required(' Por favor seleccione el tipo de tercero.'),
    elementoComunicacion: Yup.string()
      .ensure()
      .required(' Por favor seleccione un elemento de comunicación.'),
    pais: Yup.string()
      .ensure()
      .required(' Por favor seleccione un país.'),
    departamento: Yup.string()
      .ensure()
      .required(' Por favor seleccione un departamento.'),
    ciudad: Yup.string()
      .ensure()
      .required(' Por favor seleccione una ciudad.'),
    identificacion: Yup.string()
      .matches(
        /^[0-9]+$/,
        '  El número de identificación no acepta puntos, letras, ni caracteres especiales.'
      )
      .required(' Por favor introduzca una identificación.'),
    nombre: Yup.string()
      .max(45, 'Máximo 45 caracteres.')
      .required(' Por favor introduzca un nombre.'),
    email: Yup.string()
      .email(' Por favor introduzca un email valido.')
      .required(' Por favor introduzca un email.'),
    telefonoFijo: Yup.string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        ' Número no valido.'
      )
      .required(' Por favor introduzca un teléfono fijo.'),
    telefonoCelular: Yup.string()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        ' Número no valido.'
      )
      .required(' Por favor introduzca un teléfono celular.'),
    direccion: Yup.string()
      .max(45, 'Máximo 45 caracteres')
      .required('Por favor introduzca una dirección.'),
    referencia: Yup.string()
    .max(50, 'Máximo 50 caracteres.'),
    observacion: Yup.string()
    .max(250, 'Máximo 250 caracteres.'),
    estado: Yup.bool().test(
      'Activo',
      'se requiere la activacion el usuario',
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
      fetch(THIRDPARTYS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        },
        body: JSON.stringify({
          address: values.direccion,
          cellPhone: values.telefonoCelular,
          communicationElement: values.elementoComunicacion,
          email: values.email,
          identification: values.identificacion,
          landline: values.telefonoFijo,
          name: values.nombre,
          observation: values.observacion,
          reference: values.referencia,
          status: tipoEstado(values.estado),
          typeThirdPartyId: values.tipoTercero,
          userName: 'ccuartas'
        })
      })
        .then(response =>
          response.json().then(data => {
            if (response.status === 201) {
              toast.success('Se creo el tercero con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
            } else if (response.status === 400) {
              toast.error('Error, el tercero ya existe.', {
                position: toast.POSITION.TOP_RIGHT,
                className: css({
                  marginTop: '60px'
                })
              });
            } else if (response.status === 500) {
              toast.error('Error, no se pudo crear el tercero.', {
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
})(RemitenteForm);
