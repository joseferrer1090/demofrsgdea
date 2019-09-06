import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  CustomInput,
  Alert
} from 'reactstrap';
import { PAIS_EDIT } from './../../../data/JSON-SERVER';
import IMGCOUNTRY from './../../../assets/img/flag.svg';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import { COUNTRIES } from './../../../services/EndPoints';

class ModalEditPais extends React.Component {
  state = {
    modal: this.props.modaledit,
    idPais: this.props.id,
    dataResult: {},
    alertError: false,
    alertSuccess: false,
    alertError400: false
  };

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      idPais: id
    });
    this.getCountryByID(id);
  };

  getCountryByID = id => {
    fetch(`http://192.168.10.180:7000/api/sgdea/country/${id}/ccuartas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataResult: {
            country_code: data.code,
            country_name: data.name,
            country_status: data.status
          }
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const dataResult = this.state.dataResult;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar {dataResult.country_name} </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={dataResult}
            onSubmit={(values, { setSubmitting }) => {
              const tipoEstado = data => {
                let tipo = null;
                if (data === true) {
                  return (tipo = 1);
                } else if (data === false) {
                  return (tipo = 0);
                }
                return null;
              };
              setTimeout(() => {
                fetch(COUNTRIES, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.idPais,
                    code: values.country_code,
                    name: values.country_name,
                    status: tipoEstado(values.country_status),
                    userName: 'ccuartas'
                  })
                })
                  .then(response => {
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
                        alertError400: true
                      });
                      setTimeout(() => {
                        this.setState({
                          alertError400: false
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
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              country_code: Yup.string().required(
                ' Por favor introduzca un código.'
              ),
              country_name: Yup.string().required(
                ' Por favor introduzca un nombre.'
              ),
              country_status: Yup.bool().test(
                'Activado',
                '',
                value => value === true
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
                    <Alert color="danger" isOpen={this.state.alertError}>
                      Error al actualizar el país.
                    </Alert>
                    <Alert color="success" isOpen={this.state.alertSuccess}>
                      Se actualizo el país con éxito.
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertError400}>
                      Se actualizo el país con éxito.
                      {/* Error, el país ya esta asignado. */}
                    </Alert>
                    <Row>
                      <Col sm="3">
                        <img src={IMGCOUNTRY} className="img-thumbnail" />
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
                        <form className="form">
                          <div className="row">
                            <div className="col-md-6">
                              <label>
                                {' '}
                                Código <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                name={'country_code'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country_code}
                                className={`form-control form-control-sm ${errors.country_code &&
                                  touched.country_code &&
                                  'is-invalid'}`}
                              />
                              <div style={{ color: '#D54B4B' }}>
                                {errors.country_code && touched.country_code ? (
                                  <i className="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="country_code" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  Nombre <span className="text-danger">
                                    *
                                  </span>{' '}
                                </label>
                                <input
                                  type="text"
                                  name="country_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.country_name}
                                  className={`form-control form-control-sm ${errors.country_name &&
                                    touched.country_name &&
                                    'is-invalid'}`}
                                />{' '}
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.country_name &&
                                  touched.country_name ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="country_name" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  Estado <span className="text-danger">
                                    *
                                  </span>{' '}
                                </label>
                                <div className="text-justify">
                                  <Field
                                    name="country_status"
                                    render={({ field, form }) => {
                                      return (
                                        <CustomInput
                                          type="checkbox"
                                          id="CheckboxEditCiudad"
                                          label=" Si esta opción se encuentra activada, representa que
                                            el departamento es visible en el sistema y se podrán
                                            realizar operaciones entre cada uno de los módulos
                                            correspondientes de la aplicación. En caso contrario
                                            el departamento no se elimina del sistema solo
                                            quedará inactivo e invisibles para cada uno de los
                                            módulos correspondiente del sistema."
                                          {...field}
                                          checked={field.value}
                                          className={
                                            errors.country_status &&
                                            touched.country_status &&
                                            'invalid-feedback'
                                          }
                                        />
                                      );
                                    }}
                                  />
                                  <ErrorMessage name="country_status" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {' '}
                      <i className="fa fa-pencil" /> Actualizar{' '}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {' '}
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

ModalEditPais.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditPais;
