import React, { useState, useEffect, Fragment } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CustomInput,
  Alert
} from 'reactstrap';
import PropTypes from 'prop-types';
import IMGCONGLOMERADO from './../../../assets/img/puzzle.svg';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  CONGLOMERATES,
  CONTRIES_STATUS,
  DEPARTMENTS_STATUS,
  CITIES_STATUS,
  CHARGES_STATUS
} from './../../../services/EndPoints';
import { Trans } from 'react-i18next';
import moment from 'moment';

class ModalEditConglomerado extends React.Component {
  state = {
    modal: this.props.modaleditstate,
    idConglomerado: this.props.id,
    dataResult: {},
    alertError: false,
    alertError400: false,
    alertSuccess: false,
    t: this.props.t,
    optionsCountries: [0],
    optionsDepartment: [0],
    optionsCitys: [0],
    optionsCharges: [0],
    status: 0,
    username: 'ccuartas'
  };

  componentDidMount() {
    this.getDataCountries();
    this.getDataDepartments();
    this.getDataCitys();
    this.getDataCharges();
  }

  toggle = id => {
    this.setState(
      {
        modal: !this.state.modal,
        idConglomerado: id
      },
      () => {
        this.props.updateTable();
      }
    );
    this.getConglomeradoByID(id);
  };

  getConglomeradoByID = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/conglomerate/${id}?username=${this.state.username}`,
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
        console.log(data);
        this.setState({
          dataResult: {
            conglomerate_country: data.city.department.country.id,
            conglomerate_department: data.city.department.id,
            conglomerate_city: data.city.id,
            conglomerate_name: data.name,
            code: data.code,
            description: data.description,
            status: data.status,
            conglomerate_charge: data.charge === null ? ' ' : data.charge.id
          }
        });
      })
      .catch(error => console.log(error));
  };

  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    return;
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertSuccess: false
    });
  };
  getDataCountries = data => {
    fetch(CONTRIES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCountries: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  getDataDepartments = data => {
    fetch(DEPARTMENTS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsDepartment: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataCitys = data => {
    fetch(CITIES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCitys: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  getDataCharges = data => {
    fetch(CHARGES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCharges: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  render() {
    console.log(this.state.dataResult);
    const mapOptionsCountries = this.state.optionsCountries.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsDepartments = this.state.optionsDepartment.map(
      (aux, idx) => {
        return <option value={aux.id}>{aux.name}</option>;
      }
    );

    const mapOptionsCitys = this.state.optionsCitys.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsCharges = this.state.optionsCharges.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const dataResult = this.state.dataResult;
    const auxID = this.state.idConglomerado;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <Trans>
              {this.props.t('app_conglomerado_modal_actualizar_titulo')}
            </Trans>
            &nbsp;{this.state.dataResult.conglomerate_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo;
                if (data === true || data === 1) {
                  return (tipo = 1);
                } else if (data === false || data === 0) {
                  return (tipo = 0);
                }
                return 0;
              };
              setTimeout(() => {
                fetch(CONGLOMERATES, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idConglomerado,
                    code: values.code,
                    name: values.conglomerate_name,
                    description: values.description,
                    status: tipoEstado(values.status),
                    cityId: values.conglomerate_city,
                    chargeId: values.conglomerate_charge,
                    userName: 'jferrer'
                  })
                })
                  .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState(
                          {
                            alertSuccess: false,
                            modal: false
                          },
                          this.props.updateTable()
                        );
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError400: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: !this.state.modal
                        });
                      }, 3000);
                    }
                  })
                  .catch(error => console.log('', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string()
                .required(' Por favor introduzca un código alfanumérico.')
                .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(15, ' Máximo 15 caracteres.'),
              conglomerate_name: Yup.string().required(
                ' Por favor introduzca un nombre.'
              ),
              conglomerate_country: Yup.string()
                .required(' Por favor seleccione un país.')
                .ensure(),
              conglomerate_department: Yup.string()
                .required(' Por favor seleccione un departamento.')
                .ensure(),
              conglomerate_city: Yup.string()
                .required(' Por favor seleccione una ciudad.')
                .ensure(),
              conglomerate_charge: Yup.string().ensure(),
              description: Yup.string()
                .nullable()
                .max(250, ' Máximo 250 caracteres.'),
              status: Yup.bool().test('Activo', '', value => value === true)
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                setFieldValue
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error al actualizar el conglomerado.
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      Error, el conglomerado ya esta asignado.
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      Se actualizo el conglomerado con éxito.
                    </Alert>
                    <form className="form">
                      <div className="row">
                        <div className="col-md-3">
                          <img
                            src={IMGCONGLOMERADO}
                            className="img-thumbnail"
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="">
                            {' '}
                            <h5
                              className=""
                              style={{ borderBottom: '1px solid black' }}
                            >
                              {' '}
                              <Trans>
                                {this.props.t(
                                  'app_conglomerado_modal_actualizar_titulo_2'
                                )}
                              </Trans>{' '}
                            </h5>{' '}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  <Trans>
                                    {this.props.t(
                                      'app_conglomerado_modal_actualizar_codigo'
                                    )}
                                  </Trans>{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <input
                                  type="text"
                                  name={'code'}
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
                                  <Trans>
                                    {this.props.t(
                                      'app_conglomerado_modal_actualizar_nombre'
                                    )}
                                  </Trans>{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <input
                                  type="text"
                                  name="conglomerate_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_name}
                                  className={`form-control form-control-sm ${errors.conglomerate_name &&
                                    touched.conglomerate_name &&
                                    'is-invalid'}`}
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.conglomerate_name &&
                                  touched.conglomerate_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name={'conglomerate_name'} />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {this.props.t(
                                    'app_conglomerado_modal_actualizar_pais'
                                  )}
                                </label>
                                <span className="text-danger">*</span>{' '}
                                <SelectCountry
                                  name={'conglomerate_country'}
                                  onChange={e =>
                                    setFieldValue(
                                      'conglomerate_country',
                                      e.target.value
                                    )
                                  }
                                  value={values.conglomerate_country}
                                  className={`form-control form-control-sm ${errors.conglomerate_country &&
                                    touched.conglomerate_country &&
                                    'is-invalid'}`}
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.conglomerate_country &&
                                  touched.conglomerate_country ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_country" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_conglomerado_modal_actualizar_departamento'
                                  )}{' '}
                                </label>
                                <span className="text-danger">*</span>{' '}
                                <SelectDepartment
                                  conglomerate_country={
                                    props.values.conglomerate_country
                                  }
                                  name="conglomerate_department"
                                  value={values.conglomerate_department}
                                  onChange={e =>
                                    setFieldValue(
                                      'conglomerate_department',
                                      e.target.value
                                    )
                                  }
                                  className={`form-control form-control-sm ${errors.conglomerate_department &&
                                    touched.conglomerate_department &&
                                    'is-invalid'}`}
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.conglomerate_department &&
                                  touched.conglomerate_department ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_department" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_conglomerado_modal_actualizar_ciudad'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <SelectCity
                                  conglomerate_department={
                                    props.values.conglomerate_department
                                  }
                                  name={'conglomerate_city'}
                                  value={values.conglomerate_city}
                                  onChange={e =>
                                    setFieldValue(
                                      'conglomerate_city',
                                      e.target.value
                                    )
                                  }
                                  className={`form-control form-control-sm ${errors.conglomerate_city &&
                                    touched.conglomerate_city &&
                                    'is-invalid'}`}
                                />

                                <div style={{ color: '#D54B4B' }}>
                                  {errors.conglomerate_city &&
                                  touched.conglomerate_city ? (
                                    <i class="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="conglomerate_city" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_conglomerado_modal_actualizar_cargo_responsable'
                                  )}{' '}
                                </label>
                                <select
                                  name="conglomerate_charge"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.conglomerate_charge}
                                  className="form-control form-control-sm"
                                >
                                  {' '}
                                  <option value={' '}>
                                    {' '}
                                    --
                                    {this.props.t(
                                      'app_conglomerado_form_select_cargo_responsable'
                                    )}{' '}
                                    --{' '}
                                  </option>
                                  {mapOptionsCharges}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  <Trans>
                                    {this.props.t(
                                      'app_conglomerado_modal_actualizar_descripcion'
                                    )}
                                  </Trans>
                                </label>
                                <textarea
                                  name="description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  className="form-control form-control-sm"
                                />

                                <ErrorMessage name="description" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  <Trans>
                                    {this.props.t(
                                      'app_conglomerado_modal_actualizar_estado'
                                    )}
                                  </Trans>{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <div className="text-justify ">
                                  <Field
                                    name="status"
                                    type=""
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="conglomeradoModalEdit"
                                          label={this.props.t(
                                            'app_conglomerado_modal_actualizar_estado_descripcion'
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.status &&
                                            touched.status &&
                                            'invalid-feedback'
                                          }
                                        />
                                      );
                                    }}
                                  />

                                  <ErrorMessage name="status" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={'btn btn-outline-success btn-sm'}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-pencil" />{' '}
                      {this.props.t(
                        'app_conglomerado_modal_actualizar_botom_actualizar'
                      )}
                    </button>
                    <button
                      className={'btn btn-outline-secondary btn-sm'}
                      type="button"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" />{' '}
                      {this.props.t(
                        'app_conglomerado_modal_actualizar_botom_cerrar'
                      )}
                    </button>
                  </ModalFooter>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalEditConglomerado.propTypes = {
  modaleditstate: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any
};

export default ModalEditConglomerado;

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
    this.props.onChange('conglomerate_country', value);
  };

  handleBlur = () => {
    this.props.onBlur('conglomerate_country', true);
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
    id: this.props.conglomerate_country
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerate_country !== state.id) {
      return {
        id: props.conglomerate_country
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.conglomerate_country !== prevProps.conglomerate_country) {
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
        console.log(data);
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
    id: this.props.conglomerate_department
  };

  static getDerivedStateFromProps(props, state) {
    if (props.conglomerate_department !== state.id) {
      return {
        id: props.conglomerate_department
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.conglomerate_department !== prevProps.conglomerate_department
    ) {
      this.getDataCitys();
    }
  }

  componentDidMount() {
    this.getDataCitys();
  }

  getDataCitys = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/city/department/${this.state.id}`,
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
