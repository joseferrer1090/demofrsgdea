import React, { useState, useEffect } from 'react';
import { Formik, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { animateScroll as scroll } from 'react-scroll';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput,
  Col,
  Row,
  Alert
} from 'reactstrap';
import {
  CONGLOMERATES,
  COMPANYS,
  COUNTRIES,
  DEPARTMENTS,
  CITYS,
  HEADQUARTERS,
  CHARGES
} from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

const SedesForm = props => {
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

  const [optionsConglomerate, setOptionsConglomerate] = useState([]);
  const [optionsCompanys, setOptionsCompanys] = useState([]);
  const [optionsDepartment, setOptionsDepartment] = useState([]);
  const [optionsCountries, setOptionsCountries] = useState([]);
  const [optionsCitys, setOptionsCitys] = useState([]);
  const [visibleAlert, setVisibleAlert] = useState(true);
  const [optionsCharges, setOptionsCharges] = useState([]);

  useEffect(() => {
    getDataConglomerates();
    getDataCompanys();
    getDataCountries();
    getDataDepartments();
    getDataCitys();
    getDataCharges();
  }, []);

  const getDataConglomerates = data => {
    fetch(CONGLOMERATES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsConglomerate(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const onClickUp = () => {
    scroll.scrollToTop();
  };
  const mapOptionsConglomerate = optionsConglomerate.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const getDataCompanys = data => {
    fetch(COMPANYS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsCompanys(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsCompanys = optionsCompanys.map((aux, idx) => {
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
        // this.setState({
        //   dataConglomerates: data
        // });
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

  const getDataCharges = data => {
    fetch(CHARGES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        setOptionsCharges(data);
        // this.setState({
        //   dataConglomerates: data
        // });
      })
      .catch(Error => console.log(' ', Error));
  };

  const mapOptionsCharges = optionsCharges.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const onDismiss = () => {
    setVisibleAlert(!visibleAlert);
  };
  return (
    <div>
      <Card>
        <ToastContainer />
        <CardHeader>{t('app_sedes_tab_title')}</CardHeader>
        <CardBody>
          <form className="form">
            <Row>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_conglomerado')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <select
                    name="conglomerateId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.conglomerateId}
                    className={`form-control form-control-sm ${errors.conglomerateId &&
                      touched.conglomerateId &&
                      'is-invalid'}`}
                  >
                    {' '}
                    <option value={''} disabled>
                      -- {t('app_sedes_form_registrar_select_conglomerado')} --
                    </option>
                    {mapOptionsConglomerate}{' '}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                    {errors.conglomerateId && touched.conglomerateId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="conglomerateId" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_empresa')}{' '}
                    <span className="text-danger">*</span>
                  </label>
                  <br />
                  <select
                    name="companyId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.companyId}
                    className={`form-control form-control-sm ${errors.companyId &&
                      touched.companyId &&
                      'is-invalid'}`}
                  >
                    <option value={''} disabled>
                      -- {t('app_sedes_form_registrar_select_empresa')} --
                    </option>
                    {mapOptionsCompanys}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                    {errors.companyId && touched.companyId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="companyId" />
                  </div>
                  {/* <Select
                    className=""
                    value={this.state.selectedOptionEmpresa}
                    onChange={this.handleChangeOptionEmpresa}
                    options={dataEmpresa}
                  /> */}
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_codigo')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name="code"
                    onChange={e => {
                      setFieldValue('code', e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    value={values.code}
                    type="text"
                    className={`form-control form-control-sm ${errors.code &&
                      touched.code &&
                      'is-invalid'}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.code && touched.code ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="code" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_nombre')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name="name"
                    onChange={e => {
                      setFieldValue('name', e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    value={values.name}
                    type="text"
                    className={`form-control form-control-sm ${errors.name &&
                      touched.name &&
                      'is-invalid'}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.name && touched.name ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label> {t('app_sedes_form_registrar_descripcion')} </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="form-control form-control-sm"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <div className="form-group ">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_prefij_radicacion')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name="prefix"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.prefix}
                    type="text"
                    className={`form-control form-control-sm ${errors.prefix &&
                      touched.prefix &&
                      'is-invalid'}`}
                    maxLength={'6'}
                    placeholder=" "
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.prefix && touched.prefix ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="prefix" />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_sec_radicacion')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name={'sequence'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sequence}
                    type="number"
                    className={`form-control form-control-sm ${errors.sequence &&
                      touched.sequence &&
                      'is-invalid'}`}
                    min={0}
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.sequence && touched.sequence ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="sequence" />
                  </div>
                </div>
              </Col>
              <Col sm="12">
                <Alert
                  color="secondary"
                  isOpen={visibleAlert}
                  toggle={onDismiss}
                  fade={true}
                >
                  <h4 className="alert-heading">
                    {t('app_sedes_form_registrar_alert_title')}
                  </h4>
                  <p>{t('app_sedes_form_registrar_alert_title_2')}</p>
                  <hr />
                  <p className="mb-0">
                    {t('app_sedes_form_registrar_alert_title_3')}
                  </p>
                </Alert>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <div className="form-group">
                  <label>{t('app_sedes_form_registrar_pais')}</label>
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
                      -- {t('app_sedes_form_select_pais')} --
                    </option>
                    {mapOptionsCountries}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                    {errors.countryId && touched.countryId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="countryId" />
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>{t('app_sedes_form_registrar_departamento')}</label>
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
                      -- {t('app_sedes_form_select_departamento')} --
                    </option>
                    {mapOptionsDepartments}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                    {errors.departmentId && touched.departmentId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="departmentId" />
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div className="form-group">
                  <label>
                    {t('app_sedes_form_registrar_ciudad')}{' '}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    name={'cityId'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cityId}
                    className={`form-control form-control-sm ${errors.cityId &&
                      touched.cityId &&
                      'is-invalid'}`}
                  >
                    <option value={''} disabled>
                      -- {t('app_sedes_form_select_ciudad')} --
                    </option>
                    {mapOptionsCitys}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                    {errors.cityId && touched.cityId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="cityId" />
                  </div>
                </div>
              </Col>
              <Col sm="7">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_direccion')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name={'address'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    type="text"
                    className={`form-control form-control-sm ${errors.address &&
                      touched.address &&
                      'is-invalid'}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.address && touched.address ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="address" />
                  </div>
                </div>
              </Col>
              <Col sm="5">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_telefono')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name={'phone'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    type="text"
                    className={`form-control form-control-sm ${errors.phone &&
                      touched.phone &&
                      'is-invalid'}`}
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.phone && touched.phone ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="phone" />
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="12">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_cargo_responsable')}{' '}
                  </label>
                  {/* <Select
                    value={selectedOptionOptionRolResponsable}
                    onChange={this.handleChangeOptionRolResponsable}
                    options={dataExampleRolResponsable}
                  /> */}
                  <select
                    name={'chargeId'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.chargeId}
                    className="form-control form-control-sm"
                  >
                    <option value={''}>
                      --{' '}
                      {t('app_sedes_form_registrar_select_cargo_responsable')}{' '}
                      --
                    </option>
                    {mapOptionsCharges}
                  </select>
                </div>
              </Col>
              <Col sm="12">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_sedes_form_registrar_estado')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      name={'status'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.status}
                      type="checkbox"
                      id="ExampleInputCheckbox"
                      label={t('app_sedes_form_registrar_estado_descripcion')}
                      className={
                        errors.status && touched.status && 'invalid-feedback'
                      }
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
              </Col>
            </Row>
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
                  {t('app_sedes_form_registrar_boton_guardar')}
                </div>
              )}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default withTranslation('translations')(
  withFormik({
    mapPropsToValues: props => ({
      conglomerateId: props.sede.conglomerateId,
      companyId: props.sede.companyId,
      code: props.sede.code,
      name: props.sede.name,
      description: props.sede.description,
      prefix: props.sede.prefix,
      sequence: props.sede.sequence,
      countryId: props.sede.countryId,
      departmentId: props.sede.departmentId,
      cityId: props.sede.cityId,
      address: props.sede.address,
      phone: props.sede.phone,
      chargeId: props.sede.chargeId,
      status: props.sede.status
    }),
    validationSchema: Yup.object().shape({
      conglomerateId: Yup.string()
        .required(' Por favor seleccione un conglomerado.')
        .ensure(),
      companyId: Yup.string()
        .required(' Por favor seleccione una empresa.')
        .ensure(),
      code: Yup.string()
        .required(' Por favor introduzca un código.')
        .matches(/^[0-9a-zA-Z]+$/, ' Código no válido.')
        .max(15, ' Máximo 15 caracteres.')
        .min(2, ' Mínimo 2 caracteres.'),
      name: Yup.string()
        .required(' Por favor introduzca un nombre.')
        .max(100, ' Máximo 100 caracteres'),
      description: Yup.string().max(250, 'Máximo 250 caracteres.'),
      prefix: Yup.string()
        .required(' Por favor asigne un prefijo de radicación.')
        .min(2, ' Mínimo 2 caracteres.')
        .max(6, ' Máximo 6 caracteres.'),
      sequence: Yup.number()
        .required(' Por favor asigne una secuencia de radicación.')
        .integer()
        .positive(),
      countryId: Yup.string()
        .ensure()
        .required(' Por favor seleccione un país.'),
      departmentId: Yup.string()
        .ensure()
        .required(' Por favor seleccione un departamento.'),
      cityId: Yup.string()
        .ensure()
        .required(' Por favor seleccione una ciudad.'),
      address: Yup.string().required(' Por favor introduzca una dirección.'),
      phone: Yup.string()
        .max(10, ' Máximo 8 caracteres')
        .required(' Por favor introduzca un número telefónico.'),
      chargeId: Yup.string().ensure(),
      status: Yup.bool()
        .test(
          'Activo',
          ' Es necesario activar la sede.',
          value => value === true
        )
        .required(' Es necesario activar la sede.')
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
        fetch(HEADQUARTERS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa('sgdea:123456')
          },
          body: JSON.stringify({
            description: values.description,
            code: values.code,
            name: values.name,
            prefix: values.prefix,
            sequence: values.sequence,
            address: values.address,
            phone: values.phone,
            companyId: values.companyId,
            cityId: values.cityId,
            chargeId: values.chargeId,
            status: tipoEstado(values.status),
            userName: 'jferrer'
          })
        })
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success('Se creo la sede con éxito.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 400) {
                toast.error('Error, la sede ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error('Error, no se pudo crear la sede.', {
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
  })(SedesForm)
);
