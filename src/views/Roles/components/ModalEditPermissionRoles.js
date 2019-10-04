import React, { Component, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  UncontrolledAlert
} from 'reactstrap';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';

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
    const dataPreview = this.state.dataPermisosId.map((aux, id) => {
      return {
        label: aux.name,
        value: aux.id
      };
    });
    const t = this.state.t;
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
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
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
                                      {/* <dd>{values.codigo}</dd> */}
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
                                      {/* <dd>{values.nombre}</dd> */}
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
                                  // error={errors.permisos}
                                  // touched={touched.permisos}
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

class SelectModulo extends React.Component {
  state = {
    dataModule: []
  };

  componentDidMount() {
    this.getDataModulos();
  }

  getDataModulos = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/module/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataModule: data
        });
      })
      .catch(err => console.log('', err));
  };

  handleChange = value => {
    this.props.onChange('modulos', value);
  };

  handleBlur = () => {
    this.props.onBlur('modulos', true);
  };

  render() {
    return (
      <div>
        <select
          className="form-control form-control-sm"
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          name={this.props.name}
          value={this.props.value}
        >
          <option value={0}> -- seleccione -- </option>
          {this.state.dataModule.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
class MySelectEntidades extends React.Component {
  state = {
    dataEntidades: [],
    id: this.props.modulo
  };

  static getDerivedStateFromProps(props, state) {
    if (props.modulo !== state.id) {
      return {
        id: props.modulo
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.modulo !== prevProps.modulo) {
      this.getDataEntity();
    }
  }

  componentDidMount() {
    this.getDataEntity();
  }

  getDataEntity = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/entity/module/${this.state.id}/active`,
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
          dataEntidades: data
        });
        console.log(data);
      })
      .catch(err => console.log('Error', err));
  };

  handleChange = value => {
    this.props.onChange('entidad', value);
  };

  handleBlur = () => {
    this.props.onBlur('entidad', true);
  };

  render() {
    // console.log(this.state.id);
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
          value={this.props.value}
        >
          <option value={''}>-- seleccione --</option>
          {this.state.dataEntidades.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

class PermisosAsignados extends React.Component {
  state = {
    dataPermisos: [],
    id: this.props.entidad
  };

  static getDerivedStateFromProps(props, state) {
    if (props.entidad !== state.id) {
      return {
        id: props.entidad
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.entidad !== prevProps.entidad) {
      this.getPermissionById();
    }
  }

  componentDidMount() {
    this.getPermissionById();
  }

  getPermissionById = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/permission/page/entity/${this.state.id}`,
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
          dataPermisos: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  handleChange = value => {
    this.props.onChange('permisos', value);
  };

  handleBlur = () => {
    this.props.onBlur('permisos', true);
  };
  render() {
    console.log(this.state.id);
    const aux = this.state.dataPermisos.map((aux, id) => {
      return {
        id: id,
        label: aux.name,
        value: aux.id
      };
    });
    return (
      <div>
        <div>
          <Select
            name={this.props.name}
            options={this.state.dataPermisos.map((aux, id) => {
              return { label: aux.name, value: aux.id };
            })}
            isMulti
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
            placeholder={'Asignar permisos'}
          />
        </div>
      </div>
    );
  }
}
