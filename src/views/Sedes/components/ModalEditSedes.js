import React, { Component, Fragment } from 'react';
import {
  CustomInput,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  Col,
  Row,
  CardBody,
  Alert,
  CardHeader,
  Collapse
} from 'reactstrap';
import PropTypes from 'prop-types';
import IMGSEDE from './../../../assets/img/teamwork.svg';
import {
  HEADQUARTERS,
  CONGLOMERATES_STATUS,
  COMPANYS_STATUS,
  CONTRIES_STATUS,
  DEPARTMENTS_STATUS,
  CITIES_STATUS,
  CHARGES_STATUS
} from './../../../services/EndPoints';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { animateScroll as scroll } from 'react-scroll';

class ModalEditSedes extends React.Component {
  state = {
    modal: this.props.modaledit,
    collapse: false,
    idSedes: this.props.id,
    dataResult: {},
    optionsConglomerate: [0],
    optionsCompanys: [0],
    optionsCountries: [0],
    optionsDepartment: [0],
    optionsCitys: [0],
    optionsCharges: [0],
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    headquarter_status: 0,
    username: 'ccuartas'
  };

  componentDidMount() {
    this.getDataConglomerates();
    this.getDataCompanys();
    this.getDataCountries();
    this.getDataDepartments();
    this.getDataCitys();
    this.getDataCharges();
  }
  onDismiss = () => {
    this.setState({
      alertError: false,
      alertSuccess: false
    });
  };

  toggle = id => {
    this.setState(
      {
        modal: !this.state.modal,
        idSedes: id
      },
      () => {
        this.props.updateTable();
      }
    );
    this.getHeadquarterByID(id);
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
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

  getDataCompanys = data => {
    fetch(COMPANYS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          optionsCompanys: data
        });
      })
      .catch(Error => console.log(' ', Error));
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

  getHeadquarterByID = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/${id}?username=${this.state.username}`,
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
          dataResult: {
            headquarter_name: data.name,
            headquarter_code: data.code,
            headquarter_description: data.description,
            headquarter_status: data.status,
            headquarter_prefix: data.prefix,
            headquarter_sequence: data.sequence,
            headquarter_country: data.city.department.country.id,
            headquarter_department: data.city.department.id,
            headquarter_city: data.city.id,
            headquarter_address: data.address,
            headquarter_phone: data.phone,
            headquarter_conglomerate: data.company.conglomerate.id,
            headquarter_company: data.company.id,
            headquarter_charge: data.charge === null ? ' ' : data.charge.id
            // data.charge !== null ? { headquarter_charge: data.charge.id } : ''
          }
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataResult = this.state.dataResult;
    const mapOptionsConglomerate = this.state.optionsConglomerate.map(
      (aux, idx) => {
        return (
          <option key={aux.id} value={aux.id}>
            {aux.name}
          </option>
        );
      }
    );
    const mapOptionsCompanys = this.state.optionsCompanys.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

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

    // const optionToId = id => dataResult.headquarter_charge.id
    // const optionToName = name => dataResult.headquarter_charge.name
    // const mapOptionsCharges =
    // this.state.optionsCharges.map((aux,idx)=>{
    //   return(
    //     dataResult.headquarter_charge !== null ?
    //     <option
    //     value={optionToId}>
    //     {optionToName}
    //     </option> :
    //     <option value={aux.id}>{aux.name}</option>
    //   );
    // });
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_sedes_modal_actualizar_titulo')}{' '}
            {this.state.dataResult.headquarter_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            validationSchema={Yup.object().shape({
              headquarter_conglomerate: Yup.string()
                .required(' Por favor seleccione un conglomerado.')
                .ensure(),
              headquarter_company: Yup.string()
                .required(' Por favor seleccione una empresa.')
                .ensure(),
              headquarter_code: Yup.string()
                .required(' Por favor introduzca un código alfanumérico.')
                .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(15, ' Máximo 15 caracteres.'),
              headquarter_name: Yup.string()
                .required(' Por favor introduzca un nombre.')
                .max(100, ' Máximo 100 caracteres'),
              headquarter_description: Yup.string().max(
                250,
                ' Máximo 250 caracteres'
              ),
              headquarter_prefix: Yup.string()
                .required(' Por favor asigne un prefijo de radicación.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(6, ' Máximo 6 caracteres.'),
              headquarter_sequence: Yup.number()
                .required(' Por favor asigne una secuencia de radicación.')
                .integer()
                .positive(),
              headquarter_country: Yup.string()
                .ensure()
                .required(' Por favor seleccione un país.'),
              headquarter_department: Yup.string()
                .ensure()
                .required(' Por favor seleccione un departamento.'),
              headquarter_city: Yup.string()
                .ensure()
                .required(' Por favor seleccione una ciudad.'),
              headquarter_address: Yup.string().required(
                ' Por favor introduzca una dirección.'
              ),
              headquarter_phone: Yup.string()
                .max(10, ' Máximo 10 caracteres.')
                .required(' Por favor introduzca un número telefónico.'),
              headquarter_charge: Yup.string().ensure(),
              headquarter_status: Yup.bool().test(
                'Activo',
                '',
                value => value === true
              )
            })}
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
                fetch(HEADQUARTERS, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idSedes,
                    code: values.headquarter_code,
                    name: values.headquarter_name,
                    prefix: values.headquarter_prefix,
                    sequence: values.headquarter_sequence,
                    address: values.headquarter_address,
                    phone: values.headquarter_phone,
                    companyId: values.headquarter_company,
                    cityId: values.headquarter_city,
                    chargeId: values.headquarter_charge,
                    description: values.headquarter_description,
                    status: tipoEstado(values.headquarter_status),
                    userName: 'ccuartas'
                  })
                })
                  .then(response => {
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
                          () => this.props.updateTable()
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
                      }, 500);
                    }
                  })
                  .catch(error => console.log('', error));
                setSubmitting(false);
              }, 1000);
            }}
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
                    <Alert color="danger" isOpen={this.state.alertError}>
                      {this.props.t('app_sedes_modal_actualizar_alert_error')}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {this.props.t('app_sedes_modal_actualizar_alert_success')}
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      {this.props.t(
                        'app_sedes_modal_Actualizar_alert_error400'
                      )}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGSEDE} className="img-thumbnail" />
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
                              'app_sedes_modal_actualizar_titulo_2'
                            )}{' '}
                          </h5>{' '}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_sedes_form_actualizar_conglomerado'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <SelectConglomerado
                                t={this.state.t}
                                name={'headquarter_conglomerate'}
                                onChange={e =>
                                  setFieldValue(
                                    'headquarter_conglomerate',
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched(
                                    'headquarter_conglomerate',
                                    true
                                  )
                                }
                                value={values.headquarter_conglomerate}
                                className={`form-control form-control-sm ${errors.headquarter_conglomerate &&
                                  touched.headquarter_conglomerate &&
                                  'is-invalid'}`}
                              />
                              {/* <select
                                name="headquarter_conglomerate"
                                className={`form-control form-control-sm ${errors.headquarter_conglomerate &&
                                  touched.headquarter_conglomerate &&
                                  'is-invalid'}`}
                                value={values.headquarter_conglomerate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value={''} disabled>
                                  --{' '}
                                  {this.props.t(
                                    'app_sedes_form_actualizar_select_conglomerado'
                                  )}{' '}
                                  --
                                </option>
                                {mapOptionsConglomerate}
                              </select> */}
                              <div style={{ color: '#D54B4B' }}>
                                {errors.headquarter_conglomerate &&
                                touched.headquarter_conglomerate ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_conglomerate" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_sedes_form_actualizar_empresa'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <SelectCompany
                                t={this.state.t}
                                headquarter_conglomerate={
                                  props.values.headquarter_conglomerate
                                }
                                name="headquarter_company"
                                value={values.headquarter_company}
                                onChange={e =>
                                  setFieldValue(
                                    'headquarter_company',
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('headquarter_company', true)
                                }
                                className={`form-control form-control-sm ${errors.headquarter_company &&
                                  touched.headquarter_company &&
                                  'is-invalid'}`}
                              ></SelectCompany>
                              {/* <select
                                name={'headquarter_company'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_company}
                                className={`form-control form-control-sm ${errors.headquarter_company &&
                                  touched.headquarter_company &&
                                  'is-invalid'}`}
                              >
                                <option value={''} disabled>
                                  --{' '}
                                  {this.props.t(
                                    'app_sedes_form_actualizar_select_empresa'
                                  )}{' '}
                                  --
                                </option>
                                {mapOptionsCompanys}
                              </select> */}
                              <div style={{ color: '#D54B4B' }}>
                                {errors.headquarter_company &&
                                touched.headquarter_company ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_company" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {this.props.t(
                                  'app_sedes_form_actualizar_codigo'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <input
                                name={'headquarter_code'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_code}
                                type="text"
                                className={`form-control form-control-sm ${errors.headquarter_code &&
                                  touched.headquarter_code &&
                                  'is-invalid'}`}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.headquarter_code &&
                                touched.headquarter_code ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_code" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_sedes_form_actualizar_nombre'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <input
                                type="text"
                                name={'headquarter_name'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_name}
                                className={`form-control form-control-sm ${errors.headquarter_name &&
                                  touched.headquarter_name &&
                                  'is-invalid'}`}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.headquarter_name &&
                                touched.headquarter_name ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_name" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_sedes_form_actualizar_descripcion'
                                )}{' '}
                              </label>
                              <textarea
                                name={'headquarter_description'}
                                value={values.headquarter_description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control form-control-sm ${errors.headquarter_description &&
                                  touched.headquarter_description &&
                                  'is-invalid'}`}
                              />
                              <ErrorMessage name={'headquarter_description'} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_sedes_form_actualizar_prefij_radicacion'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <input
                                type="text"
                                name="headquarter_prefix"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_prefix}
                                className={`form-control form-control-sm ${errors.headquarter_prefix &&
                                  touched.headquarter_prefix &&
                                  'is-invalid'}`}
                                maxLength={'6'}
                                placeholder=" "
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.headquarter_prefix &&
                                touched.headquarter_prefix ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_prefix" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_sedes_form_actualizar_sec_radicacion'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <input
                                type="number"
                                name="headquarter_sequence"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.headquarter_sequence}
                                className="form-control form-control-sm"
                                min={0}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.headquarter_sequence &&
                                touched.headquarter_sequence ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="headquarter_sequence" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col sm="12">
                        <Card>
                          <CardHeader>
                            {' '}
                            <a
                              onClick={() => {
                                this.toggleCollapse();
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              {' '}
                              {this.props.t(
                                'app_sedes_form_actualizar_collapse'
                              )}{' '}
                            </a>{' '}
                          </CardHeader>
                          <Collapse isOpen={this.state.collapse}>
                            <CardBody>
                              <form className="form">
                                <div className="row" />
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>
                                        {' '}
                                        {this.props.t(
                                          'app_sedes_form_actualizar_cargo_responsable'
                                        )}{' '}
                                      </label>
                                      <select
                                        name="headquarter_charge"
                                        className={`form-control form-control-sm ${errors.headquarter_charge &&
                                          touched.headquarter_charge &&
                                          'is-invalid'}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.headquarter_charge}
                                      >
                                        <option value={''}>
                                          --{' '}
                                          {this.props.t(
                                            'app_sedes_form_actualizar_select_cargo_responsable'
                                          )}{' '}
                                          --
                                        </option>
                                        {mapOptionsCharges}
                                      </select>
                                      <ErrorMessage name="headquarter_charge" />
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {' '}
                                        {this.props.t(
                                          'app_sedes_form_actualizar_pais'
                                        )}
                                        <span className="text-danger">*</span>{' '}
                                      </label>
                                      <SelectCountry
                                        t={this.state.t}
                                        name={'headquarter_country'}
                                        onChange={e =>
                                          setFieldValue(
                                            'headquarter_country',
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched('headquarter_country')
                                        }
                                        value={values.headquarter_country}
                                        className={`form-control form-control-sm ${errors.headquarter_country &&
                                          touched.headquarter_country &&
                                          'is-invalid'}`}
                                      />
                                      {/* <select
                                        name={'headquarter_country'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.headquarter_country}
                                        className={`form-control form-control-sm ${errors.headquarter_country &&
                                          touched.headquarter_country &&
                                          'is-invalid'}`}
                                      >
                                        {' '}
                                        <option value={''} disabled>
                                          --{' '}
                                          {this.props.t(
                                            'app_sedes_form_actualizar_select_pais'
                                          )}{' '}
                                          --
                                        </option>
                                        {mapOptionsCountries}{' '}
                                      </select>{' '} */}
                                      <div style={{ color: '#D54B4B' }}>
                                        {errors.headquarter_country &&
                                        touched.headquarter_country ? (
                                          <i className="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_country" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {' '}
                                        {this.props.t(
                                          'app_sedes_form_actualizar_departamento'
                                        )}
                                        <span className="text-danger">*</span>{' '}
                                      </label>
                                      <SelectDepartment
                                        t={this.state.t}
                                        headquarter_country={
                                          props.values.headquarter_country
                                        }
                                        name="headquarter_department"
                                        value={values.headquarter_department}
                                        onChange={e =>
                                          setFieldValue(
                                            'headquarter_department',
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched(
                                            'headquarter_department',
                                            true
                                          )
                                        }
                                        className={`form-control form-control-sm ${errors.headquarter_department &&
                                          touched.headquarter_department &&
                                          'is-invalid'}`}
                                      />
                                      {/* <select
                                        name="headquarter_department"
                                        value={values.headquarter_department}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`form-control form-control-sm ${errors.headquarter_department &&
                                          touched.headquarter_department &&
                                          'is-invalid'}`}
                                      >
                                        <option value={''} disabled>
                                          --{' '}
                                          {this.props.t(
                                            'app_sedes_form_actualizar_select_departamento'
                                          )}{' '}
                                          --
                                        </option>
                                        {mapOptionsDepartments}
                                      </select> */}
                                      <div style={{ color: '#D54B4B' }}>
                                        {errors.headquarter_department &&
                                        touched.headquarter_department ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_department" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <label>
                                        {' '}
                                        {this.props.t(
                                          'app_sedes_form_actualizar_ciudad'
                                        )}{' '}
                                        <span className="text-danger">*</span>{' '}
                                      </label>
                                      <SelectCity
                                        t={this.state.t}
                                        headquarter_department={
                                          props.values.headquarter_department
                                        }
                                        name={'headquarter_city'}
                                        value={values.headquarter_city}
                                        onChange={e =>
                                          setFieldValue(
                                            'headquarter_city',
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched(
                                            'headquarter_city',
                                            true
                                          )
                                        }
                                        className={`form-control form-control-sm ${errors.headquarter_city &&
                                          touched.headquarter_city &&
                                          'is-invalid'}`}
                                      />
                                      {/* <select
                                        name="headquarter_city"
                                        value={values.headquarter_city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`form-control form-control-sm ${errors.headquarter_city &&
                                          touched.headquarter_city &&
                                          'is-invalid'}`}
                                      >
                                        <option value={''} disabled>
                                          --{' '}
                                          {this.props.t(
                                            'app_sedes_form_actualizar_select_ciudad'
                                          )}{' '}
                                          --
                                        </option>
                                        {mapOptionsCitys}
                                      </select> */}
                                      <div style={{ color: '#D54B4B' }}>
                                        {errors.headquarter_city &&
                                        touched.headquarter_city ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_city" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-8">
                                    <div className="form-group">
                                      <label>
                                        {' '}
                                        {this.props.t(
                                          'app_sedes_form_actualizar_direccion'
                                        )}{' '}
                                        <span className="text-danger">*</span>{' '}
                                      </label>
                                      <input
                                        name={'headquarter_address'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.headquarter_address}
                                        type="text"
                                        className={`form-control form-control-sm ${errors.headquarter_address &&
                                          touched.headquarter_address &&
                                          'is-invalid'}`}
                                      />
                                      <div style={{ color: '#D54B4B' }}>
                                        {errors.headquarter_address &&
                                        touched.headquarter_address ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_address" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="from-group">
                                      <label>
                                        {' '}
                                        {this.props.t(
                                          'app_sedes_form_actualizar_telefono'
                                        )}{' '}
                                        <span className="text-danger">*</span>{' '}
                                      </label>
                                      <input
                                        type="text"
                                        name="headquarter_phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.headquarter_phone}
                                        className={`form-control form-control-sm ${errors.headquarter_phone &&
                                          touched.headquarter_phone &&
                                          'is-invalid'}`}
                                      />
                                      <div style={{ color: '#D54B4B' }}>
                                        {errors.headquarter_phone &&
                                        touched.headquarter_phone ? (
                                          <i class="fa fa-exclamation-triangle" />
                                        ) : null}
                                        <ErrorMessage name="headquarter_phone" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row" />

                                <div className="form-group">
                                  <label>
                                    {' '}
                                    {this.props.t(
                                      'app_sedes_form_actualizar_estado'
                                    )}{' '}
                                    <span className="text-danger">*</span>{' '}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="headquarter_status"
                                      render={({ field, form }) => {
                                        return (
                                          <CustomInput
                                            type="checkbox"
                                            id="conglomeradoModalEdit"
                                            label={this.props.t(
                                              'app_sedes_form_actualizar_estado_descripcion'
                                            )}
                                            {...field}
                                            checked={field.value}
                                            className={
                                              errors.headquarter_status &&
                                              touched.headquarter_status &&
                                              'invalid-feedback'
                                            }
                                          />
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </form>
                            </CardBody>
                          </Collapse>
                        </Card>
                      </Col>
                    </Row>
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
                        'app_sedes_form_actualizar_boton_actualizar'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {' '}
                      <i className="fa fa-times" />{' '}
                      {this.props.t('app_sedes_form_actualizar_boton_cerrar')}{' '}
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

ModalEditSedes.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any
};

export default ModalEditSedes;
//--------------------//

class SelectConglomerado extends React.Component {
  state = {
    dataConglomerate: [],
    t: this.props.t
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange('headquarter_conglomerate', value);
  };

  handleBlur = () => {
    this.props.onBlur('headquarter_conglomerate', true);
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
            -- {this.props.t('app_sedes_form_actualizar_select_conglomerado')}{' '}
            --
          </option>
          {this.state.dataConglomerate.map((aux, id) => {
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
class SelectCompany extends React.Component {
  state = {
    dataCompany: [],
    id: this.props.headquarter_conglomerate,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.headquarter_conglomerate !== state.id) {
      return {
        id: props.headquarter_conglomerate
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.headquarter_conglomerate !== prevProps.headquarter_conglomerate
    ) {
      this.getDataCompany();
    }
  }

  componentDidMount() {
    this.getDataCompany();
  }

  getDataCompany = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/conglomerate/${this.state.id}`,
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
          dataCompany: data
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
            -- {this.props.t('app_sedes_form_actualizar_select_empresa')} --
          </option>
          {this.state.dataCompany.map((aux, id) => {
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
    this.props.onChange('headquarter_country', value);
  };

  handleBlur = () => {
    this.props.onBlur('headquarter_country', true);
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
            {' '}
            -- {this.props.t('app_sedes_form_actualizar_select_pais')} --
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
    id: this.props.headquarter_country,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.headquarter_country !== state.id) {
      return {
        id: props.headquarter_country
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.headquarter_country !== prevProps.headquarter_country) {
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
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        >
          <option value={''}>
            -- {this.props.t('app_sedes_form_actualizar_select_departamento')}{' '}
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
    id: this.props.headquarter_department,
    t: this.props.t
  };

  static getDerivedStateFromProps(props, state) {
    if (props.headquarter_department !== state.id) {
      return {
        id: props.headquarter_department
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.headquarter_department !== prevProps.headquarter_department
    ) {
      this.getDataCitys();
    }
  }

  componentDidMount() {
    this.getDataCitys();
  }

  getDataCitys = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/city/department/${this.props.headquarter_department}`,
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
            -- {this.props.t('app_sedes_form_actualizar_select_ciudad')} --
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
