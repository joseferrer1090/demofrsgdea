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

class ModalDeleteCargo extends React.Component {
  state = {
    modal: this.props.modaldelcargo,
    id: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertCode: false,
    useLogged: 'jferrer'
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      useLogged: 'jferrer'
    });
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
      nombre: ''
    };

    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar Cargo </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/charge/${this.state.id}?code=${values.code}&username=${this.state.useLogged}`,
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
                ' Por favor introduzca el código del cargo.'
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
                        El cargo que va a eliminar, esta asociado a otras
                        entidades.
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        Por favor introduzca un código válido.
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        El cargo se ha eliminado con éxito.
                      </Alert>
                      <p className="text-center">
                        {' '}
                        Confirmar el <code> código </code> para eliminar el
                        cargo{' '}
                      </p>

                      <input
                        type="text"
                        placeholder="Código de la empresa a eliminar"
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
                        <ErrorMessage name={"nombre"} />
                      </div> */}
                      <br />
                      <p className="text-center text-danger">
                        {' '}
                        El cargo quedará elimanado de manera permanente.{' '}
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
                          alertCode: false
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

ModalDeleteCargo.propTypes = {
  modaldelcargo: PropTypes.bool.isRequired
};

export default ModalDeleteCargo;
