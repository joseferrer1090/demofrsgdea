import React, { useEffect, useState } from 'react';
import { Formik, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  CustomInput,
  CardBody,
  CardFooter,
  CardHeader,
  Card
} from 'reactstrap';
import {
  CONGLOMERATES,
  CITIES_STATUS,
  CHARGES_STATUS,
  DEPARTMENTS_STATUS,
  CONTRIES_STATUS
} from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';
import { isLabeledStatement } from '@babel/types';

const ConglomeradorForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleSubmit,
    handleReset,
    t
  } = props;

  const [optionsDepartment, setOptionsDepartment] = useState([]);
  const [optionsCountries, setOptionsCountries] = useState([]);
  const [optionsCitys, setOptionsCitys] = useState([]);
  const [optionsCharges, setOptionsCharges] = useState([]);

  useEffect(() => {
    getDataCountries();
    getDataDepartments();
    getDataCitys();
    getDataCharges();
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
        <CardHeader> {t('app_conglomerado_tab_title')} </CardHeader>
        <CardBody>
          <form className="form" noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_conglomerado_form_registrar_codigo')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name="codigo"
                    onChange={e => {
                      setFieldValue('codigo', e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control form-control-sm ${errors.codigo &&
                      touched.codigo &&
                      'is-invalid'}`}
                    placeholder=""
                    value={values.codigo}
                  />
                  <div className="" style={{ color: '#D54B4B' }}>
                    {errors.codigo && touched.codigo ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="codigo" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_conglomerado_form_registrar_nombre')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <input
                    name="nombre"
                    onChange={e => {
                      setFieldValue('nombre', e.target.value.toUpperCase());
                    }}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control form-control-sm ${errors.nombre &&
                      touched.nombre &&
                      'is-invalid'}`}
                    value={values.nombre}
                    placeholder=""
                  />
                  <div className="" style={{ color: '#D54B4B' }}>
                    {errors.nombre && touched.nombre ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="nombre" />
                  </div>{' '}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    {t('app_conglomerado_form_registrar_pais')}
                    <span className="text-danger">*</span>{' '}
                  </label>

                  <SelectCountry
                    t={props.t}
                    name={'countryId'}
                    onChange={e => setFieldValue('countryId', e.target.value)}
                    onBlur={() => {
                      setFieldTouched('countryId', true);
                    }}
                    value={values.countryId}
                    className={`form-control form-control-sm ${errors.countryId &&
                      touched.countryId &&
                      'is-invalid'}`}
                  />

                  {touched ? (
                    <div style={{ color: '#D54B4B' }}>
                      {errors.countryId && touched.countryId ? (
                        <i class="fa fa-exclamation-triangle" />
                      ) : null}
                      <ErrorMessage name="countryId" />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    {t('app_conglomerado_form_registrar_departamento')}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <SelectDepartment
                    t={props.t}
                    countryId={props.values.countryId}
                    name="departmentId"
                    value={values.departmentId}
                    onChange={e =>
                      setFieldValue('departmentId', e.target.value)
                    }
                    onBlur={() => {
                      setFieldTouched('departmentId', true);
                    }}
                    className={`form-control form-control-sm ${errors.departmentId &&
                      touched.departmentId &&
                      'is-invalid'}`}
                  />

                  <div style={{ color: '#D54B4B' }}>
                    {errors.departmentId && touched.departmentId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="departmentId" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    {t('app_conglomerado_form_registrar_ciudad')}{' '}
                    <span className="text-danger">*</span>
                  </label>
                  <SelectCity
                    t={props.t}
                    departmentId={props.values.departmentId}
                    name={'cityId'}
                    onChange={e => setFieldValue('cityId', e.target.value)}
                    onBlur={e => {
                      setFieldTouched('cityId', true);
                    }}
                    className={`form-control form-control-sm ${errors.cityId &&
                      touched.cityId &&
                      'is-invalid'}`}
                  />

                  <div style={{ color: '#D54B4B' }}>
                    {errors.cityId && touched.cityId ? (
                      <i class="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="cityId" />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {' '}
                    {t(
                      'app_conglomerado_form_registrar_cargo_responsable'
                    )}{' '}
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
                      -- {t(
                        'app_conglomerado_form_select_cargo_responsable'
                      )}{' '}
                      --{' '}
                    </option>
                    {mapOptionsCharges}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {t('app_conglomerado_form_registrar_descripcion')}
                  </label>
                  <textarea
                    name="descripcion"
                    value={values.descripcion}
                    className="form-control form-control-sm"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="" style={{ color: '#D54B4B' }}>
                    {errors.descripcion && touched.descripcion ? (
                      <i className="fa fa-exclamation-triangle" />
                    ) : null}
                    <ErrorMessage name="descripcion" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    {' '}
                    {t('app_conglomerado_form_registrar_estado')}{' '}
                    <span className="text-danger">*</span>{' '}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      value={values.estado}
                      name="estado"
                      type="checkbox"
                      id="ExampleInputCheckbox"
                      label={t(
                        'app_conglomerado_form_registrar_estado_descripcion'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.estado && touched.estado && 'invalid-feedback'
                      }
                    />
                    {/* <p
                              className="text-muted"
                              style={{ textAlign: "justify" }}
                            >
                              Si esta opción se encuentra activada, representa
                              que el conglomerado es visible en el sistema y se
                              podrán realizar operaciones entre cada uno de los
                              módulos correspondientes de la aplicación. En caso
                              contrario el conglomerado no se elimina del
                              sistema solo quedará inactivo e invisibles para
                              cada uno de los módulos correspondiente del
                              sistema.
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
                  {t('app_conglomerado_from_button_guardar')}
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
      codigo: props.conglomerado.codigo,
      nombre: props.conglomerado.nombre,
      descripcion: props.conglomerado.descripcion,
      estado: props.conglomerado.estado,
      countryId: props.conglomerado.countryId,
      departmentId: props.conglomerado.departmentId,
      cityId: props.conglomerado.cityId,
      chargeId: props.conglomerado.chargeId
    }),
    validationSchema: Yup.object().shape({
      codigo: Yup.string()
        .required(' Por favor introduzca un código alfanumérico.')
        .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
        .min(2, ' Mínimo 2 caracteres.')
        .max(15, ' Máximo 15 caracteres.'),
      nombre: Yup.string()
        .required(' Por favor introduzca un nombre.')
        .max(100),
      descripcion: Yup.string().max(250, ' Máximo 250 caracteres.'),
      estado: Yup.bool()
        .test(
          'Activo',
          ' Es necesario activar el conglomerado.',
          value => value === true
        )
        .required(' Es necesario activar el conglomerado.'),
      countryId: Yup.string()
        .required(' Por favor seleccione un país.')
        .ensure(),
      departmentId: Yup.string()
        .required(' Por favor seleccione un departamento.')
        .ensure(),
      cityId: Yup.string()
        .required(' Por favor seleccione una ciudad.')
        .ensure(),
      chargeId: Yup.string().ensure()
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
        // alert(JSON.stringify(values, '', 2));
        fetch(CONGLOMERATES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa('sgdea:123456')
          },
          body: JSON.stringify({
            code: values.codigo,
            name: values.nombre,
            description: values.descripcion,
            status: tipoEstado(values.estado),
            chargeId: values.chargeId,
            cityId: values.cityId,
            userName: 'jferrer'
          })
        })
          .then(response =>
            response.json().then(data => {
              if (response.status === 201) {
                toast.success('Se creo el conglomerado con éxito.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error('El conglomerado ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              }
            })
          )
          .catch(error => {
            toast.error(`Error ${error}.`, {
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
  })(ConglomeradorForm)
);

//--------------------//
class SelectCountry extends React.Component {
  state = {
    dataCountry: [],
    t: this.props.t
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
          onBlur={this.props.onBlur}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={''}>
            -- {this.props.t('app_conglomerado_form_select_pais')} --
          </option>
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
    id: this.props.countryId,
    t: this.props.t
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
    console.log(this.state.countryId);
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
          onBlur={this.props.onBlur}
        >
          <option value={''}>
            -- {this.props.t('app_conglomerado_form_select_departamento')} --
          </option>
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
    id: this.props.departmentId,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.departmentId !== state.id) {
      return {
        departmentId: props.departmentId
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
          onBlur={this.props.onBlur}
        >
          <option value={''}>
            -- {this.props.t('app_conglomerado_form_select_ciudad')} --
          </option>
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
