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
import { PAIS_EDIT } from './../../../data/JSON-SERVER';
import IMGCOUNTRY from './../../../assets/img/flag.svg';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import { COUNTRIES } from './../../../services/EndPoints';

class ModalEditPais extends React.Component {
  state = {
    modal: this.props.modaledit,
    idPais: this.props.id,
    dataResult: {},
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    country_status: 0,
    username: 'ccuartas'
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idPais: id
    });
    this.getCountryByID(id);
  };

  getCountryByID = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/country/${id}?username=${this.state.username}`,
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
            country_code: data.code,
            country_name: data.name,
            country_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataResult = this.state.dataResult;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {t('app_pais_modal_actualizar_titulo')} {dataResult.country_name}{' '}
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
                fetch(COUNTRIES, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idPais,
                    code: values.country_code,
                    name: values.country_name,
                    status: tipoEstado(values.country_status),
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
              country_code: Yup.string()
                .required(' Por favor introduzca un código alfanumérico.')
                .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(15, ' Máximo 15 caracteres.'),
              country_name: Yup.string()
                .required(' Por favor introduzca un nombre.')
                .max(100, 'Máximo 100 caracteres.'),
              country_status: Yup.bool().test(
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
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert color="danger" isOpen={this.state.alertError}>
                      {t('app_pais_modal_actualizar_alert_error')}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {t('app_pais_modal_actualizar_alert_success')}
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      {t('app_pais_modal_actualizar_alert_error400')}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGCOUNTRY} className="img-thumbnail" />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {' '}
                          <h5
                            className=""
                            style={{ borderBottom: '1px solid black' }}
                          >
                            {' '}
                            {t('app_pais_modal_actualizar_titulo_2')}{' '}
                          </h5>{' '}
                        </div>
                        <form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <label>
                                {' '}
                                {t('app_pais_modal_actualizar_codigo')}{' '}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                name={'country_code'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country_code}
                                className={`form-control form-control-sm ${errors.country_code &&
                                  touched.country_code &&
                                  'is-invalid'}`}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.country_code && touched.country_code ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="country_code" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {t('app_pais_modal_actualizar_nombre')}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <input
                                  type="text"
                                  name="country_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.country_name}
                                  className={`form-control form-control-sm ${errors.country_name &&
                                    touched.country_name &&
                                    'is-invalid'}`}
                                />{' '}
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.country_name &&
                                  touched.country_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="country_name" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {t('app_pais_modal_actualizar_estado')}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="country_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckboxEditPais"
                                          label={t(
                                            'app_pais_modal_actualizar_estado_descripcion'
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.country_status &&
                                            touched.country_status &&
                                            'invalid-feedback'
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="country_status" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
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
                      {t('app_pais_modal_actualizar_button_actualizar')}{' '}
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
                      {t('app_pais_modal_actualizar_button_cerrar')}{' '}
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

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired
};

export default ModalEditPais;
