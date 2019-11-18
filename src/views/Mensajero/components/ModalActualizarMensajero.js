import React, { Fragment } from 'react';
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
import PropTypes from 'prop-types';
import ImgMensajero from './../../../assets/img/courier.svg';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { MESSENGERS } from './../../../services/EndPoints';

class ModalActualizarMensajero extends React.Component {
  state = {
    modal: this.props.modalupdate,
    idMensajero: this.props.id,
    dataResult: {},
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props.t,
    messenger_status: 0,
    username: 'ccuartas'
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idMensajero: id
    });
    this.getMessengerByID(id);
  };

  getMessengerByID = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/messenger/${id}?username=${this.state.username}`,
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
            messenger_identification: data.identification,
            messenger_name: data.name,
            messenger_description: data.description,
            messenger_status: data.status
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
            {t('app_mensajero_modal_actualizar_titulo')}{' '}
            {dataResult.messenger_name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            validationSchema={Yup.object().shape({
              messenger_identification: Yup.string()
                .matches(
                  /^[0-9]+$/,
                  '  El número de identificación no acepta puntos, letras, ni caracteres especiales.'
                )
                .required(' Por favor introduzca una identificación.'),
              messenger_name: Yup.string()
                .required(' Por favor introduzca un nombre.')
                .max(100),
              messenger_description: Yup.string().max(
                250,
                'Máximo 250 caracteres.'
              ),
              messenger_status: Yup.bool().test(
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
                fetch(MESSENGERS, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idMensajero,
                    identification: values.messenger_identification,
                    name: values.messenger_name,
                    description: values.messenger_description,
                    status: tipoEstado(values.messenger_status),
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
          >
            {props => {
              const {
                values,
                touched,
                errors,

                handleChange,
                handleBlur,
                handleSubmit,
                t
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Alert color="danger" isOpen={this.state.alertError}>
                      {t('app_mensajero_modal_actualizar_alert_error')}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {t('app_mensajero_modal_actualizar_alert_success')}
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      {t('app_mensajero_modal_actualizar_alert_error400')}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={ImgMensajero} />
                      </Col>
                      <Col sm="9">
                        <div className="">
                          {' '}
                          <h5
                            className=""
                            style={{ borderBottom: '1px solid black' }}
                          >
                            {' '}
                            {t('app_mensajero_modal_actualizar_titulo_2')}{' '}
                          </h5>{' '}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  'app_mensajero_modal_actualizar_identificacion'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  <input
                                    name={'messenger_identification'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.messenger_identification}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.messenger_identification &&
                                      touched.messenger_identification &&
                                      'is-invalid'}`}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.messenger_identification &&
                                    touched.messenger_identification ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="messenger_identification" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <dl className="param">
                                {t('app_mensajero_modal_actualizar_nombre')}{' '}
                                <span className="text-danger">*</span>{' '}
                                <dd>
                                  {' '}
                                  <input
                                    name={'messenger_name'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.messenger_name}
                                    type="text"
                                    className={`form-control form-control-sm ${errors.messenger_name &&
                                      touched.messenger_name &&
                                      'is-invalid'}`}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.messenger_name &&
                                    touched.messenger_name ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="messenger_name" />
                                  </div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <dl className="param">
                                {t(
                                  'app_mensajero_modal_actualizar_descripción'
                                )}
                                <dd>
                                  {' '}
                                  <textarea
                                    name={'messenger_description'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.messenger_description}
                                    className="form-control form-control-sm"
                                  />
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
                                    'app_mensajero_modal_actualizar_estado'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="messenger_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckBoxEditRoles"
                                          label={t(
                                            'app_mensajero_modal_actualizar_estado_descripcion'
                                          )}
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.messenger_status &&
                                            touched.messenger_status &&
                                            'invalid-feedback'
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="messenger_status" />
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
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      type="button"
                      className="btn btn-sm btn-outline-success"
                    >
                      <i className="fa fa-pencil" />{' '}
                      {t('app_mensajero_modal_actualizar_boton_actualizar')}
                    </button>
                    <button
                      className="btn btn-sm btn-secondary "
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {' '}
                      <i className="fa fa-times" />{' '}
                      {t('app_mensajero_modal_actualizar_boton_cerrar')}{' '}
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

ModalActualizarMensajero.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  id: PropTypes.string,
  t: PropTypes.any
};

export default ModalActualizarMensajero;
