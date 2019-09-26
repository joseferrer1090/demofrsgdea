import React, { useState, useEffect } from 'react';
import { Formik, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput
} from 'reactstrap';
import {
  COMPANYS,
  CONGLOMERATES_STATUS,
  CITIES_STATUS,
  CHARGES_STATUS,
  DEPARTMENTS_STATUS,
  CONTRIES_STATUS
} from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';

const EmpresaForm = props => {
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

  // console.log(`Errors: ${errors}`);
  // console.log(`Touched: ${touched}`);
  const [optionsConglomerate, setOptionsConglomerate] = useState([]);
  const [optionsCharges, setOptionsCharges] = useState([]);
  const [optionsCountries, setOptionsCountries] = useState([]);
  const [optionsCitys, setOptionsCitys] = useState([]);
  const [optionsDepartment, setOptionsDepartment] = useState([]);

  useEffect(() => {
    getDataConglomerates();
    getDataCharges();
    getDataDepartments();
    getDataCountries();
    getDataCitys();
  }, []);
  const getDataCountries = data => {
    fetch(CONTRIES_STATUS, {
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
    fetch(DEPARTMENTS_STATUS, {
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
    fetch(CITIES_STATUS, {
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

  const getDataConglomerates = data => {
    fetch(CONGLOMERATES_STATUS, {
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

  const mapOptionsConglomerate = optionsConglomerate.map((aux, idx) => {
    return (
      <option key={aux.id} value={aux.id}>
        {aux.name}
      </option>
    );
  });

  const getDataCharges = data => {
    fetch(CHARGES_STATUS, {
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
  return (
    <div>
      <Card>
        <ToastContainer />
        <CardHeader> {t('app_empresa_tab_title')} </CardHeader>
        <CardBody>
          <form className="form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_empresa_form_registrar_conglomerado')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <select
                    name="conglomerateId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`form-control form-control-sm ${errors.conglomerateId &&
                      touched.conglomerateId &&
                      'is-invalid'}`}
                    value={values.conglomerateId}
                  >
                    <option value={''} disabled>
                      -- {t('app_empresa_form_registrar_select_conglomerado')}{' '}
                      --
                    </option>
                    {mapOptionsConglomerate}
                  </select>
                  <div style={{ color: '#D54B4B' }}>
                    {errors.conglomerateId && touched.conglomerateId ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="conglomerateId" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_empresa_form_registrar_codigo')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name="code"
                    onBlur={handleBlur}
                    onChange={e => {
                      setFieldValue('code', e.target.value.toUpperCase());
                    }}
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
                    {t('app_empresa_form_registrar_nit')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name="nit"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nit}
                    className={`form-control form-control-sm ${errors.nit &&
                      touched.nit &&
                      'is-invalid'}`}
                    type="text"
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.nit && touched.nit ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="nit" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_empresa_form_registrar_nombre')}{' '}
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
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label> {t('app_empresa_form_registrar_descripcion')} </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="form-control form-control-sm"
                  />
                  <div style={{ color: '#D54B4B' }}>
                    {errors.description && touched.description ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="description" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>{t('app_empresa_form_registrar_pais')}</label>
                  <span className="text-danger">*</span>{' '}
                  <SelectCountry
                    name={'countryId'}
                    onChange={e => setFieldValue('countryId', e.target.value)}
                    value={values.countryId}
                    className={`form-control form-control-sm ${errors.countryId &&
                      touched.countryId &&
                      'is-invalid'}`}
                  />
                  {/* <select
                    name={'countryId'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.countryId}
                    className={`form-control form-control-sm ${errors.countryId &&
                      touched.countryId &&
                      'is-invalid'}`}
                  >
                    <option value={''} disabled>
                      -- {t('app_empresa_form_registrar_select_pais')} --
                    </option>
                    {mapOptionsCountries}
                  </select> */}
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
                  <label>{t('app_empresa_form_registrar_departamento')}</label>
                  <span className="text-danger">*</span>{' '}
                  <SelectDepartment
                    countryId={props.values.countryId}
                    name="departmentId"
                    value={values.departmentId}
                    onChange={e =>
                      setFieldValue('departmentId', e.target.value)
                    }
                    className={`form-control form-control-sm ${errors.departmentId &&
                      touched.departmentId &&
                      'is-invalid'}`}
                  />
                  {/* <select
                    name={'departmentId'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.departmentId}
                    className={`form-control form-control-sm ${errors.departmentId &&
                      touched.departmentId &&
                      'is-invalid'}`}
                  >
                    <option value={''} disabled>
                      -- {t('app_empresa_form_registrar_select_departamento')}{' '}
                      --
                    </option>
                    {mapOptionsDepartments}
                  </select> */}
                  <div style={{ color: '#D54B4B' }}>
                    {errors.departmentId && touched.departmentId ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="departmentId" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    {t('app_empresa_form_registrar_ciudad')}{' '}
                    <span className="text-danger">*</span>
                  </label>
                  <SelectCity
                    departmentId={props.values.departmentId}
                    name={'cityId'}
                    onChange={e => setFieldValue('cityId', e.target.value)}
                    className={`form-control form-control-sm ${errors.cityId &&
                      touched.cityId &&
                      'is-invalid'}`}
                  />
                  {/* <select
                    name={'cityId'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cityId}
                    className={`form-control form-control-sm ${errors.cityId &&
                      touched.cityId &&
                      'is-invalid'}`}
                  >
                    <option value={''} disabled>
                      -- {t('app_empresa_form_registrar_select_ciudad')} --
                    </option>
                    {mapOptionsCitys}
                  </select> */}
                  <div style={{ color: '#D54B4B' }}>
                    {errors.cityId && touched.cityId ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="cityId" />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_empresa_form_registrar_cargo_responsable')}
                  </label>
                  <select
                    name="chargeId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.chargeId}
                    className="form-control form-control-sm"
                  >
                    {' '}
                    <option value={''} disabled>
                      {' '}
                      --{' '}
                      {t(
                        'app_empresa_form_registrar_select_cargo_responsable'
                      )}{' '}
                      --{' '}
                    </option>
                    {mapOptionsCharges}
                  </select>
                </div>
              </div>
            </div>
            <div className="row" />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="">
                    <div className="form-group">
                      <label>
                        {' '}
                        {t('app_empresa_form_registrar_estado')}{' '}
                        <span className="text-danger">*</span>{' '}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          name="status"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="checkbox"
                          id="exampleCheck1"
                          label={t(
                            'app_empresa_form_registrar_estado_descripcion'
                          )}
                          className={
                            errors.status &&
                            touched.status &&
                            'invalid-feedback'
                          }
                          value={values.status}
                        />
                      </div>
                    </div>
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
                  {t('app_empresa_form_registrar_boton_guardar')}
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
      conglomerateId: props.empresa.conglomerateId,
      code: props.empresa.code,
      nit: props.empresa.nit,
      name: props.empresa.name,
      description: props.empresa.description,
      chargeId: props.empresa.chargeId,
      status: props.empresa.status,
      cityId: props.empresa.cityId,
      departmentId: props.empresa.departmentId,
      countryId: props.empresa.countryId
    }),
    validationSchema: Yup.object().shape({
      conglomerateId: Yup.string()
        .ensure()
        .required(' Por favor seleccione un conglomerado.'),
      code: Yup.string()
        .required(' Por favor introduzca un código alfanumérico.')
        .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
        .min(2, ' Mínimo 2 caracteres.')
        .max(15, ' Máximo 15 caracteres.'),
      nit: Yup.string()
        .matches(
          /^[0-9]+$/,
          '  El número Nit no acepta puntos, letras, ni caracteres especiales.'
        )
        .min(8, ' Mínimo 8 caracteres.')
        .max(15, ' Máximo 15 caracteres.')
        .required(' Por favor introduzca el Nit.'),
      // .positive(' El número Nit debe ser positivo.')
      // .integer(' El número Nit no acepta puntos, ni caracteres especiales.'),
      name: Yup.string()
        .required(' Por favor introduzca un nombre.')
        .max(100, 'Máximo 100 caracteres.'),
      description: Yup.string().max(250, ' Máximo 250 caracteres.'),
      countryId: Yup.string()
        .ensure()
        .required(' Por favor seleccione un país.'),
      departmentId: Yup.string()
        .ensure()
        .required(' Por favor seleccione un departamento.'),
      cityId: Yup.string()
        .ensure()
        .required(' Por favor seleccione una ciudad.'),
      chargeId: Yup.string().ensure(),
      status: Yup.bool()
        .test(
          'Activo',
          'Es necesario activar el conglomerado',
          value => value === true
        )
        .required('Se debe aceptar la activacion de la empresa.')
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
        fetch(COMPANYS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa('sgdea:123456')
          },
          body: JSON.stringify({
            conglomerateId: values.conglomerateId,
            cityId: values.cityId,
            code: values.code,
            nit: values.nit,
            name: values.name,
            description: values.description,
            chargeId: values.chargeId,
            status: tipoEstado(values.status),
            userName: 'jferrer'
          })
        })
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success('Se creo la empresa con éxito.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 400) {
                toast.error('Error, la empresa ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error('Error, no se pudo crear la empresa.', {
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
  })(EmpresaForm)
);

//--------------------//
class SelectCountry extends React.Component {
  state = {
    dataCountry: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/country/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCountry: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange('countryId', value);
  };

  handleBlur = () => {
    this.props.onBlur('countryId', true);
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataCountry.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
//--------------------//
class SelectDepartment extends React.Component {
  state = {
    dataDepartment: [],
    id: this.props.countryId
  };

  static getDerivedStateFromProps(props, state) {
    if (props.countryId !== state.id) {
      return {
        id: props.countryId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.countryId !== prevProps.countryId) {
      this.getDataDepartment();
    }
  }

  componentDidMount() {
    this.getDataDepartment();
  }

  getDataDepartment = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/department/country/${this.state.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDepartment: data
        });
      })
      .catch(err => console.log('Error', err));
  };
  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataDepartment.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
//--------------------//
class SelectCity extends React.Component {
  state = {
    dataCity: [],
    id: this.props.departmentId
  };

  static getDerivedStateFromProps(props, state) {
    if (props.departmentId !== state.id) {
      return {
        id: props.departmentId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.departmentId !== prevProps.departmentId) {
      this.getDataCitys();
    }
  }

  componentDidMount() {
    this.getDataCitys();
  }

  getDataCitys = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/city/department/${this.props.departmentId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCity: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataCity.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
