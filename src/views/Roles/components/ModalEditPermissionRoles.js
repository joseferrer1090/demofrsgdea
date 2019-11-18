import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  UncontrolledAlert
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectModulo from './SelectModuloModalEdit';
import MySelectEntidades from './SelectEntidadModalEdit';
import PermisosAsignados from './AsignarPermisosModalEdit';

class ModalEditPermissionRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      modal: this.props.modaleditpermission,
      dataPermisosId: [],
      dataRolById: {},
      modulos: [],
      entidades: [],
      userName: 'jferrer',
      t: this.props.t
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataPermissionById(id);
    this.getDataRoleById(id);
  };

  getDataRoleById = id => {
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
      .catch(err => console.log('Err', err));
  };

  getDataPermissionById = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/role/permissions/${id}?username=${this.state.userName}`,
      {
        method: 'GET',
        headers: {
          'Cotent-Type': 'application/json',
          Authorization: 'Basic ' + window.btoa('sgdea:123456')
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataPermisosId: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {t('app_roles_modal_editar_permisos_titulo')}{' '}
            {this.state.dataRolById.name}
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={{
              permisos: this.state.dataPermisosId.map((aux, id) => {
                return { label: aux.name, value: aux.id };
              }),
              nombre: this.state.dataRolById.name,
              codigo: this.state.dataRolById.code
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(`http://192.168.10.180:7000/api/sgdea/role/permissions`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    id: this.state.id,
                    permissions: values.permisos,
                    userName: this.state.userName
                  })
                })
                  .then(response => {
                    if (response === 200) {
                      console.log('Se hizo el put con los nuevos permisos');
                    } else if (response.status === 400) {
                      console.log('Error se enviaron mal los datos');
                    } else if (response === 500) {
                      console.log('Error en el Servidor');
                    }
                  })
                  .catch(err => console.log('error'));
                // alert(JSON.stringify(values, "", 2));
              }, 1000);
              setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              permisos: Yup.array().of(
                Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required()
                })
              )
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleSubmit,
                setFieldTouched,
                setFieldValue
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <form>
                      <Row>
                        <Col sm="12">
                          <UncontrolledAlert color="warning">
                            <div className="text-center">
                              <i className="fa fa-exclamation-triangle" />{' '}
                              {t('app_roles_modal_editar_permisos_alert')}{' '}
                              <i className="fa fa-exclamation-triangle" />
                            </div>
                          </UncontrolledAlert>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col sm="12">
                          <Row>
                            <Col sm="12">
                              <div className="card card-body">
                                <div className="row">
                                  <Col sm="6">
                                    <div className="form-group">
                                      <dt>
                                        {t(
                                          'app_roles_modal_editar_permisos_codigo'
                                        )}
                                      </dt>

                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        disabled
                                        name="codigo"
                                        value={values.codigo}
                                      />
                                    </div>
                                  </Col>
                                  <Col sm="6">
                                    <div className="form-group">
                                      <dt>
                                        {t(
                                          'app_roles_modal_editar_permisos_nombre'
                                        )}
                                      </dt>

                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        disabled
                                        name="nombre"
                                        value={values.nombre}
                                      />
                                    </div>
                                  </Col>
                                </div>
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {t(
                                    'app_roles_modal_editar_permisos_modulo'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <SelectModulo
                                  t={this.props.t}
                                  name="modulos"
                                  value={values.modulos}
                                  onChange={e => {
                                    setFieldValue('modulos', e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched('modulos', true);
                                  }}
                                  className={`form-control form-control-sm ${errors.modulos &&
                                    touched.modulos &&
                                    'is-invalid'}`}
                                />
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="form-group">
                                <label>
                                  {' '}
                                  {t(
                                    'app_roles_modal_editar_permisos_entidades'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <MySelectEntidades
                                  t={this.props.t}
                                  modulo={props.values.modulos}
                                  name={'entidad'}
                                  value={values.entidad}
                                  onChange={e => {
                                    setFieldValue('entidad', e.target.value);
                                  }}
                                  onBlur={() => {
                                    setFieldTouched('entidad', true);
                                  }}
                                  className={`form-control form-control-sm ${errors.entidad &&
                                    touched.entidad &&
                                    'is-invalid'}`}
                                />
                              </div>
                            </Col>
                            {/*  Aqui va la funcionalidad    */}
                            <Col sm="12">
                              <div className="form-group">
                                <label>
                                  {t(
                                    'app_roles_modal_editar_permisos_asignar_permisos'
                                  )}{' '}
                                  <span className="text-danger">*</span>{' '}
                                </label>
                                <PermisosAsignados
                                  t={this.props.t}
                                  entidad={props.values.entidad}
                                  name={'permisos'}
                                  value={values.permisos}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                              </div>
                            </Col>
                            {/*  Fin   */}
                          </Row>
                        </Col>
                      </Row>
                      <Row />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="btn btn-outline-warning btn-sm"
                    >
                      {' '}
                      <i className="fa fa-lock" />{' '}
                      {t(
                        'app_roles_modal_editar_permisos_boton_editar_permisos'
                      )}{' '}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: false });
                      }}
                    >
                      {' '}
                      <i className="fa fa-times" />{' '}
                      {t('app_roles_modal_editar_permisos_boton_cerrar')}{' '}
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

ModalEditPermissionRoles.propTypes = {
  id: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired
};

export default ModalEditPermissionRoles;
