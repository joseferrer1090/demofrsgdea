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
import IMGDEPARTAMENTO from './../../../assets/img/map-marker.svg';
import { COUNTRIES, DEPARTMENTS } from './../../../services/EndPoints';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';

class ModalEditDepartamento extends React.Component {
  state = {
    modal: this.props.modaledit,
    idDepartment: this.props.id,
    dataResult: {},
    optionsCountries: [],
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idDepartment: id
    });
    this.getDepartmentByID(id);
  };
  getDepartmentByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/department/${id}/jferrer`, {
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
            department_country: data.country.id,
            department_name: data.name,
            department_code: data.code,
            department_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.getDataCountries();
  }

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
  onDismiss = () => {
    this.setState({
      alertError: false,
      alertSuccess: false
    });
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
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_departamento_modal_actualizar_titulo')}{' '}
            {dataResult.department_name}{' '}
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
                fetch(DEPARTMENTS, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idDepartment,
                    code: values.department_code,
                    name: values.department_name,
                    countryId: values.department_country,
                    status: tipoEstado(values.department_status),
                    userName: 'ccuartas'
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      }, () => this.props.updateTable());
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
              department_country: Yup.string()
                .ensure()
                .required(' Por favor seleccione un país.'),
              department_code: Yup.string().required(
                ' Por favor introduzca un código.'
              ),
              department_name: Yup.string().required(
                ' Por favor introduzca un nombre.'
              ),
              department_status: Yup.bool().test(
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
                    <Alert color="danger" isOpen={this.state.alertError}>
                      Error al actualizar el departamento.
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      Se actualizo el departamento con éxito.
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      Error al actualizar el departamento.
                      {/* Error, el departamento ya esta asignado. */}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGDEPARTAMENTO} className="img-thumbnail" />
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
                              'app_departamento_modal_actualizar_titulo_2'
                            )}{' '}
                          </h5>{' '}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_departamento_modal_actualizar_pais'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <select
                                name={'department_country'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.department_country}
                                className={`form-control form-control-sm ${errors.department_country &&
                                  touched.department_country &&
                                  'is-invalid'}`}
                              >
                                <option value={''} disabled>
                                  --{' '}
                                  {this.props.t(
                                    'app_departamento_modal_actualizar_select_pais'
                                  )}{' '}
                                  --
                                </option>
                                {mapOptionsCountries}
                              </select>
                              <div style={{ color: '#D54B4B' }}>
                                {errors.department_country &&
                                touched.department_country ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="department_country" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_departamento_modal_actualizar_codigo'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <input
                                name="department_code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                className={`form-control form-control-sm ${errors.department_code &&
                                  touched.department_code &&
                                  'is-invalid'}`}
                                placeholder=""
                                value={values.department_code}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.department_code &&
                                touched.department_code ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="department_code" />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_departamento_modal_actualizar_nombre'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <input
                                name="department_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                className={`form-control form-control-sm ${errors.department_name &&
                                  touched.department_name &&
                                  'is-invalid'}`}
                                value={values.department_name}
                                placeholder=""
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.department_name &&
                                touched.department_name ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="department_name" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_departamento_modal_actualizar_estado'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <div className="text-justify">
                                <Field
                                  name="department_status"
                                  render={({ field, form }) => {
                                    return (
                                      <CustomInput
                                        type="checkbox"
                                        id="CheckboxEditCiudad"
                                        label={this.props.t(
                                          'app_departamento_modal_actualizar_estado_descripcion'
                                        )}
                                        {...field}
                                        checked={field.value}
                                        className={
                                          errors.department_status &&
                                          touched.department_status &&
                                          'invalid-feedback'
                                        }
                                      />
                                    );
                                  }}
                                />
                                <ErrorMessage name="department_status" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {' '}
                      <i className="fa fa-pencil" />{' '}
                      {this.props.t(
                        'app_departamento_modal_actualizar_button_actualizar'
                      )}{' '}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {' '}
                      <i className="fa fa-times" />{' '}
                      {this.props.t(
                        'app_departamento_modal_actualizar_button_cerrar'
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

ModalEditDepartamento.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired
};

export default ModalEditDepartamento;
