import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, withFormik, ErrorMessage, Field, From } from 'formik';
import { Trans } from 'react-i18next';

class ModalDeleteUser extends React.Component {
  state = {
    modal: this.props.modaldel,
    id: this.props.id,
    alertSuccess: false,
    alertError: false,
    alertCode: false,
    identification: '',
    useLogged: 'jferrer',
    nameUser: ''
  };

  toggle = id => {
    this.setState(
      {
        modal: !this.state.modal,
        id: id
      },
      () => this.props.updateTable()
    );
    fetch(
      `http://192.168.10.180:7000/api/sgdea/user/${id}?username=${this.state.useLogged}`,
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
          nameUser: data.name
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
      identificacion: ''
    };
    console.log(this.state.id);
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Eliminar usuario {this.state.nameUser}</ModalHeader>

          <Formik
            initialValues={dataInitial}
            onSubmit={(values, setSubmitting) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/user/${this.state.id}?identification=${values.identificacion}&username=${this.state.useLogged}`,
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
                  .catch(Error => console.log('', Error));
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              identificacion: Yup.string().required(
                ' Por favor introduzca la identificacion del usuario.'
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
                  <form className="form">
                    <ModalBody>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertError}
                        toggle={this.onDismiss}
                      >
                        Error, al eliminar el usuario {values.identificacion}
                      </Alert>
                      <Alert
                        color="success"
                        isOpen={this.state.alertSuccess}
                        toggle={this.onDismiss}
                      >
                        Se elimino de manera satisfactoria el usuario
                      </Alert>
                      <Alert
                        color="danger"
                        isOpen={this.state.alertCode}
                        toggle={this.onDismiss}
                      >
                        La identificacion {values.identificacion} para eliminar
                        no corresponde a usuario
                      </Alert>
                      <p className="text-center">
                        Confirmar la identificacion para eliminar el usuario
                      </p>
                      <input
                        type="text"
                        placeholder="identificacion del usuario"
                        style={{ textAlign: 'center' }}
                        name="identificacion"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.identificacion &&
                          touched.identificacion &&
                          'is-invalid'}`}
                      />
                      <div className="text-center" style={{ color: '#D54B4B' }}>
                        {errors.identificacion && touched.identificacion ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="identificacion" />
                      </div>
                      <br />
                      <p className="text-center text-danger">
                        El usuario sera eliminado de manera permanente
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        type="submit"
                        className="btn btn-outline-danger btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {' '}
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
                        <i className="fa fa-times" /> Cerrar
                      </button>
                    </ModalFooter>
                  </form>
                </Fragment>
              );
            }}
          </Formik>
        </Modal>
      </Fragment>
    );
  }
}

ModalDeleteUser.propTypes = {
  modaldeletestate: PropTypes.bool.isRequired
};

export default ModalDeleteUser;
