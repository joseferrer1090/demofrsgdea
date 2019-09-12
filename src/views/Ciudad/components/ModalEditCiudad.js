import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput,
  Alert
} from 'reactstrap';
import IMGCITY from './../../../assets/img/skyline.svg';
import { COUNTRIES, DEPARTMENTS, CITYS } from './../../../services/EndPoints';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';

class ModalEditCiudad extends React.Component {
  state = {
    modal: this.props.modaledit,
    idCity: this.props.id,
    dataResult: {},
    optionsCountries: [0],
    optionsDepartment: [0],
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t
  };
  onDismiss = () => {
    this.setState({
      alertError: false,
      alertSuccess: false
    });
  };
  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idCity: id
    });
    this.getCityByID(id);
  };

  componentDidMount() {
    this.getDataCountries();
    this.getDataDepartments();
  }

  getCityByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/city/${id}/jferrer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataResult: {
            city_country: data.department.country.id,
            city_department: data.department.id,
            city_code: data.code,
            city_name: data.name,
            city_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  getDataCountries = data => {
    fetch(COUNTRIES, {
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
    fetch(DEPARTMENTS, {
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

  render() {
    const dataResult = this.state.dataResult;

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
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_ciudad_modal_actualizar_titulo')}{' '}
            {dataResult.city_name}{' '}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
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
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idCity,
                    code: values.city_code,
                    name: values.city_name,
                    departmentId: values.city_department,
                    status: tipoEstado(values.city_status),
                    userName: 'ccuartas'
                  })
                })
                  .then(response => {
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
                  })
                  .catch(error => console.log('', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              city_country: Yup.string()
                .ensure()
                .required(' Por favor seleccione un país.'),
              city_department: Yup.string()
                .ensure()
                .required(' Por favor seleccione un departamento.'),

              city_code: Yup.string()
                .required(' Por favor introduzca un código alfanumérico.')
                .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(15, ' Máximo 15 caracteres.'),
              city_name: Yup.string()
                .required(' Por favor introduzca un nombre.')
                .max(100, 'Máximo 100 caracteres.'),
              city_status: Yup.bool().test(
                'Activado',
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
                handleReset
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error al actualizar la ciudad.
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      Se actualizo la ciudad con éxito.
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      Error, la ciudad ya esta asignada.
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGCITY} className="img-thumbnail" />
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
                              'app_ciudad_modal_actualizar_titulo_2'
                            )}{' '}
                          </h5>{' '}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {this.props.t(
                                  'app_ciudad_modal_actualizar_pais'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  {' '}
                                  <select
                                    name={'city_country'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city_country}
                                    className={`form-control form-control-sm ${errors.city_country &&
                                      touched.city_country &&
                                      'is-invalid'}`}
                                  >
                                    {' '}
                                    <option value={''} disabled>
                                      --{' '}
                                      {this.props.t(
                                        'app_ciudad_modal_actualizar_select_pais'
                                      )}{' '}
                                      --
                                    </option>
                                    {mapOptionsCountries}{' '}
                                  </select>{' '}
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.city_country &&
                                    touched.city_country ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="city_country" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {this.props.t(
                                  'app_ciudad_modal_actualizar_select_departamento'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  {' '}
                                  <select
                                    name={'city_department'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city_department}
                                    className={`form-control form-control-sm ${errors.city_department &&
                                      touched.city_department &&
                                      'is-invalid'}`}
                                  >
                                    {' '}
                                    <option value={''} disabled>
                                      --{' '}
                                      {this.props.t(
                                        'app_ciudad_modal_actualizar_departamento'
                                      )}{' '}
                                      --
                                    </option>
                                    {mapOptionsDepartments}{' '}
                                  </select>{' '}
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.city_department &&
                                    touched.city_department ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="city_department" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {this.props.t(
                                  'app_ciudad_modal_actualizar_codigo'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  {' '}
                                  <input
                                    type="text"
                                    name={'city_code'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city_code}
                                    className={`form-control form-control-sm ${errors.city_code &&
                                      touched.city_code &&
                                      'is-invalid'}`}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.city_code && touched.city_code ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="city_code" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {this.props.t(
                                  'app_ciudad_modal_actualizar_nombre'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  {' '}
                                  <input
                                    type="text"
                                    name="city_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city_name}
                                    className={`form-control form-control-sm ${errors.city_name &&
                                      touched.city_name &&
                                      'is-invalid'}`}
                                  />{' '}
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.city_name && touched.city_name ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="city_name" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <dl className="param">
                                <label>
                                  {' '}
                                  {this.props.t(
                                    'app_ciudad_modal_actualizar_estado'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="city_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckboxEditCiudad"
                                          label={this.props.t(
                                            'app_ciudad_modal_actualizar_estado_descripcion'
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.city_status &&
                                            touched.city_status &&
                                            'invalid-feedback'
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="city_status" />
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm "
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {' '}
                      <i className="fa fa-pencil" />{' '}
                      {this.props.t(
                        'app_ciudad_modal_actualizar_button_actualizar'
                      )}{' '}
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
                      {this.props.t(
                        'app_ciudad_modal_actualizar_button_cerrar'
                      )}{' '}
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

ModalEditCiudad.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  t: PropTypes.any
};

export default ModalEditCiudad;
