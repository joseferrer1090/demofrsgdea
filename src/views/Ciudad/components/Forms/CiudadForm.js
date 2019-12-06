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
  CITYS,
  CONTRIES_STATUS,
  DEPARTMENTS_STATUS
} from './../../../../services/EndPoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { withTranslation } from 'react-i18next';
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
    handleReset,
    setFieldTouched,
    t
  } = props;

  const [optionsDepartment, setOptionsDepartment] = useState([]);
  const [optionsCountries, setOptionsCountries] = useState([]);

  useEffect(() => {
    getDataCountries();
    getDataDepartments();
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

  return (
    <Row>
      <Col sm={{ size: 8, offset: 2 }}>
        <Card>
          <ToastContainer />
          <CardHeader> {t('app_ciudad_tab_title')} </CardHeader>
          <CardBody>
            <form className="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      {t('app_ciudad_form_select_pais')}{' '}
                      <span className="text-danger">*</span>{' '}
                    </label>
                    <SelectCountry
                      t={props.t}
                      name={'countryId'}
                      onChange={e => setFieldValue('countryId', e.target.value)}
                      onBlur={() => setFieldTouched('countryId', true)}
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
                        {' '}
                        -- {t('app_ciudad_form_registrar_pais')} --
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      {t('app_ciudad_form_select_departamento')}{' '}
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
                      onBlur={() => setFieldTouched('departmentId', true)}
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
                        {' '}
                        -- {t('app_ciudad_form_registrar_departamento')} --{' '}
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      {' '}
                      {t('app_ciudad_form_registrar_codigo')}{' '}
                      <span className="text-danger">*</span>{' '}
                    </label>
                    <input
                      name="code"
                      onChange={e => {
                        setFieldValue('code', e.target.value.toUpperCase());
                      }}
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
                      {t('app_ciudad_form_registrar_nombre')}{' '}
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
                      {t('app_ciudad_form_registrar_estado')}{' '}
                      <span className="text-danger">*</span>{' '}
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
                        label={t(
                          'app_ciudad_form_registrar_estado_descripcion'
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
                    <i className="fa fa-save" />{' '}
                    {t('app_ciudad_form_button_guardar')}
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
      code: props.ciudad.code,
      name: props.ciudad.name,
      status: props.ciudad.status,
      countryId: props.ciudad.countryId,
      departmentId: props.ciudad.departmentId
    }),
    validationSchema: Yup.object().shape({
      code: Yup.string()
        .required(' Por favor introduzca un código alfanumérico.')
        .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
        .min(2, ' Mínimo 2 caracteres.')
        .max(15, ' Máximo 15 caracteres.'),
      name: Yup.string()
        .required(' Por favor introduzca un nombre.')
        .max(100, 'Máximo 100 caracteres.'),
      status: Yup.bool()
        .test(
          'Activo',
          'Es necesario activar la ciudad',
          value => value === true
        )
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
              } else if (response.status === 400) {
                toast.error('Error, la ciudad ya existe.', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: css({
                    marginTop: '60px'
                  })
                });
              } else if (response.status === 500) {
                toast.error('Error, no se pudo crear la ciudad.', {
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
  })(CiudadForm)
);

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
          value={this.props.value}
          className={this.props.className}
          onBlur={this.props.onBlur}
        >
          <option value={''}>
            -- {this.props.t('app_ciudad_form_registrar_pais')} --
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
            -- {this.props.t('app_ciudad_form_registrar_departamento')} --
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
