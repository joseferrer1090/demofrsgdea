import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from 'reactstrap';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

class ModalDeleteDependencia extends Component {
  state = {
    modal: this.props.modalDel,
    code: '',
    id: this.props.id,
    userLogged: 'jferrer',
    alertError: false,
    alertCode: false,
    alertSuccess: false,
    nameDependence: '',
    t: this.props.t
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/dependence/${id}/jferrer`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + window.btoa('sgdea:123456'),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          nameDependence: data.name
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
    const dataInit = {
      code: ''
    };
    const nameDependence = this.state.nameDependence;
    // console.log(this.state.id);
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {this.props.t('app_dependencia_form_eliminar_titulo')}{' '}
            {nameDependence}{' '}
          </ModalHeader>
          <Formik
            initialValues={dataInit}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/dependence/${this.state.id}?code=${values.code}&username=${this.state.userLogged}`,
                  {
                    method: 'DELETE',
                    headers: {
                      Authorization: 'Basic ' + window.btoa('sgdea:123456')
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
                          alertError: false,
                          modal: false
                        });
                      }, 2000);
                    } else if (response.status === 204) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        }, () => this.props.updateTable());
                      }, 2000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertCode: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertCode: false,
                          modal: false
                        });
                      }, 2000);
                    }
                  })
                  .catch(Error => console.log('Error', Error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(
                ' Por favor introduzca el código de la dependencia.'
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
                        La dependencia a eliminar, esta asociado a otras
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
                        La dependencia ha sido eliminada con éxito.
                      </Alert>
                      <p className="text-center">
                        {' '}
                        {this.props.t('app_dependencia_form_eliminar_titulo_2')}
                      </p>

                      <input
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.code}
                        className={`form-control form-control-sm col-sm-6 offset-sm-3 ${errors.code &&
                          touched.code &&
                          'is-invalid'}`}
                        type="text"
                        placeholder={this.props.t(
                          'app_dependencia_form_eliminar_placeholder'
                        )}
                        style={{ textAlign: 'center' }}
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
                          'app_dependencia_form_eliminar_titulo_3'
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
                        'app_dependencia_form_eliminar_boton_eliminar'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" />{' '}
                      {this.props.t(
                        'app_dependencia_form_eliminar_boton_cerrar'
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

ModalDeleteDependencia.propTypes = {
  modalDel: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalDeleteDependencia;
