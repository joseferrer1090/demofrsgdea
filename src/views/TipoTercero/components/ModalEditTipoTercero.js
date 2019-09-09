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
import PropTypes from 'prop-types';
import IMGTERCERO from './../../../assets/img/supply.svg';
import { TYPETHIRDPARTYS } from './../../../services/EndPoints';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';

class ModalEditTipoTercero extends React.Component {
  state = {
    modal: this.props.modalupdate,
    idTipoTerceros: this.props.id,
    dataResult: {},
    alertError: false,
    alertSuccess: false,
    alertError400: false,
    t: this.props
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idTipoTerceros: id
    });
    this.getTipoTercerosByID(id);
  };

  getTipoTercerosByID = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/typethirdparty/${id}/ccuartas`,
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
            typethirdparty_code: data.code,
            typethirdparty_name: data.name,
            typethirdparty_description: data.description,
            typethirdparty_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };
  render() {
    const dataResult = this.state.dataResult;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {this.props.t('app_tipoTerecero_modal_actualizar_titulo')}{' '}
            {dataResult.typethirdparty_name}
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
                fetch(TYPETHIRDPARTYS, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idTipoTerceros,
                    code: values.typethirdparty_code,
                    name: values.typethirdparty_name,
                    description: values.typethirdparty_description,
                    status: tipoEstado(values.typethirdparty_status),
                    userName: 'ccuartas'
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
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
              typethirdparty_code: Yup.string()
                .min(6, ' Mínimo 6 caracteres.')
                .max(6, ' Máximo 6 caracteres.')
                .required(' Por favor introduzca un código.'),
              typethirdparty_name: Yup.string().required(
                ' Por favor introduzca un nombre.'
              ),
              typethirdparty_description: Yup.string().required(
                ' Por favor introduzca una descripción.'
              ),
              typethirdparty_status: Yup.bool().test(
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
                      Error al actualizar el tipo de tercero.
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      Se actualizo el tipo de tercero con éxito.
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      {/* Error, la ciudad ya esta asignada. */}
                      Error al actualizar el tipo de tercero.
                    </Alert>
                    <Row>
                      <Col sm={3}>
                        <img src={IMGTERCERO} className={'img-thumbnail'} />
                      </Col>
                      <Col sm={9}>
                        <div className="">
                          {' '}
                          <h5
                            className=""
                            style={{ borderBottom: '1px solid black' }}
                          >
                            {' '}
                            {this.props.t(
                              'app_tipoTerecero_modal_actualizar_titulo_2'
                            )}{' '}
                          </h5>{' '}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {this.props.t(
                                  'app_tipoTerecero_modal_actualizar_codigo'
                                )}{' '}
                                <span className="text-danger">*</span>
                              </label>{' '}
                              <input
                                name={'typethirdparty_code'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.typethirdparty_code}
                                type="text"
                                className={`form-control form-control-sm ${errors.typethirdparty_code &&
                                  touched.typethirdparty_code &&
                                  'is-invalid'}`}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.typethirdparty_code &&
                                touched.typethirdparty_code ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={'typethirdparty_code'} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                {this.props.t(
                                  'app_tipoTerecero_modal_actualizar_nombre'
                                )}{' '}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                name={'typethirdparty_name'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.typethirdparty_name}
                                type="text"
                                className={`form-control form-control-sm ${errors.typethirdparty_name &&
                                  touched.typethirdparty_name &&
                                  'is-invalid'}`}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.typethirdparty_name &&
                                touched.typethirdparty_name ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name={'typethirdparty_name'} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_tipoTerecero_modal_actualizar_descripcion'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <textarea
                                name={'typethirdparty_description'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.typethirdparty_description}
                                className={`form-control form-control-sm ${errors.typethirdparty_description &&
                                  touched.typethirdparty_description &&
                                  'is-invalid'}`}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.typethirdparty_description &&
                                touched.typethirdparty_description ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage
                                  name={'typethirdparty_description'}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>
                                {' '}
                                {this.props.t(
                                  'app_tipoTerecero_modal_actualizar_estado'
                                )}{' '}
                                <span className="text-danger">*</span>{' '}
                              </label>
                              <div className="text-justify">
                                <Field
                                  name="typethirdparty_status"
                                  render={({ field, form }) => {
                                    return (
                                      <CustomInput
                                        type="checkbox"
                                        id="CheckBoxEditRoles"
                                        label={this.props.t(
                                          'app_tipoTerecero_modal_actualizar_estado_descripcion'
                                        )}
                                        {...field}
                                        checked={field.value}
                                        className={
                                          errors.typethirdparty_status &&
                                          touched.typethirdparty_status &&
                                          'invalid-feedback'
                                        }
                                      />
                                    );
                                  }}
                                />
                                <ErrorMessage name="estado" />
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
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="btn btn-outline-success btn-sm"
                    >
                      {' '}
                      <i className="fa fa-pencil" />{' '}
                      {this.props.t(
                        'app_tipoTerecero_modal_actualizar_button_actualizar'
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
                        'app_tipoTerecero_modal_actualizar_button_cerrar'
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

ModalEditTipoTercero.propTypes = {
  modalupdate: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalEditTipoTercero;
