import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap';
import * as Yup from 'yup';
import { Formik, ErrorMessage, Field } from 'formik';

class ModalDeleteCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel,
      idCity: this.props.id,
      nombre: '',
      useLogged: '',
      alertCode: false,
      alertError: false,
      alertSuccess: false,
      nameCity: '',
      t: this.props.t
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idCity: id,
      code: '',
      useLogged: 'ccuartas'
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/city/${id}/ccuartas`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameCity: data.name
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  onDismiss = () => {
    this.setState({
      alertError: false,
      alertCode: false,
      alertSuccess: false
    });
  };

  render() {
    const dataPreview = {
      code: ''
    };
    const nameCity = this.state.nameCity;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_ciudad_modal_eliminar_titulo')} {nameCity}{' '}
          </ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/city/${this.state.idCity}?code=${values.code}&username=${this.state.useLogged}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'BASIC ' + window.btoa('sgdea:123456')
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
                      setTimeout(() => {
                        this.setState({
                          alertCode: false
                        });
                      }, 3000);
                    }
                  })
                  .catch(error => console.log(' ', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                ' Por favor introduzca el código de la ciudad.'
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
                        La ciudad que va a eliminar, esta asociado a otras
                        entidades.
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        Por favor introduzca un código válido.
                      </Alert>
                      <Alert color="success" isOpen={this.state.alertSuccess}>
                        La ciudad se ha eliminado con éxito.
                      </Alert>
                      <p className="text-center">
                        {' '}
                        {this.props.t('app_ciudad_modal_eliminar_titulo_2')}
                      </p>

                      <input
                        name={'code'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder={this.props.t(
                          'app_ciudad_modal_eliminar_placeholder'
                        )}
                        style={{ textAlign: 'center' }}
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
                      <br />
                      <p className="text-center text-danger">
                        {' '}
                        {this.props.t(
                          'app_ciudad_modal_eliminar_titulo_3'
                        )}{' '}
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
                        'app_ciudad_modal_eliminar_button_eliminar'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({
                          modal: false,
                          alertError: false,
                          alertCode: false,
                          alertSuccess: false
                        });
                      }}
                    >
                      <i className="fa fa-times" />{' '}
                      {this.props.t('app_ciudad_modal_eliminar_button_cerrar')}{' '}
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

ModalDeleteCiudad.propTypes = {
  modaldel: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired,
  t: PropTypes.any
};

export default ModalDeleteCiudad;
