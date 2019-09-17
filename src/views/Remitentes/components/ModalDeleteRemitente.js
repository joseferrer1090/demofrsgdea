import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import * as Yup from 'yup';
import { Formik, ErrorMessage, Field } from 'formik';

class ModalDeleteRemitente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldel,
      id: this.props.id,
      identification: '',
      useLogged: '',
      alertError: false,
      alertCode: false,
      alertSuccess: false,
      nameTercero: '',
      t: this.props.t,
      username: 'ccuartas'
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      useLogged: 'ccuartas',
      identification: ''
    });
    fetch(
      `http://192.168.10.180:7000/api/sgdea/thirdparty/${id}?username=${this.state.username}`,
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
          nameTercero: data.name
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
      identification: ''
    };
    const nameTercero = this.state.nameTercero;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_tercero_modal_eliminar_titulo')} {nameTercero}{' '}
          </ModalHeader>
          <Formik
            initialValues={dataPreview}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/thirdparty/${this.state.id}?identification=${values.identification}&username=${this.state.useLogged}`,
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
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertError: false
                        });
                      }, 3000);
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
                  .catch(error => console.log(' ', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              identification: Yup.string().required(
                ' Por favor introduzca el número de idenficación del tercero.'
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
                        color="success"
                        isOpen={this.state.alertSuccess}
                      >
                        El tercero ha sido eliminada con éxito.
                      </Alert>
                      <Alert
                        className="text-center"
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        El tercero que va a eliminar, esta asociado a otras
                        entidades.
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        Por favor introduzca una identificación valida.
                      </Alert>
                      <p className="text-center">
                        {' '}
                        {this.props.t('app_tercero_modal_eliminar_titulo_2')}
                      </p>

                      <input
                        name={'identification'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder={this.props.t(
                          'app_tercero_modal_eliminar_placeholder'
                        )}
                        style={{ textAlign: 'center' }}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.identification &&
                          touched.identification &&
                          'is-invalid'}`}
                      />
                      <div className="text-center" style={{ color: '#D54B4B' }}>
                        {errors.identification && touched.identification ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="identification" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        {' '}
                        {this.props.t(
                          'app_tercero_modal_eliminar_titulo_3'
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
                        'app_tercero_modal_eliminar_boton_eliminar'
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
                      {this.props.t('app_tercero_modal_eliminar_boton_cerrar')}
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

ModalDeleteRemitente.propTypes = {
  modaldel: PropTypes.bool.isRequired,
  updateTable: PropTypes.func.isRequired
};

export default ModalDeleteRemitente;
