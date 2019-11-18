import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap';
import PropType from 'prop-types';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';

class ModalDeleteRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaldelete,
      id: this.props.id,
      userName: 'jferrer',
      dataRolById: {},
      t: this.props.t,
      alertError: false,
      alertSuccess: false,
      alertCode: false
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataRolById(id);
  };

  getDataRolById = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/role/${id}?username=${this.state.userName}`,
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
          dataRolById: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  render() {
    const dataInitial = {
      codigo: ''
    };
    const { t } = this.props;
    return (
      <Fragment>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            {' '}
            {t('app_roles_modal_eliminar_titulo')} {this.state.dataRolById.name}{' '}
          </ModalHeader>
          <Formik
            initialValues={dataInitial}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values));
                fetch(
                  `http://192.168.10.180:7000/api/sgdea/role/${this.state.id}?code=${values.codigo}&username=${this.state.userName}`,
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
                  .catch(err => console.log('Error', err));
              }, 1000);
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string().required(
                ' Por favor introduzca el codigo del rol a eliminar'
              )
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit
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
                      {t('app_roles_modal_eliminar_alert_error')}
                    </Alert>
                    <Alert
                      color="danger"
                      isOpen={this.state.alertCode}
                      toggle={this.onDismiss}
                    >
                      {t('app_roles_modal_eliminar_alert_errorCode')}
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      {t('app_roles_modal_eliminar_alert_success')}
                    </Alert>
                    <form className="form">
                      <p className="text-center">
                        {' '}
                        {t('app_roles_modal_eliminar_titulo_2')}{' '}
                      </p>
                      <input
                        name="codigo"
                        value={values.codigo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control col-sm-6 offset-sm-3 form-control-sm ${errors.codigo &&
                          touched.codigo &&
                          'is-invalid'}`}
                        type="text"
                        placeholder={t('app_roles_modal_eliminar_placeholder')}
                        style={{ textAlign: 'center' }}
                      />
                      <div className="text-center" style={{ color: '#D54B4B' }}>
                        {errors.codigo && touched.codigo ? (
                          <i class="fa fa-exclamation-triangle" />
                        ) : null}
                        <ErrorMessage name="codigo" />
                      </div>

                      <br />
                      <p className="text-center text-danger">
                        {' '}
                        {t('app_roles_modal_eliminar_titulo_3')}{' '}
                      </p>
                    </form>
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
                      <i className="fa fa-trash" />{' '}
                      {t('app_roles_modal_eliminar_boton_eliminar')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" />{' '}
                      {t('app_roles_modal_eliminar_boton_cerrar')}{' '}
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

ModalDeleteRoles.propType = {
  modaldelete: PropType.bool.isRequired
};

export default ModalDeleteRoles;
