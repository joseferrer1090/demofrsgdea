import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, withFormik, ErrorMessage, Field, From } from 'formik';

class ModalDeleteConglomerado extends React.Component {
  state = {
    modal: this.props.modaldeletestate,
    idConglomerado: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertCode: false
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      code: '',
      idConglomerado: id,
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
      code: ''
    };
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader> Eliminar conglomerado </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/conglomerate/${this.state.idConglomerado}?code=${values.code}&username=${this.state.useLogged}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'BASIC ' + window.btoa('sgdea:123456')
                    }
                  }
                )
                  .then(response => {
                    console.log(response);
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
                ' Por favor introduzca el código del conglomerado.'
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
                        El conglomerado a eliminar, esta asociado a otras
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
                        className="text-center"
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        El conglomerado ha sido eliminado con éxito.
                      </Alert>
                      <p className="text-center">
                        {' '}
                        Confirmar el <code> código </code> para eliminar el
                        conglomerado.{' '}
                      </p>
                      <input
                        type="text"
                        placeholder="Código del conglomerado a eliminar"
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
                        El conglomerado quedará elimanado de manera permanente.{' '}
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
                          alertCode: false,
                          alertSuccess: false
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

ModalDeleteConglomerado.propTypes = {
  modaldeletestate: PropTypes.bool.isRequired
};

export default ModalDeleteConglomerado;
