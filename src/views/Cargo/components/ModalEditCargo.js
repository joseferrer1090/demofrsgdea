import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput,
  Table,
  Alert
} from 'reactstrap';
import { Formik, withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import IMGCARGO from './../../../assets/img/employee.svg';
import { CHARGE, CHARGES } from '../../../services/EndPoints';

class ModalEditCargo extends React.Component {
  state = {
    modal: this.props.modaledit,
    id: this.props.id,
    dataCharge: {},
    userName: 'jferrer',
    alertError: false,
    alertSuccess: false
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataChargeById(id);
  };

  getDataChargeById = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/charge/${id}/jferrer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCharge: data
        });
      })
      .catch(Error, console.log('Error', Error));
  };

  render() {
    const datainit = this.state.dataCharge;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Actualizar {this.state.dataCharge.name} </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={datainit}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(' Por favor introduzca un código.'),
              name: Yup.string().required(' Por favor introduzca un nombre.'),
              description: Yup.string().max(250, ' Máximo 250 caracteres.'),
              status: Yup.bool().test('Activado', '', value => value === true)
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const tipoEstado = data => {
                  let tipo = null;
                  if (data === true) {
                    return (tipo = 1);
                  } else if (data === false) {
                    return (tipo = 0);
                  }
                  return tipo;
                };
                fetch(CHARGES, {
                  method: 'PUT',
                  headers: {
                    Authorization: 'Basic ' + window.btoa('sgdea:123456'),
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    code: values.code,
                    name: values.name,
                    id: this.state.id,
                    status: tipoEstado(values.status),
                    description: values.description,
                    userName: this.state.userName
                  })
                })
                  .then(response => {
                    console.log(response.status);
                    if (response.status === 200) {
                      this.setState({
                        alertSuccess: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertSuccess: false,
                          modal: false
                        });
                      }, 3000);
                    } else if (response.status === 400) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false
                        });
                      }, 3000);
                    } else if (response.status === 500) {
                      this.setState({
                        alertError: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError: false,
                          modal: !this.state.modal
                        });
                      }, 3000);
                    }
                  })
                  .catch(error => console.log('', error));
                setSubmitting(false);
              }, 1000);
            }}
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
                      color="danger"
                      isOpen={this.state.alertError}
                      toggle={this.onDismiss}
                    >
                      Error al actualizar el cargo.
                    </Alert>
                    <Alert
                      color="success"
                      isOpen={this.state.alertSuccess}
                      toggle={this.onDismiss}
                    >
                      Se actualizo el cargo con éxito.
                    </Alert>
                    <form className="form">
                      <Row>
                        <Col sm="3">
                          <img src={IMGCARGO} className="img-thumbnail" />
                        </Col>
                        <Col sm="9">
                          <div className="">
                            {' '}
                            <h5
                              className=""
                              style={{ borderBottom: '1px solid black' }}
                            >
                              {' '}
                              Datos{' '}
                            </h5>{' '}
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  Código <span className="text-danger">*</span>{' '}
                                  <dd>
                                    {' '}
                                    <input
                                      name={'code'}
                                      type="text"
                                      placeholder=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.code}
                                      className={`form-control form-control-sm ${errors.code &&
                                        touched.code &&
                                        'is-invalid'}`}
                                    />
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.code && touched.code ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={'code'} />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <dl className="param">
                                  Nombre <span className="text-danger">*</span>{' '}
                                  <dd>
                                    <input
                                      name={'name'}
                                      type="text"
                                      placeholder=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                      className={`form-control form-control-sm ${errors.name &&
                                        touched.name &&
                                        'is-invalid'}`}
                                    />
                                    <div style={{ color: '#D54B4B' }}>
                                      {errors.name && touched.name ? (
                                        <i className="fa fa-exclamation-triangle" />
                                      ) : null}
                                      <ErrorMessage name={'name'} />
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <dl className="param">
                                  Descripción
                                  <dd>
                                    {' '}
                                    <textarea
                                      name={'description'}
                                      className="form-control form-control-sm"
                                      placeholder=""
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.description}
                                    />
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <dl className="param">
                                  <label>
                                    {' '}
                                    Estado{' '}
                                    <span className="text-danger">*</span>{' '}
                                  </label>
                                  <div className="text-justify">
                                    <Field
                                      name="status"
                                      render={({ field, form }) => {
                                        return (
                                          <CustomInput
                                            type="checkbox"
                                            id="CheckBoxEditRoles"
                                            label=" Si esta opción se encuentra activada, representa
                            que el rol es visible en el sistema y se podrán
                            realizar operaciones entre cada uno de los módulos
                            correspondientes de la aplicación. En caso
                            contrario el rol no se elimina del sistema solo
                            quedará inactivo e invisibles para cada uno de los
                            módulos correspondiente del sistema."
                                            {...field}
                                            checked={field.value}
                                            className={
                                              errors.status &&
                                              touched.status &&
                                              'invalid-feedback'
                                            }
                                          />
                                        );
                                      }}
                                    />
                                    <ErrorMessage name="status" />
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className={'btn btn-outline-success btn-sm'}
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                        console.log('Hola');
                      }}
                    >
                      <i className="fa fa-pencil" /> Actualizar
                    </button>
                    <button
                      className={'btn btn-outline-secondary btn-sm'}
                      type="button"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      <i className="fa fa-times" /> Cerrar
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

export default ModalEditCargo;
