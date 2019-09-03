import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, withFormik, ErrorMessage, Field, From } from 'formik';

class ModalDeleteMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      idMessenger: this.props.id,
      nombre: '',
      useLogged: '',
      alertSuccess: false,
      alertError: false,
      alertIdentification: false
    };
  }

  toggle = id => {
    console.log(id);
    this.setState({
      modal: !this.state.modal,
      nombre: '',
      idMessenger: id,
      useLogged: 'jferrer'
    });
  };

  onDismiss = () => {
    this.setState({
      alertError: false,
      alertIdentification: false,
      alertSuccess: false
    });
  };

  render() {
    const dataInitial = {
      nombre: ''
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Eliminar mensajero</ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/messenger/${this.state.idMessenger}?identification=${values.identification}&username=${this.state.useLogged}`,
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
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState({
                          modal: false,
                          alertSuccess: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertIdentification: true
                      });
                    }
                  })
                  .catch(error => console.log(' ', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              identification: Yup.string().required(
                ' Por favor introduzca el número de identificación del mensajero.'
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
                        El mensajero que va a eliminar, esta asociado a otras
                        entidades.
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertIdentification}
                        toggle={this.onDismiss}
                      >
                        Por favor introduzca un código válido.
                      </Alert>
                      <Alert
                        className="text-center"
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        El mensajero ha sido eliminado con éxito.
                      </Alert>
                      <p className="text-center">
                        {' '}
                        Confirmar el número de<code> identificación </code> para
                        eliminar el mensajero.{' '}
                      </p>

                      <input
                        input
                        name={'identification'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Número de identificación para eliminar el mensajero"
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
                        El mensajero quedará eliminada de manera permanente.{' '}
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
                      <i className="fa fa-trash" /> Eliminar
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
                      <i className="fa fa-times" /> Cerrar{' '}
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

ModalDeleteMensajero.propTypes = {
  modaldelete: PropTypes.bool.isRequired
};

export default ModalDeleteMensajero;
