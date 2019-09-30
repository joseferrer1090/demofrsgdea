import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, withFormik, ErrorMessage } from 'formik';

class ModalDeleteEmpresa extends React.Component {
  state = {
    modal: this.props.modaldelempresa,
    idCompany: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertCode: false,
    username: 'jferrer',
    code: '',
    nameCompany: '',
    t: this.props.t
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idCompany: id
    });
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
          nameCompany: data.name
        });
      })
      .catch(Error => console.log(Error));
  };
  onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      code: ''
    };
    const nameCompany = this.state.nameCompany;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_empresa_modal_eliminar_titulo')} {nameCompany}{' '}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/company/${this.state.idCompany}?code=${values.code}&username=${this.state.username}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'Basic ' + window.btoa('sgdea:123456')
                    }
                  }
                )
                  .then(response => {
                    if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                    } else if (response.status === 204) {
                      this.setState(
                        {
                          alertSuccess: true
                        },
                        () => this.props.updateTable()
                      );
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertCode: true
                      });
                    }
                  })
                  .catch(error => console.log('', error));
                setSubmitting(false);
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                ' Por favor introduzca el código de la empresa.'
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
                      className="text-center"
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      {this.props.t('app_empresa_modal_eliminar_alert_error')}
                    </Alert>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertCode}
                      toggle={this.onDismiss}
                    >
                      {this.props.t(
                        'app_empresa_modal_eliminar_alert_errorCode'
                      )}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {this.props.t('app_empresa_modal_eliminar_alert_success')}
                    </Alert>
                    <form className="form">
                      <p className="text-center">
                        {' '}
                        {this.props.t('app_empresa_modal_eliminar_titulo_2')}
                      </p>

                      <input
                        type="text"
                        placeholder={this.props.t(
                          'app_empresa_modal_eliminar_placeholder'
                        )}
                        style={{ textAlign: 'center' }}
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                          touched.code &&
                          'is-invalid'}`}
                      />
                      <div className="text-center" style={{ color: '#D54B4B' }}>
                        {errors.code && touched.code ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="code" />
                      </div>
                      {/* <div className="text-center">
                        <ErrorMessage name={"code"} />
                      </div> */}
                      <br />
                      <p className="text-center text-danger">
                        {' '}
                        {this.props.t('app_empresa_modal_eliminar_titulo_3')}
                      </p>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={'btn btn-outline-danger btn-sm'}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <i className="fa fa-trash" />{' '}
                      {this.props.t(
                        'app_empresa_modal_eliminar_boton_eliminar'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError: false,
                          alertCode: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{' '}
                      {this.props.t('app_empresa_modal_eliminar_boton_cerrar')}{' '}
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

ModalDeleteEmpresa.propTypes = {
  t: PropTypes.any,
  modaldelempresa: PropTypes.bool.isRequired
};

export default ModalDeleteEmpresa;
