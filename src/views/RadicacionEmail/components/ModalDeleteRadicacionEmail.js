import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, withFormik, ErrorMessage, Field, From } from 'formik';

class ModalDeleteRadicacionEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      idRadicacionEmail: this.props.id,
      email: '',
      useLogged: '',
      alertSuccess: false,
      alertError: false,
      alertemail: false,
      t: this.props.t,
      username: 'ccuartas'
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      nombre: '',
      idRadicacionEmail: id,
      useLogged: 'jferrer'
    });
    fetch(
      `http://192.168.10.180:8090/api/sgdea/service/configuration/email/accounts/filing/${id}?username=${this.state.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM4MzExOTQsInVzZXJfbmFtZSI6ImNjdWFydGFzIiwiYXV0aG9yaXRpZXMiOlsiQVNJU1RFTlRFIEFETUlOSVNUUkFUSVZPIl0sImp0aSI6IjlmODRhMTYwLTJmYzUtNDQ4MC04YjdlLWNkYmE2YjU2NWE3NiIsImNsaWVudF9pZCI6ImZyb250ZW5kYXBwIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.yhrzith-pTcRnaUWZ655-ATmuvfWmZ3nIiUcGDrrN2c'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          email: data.email
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertemail: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      email: ''
    };
    const email = this.state.email;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {t('app_radicacion_email_modal_eliminar_titulo')} {email}{' '}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:8090/api/sgdea/service/configuration/email/accounts/filing/${this.state.idRadicacionEmail}?email=${values.email}&username=${this.state.useLogged}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization:
                        'Bearer ' +
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM4Mjc0NDcsInVzZXJfbmFtZSI6ImNjdWFydGFzIiwiYXV0aG9yaXRpZXMiOlsiQVNJU1RFTlRFIEFETUlOSVNUUkFUSVZPIl0sImp0aSI6ImEyMDEzODE2LTM4MzQtNDdkZS04NmZhLTdmODhiN2NjMTg1NSIsImNsaWVudF9pZCI6ImZyb250ZW5kYXBwIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.Vzd_seriJB_27rVwKleOz_TDEPDwP8HCl3Q8GtlEGXY'
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
                        alertemail: true
                      });
                    }
                  })
                  .catch(error => console.log(' ', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required(
                ' Por favor introduzca el correo electrónico ha eliminar.'
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
                    <form className="form">
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        {t('app_radicacion_email_modal_eliminar_alert_error')}
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertemail}
                        toggle={this.onDismiss}
                      >
                        {t('app_radicacion_email_modal_eliminar_alert_errorId')}
                      </Alert>
                      <Alert
                        className="text-center"
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        {t('app_radicacion_email_modal_eliminar_alert_success')}
                      </Alert>
                      <p className="text-center">
                        {' '}
                        {t('appradicacion_email_modal_eliminar_titulo_2')}
                      </p>

                      <input
                        input
                        name={'email'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder={t(
                          'app_radicacion_email_modal_eliminar_placeholder'
                        )}
                        style={{ textAlign: 'center' }}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.email &&
                          touched.email &&
                          'is-invalid'}`}
                      />
                      <div className="text-center" style={{ color: '#D54B4B' }}>
                        {errors.email && touched.email ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="email" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {' '}
                        {t('app_radicacion_email_modal_eliminar_titulo_3')}
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
                        'app_radicacion_email_modal_eliminar_boton_eliminar'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError: false,
                          alertSuccess: false,
                          alertIdentification: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{' '}
                      {this.props.t(
                        'app_radicacion_email_modal_eliminar_boton_cerrar'
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

ModalDeleteRadicacionEmail.propTypes = {
  modaldelete: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalDeleteRadicacionEmail;
