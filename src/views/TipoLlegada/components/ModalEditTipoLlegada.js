import React, { Fragment } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CustomInput,
  Alert
} from 'reactstrap';
import IMGPackage from './../../../assets/img/package.svg';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { TYPESHIPMENTARRIVAL } from './../../../services/EndPoints';

class ModalEditTipoLlegada extends React.Component {
  state = {
    modal: this.props.modaledit,
    idTipoLlegada: this.props.id,
    dataResult: {},
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    typeshipmentarrival_status: 0,
    username: 'ccuartas'
  };

  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      idTipoLlegada: id
    }));
    this.getTipoLlegadaByID(id);
  };

  getTipoLlegadaByID = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/typeshipmentarrival/${id}?username=${this.state.username}`,
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
            typeshipmentarrival_code: data.code,
            typeshipmentarrival_name: data.name,
            typeshipmentarrival_description: data.description,
            typeshipmentarrival_status: data.status
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
            {t('app_tipoLlegada_modal_actualizar_titulo')}{' '}
            {dataResult.typeshipmentarrival_name}
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
                fetch(TYPESHIPMENTARRIVAL, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idTipoLlegada,
                    code: values.typeshipmentarrival_code,
                    name: values.typeshipmentarrival_name,
                    description: values.typeshipmentarrival_description,
                    status: tipoEstado(values.typeshipmentarrival_status),
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
              typeshipmentarrival_code: Yup.string()
                .required(' Por favor introduzca un código alfanumérico.')
                .matches(/^[0-9a-zA-Z]+$/, ' No es un código alfanumérico.')
                .min(2, ' Mínimo 2 caracteres.')
                .max(15, ' Máximo 15 caracteres.'),
              typeshipmentarrival_name: Yup.string().required(
                ' Por favor introduzca un nombre.'
              ),
              typeshipmentarrival_description: Yup.string()
                .required(' Por favor introduzca una descripción.')
                .max(250, 'Máximo 250 caracteres.'),
              typeshipmentarrival_status: Yup.bool().test(
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
                    <Alert
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      {t('app_tipoLlegada_modal_actualizar_alert_error')}
                    </Alert>
                    <Alert
                      color="success"
                      isOpen={this.state.alertSuccess}
                      toggle={this.onDismiss}
                    >
                      {t('app_tipoLlegada_modal_actualizar_alert_success')}
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      {t('app_tipoLlegada_modal_actualizar_alert_error400')}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGPackage} />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {' '}
                          <h5
                            className=""
                            style={{ borderBottom: '1px solid black' }}
                          >
                            {' '}
                            {t(
                              'app_tipoLlegada_modal_actualizar_titulo_2'
                            )}{' '}
                          </h5>{' '}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {t('app_tipoLlegada_modal_actualizar_codigo')}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  {' '}
                                  <input
                                    name={'typeshipmentarrival_code'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.typeshipmentarrival_code}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.typeshipmentarrival_code &&
                                      touched.typeshipmentarrival_code &&
                                      'is-invalid'}`}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.typeshipmentarrival_code &&
                                    touched.typeshipmentarrival_code ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage
                                      name={'typeshipmentarrival_code'}
                                    />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {t('app_tipoLlegada_modal_actualizar_nombre')}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  {' '}
                                  <input
                                    name={'typeshipmentarrival_name'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.typeshipmentarrival_name}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.typeshipmentarrival_name &&
                                      touched.typeshipmentarrival_name &&
                                      'is-invalid'}`}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.typeshipmentarrival_name &&
                                    touched.typeshipmentarrival_name ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage
                                      name={'typeshipmentarrival_name'}
                                    />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  'app_tipoLlegada_modal_actualizar_descripcion'
                                )}
                                <dd>
                                  {' '}
                                  <textarea
                                    name={'typeshipmentarrival_description'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values.typeshipmentarrival_description
                                    }
                                    className={`form-control form-control-sm ${errors.typeshipmentarrival_description &&
                                      touched.typeshipmentarrival_description &&
                                      'is-invalid'}`}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.typeshipmentarrival_description &&
                                    touched.typeshipmentarrival_description ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage
                                      name={'typeshipmentarrival_description'}
                                    />
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
                                  {t(
                                    'app_tipoLlegada_modal_actualizar_estado'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="typeshipmentarrival_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckBoxEditRoles"
                                          label={t(
                                            'app_tipoLlegada_modal_actualizar_estado_descripcion'
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.typeshipmentarrival_status &&
                                            touched.typeshipmentarrival_status &&
                                            'invalid-feedback'
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="typeshipmentarrival_status" />
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <div className="float-right">
                      <button
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                        className="btn btn-sm btn-outline-success"
                      >
                        <i className="fa fa-pencil" />{' '}
                        {t(
                          'app_tipoLlegada_modal_actualizar_button_actualizar'
                        )}
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-sm btn-secondary "
                        onClick={() => {
                          this.setState({ modal: false });
                        }}
                      >
                        <i className="fa fa-times" />{' '}
                        {t('app_tipoLlegada_modal_actualizar_button_cerrar')}
                      </button>
                    </div>
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

ModalEditTipoLlegada.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditTipoLlegada;
