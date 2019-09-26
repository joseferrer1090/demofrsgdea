import React, { Component, Fragment } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  MODULES,
  ACTIONS,
  ENTITIES,
  CONGLOMERATES_STATUS,
  COMPANYS_STATUS,
  HEADQUARTERS_STATUS,
  DEPENDENCIES_STATUS,
  USERS_STATUS
} from './../../../services/EndPoints';
import { Formik, ErrorMessage, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';

class ModalSearchAuditoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalSearch,
      acciones: '',
      usuarios: '',
      dataModules: [],
      dataEntities: [],
      dataActions: [],
      dataConglomerado: [],
      dataEmpresa: [],
      dataSede: [],
      dataDependencias: [],
      dataUsers: [],
      activeTab: '1'
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modalSearch
    }));
    this.getDataModule();
    this.getDataEntity();
    this.getDataActions();
    this.getDataConglomerates();
    this.getDataCompanys();
    this.getDataHeadquarters();
    this.getDataDependence();
    this.getDataUsers();
  };

  toogleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  handleChangeSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getDataModule = data => {
    fetch(MODULES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataModules: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataEntity = data => {
    fetch(ENTITIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataEntities: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataActions = data => {
    fetch(ACTIONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataActions: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataConglomerates = data => {
    fetch(CONGLOMERATES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataCompanys = data => {
    fetch(COMPANYS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataEmpresa: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataHeadquarters = data => {
    fetch(HEADQUARTERS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataSede: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataDependence = data => {
    fetch(DEPENDENCIES_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDependencias: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };

  getDataUsers = data => {
    fetch(USERS_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataUsers: data
        });
      })
      .catch(Error => console.log(' ', Error));
  };
  render() {
    const mapOptionsModules = this.state.dataModules.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const mapOptionsEntities = this.state.dataEntities.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    const mapOptionsActions = this.state.dataActions.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsConglomerate = this.state.dataConglomerado.map(
      (aux, idx) => {
        return (
          <option key={aux.id} value={aux.id}>
            {aux.name}
          </option>
        );
      }
    );

    const mapOptionsCompanys = this.state.dataEmpresa.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsHeadquarters = this.state.dataSede.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsDependence = this.state.dataDependencias.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });

    const mapOptionsUsers = this.state.dataUsers.map((aux, idx) => {
      return (
        <option key={aux.id} value={aux.id}>
          {aux.name}
        </option>
      );
    });
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Consultar auditoría</ModalHeader>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetch(`http://192.168.10.180:7000/api/sgdea/audit/consult`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa('sgdea:123456')
                  },
                  body: JSON.stringify({
                    actionId: values.audit_accciones,
                    from: values.audit_fechaDesde,
                    ip: '',
                    page: 0,
                    size: 50,
                    to: values.audit_fechaHasta,
                    userNameAuthenticate: 'ccuartas',
                    username: 'ccuartas'
                  })
                })
                  .then(response => response.json())
                  .then(data => {
                    this.setState({
                      dataAuditoria: data.content
                    });
                    this.props.onDataFetch(data.content);
                    console.log(data.content);
                  })
                  .catch(error => console.log('', error));
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={Yup.object().shape({
              audit_fechaDesde: Yup.string().required(
                ' Por favor introduzca la fecha desde.'
              ),
              audit_fechaHasta: Yup.string().required(
                ' Por favor introduzca la fecha hasta.'
              ),
              audit_modulo: Yup.string().ensure(),
              audit_entidad: Yup.string().ensure(),
              audit_accciones: Yup.string().ensure(),
              audit_conglomerado: Yup.string().ensure(),
              audit_empresa: Yup.string().ensure(),
              audit_sede: Yup.string().ensure(),
              audit_dependencia: Yup.string().ensure(),
              audit_usuarios: Yup.string().ensure()
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
                setFieldValue
              } = props;
              return (
                <Fragment>
                  <ModalBody>
                    <Row>
                      <Col sm="12">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === '1'
                              })}
                              onClick={() => {
                                this.toogleTab('1');
                              }}
                            >
                              Consultar auditoría
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === '2'
                              })}
                              onClick={() => {
                                this.toogleTab('2');
                              }}
                            >
                              Consulta detallada
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <div className="row">
                              <div className="col-sm-6  ">
                                <label>Fecha desde</label>
                                <input
                                  type="date"
                                  placeholder="Desde"
                                  name="audit_fechaDesde"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.audit_fechaDesde}
                                  className={`form-control form-control-sm ${errors.audit_fechaDesde &&
                                    touched.audit_fechaDesde &&
                                    'is-invalid'}`}
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.audit_fechaDesde &&
                                  touched.audit_fechaDesde ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="audit_fechaDesde" />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <label>Fecha hasta</label>
                                <input
                                  type="date"
                                  className={`form-control form-control-sm ${errors.audit_fechaHasta &&
                                    touched.audit_fechaHasta &&
                                    'is-invalid'}`}
                                  placeholder="Hasta"
                                  name="audit_fechaHasta"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.audit_fechaHasta}
                                />
                                <div style={{ color: '#D54B4B' }}>
                                  {errors.audit_fechaHasta &&
                                  touched.audit_fechaHasta ? (
                                    <i className="fa fa-exclamation-triangle" />
                                  ) : null}
                                  <ErrorMessage name="audit_fechaHasta" />
                                </div>
                              </div>
                            </div>
                          </TabPane>
                          <TabPane tabId="2">
                            <form className="">
                              <div className="row">
                                <div className="col-sm-6  ">
                                  <label>Fecha desde</label>
                                  <input
                                    type="date"
                                    className={`form-control form-control-sm ${errors.audit_fechaDesde &&
                                      touched.audit_fechaDesde &&
                                      'is-invalid'}`}
                                    placeholder="Desde"
                                    name="audit_fechaDesde"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_fechaDesde}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.audit_fechaDesde &&
                                    touched.audit_fechaDesde ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="audit_fechaDesde" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <label>Fecha hasta</label>
                                  <input
                                    type="date"
                                    className={`form-control form-control-sm ${errors.audit_fechaHasta &&
                                      touched.audit_fechaHasta &&
                                      'is-invalid'}`}
                                    placeholder="Hasta"
                                    name="audit_fechaHasta"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_fechaHasta}
                                  />
                                  <div style={{ color: '#D54B4B' }}>
                                    {errors.audit_fechaHasta &&
                                    touched.audit_fechaHasta ? (
                                      <i className="fa fa-exclamation-triangle" />
                                    ) : null}
                                    <ErrorMessage name="audit_fechaHasta" />
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-sm-6">
                                  <label>Módulo</label>
                                  <select
                                    name="audit_modulo"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_modulo}
                                    className={`form-control form-control-sm ${errors.audit_modulo &&
                                      touched.audit_modulo &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>-- Seleccione --</option>
                                    {mapOptionsModules}
                                  </select>
                                </div>
                                <div className="col-sm-6">
                                  <label>Entidad</label>
                                  <select
                                    name="audit_entidad"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_entidad}
                                    className={`form-control form-control-sm ${errors.audit_entidad &&
                                      touched.audit_entidad &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>-- Seleccione --</option>
                                    {mapOptionsEntities}
                                  </select>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-sm-12">
                                  <label>Acciones</label>
                                  <select
                                    name="audit_accciones"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_accciones}
                                    className={`form-control form-control-sm ${errors.audit_accciones &&
                                      touched.audit_accciones &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>-- Seleccione --</option>
                                    {mapOptionsActions}
                                  </select>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-sm-6">
                                  <label>Conglomerado</label>
                                  <SelectConglomerado
                                    name={'audit_conglomerado'}
                                    onChange={e =>
                                      setFieldValue(
                                        'audit_conglomerado',
                                        e.target.value
                                      )
                                    }
                                    value={values.audit_conglomerado}
                                    className={`form-control form-control-sm ${errors.audit_conglomerado &&
                                      touched.audit_conglomerado &&
                                      'is-invalid'}`}
                                  />
                                  {/* <select
                                    name="audit_conglomerado"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_conglomerado}
                                    className={`form-control form-control-sm ${errors.audit_conglomerado &&
                                      touched.audit_conglomerado &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>-- Seleccione --</option>
                                    {mapOptionsConglomerate}
                                  </select> */}
                                </div>
                                <div className="col-sm-6">
                                  <label>Empresa</label>
                                  <SelectCompany
                                    audit_conglomerado={
                                      props.values.audit_conglomerado
                                    }
                                    name="empresa"
                                    value={values.audit_empresa}
                                    onChange={e =>
                                      setFieldValue(
                                        'audit_empresa',
                                        e.target.value
                                      )
                                    }
                                    className={`form-control form-control-sm ${errors.audit_empresa &&
                                      touched.audit_empresa &&
                                      'is-invalid'}`}
                                  ></SelectCompany>
                                  {/* <select
                                    name="audit_empresa"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_empresa}
                                    className={`form-control form-control-sm ${errors.audit_empresa &&
                                      touched.audit_empresa &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>-- Seleccione --</option>
                                    {mapOptionsCompanys}
                                  </select> */}
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-sm-6">
                                  <label>Sede</label>
                                  <SelectHeadquarter
                                    audit_empresa={props.values.audit_empresa}
                                    name={'audit_sede'}
                                    onChange={e =>
                                      setFieldValue(
                                        'audit_sede',
                                        e.target.value
                                      )
                                    }
                                    className={`form-control form-control-sm ${errors.audit_sede &&
                                      touched.audit_sede &&
                                      'is-invalid'}`}
                                  ></SelectHeadquarter>
                                  {/* <select
                                    name="audit_sede"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_sede}
                                    className={`form-control form-control-sm ${errors.audit_sede &&
                                      touched.audit_sede &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>-- Seleccione --</option>
                                    {mapOptionsHeadquarters}
                                  </select> */}
                                </div>
                                <div className="col-sm-6">
                                  <label>Dependencia</label>
                                  <SelectDependence
                                    audit_sede={props.values.audit_sede}
                                    name={'audit_dependencia'}
                                    value={values.audit_dependencia}
                                    onChange={e =>
                                      setFieldValue(
                                        'audit_dependencia',
                                        e.target.value
                                      )
                                    }
                                    className={`form-control form-control-sm ${errors.audit_dependencia &&
                                      touched.audit_dependencia &&
                                      'is-invalid'}`}
                                  ></SelectDependence>
                                  {/* <select
                                    name="audit_dependencia"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_dependencia}
                                    className={`form-control form-control-sm ${errors.audit_dependencia &&
                                      touched.audit_dependencia &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>
                                      {' '}
                                      -- Seleccione --
                                    </option>
                                    {mapOptionsDependence}
                                  </select> */}
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-sm-12">
                                  <label>Usuarios</label>
                                  <select
                                    name="audit_usuarios"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.audit_usuarios}
                                    className={`form-control form-control-sm ${errors.audit_usuarios &&
                                      touched.audit_usuarios &&
                                      'is-invalid'}`}
                                  >
                                    <option value={''}>-- Seleccione --</option>
                                    {mapOptionsUsers}
                                  </select>
                                </div>
                              </div>
                            </form>
                          </TabPane>
                        </TabContent>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      type="button"
                      className="btn btn-success btn-sm"
                    >
                      {' '}
                      <i className="fa fa-filter" /> Consultar{' '}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        this.setState({ modal: !this.state.modal });
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

// Aca se valida que el props que se va a pasar sea un bool y no cualquier valor
ModalSearchAuditoria.propTypes = {
  modalSearch: PropTypes.bool.isRequired
};

export default ModalSearchAuditoria;

// ------------------------------------------------------------------------------------------------------ //
class SelectConglomerado extends React.Component {
  state = {
    dataConglomerate: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa('sgdea:123456')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerate: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange('audit_conglomerado', value);
  };

  handleBlur = () => {
    this.props.onBlur('audit_conglomerado', true);
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataConglomerate.map((aux, id) => {
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

// ----------------------------------------//

class SelectCompany extends React.Component {
  state = {
    dataCompany: [],
    id: this.props.audit_conglomerado
  };

  static getDerivedStateFromProps(props, state) {
    if (props.audit_conglomerado !== state.id) {
      return {
        id: props.audit_conglomerado
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.audit_conglomerado !== prevProps.audit_conglomerado) {
      this.getDataCompany();
    }
  }

  componentDidMount() {
    this.getDataCompany();
  }

  getDataCompany = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/company/conglomerate/${this.state.id}`,
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
          dataCompany: data
        });
      })
      .catch(err => console.log('Error', err));
  };
  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataCompany.map((aux, id) => {
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

// ------------------------------------------- //
class SelectHeadquarter extends React.Component {
  state = {
    dataHeadquarter: [],
    id: this.props.audit_empresa
  };

  static getDerivedStateFromProps(props, state) {
    if (props.audit_empresa !== state.id) {
      return {
        id: props.audit_empresa
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.audit_empresa !== prevProps.audit_empresa) {
      this.getDataHeadquarter();
    }
  }

  componentDidMount() {
    this.getDataHeadquarter();
  }

  getDataHeadquarter = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/headquarter/company/${this.props.audit_empresa}`,
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
          dataHeadquarter: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          onChange={this.props.onChange}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataHeadquarter.map((aux, id) => {
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

// ------------------------------------------ //

class SelectDependence extends React.Component {
  state = {
    dataDependence: [],
    id: this.props.audit_sede
  };

  static getDerivedStateFromProps(props, state) {
    if (props.audit_sede !== state.id) {
      return {
        id: props.audit_sede
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.audit_sede !== prevProps.audit_sede) {
      this.getDataDependence();
    }
  }

  componentDidMount() {
    this.getDataDependence();
  }

  getDataDependence = () => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/dependence/headquarter/${this.props.audit_sede}`,
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
          dataDependence: data
        });
      })
      .catch(err => console.log('Error', err));
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          className={this.props.className}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataDependence.map((aux, id) => {
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
