import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput,
  Alert
} from 'reactstrap';
import { Formik, withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import IMGEMPRESA from './../../../assets/img/company.svg';
import {
  CONGLOMERATES_STATUS,
  CHARGES_STATUS,
  CONTRIES_STATUS,
  DEPARTMENTS_STATUS,
  CITIES_STATUS
} from '../../../services/EndPoints';

class ModalEditEmpresa extends React.Component {
  state = {
    modal: this.props.modaleditempresa,
    dataCompany: {},
    optionsConglomerate: [0],
    optionsCharges: [0],
    id: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertError400: '',
    optionsCountries: [0],
    optionsCitys: [0],
    optionsDepartment: [0],
    t: this.props.t,
    company_status: 0,
    username: 'ccuartas'
  };

  componentDidMount() {
    this.getDataConglomerates();
    this.getDataCharges();
    this.getDataCitys();
    this.getDataDepartments();
    this.getDataCountries();
  }

  toggle = id => {
    this.setState(
      {
        modal: !this.state.modal,
        id: id
      },
      () => this.props.updateTable()
    );
    this.getCompanyById(id);
  };

  getDataConglomerates = data => {
    fetch(CONGLOMERATES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsConglomerate: data
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
  getCompanyById = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/${id}?username=${this.state.username}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + window.btoa('sgdea:123456'),
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCompany: {
            company_country: data.city.department.country.id,
            company_department: data.city.department.id,
            company_city: data.city.id,
            company_code: data.code,
            company_nit: data.nit,
            company_name: data.name,
            company_description: data.description,
            company_status: data.status,
            company_conglomerate: data.conglomerate.id,
            company_charge: data.charge === null ? ' ' : data.charge.id
            // data.charge !== null ? { company_charge: data.charge.id } : ''
          }
        });
      })
      .catch(Error => console.log('', Error));
  };

  getCharge = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCharge: data
        });
      })
      .catch(Error => console.log('', Error));
  };

  onDismiss = () => {
    this.setState({
      alertSuccess: false,
      alertError: false
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
  render() {
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
    const mapOptionsConglomerate = this.state.optionsConglomerate.map(
      (aux, idx) => {
        return (
          <option key={aux.id} value={aux.id}>
            {aux.name}
          </option>
        );
      }
    );
    const mapOptionsCharges = this.state.optionsCharges.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_empresa_modal_actualizar_titulo')}{' '}
            {this.state.dataCompany.company_name}{' '}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.dataCompany}
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
                fetch(`http://192.168.10.180:7000/api/sgdea/company`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    code: values.company_code,
                    nit: values.company_nit,
                    name: values.company_name,
                    description: values.company_description,
                    conglomerateId: values.company_conglomerate,
                    chargeId: values.company_charge,
                    cityId: values.company_city,
                    status: tipoEstado(values.company_status),
                    userName: 'jferrer'
                  })
                }).then(response => {
                  if (response.status === 200) {
                    this.setState(
                      {
                        alertSuccess: true
                      },
                      () => this.props.updateTable()
                    );
                    setTimeout(() => {
                      this.setState({
                        alertSuccess: false,
                        modal: false
                      });
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
                });
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              company_conglomerate: Yup.string()
                .ensure()
                .required(' Por favor seleccione un conglomerado.'),
              company_code: Yup.string()
                .required(' Por favor introduzca un código alfanumérico.')
                .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(15, ' Máximo 15 caracteres.'),
              company_name: Yup.string()
                .required(' Por favor introduzca un nombre.')
                .max(100, ' Máximo 100 caracteres.'),
              company_nit: Yup.string()
                .matches(
                  /^[0-9]+$/,
                  '  El número Nit no acepta puntos, letras, ni caracteres especiales.'
                )
                .min(8, ' Mínimo 8 caracteres.')
                .max(15, ' Máximo 15 caracteres.')
                .required(' Por favor introduzca el Nit.'),
              company_description: Yup.string().max(
                250,
                ' Máximo 250 caracteres.'
              ),
              company_charge: Yup.string().ensure(),
              company_country: Yup.string()
                .ensure()
                .required(' Por favor seleccione un país.'),
              company_department: Yup.string()
                .ensure()
                .required(' Por favor seleccione un departamento.'),
              company_city: Yup.string()
                .ensure()
                .required(' Por favor seleccione una ciudad.'),
              company_status: Yup.bool().test(
                'Activo',
                '',
                value => value === true
              )
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
                setFieldValue,
                setFieldTouched
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <form className="form">
                      <Alert color="danger" isOpen={this.state.alertError}>
                        Error al actualizar la empresa.
                      </Alert>
                      <Alert color="success" isOpen={this.state.alertSuccess}>
                        Se actualizo la empresa con éxito.
                      </Alert>
                      <Alert color="danger" isOpen={this.state.alertError400}>
                        Error, la empresa ya esta asignada.
                      </Alert>
                      <Row>
                        <Col sm="3">
                          <img src={IMGEMPRESA} className="img-thumbnail" />
                        </Col>
                        <Col sm="9">
                          <div className="">
                            {' '}
                            <h5
                              className=""
                              style={{ borderBottom: '1px solid black' }}
                            >
                              {' '}
                              {this.props.t(
                                'app_empresa_modal_actualizar_titulo_2'
                              )}{' '}
                            </h5>{' '}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {this.props.t(
                                    'app_empresa_modal_actualizar_conglomerado'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                  <dd>
                                    {' '}
                                    <select
                                      className={`form-control form-control-sm ${errors.company_conglomerate &&
                                        touched.company_conglomerate &&
                                        'is-invalid'}`}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name={'company_conglomerate'}
                                      value={values.company_conglomerate}
                                    >
                                      <option value={''} disabled>
                                        --{' '}
                                        {this.props.t(
                                          'app_empresa_modal_actualizar_select_conglomerado'
                                        )}{' '}
                                        --
                                      </option>
                                      {mapOptionsConglomerate}
                                    </select>
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.company_conglomerate &&
                                      touched.company_conglomerate ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_conglomerate" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {this.props.t(
                                    'app_empresa_modal_actualizar_codigo'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                  <dd>
                                    <input
                                      name={'company_code'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.company_code}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.company_code &&
                                        touched.company_code &&
                                        'is-invalid'}`}
                                    />
                                    <div
                                      className=""
                                      style={{ color: '#D54B4B' }}
                                    >
                                      {errors.company_code &&
                                      touched.company_code ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_code" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {this.props.t(
                                    'app_empresa_modal_actualizar_nit'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                  <dd>
                                    {' '}
                                    <input
                                      type="text"
                                      name={'company_nit'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.company_nit}
                                      className={`form-control form-control-sm ${errors.company_nit &&
                                        touched.company_nit &&
                                        'is-invalid'}`}
                                    />{' '}
                                    <div
                                      className=""
                                      style={{ color: '#D54B4B' }}
                                    >
                                      {errors.company_nit &&
                                      touched.company_nit ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_nit" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  {this.props.t(
                                    'app_empresa_modal_actualizar_nombre'
                                  )}
                                  <span className="text-danger">*</span>{' '}
                                  <dd>
                                    {' '}
                                    <input
                                      name={'company_name'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.company_name}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.company_name &&
                                        touched.company_name &&
                                        'is-invalid'}`}
                                    />{' '}
                                    <div
                                      className=""
                                      style={{ color: '#D54B4B' }}
                                    >
                                      {errors.company_name &&
                                      touched.company_name ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_name" />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader>
                              {' '}
                              {this.props.t(
                                'app_empresa_modal_actualizar_collapse'
                              )}{' '}
                            </CardHeader>
                            <CardBody>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {this.props.t(
                                        'app_empresa_modal_actualizar_pais'
                                      )}
                                      <span className="text-danger">*</span>{' '}
                                    </label>
                                    <SelectCountry
                                      t={this.state.t}
                                      name={'company_country'}
                                      onChange={e =>
                                        setFieldValue(
                                          'company_country',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('company_country', true)
                                      }
                                      value={values.company_country}
                                      className={`form-control form-control-sm ${errors.company_country &&
                                        touched.company_country &&
                                        'is-invalid'}`}
                                    />
                                    {/* <select
                                      name={'company_country'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.company_country}
                                      className={`form-control form-control-sm ${errors.company_country &&
                                        touched.company_country &&
                                        'is-invalid'}`}
                                    >
                                      {' '}
                                      <option value={''} disabled>
                                        --{' '}
                                        {this.props.t(
                                          'app_empresa_modal_actualizar_select_pais'
                                        )}{' '}
                                        --
                                      </option>
                                      {mapOptionsCountries}{' '}
                                    </select>{' '} */}
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.company_country &&
                                      touched.company_country ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_country" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {this.props.t(
                                        'app_empresa_modal_actualizar_departamento'
                                      )}
                                      <span className="text-danger">*</span>{' '}
                                    </label>
                                    <SelectDepartment
                                      t={this.state.t}
                                      company_country={
                                        props.values.company_country
                                      }
                                      name="company_department"
                                      value={values.company_department}
                                      onChange={e =>
                                        setFieldValue(
                                          'company_department',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched(
                                          'company_department',
                                          true
                                        )
                                      }
                                      className={`form-control form-control-sm ${errors.company_department &&
                                        touched.company_department &&
                                        'is-invalid'}`}
                                    />
                                    {/* <select
                                      name="company_department"
                                      value={values.company_department}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={`form-control form-control-sm ${errors.company_department &&
                                        touched.company_department &&
                                        'is-invalid'}`}
                                    >
                                      <option value={''} disabled>
                                        --{' '}
                                        {this.props.t(
                                          'app_empresa_modal_actualizar_select_departamento'
                                        )}{' '}
                                        --
                                      </option>
                                      {mapOptionsDepartments}
                                    </select> */}
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.company_department &&
                                      touched.company_department ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_department" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {this.props.t(
                                        'app_empresa_modal_actualizar_ciudad'
                                      )}{' '}
                                      <span className="text-danger">*</span>{' '}
                                    </label>
                                    <SelectCity
                                      t={this.state.t}
                                      company_department={
                                        props.values.company_department
                                      }
                                      name={'company_city'}
                                      value={values.company_city}
                                      onChange={e =>
                                        setFieldValue(
                                          'company_city',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('company_city', true)
                                      }
                                      className={`form-control form-control-sm ${errors.company_city &&
                                        touched.company_city &&
                                        'is-invalid'}`}
                                    />
                                    {/* <select
                                      name="company_city"
                                      value={values.company_city}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={`form-control form-control-sm ${errors.company_city &&
                                        touched.company_city &&
                                        'is-invalid'}`}
                                    >
                                      <option value={''} disabled>
                                        --{' '}
                                        {this.props.t(
                                          'app_empresa_modal_actualizar_select_ciudad'
                                        )}{' '}
                                        --
                                      </option>
                                      {mapOptionsCitys}
                                    </select> */}
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.company_city &&
                                      touched.company_city ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_city" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {this.props.t(
                                        'app_empresa_modal_actualizar_descripcion'
                                      )}{' '}
                                    </label>
                                    <input
                                      name="company_description"
                                      value={values.company_description}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      type="text"
                                      className={`form-control form-control-sm ${errors.company_description &&
                                        touched.company_description &&
                                        'is-invalid'}`}
                                    />
                                    <div
                                      className=""
                                      style={{ color: '#D54B4B' }}
                                    >
                                      {errors.company_description &&
                                      touched.company_description ? (
                                        <i class="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_description" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {this.props.t(
                                        'app_empresa_modal_actualizar_cargo_responsable'
                                      )}{' '}
                                    </label>
                                    <select
                                      name={'company_charge'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.company_charge}
                                      className={`form-control form-control-sm ${errors.company_charge &&
                                        touched.company_charge &&
                                        'is-invalid'}`}
                                    >
                                      <option value={''}>
                                        --{' '}
                                        {this.props.t(
                                          'app_empresa_modal_actualizar_select_cargo_responsable'
                                        )}{' '}
                                        --
                                      </option>
                                      {mapOptionsCharges}
                                    </select>
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.company_charge &&
                                      touched.company_charge ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name="company_charge" />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>
                                      {' '}
                                      {this.props.t(
                                        'app_empresa_modal_actualizar_estado'
                                      )}{' '}
                                      <span className="text-danger">*</span>{' '}
                                    </label>
                                    <div className="text-justify">
                                      <Field
                                        name="company_status"
                                        type=""
                                        render={({ field, form }) => {
                                          //console.log("field", field);
                                          return (
                                            // <input
                                            //   type="checkbox"
                                            //   checked={field.value}
                                            //   {...field}
                                            // />
                                            <CustomInput
                                              type="checkbox"
                                              id="conglomeradoModalEdit"
                                              label={this.props.t(
                                                'app_empresa_modal_actualizar_estado_descripcion'
                                              )}
                                              {...field}
                                              checked={field.value}
                                              className={
                                                errors.company_status &&
                                                touched.company_status &&
                                                'invalid-feedback'
                                              }
                                            />
                                          );
                                        }}
                                      />
                                      <ErrorMessage name="company_status" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
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
                        'app_empresa_modal_actualizar_boton_actualizar'
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
                        'app_empresa_modal_actualizar_boton_cerrar'
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

export default ModalEditEmpresa;

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
    this.props.onChange('company_country', value);
  };

  handleBlur = () => {
    this.props.onBlur('company_country', true);
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
            -- {this.props.t('app_empresa_modal_actualizar_select_pais')} --
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
    id: this.props.company_country,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company_country !== state.id) {
      return {
        id: props.company_country
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.company_country !== prevProps.company_country) {
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
            --{' '}
            {this.props.t('app_empresa_modal_actualizar_select_departamento')}{' '}
            --
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
    id: this.props.company_department,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.company_department !== state.id) {
      return {
        id: props.company_department
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.company_department !== prevProps.company_department) {
      this.getDataCitys();
    }
  }

  componentDidMount() {
    this.getDataCitys();
  }

  getDataCitys = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/city/department/${this.props.company_department}`,
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
            -- {this.props.t('app_empresa_modal_actualizar_select_ciudad')} --
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
